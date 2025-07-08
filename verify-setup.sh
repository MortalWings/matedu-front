#!/bin/bash
# Script de verificación para MatEdu Frontend

echo "🔍 Verificando configuración de MatEdu Frontend..."
echo "================================================"

# Verificar si estamos en la carpeta correcta
if [ ! -f "package.json" ]; then
    echo "❌ No se encontró package.json. Asegúrate de estar en la carpeta del proyecto."
    exit 1
fi

# Verificar dependencias
echo "📦 Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules no encontrado. Instalando dependencias..."
    npm install
else
    echo "✅ node_modules encontrado"
fi

# Verificar archivos de configuración importantes
echo ""
echo "🔧 Verificando archivos de configuración..."

files=(
    "tailwind.config.js"
    "postcss.config.mjs"
    "next.config.js"
    "src/lib/api.ts"
    "src/contexts/AuthContext.tsx"
    "src/contexts/NotificationContext.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - No encontrado"
    fi
done

# Verificar estructura de carpetas
echo ""
echo "📁 Verificando estructura de carpetas..."

dirs=(
    "src/app"
    "src/components/ui"
    "src/contexts"
    "src/lib"
)

for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir/"
    else
        echo "❌ $dir/ - No encontrado"
    fi
done

# Verificar páginas principales
echo ""
echo "📄 Verificando páginas principales..."

pages=(
    "src/app/page.tsx"
    "src/app/login/page.tsx"
    "src/app/register/page.tsx"
    "src/app/dashboard/page.tsx"
    "src/app/status/page.tsx"
    "src/app/layout.tsx"
    "src/app/globals.css"
)

for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "✅ $page"
    else
        echo "❌ $page - No encontrado"
    fi
done

# Verificar componentes UI
echo ""
echo "🎨 Verificando componentes UI..."

components=(
    "src/components/ui/button.tsx"
    "src/components/ui/card.tsx"
    "src/components/ui/input.tsx"
    "src/components/ui/notification.tsx"
)

for component in "${components[@]}"; do
    if [ -f "$component" ]; then
        echo "✅ $component"
    else
        echo "❌ $component - No encontrado"
    fi
done

# Verificar conexión con el backend
echo ""
echo "🌐 Verificando conexión con el backend..."
echo "Intentando conectar a http://127.0.0.1:8000..."

if curl -s -f "http://127.0.0.1:8000/docs" > /dev/null; then
    echo "✅ Backend accesible en http://127.0.0.1:8000"
    echo "✅ Documentación disponible en http://127.0.0.1:8000/docs"
else
    echo "❌ No se puede conectar al backend en http://127.0.0.1:8000"
    echo "   Por favor, asegúrate de que el backend FastAPI esté corriendo:"
    echo "   uvicorn main:app --host 127.0.0.1 --port 8000"
fi

echo ""
echo "🚀 Resumen de verificación:"
echo "=========================="
echo "✅ Para iniciar el frontend: npm run dev"
echo "✅ URL del frontend: http://localhost:3000"
echo "✅ Página de estado: http://localhost:3000/status"
echo "✅ Documentación de endpoints: ENDPOINTS.md"
echo ""
echo "🔗 Enlaces útiles:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://127.0.0.1:8000"
echo "- API Docs: http://127.0.0.1:8000/docs"
echo "- Estado: http://localhost:3000/status"
echo ""
echo "✨ ¡Listo para usar MatEdu!"
