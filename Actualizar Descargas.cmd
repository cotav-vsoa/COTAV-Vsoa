@echo off
chcp 65001 >nul
title COTAV :: Actualizar descargas
setlocal EnableExtensions

rem ============================================================
rem  ACTUALIZAR DESCARGAS - COTAV VIRTUAL
rem  -----------------------------------------------------------
rem  Doble clic sobre este archivo:
rem    1) regenera TODAS las tablas de descargas (lee lo que
rem       dejaste en las carpetas de storage/...)
rem    2) hace git add + commit + push automaticos
rem
rem  Asi que el flujo es SOLO este:
rem    - dejas el archivo nuevo en la carpeta (ej. storage\pilotos\
rem      manuales\TuArchivo.pdf)
rem    - doble clic aqui
rem    - listo, la web queda actualizada
rem ============================================================

cd /d "%~dp0"

where powershell.exe >nul 2>nul || (
  echo [ERROR] No se encontro PowerShell.
  pause
  exit /b 1
)

echo.
echo  COTAV - VIRTUAL
echo  Actualizando descargas automaticamente...
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "tools\generador-descargas.ps1"
if errorlevel 1 (
  echo.
  echo  [ERROR] El generador fallo. Revisa el mensaje de arriba.
  pause
  exit /b 1
)

echo.
echo  Descargas actualizadas. Haciendo commit y push...
echo.

git add -A
git commit -m "Descargas: regeneradas automaticamente (+material nuevo)"
git push origin main

echo.
echo  ============================================================
echo   LISTO. Tu sitio quedo actualizado en GitHub Pages.
echo  ============================================================
echo.
pause
