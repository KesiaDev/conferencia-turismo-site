# 📖 Índice de Documentação

Bem-vindo ao projeto da **III Conferência Internacional de Turismo Literário e Cinematográfico**!

## 🚀 Começando

### Para iniciantes
1. **[QUICK_START.md](./QUICK_START.md)** ⚡ - Comece em 5 minutos
2. **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** 📚 - Guia detalhado passo a passo

### Para desenvolvedores
1. **[README.md](./README.md)** 📘 - Documentação técnica completa
2. **[CONTRIBUTING.md](./CONTRIBUTING.md)** 🤝 - Como contribuir
3. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** 📊 - Visão geral do que foi criado

### Para deploy
1. **[DEPLOYMENT.md](./DEPLOYMENT.md)** 🚢 - Guias de deploy (Docker, Vercel, AWS, etc.)

## 📂 Estrutura do Projeto

```
conferencia-site/
│
├── 📄 Documentação
│   ├── INDEX.md              ← Você está aqui
│   ├── README.md             ← Docs principal
│   ├── QUICK_START.md        ← Início rápido
│   ├── SETUP_GUIDE.md        ← Guia detalhado
│   ├── DEPLOYMENT.md         ← Como fazer deploy
│   ├── CONTRIBUTING.md       ← Guia de contribuição
│   └── PROJECT_SUMMARY.md    ← Resumo completo
│
├── 🔧 Configuração Root
│   ├── package.json          ← Workspace root
│   ├── pnpm-workspace.yaml   ← Monorepo config
│   ├── .eslintrc.json        ← Linting
│   ├── .prettierrc           ← Formatação
│   ├── commitlint.config.js  ← Commits convencionais
│   ├── docker-compose.yml    ← Orquestração Docker
│   └── .gitignore
│
├── 🔙 Backend (apps/api)
│   ├── src/
│   │   ├── db/data.ts        ← Mock database
│   │   ├── routes/           ← Endpoints REST
│   │   │   ├── meta.ts
│   │   │   ├── speakers.ts
│   │   │   ├── program.ts
│   │   │   ├── fees.ts
│   │   │   ├── news.ts
│   │   │   └── submissions.ts
│   │   ├── schemas/          ← Validação Zod
│   │   │   ├── speaker.ts
│   │   │   ├── session.ts
│   │   │   ├── fee.ts
│   │   │   └── news.ts
│   │   └── index.ts          ← Server Express
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── 🎨 Frontend (apps/web)
│   ├── public/               ← Assets estáticos
│   │   ├── logo.svg
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   ├── speakers/         ← Fotos palestrantes
│   │   └── logos/            ← Logos parceiros
│   │
│   ├── src/
│   │   ├── api/              ← Cliente HTTP
│   │   │   └── client.ts
│   │   │
│   │   ├── components/       ← Componentes React
│   │   │   ├── Layout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Countdown.tsx
│   │   │   ├── SpeakerCard.tsx
│   │   │   ├── SpeakerModal.tsx
│   │   │   ├── ProgramTable.tsx
│   │   │   ├── FeeTable.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── LangSwitcher.tsx
│   │   │   └── Seo.tsx
│   │   │
│   │   ├── pages/            ← Páginas/Rotas
│   │   │   ├── Home.tsx
│   │   │   ├── Keynotes.tsx
│   │   │   ├── Program.tsx
│   │   │   ├── Call.tsx
│   │   │   ├── Fees.tsx
│   │   │   ├── Committees.tsx
│   │   │   ├── Hackathon.tsx
│   │   │   ├── Access.tsx
│   │   │   ├── Venue.tsx
│   │   │   ├── News.tsx
│   │   │   ├── NewsDetail.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   ├── locales/          ← Traduções i18n
│   │   │   ├── pt/common.json
│   │   │   ├── en/common.json
│   │   │   └── es/common.json
│   │   │
│   │   ├── types/            ← TypeScript types
│   │   │   └── index.ts
│   │   │
│   │   ├── App.tsx           ← App principal
│   │   ├── main.tsx          ← Entry point
│   │   ├── i18n.ts           ← Config i18next
│   │   └── index.css         ← Tailwind CSS
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── 🔨 Scripts
│   ├── init.sh               ← Setup Linux/macOS
│   └── init.bat              ← Setup Windows
│
├── 🪝 Git Hooks (.husky)
│   ├── pre-commit            ← Lint antes de commit
│   └── commit-msg            ← Valida mensagem
│
└── ⚙️ VS Code (.vscode)
    ├── settings.json         ← Config workspace
    └── extensions.json       ← Extensões recomendadas
```

