'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  Settings, 
  TrendingUp, 
  Shield, 
  Database,
  UserCheck,
  Activity,
  AlertTriangle,
  Eye,
  Plus,
  BarChart3
} from 'lucide-react';
import { api, Course, User } from '@/lib/api';

interface AdminDashboardProps {
  user: User;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos del sistema
        const [allCourses] = await Promise.all([
          api.getCourses()
        ]);
        setCourses(allCourses);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-100 min-h-screen">
      {/* Header del Administrador */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Panel de Administración 🛡️
        </h1>
        <p className="text-gray-700">
          Gestión completa del sistema MatEdu - {user.nombre}
        </p>
      </div>

      {/* Estadísticas del Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">1,247</div>
            <p className="text-xs text-gray-600">
              +23 este mes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Cursos Activos</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{courses.length}</div>
            <p className="text-xs text-gray-600">
              En la plataforma
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Profesores</CardTitle>
            <UserCheck className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">89</div>
            <p className="text-xs text-gray-600">
              Activos
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Sistema</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <p className="text-xs text-gray-600">
              Tiempo activo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Panel de gestión principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gestión de Usuarios */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Gestión de Usuarios
            </CardTitle>
            <CardDescription className="text-gray-700">
              Administrar usuarios del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-lg font-bold text-gray-800">892</div>
                  <div className="text-xs text-gray-600">Estudiantes</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-lg font-bold text-gray-800">89</div>
                  <div className="text-xs text-gray-600">Profesores</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-lg font-bold text-gray-800">5</div>
                  <div className="text-xs text-gray-600">Admins</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Usuario
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Todos los Usuarios
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Usuarios Pendientes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gestión de Contenido */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Gestión de Contenido
            </CardTitle>
            <CardDescription className="text-gray-700">
              Cursos, ejercicios y materiales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-lg font-bold text-gray-800">{courses.length}</div>
                  <div className="text-xs text-gray-600">Cursos</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-lg font-bold text-gray-800">456</div>
                  <div className="text-xs text-gray-600">Ejercicios</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Curso
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Eye className="h-4 w-4 mr-2" />
                  Revisar Contenido
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Estadísticas de Uso
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sistema y Configuración */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Sistema
            </CardTitle>
            <CardDescription className="text-gray-700">
              Configuración y monitoreo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Estado del sistema */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Estado del Sistema</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">API Status</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Base de Datos</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Conectada
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Carga del Servidor</span>
                    <span className="text-gray-600">12%</span>
                  </div>
                </div>
              </div>

              {/* Herramientas de admin */}
              <div className="space-y-2">
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración General
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Database className="h-4 w-4 mr-2" />
                  Gestión de BD
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Reportes del Sistema
                </Button>
              </div>

              {/* Alertas */}
              <div className="pt-3 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Alertas</h4>
                <div className="flex items-center text-sm text-amber-600 bg-amber-50 p-2 rounded">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>2 usuarios reportados</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel de estadísticas adicionales */}
      <div className="mt-8">
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Resumen Ejecutivo
            </CardTitle>
            <CardDescription className="text-gray-700">
              Métricas clave del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">94.5%</div>
                <div className="text-sm text-gray-600">Satisfacción de Usuario</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">2.4M</div>
                <div className="text-sm text-gray-600">Ejercicios Completados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">68min</div>
                <div className="text-sm text-gray-600">Tiempo Promedio de Sesión</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">15%</div>
                <div className="text-sm text-gray-600">Crecimiento Mensual</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
