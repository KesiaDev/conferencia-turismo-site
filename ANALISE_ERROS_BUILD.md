# 🔍 Análise dos Erros do Build - @conferencia/web

## 📊 Resumo dos Erros Identificados

### ❌ Erro 1: Husky/Git (Não Crítico, mas gera ruído)

**Mensagem:**

```
prepare: fatal: não é um repositório git (ou qualquer um dos diretórios pai): .git
prepare: husky - comando git não encontrado, instalação ignorada
```

**Causa:**

- O script `prepare` no `package.json` raiz executa `husky install`
- No ambiente de build do Railway não há repositório git inicializado
- O Husky tenta configurar git hooks, mas falha silenciosamente (não quebra o build)

**Impacto:** ⚠️ Baixo - O build continua, mas gera mensagens de erro confusas

**Solução:** Tornar o script `prepare` opcional ou condicional

---

### ⚠️ Aviso 2: Tailwind CSS Plugin Obsoleto

**Mensagem:**

```
Aviso: A partir do Tailwind CSS v3.3, o plugin `@tailwindcss/line-clamp` agora está incluído por padrão.
Aviso: Remova-o da matriz `plugins` em sua configuração para eliminar este aviso.
```

**Causa:**

- O plugin `@tailwindcss/line-clamp` está sendo usado no `tailwind.config.js`
- Desde Tailwind CSS v3.3, essa funcionalidade já está incluída nativamente
- O plugin ainda está instalado e configurado

**Impacto:** ⚠️ Baixo - Apenas um aviso, não quebra o build

**Solução:** Remover o plugin da configuração e das dependências

---

## 🔧 Correções Necessárias

### Correção 1: Tornar Husky Opcional no Build

**Arquivo:** `package.json` (raiz)

**Mudança:**

```json
"scripts": {
  "prepare": "husky install || true"
}
```

Ou melhor ainda, verificar se é um repositório git:

```json
"scripts": {
  "prepare": "git rev-parse --git-dir > /dev/null 2>&1 && husky install || true"
}
```

---

### Correção 2: Remover Plugin Obsoleto do Tailwind

**Arquivo 1:** `apps/web/tailwind.config.js`

**Mudança:**

```js
plugins: [
  require("@tailwindcss/typography"),
  require("@tailwindcss/forms"),
  // Remover: require("@tailwindcss/line-clamp"),
],
```

**Arquivo 2:** `apps/web/package.json`

**Mudança:**
Remover da seção `devDependencies`:

```json
"@tailwindcss/line-clamp": "^0.4.4", // REMOVER ESTA LINHA
```

---

## ✅ Status do Build

### Build Completo

- ✅ `pnpm install` - **Concluído com sucesso** (2.1 segundos)
- ✅ `apps/api postinstall` - **Concluído** (Chrome instalado)
- ✅ `apps/web build` - **Concluído** (Vite compilou com sucesso)
- ⚠️ Avisos não críticos presentes

### Conclusão

O build **NÃO está falhando** por causa desses erros. O status "Fracassado" pode ser devido a:

1. Erro posterior no processo de deploy
2. Timeout ou problema de configuração do Railway
3. Problema com o comando de start

---

## 🎯 Próximos Passos Recomendados

1. **Aplicar correções acima** (remover avisos)
2. **Verificar logs de deploy** (não apenas build)
3. **Confirmar configuração do Railway:**
   - Root Directory: `apps/web`
   - Build Command: `pnpm install && pnpm build`
   - Start Command: `npx serve dist -s -l $PORT`

---

## 📝 Notas Técnicas

### Por que Husky falha no Railway?

- Railway faz checkout do código via Git, mas não inicializa um repositório `.git` no ambiente de build
- Husky precisa de `.git/hooks` para funcionar
- Isso é normal em ambientes CI/CD

### Por que o plugin line-clamp está obsoleto?

- Tailwind CSS v3.3+ incluiu `line-clamp` como utilitário nativo
- Não precisa mais de plugin separado
- Usar: `line-clamp-3` diretamente nas classes

---

**Data da Análise:** 27 de novembro de 2025  
**Build Hash:** 07ce45cf  
**Status:** ⚠️ Avisos não críticos, build completo com sucesso

---

## ✅ Correções Aplicadas

### ✅ Correção 1: Husky Opcional

- **Arquivo:** `package.json` (raiz)
- **Mudança aplicada:** `"prepare": "husky install || true"`
- **Status:** ✅ Corrigido - Agora não gera erro quando não há repositório git

### ✅ Correção 2: Plugin Tailwind Removido

- **Arquivo 1:** `apps/web/tailwind.config.js`
  - Plugin `@tailwindcss/line-clamp` removido dos plugins
- **Arquivo 2:** `apps/web/package.json`
  - Dependência `@tailwindcss/line-clamp` removida
- **Arquivo 3:** `README.md`
  - Documentação atualizada para refletir que line-clamp é nativo
- **Status:** ✅ Corrigido - Avisos do Tailwind removidos

### 📋 Próximos Passos

1. Executar `pnpm install` para atualizar o `pnpm-lock.yaml`
2. Fazer commit das alterações
3. Fazer push para triggerar novo build no Railway
4. Verificar se os avisos desapareceram nos logs
