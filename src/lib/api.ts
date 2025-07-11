// API Service para conectar con el backend MatEdu
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  tipo_usuario: 'estudiante' | 'profesor' | 'admin';
  fecha_nacimiento?: string; // Opcional según la documentación
}

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  tipo_usuario: string;
  fecha_registro: string;
  puntos_totales: number;
  nivel_actual: number;
  activo: boolean;
  avatar_url?: string | null;
}

export interface Course {
  id: number;
  titulo: string;
  descripcion: string;
  objetivos?: string;
  nivel_dificultad: string;
  duracion_estimada: number;
  imagen_portada: string | null;
  activo: boolean;
  fecha_creacion: string;
  area_matematica_id: number;
  profesor_id: number;
  area_matematica?: {
    id: number;
    nombre: string;
    color: string;
  };
  profesor?: {
    id: number;
    nombre: string;
    apellido: string;
  };
  progreso_porcentaje?: number;
  fecha_inscripcion?: string;
}

export interface Lesson {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  orden: number;
  duracion_estimada: number;
  curso_id: number;
  estado_progreso?: 'no_iniciado' | 'en_progreso' | 'completado';
}

export interface Exercise {
  id: number;
  enunciado: string;
  tipo_ejercicio: 'desarrollo' | 'opcion_multiple';
  opciones: string[] | null;
  respuesta_correcta: string;
  explicacion: string;
  puntos: number;
  leccion_id: number;
}

export interface MathArea {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  color: string;
  orden: number;
}

export interface UserStats {
  cursos_completados: number;
  cursos_en_progreso: number;
  ejercicios_resueltos: number;
  ejercicios_correctos: number;
  puntos_totales: number;
  nivel_actual: number;
  logros_obtenidos: number;
}

export interface Achievement {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  puntos: number;
  fecha_obtencion: string;
}

export interface UserProgress {
  curso_id: number;
  usuario_id: number;
  progreso_porcentaje: number;
  lecciones_completadas: number;
  lecciones_totales: number;
  ejercicios_resueltos: number;
  ejercicios_correctos: number;
  puntos_ganados: number;
  fecha_inicio: string;
  fecha_ultima_actividad: string;
}

export interface EnrollmentResponse {
  message: string;
  inscripcion: {
    id: number;
    usuario_id: number;
    curso_id: number;
    fecha_inscripcion: string;
    fecha_finalizacion: string | null;
    progreso_porcentaje: number;
  };
}

export interface LessonResponse {
  message: string;
  puntos_ganados?: number;
  nuevo_nivel?: number;
  progreso?: {
    id: number;
    usuario_id: number;
    leccion_id: number;
    fecha_inicio: string;
    fecha_finalizacion: string | null;
    completado: boolean;
  };
}

export interface ExerciseResponse {
  correcto: boolean;
  puntos_ganados: number;
  explicacion: string;
  puntos_totales: number;
}

export interface Assignment {
  id: number;
  curso: Course; // Usar la interfaz Course completa
  profesor: {
    id: number;
    nombre: string;
    apellido: string;
  };
  estudiante?: {
    id: number;
    nombre: string;
    apellido: string;
  };
  fecha_asignacion: string;
  fecha_limite: string;
  estado: 'asignado' | 'en_progreso' | 'completado' | 'vencido';
  progreso_porcentaje: number;
  observaciones: string;
}

export interface AssignmentRequest {
  curso_id: number;
  estudiantes_ids: number[];
  fecha_limite: string;
  observaciones: string;
}

export interface StudentTeacherAssignment {
  profesor_id: number;
  estudiante_id: number;
}

// Nuevas interfaces para endpoints adicionales
export interface LeccionDetalle {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  video_url?: string;
  orden: number;
  puntos_otorgados: number;
  tiempo_estimado: number;
  curso_id: number;
  activa: boolean;
}

