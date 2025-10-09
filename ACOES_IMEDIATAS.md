# 🚨 AÇÕES IMEDIATAS - Site Conferência LITFILM 2026

**Última atualização:** 9 de outubro de 2025  
**Status do site:** ✅ No ar com melhorias implementadas

---

## ⚡ FAÇA AGORA (Próximas 24h)

### 1. ✅ Verificar se Emails Estão Funcionando (CRÍTICO)

**Por quê:** Submissões podem não estar sendo enviadas

**Como verificar:**

```bash
# No Railway, verificar variáveis de ambiente:
EMAIL_USER=litfilmtourismconferenceucs@gmail.com
EMAIL_PASS=[senha de app do Gmail]
CONFERENCE_EMAIL=litfilmtourismconferenceucs@gmail.com
```

**Teste:**

1. Fazer submissão de teste no site
2. Verificar se chegou email na caixa de entrada
3. Verificar logs do Railway para mensagens de erro

**Se não estiver funcionando:**

- Configurar senha de app do Gmail: https://myaccount.google.com/apppasswords
- Atualizar variáveis de ambiente no Railway
- Verificar se Gmail não está bloqueando o acesso

---

### 2. 🧪 Testar Todas as Correções

**Checklist de testes:**

#### Página 404:

- [ ] Acessar URL inexistente (ex: `/pagina-que-nao-existe`)
- [ ] Verificar se aparece página 404 bonita
- [ ] Clicar em "Voltar para página inicial" - deve funcionar
- [ ] Clicar em "Entre em contato" - deve ir para /contact
- [ ] Verificar responsividade (mobile, tablet, desktop)

#### Validação de Resumo:

- [ ] Ir para /call
- [ ] Digitar resumo com mais de 300 palavras
- [ ] Verificar se mostra contador vermelho
- [ ] Tentar enviar - deve bloquear e mostrar alerta
- [ ] Reduzir para 300 palavras
- [ ] Verificar se contador fica normal

#### Validação de Keywords:

- [ ] Digitar apenas 2 palavras-chave
- [ ] Tentar enviar - deve bloquear
- [ ] Digitar 6 palavras-chave
- [ ] Tentar enviar - deve bloquear
- [ ] Digitar 3-5 palavras-chave
- [ ] Deve permitir envio

#### Menu Mobile:

- [ ] Abrir site em celular ou DevTools mobile
- [ ] Clicar no botão de menu (hambúrguer)
- [ ] Verificar se menu abre
- [ ] Clicar em um link - menu deve fechar
- [ ] Clicar no logo - menu deve fechar

#### Logo no Header:

