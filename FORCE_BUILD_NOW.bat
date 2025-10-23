@echo off
echo 🚨 FORÇA BUILD AGORA - REMOVER CARD DE PAGAMENTO
echo.

echo 📋 Problema: Card "Formas de Pagamento" ainda aparece
echo ✅ Solução: Mudança no código + build forçado
echo.

echo 🔄 Fazendo mudança no código...
git add .
git commit -m "fix: force build - remove payment card completely"
git push origin main
echo.

echo ✅ PUSH REALIZADO!
echo.

echo 🔍 VERIFICAR RAILWAY:
echo 1. https://railway.app/dashboard
echo 2. Projeto @conferencia/web
echo 3. Deve mostrar novo build em andamento
echo 4. Aguardar 3-5 minutos
echo.

echo 📞 TESTAR APÓS BUILD:
echo https://turismocinematografico.com.br/fees
echo.

echo 🎯 RESULTADO ESPERADO:
echo - SEM card "Formas de Pagamento"
echo - Apenas tabela com botões UCS
echo - Interface limpa
echo.

echo ⚠️  Se ainda não funcionar:
echo - Redeploy manual no Railway
echo - Verificar logs de erro
echo - Limpar cache do navegador
echo.

pause
