@echo off
echo 🔗 Conectando ao projeto Railway existente...
echo.

echo 🔐 Fazendo login no Railway...
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

echo 📦 Compilando...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro na compilação!
    pause
    exit /b 1
)

echo ✅ Compilação concluída!
echo.

echo 🚀 Fazendo deploy...
railway up

echo.
echo ✅ Deploy concluído!
echo.
echo 🌐 Obtenha a URL da API:
railway domain
echo.
pause
