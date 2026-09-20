# ============================================================
#  FAAV - COTAV :: GENERADOR AUTOM�TICO DE DESCARGAS
#  -----------------------------------------------------------
#  Escanea las carpetas de storage/ y reconstruye las tablas
#  de cada index.html de descargas autom�ticamente.
#
#  C�MO SE USA:
#   1) Dej� el archivo en la carpeta correspondiente de storage/
#      (ej. storage/pilotos/manuales/MiArchivo.pdf)
#   2) Clic derecho sobre "Actualizar Descargas.cmd" (ra�z) ->
#      "Ejecutar como administrador"  (o doble clic)
#   3) El script regenera los index.html + hace commit + push solo.
#
#  No toques NUNCA M�S las tablas de descargas a mano:
#  este script las arma solas con los archivos que haya en disco.
#  Las descripciones que ya escribiste se conservan (por nombre de
#  archivo); solo se agregan filas nuevas, no se borran las tuyas.
# ============================================================

$ErrorActionPreference = 'Stop'

# --- ra�z del sitio (repo FAAV) -----------------------------
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root      = (Resolve-Path (Join-Path $scriptDir '..')).Path
$storage   = Join-Path $root 'storage'

if (-not (Test-Path -LiteralPath $storage)) {
  Write-Host "[ERROR] No se encontr� la carpeta storage en: $storage" -ForegroundColor Red
  exit 1
}

# --- utilidades -------------------------------------------------
function Get-HumanSize([long]$bytes) {
  if ($bytes -ge 1GB) { return ('{0:N1} GB' -f ($bytes / 1GB)) }
  if ($bytes -ge 1MB) { return ('{0:N1} MB' -f ($bytes / 1MB)) }
  if ($bytes -ge 1KB) { return ('{0:N0} KB' -f ($bytes / 1KB)) }
  return ("$bytes B")
}

function Get-DescAutomatica([string]$fileName) {
  $ext = [System.IO.Path]::GetExtension($fileName)
  switch ($ext.ToLower()) {
    '.pdf'  { 'Documento PDF' }
    '.zip'  { 'Archivo comprimido ZIP' }
    '.rar'  { 'Archivo comprimido RAR' }
    '.pkg'  { 'Paquete de instalaci�n (PMDG/FSX/P3D)' }
    '.exe'  { 'Ejecutable de instalaci�n' }
    '.bgl'  { 'Scenery BGL (Prepar3D/MFS)' }
    '.xml'  { 'Archivo de configuraci�n XML' }
    '.txt'  { 'Archivo de texto' }
    '.md'   { 'Documento Markdown' }
    '.jpg'  { 'Imagen JPG' }
    '.png'  { 'Imagen PNG' }
    '.svg'  { 'Gr�fico SVG' }
    '.iso'  { 'Imagen de disco ISO' }
    default { 'Archivo para descargar' }
  }
}

# --- buscar TODAS las p�ginas index.html dentro de storage ------
$indexPages = Get-ChildItem -LiteralPath $storage -Recurse -Filter 'index.html' -ErrorAction SilentlyContinue

Write-Host "Generador de descargas COTAV" -ForegroundColor Cyan
Write-Host ("Carpetas de descarga encontradas: {0}" -f $indexPages.Count) -ForegroundColor DarkCyan
Write-Host ""

$generated = 0
$skipped   = 0

foreach ($idx in $indexPages) {
  $dir   = $idx.DirectoryName
  $name  = Split-Path -Leaf $dir
  $isPil = $dir -like '*\pilotos*' -or $dir -like '*\pilotos\*'

  # --- archivos reales de la carpeta (todo excepto el propio index) ---
  $files = @(Get-ChildItem -LiteralPath $dir -File -ErrorAction SilentlyContinue |
             Where-Object { $_.Name -ne 'index.html' } |
             Sort-Object Name)

  Write-Host ("- {0}  ({1} archivo(s))" -f $name, $files.Count) -ForegroundColor DarkGray

  if ($files.Count -eq 0) {
    $skipped++
    continue
  }

  # --- conservar descripciones ya escritas (seg�n el index actual) ---
  $haDesc = $false
  $raw    = ''
  try { $raw = Get-Content -LiteralPath $idx.FullName -Raw -Encoding UTF8 } catch { $raw = '' }

  $descByFile = @{}
  if ($raw) {
    $tbS = $raw.IndexOf('<tbody>')
    $tbE = $raw.IndexOf('</tbody>')
    if ($tbS -ge 0 -and $tbE -gt $tbS) {
      $oldBody = $raw.Substring($tbS, $tbE - $tbS)
      $rows = [regex]::Matches($oldBody, '<tr[\s\S]*?</tr>')
      foreach ($r in $rows) {
        $tds = [regex]::Matches($r.Value, '<td[^>]*>[\s\S]*?</td>')
        if ($tds.Count -ge 2) {
          $linkM = [regex]::Match($tds[0].Value, 'href="([^"]+)"')
          if ($linkM.Success) {
            $fn = [System.IO.Path]::GetFileName($linkM.Groups[1].Value)
            $desc = [regex]::Replace($tds[1].Value, '<[^>]+>', '').Trim()
            # encabezado de la tabla no cuenta
            if ($desc -and $desc -notmatch '(?i)^archivo|descripci|Nombre del archivo|Sin archivos') {
              if (-not $descByFile.ContainsKey($fn)) { $descByFile[$fn] = $desc }
            }
          }
        }
      }
    }
  }

  # --- construir las filas nuevas -------------------------------
  $sb = New-Object System.Text.StringBuilder
  foreach ($f in $files) {
    $sz   = Get-HumanSize $f.Length
    $desc = $descByFile[$f.Name]
    if (-not $desc) { $desc = Get-DescAutomatica $f.Name }
    $row = @"
<tr style="border-bottom:1px solid var(--line-weak);">
 <td style="padding:12px 14px;"><a href="$($f.Name)" style="color:var(--blue-light); text-decoration:none;">$($f.Name)</a></td>
 <td style="padding:12px 14px; color:var(--muted);">$desc</td>
 <td style="padding:12px 14px; color:var(--muted);">$sz</td>
 <td style="padding:12px 14px;"><a href="$($f.Name)" style="color:var(--ivory); text-decoration:none;">Descargar</a></td>
</tr>
"@
    [void]$sb.Append($row)
  }

  $newBody = $sb.ToString()

  # --- reemplazar solo el <tbody> (conserva head/header/footer) ---
  if ($raw -and $tbS -ge 0 -and $tbE -gt $tbS) {
    $newHtml = $raw.Substring(0, $tbS) + '<tbody>' + $newBody + '</tbody>' + $raw.Substring($tbE + 8)
  } else {
    # no hay tbody: armar la tabla completa con el formato est�ndar
    $newHtml = $raw -replace '<tbody>[\s\S]*?</tbody>', ("<tbody>" + $newBody + "</tbody>")
  }

  $enc = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($idx.FullName, $newHtml, $enc)
  Write-Host ("  [OK] {0} archivo(s) indexados en {1}.html" -f $files.Count, $name) -ForegroundColor Green
  $generated++
}

Write-Host ""
Write-Host ("Listo: {0} carpeta(s) actualizaron su tabla de descargas" -f $generated) -ForegroundColor Cyan
Write-Host ("       {0} carpeta(s) sin archivos (se dejaron intactas)" -f $skipped) -ForegroundColor DarkGray
