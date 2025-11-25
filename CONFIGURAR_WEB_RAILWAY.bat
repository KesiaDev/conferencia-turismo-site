@echo off
echo 🚀 CONFIGURAR SERVIÇO WEB NO RAILWAY
echo ======================================
echo.
echo Este script vai abrir o Railway Dashboard para você configurar.
echo.
echo ⚠️  IMPORTANTE: Você precisa fazer a configuração manualmente no dashboard.
echo.
echo 📋 O QUE FAZER (5 minutos):
echo.
echo 1. O navegador vai abrir o Railway Dashboard
echo 2. Clique no serviço @conferencia/web
echo 3. Vá em Settings → Source
echo 4. Configure Root Directory: apps/web
echo 5. Salve e faça redeploy
echo.
echo 📖 Guia completo em: CONFIGURAR_WEB_RAILWAY.md
echo.
echo ⏱️  Após configurar, o build vai demorar apenas 1-2 minutos (não mais 10+)
echo.
pause
echo.
echo 🌐 Abrindo Railway Dashboard...
start https://railway.app/dashboard
echo.
echo ✅ Dashboard aberto!
echo.
echo 📝 Siga as instruções em CONFIGURAR_WEB_RAILWAY.md
echo.
echo 💡 DICA: Use Ctrl+F para buscar "@conferencia/web" na página
echo.
pause

