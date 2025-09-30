# 🌳 Árvore de Arquivos do Projeto

```
conferencia-site/
│
├── 📄 Documentação Principal
│   ├── INDEX.md                    ← 📍 COMECE AQUI - Índice de toda documentação
│   ├── README.md                   ← Documentação técnica completa
│   ├── QUICK_START.md              ← ⚡ Início em 5 minutos
│   ├── SETUP_GUIDE.md              ← Guia passo a passo detalhado
│   ├── DEPLOYMENT.md               ← Guias de deploy (Docker, Vercel, AWS)
│   ├── CONTRIBUTING.md             ← Como contribuir com o projeto
│   ├── PROJECT_SUMMARY.md          ← Resumo de tudo que foi criado
│   └── FILE_TREE.md                ← Este arquivo
│
├── ⚙️ Configuração Root
│   ├── package.json                ← Workspace principal + scripts
│   ├── pnpm-workspace.yaml         ← Definição do monorepo
│   ├── .eslintrc.json              ← Configuração ESLint
│   ├── .prettierrc                 ← Configuração Prettier
│   ├── commitlint.config.js        ← Conventional Commits
│   ├── docker-compose.yml          ← Orquestração Docker
│   ├── .dockerignore               ← Arquivos ignorados no Docker
│   └── .gitignore                  ← Arquivos ignorados no Git
│
├── 🐳 Docker
│   └── docker-compose.yml          ← Backend + Frontend + Nginx
│
├── 🔨 Scripts de Setup
│   ├── scripts/
│   │   ├── init.sh                 ← Setup automático (Linux/macOS)
│   │   └── init.bat                ← Setup automático (Windows)
│
├── 🪝 Git Hooks (.husky/)
│   ├── pre-commit                  ← Lint-staged antes de commit
│   └── commit-msg                  ← Valida mensagem com Commitlint
│
├── 💻 VS Code (.vscode/)
│   ├── settings.json               ← Configurações workspace
│   └── extensions.json             ← Extensões recomendadas
│
├── 🔙 BACKEND (apps/api/)
│   │
│   ├── 📦 Configuração
│   │   ├── package.json            ← Dependências: express, zod, cors, helmet
│   │   ├── tsconfig.json           ← TypeScript ES2022, strict mode
│   │   ├── nodemon.json            ← Hot reload config
│   │   ├── Dockerfile              ← Container Node 20 Alpine
│   │   └── .gitignore
│   │
│   └── 📁 src/
│       │
│       ├── index.ts                ← 🚀 Server Express (entry point)
│       │                              • CORS configurado
│       │                              • Helmet (segurança)
│       │                              • Rate limiting
│       │                              • Error handling
│       │
│       ├── 📂 db/
│       │   └── data.ts             ← 💾 Mock Database
│       │                              • Meta da conferência
│       │                              • 5 Speakers
│       │                              • Programa 3 dias
│       │                              • Taxas (3 categorias)
│       │                              • 3 Notícias
│       │                              • Call for papers
│       │                              • Comitês
│       │                              • Hackathon
│       │
│       ├── 📂 routes/              ← 🛣️ Endpoints REST
│       │   ├── meta.ts             → GET /api/meta
│       │   │                         GET /api/meta/call
│       │   │                         GET /api/meta/committees
│       │   │                         GET /api/meta/hackathon
│       │   │
│       │   ├── speakers.ts         → GET /api/speakers
│       │   │                         GET /api/speakers/:id
│       │   │
│       │   ├── program.ts          → GET /api/program
│       │   │
│       │   ├── fees.ts             → GET /api/fees
│       │   │
│       │   ├── news.ts             → GET /api/news?lang=pt
│       │   │                         GET /api/news/:id
│       │   │
│       │   └── submissions.ts      → POST /api/submissions
│       │                              (com validação Zod)
│       │
│       └── 📂 schemas/             ← ✅ Validação Zod
│           ├── speaker.ts          • Speaker type
│           ├── session.ts          • ProgramDay + SessionSlot
│           ├── fee.ts              • FeeCategory + FeeWindow
│           └── news.ts             • News + Submission
│
└── 🎨 FRONTEND (apps/web/)
    │
    ├── 📦 Configuração
    │   ├── package.json            ← Deps: react, vite, tailwind, i18next
    │   ├── vite.config.ts          ← Vite + React plugin + proxy API
    │   ├── tsconfig.json           ← TypeScript React JSX
    │   ├── tsconfig.node.json      ← Config para Vite
    │   ├── tailwind.config.js      ← Tailwind + plugins
    │   ├── postcss.config.js       ← PostCSS + Autoprefixer
    │   ├── index.html              ← HTML entry point
    │   ├── Dockerfile              ← Multi-stage: build + nginx
    │   ├── nginx.conf              ← Reverse proxy + gzip
    │   └── .gitignore
    │
    ├── 📂 public/                  ← Assets estáticos
    │   ├── logo.svg                ← Logo SVG
    │   ├── robots.txt              ← SEO
    │   ├── sitemap.xml             ← Sitemap completo
    │   ├── .gitkeep
    │   ├── hero.jpg.md             ← Placeholder para hero image
    │   │
    │   ├── 📂 speakers/
    │   │   └── README.md           ← Instruções para fotos (320x240)
    │   │
    │   └── 📂 logos/
    │       └── README.md           ← Instruções para logos parceiros
    │
    └── 📁 src/
        │
        ├── main.tsx                ← ⚡ Entry point React
        ├── App.tsx                 ← 🎯 App principal + Router
        ├── i18n.ts                 ← 🌍 Config i18next
        ├── index.css               ← 🎨 Tailwind + Custom styles
        │
        ├── 📂 api/
        │   └── client.ts           ← 🔌 Axios client + API methods
        │                              • getMeta()
        │                              • getSpeakers()
        │                              • getProgram()
        │                              • submitAbstract()
        │                              • etc.
        │
        ├── 📂 types/
        │   └── index.ts            ← 📝 TypeScript interfaces
        │                              • Speaker, ProgramDay
        │                              • FeeCategory, News
        │                              • Meta, CallInfo
        │                              • etc.
        │
        ├── 📂 components/          ← ⚛️ Componentes Reutilizáveis
        │   ├── Layout.tsx          → Container: Header + Main + Footer
        │   ├── Header.tsx          → Navbar sticky + mobile menu
        │   ├── Footer.tsx          → Footer com links + copyright
        │   ├── Hero.tsx            → Hero section com overlay
        │   ├── Section.tsx         → Container padrão com título
        │   ├── Countdown.tsx       → Contador regressivo tempo real
        │   ├── SpeakerCard.tsx     → Card 320x420 com modal
        │   ├── SpeakerModal.tsx    → Modal full-screen palestrante
        │   ├── ProgramTable.tsx    → Tabela com tabs por dia
        │   ├── FeeTable.tsx        → Tabela responsiva de taxas
        │   ├── Accordion.tsx       → Accordion expansível
        │   ├── Alert.tsx           → Alert colorido (4 tipos)
        │   ├── LangSwitcher.tsx    → Switcher PT/EN/ES
        │   └── Seo.tsx             → Meta tags dinâmicas + Schema
        │
        ├── 📂 pages/               ← 📄 Páginas do Site (12 total)
        │   ├── Home.tsx            → / - Hero + Countdown + Info
        │   ├── Keynotes.tsx        → /keynotes - Lista palestrantes
        │   ├── Program.tsx         → /program - Tabela programação
        │   ├── Call.tsx            → /call - Chamada + Form submissão
        │   ├── Fees.tsx            → /fees - Tabela de taxas
        │   ├── Committees.tsx      → /committees - Listas comitês
        │   ├── Hackathon.tsx       → /hackathon - Desafios + critérios
        │   ├── Access.tsx          → /access - Acessibilidade
        │   ├── Venue.tsx           → /venue - Local + mapa
        │   ├── News.tsx            → /news - Lista notícias
        │   ├── NewsDetail.tsx      → /news/:id - Notícia detalhada
        │   └── Contact.tsx         → /contact - Contato + form
        │
        └── 📂 locales/             ← 🌐 Traduções i18n (3 idiomas)
            ├── 📂 pt/
            │   └── common.json     ← Português (completo)
            │
            ├── 📂 en/
            │   └── common.json     ← English (completo)
            │
            └── 📂 es/
                └── common.json     ← Español (completo)
```

