#!/bin/bash
echo "🚀 FORÇANDO BUILD DO FRONTEND"
echo "================================"

echo "📦 Instalando dependências..."
pnpm install

echo "🔨 Buildando frontend..."
cd apps/web
pnpm build
cd ../..

echo "🔨 Buildando API..."
cd apps/api
pnpm build
cd ../..

echo "✅ Build completo!"
echo "Frontend: apps/web/dist"
echo "API: apps/api/dist"
