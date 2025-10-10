# 🚨 CORREÇÃO URGENTE - Railway não está lendo railway.toml

## ❌ PROBLEMA IDENTIFICADO:

O Railway está usando configurações **manuais** que estão **sobrescrevendo** o `railway.toml`!

### Imagens mostram:

- **Build Command:** `pnpm install && pnpm --filter @conferencia/api build` ❌
- **Start Command:** `cd apps/api && npm start` ❌

### Deveria ser:

- **Build Command:** `pnpm install && pnpm --filter @conferencia/web build && pnpm --filter @conferencia/api build` ✅
- **Start Command:** `cd apps/api && node dist/index.js` ✅

## 🔧 CORREÇÃO MANUAL NO RAILWAY:

### 1. Acesse o Railway Dashboard:

- Vá para: https://railway.app/dashboard
- Clique no projeto `@conferencia/api`
- Aba "Settings"

### 2. Corrigir Build Command:

- **Settings → Build → Custom Build Command**
- **Apague** o comando atual
- **Digite:** `pnpm install && pnpm --filter @conferencia/web build && pnpm --filter @conferencia/api build`
- **Salve**

### 3. Corrigir Start Command:

- **Settings → Deploy → Custom Start Command**
- **Apague** o comando atual
- **Digite:** `cd apps/api && node dist/index.js`
- **Salve**

### 4. Verificar Root Directory:

- **Settings → Source → Add Root Directory**
- **Deixe vazio** (deve usar raiz do projeto)
- **Salve**

### 5. Forçar Redeploy:

- Vá para aba "Deployments"
- Clique nos "..." do último deploy
- Selecione "Redeploy"

## ✅ RESULTADO ESPERADO:

Após essas correções, o Railway vai:

1. **Buildar o frontend primeiro:** `pnpm --filter @conferencia/web build`
2. **Buildar a API depois:** `pnpm --filter @conferencia/api build`
3. **Iniciar com Node direto:** `node dist/index.js`
4. **Encontrar o frontend:** `/app/apps/web/dist/index.html`

## 🧪 TESTE APÓS CORREÇÃO:

```bash
# API Health
curl https://conferenciaapi-production.up.railway.app/health

# Site
curl https://turismocinematografico.com.br
```

**O site deve carregar HTML (não mais {"error":"Not found"})!**

## 📝 LOGS ESPERADOS:

```
📁 Servindo frontend de: /app/apps/web/dist
🚀 Server running on port 3001
```

---

**URGENTE:** Faça essas correções manuais no Railway AGORA!
