# 🚀 CONFIGURAR SERVIÇO WEB NO RAILWAY - GUIA COMPLETO

## ⚠️ PROBLEMA ATUAL:

O serviço `@conferencia/web` está usando a configuração da raiz que faz build da API também, causando demora excessiva.

## ✅ SOLUÇÃO:

Configurar o serviço web para usar apenas o build do frontend.

---

## 📋 PASSO A PASSO (5 minutos):

### 1. Acesse o Railway Dashboard:

- Vá para: https://railway.app/dashboard
- Clique no projeto **rare-illumination** (ou o projeto que contém seus serviços)
- Você verá dois serviços: `@conferencia/web` e `@conferencia/api`

### 2. Configure o Serviço WEB:

#### 2.1. Clique no serviço `@conferencia/web`

#### 2.2. Vá em **Settings** (Configurações)

#### 2.3. Configure **Source** (Origem):

- **Root Directory**: `apps/web`
- ✅ Isso fará o Railway usar o `apps/web/railway.toml` automaticamente

#### 2.4. Configure **Build** (Opcional - já está no railway.toml):

- Se aparecer "Custom Build Command", deixe vazio ou configure:
  - `pnpm install && pnpm build`
- ✅ O Railway vai usar o `apps/web/railway.toml` automaticamente

#### 2.5. Configure **Deploy** (Opcional - já está no railway.toml):

- Se aparecer "Custom Start Command", deixe vazio ou configure:
  - `npx serve dist -s -l $PORT`
- ✅ O Railway vai usar o `apps/web/railway.toml` automaticamente

#### 2.6. **SALVE** todas as alterações

### 3. Forçar Redeploy:

#### 3.1. Vá para a aba **Deployments**

#### 3.2. Clique nos **"..."** (três pontos) do último deploy

#### 3.3. Selecione **"Redeploy"**

### 4. Aguardar (2-3 minutos):

- O build deve completar em ~1-2 minutos (muito mais rápido!)
- O deploy deve inicializar em segundos

---

## ✅ RESULTADO ESPERADO:

Após a configuração, o serviço web vai:

1. ✅ Fazer build **apenas do frontend** (sem API, sem Chromium)
2. ✅ Build completar em **~1-2 minutos** (não mais 10+ minutos)
3. ✅ Inicializar em **segundos** (não mais 20+ minutos)
4. ✅ Servir apenas os arquivos estáticos do frontend

---

## 🧪 TESTE APÓS CONFIGURAÇÃO:

1. Acesse: https://turismocinematografico.com.br
2. O site deve carregar normalmente
3. Verifique se não há erros no console

---

## 📝 NOTAS IMPORTANTES:

- ⚠️ **NÃO mexa no serviço `@conferencia/api`** - ele está funcionando corretamente
- ✅ O serviço API continua servindo o frontend também (arquitetura atual)
- ✅ O serviço WEB agora serve apenas o frontend (mais rápido)
- ✅ Ambos os serviços podem funcionar em paralelo

---

## 🔧 SE ALGO DER ERRADO:

### Erro: "Build failed"

- Verifique se o Root Directory está exatamente: `apps/web` (sem barra no final)
- Verifique os logs em **Deployments → View Logs**

### Erro: "Service not starting"

- Verifique se o Start Command está: `npx serve dist -s -l $PORT`
- Verifique se a porta `$PORT` está sendo usada corretamente

### Erro: "Cannot find module"

- Verifique se o build completou corretamente
- Verifique os logs de build

---

**Tempo estimado:** 5 minutos
**Dificuldade:** ⭐⭐☆☆☆ (Fácil)
