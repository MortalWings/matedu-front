'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, BookOpen, Target, TrendingUp, Users, Award, AlertTriangle } from 'lucide-react';

export default function HomePage() {
  const [showPortWarning, setShowPortWarning] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const port = window.location.port;
      // Mostrar warning solo si está en un puerto que NO sea 3000
      setShowPortWarning(port !== '3000' && port !== '');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Aviso del Puerto */}
      {showPortWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
              <div>
                <p className="text-sm text-yellow-700">
                  <strong>Puerto Recomendado:</strong> Para mejor experiencia, usa 
                  <a href="http://localhost:3000" className="ml-2 underline font-medium">
                    http://localhost:3000
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">MatEdu</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/status">
                <Button variant="ghost" size="sm">Estado del Servidor</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button>Registrarse</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Aprende Matemáticas de Forma
            <span className="text-blue-600"> Interactiva</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma educativa diseñada para hacer que las matemáticas sean accesibles, 
            divertidas y efectivas para estudiantes de todos los niveles.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-3">
                Comenzar Gratis
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Explorar Cursos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir MatEdu?
            </h2>
            <p className="text-xl text-gray-600">
              Una plataforma completa para el aprendizaje de matemáticas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Cursos Estructurados</CardTitle>
                <CardDescription>
                  Contenido organizado por áreas: Álgebra, Geometría, Cálculo y Estadística
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Ejercicios Interactivos</CardTitle>
                <CardDescription>
                  Practica con ejercicios adaptativos que se ajustan a tu nivel de conocimiento
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Seguimiento de Progreso</CardTitle>
                <CardDescription>
                  Monitorea tu avance con estadísticas detalladas y métricas de rendimiento
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Para Estudiantes y Profesores</CardTitle>
                <CardDescription>
                  Herramientas tanto para el aprendizaje individual como para la enseñanza en clase
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Sistema de Logros</CardTitle>
                <CardDescription>
                  Gana puntos y desbloquea logros mientras avanzas en tu aprendizaje
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Evaluación Automática</CardTitle>
                <CardDescription>
                  Recibe retroalimentación instantánea con explicaciones detalladas
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Áreas de Estudio */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Áreas de Estudio
            </h2>
            <p className="text-xl text-gray-600">
              Explora nuestras cuatro áreas principales de matemáticas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">x²</span>
                </div>
                <CardTitle>Álgebra</CardTitle>
                <CardDescription>
                  Ecuaciones, funciones, sistemas lineales y polinomios
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">△</span>
                </div>
                <CardTitle>Geometría</CardTitle>
                <CardDescription>
                  Figuras planas, volúmenes, trigonometría y geometría analítica
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">∫</span>
                </div>
                <CardTitle>Cálculo</CardTitle>
                <CardDescription>
                  Límites, derivadas, integrales y ecuaciones diferenciales
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">σ</span>
                </div>
                <CardTitle>Estadística</CardTitle>
                <CardDescription>
                  Probabilidad, distribuciones, inferencia y análisis de datos
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para comenzar tu viaje matemático?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de estudiantes que ya están mejorando sus habilidades matemáticas
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Registrarse Gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Calculator className="h-8 w-8 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold">MatEdu</h3>
              </div>
              <p className="text-gray-400">
                Plataforma educativa para el aprendizaje interactivo de matemáticas.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/courses" className="hover:text-white">Cursos</Link></li>
                <li><Link href="/exercises" className="hover:text-white">Ejercicios</Link></li>
                <li><Link href="/progress" className="hover:text-white">Progreso</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Cuenta</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white">Iniciar Sesión</Link></li>
                <li><Link href="/register" className="hover:text-white">Registrarse</Link></li>
                <li><Link href="/profile" className="hover:text-white">Perfil</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Ayuda</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contacto</Link></li>
                <li><Link href="/about" className="hover:text-white">Acerca de</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MatEdu. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