export interface Ejercicio {
  id: number;
  titulo: string;
  enunciado: string;
  tipo_ejercicio: 'opcion_multiple' | 'desarrollo' | 'verdadero_falso' | 'completar';
  nivel_dificultad: string;
  puntos_otorgados: number;
  orden: number;
  opciones_json?: string;
  respuesta_correcta?: string;
}

export interface RespuestaEjercicio {
  id: number;
  respuesta_usuario: string;
  es_correcta: boolean;
  puntos_obtenidos: number;
  fecha_respuesta: string;
  ejercicio_id: number;
}

export interface ActividadReciente {
  respuestas_recientes: Array<{
    id: number;
    respuesta_usuario: string;
    es_correcta: boolean;
    puntos_obtenidos: number;
    fecha_respuesta: string;
    ejercicio: {
      titulo: string;
      leccion: {
        titulo: string;
        curso: {
          titulo: string;
        };
      };
    };
  }>;
  lecciones_completadas_recientes: Array<{
    id: number;
    estado: string;
    fecha_completion: string;
    puntos_obtenidos: number;
    leccion: {
      titulo: string;
      curso: {
        titulo: string;
      };
    };
  }>;
}

export interface ProfesorEstadisticas {
  profesor_id: number;
  cursos_creados: number;
  estudiantes_asignados: number;
  asignaciones_activas: number;
  inscripciones_totales: number;
}

export interface CursoEstudiantesProgreso {
  curso: {
    id: number;
    titulo: string;
  };
  total_estudiantes: number;
  estudiantes_progreso: Array<{
    estudiante: {
      id: number;
      nombre: string;
      apellido: string;
      email: string;
    };
    fecha_inscripcion: string;
    progreso_porcentaje: number;
    lecciones_completadas: number;
    total_lecciones: number;
    puntos_obtenidos: number;
    ultima_actividad: string;
  }>;
}

