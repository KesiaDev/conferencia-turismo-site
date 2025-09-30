# ✅ Checklist de Deploy - turisomcinematografico.com.br

Use esta lista para acompanhar seu progresso!

---

## 📋 Preparação

- [ ] Código está funcionando localmente (`pnpm dev`)
- [ ] Node.js 20+ instalado
- [ ] Git instalado
- [ ] Conta GitHub criada (usuário: **KesiaDev**)

---

## 🔑 GitHub Setup

- [ ] Repositório criado: `conferencia-turismo-site`
- [ ] Personal Access Token criado (ver [GITHUB_TOKEN_GUIDE.md](./GITHUB_TOKEN_GUIDE.md))
- [ ] Token salvo em local seguro
- [ ] Script executado: `scripts/setup-git.bat`
- [ ] Código enviado: `git push -u origin main`
- [ ] Código visível no GitHub

---

## 🎨 Railway (Backend)

- [ ] Conta criada em https://railway.app
- [ ] Login com GitHub feito
- [ ] Projeto criado: "Conferencia API"
- [ ] Repositório conectado
- [ ] Root Directory: `apps/api`
- [ ] Build Command: `pnpm install && pnpm build`
- [ ] Start Command: `node dist/index.js`
- [ ] Variáveis configuradas:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3001`
  - [ ] `CORS_ORIGIN=https://turisomcinematografico.com.br`
- [ ] Deploy bem-sucedido
- [ ] URL da API copiada: `___________________________________`

---

## 🌐 Vercel (Frontend)

- [ ] Conta criada em https://vercel.com
- [ ] Login com GitHub feito
- [ ] Projeto importado: "conferencia-turismo-site"
- [ ] Framework: Vite
- [ ] Root Directory: `apps/web`
- [ ] Build Command: `pnpm install && pnpm build`
- [ ] Output Directory: `dist`
- [ ] Variáveis configuradas:
  - [ ] `VITE_API_URL` = URL do Railway + `/api`
  - [ ] `VITE_GA_ID=G-XXXXXXXXXX`
- [ ] Deploy bem-sucedido
- [ ] URL Vercel funciona: `___________________________________.vercel.app`

---

## 🌍 Domínio (Registro.br)

- [ ] Login no Registro.br feito
- [ ] Domínio acessado: **turisomcinematografico.com.br**
- [ ] DNS configurado para Registro.br
- [ ] Modo avançado/Editar zona acessado
- [ ] Registros DNS adicionados:
  - [ ] A record: `@` → `76.76.21.21`
  - [ ] CNAME: `www` → `cname.vercel-dns.com`
- [ ] Alterações salvas

---

## 🔗 Vercel + Domínio

- [ ] Domínio adicionado na Vercel: `turisomcinematografico.com.br`
- [ ] WWW adicionado na Vercel: `www.turisomcinematografico.com.br`
- [ ] SSL configurado automaticamente
- [ ] Propagação DNS aguardada (~30 min)
- [ ] Site abre em https://turisomcinematografico.com.br
- [ ] Certificado SSL ativo (cadeado verde)

---

## 🔄 Ajustes Finais

- [ ] CORS atualizado no Railway (incluir www)
- [ ] Redeploy do Railway feito
- [ ] Frontend e Backend se comunicam
- [ ] Todas as páginas funcionam:
  - [ ] Home
  - [ ] Palestrantes
  - [ ] Programação
  - [ ] Chamada de Trabalhos
  - [ ] Inscrições
  - [ ] Comitês
  - [ ] Contato
- [ ] Formulário de submissão funciona
- [ ] Troca de idioma (PT/EN/ES) funciona

---

## 🧪 Testes Finais

- [ ] Site abre no celular
- [ ] Site abre em tablet
- [ ] Site abre em desktop
- [ ] Navegação funciona
- [ ] Imagens carregam
- [ ] API responde (testar no console F12)
- [ ] Performance OK (Lighthouse)
- [ ] Sem erros no console

---

## 📊 Monitoramento

- [ ] Google Analytics configurado (se houver)
- [ ] Email de submissão testado (logs Railway)
- [ ] Logs Railway sem erros
- [ ] Logs Vercel sem erros

---

## 🎉 Finalização

- [ ] Domínio 100% funcional
- [ ] HTTPS ativo
- [ ] Deploy automático configurado (git push)
- [ ] Documentação lida
- [ ] Backup do código no GitHub
- [ ] Personal Access Token guardado

---

## 📝 Informações Importantes

**Domínio**: turisomcinematografico.com.br  
**GitHub**: https://github.com/KesiaDev/conferencia-turismo-site  
**Vercel**: **********************\_\_\_**********************  
**Railway**: **********************\_\_**********************  
**Custo mensal**: ~$5 USD (Railway)

---

## 🆘 Se algo der errado

1. Consulte [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) seção "Problemas Comuns"
2. Verifique logs no Railway e Vercel
3. Use https://dnschecker.org para verificar DNS
4. Aguarde até 24h para propagação completa

---

**Data de deploy**: **\_** / **\_** / **\_**  
**Status**: ⬜ Em andamento | ⬜ Concluído

---

✨ **Boa sorte com o deploy!** ✨
