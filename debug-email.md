# 🚨 DEBUG: Email de Confirmação Não Chegando

## ✅ Status Atual:

- ✅ Formulário funciona
- ✅ API recebe dados
- ✅ Validação OK
- ❌ Email de confirmação não chega

## 🔍 Possíveis Causas:

### 1. ❌ Email sendo enviado para SPAM

- **Solução:** Verificar pasta de spam/promoções
- **Verificar:** litfilmtourismconferenceucs@gmail.com

### 2. ❌ Erro na geração de PDF/Word

- **Causa:** Puppeteer ou biblioteca de documentos falhando
- **Sintoma:** Email para organização chega, mas não para usuário

### 3. ❌ Erro no transporter Gmail

- **Causa:** Gmail bloqueando emails automáticos
- **Sintoma:** Erro de autenticação ou rate limiting

### 4. ❌ Problema na rota de email

- **Causa:** Erro no código de envio
- **Sintoma:** Exception não tratada

## 🛠️ Ações Imediatas:

### 1. Verificar Logs da API

- Acessar Railway → @conferencia/api → Logs
- Procurar por erros de email

### 2. Verificar Pasta de Spam

- Gmail → Spam
- Gmail → Promoções
- Procurar por: litfilmtourismconferenceucs@gmail.com

### 3. Testar Email Simples

- Usar formulário de contato (mais simples)
- Ver se chega email de contato

## 📧 Código do Email de Confirmação:

```typescript
// Linha 111-163 em email.ts
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: data.email, // ← Email do usuário
  subject: `[LITFILM 2026] Confirmação de Submissão: ${data.title}`,
  // ... conteúdo do email
  attachments: [PDF, Word], // ← Pode estar falhando aqui
});
```

## 🎯 Próximo Passo:

Verificar logs da API para identificar o erro exato.
