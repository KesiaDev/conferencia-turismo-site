# 🚢 Guia de Deploy

Este documento detalha as opções de deploy para produção.

## Opções de Deploy

### 1. Docker + VPS (Recomendado)

#### Pré-requisitos
- VPS com Ubuntu 20.04+ ou similar
- Docker e Docker Compose instalados
- Domínio configurado

#### Passos

**1. Conectar ao servidor**
```bash
ssh user@seu-servidor.com
```

**2. Instalar Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER
```

**3. Instalar Docker Compose**
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**4. Clonar repositório**
```bash
git clone https://github.com/seu-usuario/conferencia-site.git
cd conferencia-site
```

**5. Configurar variáveis de ambiente**

`apps/api/.env`:
```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://seu-dominio.com
```

`apps/web/.env`:
```env
VITE_API_URL=https://seu-dominio.com/api
VITE_GA_ID=G-XXXXXXXXXX
```

**6. Build e executar**
```bash
docker-compose up -d --build
```

**7. Configurar Nginx como proxy reverso**

Instale Nginx:
```bash
sudo apt install nginx
```

Crie `/etc/nginx/sites-available/conferencia`:
```nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ative o site:
```bash
sudo ln -s /etc/nginx/sites-available/conferencia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**8. Configurar SSL com Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

### 2. Vercel (Frontend) + Railway (Backend)

#### Frontend no Vercel

**1. Instalar Vercel CLI**
```bash
npm i -g vercel
```

**2. Deploy**
```bash
cd apps/web
vercel
```

**3. Configurar variáveis de ambiente no dashboard**
- `VITE_API_URL`: URL do backend no Railway
- `VITE_GA_ID`: Seu ID do Google Analytics

#### Backend no Railway

**1. Criar conta em railway.app**

**2. New Project → Deploy from GitHub**

**3. Configurar variáveis de ambiente:**
- `PORT`: 3001
- `NODE_ENV`: production
- `CORS_ORIGIN`: URL do Vercel

**4. Railway gerará uma URL pública**

### 3. AWS (EC2 + S3)

#### Frontend no S3 + CloudFront

**1. Build do frontend**
```bash
cd apps/web
pnpm build
```

**2. Criar bucket S3**
```bash
aws s3 mb s3://conferencia-frontend
aws s3 sync dist/ s3://conferencia-frontend
```

**3. Configurar CloudFront** para servir o bucket

#### Backend no EC2

**1. Criar instância EC2**
- Ubuntu Server 20.04
- t2.micro (free tier)

**2. Conectar e configurar**
```bash
ssh -i sua-chave.pem ubuntu@ec2-xx-xx-xx-xx.compute.amazonaws.com
```

**3. Instalar Node.js e pnpm**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g pnpm
```

**4. Clonar e executar**
```bash
git clone ...
cd conferencia-site/apps/api
pnpm install
pnpm build
pnpm start
```

**5. Configurar PM2 para manter rodando**
```bash
npm install -g pm2
pm2 start dist/index.js --name api
pm2 startup
pm2 save
```

### 4. Netlify (Frontend) + Heroku (Backend)

#### Frontend no Netlify

**1. Conectar repositório no dashboard do Netlify**

**2. Configurar build:**
- Build command: `cd apps/web && pnpm build`
- Publish directory: `apps/web/dist`

**3. Variáveis de ambiente:**
- `VITE_API_URL`
- `VITE_GA_ID`

#### Backend no Heroku

**1. Instalar Heroku CLI**
```bash
npm install -g heroku
```

**2. Login e criar app**
```bash
heroku login
heroku create conferencia-api
```

**3. Configurar variáveis**
```bash
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://seu-site.netlify.app
```

**4. Deploy**
```bash
cd apps/api
git subtree push --prefix apps/api heroku main
```

## Monitoramento

### Logs

**Docker:**
```bash
docker-compose logs -f
```

**PM2:**
```bash
pm2 logs
pm2 monit
```

### Uptime Monitoring

Configure alertas em:
- UptimeRobot (gratuito)
- Pingdom
- New Relic

### Performance

- Use CDN para assets estáticos
- Configure cache headers no Nginx
- Ative compressão gzip
- Optimize imagens antes do upload

## Backup

### Banco de dados (quando implementar)
```bash
# PostgreSQL
pg_dump database_name > backup.sql

# MySQL
mysqldump -u user -p database_name > backup.sql
```

### Arquivos
```bash
rsync -avz user@servidor:/caminho/projeto /backup/local/
```

## CI/CD

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm build
      
      - name: Deploy to server
        uses: easingthemes/ssh-deploy@main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          TARGET: /var/www/conferencia
```

## Checklist Pré-Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Build local bem-sucedido
- [ ] Testes passando
- [ ] SSL/HTTPS configurado
- [ ] CORS configurado corretamente
- [ ] Google Analytics configurado
- [ ] Sitemap.xml acessível
- [ ] Robots.txt configurado
- [ ] Meta tags OG verificadas
- [ ] Performance testada (Lighthouse)
- [ ] Acessibilidade testada
- [ ] Responsividade verificada
- [ ] Backup configurado
- [ ] Monitoramento ativo

## Troubleshooting

### CORS errors
Verifique `CORS_ORIGIN` no backend e certifique-se de que corresponde ao domínio do frontend.

### 502 Bad Gateway
Backend pode não estar rodando. Verifique logs: `docker-compose logs api`

### Imagens não carregam
Verifique se o caminho está correto e se os arquivos existem em `/public`

### Build falha
Limpe cache: `pnpm store prune` e reinstale: `pnpm install`

## Suporte

Para problemas de deploy, contate: litfilmtourismconferenceucs@gmail.com

