# Script de verificación para MatEdu Frontend (PowerShell)

Write-Host "🔍 Verificando configuración de MatEdu Frontend..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Verificar si estamos en la carpeta correcta
if (-not (Test-Path "package.json")) {
    Write-Host "❌ No se encontró package.json. Asegúrate de estar en la carpeta del proyecto." -ForegroundColor Red
    exit 1
}

# Verificar dependencias
Write-Host "📦 Verificando dependencias..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  node_modules no encontrado. Instalando dependencias..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✅ node_modules encontrado" -ForegroundColor Green
}

# Verificar archivos de configuración importantes
Write-Host ""
Write-Host "🔧 Verificando archivos de configuración..." -ForegroundColor Yellow

$files = @(
    "tailwind.config.js",
    "postcss.config.mjs",
    "next.config.js",
    "src/lib/api.ts",
    "src/contexts/AuthContext.tsx",
    "src/contexts/NotificationContext.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - No encontrado" -ForegroundColor Red
    }
}

# Verificar estructura de carpetas
Write-Host ""
Write-Host "📁 Verificando estructura de carpetas..." -ForegroundColor Yellow

$dirs = @(
    "src/app",
    "src/components/ui",
    "src/contexts",
    "src/lib"
)

foreach ($dir in $dirs) {
    if (Test-Path $dir) {
        Write-Host "✅ $dir/" -ForegroundColor Green
    } else {
        Write-Host "❌ $dir/ - No encontrado" -ForegroundColor Red
    }
}

# Verificar páginas principales
Write-Host ""
Write-Host "📄 Verificando páginas principales..." -ForegroundColor Yellow

$pages = @(
    "src/app/page.tsx",
    "src/app/login/page.tsx",
    "src/app/register/page.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/status/page.tsx",
    "src/app/layout.tsx",
    "src/app/globals.css"
)

foreach ($page in $pages) {
    if (Test-Path $page) {
        Write-Host "✅ $page" -ForegroundColor Green
    } else {
        Write-Host "❌ $page - No encontrado" -ForegroundColor Red
    }
}

# Verificar componentes UI
Write-Host ""
Write-Host "🎨 Verificando componentes UI..." -ForegroundColor Yellow

$components = @(
    "src/components/ui/button.tsx",
    "src/components/ui/card.tsx",
    "src/components/ui/input.tsx",
    "src/components/ui/notification.tsx"
)

foreach ($component in $components) {
    if (Test-Path $component) {
        Write-Host "✅ $component" -ForegroundColor Green
    } else {
        Write-Host "❌ $component - No encontrado" -ForegroundColor Red
    }
}

# Verificar conexión con el backend
Write-Host ""
Write-Host "🌐 Verificando conexión con el backend..." -ForegroundColor Yellow
Write-Host "Intentando conectar a http://127.0.0.1:8000..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:8000/docs" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend accesible en http://127.0.0.1:8000" -ForegroundColor Green
        Write-Host "✅ Documentación disponible en http://127.0.0.1:8000/docs" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ No se puede conectar al backend en http://127.0.0.1:8000" -ForegroundColor Red
    Write-Host "   Por favor, asegúrate de que el backend FastAPI esté corriendo:" -ForegroundColor Yellow
    Write-Host "   uvicorn main:app --host 127.0.0.1 --port 8000" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Resumen de verificación:" -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan
Write-Host "✅ Para iniciar el frontend: npm run dev" -ForegroundColor Green
Write-Host "✅ URL del frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "✅ Página de estado: http://localhost:3000/status" -ForegroundColor Green
Write-Host "✅ Documentación de endpoints: ENDPOINTS.md" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 Enlaces útiles:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "- Backend: http://127.0.0.1:8000" -ForegroundColor White
Write-Host "- API Docs: http://127.0.0.1:8000/docs" -ForegroundColor White
Write-Host "- Estado: http://localhost:3000/status" -ForegroundColor White
Write-Host ""
Write-Host "✨ ¡Listo para usar MatEdu!" -ForegroundColor Green