export interface AsignacionUpdate {
  message: string;
  asignacion: {
    id: number;
    fecha_limite: string;
    observaciones: string;
  };
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    // Solo acceder a localStorage en el cliente
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
      if (this.token) {
        console.log('🔑 Token cargado desde localStorage al inicializar ApiService');
      }
    }
  }

  // Método para forzar la recarga del token desde localStorage
  private refreshTokenFromStorage() {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken && storedToken !== this.token) {
        this.token = storedToken;
        console.log('🔄 Token actualizado desde localStorage:', this.token ? '✅ Disponible' : '❌ No encontrado');
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Asegurar que tenemos el token más reciente antes de cada petición
    this.refreshTokenFromStorage();
    
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`🚀 Intentando conectar a: ${url}`);
      console.log(`🔑 Token disponible: ${this.token ? '✅ Sí' : '❌ No'}`);
      if (this.token) {
        console.log(`🔒 Token (primeros 20 chars): ${this.token.substring(0, 20)}...`);
      }
      console.log(`📋 Headers:`, config.headers);
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Manejar errores de autenticación específicamente
        if (response.status === 401) {
          console.error('🔐 Error de autenticación detectado');
          console.error('📋 Detalles del error:', errorData);
          this.debugAuth(); // Debug automático en errores 401
          
          // Limpiar token inválido
          this.clearToken();
          
          throw new Error('No se pudieron validar las credenciales');
        }
        
        throw new Error(errorData.detail || `Error ${response.status}: ${response.statusText}`);
      }

      console.log(`✅ Respuesta exitosa de: ${url}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      
      // Verificar si es un error de red (backend no disponible)
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'unknown';
        throw new Error(
          '🔴 No se puede conectar al servidor MatEdu.\n\n' +
          '📋 Para solucionar esto:\n' +
          '1. Asegúrate de que el backend FastAPI esté corriendo\n' +
          '2. Verifica que esté ejecutándose en http://127.0.0.1:8000\n' +
          '3. Inicia el backend con: uvicorn main:app --host 127.0.0.1 --port 8000\n' +
          '4. Verifica la conectividad en /status\n\n' +
          '🌐 URL intentada: ' + url + '\n' +
          '🌐 Origen actual: ' + currentOrigin + '\n' +
          '✅ Frontend correcto: http://localhost:3000'
        );
      }
      
      // Otros errores de red
      if (error instanceof TypeError) {
        throw new Error(
          '🔌 Error de conexión de red.\n\n' +
          'Verifica tu conexión a internet y que el servidor esté disponible.'
        );
      }
      
      throw error;
    }
  }

  // Autenticación
  async login(credentials: LoginData): Promise<{ access_token: string; token_type: string }> {
    try {
      console.log('🔐 Intentando login con:', credentials.email);
      console.log('🌍 URL objetivo:', `${this.baseURL}/auth/login`);
      
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      console.log('📡 Respuesta del servidor:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Error del servidor:', errorData);
        
        if (response.status === 401) {
          throw new Error('❌ Credenciales incorrectas. Verifica tu email y contraseña.');
        }
        throw new Error(errorData.detail || errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Login exitoso, datos recibidos:', data);
      
      if (data.access_token) {
        this.setToken(data.access_token);
        console.log('✅ Token guardado correctamente');
      } else {
        console.error('❌ No se recibió access_token en la respuesta');
        throw new Error('Respuesta del servidor no válida: falta access_token');
      }
      
      return data;
    } catch (error) {
      console.error('❌ Error en login:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'unknown';
        throw new Error(
          '🔴 No se puede conectar al servidor para hacer login.\n\n' +
          '🔧 Soluciones:\n' +
          '1. Asegúrate de que el backend FastAPI esté corriendo en http://127.0.0.1:8000\n' +
          '2. Verifica en /status la conectividad\n' +
          '3. Reinicia el backend si es necesario\n\n' +
          '🌐 Origen actual: ' + currentOrigin + '\n' +
          '✅ Frontend correcto: http://localhost:3000'
        );
      }
      
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<User> {
    return this.request<User>('/auth/registro', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      console.log('💾 Token guardado en localStorage');
      console.log(`🔒 Token guardado (primeros 20 chars): ${token.substring(0, 20)}...`);
    }
  }

  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      console.log('🗑️ Token eliminado de localStorage');
    }
  }

  // Limpiar token de autenticación
  clearToken() {
    console.log('🧹 Limpiando token de autenticación...');
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('🧹 Token eliminado del localStorage');
    }
  }

  // Método público para obtener el token actual
  getToken(): string | null {
    this.refreshTokenFromStorage();
    return this.token;
  }

  // Método de debug para verificar el estado de autenticación
  debugAuth() {
    console.log('🔍 === DEBUG AUTENTICACIÓN ===');
    console.log('🏪 localStorage token:', typeof window !== 'undefined' ? localStorage.getItem('token') : 'N/A (servidor)');
    console.log('🏪 localStorage user:', typeof window !== 'undefined' ? localStorage.getItem('user') : 'N/A (servidor)');
    console.log('💾 API instance token:', this.token ? '✅ Disponible' : '❌ No disponible');
    if (this.token) {
      console.log('🔒 Token (primeros 30 chars):', this.token.substring(0, 30) + '...');
      
      // Intentar decodificar el JWT para verificar si está expirado
      try {
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        const expiredTime = payload.exp;
        console.log('⏰ Token exp:', new Date(expiredTime * 1000).toLocaleString());
        console.log('⏰ Hora actual:', new Date(now * 1000).toLocaleString());
        console.log('⏳ Token expirado:', expiredTime < now ? '❌ SÍ' : '✅ NO');
        console.log('👤 Token user:', payload.sub || payload.email || 'No disponible');
      } catch (error) {
        console.log('⚠️ Error decodificando token:', error);
      }
    }
    console.log('🌐 Base URL:', this.baseURL);
    console.log('🔍 === FIN DEBUG ===');
  }

  // Usuario
  async getCurrentUser(): Promise<User> {
    console.log('👤 getCurrentUser: Obteniendo usuario actual...');
    console.log('🔑 Token antes de la petición:', this.token ? '✅ Disponible' : '❌ No disponible');
    
    try {
      const user = await this.request<User>('/usuarios/me');
      console.log('✅ getCurrentUser: Usuario obtenido exitosamente:', user);
      return user;
    } catch (error) {
      console.error('❌ getCurrentUser: Error al obtener usuario:', error);
      throw error;
    }
  }

  async getUserStats(userId: number): Promise<UserStats> {
    return this.request<UserStats>(`/usuarios/${userId}/estadisticas`);
  }

  async getUserCourses(): Promise<Course[]> {
    return this.request<Course[]>('/usuarios/me/cursos');
  }

  async getUserAchievements(userId: number): Promise<Achievement[]> {
    return this.request<Achievement[]>(`/usuarios/${userId}/logros`);
  }

  // Áreas Matemáticas
  async getMathAreas(): Promise<MathArea[]> {
    return this.request<MathArea[]>('/areas-matematicas');
  }

  // Cursos
  async getCourses(areaId?: number, nivel?: string, skip = 0, limit = 10): Promise<Course[]> {
    const params = new URLSearchParams();
    if (areaId) params.append('area_matematica_id', areaId.toString());
    if (nivel) params.append('nivel_dificultad', nivel);
    params.append('skip', skip.toString());
    params.append('limit', limit.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<Course[]>(`/cursos${query}`);
  }

  async getCourse(courseId: number): Promise<Course> {
    return this.request<Course>(`/cursos/${courseId}`);
  }

  async enrollInCourse(courseId: number): Promise<EnrollmentResponse> {
    return this.request<EnrollmentResponse>(`/cursos/${courseId}/inscribirse`, {
      method: 'POST',
    });
  }

  // Lecciones
  async getCourseLessons(courseId: number): Promise<Lesson[]> {
    return this.request<Lesson[]>(`/cursos/${courseId}/lecciones`);
  }

  async startLesson(lessonId: number): Promise<LessonResponse> {
    return this.request<LessonResponse>(`/lecciones/${lessonId}/iniciar`, {
      method: 'POST',
    });
  }

  async completeLesson(lessonId: number): Promise<LessonResponse> {
    return this.request<LessonResponse>(`/lecciones/${lessonId}/completar`, {
      method: 'POST',
    });
  }

  // Ejercicios
  async getLessonExercises(lessonId: number): Promise<Exercise[]> {
    return this.request<Exercise[]>(`/lecciones/${lessonId}/ejercicios`);
  }

  async submitExerciseAnswer(exerciseId: number, answer: string): Promise<ExerciseResponse> {
    return this.request<ExerciseResponse>(`/ejercicios/${exerciseId}/responder`, {
      method: 'POST',
      body: JSON.stringify({ 
        ejercicio_id: exerciseId,
        respuesta_usuario: answer 
      }),
    });
  }

  // Progreso
  async getUserProgress(courseId: number): Promise<UserProgress> {
    return this.request<UserProgress>(`/usuarios/me/progreso/${courseId}`);
  }

  // ========== NUEVOS ENDPOINTS - PROFESOR-ESTUDIANTE ==========

  // Profesores - Asignación de cursos
  async asignarCurso(data: AssignmentRequest): Promise<{ message: string }> {
    return this.request<{ message: string }>('/profesores/asignar-curso', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMisEstudiantes(): Promise<User[]> {
    console.log('👨‍🏫 getMisEstudiantes: Obteniendo estudiantes del profesor...');
    console.log('🔑 Token disponible:', this.token ? '✅ Sí' : '❌ No');
    
    try {
      const estudiantes = await this.request<User[]>('/profesores/me/estudiantes');
      console.log('✅ getMisEstudiantes: Estudiantes obtenidos:', estudiantes);
      return estudiantes;
    } catch (error) {
      console.error('❌ getMisEstudiantes: Error al obtener estudiantes:', error);
      
      // Si el error es de autenticación, proporcionar información adicional
      if (error instanceof Error && error.message.includes('Not authenticated')) {
        console.error('🔐 Error de autenticación detectado en getMisEstudiantes');
        console.error('🔑 Token actual:', this.token ? 'Presente' : 'Ausente');
        if (typeof window !== 'undefined') {
          console.error('💾 Token en localStorage:', localStorage.getItem('token') ? 'Presente' : 'Ausente');
        }
        
        // Intentar debug de autenticación
        await this.debugAuth();
      }
      
      throw error;
    }
  }

  async getMisAsignaciones(): Promise<Assignment[]> {
    console.log('📋 getMisAsignaciones: Obteniendo asignaciones del profesor...');
    console.log('🔑 Token disponible:', this.token ? '✅ Sí' : '❌ No');
    
    try {
      const asignaciones = await this.request<Assignment[]>('/profesores/me/asignaciones');
      console.log('✅ getMisAsignaciones: Asignaciones obtenidas:', asignaciones);
      return asignaciones;
    } catch (error) {
      console.error('❌ getMisAsignaciones: Error al obtener asignaciones:', error);
      
      // Si el error es de autenticación, proporcionar información adicional
      if (error instanceof Error && error.message.includes('Not authenticated')) {
        console.error('🔐 Error de autenticación detectado en getMisAsignaciones');
        console.error('🔑 Token actual:', this.token ? 'Presente' : 'Ausente');
        console.error('💾 Token en localStorage:', localStorage.getItem('token') ? 'Presente' : 'Ausente');
      }
      
      throw error;
    }
  }

  async removerAsignacion(asignacionId: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/profesores/asignar-curso/${asignacionId}`, {
      method: 'DELETE',
    });
  }

  // Estudiantes - Cursos asignados
  async getCursosAsignados(): Promise<Assignment[]> {
    return this.request<Assignment[]>('/estudiantes/me/cursos-asignados');
  }

  async iniciarCursoAsignado(asignacionId: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/estudiantes/iniciar-curso-asignado/${asignacionId}`, {
      method: 'POST',
    });
  }

  async getMiProfesor(): Promise<User> {
    return this.request<User>('/estudiantes/me/profesor');
  }

  // Admin - Gestión profesor-estudiante
  async asignarEstudianteProfesor(data: StudentTeacherAssignment): Promise<{ message: string }> {
    return this.request<{ message: string }>('/admin/asignar-estudiante-profesor', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Método de debug para verificar conectividad y autenticación
  async debugConnection(): Promise<{ status: string; token: boolean; user?: User }> {
    try {
      console.log('🔍 VERIFICANDO CONEXIÓN Y AUTENTICACIÓN');
      console.log(`🔑 Token en memoria: ${this.token ? '✅ Presente' : '❌ Ausente'}`);
      
      // Verificar conectividad básica
      const statusResponse = await fetch(`${this.baseURL}/status`);
      console.log(`📡 Status del servidor: ${statusResponse.status}`);
      
      if (!this.token) {
        return { status: 'no_token', token: false };
      }
      
      // Verificar autenticación
      const user = await this.getCurrentUser();
      console.log(`👤 Usuario autenticado: ${user.nombre} ${user.apellido} (${user.tipo_usuario})`);
      
      return { status: 'authenticated', token: true, user };
    } catch (error) {
      console.error('❌ Error en debug de conexión:', error);
      return { status: 'error', token: !!this.token };
    }
  }

  // Admin - CRUD de usuarios
  async adminGetUsuarios(tipo_usuario?: string, activo?: boolean, skip: number = 0, limit: number = 50): Promise<User[]> {
    const params = new URLSearchParams();
    if (tipo_usuario) params.append('tipo_usuario', tipo_usuario);
    if (activo !== undefined) params.append('activo', activo.toString());
    params.append('skip', skip.toString());
    params.append('limit', limit.toString());
    
    return this.request<User[]>(`/admin/usuarios?${params.toString()}`);
  }

  async adminCreateUsuario(userData: RegisterData): Promise<User> {
    return this.request<User>('/admin/usuarios', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async adminUpdateUsuario(userId: number, updateData: Partial<User>): Promise<User> {
    return this.request<User>(`/admin/usuarios/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async adminDeleteUsuario(userId: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/admin/usuarios/${userId}`, {
      method: 'DELETE',
    });
  }

  // Estudiante - Nuevos endpoints
  async getLeccionDetalle(leccionId: number): Promise<LeccionDetalle> {
    return this.request<LeccionDetalle>(`/estudiantes/me/lecciones/${leccionId}/detalle`);
  }

  async getLeccionEjercicios(leccionId: number): Promise<Ejercicio[]> {
    return this.request<Ejercicio[]>(`/estudiantes/me/lecciones/${leccionId}/ejercicios`);
  }

  async intentarEjercicio(ejercicioId: number, respuesta: string): Promise<RespuestaEjercicio> {
    return this.request<RespuestaEjercicio>(`/estudiantes/me/ejercicios/${ejercicioId}/intentar`, {
      method: 'POST',
      body: JSON.stringify({
        ejercicio_id: ejercicioId,
        respuesta_usuario: respuesta
      }),
    });
  }

  async getActividadReciente(limit: number = 5): Promise<ActividadReciente> {
    return this.request<ActividadReciente>(`/estudiantes/me/actividad-reciente?limit=${limit}`);
  }

  // Profesor - Nuevos endpoints
  async getProfesorEstadisticas(): Promise<ProfesorEstadisticas> {
    return this.request<ProfesorEstadisticas>('/profesores/me/estadisticas');
  }

  async getCursoEstudiantesProgreso(cursoId: number): Promise<CursoEstudiantesProgreso> {
    return this.request<CursoEstudiantesProgreso>(`/profesores/curso/${cursoId}/estudiantes-progreso`);
  }

  async updateAsignacion(asignacionId: number, updateData: { fecha_limite?: string; observaciones?: string }): Promise<AsignacionUpdate> {
    return this.request<AsignacionUpdate>(`/profesores/asignacion/${asignacionId}/actualizar`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  // Búsqueda
  async buscarCursos(query: string, areaId?: number, nivel?: string): Promise<Course[]> {
    const params = new URLSearchParams();
    params.append('q', query);
    if (areaId) params.append('area_id', areaId.toString());
    if (nivel) params.append('nivel', nivel);
    
    return this.request<Course[]>(`/buscar/cursos?${params.toString()}`);
  }

  async buscarUsuarios(query: string, tipoUsuario?: string): Promise<User[]> {
    const params = new URLSearchParams();
    params.append('q', query);
    if (tipoUsuario) params.append('tipo_usuario', tipoUsuario);
    
    return this.request<User[]>(`/buscar/usuarios?${params.toString()}`);
  }

  // Test de conexión simplificado
  async testConnection(): Promise<{ status: string; token: boolean; backend: boolean }> {
    try {
      console.log('🔍 Probando conexión al backend...');
      
      // Test básico de conectividad
      const response = await fetch(`${this.baseURL}/areas-matematicas`);
      const backendUp = response.ok;
      
      console.log('🌐 Backend disponible:', backendUp ? '✅' : '❌');
      console.log('🔑 Token disponible:', this.token ? '✅' : '❌');
      
      return { 
        status: backendUp ? 'connected' : 'disconnected', 
        token: !!this.token,
        backend: backendUp
      };
    } catch (error) {
      console.error('❌ Error en test de conexión:', error);
      return { status: 'error', token: !!this.token, backend: false };
    }
  }
}

export const api = new ApiService();

// Credenciales de prueba - Formato exacto de la API
export const TEST_USERS = {
  estudiante: { email: 'juan@estudiante.com', password: 'estudiante123' },
  profesor: { email: 'maria@edumath.com', password: 'profesor123' },
  admin: { email: 'admin@edumath.com', password: 'admin123' },
};
