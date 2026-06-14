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

if (-not $env:OPS_PASSWORD) {
  $generated = -join ((48..57 + 65..90 + 97..122) | Get-Random -Count 24 | ForEach-Object { [char]$_ })
  Write-Host "Setting OPS_PASSWORD (save this - inbox login at /operations):"
  Write-Host $generated
  heroku config:set "OPS_PASSWORD=$generated" -a $AppName
} else {
  heroku config:set "OPS_PASSWORD=$env:OPS_PASSWORD" -a $AppName
}

$existingSecret = heroku config:get OPS_SESSION_SECRET -a $AppName 2>$null
if (-not $existingSecret) {
  $secret = -join ((48..57 + 65..90 + 97..122) | Get-Random -Count 32 | ForEach-Object { [char]$_ })
  heroku config:set "OPS_SESSION_SECRET=$secret" -a $AppName
}

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
Write-Host "Submissions API: $url/api/submissions"
Write-Host "Password inbox: $url/operations"
Write-Host ""
Write-Host "Optional Vercel env override:"
Write-Host "  PUBLIC_INTAKE_API_URL=$url/api/submissions"
Write-Host "  PUBLIC_INTAKE_OPS_URL=$url/operations"
Write-Host ""
Write-Host "Test health:"
Write-Host "  Invoke-RestMethod $url/health"
