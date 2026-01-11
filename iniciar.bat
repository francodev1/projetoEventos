@echo off
echo Iniciando BACKEND na porta 3001...
cd backend
start cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo Iniciando FRONTEND na porta 3000...
cd ..\frontend
start cmd /k "npm run dev"

echo.
echo ========================================
echo Servidores iniciados!
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Aguarde alguns segundos e acesse:
echo http://localhost:3000
echo.
pause
