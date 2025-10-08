Write-Host "🚀 Deploy da API no Railway" -ForegroundColor Green
Write-Host ""

Write-Host "📦 Compilando TypeScript..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro na compilação!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "✅ Compilação concluída!" -ForegroundColor Green
Write-Host ""

Write-Host "🔐 Fazendo login no Railway..." -ForegroundColor Yellow
railway login
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no login!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "✅ Login realizado!" -ForegroundColor Green
Write-Host ""

Write-Host "🚀 Fazendo deploy da API..." -ForegroundColor Yellow
railway up

Write-Host ""
Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Obtenha a URL da API com: railway domain" -ForegroundColor White
Write-Host "2. Atualize o frontend com a nova URL" -ForegroundColor White
Write-Host "3. Teste o formulário de submissão" -ForegroundColor White
Write-Host ""
Read-Host "Pressione Enter para sair"
