@echo off
echo 🚨 FORÇA DEPLOY FRONTEND - MUDANÇA NO CÓDIGO
echo.

echo 📋 Estratégia aplicada:
echo ✅ Mudança no arquivo Fees.tsx
echo ✅ Commit "feat" para trigger automático
echo ✅ Push forçado para GitHub
echo ✅ Railway deve detectar mudança no frontend
echo.

echo 🔄 Status atual:
git log --oneline -3
echo.

echo 📊 Verificando Railway:
echo 1. https://railway.app/dashboard
echo 2. Projeto @conferencia/web
echo 3. Deve mostrar novo deploy em andamento
echo 4. Aguardar 2-3 minutos para build
echo.

echo 📞 TESTAR APÓS DEPLOY:
echo https://turismocinematografico.com.br/fees
echo.

echo 🎯 RESULTADO ESPERADO:
echo - SEM seção "Formas de Pagamento"
echo - Apenas tabela com botões UCS
echo - Interface limpa e direta
echo.

echo ⚠️  Se ainda não funcionar:
echo - Verificar se Railway está conectado ao GitHub
echo - Tentar redeploy manual no Railway
echo - Verificar logs de erro
echo.

pause
