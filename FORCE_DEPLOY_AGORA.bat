@echo off
echo ========================================
echo FORCAR DEPLOY RAILWAY - URGENTE
echo ========================================
echo.

echo [1/4] Modificando codigo para forcar deteccao...
powershell -Command "$content = Get-Content apps\web\src\main.tsx -Raw; $content = $content -replace 'Timestamp: .*', 'Timestamp: %date% %time% - FORCE REBUILD'; Set-Content apps\web\src\main.tsx -Value $content"
echo Codigo modificado!
echo.

echo [2/4] Atualizando versao...
echo %date% %time% - FORCE REBUILD NO CACHE > apps\web\public\version.txt
echo Versao atualizada!
echo.

echo [3/4] Adicionando e commitando...
git add -A
git commit -m "chore: FORCE REBUILD NO CACHE - %date% %time%" 2>nul || echo "Nenhuma mudanca para commitar"
echo.

echo [4/4] Enviando para Railway...
git push origin main
echo.

echo ========================================
echo PUSH REALIZADO!
echo ========================================
echo.
echo IMPORTANTE: Se o Railway NAO detectar em 2 minutos:
echo.
echo 1. Acesse: https://railway.app/dashboard
echo 2. Selecione o servico (web ou api)
echo 3. Vá em Deployments
echo 4. Clique nos tres pontos (...) do ultimo deploy
echo 5. Selecione Redeploy
echo.
echo O build sera feito SEM CACHE conforme configurado!
echo.
pause

