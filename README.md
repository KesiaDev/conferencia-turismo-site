# III Conferência Internacional de Turismo Literário e Cinematográfico

Economia Criativa, Inovação e Desenvolvimento Territorial | 26-28 Mar 2026 | Caxias do Sul/RS

## 🚀 Stack Tecnológico

### Backend
- **Node.js 20** + **Express** + **TypeScript**
- **Zod** para validação de dados
- **CORS** e **Helmet** para segurança
- **Rate Limiting** para proteção de API
- **Nodemon** para desenvolvimento

### Frontend
- **React 18** + **Vite** + **TypeScript**
- **React Router** para navegação
- **i18next** para internacionalização (PT/EN/ES)
- **Tailwind CSS** + plugins (typography, forms, line-clamp)
- **Axios** para requisições HTTP
- **Day.js** para manipulação de datas
- **React Helmet Async** para SEO

### Infraestrutura
- **pnpm workspaces** para monorepo
- **Docker** + **Docker Compose**
- **Nginx** como reverse proxy
- **ESLint** + **Prettier** para qualidade de código
- **Husky** + **Commitlint** para commits convencionais

## 📦 Estrutura do Projeto

```
conferencia-site/
├── apps/
│   ├── api/                    # Backend Express
│   │   ├── src/
│   │   │   ├── db/            # Mock data
│   │   │   ├── routes/        # Rotas da API
│   │   │   ├── schemas/       # Schemas Zod
│   │   │   └── index.ts       # Entry point
│   │   ├── Dockerfile
│   │   └── package.json
│   └── web/                    # Frontend React
│       ├── public/            # Assets estáticos
│       ├── src/
│       │   ├── api/           # Cliente HTTP
│       │   ├── components/    # Componentes React
│       │   ├── locales/       # Traduções i18n
│       │   ├── pages/         # Páginas
│       │   ├── types/         # TypeScript types
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── Dockerfile
│       ├── nginx.conf
│       └── package.json
├── docker-compose.yml
├── pnpm-workspace.yaml
└── package.json
```

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
- Node.js >= 20
- pnpm >= 8

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

**Backend** (`apps/api/.env`):
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Frontend** (`apps/web/.env`):
```env
VITE_API_URL=http://localhost:3001/api
VITE_GA_ID=G-XXXXXXXXXX
```

### 3. Executar em modo de desenvolvimento

```bash
# Executar backend e frontend simultaneamente
pnpm dev

# Ou executar separadamente
pnpm --filter @conferencia/api dev
pnpm --filter @conferencia/web dev
```

- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:5173

## 🏗️ Build e Produção

### Build local

```bash
pnpm build
```

### Executar build localmente

```bash
pnpm start
```

### Docker (recomendado para produção)

```bash
# Build das imagens
docker-compose build

# Executar containers
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down
```

Acesse: http://localhost

## 📡 API Endpoints

### Meta
- `GET /api/meta` - Informações gerais da conferência
- `GET /api/meta/call` - Informações da chamada de trabalhos
- `GET /api/meta/committees` - Membros dos comitês
- `GET /api/meta/hackathon` - Informações do hackathon

### Speakers
- `GET /api/speakers` - Lista de palestrantes
- `GET /api/speakers/:id` - Detalhes de um palestrante

### Programa
- `GET /api/program` - Programação completa do evento

### Taxas
- `GET /api/fees` - Tabela de valores de inscrição

### Notícias
- `GET /api/news?lang=pt` - Lista de notícias (filtro opcional por idioma)
- `GET /api/news/:id` - Detalhes de uma notícia

### Submissões
- `POST /api/submissions` - Enviar proposta de trabalho

**Exemplo de payload**:
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "title": "Título do trabalho",
  "track": "Economia criativa",
  "abstract": "Resumo com no mínimo 100 caracteres..."
}
```

## 🌍 Internacionalização

O site suporta 3 idiomas:
- **Português (PT)** - padrão
- **Inglês (EN)**
- **Espanhol (ES)**

Os arquivos de tradução estão em `apps/web/src/locales/{pt,en,es}/common.json`.

## 🎨 Design System

### Breakpoints
- **Mobile**: 360-767px (container 328px)
- **Tablet**: 768-1023px (container 672px)
- **Desktop**: 1024-1279px (container 1200px)
- **XL**: 1280px+ (container 1200px)

### Cores
- **Primary**: `#1e40af` (azul)
- **Secondary**: `#7c3aed` (roxo)

### Componentes
- Hero
- Section
- Countdown
- SpeakerCard + SpeakerModal
- ProgramTable
- FeeTable
- Accordion
- Alert
- LangSwitcher

## ♿ Acessibilidade

- Focus visible em todos os elementos interativos
- ARIA labels e roles apropriados
- Skip link para conteúdo principal
- Suporte a `prefers-reduced-motion`
- Navegação por teclado
- Contraste adequado (WCAG AA)

## 🧪 Qualidade de Código

### Lint

```bash
pnpm lint
```

### Format

```bash
pnpm format
```

### Commits

Este projeto utiliza [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: adiciona nova página de hackathon"
git commit -m "fix: corrige erro no formulário de submissão"
git commit -m "docs: atualiza README"
```

## 📊 SEO

- Meta tags (title, description)
- Open Graph (Facebook/LinkedIn)
- Twitter Cards
- JSON-LD Schema (Event)
- Sitemap.xml
- Robots.txt
- Google Analytics (configurável via env)

## 🚢 Deploy

### Variáveis de ambiente obrigatórias

**Produção**:
```env
# Backend
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://seu-dominio.com

# Frontend
VITE_API_URL=https://seu-dominio.com/api
VITE_GA_ID=G-XXXXXXXXXX
```

### Nginx + Let's Encrypt (HTTPS)

1. Configure o domínio no DNS
2. Instale certbot: `sudo apt install certbot python3-certbot-nginx`
3. Obtenha certificado: `sudo certbot --nginx -d seu-dominio.com`
4. Certbot renovará automaticamente

## 📝 Scripts Disponíveis

### Root
- `pnpm dev` - Executa backend e frontend em modo dev
- `pnpm build` - Build de todos os pacotes
- `pnpm start` - Executa versão de produção
- `pnpm lint` - Lint em todo o monorepo
- `pnpm format` - Formata código com Prettier

### Backend (`apps/api`)
- `pnpm dev` - Nodemon com hot reload
- `pnpm build` - Compila TypeScript
- `pnpm start` - Executa versão compilada

### Frontend (`apps/web`)
- `pnpm dev` - Vite dev server
- `pnpm build` - Build para produção
- `pnpm preview` - Preview da build

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças usando Conventional Commits
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

© 2025 Universidade de Caxias do Sul. Todos os direitos reservados.

## 📧 Contato

**E-mail**: litfilmtourismconferenceucs@gmail.com

**Organização**: Universidade de Caxias do Sul - UCS

---

Desenvolvido para a III Conferência Internacional de Turismo Literário e Cinematográfico 🎬📚

