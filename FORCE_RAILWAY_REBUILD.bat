@echo off
echo 🚨 FORÇA REBUILD COMPLETO NO RAILWAY
echo ======================================

echo 📋 Problema identificado:
echo - Código correto (card removido)
echo - Build local limpo
echo - Railway servindo versão antiga
echo.

echo 🔄 Estratégias aplicadas:
echo ✅ railway.toml configurado corretamente
echo ✅ Build command: pnpm install && cd apps/web && pnpm build && cd ../api && pnpm build && cd ../..
echo ✅ Start command: cd apps/api && npm start
echo.

echo 🚀 Forçando mudança no código...
git add .
git commit -m "feat: FORCE RAILWAY REBUILD - payment card removed"
git push origin main
echo.

echo ✅ PUSH REALIZADO!
echo.

echo 🔍 VERIFICAR RAILWAY:
echo 1. https://railway.app/dashboard
echo 2. Projeto @conferencia/api
echo 3. Aba Deployments - deve mostrar novo build
echo 4. Aba Logs - verificar se está executando:
echo    - pnpm install
echo    - cd apps/web && pnpm build
echo    - cd ../api && pnpm build
echo.

echo 📞 TESTAR EM 5-7 MINUTOS:
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
echo - Deletar e recriar projeto
echo.

pause
