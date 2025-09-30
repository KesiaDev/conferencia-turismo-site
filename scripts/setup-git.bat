@echo off
echo 🚀 Configurando Git e fazendo primeiro commit...
echo.

REM Verificar se git está inicializado
if not exist ".git" (
  echo 📦 Inicializando repositório Git...
  git init
)

REM Adicionar todos os arquivos
echo 📝 Adicionando arquivos...
git add .

REM Fazer primeiro commit
echo 💾 Fazendo primeiro commit...
git commit -m "Initial commit - III Conferencia Internacional de Turismo Literario e Cinematografico"

REM Conectar ao GitHub
echo 🔗 Conectando ao GitHub (KesiaDev)...
git remote add origin https://github.com/KesiaDev/conferencia-turismo-site.git

REM Renomear branch para main
echo 🌿 Configurando branch main...
git branch -M main

echo.
echo ✅ Pronto! Agora execute:
echo    git push -u origin main
echo.
echo ⚠️  O GitHub vai pedir suas credenciais:
echo    - Username: KesiaDev
echo    - Password: Use um Personal Access Token (nao a senha)
echo.
echo 📖 Como criar token: https://github.com/settings/tokens
echo.
pause

