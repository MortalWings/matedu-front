// Configuración para suprimir advertencias de hidratación específicas
// Esto es especialmente útil para manejar extensiones del navegador que
// modifican el DOM después de que React ha terminado de renderizar

declare global {
  namespace JSX {
    interface IntrinsicElements {
      html: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement> & {
        suppressHydrationWarning?: boolean;
      };
      body: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement> & {
        suppressHydrationWarning?: boolean;
      };
    }
  }
}

export {};