- [ ] Verificar se logo aparece com cor correta (#e0a085)
- [ ] Não deve haver erro no console sobre filtro

---

### 3. 📊 Adicionar Google Analytics (30 minutos)

**Passo a passo:**

1. Criar conta Google Analytics 4: https://analytics.google.com
2. Copiar Measurement ID (formato: G-XXXXXXXXXX)
3. Criar arquivo `apps/web/src/utils/analytics.ts`:

```typescript
export const GA_TRACKING_ID = "G-XXXXXXXXXX"; // Substituir

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: any) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

4. Adicionar ao `apps/web/index.html` (antes do </head>):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");
</script>
```

---

## 📅 FAÇA ESTA SEMANA

### 4. 🌍 Preparar Multilinguismo (EN e ES)

**Por quê:** Conferência é internacional, precisa de outros idiomas

**Estrutura de arquivos:**

```
apps/web/src/locales/
├── pt/
│   └── common.json (✅ já existe)
├── en/
│   └── common.json (❌ criar)
└── es/
    └── common.json (❌ criar)
```

**Ação rápida:**

1. Duplicar `pt/common.json` para `en/common.json` e `es/common.json`
2. Traduzir textos (usar ChatGPT/DeepL)
3. Adicionar seletor de idioma no header

**Estimativa:** 2-3 horas

---

### 5. 🖼️ Otimizar Imagens dos Palestrantes

**Problema:** Fotos muito pesadas

**Ações:**

```bash
# Instalar ferramentas
npm install -g sharp-cli

# Converter para WebP (muito mais leve)
cd apps/web/public/speakers/
for f in *.png; do
  npx sharp -i "$f" -o "${f%.png}.webp" -f webp -q 85
done
```

**Atualizar componentes:**

```tsx
// Usar <picture> para WebP com fallback
<picture>
  <source srcSet="/speakers/nome.webp" type="image/webp" />
  <img src="/speakers/nome.png" alt="Nome" />
</picture>
```

**Estimativa:** 1 hora

---

## 🛠️ FAÇA ESTE MÊS

### 6. 🔒 Adicionar Proteção Anti-Spam

**Opção 1: reCAPTCHA v3 (recomendado)**

```bash
npm install react-google-recaptcha-v3
```

**Opção 2: Rate Limiting** (mais simples)

- Limitar submissões por IP
- Já implementado na API (express-rate-limit)
- Verificar se está ativo no Railway

---

### 7. 📈 Melhorar Performance

**Usar Lighthouse para análise:**

```bash
# DevTools > Lighthouse > Generate report
```

**Ações típicas:**

- Code splitting com React.lazy()
- Lazy loading de imagens
- Comprimir bundle com Vite
- CDN para assets estáticos

---

## 🚫 NÃO FAÇA (Armadilhas Comuns)

### ❌ NÃO fazer deploy sem testar localmente

```bash
# SEMPRE testar antes:
cd apps/web
npm run build
npm run preview
```

### ❌ NÃO remover console.logs da API

- Logs da API são úteis para debugging
- Só foram removidos do frontend (navegador do usuário)

### ❌ NÃO mudar estrutura de dados sem atualizar tipos

- Sempre atualizar `apps/web/src/types/index.ts`
- Sempre atualizar schemas Zod na API

### ❌ NÃO fazer force push para main/master

```bash
# NUNCA:
git push --force origin main

# SE PRECISAR reverter:
git revert <commit-hash>
git push origin main
```

---

## 📞 CONTATOS DE EMERGÊNCIA

### Se algo quebrar:

1. **Verificar logs:**

   ```bash
   # Railway logs
   railway logs

   # Ou no dashboard Railway
   ```

2. **Rollback rápido:**

   ```bash
   git log --oneline  # ver commits
   git revert <commit-hash>  # reverter mudanças
   git push origin main
   ```

3. **Status do site:**
   - Frontend: [URL do Railway/Vercel]
   - API: https://conferenciaapi-production.up.railway.app/api
   - Email: litfilmtourismconferenceucs@gmail.com

---

## 📋 CHECKLIST COMPLETO

### Hoje:

- [ ] Verificar se emails funcionam
- [ ] Testar página 404
- [ ] Testar validações de formulário
- [ ] Testar menu mobile
- [ ] Verificar logo no header

### Esta Semana:

- [ ] Adicionar Google Analytics
- [ ] Otimizar imagens
- [ ] Preparar multilinguismo (EN/ES)
- [ ] Testar em diferentes browsers

### Este Mês:

- [ ] Implementar CAPTCHA
- [ ] Melhorar performance (Lighthouse 90+)
- [ ] Testes de acessibilidade
- [ ] Adicionar monitoramento

---

## 🎯 PRIORIDADES

**Prioridade 1 (CRÍTICO):**

1. ✅ Correções já implementadas (concluído)
2. ⚠️ Verificar emails funcionando
3. ⚠️ Testar todas as funcionalidades

**Prioridade 2 (IMPORTANTE):** 4. Google Analytics 5. Multilinguismo (EN/ES) 6. Otimização de imagens

**Prioridade 3 (RECOMENDADO):** 7. CAPTCHA 8. Performance 9. Monitoramento

---

## 💡 DICAS RÁPIDAS

### Testar validações rapidamente:

```javascript
// No console do navegador (/call):
// Forçar contador de palavras
document.querySelector("textarea#abstract").value = "palavra ".repeat(301);
document.querySelector("textarea#abstract").dispatchEvent(new Event("input", { bubbles: true }));
```

### Verificar se variáveis de ambiente estão corretas:

```bash
# Railway CLI
railway variables

# Ou no dashboard Railway > Variables
```

### Gerar build de produção local:

```bash
cd apps/web
npm run build
npm run preview  # Testa build local
```

---

## ✅ TUDO CERTO?

Se você seguiu todas as ações acima:

- ✅ Site está funcionando perfeitamente
- ✅ Emails chegando
- ✅ Validações funcionando
- ✅ Analytics configurado
- ✅ Imagens otimizadas

**Parabéns! O site está pronto para receber submissões! 🎉**

---

_Guia criado em: 9 de outubro de 2025_  
_Para dúvidas: Consulte ANALISE_SITE_PROFUNDA.md e CORRECOES_REALIZADAS.md_
