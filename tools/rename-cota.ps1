param([switch]$DryRun)

$ErrorActionPreference = 'Continue'
function Write-Bom([string]$path, [string]$text) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
  $fs = [System.IO.File]::Open($path, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
  $fs.Write([byte[]](0xEF, 0xBB, 0xBF), 0, 3)
  $fs.Write($bytes, 0, $bytes.Length)
  $fs.Close()
}

$htmlFiles = @()
$htmlFiles += Get-ChildItem -Path "HTML\*.html"
$htmlFiles += Get-ChildItem -Path "HTML\brigadas\*.html"
$htmlFiles += Get-ChildItem -Path "storage\*\*.html"

$changed = 0
foreach ($f in $htmlFiles) {
  $p = $f.FullName
  $t = [System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes($p))
  $orig = $t

  $t = $t.Replace('FUERZAS ARMADAS ARGENTINAS VSOA - VATSIM SPECIAL OPERATION ASOCIATED', 'COMANDO AÉREO TÁCTICO ARGENTINO VSOA - VATSIM SPECIAL OPERATION ASOCIATED')
  $t = $t.Replace('FAAV - VSOA', 'COTA - VSOA')
  $t = $t.Replace('Fuerzas Armadas Argentinas VSOA', 'Comando Aéreo Táctico Argentino')
  $t = [regex]::Replace($t, '(?<!@)(?<!Logo )FAAV', 'COTA')
  $t = $t.Replace('Logo Faav.png?v=3', 'Logo Faav.png?v=4')

  if ($t -ne $orig) {
    $changed++
    if (-not $DryRun) { Write-Bom $p $t }
    Write-Output ("HTML  " + $f.Name)
  }
}

$p = "JS\i18n.js"
$t = [System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes($p))
$orig = $t
$t = $t.Replace('FAAV - VSOA', 'COTA - VSOA')
$t = $t.Replace('Fuerzas Armadas Argentinas VSOA', 'Comando Aéreo Táctico Argentino')
$t = [regex]::Replace($t, '(?<!@)(?<!Logo )FAAV', 'COTA')
if ($t -ne $orig) { $changed++; if (-not $DryRun) { Write-Bom $p $t }; Write-Output "JS    i18n.js" }

$p = "JS\script.js"
$t = [System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes($p))
$orig = $t
$t = $t.Replace('Post FAAV', 'Post COTA')
$t = $t.Replace('La FAAV estar', 'La COTA estar')
$t = $t.Replace("? 'FAAV' :", "? 'COTA' :")
$t = $t.Replace('FAAV PRESENTE', 'COTA PRESENTE')
$t = $t.Replace('Logo Faav.png?v=3', 'Logo Faav.png?v=4')
if ($t -ne $orig) { $changed++; if (-not $DryRun) { Write-Bom $p $t }; Write-Output "JS    script.js" }

Write-Output ("archivos modificados: " + $changed)