import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';
import type { ModoColor } from '../theme/theme';

const CLAVE = 'portafolio:modo-color';

interface ColorModeContextValue {
  readonly modo: ModoColor;
  readonly alternar: () => void;
}

export const ColorModeContext = createContext<ColorModeContextValue | null>(null);

/**
 * Lee la preferencia guardada; si no hay ninguna, respeta la del sistema operativo.
 * El acceso a localStorage va en try/catch porque en modo incógnito puede lanzar.
 */
function modoInicial(): ModoColor {
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (guardado === 'light' || guardado === 'dark') return guardado;
  } catch {
    // Sin almacenamiento disponible: se cae a la preferencia del sistema.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useProveedorColorMode(): ColorModeContextValue {
  const [modo, setModo] = useState<ModoColor>(modoInicial);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, modo);
    } catch {
      // Preferencia no persistida; la sesión actual sigue funcionando igual.
    }
  }, [modo]);

  const alternar = useCallback(() => {
    setModo((actual) => (actual === 'light' ? 'dark' : 'light'));
  }, []);

  return useMemo(() => ({ modo, alternar }), [modo, alternar]);
}

/** Consumo del contexto con error explícito si se usa fuera del proveedor. */
export function useColorMode(): ColorModeContextValue {
  const contexto = use(ColorModeContext);
  if (!contexto) {
    throw new Error('useColorMode debe usarse dentro de <ColorModeContext>');
  }
  return contexto;
}
