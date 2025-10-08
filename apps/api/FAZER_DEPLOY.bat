@echo off
echo 🚀 FAZENDO DEPLOY DA API NO RAILWAY
echo ====================================
echo.

echo 📦 Compilando a API...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro na compilação!
    pause
    exit /b 1
)

echo ✅ Compilação concluída!
echo.

echo 🔐 Fazendo login no Railway...
echo (O navegador vai abrir para você fazer login)
railway login
if %errorlevel% neq 0 (
    echo ❌ Erro no login!
    pause
    exit /b 1
)

echo ✅ Login realizado!
echo.

echo 🔗 Conectando ao projeto @conferencia/api...
railway link
if %errorlevel% neq 0 (
    echo ❌ Erro ao conectar!
    pause
    exit /b 1
)

echo ✅ Conectado ao projeto!
echo.

echo 🚀 Fazendo deploy da API...
railway up

echo.
echo ✅ Deploy concluído!
echo.

echo 🌐 URL da API:
railway domain

echo.
echo 📋 PRÓXIMOS PASSOS:
echo 1. Copie a URL da API acima
echo 2. Crie o arquivo apps\web\.env com:
echo    VITE_API_URL=https://sua-url.up.railway.app/api
echo 3. Redeploy o frontend
echo.
pause
