# 🚀 COMO COLOCAR O SITE NO AR

## ✅ O que está pronto:

- ✅ Código funcionando 100%
- ✅ Build de produção passando
- ✅ Sistema de submissões completo
- ✅ Geração de PDFs e Word
- ✅ Emails configurados

## ⚠️ O que falta ANTES de colocar no ar:

### 1. 📧 Configurar Email do Gmail (5 minutos)

**Por que precisa:** Para enviar as submissões e confirmações por email

**Como fazer:**

1. Acesse: https://myaccount.google.com/apppasswords
2. Faça login com `litfilmtourismconferenceucs@gmail.com`
3. Crie uma "Senha de app" com o nome "Conferencia Website"
4. Copie a senha gerada (formato: `xxxx xxxx xxxx xxxx`)
5. Guarde essa senha - você vai precisar no Railway

### 2. 💳 Adicionar Informações de Pagamento (opcional, pode ser depois)

No arquivo `apps/web/src/pages/Fees.tsx`, há seções comentadas para:

- QR Code PIX
- Chave PIX
- Link de pagamento
- Dados bancários

Pode deixar para adicionar depois que o site estiver no ar.

---

## 🌐 DEPLOY NO RAILWAY (15 minutos)

### Passo 1: Fazer Push para GitHub

```bash
git add .
git commit -m "chore: preparando para deploy"
git push origin main
```

### Passo 2: Railway

1. **Acesse:** https://railway.app
2. **Login** com GitHub
3. **New Project** → "Deploy from GitHub repo"
4. **Selecione** o repositório `conferencia-site`

### Passo 3: Criar 2 Serviços

#### Serviço 1: API (Backend)

1. Click em "+ New Service"
2. Selecione "From GitHub repo"
3. Escolha `conferencia-site`
4. Em **Settings**:
   - **Root Directory**: `apps/api`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `node dist/index.js`

5. Em **Variables**, adicione:

   ```
   PORT=3000
   NODE_ENV=production
   EMAIL_USER=litfilmtourismconferenceucs@gmail.com
   EMAIL_PASS=xxxx-xxxx-xxxx-xxxx  (cole a senha de APP aqui)
   CONFERENCE_EMAIL=litfilmtourismconferenceucs@gmail.com
   CORS_ORIGIN=${{RAILWAY_STATIC_URL}}
   ```

6. **Generate Domain** - Copie a URL gerada (ex: `https://api-xxx.up.railway.app`)

#### Serviço 2: WEB (Frontend)

1. Click em "+ New Service" novamente
2. Selecione o mesmo repo
3. Em **Settings**:
   - **Root Directory**: `apps/web`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: (deixe vazio, Railway detecta automático)

4. Em **Variables**, adicione:

   ```
   VITE_API_URL=https://api-xxx.up.railway.app/api
   ```

   (Cole a URL da API que você copiou no passo anterior)

5. **Generate Domain** - Esta será a URL pública do seu site!

### Passo 4: Atualizar CORS

1. Volte no serviço **API**
2. Em **Variables**, edite `CORS_ORIGIN`
3. Coloque a URL do frontend: `https://web-xxx.up.railway.app`
4. Redeploy (Railway faz automático)

---

## ✅ PRONTO!

Seu site está no ar em: `https://web-xxx.up.railway.app`

### Testar:

1. ✅ Acesse o site
2. ✅ Vá em "Chamada de Trabalhos"
3. ✅ Faça uma submissão de teste
4. ✅ Verifique se recebeu o email
5. ✅ Abra os anexos PDF e Word

---

## 🔧 Se algo der errado:

### Erro: "Cannot connect to API"

- Verifique se a URL da API está correta em `VITE_API_URL`
- Verifique se o serviço API está rodando no Railway

### Erro: "Email not sent"

- Verifique `EMAIL_USER` e `EMAIL_PASS`
- Confirme que é uma senha de APP, não a senha normal
- Verifique os logs no Railway

### Erro: "CORS"

- Atualize `CORS_ORIGIN` com a URL do frontend
- Redeploy o backend

---

## 💡 Dicas

1. **Domínio Próprio:**
   - No Railway, vá em Settings → Domains
   - Adicione seu domínio (ex: conferencia.ucs.br)
   - Configure DNS conforme instruções

2. **Ver Logs:**
   - No Railway, click no serviço → Deployments → View Logs

3. **Custos:**
   - Railway: $5/mês por serviço (tem trial grátis)
   - Total: ~$10/mês para site + API

---

## 📞 Próximos Passos Após Deploy

1. ✅ Testar todas as páginas
2. ✅ Fazer submissões de teste
3. ✅ Adicionar informações de pagamento
4. ✅ Compartilhar URL com a equipe
5. ✅ Divulgar! 🎉

---

**Tempo total:** 20-30 minutos
**Dificuldade:** ⭐⭐☆☆☆ (Fácil)
