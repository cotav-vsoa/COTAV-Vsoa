$ErrorActionPreference = 'Stop'

$full = "COTA - VSOA | Comando de Operaciones A" + [char]0x00E9 + "reas T" + [char]0x00E1 + "cticas Argentinas"
$full2 = "Comando de Operaciones A" + [char]0x00E9 + "reas T" + [char]0x00E1 + "cticas Argentinas"
$enFull = "COTA - VSOA | Argentine Tactical Air Operations Command"

function Fix-Text([string]$t) {
  $t = [regex]::Replace($t, '(?i)Comando de Operaciones A.{1,2}reas T.{1,2}cticas Argentinas', [System.Text.RegularExpressions.MatchEvaluator]{ param($m) return $full2 })
  $t = [regex]::Replace($t, '(?i)COTA - VSOA \| Argentine Armed Forces VSOA', $enFull)
  $t = $t.Replace([char]0xFFFD, '?')
  return $t
}

function Write-Bom([string]$path, [string]$text) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
  $fs = [System.IO.File]::Open($path, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
  $fs.Write([byte[]](0xEF, 0xBB, 0xBF), 0, 3)
  $fs.Write($bytes, 0, $bytes.Length)
  $fs.Close()
}

$files = @()
$files += Get-ChildItem "HTML\*.html"
$files += Get-ChildItem "HTML\brigadas\*.html"
$files += Get-ChildItem "storage\*\*.html"
$files += Get-Item "JS\i18n.js"

$changed = 0
foreach ($f in $files) {
  $p = $f.FullName
  $t = [System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes($p))
  $out = Fix-Text $t
  if ($out -ne $t) {
    Write-Bom $p $out
    $changed++
    Write-Output ("fixed  " + $f.Name)
  }
}
Write-Output ("archivos corregidos: " + $changed)