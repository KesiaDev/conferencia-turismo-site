# ⏰ Checklist para quando a transição terminar

## ✅ O que já foi feito:

1. ✅ **Configuração do nginx** - HTTPS forçado e headers de segurança
2. ✅ **Configuração da API** - Middleware para forçar HTTPS
3. ✅ **Adicionado domínio** `www.turismocinematografico.com.br` no Railway
4. ⏳ **Aguardando transição DNS** no Registro.br (2h4m restantes)

---

## 🎯 O QUE FAZER QUANDO A TRANSIÇÃO TERMINAR:

### **PASSO 1: Verificar se a transição terminou**

1. Volte ao Registro.br
2. Acesse: **DNS** → **Configurar endereçamento**
3. Veja se a mensagem de transição sumiu

---

### **PASSO 2: Configurar o CNAME do www**

1. Clique em **"Configurar endereçamento"**
2. Clique em **"MODO AVANÇADO"**
3. Procure ou adicione o registro:
   - **Nome:** `www`
   - **Tipo:** `CNAME`
   - **Valor:** `mypln8yx.up.railway.app`
   - **TTL:** `3600`

---

### **PASSO 3: Verificar no Railway**

Após configurar o DNS:

1. Volte no Railway
2. Vá em **Public Networking** do serviço `@conferencia/api`
3. Aguarde 5-30 minutos
4. O status deve mudar de:
   - ❌ "Incorrect DNS setup"
   - ✅ "Setup complete"

---

### **PASSO 4: Testar o site**

Após "Setup complete":

1. Acesse: https://www.turismocinematografico.com.br
2. Deve aparecer o **cadeado verde** 🔒
3. Sem erros de SSL!

---

## 📝 Lembrete do valor correto:

- **Valor do CNAME:** `mypln8yx.up.railway.app`
- **Nome:** `www`
- **Tipo:** `CNAME`

---

## ⏰ Tempo estimado total:

- Transição DNS: **2 horas 4 minutos**
- Propagação DNS após configurar: **5-30 minutos**
- **Total:** ~2h30min a 3h

---

**Quando a transição terminar, volte aqui e siga os passos acima!** 🚀

Se precisar de ajuda depois, é só avisar!
