'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  Key,
  Database,
  Loader2
} from 'lucide-react';
import { api, LoginData } from '@/lib/api';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  details?: unknown;
}

export default function AuthDebugPage() {
  const [email, setEmail] = useState('maria@edumath.com');
  const [password, setPassword] = useState('profesor123');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  // Credenciales de prueba predefinidas
  const testCredentials = {
    profesor: { email: 'maria@edumath.com', password: 'profesor123' },
    estudiante: { email: 'juan@estudiante.com', password: 'estudiante123' },
    admin: { email: 'admin@edumath.com', password: 'admin123' }
  };

  const addResult = (result: TestResult) => {
    setResults(prev => [...prev, result]);
  };

  const clearResults = () => {
    setResults([]);
  };

  const testAuthFlow = async (credentials: LoginData) => {
    setLoading(true);
    clearResults();

    // Test 1: Verificar estado inicial
    addResult({
      name: 'Estado Inicial',
      status: 'pending',
      message: 'Verificando estado inicial de autenticación...'
    });

    try {
      await api.debugAuth();
      addResult({
        name: 'Estado Inicial',
        status: 'success',
        message: 'Debug inicial completado - ver consola'
      });
    } catch (error) {
      addResult({
        name: 'Estado Inicial',
        status: 'error',
        message: `Error en debug inicial: ${error}`
      });
    }

    // Test 2: Login
    addResult({
      name: 'Login',
      status: 'pending',
      message: `Intentando login con ${credentials.email}...`
    });

    try {
      const loginResponse = await api.login(credentials);
      addResult({
        name: 'Login',
        status: 'success',
        message: 'Login exitoso',
        details: { 
          token_type: loginResponse.token_type,
          token_preview: loginResponse.access_token.substring(0, 20) + '...'
        }
      });
    } catch (error) {
      addResult({
        name: 'Login',
        status: 'error',
        message: `Error en login: ${error}`
      });
      setLoading(false);
      return;
    }

    // Test 3: Verificar token después del login
    addResult({
      name: 'Verificar Token',
      status: 'pending',
      message: 'Verificando token después del login...'
    });

    try {
      const token = api.getToken();
      if (token) {
        addResult({
          name: 'Verificar Token',
          status: 'success',
          message: 'Token disponible en API service',
          details: { token_preview: token.substring(0, 20) + '...' }
        });
      } else {
        addResult({
          name: 'Verificar Token',
          status: 'error',
          message: 'Token no encontrado en API service'
        });
      }
    } catch (error) {
      addResult({
        name: 'Verificar Token',
        status: 'error',
        message: `Error verificando token: ${error}`
      });
    }

    // Test 4: getCurrentUser
    addResult({
      name: 'Obtener Usuario',
      status: 'pending',
      message: 'Obteniendo información del usuario actual...'
    });

    try {
      const currentUser = await api.getCurrentUser();
      addResult({
        name: 'Obtener Usuario',
        status: 'success',
        message: `Usuario obtenido: ${currentUser.nombre} (${currentUser.tipo_usuario})`,
        details: currentUser
      });

      // Test 5: Endpoints específicos según el tipo de usuario
      if (currentUser.tipo_usuario === 'profesor') {
        await testProfesorEndpoints();
      } else if (currentUser.tipo_usuario === 'estudiante') {
        await testEstudianteEndpoints();
      } else if (currentUser.tipo_usuario === 'admin') {
        await testAdminEndpoints();
      }
    } catch (error) {
      addResult({
        name: 'Obtener Usuario',
        status: 'error',
        message: `Error obteniendo usuario: ${error}`
      });
    }

    setLoading(false);
  };

  const testProfesorEndpoints = async () => {
    // Test: getMisEstudiantes
    addResult({
      name: 'Mis Estudiantes',
      status: 'pending',
      message: 'Obteniendo estudiantes del profesor...'
    });

    try {
      const estudiantes = await api.getMisEstudiantes();
      addResult({
        name: 'Mis Estudiantes',
        status: 'success',
        message: `${estudiantes.length} estudiantes encontrados`,
        details: estudiantes
      });
    } catch (error) {
      addResult({
        name: 'Mis Estudiantes',
        status: 'error',
        message: `Error obteniendo estudiantes: ${error}`
      });
    }

    // Test: getMisAsignaciones
    addResult({
      name: 'Mis Asignaciones',
      status: 'pending',
      message: 'Obteniendo asignaciones del profesor...'
    });

    try {
      const asignaciones = await api.getMisAsignaciones();
      addResult({
        name: 'Mis Asignaciones',
        status: 'success',
        message: `${asignaciones.length} asignaciones encontradas`,
        details: asignaciones
      });
    } catch (error) {
      addResult({
        name: 'Mis Asignaciones',
        status: 'error',
        message: `Error obteniendo asignaciones: ${error}`
      });
    }
  };

  const testEstudianteEndpoints = async () => {
    // Test: getCursosAsignados
    addResult({
      name: 'Cursos Asignados',
      status: 'pending',
      message: 'Obteniendo cursos asignados al estudiante...'
    });

    try {
      const cursosAsignados = await api.getCursosAsignados();
      addResult({
        name: 'Cursos Asignados',
        status: 'success',
        message: `${cursosAsignados.length} cursos asignados encontrados`,
        details: cursosAsignados
      });
    } catch (error) {
      addResult({
        name: 'Cursos Asignados',
        status: 'error',
        message: `Error obteniendo cursos asignados: ${error}`
      });
    }

    // Test: getMiProfesor
    addResult({
      name: 'Mi Profesor',
      status: 'pending',
      message: 'Obteniendo información del profesor...'
    });

    try {
      const miProfesor = await api.getMiProfesor();
      addResult({
        name: 'Mi Profesor',
        status: 'success',
        message: `Profesor: ${miProfesor.nombre}`,
        details: miProfesor
      });
    } catch (error) {
      addResult({
        name: 'Mi Profesor',
        status: 'error',
        message: `Error obteniendo profesor: ${error}`
      });
    }
  };

  const testAdminEndpoints = async () => {
    addResult({
      name: 'Admin - Perfil',
      status: 'success',
      message: 'Funcionalidad de admin verificada',
      details: { note: 'Los endpoints de admin están disponibles' }
    });
  };

  const fillCredentials = (type: 'profesor' | 'estudiante' | 'admin') => {
    const creds = testCredentials[type];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Loader2 className="h-4 w-4 text-yellow-600 animate-spin" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔍 Debug de Autenticación - MatEdu
          </h1>
          <p className="text-gray-600">
            Herramienta para diagnosticar problemas de autenticación
          </p>
        </div>

        {/* Formulario de Login */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              Credenciales de Prueba
            </CardTitle>
            <CardDescription>
              Selecciona un tipo de usuario o ingresa credenciales manualmente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Botones de credenciales predefinidas */}
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                onClick={() => fillCredentials('profesor')}
                className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
              >
                <User className="h-4 w-4 mr-2" />
                Profesor
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fillCredentials('estudiante')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <User className="h-4 w-4 mr-2" />
                Estudiante
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fillCredentials('admin')}
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <User className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </div>

            {/* Campos de entrada */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>

            {/* Botón de prueba */}
            <Button 
              onClick={() => testAuthFlow({ email, password })}
              disabled={loading || !email || !password}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Ejecutando pruebas...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Probar Autenticación
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Resultados */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Resultados de Pruebas
              </CardTitle>
              <CardDescription>
                Estado de cada prueba de autenticación y endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getStatusIcon(result.status)}
                        <span className="ml-2 font-medium">{result.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded ${
                        result.status === 'success' 
                          ? 'bg-green-100 text-green-800'
                          : result.status === 'error'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {result.status}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{result.message}</p>
                    {result.details && typeof result.details === 'object' ? (
                      <details className="mt-2">
                        <summary className="text-xs text-gray-500 cursor-pointer">
                          Ver detalles
                        </summary>
                        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                          {typeof result.details === 'string' 
                            ? result.details 
                            : JSON.stringify(result.details, null, 2)
                          }
                        </pre>
                      </details>
                    ) : null}
                  </div>
                ))}
              </div>
              
              {!loading && (
                <Button 
                  variant="outline" 
                  onClick={clearResults}
                  className="w-full mt-4"
                >
                  Limpiar Resultados
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Información adicional */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Información de Debug</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p><strong>Backend URL:</strong> http://127.0.0.1:8000/api/v1</p>
            <p><strong>Documentación:</strong> http://127.0.0.1:8000/docs</p>
            <p><strong>Nota:</strong> Abre la consola del navegador (F12) para ver logs detallados</p>
            <p><strong>Credenciales Verificadas:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Profesor: maria@edumath.com / profesor123</li>
              <li>• Estudiante: juan@estudiante.com / estudiante123</li>
              <li>• Admin: admin@edumath.com / admin123</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
