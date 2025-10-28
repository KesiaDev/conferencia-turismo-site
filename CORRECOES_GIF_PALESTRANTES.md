# Correções para Fotos GIF dos Palestrantes

## Problema

As fotos dos palestrantes em formato GIF não estavam aparecendo na página.

## Causa

1. **Espaços nos nomes dos arquivos**: Arquivos como "Deborah Castro.gif" e "Andre Peritonotto.gif" têm espaços que não estavam sendo codificados corretamente nas URLs
2. **Configuração do nginx**: Faltava configuração específica para servir arquivos de imagem

## Correções Implementadas

### 1. Componente OptimizedImage (`apps/web/src/components/OptimizedImage.tsx`)

- Adicionada codificação automática de URLs para espaços em nomes de arquivos
- Converte "Deborah Castro.gif" → "Deborah%20Castro.gif"

### 2. Configuração Nginx (`apps/web/nginx.conf`)

- Adicionada location específica para arquivos de imagem (GIF, PNG, JPG, etc.)
- Configurado `try_files` para garantir que os arquivos sejam servidos corretamente
- Headers de cache otimizados para imagens

### 3. Content Security Policy (CSP)

- Atualizado para permitir carregamento de imagens (`img-src 'self' data: https: blob:`)

## Arquivos Modificados

- ✅ `apps/web/src/components/OptimizedImage.tsx`
- ✅ `apps/web/nginx.conf`

## Quando o Railway voltar

Fazer commit e push das mudanças:

```bash
git add apps/web/src/components/OptimizedImage.tsx apps/web/nginx.conf
git commit -m "fix: corrige exibição de fotos GIF dos palestrantes com espaços nos nomes"
git push origin main
```

O Railway fará o deploy automaticamente quando detectar o push.

## Testar Localmente

```bash
cd apps/web
npm run dev
```

Acesse http://localhost:5173 e verifique se os GIFs aparecem na página de palestrantes.

## Palavrantes Afetados

- ✅ Deborah Castro
- ✅ diomira
- ✅ Lissandro
- ✅ RitaBaleiro
- ✅ Jordi
- ✅ Andre Peritonotto
- ✅ Ronaldo
- ✅ DudaRocha
