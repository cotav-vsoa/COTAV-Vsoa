$ErrorActionPreference = 'Stop'

$n = [char]10
$switch =
  "    <div class=`"lang-switch`" role=`"group`" aria-label=`"Idioma / Language`">" + $n +
  "      <button class=`"lang-btn active`" data-lang=`"es`" aria-label=`"Espa" + [char]0x00F1 + "ol`">ES</button>" + $n +
  "      <button class=`"lang-btn`" data-lang=`"en`" aria-label=`"English`">EN</button>" + $n +
  "    </div>" + $n

function Write-Bom([string]$path, [string]$text) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
  $fs = [System.IO.File]::Open($path, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
  $fs.Write([byte[]](0xEF, 0xBB, 0xBF), 0, 3)
  $fs.Write($bytes, 0, $bytes.Length)
  $fs.Close()
}

function Apply([string]$path) {
  $t = [System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes($path))
  $o = $t
  if (-not $t.Contains('lang-switch')) {
    $t = $t.Replace('<div class="navcta">', '<div class="navcta">' + $n + $switch)
  }
  if (-not $t.Contains('i18n.js')) {
    if ($t.Contains('<script src="../JS/script.js?v=14"></script>')) {
      $t = $t.Replace('<script src="../JS/script.js?v=14"></script>', '<script src="../JS/i18n.js?v=4"></script>' + $n + '<script src="../JS/script.js?v=14"></script>')
    } elseif ($t.Contains('</body>')) {
      $t = $t.Replace('</body>', $args[0] + $n + '</body>')
    }
  }
  if (-not $t.Contains('>DOCUMENTOS</a>')) {
    $t = $t.Replace('>REDES</a>', '>REDES</a>' + $n + $args[1] + $n)
  }
  if ($t -ne $o) { Write-Bom $path $t; Write-Output ("ok  " + $path) }
}

$top = Get-ChildItem "HTML\*.html" | Where-Object { $_.Name -ne 'index.html' }
foreach ($f in $top) {
  Apply $f.FullName '<script src="../JS/i18n.js?v=4"></script>' '    <a href="documentos.html">DOCUMENTOS</a>'
}

$storage = Get-ChildItem "storage\*\*.html"
foreach ($f in $storage) {
  Apply $f.FullName '<script src="../JS/i18n.js?v=4"></script>' '    <a href="../../HTML/documentos.html">DOCUMENTOS</a>'
}

$bri = Get-ChildItem "HTML\brigadas\*.html"
foreach ($f in $bri) {
  Apply $f.FullName '<script src="../../JS/i18n.js?v=4"></script>' '    <a href="../../HTML/documentos.html">DOCUMENTOS</a>'
}

$idx = "HTML\index.html"
$t = [System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes($idx))
$o = $t
if (-not $t.Contains('>DOCUMENTOS</a>')) {
  $t = $t.Replace('<a href="redes.html" data-i18n="idx.nav.redes">REDES</a>', '        <a href="documentos.html" data-i18n="idx.nav.documentos">DOCUMENTOS</a>' + $n + '        <a href="redes.html" data-i18n="idx.nav.redes">REDES</a>')
}
$t = $t.Replace('i18n.js?v=3', 'i18n.js?v=4')
if ($t -ne $o) { Write-Bom $idx $t; Write-Output "ok  HTML\index.html" }

Write-Output "fin"