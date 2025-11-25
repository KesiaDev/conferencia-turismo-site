# 📧 Configuração de Email Gmail SMTP

## Passo a Passo para Configurar Envio de Emails

### 1. Gerar Senha de App no Gmail

1. Acesse sua conta Gmail: **litfilmtourismconferenceucs@gmail.com**
2. Vá em: **Gerenciar sua Conta Google** → **Segurança**
3. Procure por: **Verificação em duas etapas** (precisa estar ATIVADA)
4. Depois de ativar, procure: **Senhas de app**
5. Clique em **Senhas de app**
6. Selecione:
   - App: **Email**
   - Dispositivo: **Outro (nome personalizado)**
   - Digite: **LITFILM Conference API**
7. Clique em **Gerar**
8. **COPIE** a senha de 16 caracteres (formato: xxxx xxxx xxxx xxxx)

### 2. Criar arquivo .env

Crie o arquivo `apps/api/.env` com este conteúdo:

```env
# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Email Configuration (Gmail SMTP)
EMAIL_USER=litfilmtourismconferenceucs@gmail.com
EMAIL_PASS=sua-senha-de-app-aqui

# Destination Email
CONFERENCE_EMAIL=litfilmtourismconferenceucs@gmail.com
```

**⚠️ IMPORTANTE:**

- Substitua `sua-senha-de-app-aqui` pela senha gerada no passo 1
- Cole a senha SEM espaços (remova os espaços)
- Exemplo: `abcd efgh ijkl mnop` → `abcdefghijklmnop`

### 3. Reiniciar o servidor

Após configurar o `.env`, reinicie o servidor:

```bash
# Para o servidor atual (Ctrl+C no terminal)
# Depois execute novamente:
pnpm dev
```

### 4. Testar

Acesse o site e teste:

- **Formulário de Contato:** http://localhost:5173/contact
- **Submissão de Trabalhos:** http://localhost:5173/call

Os emails serão enviados automaticamente para: `litfilmtourismconferenceucs@gmail.com`

## ✅ Como Saber se Está Funcionando

**Sem configuração:**

- ⚠️ Aparece: `Credenciais de email não configuradas. Emails serão apenas logados no console.`
- Mensagens aparecem apenas no terminal

**Com configuração correta:**

- ✅ Aparece: `Email enviado com sucesso para: litfilmtourismconferenceucs@gmail.com`
- Email chega na caixa de entrada do Gmail!

## 🔒 Segurança

- ❌ **NUNCA** commite o arquivo `.env` no Git
- ✅ O `.env` já está no `.gitignore`
- ✅ Use variáveis de ambiente em produção (Railway, Vercel, etc.)

## 📋 Checklist

- [ ] Verificação em duas etapas ativada no Gmail
- [ ] Senha de app gerada
- [ ] Arquivo `.env` criado em `apps/api/`
- [ ] Senha colada no `.env` (sem espaços)
- [ ] Servidor reiniciado
- [ ] Teste enviado com sucesso

## 🆘 Problemas Comuns

**"Autenticação falhou":**

- Verifique se a verificação em 2 etapas está ativada
- Gere uma nova senha de app
- Certifique-se de que não há espaços na senha

**"Emails não chegam":**

- Verifique a pasta de Spam
- Confirme que o email está correto no `.env`

## 📞 Suporte

Se tiver problemas, me avise que te ajudo!

