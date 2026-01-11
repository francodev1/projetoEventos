@echo off
echo ========================================
echo  INSTALADOR FONTE CHURCH
echo ========================================
echo.

echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor instale em: https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js OK!
echo.

echo [2/5] Instalando dependencias do backend...
cd backend
call npm install
if errorlevel 1 (
    echo ERRO ao instalar backend
    pause
    exit /b 1
)
echo Backend OK!
echo.

echo [3/5] Configurando banco de dados SQLite...
call npx prisma generate
call npx prisma migrate dev --name init --skip-seed
echo Banco configurado!
echo.

echo [4/5] Instalando dependencias do frontend...
cd ..\frontend
call npm install
call npm install tailwindcss-animate
if errorlevel 1 (
    echo ERRO ao instalar frontend
    pause
    exit /b 1
)
echo Frontend OK!
echo.

echo [5/5] Configuracao concluida!
echo.
echo ========================================
echo  PRONTO PARA USAR!
echo ========================================
echo.
echo Para iniciar o projeto:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Depois acesse: http://localhost:3000
echo.
pause