## 🎯 Fluxos de Trabalho

### 1️⃣ Primeiro Acesso
```
1. Clone o repositório
2. Leia QUICK_START.md
3. Execute script de setup
4. Rode `pnpm dev`
```

### 2️⃣ Desenvolvimento Diário
```
1. `git pull` para atualizar
2. `pnpm dev` para iniciar
3. Desenvolva com hot reload
4. Commit com Conventional Commits
5. `git push`
```

### 3️⃣ Adicionando Features
```
1. Leia CONTRIBUTING.md
2. Crie branch: `feature/nome`
3. Desenvolva e teste
4. Faça PR com descrição
```

### 4️⃣ Deploy
```
1. Leia DEPLOYMENT.md
2. Configure variáveis de ambiente
3. Escolha plataforma (Docker/Vercel/AWS)
4. Execute deploy
5. Configure domínio e SSL
```

## 📚 Guias por Tópico

### Stack Técnico
- **Backend:** Node.js 20, Express, TypeScript, Zod
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS
- **I18n:** i18next (PT/EN/ES)
- **DevOps:** Docker, pnpm workspaces

### Rotas da API
Todas documentadas em [README.md](./README.md#-api-endpoints)

### Páginas do Site
12 páginas completas listadas em [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md#-frontend-appsweb)

### Componentes
15 componentes reutilizáveis em [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md#componentes-criados)

## 🔗 Links Rápidos

### URLs de Desenvolvimento
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3001
- **API Health:** http://localhost:3001/health

### Comandos Principais
```bash
pnpm install      # Instalar dependências
pnpm dev          # Desenvolvimento
pnpm build        # Build produção
pnpm lint         # Verificar código
pnpm format       # Formatar código
```

### Arquivos de Configuração Importantes
- **Backend ENV:** `apps/api/.env`
- **Frontend ENV:** `apps/web/.env`
- **Docker:** `docker-compose.yml`
- **Workspaces:** `pnpm-workspace.yaml`

## 🆘 Precisa de Ajuda?

### Problemas Comuns
Veja **Troubleshooting** em [SETUP_GUIDE.md](./SETUP_GUIDE.md#-troubleshooting)

### Erros de Build
Veja **Troubleshooting** em [DEPLOYMENT.md](./DEPLOYMENT.md#troubleshooting)

### Dúvidas sobre Código
Leia [CONTRIBUTING.md](./CONTRIBUTING.md)

### Contato
📧 litfilmtourismconferenceucs@gmail.com

## ✅ Checklist de Configuração

Antes de começar a desenvolver:

- [ ] Node.js 20+ instalado (`node -v`)
- [ ] pnpm instalado (`pnpm -v`)
- [ ] Dependências instaladas (`pnpm install`)
- [ ] Arquivo `apps/api/.env` criado
- [ ] Arquivo `apps/web/.env` criado
- [ ] `pnpm dev` funciona sem erros
- [ ] Frontend abre em http://localhost:5173
- [ ] Backend responde em http://localhost:3001/health
- [ ] Documentação lida

## 🎓 Para Aprender Mais

### Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/)
- [Zod](https://zod.dev/)
- [pnpm](https://pnpm.io/)

### Padrões e Convenções
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Monorepo Guide](https://monorepo.tools/)

## 📊 Status do Projeto

**Versão:** 1.0.0  
**Status:** ✅ Completo e funcional  
**Última atualização:** Setembro 2025

### O que está pronto
- ✅ Backend completo com 11 endpoints
- ✅ Frontend com 12 páginas
- ✅ Internacionalização (PT/EN/ES)
- ✅ Docker configurado
- ✅ Documentação completa
- ✅ SEO otimizado
- ✅ Acessibilidade implementada

### O que precisa ser feito
- 🔲 Adicionar imagens reais
- 🔲 Configurar Google Analytics
- 🔲 Deploy em produção
- 🔲 Testes automatizados

## 🎉 Comece Agora!

A melhor forma de começar é:

1. Abra [QUICK_START.md](./QUICK_START.md)
2. Siga os 3 passos
3. Em 5 minutos você estará desenvolvendo!

---

**Desenvolvido para a III Conferência Internacional de Turismo Literário e Cinematográfico**  
Universidade de Caxias do Sul | 26-28 Março 2026

