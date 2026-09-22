# tools\bump-versions.ps1
# Bumpea los cache-busters del favicon y de script.js en todos los HTML
# (raiz usa ../img, brigadas usan ../../img). Unica fuente de verdad: PILOTS en JS\script.js.
# Uso (desde la raiz del proyecto):
#   powershell -ExecutionPolicy Bypass -File tools\bump-versions.ps1
if($MyInvocation.InvocationName -ne '.'){ $Missing = ($PWD.Path -notlike '*COTAV'); $root = Split-Path -Parent $PSScriptRoot; Set-Location -LiteralPath $root }
$htmlDir = Join-Path $PWD.Path 'HTML'
$ico = 'Logo-Cotav.ico'
$js  = 'script.js'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

# lee la version actual del favicon del codigo para derivar la nueva
$pattern  = 'Logo-Cotav\.ico\?v=(\d+)'
$current  = 0
Get-ChildItem -LiteralPath $htmlDir -Recurse -Filter *.html -File | ForEach-Object {
  $m = Select-String -LiteralPath $_.FullName -Pattern $pattern
  if($m -and [int]$m.Matches[0].Groups[1].Value -gt $current){ $current = [int]$m.Matches[0].Groups[1].Value }
}
$icoNew = $current + 1

# script.js: deriva del referencia en los HTML, no del array
$jsPattern = 'script\.js\?v=(\d+)'
$jsCurrent = 0
Get-ChildItem -LiteralPath $htmlDir -Recurse -Filter *.html -File | ForEach-Object {
  $m = Select-String -LiteralPath $_.FullName -Pattern $jsPattern
  if($m -and [int]$m.Matches[0].Groups[1].Value -gt $jsCurrent){ $jsCurrent = [int]$m.Matches[0].Groups[1].Value }
}
$jsNew = $jsCurrent + 1

$changed = 0
Get-ChildItem -LiteralPath $htmlDir -Recurse -Filter *.html -File | ForEach-Object {
  $c = Get-Content -LiteralPath $_.FullName -Raw
  $n = $c -replace ('Logo-Cotav\.ico\?v=\d+'), ("Logo-Cotav.ico?v=$icoNew")
  $n = $n -replace ('script\.js\?v=\d+'), ("script.js?v=$jsNew")
  if($n -ne $c){
    Set-Content -LiteralPath $_.FullName -Value $n -NoNewline -Encoding UTF8
    $changed++
    Write-Output ("  bumpeado {0} (ico?v={1} · js?v={2})" -f $_.Name, $icoNew, $jsNew)
  }
}
Write-Output ("== {0} archivos actualizados (Logo-Cotav.ico?v={1}, script.js?v={2}) ==" -f $changed, $icoNew, $jsNew)
if($changed -gt 0){ Write-Output 'Recorda: git add -A && git commit -m "Bump cache script.js y favicon" && git push' }
