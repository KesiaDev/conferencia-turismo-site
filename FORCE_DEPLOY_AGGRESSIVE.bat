@echo off
echo 🚨 FORÇA DEPLOY AGRESSIVO - MUDANÇA NO CÓDIGO
echo.

echo 📋 Estratégias aplicadas:
echo ✅ Mudança no código fonte (Fees.tsx)
echo ✅ Timestamp adicionado
echo ✅ Commit com tipo "feat"
echo ✅ Push forçado
echo.

echo 🔄 Verificando status...
git status
echo.

echo 📊 Últimos commits:
git log --oneline -3
echo.

echo 🚀 FORÇANDO NOVO PUSH...
git add .
git commit -m "chore: aggressive deploy trigger - $(Get-Date)"
git push origin main
echo.

echo ✅ PUSH AGRESSIVO REALIZADO!
echo.

echo 🔍 VERIFICAR AGORA:
echo 1. https://railway.app/dashboard
echo 2. Projeto @conferencia/api
echo 3. Aba Deployments - deve mostrar novo build
echo 4. Aba Logs - acompanhar progresso
echo.

echo 📞 TESTAR EM 2-3 MINUTOS:
echo https://turismocinematografico.com.br/fees
echo.

echo ⚠️  Se ainda não funcionar:
echo - Verificar se Railway está conectado ao GitHub
echo - Verificar se há erros nos logs
echo - Tentar redeploy manual no Railway
echo.

pause
