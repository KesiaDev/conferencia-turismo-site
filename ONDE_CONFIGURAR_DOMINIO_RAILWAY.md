# 🌐 Onde Configurar Domínio no Railway

## ❌ NÃO é em Project Settings!

As configurações de domínio **não ficam** na página "Project Settings".

---

## ✅ PASSO A PASSO CORRETO:

### **PASSO 1: Voltar para Architecture**

1. **Feche** a tela de "Project Settings" (clique no X no canto superior direito)
2. Ou clique na aba **"Architecture"** no topo

---

### **PASSO 2: Clicar no Card do Serviço**

Na página Architecture, você vê dois cards:

- **Card esquerdo:** `@conferencia/web`
- **Card direito:** `@conferencia/api` (este tem o domínio `turismocinematografico.com...`)

**Clique no card direito:** `@conferencia/api`

---

### **PASSO 3: Procurar por "Settings" ou "Networking"**

Dentro do serviço, você verá várias abas/opções. Procure por:

- **"Settings"**
- **"Networking"**
- **"Public Networking"**
- Ou um botão com ícone de **globo** 🌐

---

### **PASSO 4: Adicionar Domínio Customizado**

Na seção de Networking/Settings do serviço, você encontrará:

1. Um campo ou botão para **"Custom Domain"** ou **"Generate Domain"**
2. Clique para adicionar: `www.turismocinematografico.com.br`
3. Adicione também: `turismocinematografico.com.br`

---

## 🎯 Caminho Visual:

```
Architecture
  └─> [Card: @conferencia/api] ← CLIQUE AQUI
        └─> Settings ou Networking
              └─> Custom Domain / Generate Domain
                    └─> Adicionar domínio
```

---

## 🆘 Se ainda não encontrar:

### **Alternativa 1: Generate Domain (Rápido)**

1. Ao clicar no serviço `@conferencia/api`
2. Procure por um botão **"Generate Domain"**
3. Clique nele - Railway vai gerar um domínio tipo `xxxx.up.railway.app`
4. Depois você pode adicionar seu domínio customizado

### **Alternativa 2: Via Railway CLI (Terminal)**

Se preferir usar linha de comando:

```bash
# Instalar Railway CLI (se não tiver)
npm i -g @railway/cli

# Fazer login
railway login

# Conectar ao projeto
railway link

# Adicionar domínio
railway domain add www.turismocinematografico.com.br
railway domain add turismocinematografico.com.br
```

---

## 📍 Resumo:

1. ❌ **NÃO** é em Project Settings
2. ✅ **SIM**, é clicando no **card do serviço** `@conferencia/api`
3. ✅ Dentro do serviço, procure por **"Networking"** ou **"Settings"**
4. ✅ Lá você encontrará opções de domínio

---

**Tente clicar no card `@conferencia/api` e me diga o que aparece!**
