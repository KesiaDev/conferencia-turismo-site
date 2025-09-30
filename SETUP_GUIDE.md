# 🚀 Guia de Configuração Rápida

## Passo a Passo para Executar o Projeto

### 1. Instalar pnpm (se não tiver)

```bash
npm install -g pnpm@latest
```

### 2. Instalar todas as dependências

Na raiz do projeto, execute:

```bash
pnpm install
```

Isso instalará as dependências de todos os pacotes (root, api e web).

### 3. Configurar variáveis de ambiente

#### Backend

Crie o arquivo `apps/api/.env`:

```bash
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

#### Frontend

Crie o arquivo `apps/web/.env`:

```bash
VITE_API_URL=http://localhost:3001/api
VITE_GA_ID=G-XXXXXXXXXX
```

### 4. Inicializar Husky (opcional, para commits)

```bash
pnpm prepare
```

### 5. Executar o projeto em modo desenvolvimento

```bash
pnpm dev
```

Isso iniciará:
- **Backend** em http://localhost:3001
- **Frontend** em http://localhost:5173

### 6. Testar a API

Abra http://localhost:3001/health no navegador. Você deve ver:

```json
{
  "status": "ok",
  "timestamp": "2025-09-30T..."
}
```

### 7. Acessar o site

Abra http://localhost:5173 no navegador.

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
pnpm dev              # Executa backend + frontend
pnpm -r dev           # Executa todos os pacotes (alternativa)
```

### Build
```bash
pnpm build            # Build de todo o monorepo
pnpm -r build         # Build de todos os pacotes
```

### Lint & Format
```bash
pnpm lint             # Verifica problemas de código
pnpm format           # Formata todo o código
```

### Executar somente o backend
```bash
cd apps/api
pnpm dev
```

### Executar somente o frontend
```bash
cd apps/web
pnpm dev
```

## 🐳 Executar com Docker

### Build das imagens
```bash
docker-compose build
```

### Executar containers
```bash
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f
```

### Parar containers
```bash
docker-compose down
```

Site estará disponível em http://localhost

## ❗ Troubleshooting

### Erro: "command not found: pnpm"
Instale o pnpm globalmente: `npm install -g pnpm`

### Erro: "Cannot find module"
Execute `pnpm install` na raiz do projeto

### Porta 3001 ou 5173 já em uso
Altere as portas nos arquivos `.env` ou mate o processo:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

### Erro no build do TypeScript
Verifique se está usando Node 20+: `node -v`

### Hot reload não funciona
Reinicie o servidor de desenvolvimento com `pnpm dev`

## 📦 Estrutura de Pastas Resumida

```
conferencia-site/
├── apps/
│   ├── api/           # Backend Node.js + Express
│   └── web/           # Frontend React + Vite
├── docker-compose.yml
├── package.json       # Root workspace
└── pnpm-workspace.yaml
```

## 🌐 URLs Disponíveis

### Frontend
- Home: http://localhost:5173/
- Palestrantes: http://localhost:5173/keynotes
- Programação: http://localhost:5173/program
- Chamada: http://localhost:5173/call
- Inscrições: http://localhost:5173/fees
- Comitês: http://localhost:5173/committees
- Hackathon: http://localhost:5173/hackathon
- Acessibilidade: http://localhost:5173/access
- Local: http://localhost:5173/venue
- Notícias: http://localhost:5173/news
- Contato: http://localhost:5173/contact

### Backend API
- Health: http://localhost:3001/health
- Meta: http://localhost:3001/api/meta
- Palestrantes: http://localhost:3001/api/speakers
- Programação: http://localhost:3001/api/program
- Taxas: http://localhost:3001/api/fees
- Notícias: http://localhost:3001/api/news

## ✅ Verificação

Execute este checklist:

- [ ] `pnpm -v` retorna versão >= 8
- [ ] `node -v` retorna versão >= 20
- [ ] `pnpm install` completa sem erros
- [ ] Arquivo `apps/api/.env` criado
- [ ] Arquivo `apps/web/.env` criado
- [ ] `pnpm dev` inicia ambos servidores
- [ ] http://localhost:3001/health retorna status "ok"
- [ ] http://localhost:5173 carrega o site
- [ ] Trocar idioma (PT/EN/ES) funciona no header

## 🎉 Pronto!

Seu ambiente está configurado. Comece a desenvolver!

Para mais detalhes, consulte o [README.md](./README.md).

