'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  GraduationCap,
  AlertCircle
} from 'lucide-react';
import { api } from '@/lib/api';
import { useNotification } from '@/contexts/NotificationContext';

interface ProfesorInfo {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  tipo_usuario: string;
}

interface MiProfesorModalProps {
  children: React.ReactNode;
}

export function MiProfesorModal({ children }: MiProfesorModalProps) {
  const [open, setOpen] = useState(false);
  const [profesor, setProfesor] = useState<ProfesorInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const { showError } = useNotification();

  const fetchProfesorInfo = async () => {
    setLoading(true);
    try {
      const profesorInfo = await api.getMiProfesor();
      setProfesor(profesorInfo);
    } catch (error) {
      console.error('Error fetching profesor info:', error);
      showError('Error al cargar información del profesor', 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchProfesorInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {children}
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl" onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Mi Profesor
            </DialogTitle>
            <DialogDescription>
              Información sobre tu profesor asignado.
            </DialogDescription>
          </DialogHeader>
        
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : profesor ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Prof. {profesor.nombre} {profesor.apellido}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Email</p>
                        <p className="text-sm">{profesor.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Especialidad</p>
                        <p className="text-sm">Matemáticas</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Nivel</p>
                        <p className="text-sm">Profesor titular</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Estado</p>
                        <p className="text-sm text-green-600">Activo</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Nota:</strong> Si tienes dudas sobre los cursos asignados, 
                        puedes contactar a tu profesor durante las horas de clase.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No se encontró información del profesor.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
