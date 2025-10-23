@echo off
echo 🚨 FORÇA LIMPEZA DE CACHE - RAILWAY
echo ======================================

echo 📋 Problemas identificados:
echo - Express servindo arquivos estáticos SEM headers de cache
echo - Vite sem configurações anti-cache
echo - Railway pode estar usando cache antigo
echo.

echo 🔧 Correções aplicadas:
echo ✅ Headers no-cache no Express
echo ✅ Configurações anti-cache no Vite
echo ✅ Headers para index.html
echo.

echo 🚀 Forçando mudança no código...
git add .
git commit -m "fix: add cache-busting headers and build config"
git push origin main
echo.

echo ✅ PUSH REALIZADO!
echo.

echo 🔍 VERIFICAR RAILWAY:
echo 1. https://railway.app/dashboard
echo 2. Projeto @conferencia/api
echo 3. Aba Deployments - deve mostrar novo build
echo 4. Aba Logs - verificar se está executando build
echo.

echo 📞 TESTAR EM 5-7 MINUTOS:
echo https://turismocinematografico.com.br/fees
echo https://turismocinematografico.com.br/venue
echo.

echo 🎯 RESULTADO ESPERADO:
echo - Mudanças aparecem IMEDIATAMENTE
echo - Sem cache do navegador
echo - Sem cache do servidor
echo.

echo ⚠️  Se ainda não funcionar:
echo - Limpar cache do navegador (Ctrl+F5)
echo - Verificar logs do Railway
echo - Redeploy manual
echo.

pause
