# 🚀 Configurar API Separada no Railway

## Problema Atual:

- O domínio principal `turismocinematografico.com.br` deve servir o **FRONTEND**
- A API deve ser servida em um projeto **SEPARADO** no Railway

## Solução:

### 1. Criar Novo Projeto no Railway para API:

1. **Acesse Railway Dashboard:**
   - Vá para: https://railway.app/dashboard
   - Clique em "New Project"

2. **Conectar ao GitHub:**
   - Selecione "Deploy from GitHub repo"
   - Escolha o repositório: `KesiaDev/conferencia-turismo-site`

3. **Configurar para API:**
   - **Nome do projeto:** `conferencia-api`
   - **Root Directory:** `apps/api`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`

### 2. Configurar Variáveis de Ambiente na API:

No projeto da API, adicione estas variáveis:

```
NODE_ENV=production
PORT=3001
EMAIL_USER=litfilmtourismconferenceucs@gmail.com
EMAIL_PASS=ownzmecmczapbxfb
CONFERENCE_EMAIL=litfilmtourismconferenceucs@gmail.com
CORS_ORIGIN=https://turismocinematografico.com.br
```

### 3. URLs Finais:

- **Frontend:** `https://turismocinematografico.com.br` (domínio principal)
- **API:** `https://conferencia-api-production.up.railway.app` (projeto separado)

### 4. Atualizar Frontend:

Depois de criar a API separada, atualizar o frontend para usar a nova URL da API.

## Status Atual:

- ✅ Frontend configurado no domínio principal
- ⏳ API precisa ser criada em projeto separado
- ⏳ Frontend precisa ser atualizado com nova URL da API
