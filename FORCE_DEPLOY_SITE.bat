@echo off
echo ========================================
echo FORCAR DEPLOY DO SITE - URGENTE
echo ========================================
echo.

echo [1/5] Atualizando timestamp no codigo...
powershell -Command "$content = Get-Content apps\web\src\main.tsx -Raw; $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'; $content = $content -replace 'Timestamp: .*', \"Timestamp: $timestamp - FORCE DEPLOY\"; Set-Content apps\web\src\main.tsx -Value $content"
echo Codigo atualizado!
echo.

echo [2/5] Atualizando arquivo de versao...
echo %date% %time% - FORCE DEPLOY > apps\web\public\version.txt
echo Versao atualizada!
echo.

echo [3/5] Criando arquivo de trigger...
echo FORCE_DEPLOY_%RANDOM%_%date:~-4,4%%date:~-7,2%%date:~-10,2% > .railway-deploy-trigger
echo Trigger criado!
echo.

echo [4/5] Adicionando todas as mudancas...
git add -A
echo.

echo [5/5] Fazendo commit e push...
git commit -m "chore: FORCE DEPLOY - atualizacoes do site - %date% %time%" 2>nul || echo "Nenhuma mudanca para commitar"
git push origin main
echo.

echo ========================================
echo PUSH REALIZADO!
echo ========================================
echo.
echo IMPORTANTE: Se o Railway NAO detectar em 2 minutos:
echo.
echo 1. Acesse: https://railway.app/dashboard
echo 2. Selecione o servico @conferencia/web
echo 3. Vá em Deployments
echo 4. Clique nos tres pontos (...) do ultimo deploy
echo 5. Selecione Redeploy
echo.
echo O build sera feito SEM CACHE e as atualizacoes serao publicadas!
echo.
pause

