# 🚀 FORÇAR DEPLOY DA API

## Problema:

O Railway ainda está servindo o frontend em vez da API no projeto `@conferencia/api`.

## Solução:

### 1. Acessar Railway Dashboard:

- Vá para: https://railway.app/dashboard
- Encontre o projeto `@conferencia/api`

### 2. Forçar Redeploy:

- Clique no projeto `@conferencia/api`
- Vá para aba "Deployments"
- Clique nos "..." (três pontos) do último deploy
- Selecione "Redeploy"

### 3. Verificar Configuração:

- Aba "Settings"
- Build Command: `npm run build`
- Start Command: `npm start`
- Root Directory: `apps/api`

### 4. Verificar Variáveis:

- Aba "Variables"
- Certifique-se que tem:
  ```
  NODE_ENV=production
  PORT=3001
  EMAIL_USER=litfilmtourismconferenceucs@gmail.com
  EMAIL_PASS=ownzmecmczapbxfb
  CONFERENCE_EMAIL=litfilmtourismconferenceucs@gmail.com
  ```

### 5. Testar:

- Após o redeploy: https://conferenciaapi-production.up.railway.app/health
- Deve retornar: `{"status":"ok","timestamp":"..."}`

## Status Atual:

- ❌ API retornando HTML (frontend)
- ⏳ Precisa forçar redeploy da API
- ⏳ API deve retornar JSON
