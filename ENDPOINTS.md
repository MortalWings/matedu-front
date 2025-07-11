# 📋 MatEdu API - Documentación Completa de Endpoints

## 🔗 URL Base
```
http://127.0.0.1:8000/api/v1
```

## ⚠️ **ACTUALIZACIÓN IMPORTANTE - Julio 8, 2025**

### 🚀 **Backend Actualizado y Verificado**
- ✅ Todos los endpoints principales funcionando correctamente
- ✅ Estructura de respuestas mejorada con datos anidados completos
- ✅ Credenciales de prueba verificadas y funcionando
- ✅ Base de datos poblada con relaciones profesor-estudiante

### 🔧 **Cambios Principales en las Respuestas:**
1. **Asignaciones** ahora incluyen objetos `curso`, `profesor` y `estudiante` completos
2. **Estudiantes** reciben estructura simplificada con campos esenciales
3. **Fechas** en formato ISO con timezone
4. **Estados de asignación** bien definidos

---

## 🔐 Autenticación

### 1. Login
- **Endpoint**: `POST /auth/login`
- **Tipo**: JSON
- **Campos**:
  ```json
  {
    "email": "juan@estudiante.com",
    "password": "estudiante123"
  }
  ```
- **Respuesta**: 
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer"
  }
  ```

### 2. Registro
- **Endpoint**: `POST /auth/registro`
- **Tipo**: JSON
- **Campos**:
  ```json
  {
    "nombre": "Juan",
    "apellido": "Pérez", 
    "email": "juan@ejemplo.com",
    "password": "mi_password_segura",
    "tipo_usuario": "estudiante",
    "fecha_nacimiento": "2000-01-15T00:00:00"
  }
  ```

## 👤 Headers Autenticados
```http
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

---

## 🎯 **NUEVOS ENDPOINTS - Lógica Profesor-Estudiante**

### 🧑‍🏫 **PROFESORES - Gestión de Estudiantes y Cursos**

#### 1. Asignar curso a estudiantes
- **Endpoint**: `POST /profesores/asignar-curso`
- **Autenticación**: Bearer token (Profesor)
- **Cuerpo**:
  ```json
  {
    "curso_id": 1,
    "estudiantes_ids": [1, 2, 3],
    "fecha_limite": "2025-12-31T23:59:59Z",
    "observaciones": "Curso obligatorio para el semestre"
  }
  ```

#### 2. Ver mis estudiantes
- **Endpoint**: `GET /profesores/me/estudiantes`
- **Autenticación**: Bearer token (Profesor)
- **Respuesta**: Lista de estudiantes asignados al profesor

#### 3. Ver todas mis asignaciones
- **Endpoint**: `GET /profesores/me/asignaciones`
- **Autenticación**: Bearer token (Profesor)
- **Respuesta**: Lista de todas las asignaciones de cursos realizadas

#### 4. Remover asignación
- **Endpoint**: `DELETE /profesores/asignar-curso/{asignacion_id}`
- **Autenticación**: Bearer token (Profesor)
- **Respuesta**: Confirmación de eliminación

### 🎓 **ESTUDIANTES - Cursos Asignados**

#### 1. Ver cursos asignados por mi profesor
- **Endpoint**: `GET /estudiantes/me/cursos-asignados`
- **Autenticación**: Bearer token (Estudiante)
- **Respuesta**:
  ```json
  [
    {
      "id": 1,
      "curso": {
        "id": 1,
        "titulo": "Álgebra Básica",
        "descripcion": "...",
        "nivel_dificultad": "basico"
      },
      "profesor": {
        "id": 2,
        "nombre": "María García"
      },
      "fecha_asignacion": "2025-07-01T10:00:00Z",
      "fecha_limite": "2025-12-31T23:59:59Z",
      "estado": "asignado",
      "progreso_porcentaje": 0.0,
      "observaciones": "Curso obligatorio para el semestre"
    }
  ]
  ```

