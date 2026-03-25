# Deploy — Autorizações de publicação (Anais)

Este repositório usa **Vite + React Router** no frontend e **Express** na API (não Next.js). O equivalente ao pedido `app/api/authorization/route.ts` do Next é:

- `POST /api/authorization` — envio público
- `GET /api/authorization/admin` — listagem administrativa (header `X-Admin-Password`)

## Variáveis de ambiente (API)

| Variável         | Obrigatório | Descrição                                                                                               |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`   | Sim         | URL PostgreSQL (ex.: plugin Postgres no Railway)                                                        |
| `ADMIN_PASSWORD` | Sim         | Senha da área `/anais/admin/autorizacoes`                                                               |
| `CORS_ORIGIN`    | Recomendado | Origens do site, ex.: `https://turismocinematografico.com.br,https://www.turismocinematografico.com.br` |

Exemplo local (`.env` na pasta `apps/api`, não commitar):

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
ADMIN_PASSWORD="defina_uma_senha_forte"
```

## Migrações Prisma

Na **primeira implantação** ou após puxar este código, aplique o schema no banco:

```bash
cd apps/api
pnpm exec prisma migrate deploy
```

O build da API já executa `prisma generate` (`pnpm run build`). Em produção, o `migrate deploy` deve rodar **antes** de subir o processo Node (release command no Railway, ou etapa de CI).

## Railway (resumo)

1. Adicione o serviço **PostgreSQL** (ou use um `DATABASE_URL` externo).
2. No serviço da API, defina `DATABASE_URL`, `ADMIN_PASSWORD` e `CORS_ORIGIN`.
3. Release / start: `pnpm exec prisma migrate deploy && node dist/index.js` (ajuste conforme o diretório de build do seu deploy).

## URLs públicas

- Formulário: `https://turismocinematografico.com.br/anais/autorizacao`
- Admin (oculto no menu): `https://turismocinematografico.com.br/anais/admin/autorizacoes`

O frontend usa `VITE_API_URL` apontando para a base da API em produção (já configurado no projeto como padrão Railway, se aplicável).

## Exportação CSV

O botão **Exportar CSV** gera `autorizacoes.csv` no navegador com: `name`, `document`, `email`, `summary`, `createdAt`.
