# Documentación de Endpoints - API MatEdu

## 🔗 URL Base
```
http://127.0.0.1:8000/api/v1
```

## 🔐 Autenticación

### 1. Login
- **Endpoint**: `POST /auth/login`
- **Tipo**: Form data
- **Campos**:
  - `username`: email del usuario
  - `password`: contraseña
- **Respuesta**: `{ "access_token": "token", "token_type": "bearer" }`

### 2. Registro
- **Endpoint**: `POST /auth/registro`
- **Tipo**: JSON
- **Campos**:
  ```json
  {
    "nombre": "string",
    "apellido": "string", 
    "email": "string",
    "password": "string",
    "tipo_usuario": "estudiante|profesor|admin",
    "fecha_nacimiento": "YYYY-MM-DD"
  }
  ```

## 👤 Usuarios

### 1. Obtener usuario actual
- **Endpoint**: `GET /usuarios/me`
- **Autenticación**: Bearer token
- **Respuesta**: Datos del usuario autenticado

### 2. Estadísticas del usuario
- **Endpoint**: `GET /usuarios/{user_id}/estadisticas`
- **Autenticación**: Bearer token
- **Respuesta**: Estadísticas de progreso y logros

### 3. Cursos del usuario
- **Endpoint**: `GET /usuarios/me/cursos`
- **Autenticación**: Bearer token
- **Respuesta**: Lista de cursos en los que está inscrito

### 4. Progreso del usuario en un curso
- **Endpoint**: `GET /usuarios/me/progreso/{course_id}`
- **Autenticación**: Bearer token
- **Respuesta**: Progreso detallado del curso

### 5. Logros del usuario
- **Endpoint**: `GET /usuarios/me/logros`
- **Autenticación**: Bearer token
- **Respuesta**: Lista de logros obtenidos

## 🧮 Áreas Matemáticas

### 1. Listar áreas matemáticas
- **Endpoint**: `GET /areas-matematicas`
- **Autenticación**: No requerida
- **Respuesta**: Lista de todas las áreas matemáticas disponibles

## 📚 Cursos

### 1. Listar cursos
- **Endpoint**: `GET /cursos`
- **Parámetros opcionales**:
  - `area_id`: Filtrar por área matemática
  - `nivel`: Filtrar por nivel (basico, intermedio, avanzado)
- **Respuesta**: Lista de cursos disponibles

### 2. Obtener curso específico
- **Endpoint**: `GET /cursos/{course_id}`
- **Respuesta**: Detalles completos del curso

### 3. Inscribirse en un curso
- **Endpoint**: `POST /cursos/{course_id}/inscribirse`
- **Autenticación**: Bearer token
- **Respuesta**: Confirmación de inscripción

### 4. Lecciones de un curso
- **Endpoint**: `GET /cursos/{course_id}/lecciones`
- **Autenticación**: Bearer token
- **Respuesta**: Lista de lecciones del curso

## 📖 Lecciones

### 1. Iniciar lección
- **Endpoint**: `POST /lecciones/{lesson_id}/iniciar`
- **Autenticación**: Bearer token
- **Respuesta**: Confirmación de inicio de lección

### 2. Completar lección
- **Endpoint**: `POST /lecciones/{lesson_id}/completar`
- **Autenticación**: Bearer token
- **Respuesta**: Confirmación de completado y actualización de progreso

### 3. Ejercicios de una lección
- **Endpoint**: `GET /lecciones/{lesson_id}/ejercicios`
- **Autenticación**: Bearer token
- **Respuesta**: Lista de ejercicios de la lección

## 🎯 Ejercicios

### 1. Responder ejercicio
- **Endpoint**: `POST /ejercicios/{exercise_id}/responder`
- **Autenticación**: Bearer token
- **Cuerpo**:
  ```json
  {
    "respuesta_usuario": "string"
  }
  ```
- **Respuesta**: 
  ```json
  {
    "es_correcto": boolean,
    "puntos_obtenidos": number,
    "respuesta_correcta": "string",
    "explicacion": "string"
  }
  ```

## 📊 Estadísticas y Progreso

### 1. Estadísticas generales del usuario
- **Endpoint**: `GET /usuarios/{user_id}/estadisticas`
- **Respuesta**:
  ```json
  {
    "total_puntos": number,
    "cursos_completados": number,
    "lecciones_completadas": number,
    "ejercicios_resueltos": number,
    "logros_desbloqueados": number,
    "tiempo_total_estudio": number
  }
  ```

## 🏆 Logros

### 1. Logros del usuario
- **Endpoint**: `GET /usuarios/me/logros`
- **Autenticación**: Bearer token
- **Respuesta**: Lista de logros obtenidos por el usuario

## 🔗 Documentación Interactiva

Una vez que el backend esté corriendo, puedes acceder a la documentación interactiva de Swagger en:
- **Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

## 🧪 Usuarios de Prueba

Para realizar pruebas, puedes usar estos usuarios predefinidos:

### Administrador
- **Email**: admin@edumath.com
- **Password**: admin123

### Profesor
- **Email**: maria@edumath.com
- **Password**: profesor123

### Estudiantes
- **Email**: juan@estudiante.com
- **Password**: estudiante123

- **Email**: ana@estudiante.com
- **Password**: estudiante123

## 🚀 Configuración para Desarrollo

### 1. Iniciar el Backend
```bash
# Desde la carpeta del backend
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Iniciar el Frontend
```bash
# Desde la carpeta del frontend
npm run dev
```

### 3. Verificar Conexión
- Backend: http://127.0.0.1:8000
- Frontend: http://localhost:3000
- Docs: http://127.0.0.1:8000/docs
- Estado: http://localhost:3000/status

## 🔧 Resolución de Problemas

### Error "Failed to fetch"
- ✅ Verifica que el backend esté corriendo
- ✅ Confirma que esté en el puerto 8000
- ✅ Revisa que no haya problemas de CORS
- ✅ Usa la página de estado para diagnosticar

### Error de CORS
- ✅ El backend debe permitir el origen `http://localhost:3000`
- ✅ Verifica la configuración de CORS en FastAPI

### Error de Autenticación
- ✅ Verifica que el token esté siendo enviado correctamente
- ✅ Confirma que el token no haya expirado
- ✅ Revisa que el header Authorization esté bien formateado
