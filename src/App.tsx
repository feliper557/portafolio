import { lazy, Suspense, useEffect, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import Layout from './components/Layout';
import { ColorModeContext, useProveedorColorMode } from './hooks/useColorMode';
import { crearTema } from './theme/theme';

/**
 * Carga diferida por ruta: el navegador solo descarga el código de la página que
 * se está viendo. Quien entra a la portada no paga el peso de las otras cinco.
 */
const Inicio = lazy(() => import('./pages/Inicio'));
const Proyectos = lazy(() => import('./pages/Proyectos'));
const ProyectoDetalle = lazy(() => import('./pages/ProyectoDetalle'));
const Stack = lazy(() => import('./pages/Stack'));
const Trayectoria = lazy(() => import('./pages/Trayectoria'));
const Servicios = lazy(() => import('./pages/Servicios'));
const Contacto = lazy(() => import('./pages/Contacto'));
const NoEncontrada = lazy(() => import('./pages/NoEncontrada'));

/** Al cambiar de página el navegador conserva el scroll; aquí se reinicia. */
function ScrollAlInicio() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const colorMode = useProveedorColorMode();
  const tema = useMemo(() => crearTema(colorMode.modo), [colorMode.modo]);

  return (
    <ColorModeContext value={colorMode}>
      <ThemeProvider theme={tema}>
        <CssBaseline />
        <ScrollAlInicio />
        <Suspense fallback={<LinearProgress aria-label="Cargando página" />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Inicio />} />
              <Route path="proyectos" element={<Proyectos />} />
              <Route path="proyectos/:slug" element={<ProyectoDetalle />} />
              <Route path="stack" element={<Stack />} />
              <Route path="trayectoria" element={<Trayectoria />} />
              <Route path="servicios" element={<Servicios />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="*" element={<NoEncontrada />} />
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext>
  );
}
