# 🚀 Guia de Deploy - turisomcinematografico.com.br

## Configuração Simples e Econômica

**Custo total: ~$5/mês** (Railway) + Vercel gratuito

---

## 📋 Pré-requisitos

1. Conta no GitHub (para conectar os códigos)
2. Domínio: **turisomcinematografico.com.br** (já registrado no Registro.br)
3. Criar contas gratuitas em:
   - [Vercel](https://vercel.com) (Frontend)
   - [Railway](https://railway.app) (Backend)

---

## 🔧 PASSO 1: Subir código para o GitHub

### 1.1. Criar repositório no GitHub

1. Acesse https://github.com/new
2. Nome: `conferencia-turismo-site`
3. Deixe como **Private** (recomendado)
4. NÃO marque nenhuma opção (README, .gitignore, etc.)
5. Clique em **Create repository**

### 1.2. Fazer upload do código

No seu terminal (PowerShell), execute:

```powershell
cd C:\Users\User\Desktop\conferencia-site

# Inicializar git (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit - Conferência Turismo"

# Conectar ao GitHub
git remote add origin https://github.com/KesiaDev/conferencia-turismo-site.git

# Enviar código
git branch -M main
git push -u origin main
```

**Nota**: O GitHub vai pedir suas credenciais. Use um **Personal Access Token** (não senha).

---

## 🎨 PASSO 2: Deploy do Backend (Railway)

### 2.1. Criar conta e projeto

1. Acesse https://railway.app
2. Faça login com GitHub
3. Clique em **New Project**
4. Selecione **Deploy from GitHub repo**
5. Escolha o repositório `conferencia-turismo-site`

### 2.2. Configurar o Backend

1. Railway vai detectar automaticamente o monorepo
2. Clique em **Settings**
3. Em **Root Directory**, coloque: `apps/api`
4. Em **Build Command**, coloque: `pnpm install && pnpm build`
5. Em **Start Command**, coloque: `node dist/index.js`

### 2.3. Configurar variáveis de ambiente

1. Clique na aba **Variables**
2. Adicione as seguintes variáveis:

```
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://turisomcinematografico.com.br
```

3. Salve as alterações

### 2.4. Obter URL da API

1. Railway vai gerar uma URL automática
2. Algo como: `https://conferencia-api-production-xxxx.up.railway.app`
3. **Copie esta URL** - você vai precisar no próximo passo!

---

## 🌐 PASSO 3: Deploy do Frontend (Vercel)

### 3.1. Criar conta e importar projeto

1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em **Add New** → **Project**
4. Selecione o repositório `conferencia-turismo-site`
5. Clique em **Import**

### 3.2. Configurar o Frontend

**Framework Preset**: Vite

**Root Directory**: `apps/web`

**Build Command**: `pnpm install && pnpm build`

**Output Directory**: `dist`

**Install Command**: `pnpm install`

### 3.3. Configurar variáveis de ambiente

Antes de fazer deploy, adicione as variáveis:

```
VITE_API_URL=https://SUA-URL-DO-RAILWAY.up.railway.app/api
VITE_GA_ID=G-XXXXXXXXXX
```

⚠️ **Importante**: Substitua pela URL real do Railway que você copiou!

### 3.4. Fazer deploy

1. Clique em **Deploy**
2. Aguarde ~2 minutos
3. Vercel vai gerar uma URL temporária: `https://conferencia-turismo-site.vercel.app`

---

## 🌍 PASSO 4: Configurar o Domínio no Registro.br

### 4.1. Acessar painel do Registro.br

1. Acesse https://registro.br
2. Faça login
3. Vá em **Meus Domínios**
4. Clique em **turisomcinematografico.com.br**

### 4.2. Configurar DNS

1. Clique em **Alterar Servidores DNS**
2. Escolha **Usar servidores do Registro.br**
3. Vá em **Modo Avançado** ou **Editar Zona**

### 4.3. Adicionar registros DNS

Adicione os seguintes registros:

**Para o domínio principal (turisomcinematografico.com.br):**

| Tipo  | Nome | Valor                | TTL  |
| ----- | ---- | -------------------- | ---- |
| A     | @    | 76.76.21.21          | 3600 |
| CNAME | www  | cname.vercel-dns.com | 3600 |

**OU use apenas CNAME (recomendado):**

| Tipo  | Nome | Valor                | TTL  |
| ----- | ---- | -------------------- | ---- |
| CNAME | @    | cname.vercel-dns.com | 3600 |
| CNAME | www  | cname.vercel-dns.com | 3600 |

💡 **Nota**: Alguns provedores não permitem CNAME no root (@). Nesse caso, use A record.

---

## 🔗 PASSO 5: Conectar Domínio no Vercel

### 5.1. Adicionar domínio customizado

1. No painel da Vercel, vá em **Settings** → **Domains**
2. Digite: `turisomcinematografico.com.br`
3. Clique em **Add**
4. Vercel vai detectar automaticamente
5. Repita para `www.turisomcinematografico.com.br`

### 5.2. Aguardar propagação DNS

- **Tempo**: 5 minutos a 48 horas (geralmente 30 minutos)
- Vercel vai emitir certificado SSL automaticamente

### 5.3. Verificar

Acesse: https://turisomcinematografico.com.br

✅ Você deve ver o site funcionando com HTTPS!

---

## 🔄 PASSO 6: Atualizar CORS no Backend

Agora que o frontend está no domínio real, atualize o Railway:

1. Volte no Railway
2. Em **Variables**, edite `CORS_ORIGIN`:

```
CORS_ORIGIN=https://turisomcinematografico.com.br,https://www.turisomcinematografico.com.br
```

3. Railway vai fazer redeploy automático

---

## ✅ PASSO 7: Testar Tudo

### 7.1. Checklist

- [ ] Site abre em https://turisomcinematografico.com.br
- [ ] Redirecionamento www funciona
- [ ] Certificado SSL está ativo (cadeado verde)
- [ ] Todas as páginas funcionam (Home, Palestrantes, Programação, etc.)
- [ ] Trocar idioma (PT/EN/ES) funciona
- [ ] Formulário de submissão funciona
- [ ] API responde (testar envio de trabalho)

### 7.2. Teste da API

Abra o console do navegador (F12) e execute:

```javascript
fetch("https://SUA-URL-RAILWAY.up.railway.app/api/meta")
  .then((r) => r.json())
  .then(console.log);
```

Deve retornar os dados da conferência.

---

## 📊 Custos Mensais

| Serviço   | Custo        | O que inclui                   |
| --------- | ------------ | ------------------------------ |
| Vercel    | **Gratuito** | Frontend + SSL + CDN + Domínio |
| Railway   | **$5/mês**   | Backend Node.js + 500h         |
| **TOTAL** | **~$5/mês**  | Site completo em produção      |

---

## 🔄 Como Atualizar o Site

Sempre que fizer alterações:

```powershell
# Fazer commit das mudanças
git add .
git commit -m "Descrição das mudanças"
git push

# Vercel e Railway fazem deploy automático!
```

⏱️ Deploy leva ~2 minutos

---

## 🆘 Problemas Comuns

### Erro de CORS

**Solução**: Verifique se `CORS_ORIGIN` no Railway está correto

### Site não abre

**Solução**: Aguarde propagação DNS (até 24h). Use https://dnschecker.org para verificar

### Certificado SSL não ativa

**Solução**: Remova e adicione o domínio novamente no Vercel

### Build falha no Vercel

**Solução**: Verifique se `Root Directory` está `apps/web`

### API não responde

**Solução**: Verifique logs no Railway. `Root Directory` deve ser `apps/api`

---

## 📞 Suporte

- **Vercel**: https://vercel.com/support
- **Railway**: https://railway.app/help
- **Registro.br**: https://registro.br/ajuda/

---

## 🎉 Pronto!

Seu site estará no ar em:

- ✅ https://turisomcinematografico.com.br
- ✅ HTTPS automático
- ✅ Deploy contínuo (CI/CD)
- ✅ Backup no GitHub

**Tempo total**: ~30 minutos + propagação DNS
