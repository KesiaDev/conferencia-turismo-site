@echo off
echo 🚀 FORÇANDO REDEPLOY IMEDIATO NO RAILWAY
echo.

echo 📋 Correções aplicadas:
echo ✅ railway.toml corrigido para buildar frontend
echo ✅ Build command: pnpm install ^&^& pnpm --filter @conferencia/web build ^&^& pnpm --filter @conferencia/api build
echo ✅ Frontend será incluído no container
echo ✅ Express vai encontrar index.html
echo.

echo 🔄 Fazendo push final...
git add .
git commit -m "final: trigger redeploy final"
git push origin main
echo.

echo ✅ REDEPLOY FORÇADO!
echo ⏱️  Railway deve detectar mudanças em 1-2 minutos
echo 🔄 Build completo (frontend + API) em 3-5 minutos
echo.

echo 🔍 Para acompanhar:
echo 1. Vá para: https://railway.app/dashboard
echo 2. Clique no projeto @conferencia/api
echo 3. Aba "Deployments" para ver progresso
echo 4. Aba "Logs" para ver build em tempo real
echo.

echo 📞 URLs para testar após deploy:
echo API: https://conferenciaapi-production.up.railway.app/health
echo Site: https://turismocinematografico.com.br
echo.

echo 🎯 Resultado esperado:
echo - Site carrega HTML (não mais {"error":"Not found"})
echo - API funcionando normalmente
echo - Todas as páginas acessíveis
echo.

pause
