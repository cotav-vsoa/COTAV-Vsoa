# Genera 6 paginas de categoria para la Escuela (clon del template escenarios-p3d)
$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$src=Join-Path $root 'storage\escenarios-p3d\index.html'
$tpl=[IO.File]::ReadAllText($src,([Text.UTF8Encoding]::new($false)))
$enc=[Text.UTF8Encoding]::new($true)
$base='https://cotav-vsoa.github.io/COTAV-Vsoa/storage/escuela-de-aviacion-militar-virtual/'

$cats=@(
  @{id='escenarios-p3d'; tit='Escenarios Escuela Prepar3D · COTA'; desc='Escenarios del COTA para la Escuela de Aviación Militar Virtual (Prepar3D).'; h2='Escenarios Escuela Prepar3D'; p='Escenarios del COTA para la Escuela de Aviación Militar Virtual (Prepar3D), de libre descarga para alumnos.'},
  @{id='escenarios-mfs'; tit='Escenarios Escuela MFS 2020/24 · COTA'; desc='Escenarios del COTA para la Escuela de Aviación Militar Virtual (MFS 2020/24).'; h2='Escenarios Escuela MFS 2020/24'; p='Escenarios del COTA para la Escuela de Aviación Militar Virtual (MFS 2020/24), de libre descarga para alumnos.'},
  @{id='aviones-p3d'; tit='Aviones Escuela Prepar3D · COTA'; desc='Aviones del COTA para la Escuela de Aviación Militar Virtual (Prepar3D).'; h2='Aviones Escuela Prepar3D'; p='Aviones del COTA para la Escuela de Aviación Militar Virtual (Prepar3D), de libre descarga para alumnos.'},
  @{id='aviones-mfs'; tit='Aviones Escuela MFS 2020/24 · COTA'; desc='Aviones del COTA para la Escuela de Aviación Militar Virtual (MFS 2020/24).'; h2='Aviones Escuela MFS 2020/24'; p='Aviones del COTA para la Escuela de Aviación Militar Virtual (MFS 2020/24), de libre descarga para alumnos.'},
  @{id='liveries'; tit='Liveries Escuela · COTA'; desc='Liveries del COTA para la Escuela de Aviación Militar Virtual.'; h2='Liveries Escuela'; p='Liveries del COTA para la Escuela de Aviación Militar Virtual, de libre descarga para alumnos.'},
  @{id='manuales'; tit="MTL's Escuela · COTA"; desc="Manuales técnicos y material de lectura del COTA para la Escuela de Aviación Militar Virtual."; h2="MTL's Escuela"; p="Manuales técnicos y material de lectura del COTA para la Escuela de Aviación Militar Virtual."}
)

foreach($c in $cats){
  $dir=Join-Path $root ("storage\escuela-de-aviacion-militar-virtual\"+$c.id)
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $o=$tpl
  $o=$o.Replace('<title>Escenarios Prepar3D · COTA</title>','<title>'+$c.tit+'</title>')
  $o=$o.Replace('<meta name="description" content="Escenarios del COTA para Prepar3D.">','<meta name="description" content="'+$c.desc+'">')
  $o=$o.Replace('storage/escenarios-p3d/index.html','storage/escuela-de-aviacion-militar-virtual/'+$c.id+'/index.html')
  $o=[regex]::Replace($o,'(<div class="section-head"[^>]*>\s*<h2>)[^<]*(</h2>\s*<p>)[^<]*(</p>)','$1'+$c.h2+'$2'+$c.p+'$3')
  [IO.File]::WriteAllText((Join-Path $dir 'index.html'),$o,$enc)
  $m=[regex]::Match($o,'<div class="section-head"[^>]*>\s*<h2>[^<]*</h2>\s*<p>[^<]*</p>').Value
  Write-Output ("OK "+$c.id+"  ->  "+($m -replace '\s+',' '))
}