# 🚀 DEPLOY FRONTEND AGORA - INSTRUÇÕES

## Problema:

O Railway não está detectando as mudanças no `railway.toml` e ainda está servindo a API no domínio principal.

## Solução Manual:

### 1. Acessar Railway Dashboard:

- Vá para: https://railway.app/dashboard
- Encontre o projeto que serve `turismocinematografico.com.br`

### 2. Forçar Redeploy:

- Clique no projeto
- Vá para aba "Deployments"
- Clique nos "..." (três pontos) do último deploy
- Selecione "Redeploy"

### 3. Ou Configurar Manualmente:

- Vá para aba "Settings"
- Verifique se está configurado para:
  - **Build Command:** `pnpm install && pnpm --filter @conferencia/web build`
  - **Start Command:** `cd apps/web && npx serve dist -p $PORT -s`

### 4. Verificar Variáveis:

- Vá para aba "Variables"
- Certifique-se que não há `PORT=3000` definido
- Deixe o Railway definir a porta automaticamente

### 5. Testar:

- Após o redeploy, acesse: https://turismocinematografico.com.br
- Deve mostrar o site normal (não mais `{"error":"Not found"}`)

## Status Atual:

- ❌ Domínio ainda servindo API
- ⏳ Precisa forçar redeploy manual
- ⏳ Frontend deve ser restaurado
