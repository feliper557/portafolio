/**
 * Prerenderizado estático. Genera un HTML por ruta dentro de dist/, con su propio
 * título, descripción y canonical, y con el contenido ya pintado.
 *
 * El problema que resuelve: una aplicación de React entrega un HTML vacío, así que
 * los rastreadores y —sobre todo— los previsualizadores de enlaces de LinkedIn y
 * WhatsApp, que no ejecutan JavaScript, no ven absolutamente nada.
 *
 * El cliente sigue montando con createRoot, no hidrata: el modo claro/oscuro se
 * resuelve desde localStorage y no puede conocerse aquí, así que intentar hidratar
 * solo produciría discrepancias. React reemplaza este marcado al montar; su valor
 * es para quien nunca ejecuta el JavaScript.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
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
import { JSON_LD_PERSONA, RUTAS_META, URL_BASE } from '../src/data/seo';

const DIST = 'dist';
const plantilla = readFileSync(join(DIST, 'index.html'), 'utf8');
const tema = crearTema('light');

function escapar(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function render(ruta: string): { cuerpo: string; estilos: string } {
  const cache = createCache({ key: 'css' });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const cuerpo = renderToString(
    <CacheProvider value={cache}>
      <ColorModeContext value={{ modo: 'light', alternar: () => {} }}>
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
      </ColorModeContext>
    </CacheProvider>,
  );

  return {
    cuerpo,
    estilos: constructStyleTagsFromChunks(extractCriticalToChunks(cuerpo)),
  };
}

let generadas = 0;

for (const meta of RUTAS_META) {
  const { cuerpo, estilos } = render(meta.ruta);
  const url = `${URL_BASE}${meta.ruta}`;

  const cabecera = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:url" content="${url}" />`,
    estilos,
    // La portada es la que se busca por nombre, así que solo ella lleva los datos
    // estructurados de persona.
    meta.ruta === '/'
      ? `<script type="application/ld+json">${JSON.stringify(JSON_LD_PERSONA)}</script>`
      : '',
  ].join('\n    ');

  const html = plantilla
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapar(meta.titulo)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
      `$1${escapar(meta.descripcion)}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[\s\S]*?(")/,
      `$1${escapar(meta.titulo)}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/,
      `$1${escapar(meta.descripcion)}$2`,
    )
    .replace('</head>', `  ${cabecera}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${cuerpo}</div>`);

  // La portada ya es dist/index.html; el resto va a <ruta>/index.html para que
  // Azure Static Web Apps lo sirva sin depender del fallback.
  const destino = meta.ruta === '/' ? join(DIST, 'index.html') : join(DIST, meta.ruta, 'index.html');
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, html, 'utf8');
  generadas++;
}

const hoy = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${RUTAS_META.map(
  (m) => `  <url>
    <loc>${URL_BASE}${m.ruta}</loc>
    <lastmod>${hoy}</lastmod>
    <priority>${m.prioridad}</priority>
  </url>`,
).join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8');

writeFileSync(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${URL_BASE}/sitemap.xml\n`,
  'utf8',
);

console.log(`${generadas} páginas prerenderizadas, sitemap.xml y robots.txt generados.`);
