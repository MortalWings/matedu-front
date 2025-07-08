/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para desarrollo
  reactStrictMode: true,
  // Evitar advertencias de hidratación para extensiones del navegador
  experimental: {
    // Configuraciones experimentales aquí si las necesitas
  },
  // Configuración para evitar problemas con extensiones del navegador
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configuración personalizada para suprimir advertencias específicas
  transpilePackages: [],
};

module.exports = nextConfig;
