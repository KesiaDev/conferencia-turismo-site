# 🚀 CONFIGURAÇÃO CORRETA DO RAILWAY

## Problema:

O Railway está usando o build command do frontend em vez da API.

## Solução:

O arquivo `apps/api/railway.toml` agora tem a configuração correta:

```toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
```

## Para aplicar:

### Opção 1 - Redeploy Manual:

1. Railway Dashboard → Projeto `@conferencia/api`
2. Aba "Deployments"
3. Clique nos "..." do último deploy
4. Selecione "Redeploy"

### Opção 2 - Aguardar Deploy Automático:

- O Railway deve detectar a mudança no `railway.toml`
- Deploy automático em 2-3 minutos

## Teste:

Após o deploy, teste:

- `https://conferenciaapi-production.up.railway.app/test`
- Deve retornar: `{"message":"API funcionando!"}`

## Status:

- ✅ Configuração corrigida no código
- ⏳ Aguardando deploy
- ⏳ API deve funcionar após deploy
