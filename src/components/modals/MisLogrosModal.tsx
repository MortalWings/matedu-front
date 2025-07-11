'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import { api, Achievement } from '@/lib/api';
import { useNotification } from '@/contexts/NotificationContext';

interface MisLogrosModalProps {
  children: React.ReactNode;
  userId: number;
}

export function MisLogrosModal({ children, userId }: MisLogrosModalProps) {
  const [open, setOpen] = useState(false);
  const [logros, setLogros] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const { showError } = useNotification();

  const fetchLogros = async () => {
    setLoading(true);
    try {
      const userLogros = await api.getUserAchievements(userId);
      setLogros(userLogros);
    } catch (error) {
      console.error('Error fetching logros:', error);
      showError('Error al cargar logros', 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchLogros();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {children}
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Mis Logros
            </DialogTitle>
            <DialogDescription>
              Todos los logros que has desbloqueado en tu aprendizaje.
            </DialogDescription>
          </DialogHeader>
        
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {logros.length > 0 ? (
                logros.map((logro) => (
                  <Card key={logro.id} className="border-yellow-200">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                          <Award className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-yellow-900">{logro.nombre}</h3>
                          <p className="text-sm text-gray-600">{logro.descripcion}</p>
                          <div className="flex items-center mt-2">
                            <Badge variant="outline" className="text-yellow-600">
                              {logro.puntos} puntos
                            </Badge>
                            <span className="text-xs text-gray-500 ml-2">
                              {new Date(logro.fecha_obtencion).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aún no has desbloqueado logros.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Completa ejercicios y lecciones para ganar logros.
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
