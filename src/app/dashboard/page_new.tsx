'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import TeacherDashboard from '@/components/dashboards/TeacherDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, router, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Determinar el color del sidebar según el tipo de usuario
  const getSidebarColors = () => {
    switch (user.tipo_usuario) {
      case 'estudiante':
        return {
          bg: 'bg-blue-900',
          text: 'text-blue-100',
          accent: 'text-blue-300',
          hover: 'hover:bg-blue-800'
        };
      case 'profesor':
        return {
          bg: 'bg-yellow-900',
          text: 'text-yellow-100',
          accent: 'text-yellow-300',
          hover: 'hover:bg-yellow-800'
        };
      case 'admin':
        return {
          bg: 'bg-gray-900',
          text: 'text-gray-100',
          accent: 'text-gray-300',
          hover: 'hover:bg-gray-800'
        };
      default:
        return {
          bg: 'bg-blue-900',
          text: 'text-blue-100',
          accent: 'text-blue-300',
          hover: 'hover:bg-blue-800'
        };
    }
  };

  const colors = getSidebarColors();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${colors.bg} shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Calculator className={`h-8 w-8 ${colors.accent} mr-2`} />
              <h1 className={`text-xl font-bold ${colors.text}`}>MatEdu</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className={`h-6 w-6 ${colors.text}`} />
            </button>
          </div>

          {/* Información del usuario */}
          <div className="mb-8 p-4 bg-black bg-opacity-20 rounded-lg">
            <div className={`text-sm ${colors.accent}`}>
              {user.tipo_usuario === 'estudiante' && '🎓 Estudiante'}
              {user.tipo_usuario === 'profesor' && '👨‍🏫 Profesor'}
              {user.tipo_usuario === 'admin' && '🛡️ Administrador'}
            </div>
            <div className={`font-medium ${colors.text}`}>
              {user.nombre} {user.apellido}
            </div>
            <div className={`text-xs ${colors.accent}`}>
              {user.email}
            </div>
          </div>

          {/* Botón de logout */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              onClick={handleLogout}
              variant="outline"
              className={`w-full border-white border-opacity-20 ${colors.text} hover:bg-white hover:bg-opacity-10`}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Botón de menú móvil */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          onClick={() => setSidebarOpen(true)}
          size="sm"
          className="bg-white shadow-lg"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Contenido principal */}
      <div className="lg:ml-64">
        {user.tipo_usuario === 'estudiante' && <StudentDashboard user={user} />}
        {user.tipo_usuario === 'profesor' && <TeacherDashboard user={user} />}
        {user.tipo_usuario === 'admin' && <AdminDashboard user={user} />}
      </div>
    </div>
  );
}
