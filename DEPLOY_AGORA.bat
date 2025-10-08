@echo off
echo 🚀 DEPLOY DA API NO RAILWAY
echo ================================
echo.

echo 📦 Compilando a API...
cd apps\api
npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro na compilação!
    pause
    exit /b 1
)

echo ✅ Compilação concluída!
echo.

echo 🔐 FAÇA LOGIN NO RAILWAY:
echo 1. O navegador vai abrir
echo 2. Faça login com sua conta
echo 3. Autorize o Railway CLI
echo.
pause

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

echo 🌐 OBTENDO URL DA API:
railway domain

echo.
echo 📋 PRÓXIMOS PASSOS:
echo 1. Copie a URL da API acima
echo 2. Crie o arquivo apps\web\.env com:
echo    VITE_API_URL=https://sua-url.up.railway.app/api
echo 3. Redeploy o frontend
echo.
pause
