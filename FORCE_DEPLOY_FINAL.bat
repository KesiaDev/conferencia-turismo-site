@echo off
echo 🚨 FORÇA DEPLOY FINAL - SEÇÃO REMOVIDA COMPLETAMENTE
echo.

echo 📋 Mudanças aplicadas:
echo ✅ Seção "Formas de Pagamento" REMOVIDA (53 linhas)
echo ✅ Seção PIX removida
echo ✅ Seção "Outras Formas" removida
echo ✅ Apenas tabela com botões UCS
echo.

echo 🔄 Forçando deploy agressivo...
git add .
git commit -m "chore: FORCE DEPLOY - payment section completely removed"
git push origin main
echo.

echo ✅ PUSH FORÇADO!
echo.

echo 🔍 VERIFICAR RAILWAY:
echo 1. https://railway.app/dashboard
echo 2. Projeto @conferencia/api
echo 3. Aba Deployments - deve mostrar novo build
echo 4. Aba Logs - acompanhar progresso
echo.

echo 📞 TESTAR EM 3-5 MINUTOS:
echo https://turismocinematografico.com.br/fees
echo.

echo 🎯 RESULTADO ESPERADO:
echo - SEM seção "Formas de Pagamento"
echo - Apenas tabela com botões "Pagar Agora"
echo - Botões redirecionando para UCS
echo.

echo ⚠️  Se ainda não funcionar:
echo - Verificar logs do Railway
echo - Tentar redeploy manual
echo - Verificar se Railway está conectado
echo.

pause
