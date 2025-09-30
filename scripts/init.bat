@echo off
echo 🚀 Inicializando projeto Conferência Site...
echo.

REM Check Node version
for /f "tokens=1 delims=." %%i in ('node -v') do set NODE_MAJOR=%%i
set NODE_MAJOR=%NODE_MAJOR:~1%
if %NODE_MAJOR% LSS 20 (
  echo ❌ Node.js 20 ou superior é necessário
  exit /b 1
)
echo ✅ Node.js encontrado

REM Check pnpm
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ❌ pnpm não encontrado. Instalando...
  npm install -g pnpm
)
echo ✅ pnpm encontrado

REM Install dependencies
echo.
echo 📦 Instalando dependências...
call pnpm install

REM Create .env files if they don't exist
if not exist "apps\api\.env" (
  echo.
  echo 📝 Criando apps\api\.env...
  (
    echo PORT=3001
    echo NODE_ENV=development
    echo CORS_ORIGIN=http://localhost:5173
  ) > apps\api\.env
  echo ✅ apps\api\.env criado
)

if not exist "apps\web\.env" (
  echo.
  echo 📝 Criando apps\web\.env...
  (
    echo VITE_API_URL=http://localhost:3001/api
    echo VITE_GA_ID=G-XXXXXXXXXX
  ) > apps\web\.env
  echo ✅ apps\web\.env criado
)

REM Initialize Husky
echo.
echo 🪝 Configurando Husky...
call pnpm prepare

echo.
echo ✨ Projeto inicializado com sucesso!
echo.
echo Para executar em modo desenvolvimento:
echo   pnpm dev
echo.
echo Para mais informações, consulte:
echo   - README.md
echo   - SETUP_GUIDE.md
echo.
pause