## 📊 Estatísticas

### Total de Arquivos: ~95+

#### Backend
- **Rotas:** 6 arquivos
- **Schemas:** 4 arquivos
- **Database:** 1 mock completo
- **Config:** 5 arquivos

#### Frontend
- **Componentes:** 15 arquivos
- **Páginas:** 12 arquivos
- **Traduções:** 3 arquivos (PT/EN/ES)
- **Config:** 10 arquivos

#### Documentação
- **Guides:** 8 arquivos
- **READMEs:** 3 arquivos

#### Infraestrutura
- **Docker:** 3 arquivos
- **Scripts:** 2 arquivos
- **Git/Husky:** 4 arquivos

## 🎯 Arquivos Mais Importantes

### Para Começar
1. **INDEX.md** - Ponto de entrada
2. **QUICK_START.md** - Setup rápido
3. **README.md** - Docs completa

### Para Desenvolver
1. **apps/api/src/index.ts** - Server backend
2. **apps/web/src/App.tsx** - App React
3. **apps/api/src/db/data.ts** - Dados mock

### Para Configurar
1. **apps/api/.env** - Variáveis backend
2. **apps/web/.env** - Variáveis frontend
3. **docker-compose.yml** - Orquestração

### Para Deploy
1. **DEPLOYMENT.md** - Guias completos
2. **apps/api/Dockerfile** - Container backend
3. **apps/web/Dockerfile** - Container frontend

## 🔍 Navegação Rápida

### Quero adicionar...

**Uma nova página:**
→ `apps/web/src/pages/MinhaPage.tsx`
→ Adicione rota em `apps/web/src/App.tsx`

**Um novo endpoint:**
→ `apps/api/src/routes/minha-rota.ts`
→ Importe em `apps/api/src/index.ts`

**Novos dados mock:**
→ `apps/api/src/db/data.ts`

**Tradução:**
→ `apps/web/src/locales/{pt,en,es}/common.json`

**Componente:**
→ `apps/web/src/components/MeuComponente.tsx`

**Estilo global:**
→ `apps/web/src/index.css`

## ✅ Todos os Arquivos Criados

Este projeto contém aproximadamente **95+ arquivos**, incluindo:
- ✅ Configurações de monorepo
- ✅ Backend completo (15+ arquivos)
- ✅ Frontend completo (40+ arquivos)
- ✅ Traduções (3 idiomas)
- ✅ Docker configs
- ✅ Documentação extensa (8 guias)
- ✅ Scripts de setup
- ✅ Git hooks
- ✅ VS Code configs

**Pronto para:** `pnpm install && pnpm dev` 🚀

