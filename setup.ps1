# PowerShell setup script for portfolio site

Write-Host "🚀 Setting up portfolio site..." -ForegroundColor Cyan

# Copy environment file
if (-not (Test-Path .env)) {
    Write-Host "📝 Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠️  Don't forget to add your Web3Forms access key to .env" -ForegroundColor Yellow
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

# Copy site data files
if (-not (Test-Path src/data/siteData.json)) {
    Write-Host "📝 Creating siteData.json from example..." -ForegroundColor Yellow
    Copy-Item src/data/siteData.example.json src/data/siteData.json
    Write-Host "⚠️  Don't forget to update src/data/siteData.json with your personal information" -ForegroundColor Yellow
} else {
    Write-Host "✓ siteData.json already exists" -ForegroundColor Green
}

# Copy projects file
if (-not (Test-Path src/data/projects.json)) {
    Write-Host "📝 Creating projects.json from example..." -ForegroundColor Yellow
    Copy-Item src/data/projects.example.json src/data/projects.json
    Write-Host "⚠️  Don't forget to update src/data/projects.json with your projects" -ForegroundColor Yellow
} else {
    Write-Host "✓ projects.json already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env and add your Web3Forms access key"
Write-Host "2. Edit src/data/siteData.json with your personal information"
Write-Host "3. Edit src/data/projects.json with your projects"
Write-Host "4. Run 'npm run dev' to start the development server"
