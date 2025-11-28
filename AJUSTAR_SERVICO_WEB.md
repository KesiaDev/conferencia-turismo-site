# 🚀 Ajustar Serviço Web - Guia Rápido (2 minutos)

## ✅ Situação Atual

- ✅ **API funcionando** - Site está no ar via `@conferencia/api`
- ❌ **Serviço Web falhando** - Mas não afeta o site (API já serve o frontend)

## 🎯 Objetivo

Ajustar `@conferencia/web` para buildar **apenas o frontend** (sem API, sem Chromium), reduzindo tempo de build de ~10min para ~2min.

## 📋 Passos no Dashboard Railway

### 1. Acesse o Dashboard

- Vá para: https://railway.app/dashboard
- Projeto: **iluminação rara** (produção)

### 2. Configure o Serviço `@conferencia/web`

- Clique no card **@conferencia/web** (com status "Fracassado")
- Vá para a aba **Configurações** (Settings)
- Role até a seção **Fonte** (Source)

### 3. Ajuste o Root Directory

- Encontre o campo **Root Directory**
- Altere de: (vazio ou raiz)
- Para: `apps/web`
- **Salve** as alterações

### 4. Verifique Build Command (opcional)

- Na seção **Construir** (Build), verifique se está:
  - `pnpm install && pnpm --filter @conferencia/web build`
- Se não estiver, ajuste para o comando acima

### 5. Verifique Start Command (opcional)

- Na seção **Implantar** (Deploy), verifique se está:
  - `cd apps/web && npx serve dist -s -l $PORT`
- Se não estiver, ajuste para o comando acima

### 6. Force Redeploy

- Vá para a aba **Implantações** (Deployments)
- Clique nos **"..."** (três pontos) do último deploy
- Selecione **"Redeploy"** (Redeploy)

### 7. Aguarde (2-3 minutos)

- O build deve completar em ~2 minutos (muito mais rápido!)
- Status deve mudar para ✅ **Sucesso**

## ⚠️ Importante

- **NÃO mexa no serviço `@conferencia/api`** - ele está funcionando perfeitamente
- O site continuará funcionando normalmente durante todo o processo
- A API continuará servindo o frontend até o serviço web estar pronto

## ✅ Resultado Esperado

Após o ajuste:

- ✅ Build do serviço web em ~2 minutos (não mais 10+)
- ✅ Sem instalação de Chromium (não é necessário para frontend)
- ✅ Serviço web servindo apenas arquivos estáticos
- ✅ Site funcionando normalmente (API + Web)

## 🔍 Verificação

Após o redeploy, verifique:

1. Status do serviço `@conferencia/web` = ✅ Sucesso
2. Site acessível em: https://turismocinematografico.com.br
3. Foto do André aparecendo corretamente

---

**Tempo estimado:** 2 minutos  
**Risco:** ⭐☆☆☆☆ (Muito baixo - não afeta API que está funcionando)
