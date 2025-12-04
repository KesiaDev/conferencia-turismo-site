# 🎨 Como Atualizar o Banner Hero do Site

## ❓ Problema: Por que o site não percebe quando substituo o hero.png?

Quando você substitui o arquivo `hero.png` no diretório `apps/web/public/`, o site pode não mostrar a nova imagem imediatamente por causa de **cache agressivo**.

### 🔍 Causa Raiz:

1. **Cache do Nginx**: O servidor estava configurado para cachear imagens por **1 ano** com marcação `immutable`
2. **Cache do Navegador**: Browsers também fazem cache de imagens estáticas
3. **Mesmo nome de arquivo**: Como o nome permanece `hero.png`, o navegador pensa que é o mesmo arquivo

## ✅ Solução Implementada

### 1. Cache Reduzido para hero.png no Nginx

Modificamos o `apps/web/nginx.conf` para ter uma regra especial para o `hero.png`:

```nginx
# Hero banner - cache reduzido para permitir atualizações frequentes
location = /hero.png {
    expires 1h;  # Cache de apenas 1 hora (ao invés de 1 ano)
    add_header Cache-Control "public, must-revalidate";
}
```

Agora o `hero.png` será atualizado automaticamente após **1 hora** no máximo, mesmo sem redeploy.

### 2. Como Funciona Após o Deploy

Quando você:

1. ✅ Substitui o arquivo `hero.png` em `apps/web/public/`
2. ✅ Faz commit e push
3. ✅ O Railway faz o deploy

O site irá:

- 🚀 Servir a nova imagem imediatamente para novos visitantes
- ⏰ Visitantes que já viram o site verão a nova imagem após 1 hora (máximo)

## 📝 Processo Completo para Atualizar o Banner

### Passo 1: Substituir o Arquivo

Substitua o arquivo `apps/web/public/hero.png` pelo novo banner (mantenha o mesmo nome).

### Passo 2: Fazer Deploy

```bash
git add apps/web/public/hero.png
git commit -m "feat: atualiza banner hero do site"
git push origin main
```

O Railway detectará automaticamente e fará o deploy.

### Passo 3: Aguardar (Opcional - para forçar atualização imediata)

Se você quiser que todos os visitantes vejam a nova imagem **imediatamente** (sem esperar 1 hora):

#### Opção A: Limpar Cache do Navegador

- Pressione `Ctrl + Shift + R` (Windows/Linux) ou `Cmd + Shift + R` (Mac)
- Ou abra em modo anônimo/privado

#### Opção B: Adicionar Query String Temporária (para desenvolvimento)

Se você quiser testar localmente ou forçar atualização imediata, pode adicionar um query parameter:

```tsx
// Em apps/web/src/pages/Home.tsx (e outras páginas que usam hero.png)
<OptimizedImage
  src="/hero.png?v=2" // Adicione ?v=2, ?v=3, etc. quando atualizar
  alt="Banner da Conferência"
/>
```

**⚠️ Nota**: Isso não é necessário em produção, pois o cache de 1 hora já resolve o problema.

## 🔄 Onde o hero.png é Usado

O banner hero é usado nas seguintes páginas:

- ✅ `apps/web/src/pages/Home.tsx` - Página inicial
- ✅ `apps/web/src/pages/Call.tsx` - Submissão de trabalhos
- ✅ `apps/web/src/pages/Fees.tsx` - Taxas e inscrições
- ✅ `apps/web/src/pages/Program.tsx` - Programa
- ✅ `apps/web/src/pages/Venue.tsx` - Local do evento
- ✅ `apps/web/src/pages/Keynotes.tsx` - Keynotes
- ✅ `apps/web/src/pages/Contact.tsx` - Contato
- ✅ `apps/web/src/pages/Accessibility.tsx` - Acessibilidade
- ✅ `apps/web/src/pages/Committees.tsx` - Comitês
- ✅ `apps/web/src/pages/ThematicLines.tsx` - Linhas temáticas
- ✅ `apps/web/src/components/Seo.tsx` - Preload para SEO

Todos esses lugares usam `/hero.png`, então quando você atualizar o arquivo, todas as páginas serão atualizadas automaticamente após o deploy.

## 📊 Resumo das Configurações de Cache

| Arquivo        | Cache Atual  | Comportamento                                   |
| -------------- | ------------ | ----------------------------------------------- |
| `hero.png`     | **1 hora**   | ✅ Atualiza rapidamente quando substituído      |
| Outras imagens | 1 ano        | ⚡ Performance otimizada, raramente atualizadas |
| JavaScript/CSS | Hash no nome | ✅ Sempre atualiza quando o código muda         |

## 🚨 Troubleshooting

### A nova imagem ainda não aparece após 1 hora?

1. **Verifique se o deploy foi concluído:**
   - Acesse o Railway Dashboard
   - Verifique se o último deploy está completo

2. **Limpe o cache do navegador:**
   - `Ctrl + Shift + Delete` → Limpar cache de imagens
   - Ou use modo anônimo

3. **Verifique se o arquivo foi commitado:**

   ```bash
   git log --oneline apps/web/public/hero.png
   ```

4. **Force um redeploy:**
   - No Railway Dashboard → Deployments → Redeploy

### Quer atualização instantânea para todos?

Se você precisar que **todos** os visitantes vejam a nova imagem imediatamente (sem esperar 1 hora), pode temporariamente:

1. Reduzir o cache para 0 no nginx:

   ```nginx
   expires -1;  # Sem cache
   ```

2. Ou adicionar um query parameter com timestamp:

   ```tsx
   src={`/hero.png?v=${Date.now()}`}  // Nova URL a cada carregamento
   ```

   **⚠️ Cuidado**: Isso desabilita o cache completamente e pode impactar performance.

## ✨ Conclusão

Com a nova configuração:

- ✅ Novos visitantes veem a nova imagem imediatamente
- ✅ Visitantes recorrentes veem a nova imagem após no máximo 1 hora
- ✅ Não é necessário mudar o código quando atualizar o banner
- ✅ Performance mantida para outras imagens

Basta substituir o arquivo, fazer commit e push! 🚀
