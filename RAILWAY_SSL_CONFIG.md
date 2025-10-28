# 🔒 Configuração SSL no Railway

## Problema: Certificado SSL inválido

O erro `NET::ERR_CERT_COMMON_NAME_INVALID` indica que o certificado SSL não está configurado corretamente para o domínio.

## ✅ Solução: Configurar Domínio Customizado no Railway

### Passo 1: Verificar Domínio no Railway

1. Acesse o painel do Railway: https://railway.app
2. Selecione seu projeto
3. Vá em **Settings** → **Domains** (ou **Networking** → **Custom Domain**)

### Passo 2: Adicionar Domínio Customizado

1. Clique em **Add Custom Domain**
2. Digite: `www.turismocinematografico.com.br`
3. Railway vai gerar um certificado SSL automaticamente (pode levar alguns minutos)

### Passo 3: Configurar DNS

No seu provedor de DNS (Registro.br, Cloudflare, etc.), adicione:

**Para www.turismocinematografico.com.br:**

- Tipo: `CNAME`
- Nome: `www`
- Valor: `<railway-generated-domain>.up.railway.app`
- TTL: `3600`

**Para turismocinematografico.com.br (sem www):**

- Tipo: `CNAME` ou `A`
- Nome: `@` (ou root)
- Valor: `<railway-generated-domain>.up.railway.app` (CNAME) ou IP do Railway (A)
- TTL: `3600`

### Passo 4: Aguardar Propagação

- Tempo estimado: 5 minutos a 24 horas
- Railway vai emitir automaticamente certificado SSL grátis (Let's Encrypt)
- Aguarde até ver "Active" ao lado do domínio no painel do Railway

### Passo 5: Verificar Certificado

Acesse: https://www.turismocinematografico.com.br

Você deve ver o cadeado verde ✅ sem erros de SSL.

## 🔧 Se o problema persistir:

### Opção 1: Verificar múltiplos domínios

Certifique-se de adicionar AMBOS os domínios no Railway:

- `turismocinematografico.com.br`
- `www.turismocinematografico.com.br`

### Opção 2: Limpar cache do navegador

1. Pressione `Ctrl+Shift+Delete` (Windows) ou `Cmd+Shift+Delete` (Mac)
2. Selecione "Imagens e arquivos em cache"
3. Limpe o cache
4. Tente acessar novamente

### Opção 3: Verificar certificado

Use https://www.ssllabs.com/ssltest/ para verificar o certificado SSL.

### Opção 4: Forçar redeploy

1. No Railway, vá em **Deployments**
2. Clique nos três pontos ao lado do último deploy
3. Selecione **Redeploy**

## 📝 Notas Importantes

- Railway fornece certificados SSL **GRÁTIS** automaticamente via Let's Encrypt
- O certificado é renovado automaticamente
- Não é necessário configurar SSL manualmente
- O nginx.conf foi configurado para trabalhar com Railway edge SSL

## 🆘 Suporte

Se o problema continuar após seguir estes passos, verifique:

- Os registros DNS estão apontando corretamente?
- O domínio está ativo no painel do Railway?
- Há algum erro nos logs do Railway?
