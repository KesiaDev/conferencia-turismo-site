#!/bin/bash

echo "🚀 Inicializando projeto Conferência Site..."
echo ""

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Node.js 20 ou superior é necessário. Versão atual: $(node -v)"
  exit 1
fi
echo "✅ Node.js $(node -v) encontrado"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
  echo "❌ pnpm não encontrado. Instalando..."
  npm install -g pnpm
fi
echo "✅ pnpm $(pnpm -v) encontrado"

# Install dependencies
echo ""
echo "📦 Instalando dependências..."
pnpm install

# Create .env files if they don't exist
if [ ! -f "apps/api/.env" ]; then
  echo ""
  echo "📝 Criando apps/api/.env..."
  cat > apps/api/.env << EOF
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
EOF
  echo "✅ apps/api/.env criado"
fi

if [ ! -f "apps/web/.env" ]; then
  echo ""
  echo "📝 Criando apps/web/.env..."
  cat > apps/web/.env << EOF
VITE_API_URL=http://localhost:3001/api
VITE_GA_ID=G-XXXXXXXXXX
EOF
  echo "✅ apps/web/.env criado"
fi

# Initialize Husky
echo ""
echo "🪝 Configurando Husky..."
pnpm prepare

echo ""
echo "✨ Projeto inicializado com sucesso!"
echo ""
echo "Para executar em modo desenvolvimento:"
echo "  pnpm dev"
echo ""
echo "Para mais informações, consulte:"
echo "  - README.md"
echo "  - SETUP_GUIDE.md"
echo ""

