# ✅ Adicionar Domínio com WWW no Railway

## 🎯 O que fazer:

1. **Role a página para baixo** até ver o botão **"+ Custom Domain"**
2. **Clique no botão** "+ Custom Domain"
3. Na caixa de texto, digite:
   ```
   www.turismocinematografico.com.br
   ```
4. **Pressione Enter** ou clique para confirmar

---

## ⚠️ IMPORTANTE:

Depois de adicionar, você precisará configurar o DNS também para o www:

### No seu provedor de DNS (Registro.br, etc.):

**Adicione este registro:**

- Tipo: `CNAME`
- Nome: `www`
- Valor: `conferenciaapi-production.up.railway.app` (ou o valor que o Railway mostrar)
- TTL: `3600`

---

## ✅ Resultado esperado:

Após adicionar, você deve ver **dois cards**:

1. ✅ `turismocinematografico.com.br` (já está aí!)
2. ✅ `www.turismocinematografico.com.br` (novo!)

Ambos devem mostrar "Setup complete" depois de alguns minutos!

