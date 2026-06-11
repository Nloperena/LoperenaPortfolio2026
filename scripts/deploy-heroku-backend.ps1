# Deploy backendrepo to Heroku (run after: heroku login)
param(
  [string]$AppName = "loperena-intake-backend"
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot

Set-Location $RepoRoot

Write-Host "Checking Heroku auth..."
$who = heroku auth:whoami 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Error "Not logged in. Run: heroku login"
}

Write-Host "Logged in as: $who"

$apps = heroku apps --json | ConvertFrom-Json
$exists = $apps | Where-Object { $_.name -eq $AppName }

if (-not $exists) {
  Write-Host "Creating app $AppName..."
  heroku create $AppName
} else {
  Write-Host "App $AppName already exists."
}

if (-not (git remote | Select-String -Pattern "^heroku")) {
  heroku git:remote -a $AppName
}

Write-Host "Ensuring Postgres addon..."
$addons = heroku addons -a $AppName 2>&1
if ($addons -notmatch "heroku-postgresql") {
  heroku addons:create heroku-postgresql:essential-0 -a $AppName
}

Write-Host "Setting CORS origins..."
heroku config:set ALLOWED_ORIGINS="https://www.nicoloperena.com,https://nicoloperena.com,http://localhost:4321" -a $AppName

Write-Host "Running database schema..."
Get-Content "$RepoRoot\backendrepo\sql\schema.sql" | heroku pg:psql -a $AppName

Write-Host "Deploying backendrepo subtree to Heroku..."
git subtree push --prefix backendrepo heroku main
if ($LASTEXITCODE -ne 0) {
  Write-Host "Subtree push failed (often means no new commits). Trying force push split..."
  git push heroku `git subtree split --prefix backendrepo main`:main --force
}

$url = "https://$AppName.herokuapp.com"
Write-Host ""
Write-Host "Done. Backend URL: $url"
Write-Host "Health: $url/health"
Write-Host "Submissions: $url/api/submissions"
Write-Host ""
Write-Host "Add to Vercel env:"
Write-Host "  PUBLIC_INTAKE_API_URL=$url/api/submissions"
Write-Host ""
Write-Host "Test health:"
Write-Host "  Invoke-RestMethod $url/health"
