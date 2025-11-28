@echo off
echo ========================================
echo FORCAR DEPLOY RAILWAY - AGRESSIVO
echo ========================================
echo.

echo [1/6] Modificando arquivo de codigo para forcar deteccao...
powershell -Command "(Get-Content apps\web\src\main.tsx) -replace 'Timestamp: .*', 'Timestamp: %date% %time% - FORCE REBUILD NO CACHE' | Set-Content apps\web\src\main.tsx"
echo.

echo [2/6] Atualizando arquivo de versao...
echo %date% %time% - FORCE REBUILD NO CACHE > apps\web\public\version.txt
echo.

echo [3/6] Criando arquivo de trigger...
echo FORCE_REBUILD_%RANDOM% > .railway-deploy-trigger
echo.

echo [4/6] Adicionando TODAS as mudancas...
git add -A
echo.

echo [5/6] Fazendo commit...
git commit -m "chore: FORCE REBUILD NO CACHE - Railway deploy trigger - %date% %time%" || echo "Nenhuma mudanca para commitar"
echo.

echo [6/6] Enviando para Railway (force-with-lease)...
git push origin main --force-with-lease
echo.

echo ========================================
echo PUSH REALIZADO!
echo ========================================
echo.
echo Se o Railway NAO detectar automaticamente em 2 minutos:
echo.
echo OPCAO 1 - REDEPLOY MANUAL (RECOMENDADO):
echo ----------------------------------------
echo 1. Acesse: https://railway.app/dashboard
echo 2. Selecione o servico (web ou api)
echo 3. Vá em Deployments
echo 4. Clique nos tres pontos (...) do ultimo deploy
echo 5. Selecione Redeploy
echo 6. O build sera feito SEM CACHE conforme configurado
echo.
echo OPCAO 2 - VERIFICAR CONFIGURACAO:
echo ----------------------------------
echo 1. Settings -^> Source
echo 2. Verifique se Root Directory esta correto
echo 3. Settings -^> Build
echo 4. Verifique se Custom Build Command esta vazio (usa railway.toml)
echo 5. Se nao estiver vazio, APAGUE para usar railway.toml
echo.
echo OPCAO 3 - FORCAR VIA CLI (se tiver Railway CLI):
echo -------------------------------------------------
echo railway redeploy --no-cache
echo.
echo ========================================
echo.
pause

