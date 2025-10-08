@echo off
echo 🚀 Fazendo deploy da API no Railway...
echo.

echo 📦 Compilando TypeScript...
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
echo 📋 Próximos passos:
echo 1. Obtenha a URL da API com: railway domain
echo 2. Atualize o frontend com a nova URL
echo 3. Teste o formulário de submissão
echo.
pause
