# 🔥 FORÇAR REBUILD COMPLETO SEM CACHE - RAILWAY

## 🎯 Objetivo

Forçar o Railway a fazer um rebuild completo do projeto, removendo **TODOS** os caches:

- ✅ Cache do Vite
- ✅ Cache do pnpm/npm
- ✅ node_modules
- ✅ Arquivos de build anteriores
- ✅ Cache do Nixpacks

## 📋 O QUE FOI CONFIGURADO

### 1. **apps/web/railway.toml**

- Limpa todos os caches antes do build
- Força reinstalação completa de dependências
- Remove cache do Vite (.vite)
- Remove builds anteriores (dist)

### 2. **apps/web/nixpacks.toml**

- Limpeza de cache na fase de install
- Limpeza de cache na fase de build
- Instalação forçada sem frozen-lockfile

### 3. **railway.toml (raiz)**

- Limpeza completa de todos os caches
- Reinstalação forçada de dependências
- Build limpo do web e API

### 4. **apps/api/nixpacks.toml**

- Limpeza de cache antes de instalar
- Limpeza de cache antes de buildar
- Reinstalação forçada

## 🚀 COMO USAR

### Opção 1: Deploy Automático (Recomendado)

1. **Faça commit das mudanças:**

   ```bash
   git add .
   git commit -m "chore: force rebuild without cache"
   git push
   ```

2. **O Railway detectará automaticamente** e fará rebuild completo

### Opção 2: Redeploy Manual no Railway

1. Acesse: https://railway.app/dashboard
2. Selecione seu projeto
3. Vá em **Deployments**
4. Clique nos **"..."** do último deploy
5. Selecione **"Redeploy"**
6. ✅ O Railway usará os novos comandos de build sem cache

### Opção 3: Forçar via Railway CLI

```bash
railway redeploy --no-cache
```

## 🔍 O QUE ACONTECE NO BUILD

O build agora executa estes comandos **ANTES** de qualquer instalação:

```bash
# Limpa TODOS os caches
rm -rf node_modules .vite dist apps/web/node_modules apps/web/.vite apps/web/dist apps/api/node_modules apps/api/dist .pnpm-store

# Limpa cache do pnpm
pnpm store prune

# Instala dependências FORÇADAMENTE (sem usar cache)
pnpm install --force --no-frozen-lockfile

# Build limpo
pnpm build
```

## ⚠️ IMPORTANTE

- ⏱️ **Tempo de build:** Será mais lento (5-10 minutos) pois não usa cache
- 💾 **Espaço:** Usa mais espaço temporário durante o build
- ✅ **Resultado:** Build 100% limpo, sem qualquer cache antigo

## 🧪 VERIFICAR SE FUNCIONOU

Após o deploy, verifique os logs do Railway:

1. Vá em **Deployments** → Último deploy → **View Logs**
2. Procure por:
   - `rm -rf` (limpeza de cache)
   - `pnpm store prune` (limpeza do store)
   - `--force` (instalação forçada)

## 📝 NOTAS

- Os comandos usam `|| true` para não falhar se arquivos não existirem
- O `--no-frozen-lockfile` força atualização mesmo se lockfile mudou
- O `--force` ignora cache do pnpm completamente

## 🔄 REVERTER (se necessário)

Se quiser voltar ao build com cache:

1. Restaure os arquivos originais do git
2. Ou remova os comandos de limpeza dos arquivos `.toml`
