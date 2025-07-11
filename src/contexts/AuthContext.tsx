'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, User, LoginData, RegisterData } from '@/lib/api';
import { useHydration } from '@/hooks/useHydration';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isHydrated = useHydration();

  useEffect(() => {
    if (isHydrated) {
      checkAuthStatus();
    }
  }, [isHydrated]);

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 AuthContext: Verificando estado de autenticación...');
      
      // Debug inicial
      api.debugAuth();
      
      const token = localStorage.getItem('token');
      console.log('🔑 Token en localStorage:', token ? '✅ Encontrado' : '❌ No encontrado');
      
      if (token) {
        console.log('🔒 Token (primeros 20 chars):', token.substring(0, 20) + '...');
        api.setToken(token);
        console.log('✅ Token establecido en API service');
        
        const currentUser = await api.getCurrentUser();
        console.log('👤 Usuario obtenido:', currentUser);
        setUser(currentUser);
        console.log('✅ Usuario establecido en contexto');
      } else {
        console.log('❌ No hay token, usuario no autenticado');
      }
    } catch (error) {
      console.error('❌ Error checking auth status:', error);
      console.log('🧹 Limpiando datos de autenticación por error...');
      
      // Usar el nuevo método clearToken
      api.clearToken();
      setUser(null);
      
      // Si es un error de credenciales, mostrar mensaje específico
      if (error instanceof Error && error.message.includes('credenciales')) {
        console.error('🔐 Token expirado o inválido, se requiere nuevo login');
      }
    } finally {
      setLoading(false);
      console.log('✅ Verificación de autenticación completada');
    }
  };

  // Mostrar loading mientras se hidrata
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Cargando MatEdu...</p>
        </div>
      </div>
    );
  }

  const login = async (credentials: LoginData) => {
    try {
      console.log('🔐 AuthContext: Iniciando login...');
      const loginResponse = await api.login(credentials);
      console.log('✅ AuthContext: Login exitoso, respuesta:', loginResponse);
      
      // Verificar que el token esté establecido correctamente
      const currentToken = api.getToken();
      console.log('🔑 Token actual en API service:', currentToken ? '✅ Disponible' : '❌ No disponible');
      
      console.log('👤 AuthContext: Obteniendo usuario actual...');
      const currentUser = await api.getCurrentUser();
      console.log('✅ AuthContext: Usuario obtenido:', currentUser);
      
      setUser(currentUser);
      console.log('✅ AuthContext: Usuario establecido en contexto');
    } catch (error) {
      console.error('❌ AuthContext: Error en login:', error);
      // Limpiar cualquier token parcial en caso de error
      api.removeToken();
      setUser(null);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      await api.register(userData);
      // Después del registro, hacer login automático
      await login({ email: userData.email, password: userData.password });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    console.log('🚪 AuthContext: Cerrando sesión...');
    api.clearToken();
    setUser(null);
    console.log('✅ Sesión cerrada');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
