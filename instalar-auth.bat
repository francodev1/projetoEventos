@echo off
echo ========================================
echo   Instalando Dependencias do Projeto
echo ========================================
echo.

echo [1/3] Instalando dependencias do Backend...
cd backend
call npm install @prisma/client prisma bcryptjs jsonwebtoken
call npm install -D @types/bcryptjs @types/jsonwebtoken
echo.

echo [2/3] Instalando dependencias do Frontend...
cd ..\frontend
call npm install next-auth@beta bcryptjs
call npm install -D @types/bcryptjs
echo.

echo [3/3] Gerando Prisma Client...
cd ..\backend
call npx prisma generate
echo.

echo ========================================
echo   Instalacao Concluida!
echo ========================================
echo.
echo Proximos passos:
echo 1. Configure o Supabase (veja CONFIGURACAO-SUPABASE.md)
echo 2. Atualize o arquivo backend/.env com a DATABASE_URL
echo 3. Execute: cd backend ^&^& npx prisma migrate dev --name init
echo.
pause