#### 2. Iniciar curso asignado
- **Endpoint**: `POST /estudiantes/iniciar-curso-asignado/{asignacion_id}`
- **Autenticación**: Bearer token (Estudiante)
- **Respuesta**: Confirmación de inicio del curso

#### 3. Ver mi profesor
- **Endpoint**: `GET /estudiantes/me/profesor`
- **Autenticación**: Bearer token (Estudiante)
- **Respuesta**: Información del profesor asignado

### 👨‍💼 **ADMIN - Gestión Profesor-Estudiante**

#### 1. Asignar estudiante a profesor
- **Endpoint**: `POST /admin/asignar-estudiante-profesor`
- **Autenticación**: Bearer token (Admin)
- **Cuerpo**:
  ```json
  {
    "profesor_id": 2,
    "estudiante_id": 1
  }
  ```

---

## 👤 Usuarios

### 1. Obtener usuario actual
- **Endpoint**: `GET /usuarios/me`
- **Autenticación**: Bearer token
- **Respuesta**: Datos del usuario autenticado

### 2. Estadísticas del usuario
- **Endpoint**: `GET /usuarios/{user_id}/estadisticas`
- **Autenticación**: Bearer token
- **Respuesta**: 
  ```json
  {
    "cursos_completados": 5,
    "cursos_en_progreso": 2,
    "ejercicios_resueltos": 150,
    "ejercicios_correctos": 120,
    "puntos_totales": 2400,
    "nivel_actual": 3,
    "logros_obtenidos": 8
  }
  ```

### 3. Cursos del usuario (DEPRECADO para estudiantes)
- **Endpoint**: `GET /usuarios/me/cursos`
- **Autenticación**: Bearer token
- **Nota**: ⚠️ Los estudiantes deben usar `/estudiantes/me/cursos-asignados`

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

### 1. Listar cursos (Para profesores y admin)
- **Endpoint**: `GET /cursos`
- **Parámetros opcionales**:
  - `area_id`: Filtrar por área matemática
  - `nivel`: Filtrar por nivel (basico, intermedio, avanzado)
- **Respuesta**: Lista de cursos disponibles
- **Nota**: ⚠️ Los estudiantes ven solo cursos asignados por su profesor

### 2. Obtener curso específico
- **Endpoint**: `GET /cursos/{course_id}`
- **Respuesta**: Detalles completos del curso

### 3. Inscribirse en un curso (DEPRECADO para estudiantes)
- **Endpoint**: `POST /cursos/{course_id}/inscribirse`
- **Autenticación**: Bearer token
- **Nota**: ⚠️ Los estudiantes solo pueden iniciar cursos asignados por su profesor

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
    "ejercicio_id": 1,
    "respuesta_usuario": "6x"
  }
  ```
- **Respuesta**: 
  ```json
  {
    "correcto": true,
    "puntos_ganados": 10,
    "explicacion": "¡Correcto! La derivada de 3x² es 6x",
    "puntos_totales": 2410
  }
  ```

---

## � **Flujos de Trabajo por Tipo de Usuario**

### **🎓 Flujo del Estudiante**
```
1. Login → GET /auth/login
2. Ver cursos asignados → GET /estudiantes/me/cursos-asignados
3. Iniciar curso → POST /estudiantes/iniciar-curso-asignado/{id}
4. Ver lecciones → GET /cursos/{curso_id}/lecciones
5. Iniciar lección → POST /lecciones/{leccion_id}/iniciar
6. Ver ejercicios → GET /lecciones/{leccion_id}/ejercicios
7. Responder ejercicios → POST /ejercicios/{ejercicio_id}/responder
8. Completar lección → POST /lecciones/{leccion_id}/completar
9. Ver progreso → GET /usuarios/me/progreso/{curso_id}
```

### **🧑‍🏫 Flujo del Profesor**
```
1. Login → GET /auth/login
2. Ver estudiantes → GET /profesores/me/estudiantes
3. Ver cursos disponibles → GET /cursos
4. Asignar curso → POST /profesores/asignar-curso
5. Ver asignaciones → GET /profesores/me/asignaciones
6. Ver estadísticas estudiante → GET /usuarios/{id}/estadisticas
```

### **👨‍💼 Flujo del Admin**
```
1. Login → GET /auth/login
2. Asignar estudiante a profesor → POST /admin/asignar-estudiante-profesor
3. Gestionar usuarios → (endpoints adicionales)
4. Ver estadísticas generales → (endpoints adicionales)
```

---

## � **Estados de Asignación**
- `"asignado"` - Curso asignado pero no iniciado
- `"en_progreso"` - Estudiante comenzó el curso
- `"completado"` - Curso finalizado
- `"vencido"` - Pasó la fecha límite sin completar

## 📊 **Tipos de Datos**

### Tipos de Usuario
- `estudiante`
- `profesor` 
- `admin`

### Niveles de Dificultad
- `basico`
- `intermedio`
- `avanzado`

### Tipos de Ejercicio
- `opcion_multiple`
- `desarrollo`
- `verdadero_falso`
- `completar`

### Estados de Progreso
- `no_iniciado`
- `en_progreso`
- `completado`

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

---

## ⚠️ **Cambios Importantes en el Frontend**

### **Para Dashboard Estudiante:**
```javascript
// ❌ ANTES: Obtener todos los cursos
const cursos = await api.getCursos();

