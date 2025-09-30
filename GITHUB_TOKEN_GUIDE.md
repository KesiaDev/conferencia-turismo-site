# 🔑 Como Criar Personal Access Token do GitHub

O GitHub não aceita mais senha comum para git push. Você precisa de um **Personal Access Token**.

## 📝 Passo a Passo

### 1. Acessar configurações do GitHub

1. Faça login no GitHub: https://github.com
2. Clique na sua **foto de perfil** (canto superior direito)
3. Clique em **Settings** (Configurações)

### 2. Criar o Token

1. No menu lateral esquerdo, role até o final
2. Clique em **Developer settings** (última opção)
3. Clique em **Personal access tokens**
4. Clique em **Tokens (classic)**
5. Clique no botão **Generate new token** → **Generate new token (classic)**

### 3. Configurar o Token

**Note (Nome)**: `Conferencia Turismo Site`

**Expiration (Expiração)**: `No expiration` (sem expiração) ou escolha um período

**Select scopes (Permissões)** - Marque:

- ✅ **repo** (todas as sub-opções) - Acesso total aos repositórios
- ✅ **workflow** (opcional) - Para GitHub Actions

### 4. Gerar e Copiar

1. Role até o final da página
2. Clique em **Generate token**
3. ⚠️ **IMPORTANTE**: Copie o token que aparecerá na tela
4. **Salve em local seguro** - ele não será mostrado novamente!

O token será algo como:

```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 5. Usar o Token

Quando o Git pedir credenciais:

```
Username: KesiaDev
Password: [Cole o token aqui]
```

⚠️ **NÃO digite sua senha do GitHub! Use o token!**

## 💡 Dica: Salvar Credenciais

Para não precisar digitar toda vez:

**Windows (Git Credential Manager):**

```powershell
git config --global credential.helper manager
```

O Windows vai salvar automaticamente após o primeiro uso.

**Linux/macOS:**

```bash
git config --global credential.helper store
```

## 🔒 Segurança

- ✅ Guarde o token em local seguro
- ✅ Não compartilhe o token com ninguém
- ✅ Não comite o token no código
- ✅ Se perder, gere um novo token

## 🆘 Problemas Comuns

### "Authentication failed"

**Solução**: Você usou a senha em vez do token. Use o token!

### "Permission denied"

**Solução**: O token precisa ter permissão `repo` marcada

### "Token expirado"

**Solução**: Gere um novo token seguindo os mesmos passos

## 🔗 Links Úteis

- Criar token: https://github.com/settings/tokens/new
- Documentação oficial: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

---

**Pronto!** Depois de criar o token, volte para [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) e continue o deploy! 🚀
