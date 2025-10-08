# 🚀 Como Deployar a API no Railway

## Opção 1: Script Automático (Recomendado)

1. **Abra o PowerShell como Administrador**
2. **Navegue para a pasta da API:**
   ```powershell
   cd C:\Users\User\Desktop\conferencia-site\apps\api
   ```
3. **Execute o script:**
   ```powershell
   .\deploy-railway.ps1
   ```

## Opção 2: Comandos Manuais

1. **Abra o terminal na pasta da API:**

   ```bash
   cd apps/api
   ```

2. **Compile a API:**

   ```bash
   npm run build
   ```

3. **Faça login no Railway:**

   ```bash
   railway login
   ```

   - Isso abrirá o navegador para fazer login

4. **Conecte ao projeto existente:**

   ```bash
   railway link
   ```

   - Escolha o projeto `@conferencia/api`

5. **Faça o deploy:**

   ```bash
   railway up
   ```

6. **Obtenha a URL da API:**
   ```bash
   railway domain
   ```

## ⚠️ IMPORTANTE:

Após o deploy, você receberá uma URL como:
`https://conferenciaapi-production.up.railway.app`

**Você DEVE atualizar o frontend** para usar essa URL!

## 🔧 Atualizar Frontend:

1. **Crie/edite o arquivo** `apps/web/.env`:

   ```
   VITE_API_URL=https://sua-url-da-api.up.railway.app/api
   ```

2. **Redeploy o frontend** no Railway

## 🆘 Se der erro:

1. Verifique se está logado: `railway whoami`
2. Verifique se está no projeto correto: `railway status`
3. Veja os logs: `railway logs`

## ✅ Verificação:

1. Acesse: `https://sua-url-da-api.up.railway.app/health`
2. Deve retornar: `{"status":"ok","timestamp":"..."}`
3. Teste o formulário de submissão no site
