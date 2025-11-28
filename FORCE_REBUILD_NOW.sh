#!/bin/bash

echo "========================================"
echo "FORÇAR REBUILD COMPLETO SEM CACHE"
echo "========================================"
echo ""

echo "[1/4] Limpando caches locais..."
rm -rf node_modules
rm -rf apps/web/node_modules
rm -rf apps/api/node_modules
rm -rf apps/web/.vite
rm -rf apps/web/dist
rm -rf apps/api/dist
rm -rf .pnpm-store
echo "✅ Cache local limpo!"
echo ""

echo "[2/4] Limpando cache do pnpm..."
pnpm store prune || true
echo "✅ Cache do pnpm limpo!"
echo ""

echo "[3/4] Fazendo commit das mudanças..."
git add .
git commit -m "chore: force rebuild without cache - Railway" || echo "Nenhuma mudança para commitar"
echo ""

echo "[4/4] Enviando para Railway..."
git push origin main
echo ""

echo "========================================"
echo "✅ CONCLUÍDO!"
echo "========================================"
echo ""
echo "O Railway detectará as mudanças e fará rebuild completo sem cache."
echo "Acompanhe o deploy em: https://railway.app/dashboard"
echo ""

