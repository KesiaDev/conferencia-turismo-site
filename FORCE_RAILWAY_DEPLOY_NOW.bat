@echo off
echo ========================================
echo FORCAR DEPLOY RAILWAY - SEM CACHE
echo ========================================
echo.

echo [1/5] Adicionando timestamp ao codigo para forcar deteccao...
echo // Railway Deploy Trigger - %date% %time% > apps\web\src\.railway-trigger.ts
echo export const RAILWAY_DEPLOY_TIMESTAMP = '%date% %time%'; >> apps\web\src\.railway-trigger.ts
echo.

echo [2/5] Atualizando arquivo de versao...
echo %date% %time% - FORCE REBUILD NO CACHE > apps\web\public\version.txt
echo.

echo [3/5] Adicionando todas as mudancas...
git add -A
echo.

echo [4/5] Fazendo commit com mensagem clara...
git commit -m "chore: FORCE REBUILD NO CACHE - %date% %time%" || echo "Nenhuma mudanca para commitar"
echo.

echo [5/5] Enviando para Railway...
git push origin main --force-with-lease
echo.

echo ========================================
echo CONCLUIDO!
echo ========================================
echo.
echo Se o Railway ainda nao detectar, faca REDEPLOY MANUAL:
echo.
echo 1. Acesse: https://railway.app/dashboard
echo 2. Selecione o servico (web ou api)
echo 3. Vá em Deployments
echo 4. Clique nos tres pontos (...)
echo 5. Selecione Redeploy
echo.
echo O build sera feito SEM CACHE conforme configurado!
echo.
pause

