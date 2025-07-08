# MatEdu Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

## 📋 Descripción
Frontend de la plataforma educativa MatEdu, desarrollado con Next.js 15, TypeScript y Tailwind CSS. Consume la API REST del backend FastAPI para proporcionar una interfaz de usuario moderna y responsive.

## 🚀 Características Principales

### ✨ **Funcionalidades**
- 🔐 **Sistema de autenticación** con JWT
- 👥 **Roles de usuario** (Estudiante, Profesor, Admin)  
- 📚 **Gestión de cursos** por áreas matemáticas
- 📝 **Ejercicios interactivos** con evaluación automática
- 📊 **Dashboard personalizado** según el tipo de usuario
- 🏆 **Sistema de logros** y gamificación
- 📈 **Seguimiento detallado** de progreso
- 📱 **Diseño responsive** para todos los dispositivos
- 🔔 **Notificaciones en tiempo real**
- 📡 **Monitoreo de conectividad** con el backend

### 🎯 **Áreas de Matemáticas**
- **Álgebra**: Ecuaciones, funciones, sistemas lineales
- **Geometría**: Figuras planas, volúmenes, trigonometría  
- **Cálculo**: Límites, derivadas, integrales
- **Estadística**: Probabilidad, distribuciones, análisis

## 🛠️ Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes**: Componentes UI personalizados
- **Iconos**: Lucide React
- **Estado**: React Context API
- **HTTP**: Fetch API nativo

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── page.tsx           # Página principal
│   ├── login/             # Página de login
│   ├── register/          # Página de registro  
│   ├── dashboard/         # Dashboard de usuario
│   ├── status/            # Estado de conectividad
│   └── layout.tsx         # Layout principal
├── components/
│   └── ui/                # Componentes UI reutilizables
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── notification.tsx
├── contexts/
│   ├── AuthContext.tsx    # Contexto de autenticación
│   └── NotificationContext.tsx # Contexto de notificaciones
├── lib/
│   └── api.ts            # Cliente API
└── styles/
    └── globals.css       # Estilos globales
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Backend MatEdu ejecutándose en `http://127.0.0.1:8000`

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/MortalWings/MatEdu-Frontend.git
cd matedu-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo con Turbopack
npm run dev

# Construir para producción
npm run build

# Ejecutar versión de producción
npm run start

# Linter
npm run lint
```

## 🔑 Credenciales de Prueba

Para probar la aplicación, usa estas credenciales predefinidas:

### 👨‍🎓 **Estudiante**
- Email: `juan@estudiante.com`
- Password: `estudiante123`

### 👩‍🏫 **Profesor**  
- Email: `maria@edumath.com`
- Password: `profesor123`

### 👨‍💼 **Administrador**
- Email: `admin@edumath.com` 
- Password: `admin123`

## 🌐 Integración con Backend

### Configuración de API
El frontend se conecta automáticamente con el backend FastAPI en:
```
http://127.0.0.1:8000/api/v1
```

### Endpoints principales utilizados:
- `POST /auth/login` - Autenticación
- `POST /auth/registro` - Registro de usuarios
- `GET /usuarios/me` - Información del usuario actual
- `GET /cursos` - Lista de cursos disponibles
- `GET /usuarios/me/cursos` - Cursos del usuario
- `GET /usuarios/{id}/estadisticas` - Estadísticas del usuario

## 📱 Páginas Disponibles

### 🏠 **Páginas Públicas**
- `/` - Landing page con información de la plataforma
- `/login` - Página de inicio de sesión
- `/register` - Página de registro

### 🔒 **Páginas Privadas** (requieren autenticación)
- `/dashboard` - Dashboard principal del usuario
- `/courses` - Lista y gestión de cursos
- `/exercises` - Ejercicios interactivos
- `/achievements` - Logros y progreso
- `/profile` - Perfil del usuario

## 🎨 Diseño y UX

### **Principios de diseño:**
- ✅ **Simplicidad**: Interfaz limpia y fácil de usar
- ✅ **Accesibilidad**: Diseño inclusivo para todos
- ✅ **Consistencia**: Componentes y patrones unificados
- ✅ **Responsividad**: Funciona en todos los dispositivos

### **Paleta de colores:**
- 🔵 **Primario**: Azul (`#3B82F6`)
- 🟢 **Éxito**: Verde (`#10B981`) 
- 🟡 **Advertencia**: Amarillo (`#F59E0B`)
- 🔴 **Error**: Rojo (`#EF4444`)
- ⚫ **Neutral**: Grises (`#6B7280`)

## 🤝 Contribución

### Para contribuir:
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### **Estándares de código:**
- Usa TypeScript para tipado fuerte
- Sigue las convenciones de ESLint
- Componentes funcionales con hooks
- Nombres descriptivos para variables y funciones

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. **Revisa la documentación** del backend en el repositorio MatEdu
2. **Verifica** que el backend esté ejecutándose
3. **Abre un issue** en GitHub con detalles del problema
4. **Contacta** al equipo de desarrollo

## 🔗 Enlaces Relacionados

- **Backend MatEdu**: https://github.com/MortalWings/MatEdu
- **Documentación API**: http://127.0.0.1:8000/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Desarrollado con ❤️ para hacer las matemáticas más accesibles y divertidas**
