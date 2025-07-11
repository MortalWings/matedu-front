'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award, 
  PlayCircle,
  Clock,
  Star,
  Calendar
} from 'lucide-react';
import { api, UserStats } from '@/lib/api';
import { User } from '@/lib/api';
import { CursosAsignadosModal, MiProfesorModal, MisLogrosModal } from '@/components/modals';

interface StudentDashboardProps {
  user: User;
}

// Interfaz simplificada para cursos en el dashboard del estudiante
interface StudentCourse {
  id: number;
  titulo: string;
  descripcion: string;
  nivel_dificultad: string;
  duracion_estimada?: number;
  imagen_portada?: string | null;
  activo?: boolean;
  fecha_creacion?: string;
  area_matematica_id?: number;
  profesor_id?: number;
  progreso_porcentaje?: number;
  fecha_inscripcion?: string;
  fecha_asignacion?: string;
  fecha_limite?: string;
  estado?: string;
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Usar el nuevo endpoint para obtener cursos asignados por el profesor
      const [cursosAsignados, userStats] = await Promise.all([
        api.getCursosAsignados(),
        api.getUserStats(user.id)
      ]);
      
      // Convertir assignments a courses para mantener compatibilidad
      const cursosCompatibles: StudentCourse[] = cursosAsignados.map(assignment => ({
        id: assignment.curso.id,
        titulo: assignment.curso.titulo,
        descripcion: assignment.curso.descripcion,
        nivel_dificultad: assignment.curso.nivel_dificultad,
        // Valores por defecto para propiedades que pueden no estar presentes
        duracion_estimada: 30, // Valor por defecto
        imagen_portada: null,
        activo: true,
        fecha_creacion: assignment.fecha_asignacion,
        area_matematica_id: 1, // Valor por defecto
        profesor_id: assignment.profesor.id,
        // Propiedades adicionales de asignación
        progreso_porcentaje: assignment.progreso_porcentaje,
        fecha_inscripcion: assignment.fecha_asignacion,
        fecha_asignacion: assignment.fecha_asignacion,
        fecha_limite: assignment.fecha_limite,
        estado: assignment.estado
      }));
      
      setCourses(cursosCompatibles);
      setStats(userStats);
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      {/* Header del Estudiante */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          ¡Hola, {user.nombre}! 👋
        </h1>
        <p className="text-blue-700">
          Continúa tu aprendizaje matemático
        </p>
      </div>

      {/* Estadísticas del Estudiante */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Nivel Actual</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{user.nivel_actual}</div>
            <p className="text-xs text-blue-600">
              {stats?.puntos_totales || user.puntos_totales} puntos totales
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Cursos Activos</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{courses.length}</div>
            <p className="text-xs text-blue-600">
              En progreso
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Ejercicios</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{stats?.ejercicios_correctos || 0}</div>
            <p className="text-xs text-blue-600">
              Completados
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Logros</CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{stats?.logros_obtenidos || 0}</div>
            <p className="text-xs text-blue-600">
              Desbloqueados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cursos del Estudiante */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mis Cursos */}
        <Card className="bg-white border-blue-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Mis Cursos
            </CardTitle>
            <CardDescription className="text-blue-700">
              Continúa donde lo dejaste
            </CardDescription>
          </CardHeader>
          <CardContent>
            {courses.length > 0 ? (
              <div className="space-y-4">
                {courses.slice(0, 3).map((course) => (
                  <div key={course.id} className="border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-blue-900">{course.titulo}</h3>
                        <p className="text-sm text-blue-600">{course.descripcion}</p>
                        <div className="flex items-center mt-2 text-xs text-blue-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duracion_estimada}h
                          <Star className="h-3 w-3 ml-3 mr-1" />
                          {course.nivel_dificultad}
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Continuar
                      </Button>
                    </div>
                  </div>
                ))}
                {courses.length > 3 && (
                  <CursosAsignadosModal refreshData={fetchData}>
                    <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
                      Ver todos los cursos ({courses.length})
                    </Button>
                  </CursosAsignadosModal>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <p className="text-blue-700">No tienes cursos asignados</p>
                <CursosAsignadosModal refreshData={fetchData}>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    Ver Cursos Asignados
                  </Button>
                </CursosAsignadosModal>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progreso y Actividad Reciente */}
        <Card className="bg-white border-blue-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Tu Progreso
            </CardTitle>
            <CardDescription className="text-blue-700">
              Actividad reciente y logros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Barra de progreso de nivel */}
              <div>
                <div className="flex justify-between text-sm text-blue-700 mb-2">
                  <span>Nivel {user.nivel_actual}</span>
                  <span>Siguiente nivel</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${((user.puntos_totales % 1000) / 1000) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  {user.puntos_totales % 1000} / 1000 puntos para el siguiente nivel
                </p>
              </div>

              {/* Actividad reciente */}
              <div>
                <h4 className="font-medium text-blue-900 mb-3">Actividad Reciente</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-blue-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Completaste un ejercicio de álgebra
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <Award className="h-4 w-4 mr-2" />
                    Nuevo logro desbloqueado
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Te inscribiste en &quot;Geometría Básica&quot;
                  </div>
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="pt-4 border-t border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3">Acciones Rápidas</h4>
                <div className="grid grid-cols-2 gap-2">
                  <MiProfesorModal>
                    <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                      Mi Profesor
                    </Button>
                  </MiProfesorModal>
                  <MisLogrosModal userId={user.id}>
                    <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                      Mis Logros
                    </Button>
                  </MisLogrosModal>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