// ✅ AHORA: Obtener solo cursos asignados por el profesor
const cursosAsignados = await api.getCursosAsignados();
```

### **Para Dashboard Profesor:**
```javascript
// Nuevo flujo para profesores
const estudiantes = await api.getMisEstudiantes();
const asignaciones = await api.getMisAsignaciones();
```

---

## 🔑 **Códigos de Error Comunes**

### **Autenticación**
- `401` - Token inválido o expirado
- `403` - Permisos insuficientes (ej: estudiante intentando asignar cursos)

### **Recursos**
- `404` - Recurso no encontrado (curso, usuario, asignación)
- `400` - Datos inválidos en la petición
- `422` - Error de validación de campos

### **Asignaciones**
- `400` - "El estudiante ya está asignado a este curso"
- `403` - "Solo los profesores pueden asignar cursos"
- `404` - "Curso no encontrado"

---

## 🚀 Configuración para Desarrollo

### 1. Iniciar el Backend
```bash
# Desde la carpeta del backend
cd "C:\Users\kevin\Desktop\pfm back"
python run.py
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

---

## 🎯 **Nuevas APIs Integradas en el Frontend**

### ✅ **Completamente Implementadas**

#### 🧑‍🏫 **Profesores**
- ✅ `api.asignarCurso()` - Asignar cursos a estudiantes
- ✅ `api.getMisEstudiantes()` - Ver estudiantes asignados
- ✅ `api.getMisAsignaciones()` - Ver todas las asignaciones
- ✅ `api.removerAsignacion()` - Eliminar asignaciones

#### 🎓 **Estudiantes** 
- ✅ `api.getCursosAsignados()` - Ver cursos asignados (reemplaza getCursos())
- ✅ `api.iniciarCursoAsignado()` - Iniciar curso asignado
- ✅ `api.getMiProfesor()` - Ver información del profesor

#### 👨‍💼 **Administradores**
- ✅ `api.asignarEstudianteProfesor()` - Asignar estudiante a profesor

### 🔄 **Cambios en los Dashboards**
- ✅ **StudentDashboard**: Ahora usa `getCursosAsignados()` en lugar de `getUserCourses()`
- ✅ **TeacherDashboard**: Integra `getMisEstudiantes()` y `getMisAsignaciones()`
- ✅ **AdminDashboard**: Listo para usar `asignarEstudianteProfesor()`

### 📊 **Total de APIs: 25 Endpoints Integrados**

---

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
