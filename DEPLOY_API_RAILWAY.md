# 🚀 Deploy da API no Railway

## Passos para fazer o deploy da API:

### 1. Login no Railway

```bash
railway login
```

- Abrirá o navegador para fazer login
- Autorize o Railway CLI

### 2. Criar novo projeto para a API

```bash
cd apps/api
railway new
```

- Escolha um nome para o projeto (ex: "conferencia-api")
- Selecione a organização

### 3. Configurar variáveis de ambiente

```bash
railway variables set NODE_ENV=production
railway variables set PORT=3001
```

### 4. Configurar email (opcional)

```bash
railway variables set EMAIL_USER=seu-email@gmail.com
railway variables set EMAIL_PASS=sua-senha-de-app
```

### 5. Fazer deploy

```bash
railway up
```

### 6. Obter URL da API

```bash
railway domain
```

## ⚠️ Importante:

1. **URL da API**: Após o deploy, você receberá uma URL como `https://conferencia-api-production.up.railway.app`

2. **Atualizar Frontend**: Você precisará atualizar a variável `VITE_API_URL` no frontend para usar a nova URL da API

3. **Email**: Se não configurar as variáveis de email, a API funcionará mas não enviará emails

## 🔧 Configuração do Frontend:

Após obter a URL da API, atualize o arquivo `apps/web/.env`:

```
VITE_API_URL=https://sua-api-url.up.railway.app/api
```

## 📋 Verificação:

1. Acesse a URL da API + `/health` para verificar se está funcionando
2. Teste o formulário de submissão no frontend
3. Verifique os logs no Railway dashboard

## 🆘 Problemas Comuns:

- **Build falha**: Verifique se todas as dependências estão no `package.json`
- **Runtime error**: Verifique os logs no Railway dashboard
- **CORS error**: A API já está configurada para aceitar todas as origens
