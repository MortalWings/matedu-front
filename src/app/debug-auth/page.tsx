'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export default function DebugAuthPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const runTest = async (testName: string, testFn: () => Promise<unknown>) => {
    setLoading(true);
    setResult(prev => prev + `\n🧪 Ejecutando ${testName}...\n`);
    
    try {
      const result = await testFn();
      setResult(prev => prev + `✅ ${testName} exitoso:\n${JSON.stringify(result, null, 2)}\n\n`);
    } catch (error) {
      setResult(prev => prev + `❌ ${testName} falló:\n${error}\n\n`);
    } finally {
      setLoading(false);
    }
  };

  const runAllTests = async () => {
    setResult('🔍 === INICIANDO DIAGNÓSTICO DE AUTENTICACIÓN ===\n');
    
    // Test 1: Debug básico
    await runTest('Debug básico', async () => {
      await api.debugAuth();
      return 'Debug completado (ver consola)';
    });

    // Test 2: Obtener usuario actual
    await runTest('getCurrentUser', async () => {
      return await api.getCurrentUser();
    });

    // Test 3: Test específico de profesor
    if (user?.tipo_usuario === 'profesor') {
      await runTest('getMisEstudiantes', async () => {
        return await api.getMisEstudiantes();
      });

      await runTest('getMisAsignaciones', async () => {
        return await api.getMisAsignaciones();
      });
    }

    // Test 4: Test específico de estudiante
    if (user?.tipo_usuario === 'estudiante') {
      await runTest('getCursosAsignados', async () => {
        return await api.getCursosAsignados();
      });

      await runTest('getMiProfesor', async () => {
        return await api.getMiProfesor();
      });
    }

    setResult(prev => prev + '\n🔍 === DIAGNÓSTICO COMPLETADO ===\n');
  };

  const clearResults = () => {
    setResult('');
  };

  const testToken = () => {
    setResult('🔑 === INFORMACIÓN DE TOKEN ===\n');
    
    if (typeof window !== 'undefined') {
      const tokenLS = localStorage.getItem('token');
      setResult(prev => prev + `💾 Token en localStorage: ${tokenLS ? '✅ Presente' : '❌ Ausente'}\n`);
      if (tokenLS) {
        setResult(prev => prev + `🔒 Token (primeros 30 chars): ${tokenLS.substring(0, 30)}...\n`);
        setResult(prev => prev + `📏 Longitud del token: ${tokenLS.length} caracteres\n`);
      }
    }
    
    const apiToken = api.getToken();
    setResult(prev => prev + `🔑 Token en API service: ${apiToken ? '✅ Presente' : '❌ Ausente'}\n`);
    if (apiToken) {
      setResult(prev => prev + `🔒 API Token (primeros 30 chars): ${apiToken.substring(0, 30)}...\n`);
      setResult(prev => prev + `📏 Longitud del API token: ${apiToken.length} caracteres\n`);
    }
    
    setResult(prev => prev + `👤 Usuario autenticado: ${isAuthenticated ? '✅ Sí' : '❌ No'}\n`);
    setResult(prev => prev + `👤 Tipo de usuario: ${user?.tipo_usuario || 'No definido'}\n`);
    setResult(prev => prev + '\n🔑 === FIN INFORMACIÓN DE TOKEN ===\n');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>🔍 Diagnóstico de Autenticación</CardTitle>
            <CardDescription>
              Herramienta para diagnosticar problemas de autenticación en MatEdu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={testToken}
                variant="outline"
                disabled={loading}
              >
                🔑 Verificar Token
              </Button>
              
              <Button 
                onClick={runAllTests}
                disabled={loading}
              >
                {loading ? '⏳ Ejecutando...' : '🧪 Ejecutar Todas las Pruebas'}
              </Button>
              
              <Button 
                onClick={clearResults}
                variant="destructive"
                disabled={loading}
              >
                🗑️ Limpiar
              </Button>
            </div>

            {result && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Resultados:</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96 whitespace-pre-wrap">
                  {result}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
