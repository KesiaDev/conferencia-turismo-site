# 🔍 Verificar Logs do Railway

## Para diagnosticar o problema:

1. **Acesse o Railway Dashboard:**
   - Vá para: https://railway.app/dashboard
   - Clique no projeto `@conferencia/api`

2. **Verifique os Logs:**
   - Clique na aba "Logs" ou "View logs"
   - Procure por erros recentes

3. **Erros Comuns:**
   - `Error: Cannot find module` → Dependência faltando
   - `Error: listen EADDRINUSE` → Porta já em uso
   - `Error: Cannot resolve module` → Import incorreto
   - `Error: spawn ENOENT` → Comando não encontrado

4. **Verificar Deploy:**
   - Vá para aba "Deployments"
   - Veja se o último deploy foi bem-sucedido
   - Se falhou, clique para ver detalhes

## Possíveis Soluções:

### Se erro de módulo:

```bash
npm install --production
```

### Se erro de porta:

```bash
# Verificar se PORT está definida
echo $PORT
```

### Se erro de build:

```bash
npm run build
```

## Comandos para testar localmente:

```bash
cd apps/api
npm run build
npm start
```

## Verificar se funciona localmente:

```bash
curl http://localhost:3001/api/health
```
