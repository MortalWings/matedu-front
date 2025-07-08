'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Server, Wifi, Code2 } from 'lucide-react';
import { api } from '@/lib/api';

interface ConnectionStatus {
  isConnected: boolean;
  message: string;
  details?: string;
}

export default function StatusPage() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    message: 'Verificando conexión...',
  });
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      // Intentar obtener las áreas matemáticas como test de conectividad
      await api.getMathAreas();
      setConnectionStatus({
        isConnected: true,
        message: '✅ Conexión exitosa con el servidor',
        details: 'El backend FastAPI está respondiendo correctamente',
      });
    } catch (error) {
      setConnectionStatus({
        isConnected: false,
        message: '❌ No se puede conectar con el servidor',
        details: error instanceof Error ? error.message : 'Error desconocido',
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getStatusIcon = () => {
    if (isChecking) {
      return <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />;
    }
    if (connectionStatus.isConnected) {
      return <CheckCircle className="h-8 w-8 text-green-500" />;
    }
    return <XCircle className="h-8 w-8 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Estado de Conexión - MatEdu
          </h1>
          <p className="text-gray-600">
            Verifica la conectividad con el backend FastAPI
          </p>
        </div>

        {/* Estado de Conexión */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getStatusIcon()}
              Estado del Servidor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Estado:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  connectionStatus.isConnected 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {connectionStatus.isConnected ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">{connectionStatus.message}</p>
                {connectionStatus.details && (
                  <p className="text-xs text-gray-500 whitespace-pre-line">
                    {connectionStatus.details}
                  </p>
                )}
              </div>

              <Button 
                onClick={checkConnection} 
                disabled={isChecking}
                className="w-full"
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Verificar Conexión
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Información del Backend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Server className="h-5 w-5" />
              Información del Backend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">URL del Backend:</span>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  http://127.0.0.1:8000
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Base:</span>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  http://127.0.0.1:8000/api/v1
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Documentación:</span>
                <a 
                  href="http://127.0.0.1:8000/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  http://127.0.0.1:8000/docs
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instrucciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Code2 className="h-5 w-5" />
              Instrucciones de Configuración
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">
                      Si ves errores de conexión:
                    </h4>
                    <ol className="mt-2 text-sm text-yellow-700 space-y-1">
                      <li>1. Asegúrate de que el backend FastAPI esté ejecutándose</li>
                      <li>2. Verifica que esté corriendo en el puerto 8000</li>
                      <li>3. Ejecuta: <code className="bg-yellow-100 px-1 rounded">uvicorn main:app --host 127.0.0.1 --port 8000</code></li>
                      <li>4. Confirma que puedes acceder a <a href="http://127.0.0.1:8000/docs" target="_blank" className="text-blue-600 hover:underline">http://127.0.0.1:8000/docs</a></li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Wifi className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">
                      Para iniciar el frontend:
                    </h4>
                    <ol className="mt-2 text-sm text-blue-700 space-y-1">
                      <li>1. Asegúrate de estar en la carpeta del proyecto</li>
                      <li>2. Ejecuta: <code className="bg-blue-100 px-1 rounded">npm run dev</code></li>
                      <li>3. Abre tu navegador en <code className="bg-blue-100 px-1 rounded">http://localhost:3000</code></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
