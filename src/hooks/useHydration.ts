'use client';

import { useEffect, useState } from 'react';

/**
 * Hook para manejar la hidratación del cliente
 * Devuelve false durante el SSR/hidratación inicial y true después
 */
export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};

/**
 * Hook para manejar el montaje del componente
 * Similar a useHydration pero con un nombre más descriptivo
 */
export const useClientMount = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};
