'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  PlayCircle, 
  Star, 
  Calendar,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
  User,
  GraduationCap
} from 'lucide-react';
import { api, Assignment, Achievement } from '@/lib/api';
import { useNotification } from '@/contexts/NotificationContext';

interface StudentModalsProps {
  children: React.ReactNode;
  refreshData: () => void;
}

interface ProfesorInfo {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  tipo_usuario: string;
}

// Modal para ver todos los cursos asignados
export function CursosAsignadosModal({ children, refreshData }: StudentModalsProps) {
  const [open, setOpen] = useState(false);
  const [cursosAsignados, setCursosAsignados] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const fetchCursosAsignados = async () => {
    setLoading(true);
    try {
      const cursos = await api.getCursosAsignados();
      setCursosAsignados(cursos);
    } catch (error) {
      console.error('Error fetching cursos asignados:', error);
      showError('Error al cargar cursos asignados', 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCursosAsignados();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const iniciarCurso = async (asignacionId: number) => {
    try {
      await api.iniciarCursoAsignado(asignacionId);
      showSuccess('Curso iniciado exitosamente', 'Éxito');
      await fetchCursosAsignados(); // Refrescar datos
      refreshData(); // Refrescar dashboard
    } catch (error) {
      console.error('Error al iniciar curso:', error);
      showError('Error al iniciar curso', 'Error');
    }
  };

  const getEstadoBadge = (estado: string) => {
    const badgeProps = {
      asignado: { variant: 'outline' as const, color: 'text-blue-600', text: 'Asignado' },
      en_progreso: { variant: 'default' as const, color: 'text-yellow-600', text: 'En Progreso' },
      completado: { variant: 'default' as const, color: 'text-green-600', text: 'Completado' },
      vencido: { variant: 'destructive' as const, color: 'text-red-600', text: 'Vencido' }
    };

    const props = badgeProps[estado as keyof typeof badgeProps] || badgeProps.asignado;
    return <Badge variant={props.variant} className={props.color}>{props.text}</Badge>;
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {children}
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Mis Cursos Asignados
            </DialogTitle>
            <DialogDescription>
              Cursos asignados por tu profesor. Puedes iniciar o continuar donde lo dejaste.
            </DialogDescription>
          </DialogHeader>
        
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {cursosAsignados.length > 0 ? (
              cursosAsignados.map((asignacion) => (
                <Card key={asignacion.id} className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-blue-900">
                          {asignacion.curso.titulo}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {asignacion.curso.descripcion}
                        </CardDescription>
                      </div>
                      <div className="ml-4">
                        {getEstadoBadge(asignacion.estado)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        Prof. {asignacion.profesor.nombre} {asignacion.profesor.apellido}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 mr-2" />
                        Nivel: {asignacion.curso.nivel_dificultad}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Fecha límite: {new Date(asignacion.fecha_limite).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Target className="h-4 w-4 mr-2" />
                        Progreso: {asignacion.progreso_porcentaje}%
                      </div>
                    </div>

                    {asignacion.observaciones && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-blue-800">
                          <strong>Nota del profesor:</strong> {asignacion.observaciones}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${asignacion.progreso_porcentaje}%` }}
                        ></div>
                      </div>
                      <Button 
                        onClick={() => iniciarCurso(asignacion.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={asignacion.estado === 'completado'}
                      >
                        {asignacion.estado === 'asignado' ? (
                          <>
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Iniciar
                          </>
                        ) : asignacion.estado === 'completado' ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completado
                          </>
                        ) : (
                          <>
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Continuar
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600">No tienes cursos asignados aún.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Tu profesor te asignará cursos pronto.
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

// Modal para ver información del profesor
export function MiProfesorModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [profesor, setProfesor] = useState<ProfesorInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const { showError } = useNotification();

  useEffect(() => {
    if (open) {
      fetchProfesorInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
                  <CardDescription>
                    {profesor.email}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Especialidad</p>
                      <p className="text-sm">Matemáticas</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Nivel</p>
                      <p className="text-sm">Profesor titular</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Nota:</strong> Si tienes dudas sobre los cursos asignados, 
                      puedes contactar a tu profesor durante las horas de clase.
                    </p>
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

// Modal para ver logros y estadísticas
export function MisLogrosModal({ children, userId }: { children: React.ReactNode; userId: number }) {
  const [open, setOpen] = useState(false);
  const [logros, setLogros] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const { showError } = useNotification();

  useEffect(() => {
    if (open) {
      fetchLogros();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
