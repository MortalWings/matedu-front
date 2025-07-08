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
  avatar_url: string | null;
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

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    // Solo acceder a localStorage en el cliente
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
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
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
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
    }
  }

  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // Usuario
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/usuarios/me');
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
}

export const api = new ApiService();

// Credenciales de prueba - Formato exacto de la API
export const TEST_USERS = {
  estudiante: { email: 'juan@estudiante.com', password: 'estudiante123' },
  profesor: { email: 'maria@edumath.com', password: 'profesor123' },
  admin: { email: 'admin@edumath.com', password: 'admin123' },
};
