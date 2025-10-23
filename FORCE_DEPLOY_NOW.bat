@echo off
echo 🚨 FORÇANDO DEPLOY IMEDIATO - REMOÇÃO SEÇÃO PAGAMENTO
echo.

echo 📋 Mudanças aplicadas:
echo ✅ Removida seção "Formas de Pagamento"
echo ✅ Links UCS funcionando
echo ✅ Interface mais limpa
echo.

echo 🔄 Forçando push com timestamp...
git add .
git commit -m "chore: force immediate deploy - payment section removed"
git push origin main
echo.

echo ✅ PUSH FORÇADO!
echo ⏱️  Railway deve detectar em 30 segundos
echo 🔄 Build em 2-3 minutos
echo.

echo 🔍 Verificar em:
echo 1. https://railway.app/dashboard
echo 2. Projeto @conferencia/api
echo 3. Aba Deployments
echo.

echo 📞 Testar após deploy:
echo https://turismocinematografico.com.br/fees
echo.

pause
