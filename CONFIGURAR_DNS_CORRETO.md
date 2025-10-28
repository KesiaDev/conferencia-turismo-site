# 🔧 Configurar DNS Corretamente

## ⚠️ Problema identificado:

O erro mostra: **"Incorrect value 'turismocinematografico.com.br'"**

Isso significa que no seu DNS, o valor do CNAME está errado!

---

## ✅ CONFIGURAÇÃO CORRETA:

### **Para `www.turismocinematografico.com.br`:**

No seu provedor de DNS (Registro.br, GoDaddy, etc.), configure:

**Registro 1:**

- **Tipo:** `CNAME`
- **Nome:** `www` (importante: é "www", não "@")
- **Valor:** `mypln8yx.up.railway.app` (o que o Railway mostrou)
- **TTL:** `3600`

---

## 📍 Como fazer no Registro.br:

1. Acesse: https://registro.br
2. Faça login
3. Clique em **"Meus Domínios"**
4. Clique no domínio: `turismocinematografico.com.br`
5. Clique em **"Alterar DNS"** ou **"Gerenciar DNS"**

6. **Edite ou adicione** o registro:
   - Se já existe um CNAME para "www", **EDITE** o valor
   - Se não existe, **ADICIONE** um novo registro
   - **Nome:** `www`
   - **Tipo:** `CNAME`
   - **Valor:** `mypln8yx.up.railway.app`
   - **TTL:** `3600`

7. **Salve as alterações**

---

## ⚠️ IMPORTANTE:

- **Valor correto:** `mypln8yx.up.railway.app` ✅
- **Valor errado:** `turismocinematografico.com.br` ❌
- **Nome:** Deve ser `www` (não "@" para este caso)

---

## ⏰ Aguarde propagação:

- Tempo: 5 minutos a 72 horas (geralmente 30 minutos)
- Após configurar, volte no Railway e clique em **"Dismiss"** ou feche o modal
- O Railway vai verificar automaticamente quando o DNS estiver correto
- Status mudará de "Incorrect DNS setup" para "Setup complete" ✅

---

**Configure o DNS com o valor correto (`mypln8yx.up.railway.app`) e depois me avise!**
