@echo off
echo ========================================
echo FORCAR REBUILD COMPLETO SEM CACHE
echo ========================================
echo.

echo [1/4] Limpando caches locais...
if exist node_modules rmdir /s /q node_modules
if exist apps\web\node_modules rmdir /s /q apps\web\node_modules
if exist apps\api\node_modules rmdir /s /q apps\api\node_modules
if exist apps\web\.vite rmdir /s /q apps\web\.vite
if exist apps\web\dist rmdir /s /q apps\web\dist
if exist apps\api\dist rmdir /s /q apps\api\dist
echo Cache local limpo!
echo.

echo [2/4] Limpando cache do pnpm...
call pnpm store prune
echo Cache do pnpm limpo!
echo.

echo [3/4] Fazendo commit das mudanças...
git add .
git commit -m "chore: force rebuild without cache - Railway" || echo "Nenhuma mudanca para commitar"
echo.

echo [4/4] Enviando para Railway...
git push origin main
echo.

echo ========================================
echo CONCLUIDO!
echo ========================================
echo.
echo O Railway detectara as mudancas e fara rebuild completo sem cache.
echo Acompanhe o deploy em: https://railway.app/dashboard
echo.
pause

