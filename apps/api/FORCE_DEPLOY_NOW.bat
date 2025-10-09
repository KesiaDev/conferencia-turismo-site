@echo off
echo 🚀 FORÇANDO DEPLOY IMEDIATO DA API
echo.

echo 📋 Otimizações aplicadas:
echo ✅ Timeouts de SMTP reduzidos (10s em vez de 60s)
echo ✅ Pool de conexões desabilitado
echo ✅ Debug/logs desabilitados em produção
echo ✅ Puppeteer otimizado para Railway
echo ✅ Build command otimizado
echo.

echo 🔄 Fazendo commit das otimizações...
git add .
git commit -m "fix: otimizar timeouts e configuração para deploy mais rápido

- Reduzir timeouts SMTP de 60s para 10s
- Desabilitar pool de conexões para Railway
- Desabilitar debug/logs em produção
- Otimizar build command para Railway
- Adicionar PUPPETEER_SKIP_DOWNLOAD

Timestamp: %date% %time%"
echo.

echo 🚀 Fazendo push para forçar deploy...
git push origin main
echo.

echo ✅ Deploy forçado! Agora deve ser muito mais rápido.
echo ⏱️  Aguarde 2-5 minutos em vez de 1+ hora
echo.

echo 🔍 Para acompanhar o progresso:
echo 1. Vá para: https://railway.app/dashboard
echo 2. Clique no projeto @conferencia/api
echo 3. Aba "Deployments" para ver o progresso
echo 4. Aba "Logs" para ver os logs em tempo real
echo.

echo 📞 URL da API após deploy:
echo https://conferenciaapi-production.up.railway.app/health
echo.

pause
