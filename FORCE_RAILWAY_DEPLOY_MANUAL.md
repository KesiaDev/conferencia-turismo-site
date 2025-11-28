# 🚨 FORÇAR DEPLOY MANUAL NO RAILWAY

## ⚠️ PROBLEMA

O Railway não está detectando as mudanças automaticamente, mesmo após push.

## ✅ SOLUÇÃO: REDEPLOY MANUAL

### Passo a Passo (2 minutos):

#### 1. Acesse o Railway Dashboard

- Vá para: https://railway.app/dashboard
- Faça login se necessário

#### 2. Selecione o Serviço

- Você verá seus serviços (ex: `@conferencia/web`, `@conferencia/api`)
- **Clique no serviço que precisa fazer rebuild**

#### 3. Vá para Deployments

- No menu lateral, clique em **"Deployments"**
- Você verá uma lista de todos os deploys

#### 4. Force Redeploy

- Encontre o **último deploy** na lista
- Clique nos **"..."** (três pontos) ao lado do deploy
- Selecione **"Redeploy"** ou **"Redeploy without cache"** (se disponível)

#### 5. Aguarde o Build

- O Railway começará um novo build **SEM CACHE**
- Acompanhe os logs em tempo real
- Build deve levar 5-10 minutos (sem cache é mais lento)

---

## 🔧 ALTERNATIVA: Verificar Configuração

Se o redeploy manual não funcionar, verifique:

### 1. Settings → Source

- **Root Directory**: Deve estar vazio OU apontar para `apps/web` (se for serviço web)
- **Branch**: Deve ser `main` ou `master`

### 2. Settings → Build

- **Custom Build Command**: Deve estar **VAZIO** para usar `railway.toml`
- Se tiver algum comando, **APAGUE** para usar a configuração do arquivo

### 3. Settings → Deploy

- **Custom Start Command**: Deve estar **VAZIO** para usar `railway.toml`
- Se tiver algum comando, **APAGUE** para usar a configuração do arquivo

---

## 🎯 O QUE ACONTECE NO REDEPLOY

Quando você faz redeploy manual, o Railway:

1. ✅ **Lê o `railway.toml`** (ou `nixpacks.toml`)
2. ✅ **Executa os comandos de limpeza** que configuramos:
   - `rm -rf node_modules .vite dist ...`
   - `pnpm store prune`
   - `pnpm install --force --no-frozen-lockfile`
3. ✅ **Faz build completo sem cache**
4. ✅ **Gera nova imagem do zero**

---

## 📋 COMANDOS QUE SERÃO EXECUTADOS

### Para Web (`apps/web/railway.toml`):

```bash
rm -rf node_modules .vite dist apps/web/node_modules apps/web/.vite apps/web/dist apps/api/node_modules apps/api/dist .pnpm-store
pnpm store prune
pnpm install --force --no-frozen-lockfile
pnpm --filter @conferencia/web build
```

### Para API (raiz `railway.toml`):

```bash
rm -rf node_modules .vite dist apps/web/node_modules apps/web/.vite apps/web/dist apps/api/node_modules apps/api/dist .pnpm-store
pnpm store prune
pnpm install --force --no-frozen-lockfile
cd apps/web && rm -rf dist .vite && pnpm build
cd ../api && rm -rf dist && pnpm build
```

---

## 🧪 VERIFICAR SE FUNCIONOU

Após o redeploy, verifique os logs:

1. Vá em **Deployments** → Último deploy → **View Logs**
2. Procure por:
   - ✅ `rm -rf` (limpeza de cache)
   - ✅ `pnpm store prune` (limpeza do store)
   - ✅ `--force` (instalação forçada)
   - ✅ `pnpm build` (build limpo)

---

## ⚠️ SE AINDA NÃO FUNCIONAR

### Opção 1: Deletar e Recriar Serviço

1. Settings → Danger Zone → Delete Service
2. Crie novo serviço
3. Conecte ao mesmo repositório
4. O Railway usará os arquivos `.toml` automaticamente

### Opção 2: Usar Railway CLI

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Conectar ao projeto
railway link

# Forçar redeploy sem cache
railway redeploy --no-cache
```

### Opção 3: Verificar Webhook do GitHub

1. GitHub → Repositório → Settings → Webhooks
2. Verifique se há webhook do Railway
3. Se não houver, o Railway pode não estar conectado ao GitHub
4. No Railway: Settings → Source → Connect GitHub

---

## 📞 SUPORTE

Se nada funcionar:

- Railway Support: https://railway.app/help
- Verifique se há erros nos logs
- Verifique se o serviço está ativo (não pausado)
