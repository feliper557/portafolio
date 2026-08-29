/**
 * Prueba de humo: renderiza cada página en el servidor para comprobar que ninguna
 * lanza una excepción. No sustituye una revisión visual, pero atrapa los errores
 * que rompen la página en blanco.
 */
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { crearTema } from '../src/theme/theme';
import { ColorModeContext } from '../src/hooks/useColorMode';
import Layout from '../src/components/Layout';
import Inicio from '../src/pages/Inicio';
import Proyectos from '../src/pages/Proyectos';
import ProyectoDetalle from '../src/pages/ProyectoDetalle';
import Stack from '../src/pages/Stack';
import Trayectoria from '../src/pages/Trayectoria';
import Servicios from '../src/pages/Servicios';
import Contacto from '../src/pages/Contacto';
import NoEncontrada from '../src/pages/NoEncontrada';
import { PROYECTOS } from '../src/data/proyectos';

const RUTAS = [
  '/',
  '/proyectos',
  ...PROYECTOS.map((p) => `/proyectos/${p.slug}`),
  '/stack',
  '/trayectoria',
  '/servicios',
  '/contacto',
  '/ruta-inventada',
];

let fallos = 0;

for (const modo of ['light', 'dark'] as const) {
  const tema = crearTema(modo);
  // El proveedor real lee localStorage y matchMedia; en Node se fija el modo a mano.
  for (const ruta of RUTAS) {
    try {
      const html = renderToString(
        <ColorModeContext value={{ modo, alternar: () => {} }}>
        <ThemeProvider theme={tema}>
          <CssBaseline />
          <MemoryRouter initialEntries={[ruta]}>
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
          </MemoryRouter>
        </ThemeProvider>
        </ColorModeContext>,
      );
      if (html.length < 500) throw new Error(`render sospechosamente corto (${html.length})`);
      console.log(`OK   [${modo}] ${ruta}`);
    } catch (e) {
      fallos++;
      console.log(`FALLA [${modo}] ${ruta}: ${(e as Error).message}`);
    }
  }
}

console.log(fallos === 0 ? `\n${RUTAS.length * 2} renders correctos.` : `\n${fallos} fallos.`);
process.exit(fallos === 0 ? 0 : 1);
