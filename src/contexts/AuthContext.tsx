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
      const token = localStorage.getItem('token');
      if (token) {
        api.setToken(token);
        const currentUser = await api.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('token');
      api.removeToken();
    } finally {
      setLoading(false);
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
      await api.login(credentials);
      console.log('✅ AuthContext: Login exitoso, obteniendo usuario...');
      
      const currentUser = await api.getCurrentUser();
      console.log('✅ AuthContext: Usuario obtenido:', currentUser);
      
      setUser(currentUser);
      console.log('✅ AuthContext: Usuario establecido en contexto');
    } catch (error) {
      console.error('❌ AuthContext: Error en login:', error);
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
    api.removeToken();
    setUser(null);
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
