# 🔧 Solução para o Erro "Not found" no Site

## 🚨 **Problema Identificado**

O site `turismocinematografico.com.br` está exibindo o erro `{"error":"Not found"}` porque:

### **Causa Raiz:**

1. **Ordem incorreta das rotas no Express**: O servidor estava tentando servir arquivos estáticos antes de processar completamente as rotas da API, ou o fallback estava capturando requisições antes da hora.

2. **Path do frontend incorreto**: O código estava usando `path.resolve(process.cwd(), "..", "web", "dist")` que funciona localmente, mas pode falhar no Railway dependendo de onde o servidor é iniciado.

3. **Falta de verificação de existência do arquivo**: O código não verificava se o `index.html` realmente existia no path especificado antes de tentar servir.

## ✅ **Correções Aplicadas**

### **1. Reordenação das Rotas (apps/api/src/index.ts)**

**ANTES:**

```typescript
// Serve static files from frontend
app.use(express.static(frontendPath));

// Health check
app.get("/health", (req, res) => { ... });

// API Routes
app.use("/api/meta", metaRouter);
// ...

// Fallback
app.get("*", (req, res) => { ... });
```

**DEPOIS (Ordem Correta):**

```typescript
// 1. Health check PRIMEIRO (sempre disponível)
app.get("/health", (req, res) => { ... });
app.get("/test", (req, res) => { ... });

// 2. API Routes ANTES de static files
app.use("/api/meta", metaRouter);
app.use("/api/speakers", speakersRouter);
// ... todas as rotas da API

// 3. Static files DEPOIS das rotas da API
app.use(express.static(frontendPath));

// 4. SPA fallback POR ÚLTIMO
app.get("*", (req, res) => { ... });
```

### **2. Path Dinâmico e Robusto**

**ANTES:**

```typescript
const frontendPath = path.join(process.cwd(), "..", "web", "dist");
```

**DEPOIS:**

```typescript
// Try multiple possible paths for frontend location
const possiblePaths = [
  path.resolve(process.cwd(), "..", "web", "dist"), // Development & Railway monorepo
  path.resolve(process.cwd(), "dist"), // If frontend is built inside API folder
  path.resolve(process.cwd(), "../../web/dist"), // Alternative structure
];

let frontendPath = possiblePaths[0];

// Find the correct path
for (const testPath of possiblePaths) {
  const indexPath = path.join(testPath, "index.html");
  if (fs.existsSync(indexPath)) {
    frontendPath = testPath;
    console.log("✅ Found frontend at:", frontendPath);
    break;
  }
}
```

### **3. Melhor Tratamento de Erros no Fallback**

**ANTES:**

```typescript
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }
  const indexPath = path.join(process.cwd(), "..", "web", "dist", "index.html");
  res.sendFile(indexPath);
});
```

**DEPOIS:**

```typescript
app.get("*", (req, res) => {
  const indexPath = path.join(frontendPath, "index.html");
  console.log("🔍 Serving index.html from:", indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("❌ Error serving index.html:", err);
      res.status(404).json({ error: "Frontend not found" });
    }
  });
});
```

### **4. Logs Detalhados para Debug**

Adicionados logs para facilitar o diagnóstico:

```typescript
console.log("🔍 Frontend path:", frontendPath);
console.log("🔍 Current working directory:", process.cwd());
console.log("🔍 __dirname:", __dirname);
console.log("✅ Found frontend at:", frontendPath);
console.log("🔍 Serving index.html from:", indexPath);
```

## 🚀 **Como Aplicar a Solução**

### **Opção 1: Deploy Automático (Recomendado)**

1. Faça commit das mudanças:

```bash
git add apps/api/src/index.ts
git commit -m "fix: corrigir ordem de rotas e path do frontend"
git push origin main
```

2. O Railway detectará automaticamente e fará o deploy (2-3 minutos)

### **Opção 2: Redeploy Manual no Railway**

1. Acesse: https://railway.app/dashboard
2. Selecione o projeto `@conferencia/api`
3. Vá para aba "Deployments"
4. Clique nos "..." do último deploy
5. Selecione "Redeploy"

## 🧪 **Como Testar Após Deploy**

### **1. Verificar API:**

```bash
curl https://conferenciaapi-production.up.railway.app/health
# Deve retornar: {"status":"ok","timestamp":"..."}
```

### **2. Verificar Site:**

```bash
curl https://turismocinematografico.com.br
# Deve retornar HTML do frontend (não JSON de erro)
```

### **3. Verificar no Navegador:**

- Acesse: https://turismocinematografico.com.br
- Deve carregar o site normalmente (não mais erro "Not found")

### **4. Verificar Logs no Railway:**

- Aba "Logs" no projeto `@conferencia/api`
- Procurar por:
  - `✅ Found frontend at: /caminho/para/frontend`
  - `🚀 Server running on port 3001`
  - Não deve haver erros de "ENOENT" (arquivo não encontrado)

## 📊 **Checklist de Verificação**

- [ ] Build da API completo sem erros
- [ ] Build do frontend completo sem erros
- [ ] Ordem das rotas correta (API → static → fallback)
- [ ] Path do frontend detectado corretamente
- [ ] `/health` retorna JSON
- [ ] `/api/*` rotas retornam JSON
- [ ] `/` (raiz) retorna HTML do frontend
- [ ] Rotas do React Router funcionam (ex: `/fees`, `/contact`)
- [ ] Sem erros no console do navegador
- [ ] Logs do Railway mostram inicialização correta

## 🎯 **Resultado Esperado**

Após aplicar estas correções:

1. ✅ API funcionando: `https://conferenciaapi-production.up.railway.app/health`
2. ✅ Frontend funcionando: `https://turismocinematografico.com.br`
3. ✅ Rotas da API respondendo JSON
4. ✅ Páginas do site carregando corretamente
5. ✅ Sem erro "Not found"

## 🆘 **Se Ainda Houver Problemas**

### **Verificar no Railway:**

1. **Settings → Root Directory**: Deve estar vazio ou apontando para `/`
2. **Settings → Build Command**: `pnpm install && pnpm --filter @conferencia/api build`
3. **Settings → Start Command**: `cd apps/api && npm start`
4. **Variables**: Verificar se `PORT` está configurado

### **Logs a procurar:**

- ❌ Erro: `ENOENT: no such file or directory` → Path do frontend errado
- ❌ Erro: `Cannot GET /` → Rotas não configuradas corretamente
- ✅ Sucesso: `✅ Found frontend at:` → Frontend detectado
- ✅ Sucesso: `🚀 Server running on port` → Servidor iniciado

## 📝 **Arquivos Modificados**

- `apps/api/src/index.ts` - Correção da ordem de rotas e path do frontend

## 🔗 **Links Úteis**

- Site: https://turismocinematografico.com.br
- API: https://conferenciaapi-production.up.railway.app
- Railway Dashboard: https://railway.app/dashboard
- Repositório: https://github.com/seu-usuario/conferencia-site

---

**Data da Correção**: 09/10/2025
**Status**: ✅ Corrigido e pronto para deploy
