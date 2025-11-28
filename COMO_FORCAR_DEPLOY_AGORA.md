# 🚨 COMO FORÇAR DEPLOY AGORA - RAILWAY NÃO DETECTOU

## ⚠️ SITUAÇÃO ATUAL

O Railway **NÃO está detectando** as mudanças automaticamente, mesmo após push.

## ✅ SOLUÇÃO RÁPIDA (2 minutos)

### OPÇÃO 1: REDEPLOY MANUAL (MAIS RÁPIDO) ⭐

1. **Acesse:** https://railway.app/dashboard
2. **Selecione o serviço** que precisa rebuild:
   - `@conferencia/web` (frontend)
   - `@conferencia/api` (backend)
3. **Vá em "Deployments"** (no menu lateral)
4. **Clique nos "..."** (três pontos) do **último deploy**
5. **Selecione "Redeploy"**
6. ✅ O Railway fará rebuild **SEM CACHE** conforme configurado!

**Tempo:** 5-10 minutos (build sem cache é mais lento)

---

### OPÇÃO 2: EXECUTAR SCRIPT E DEPOIS REDEPLOY MANUAL

Execute o script que força mudanças no código:

```bash
FORCE_DEPLOY_AGORA.bat
```

Depois, faça **Redeploy Manual** (Opção 1 acima).

---

## 🔍 VERIFICAR SE FUNCIONOU

Após o redeploy, verifique os logs:

1. **Deployments** → Último deploy → **View Logs**
2. Procure por:
   - ✅ `rm -rf` (limpeza de cache)
   - ✅ `pnpm store prune` (limpeza do store)
   - ✅ `--force` (instalação forçada)
   - ✅ `pnpm build` (build limpo)

---

## ⚙️ VERIFICAR CONFIGURAÇÃO (se redeploy não funcionar)

### 1. Settings → Source

- **Root Directory:** Deve estar vazio OU `apps/web` (se for serviço web)
- **Branch:** Deve ser `main`

### 2. Settings → Build

- **Custom Build Command:** Deve estar **VAZIO** ⚠️
- Se tiver algum comando, **APAGUE** para usar `railway.toml`

### 3. Settings → Deploy

- **Custom Start Command:** Deve estar **VAZIO** ⚠️
- Se tiver algum comando, **APAGUE** para usar `railway.toml`

---

## 📋 O QUE FOI CONFIGURADO

Os arquivos `.toml` agora têm comandos que:

1. ✅ **Limpam TODOS os caches:**
   - `node_modules`
   - `.vite` (cache do Vite)
   - `dist` (builds anteriores)
   - `.pnpm-store` (cache do pnpm)

2. ✅ **Forçam reinstalação:**
   - `pnpm store prune` (limpa store)
   - `pnpm install --force --no-frozen-lockfile` (instala sem cache)

3. ✅ **Fazem build limpo:**
   - Remove `dist` antes de buildar
   - Build completo do zero

---

## 🎯 RESULTADO ESPERADO

Após o redeploy manual:

- ✅ Build feito **SEM CACHE**
- ✅ Nova imagem gerada **DO ZERO**
- ✅ Todas as dependências reinstaladas
- ✅ Build limpo e atualizado

---

## ⚠️ SE AINDA NÃO FUNCIONAR

### Deletar e Recriar Serviço:

1. Settings → **Danger Zone** → **Delete Service**
2. Crie novo serviço
3. Conecte ao mesmo repositório GitHub
4. O Railway usará os arquivos `.toml` automaticamente

---

## 📞 PRÓXIMOS PASSOS

1. ✅ Execute **Redeploy Manual** no Railway (Opção 1)
2. ✅ Aguarde 5-10 minutos
3. ✅ Verifique os logs para confirmar limpeza de cache
4. ✅ Teste o site após deploy

**O rebuild será feito SEM CACHE conforme configurado!** 🚀
