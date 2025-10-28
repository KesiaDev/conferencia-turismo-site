# 🌐 Configurar DNS no Registro.br

## ✅ PASSO A PASSO NO REGISTRO.BR:

### **PASSO 1: Clique em "Configurar endereçamento"**

Na tela que você está vendo, clique na opção:

```
→ Configurar endereçamento
```

---

### **PASSO 2: Entrar no Modo Avançado**

Na tela de "Configurar endereçamento":

1. **NÃO mude nada** no campo "Insira o endereço"
2. **Role a página para baixo**
3. Clique no botão **"MODO AVANÇADO"** (botão cinza escuro no final)

---

### **PASSO 3: Adicionar/Editar registro CNAME**

Na próxima tela (Modo Avançado), você verá uma lista de registros DNS:

**Para o registro `www`:**

1. **Procure** se já existe um registro com:
   - Nome: `www`
   - Tipo: `CNAME`

2. **Se EXISTE:**
   - Clique em **"Editar"** ou no ícone de lápis
   - **Altere o valor** para: `mypln8yx.up.railway.app`
   - Salve

3. **Se NÃO EXISTE:**
   - Clique em **"Adicionar registro"** ou botão "+"
   - **Nome:** `www`
   - **Tipo:** `CNAME`
   - **Valor:** `mypln8yx.up.railway.app`
   - **TTL:** `3600` (ou deixe padrão)
   - Salve

---

### **PASSO 3: Verificar se está correto**

Você deve ter algo assim:

| Nome | Tipo  | Valor                   |
| ---- | ----- | ----------------------- |
| www  | CNAME | mypln8yx.up.railway.app |

✅ **Valor correto:** `mypln8yx.up.railway.app`
❌ **Valor errado:** `turismocinematografico.com.br`

---

### **PASSO 4: Salvar e aguardar**

1. Salve as alterações
2. Aguarde 5-30 minutos para propagação
3. Volte no Railway e verifique o status

---

**Clique em "Configurar endereçamento" e me diga o que aparece!**
