# Guia de Contribuição

Obrigado por considerar contribuir com o projeto da III Conferência Internacional!

## 🔄 Processo de Contribuição

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. Crie uma **branch** para sua feature/fix: `git checkout -b feature/minha-feature`
4. Faça suas alterações seguindo as diretrizes abaixo
5. **Commit** usando Conventional Commits
6. **Push** para sua branch: `git push origin feature/minha-feature`
7. Abra um **Pull Request**

## 📝 Conventional Commits

Use o formato:

```
<tipo>(<escopo>): <descrição curta>

<descrição longa (opcional)>

<footer (opcional)>
```

### Tipos
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Apenas documentação
- `style`: Formatação (não altera código)
- `refactor`: Refatoração (não adiciona feature nem corrige bug)
- `perf`: Melhoria de performance
- `test`: Adiciona ou corrige testes
- `chore`: Tarefas de build, configs, etc.

### Exemplos
```bash
feat(web): adiciona página de hackathon
fix(api): corrige validação de email em submissions
docs: atualiza README com instruções Docker
style(web): formata código com prettier
refactor(api): reorganiza estrutura de rotas
```

## 🎨 Padrões de Código

### TypeScript
- Use `interface` para tipos de objetos públicos
- Use `type` para unions, intersections, etc.
- Evite `any` - use `unknown` se necessário
- Documente funções complexas com JSDoc

### React
- Componentes funcionais com hooks
- Props tipadas com TypeScript
- Use `React.FC` ou tipos explícitos
- Extraia lógica complexa para custom hooks

### CSS/Tailwind
- Use classes do Tailwind sempre que possível
- Agrupe classes relacionadas
- Use responsive modifiers (`md:`, `lg:`)
- Mantenha consistência com o design system

## 🧪 Testes

Antes de submeter PR:

```bash
# Lint
pnpm lint

# Format
pnpm format

# Build (verificar se compila)
pnpm build
```

## 📁 Estrutura de Arquivos

### Backend (`apps/api`)
```
src/
├── routes/        # Rotas Express
├── schemas/       # Schemas Zod
├── db/           # Mock data
└── index.ts      # Entry point
```

### Frontend (`apps/web`)
```
src/
├── api/          # API client
├── components/   # Componentes reutilizáveis
├── pages/        # Páginas (rotas)
├── locales/      # Traduções i18n
├── types/        # TypeScript types
└── App.tsx       # App principal
```

## 🌍 Internacionalização

Ao adicionar novos textos:

1. Adicione a chave em `apps/web/src/locales/pt/common.json`
2. Traduza para EN em `apps/web/src/locales/en/common.json`
3. Traduza para ES em `apps/web/src/locales/es/common.json`
4. Use no componente: `const { t } = useTranslation(); t('chave.subchave')`

## ♿ Acessibilidade

- Sempre use elementos semânticos (`<button>`, `<nav>`, etc.)
- Adicione `aria-label` em ícones e botões sem texto
- Garanta contraste adequado (mínimo 4.5:1)
- Teste navegação por teclado
- Use `focus-visible` para indicadores de foco

## 🐛 Reportando Bugs

Inclua na issue:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (OS, browser, Node version)

## 💡 Sugerindo Features

Descreva:
- Problema que resolve
- Solução proposta
- Alternativas consideradas
- Impacto nos usuários

## ⚠️ Antes do PR

Checklist:
- [ ] Código segue os padrões do projeto
- [ ] Sem erros de lint (`pnpm lint`)
- [ ] Código formatado (`pnpm format`)
- [ ] Build passa (`pnpm build`)
- [ ] Commits seguem Conventional Commits
- [ ] Documentação atualizada (se necessário)
- [ ] Traduções adicionadas (PT/EN/ES)
- [ ] Testado localmente

## 📞 Dúvidas?

Entre em contato: litfilmtourismconferenceucs@gmail.com

Obrigado pela contribuição! 🎉

