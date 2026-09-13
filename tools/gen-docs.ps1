param(
  [string]$DocsDir = "docs"
)

$root = Split-Path -Parent $PSScriptRoot
$dir = Join-Path $root $DocsDir
if (-not (Test-Path -LiteralPath $dir)) { Write-Error "No existe la carpeta $DocsDir"; exit 1 }

$items = @()
Get-ChildItem -LiteralPath $dir -File -Recurse | Sort-Object LastWriteTime -Descending | ForEach-Object {
  if ($_.Extension -notmatch '(?i)^\.(pdf|pptx?|docx?|xlsx?|odt|txt|md$)$') { return }
  $name = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  $display = ($name -replace '[-_]', ' ' -replace '\s+', ' ').Trim()
  $rel = $_.FullName.Substring($dir.Length + 1).Replace('\', '/')
  $items += [PSCustomObject]@{
    name = $display
    file = $rel
    size = [Math]::Max(1, [Math]::Round($_.Length / 1KB, 1))
    date = $_.LastWriteTime.ToString('yyyy-MM-dd')
  }
}

$arr = @($items)
if ($arr.Count -eq 0) { $json = '[]' }
elseif ($arr.Count -eq 1) { $json = '[' + (ConvertTo-Json -InputObject $arr[0] -Depth 3) + ']' }
else { $json = ConvertTo-Json -InputObject $arr -Depth 3 }
[System.IO.File]::WriteAllText(
  (Join-Path $dir "manifest.json"),
  $json,
  (New-Object System.Text.UTF8Encoding($false))
)
Write-Output ("docs manifest: " + $items.Count + " documento(s) en " + $dir)