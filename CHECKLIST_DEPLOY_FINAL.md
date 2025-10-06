# ✅ Checklist Final para Deploy

## 📋 Pré-Deploy

### 1. ⚙️ Configurar Variáveis de Ambiente

#### Backend (`apps/api/.env`):

```env
PORT=3000
NODE_ENV=production

# Email Gmail - OBRIGATÓRIO para envio de submissões
EMAIL_USER=litfilmtourismconferenceucs@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx  # Senha de APP do Gmail

# Email da conferência
CONFERENCE_EMAIL=litfilmtourismconferenceucs@gmail.com

# CORS - URL do seu site
CORS_ORIGIN=https://seu-dominio.com
```

**⚠️ IMPORTANTE - Senha de APP do Gmail:**

1. Acesse: https://myaccount.google.com/apppasswords
2. Crie uma senha de app para "Outro (nome personalizado)"
3. Copie a senha gerada (formato: xxxx-xxxx-xxxx-xxxx)
4. Cole em `EMAIL_PASS`

#### Frontend (`apps/web/.env`):

```env
VITE_API_URL=https://seu-dominio.com/api

# Google Analytics (opcional)
VITE_GA_ID=G-XXXXXXXXXX
```

### 2. 🧪 Testar Localmente

```bash
# Build de produção
pnpm build

# Testar build
pnpm start
```

### 3. 📝 Informações de Pagamento

**PENDENTE**: Adicionar em `apps/web/src/pages/Fees.tsx`:

- [ ] QR Code PIX (salvar em `/public/pix-qrcode.png`)
- [ ] Chave PIX
- [ ] Link de pagamento online
- [ ] Dados bancários

---

## 🚀 Opções de Deploy

### Opção 1: Railway (RECOMENDADO - Mais Fácil)

**Vantagens:**

- ✅ Deploy automático do GitHub
- ✅ Suporta monorepo
- ✅ HTTPS grátis
- ✅ Banco de dados se precisar
- ✅ Free tier disponível

**Passos:**

1. **Fazer push para GitHub:**

```bash
git add .
git commit -m "feat: site pronto para deploy"
git push origin main
```

2. **No Railway (https://railway.app):**
   - Login com GitHub
   - New Project → Deploy from GitHub repo
   - Selecionar `conferencia-site`
   - Criar dois serviços:
     - **API**: Root directory = `apps/api`
     - **Web**: Root directory = `apps/web`

3. **Configurar variáveis de ambiente** (no painel do Railway):

   **Serviço API:**

   ```
   PORT=3000
   NODE_ENV=production
   EMAIL_USER=litfilmtourismconferenceucs@gmail.com
   EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
   CONFERENCE_EMAIL=litfilmtourismconferenceucs@gmail.com
   CORS_ORIGIN=https://seu-dominio-web.up.railway.app
   ```

   **Serviço Web:**

   ```
   VITE_API_URL=https://seu-dominio-api.up.railway.app/api
   ```

4. **Deploy automático!** ✨

---

### Opção 2: Vercel (Frontend) + Railway (Backend)

**Frontend no Vercel:**

```bash
cd apps/web
vercel
```

**Backend no Railway** (mesmo processo acima)

---

### Opção 3: VPS próprio (Digital Ocean, AWS, etc)

1. **Instalar no servidor:**

```bash
# Instalar Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Clonar repositório
git clone seu-repo
cd conferencia-site
pnpm install
```

2. **Configurar .env** (ver seção 1 acima)

3. **Build:**

```bash
pnpm build
```

4. **Usar PM2 para rodar:**

```bash
npm install -g pm2

# Backend
cd apps/api
pm2 start dist/index.js --name api

# Frontend (usar nginx)
cd apps/web
# Copiar dist/ para /var/www/html
```

5. **Nginx como proxy:**
   Ver arquivo `nginx.conf` incluído

---

## 🔍 Checklist Pré-Deploy

- [ ] ✅ Backend compilando sem erros
- [ ] ✅ Frontend compilando sem erros
- [ ] ✅ Formulários testados localmente
- [ ] ✅ Emails sendo enviados
- [ ] ✅ PDFs e Word sendo gerados
- [ ] ⚠️ Informações de pagamento adicionadas (PENDENTE)
- [ ] 🔒 Variáveis de ambiente configuradas
- [ ] 📧 Senha de APP do Gmail criada
- [ ] 🌍 Domínio configurado (se houver)

---

## 🎯 Deploy Rápido (Railway)

**5 passos rápidos:**

1. Criar conta no Railway: https://railway.app
2. Conectar GitHub
3. Deploy do repositório
4. Adicionar variáveis de ambiente
5. Pronto! ✨

**Tempo estimado:** 15 minutos

---

## 📞 Suporte

Se tiver problemas:

- Ver `DEPLOY_GUIDE.md` para mais detalhes
- Documentação Railway: https://docs.railway.app
- Email: litfilmtourismconferenceucs@gmail.com

---

**🎉 O site está 95% pronto para deploy!**

Falta apenas:

1. Configurar email do Gmail (senha de APP)
2. Fazer push para GitHub
3. Deploy no Railway
4. Adicionar informações de pagamento

**Tempo total estimado:** 30 minutos
