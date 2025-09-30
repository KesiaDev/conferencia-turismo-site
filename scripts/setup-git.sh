#!/bin/bash

echo "🚀 Configurando Git e fazendo primeiro commit..."
echo ""

# Inicializar git se ainda não estiver
if [ ! -d ".git" ]; then
  echo "📦 Inicializando repositório Git..."
  git init
fi

# Adicionar todos os arquivos
echo "📝 Adicionando arquivos..."
git add .

# Fazer primeiro commit
echo "💾 Fazendo primeiro commit..."
git commit -m "Initial commit - III Conferência Internacional de Turismo Literário e Cinematográfico"

# Conectar ao GitHub
echo "🔗 Conectando ao GitHub (KesiaDev)..."
git remote add origin https://github.com/KesiaDev/conferencia-turismo-site.git

# Renomear branch para main
echo "🌿 Configurando branch main..."
git branch -M main

echo ""
echo "✅ Pronto! Agora execute:"
echo "   git push -u origin main"
echo ""
echo "⚠️  O GitHub vai pedir suas credenciais:"
echo "   - Username: KesiaDev"
echo "   - Password: Use um Personal Access Token (não a senha)"
echo ""
echo "📖 Como criar token: https://github.com/settings/tokens"

