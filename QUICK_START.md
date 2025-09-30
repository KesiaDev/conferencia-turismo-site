# ⚡ Quick Start - 5 minutos

## Linux / macOS

```bash
# 1. Clone o repositório (se ainda não o fez)
# git clone ...

# 2. Execute o script de inicialização
chmod +x scripts/init.sh
./scripts/init.sh

# 3. Inicie o projeto
pnpm dev

# ✅ Pronto! Acesse http://localhost:5173
```

## Windows

```cmd
# 1. Clone o repositório (se ainda não o fez)
# git clone ...

# 2. Execute o script de inicialização
scripts\init.bat

# 3. Inicie o projeto
pnpm dev

# ✅ Pronto! Acesse http://localhost:5173
```

## Manual (sem scripts)

```bash
# 1. Instalar pnpm (se não tiver)
npm install -g pnpm

# 2. Instalar dependências
pnpm install

# 3. Criar arquivos .env

# Backend (apps/api/.env):
echo "PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173" > apps/api/.env

# Frontend (apps/web/.env):
echo "VITE_API_URL=http://localhost:3001/api
VITE_GA_ID=G-XXXXXXXXXX" > apps/web/.env

# 4. Iniciar
pnpm dev
```

## Verificação Rápida

### Backend está funcionando?
Abra http://localhost:3001/health

Esperado:
```json
{"status":"ok","timestamp":"..."}
```

### Frontend está funcionando?
Abra http://localhost:5173

Você deve ver a página inicial da conferência.

### Trocar idioma
Clique em PT/EN/ES no header.

## Próximos Passos

1. **Adicione imagens reais:**
   - `apps/web/public/hero.jpg` (1920x1080)
   - `apps/web/public/speakers/*.png` (320x240)
   - `apps/web/public/logos/*.svg`

2. **Configure Google Analytics:**
   - Obtenha seu ID em https://analytics.google.com
   - Atualize `VITE_GA_ID` em `apps/web/.env`

3. **Personalize conteúdo:**
   - Edite `apps/api/src/db/data.ts` para ajustar dados
   - Modifique traduções em `apps/web/src/locales/`

4. **Deploy:**
   - Consulte [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Configure domínio e SSL

## Comandos Úteis

```bash
pnpm dev           # Desenvolvimento
pnpm build         # Build produção
pnpm lint          # Verificar código
pnpm format        # Formatar código
```

## Problemas?

Consulte:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Guia detalhado
- [README.md](./README.md) - Documentação completa
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Como contribuir

## Ajuda

📧 litfilmtourismconferenceucs@gmail.com

