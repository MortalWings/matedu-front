'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Award, 
  Plus,
  Settings,
  BarChart,
  Calendar,
  FileText,
  Edit
} from 'lucide-react';
import { api, Course, User, ProfesorEstadisticas } from '@/lib/api';

interface TeacherDashboardProps {
  user: User;
}

export default function TeacherDashboard({ user }: TeacherDashboardProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentsCount, setStudentsCount] = useState(0);
  const [assignmentsCount, setAssignmentsCount] = useState(0);
  const [teacherStats, setTeacherStats] = useState<ProfesorEstadisticas | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('� TeacherDashboard: Iniciando carga de datos...');
        
        // Debug de autenticación antes de hacer peticiones
        await api.debugAuth();
        
        console.log('📚 Obteniendo datos del profesor...');
        
        // Obtener datos usando los nuevos endpoints
        const [teacherCourses, misEstudiantes, misAsignaciones, estadisticas] = await Promise.all([
          api.getCourses(), // Profesores pueden ver todos los cursos
          api.getMisEstudiantes(),
          api.getMisAsignaciones(),
          api.getProfesorEstadisticas() // Nuevas estadísticas del profesor
        ]);
        
        setCourses(teacherCourses.slice(0, 5)); 
        setStudentsCount(misEstudiantes.length);
        setAssignmentsCount(misAsignaciones.length);
        setTeacherStats(estadisticas);
        
        console.log('✅ Datos del profesor cargados exitosamente');
        console.log('📚 Cursos:', teacherCourses.length);
        console.log('👥 Estudiantes:', misEstudiantes.length);
        console.log('📋 Asignaciones:', misAsignaciones.length);
        console.log('📊 Estadísticas:', estadisticas);
      } catch (error) {
        console.error('❌ Error fetching teacher data:', error);
        
        // Si hay error de autenticación, hacer debug adicional
        if (error instanceof Error && error.message.includes('Not authenticated')) {
          console.error('🔐 Error de autenticación detectado en TeacherDashboard');
          await api.debugAuth();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-100 min-h-screen">
      {/* Header del Profesor */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-900 mb-2">
          Bienvenido, Prof. {user.nombre} 🎓
        </h1>
        <p className="text-yellow-700">
          Panel de control para gestionar tus cursos y estudiantes
        </p>
      </div>

      {/* Estadísticas del Profesor */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white border-yellow-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">Cursos Creados</CardTitle>
            <BookOpen className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">{teacherStats?.cursos_creados || courses.length}</div>
            <p className="text-xs text-yellow-600">
              Total creados
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-yellow-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">{teacherStats?.estudiantes_asignados || studentsCount}</div>
            <p className="text-xs text-yellow-600">
              Total asignados
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-yellow-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">Calificaciones</CardTitle>
            <BarChart className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">8.7</div>
            <p className="text-xs text-yellow-600">
              Promedio general
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-yellow-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">Asignaciones</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">{assignmentsCount}</div>
            <p className="text-xs text-yellow-600">
              Cursos asignados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Panel de gestión */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mis Cursos */}
        <Card className="bg-white border-yellow-200 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-yellow-900 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Mis Cursos
                </CardTitle>
                <CardDescription className="text-yellow-700">
                  Gestiona tus cursos activos
                </CardDescription>
              </div>
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                <Plus className="h-4 w-4 mr-1" />
                Nuevo Curso
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {courses.length > 0 ? (
              <div className="space-y-4">
                {courses.slice(0, 3).map((course) => (
                  <div key={course.id} className="border border-yellow-200 rounded-lg p-4 hover:bg-yellow-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-yellow-900">{course.titulo}</h3>
                        <p className="text-sm text-yellow-600">{course.descripcion}</p>
                        <div className="flex items-center mt-2 text-xs text-yellow-500">
                          <Users className="h-3 w-3 mr-1" />
                          15 estudiantes
                          <Calendar className="h-3 w-3 ml-3 mr-1" />
                          {course.duracion_estimada}h
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                          <BarChart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {courses.length > 3 && (
                  <Button variant="outline" className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                    Ver todos los cursos ({courses.length})
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <p className="text-yellow-700">No tienes cursos creados</p>
                <Button className="mt-4 bg-yellow-600 hover:bg-yellow-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear tu primer curso
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Panel de Actividad y Herramientas */}
        <Card className="bg-white border-yellow-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Panel de Control
            </CardTitle>
            <CardDescription className="text-yellow-700">
              Herramientas de gestión y estadísticas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Herramientas rápidas */}
              <div>
                <h4 className="font-medium text-yellow-900 mb-3">Herramientas Rápidas</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-auto py-3">
                    <div className="flex flex-col items-center">
                      <Plus className="h-5 w-5 mb-1" />
                      <span className="text-xs">Crear Ejercicio</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-auto py-3">
                    <div className="flex flex-col items-center">
                      <FileText className="h-5 w-5 mb-1" />
                      <span className="text-xs">Evaluaciones</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-auto py-3">
                    <div className="flex flex-col items-center">
                      <BarChart className="h-5 w-5 mb-1" />
                      <span className="text-xs">Estadísticas</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-auto py-3">
                    <div className="flex flex-col items-center">
                      <Users className="h-5 w-5 mb-1" />
                      <span className="text-xs">Estudiantes</span>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Actividad reciente */}
              <div>
                <h4 className="font-medium text-yellow-900 mb-3">Actividad Reciente</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>3 nuevas evaluaciones por revisar</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                    <Users className="h-4 w-4 mr-2" />
                    <span>2 estudiantes nuevos en Álgebra I</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                    <Award className="h-4 w-4 mr-2" />
                    <span>Tu curso tiene 4.8/5 estrellas</span>
                  </div>
                </div>
              </div>

              {/* Configuración */}
              <div className="pt-4 border-t border-yellow-200">
                <Button variant="outline" className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración del Profesor
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
