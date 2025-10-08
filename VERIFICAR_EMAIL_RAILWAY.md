# 📧 VERIFICAR CONFIGURAÇÃO DE EMAIL NO RAILWAY

## Problema:

Submissão aceita (201 Created) mas email não foi recebido.

## Verificações Necessárias:

### 1. Railway Dashboard - Variáveis de Ambiente:

- Acesse: https://railway.app/dashboard
- Projeto: `@conferencia/api`
- Aba: "Variables"

**Verificar se existem:**

```
EMAIL_USER=litfilmtourismconferenceucs@gmail.com
EMAIL_PASS=ownzmecmczapbxfb
CONFERENCE_EMAIL=litfilmtourismconferenceucs@gmail.com
```

### 2. Verificar Email:

- **Caixa de entrada:** `kesiawnandi@gmail.com`
- **Spam/Lixo eletrônico:** Verificar se foi para spam
- **Filtros:** Verificar se há filtros bloqueando

### 3. Logs do Railway:

- Railway Dashboard → Projeto `@conferencia/api`
- Aba: "Deployments"
- Clique no último deploy
- Ver logs para erros de email

### 4. Teste Manual:

Se as variáveis não estiverem configuradas:

1. Adicionar no Railway Dashboard
2. Fazer redeploy
3. Testar novamente

## Status Atual:

- ✅ API funcionando (201 Created)
- ✅ Submissão aceita
- ❌ Email não recebido
- ⏳ Verificar configuração Railway
