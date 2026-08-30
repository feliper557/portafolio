import { PERFIL } from './perfil';
import { PROYECTOS } from './proyectos';

/**
 * Metadatos por ruta. Los consume el prerenderizado del build (scripts/prerender.tsx)
 * para escribir un HTML propio por página: sin esto, las siete páginas comparten
 * título y descripción, y los previsualizadores de enlaces —que no ejecutan
 * JavaScript— ven siempre lo mismo.
 */

/**
 * Origen público del sitio, sin barra final. Único lugar donde vive: el día que
 * haya dominio propio se cambia aquí y se propaga a canonical, og:url y sitemap.
 */
export const URL_BASE = 'https://lemon-sea-045520a0f.7.azurestaticapps.net';

export interface MetaRuta {
  /** Ruta absoluta, tal como la sirve el router. */
  readonly ruta: string;
  readonly titulo: string;
  readonly descripcion: string;
  /** Prioridad en el sitemap: la portada y los casos pesan más que el resto. */
  readonly prioridad: string;
}

const SUFIJO = `${PERFIL.nombre} · ${PERFIL.titular}`;

/** Páginas fijas. Los detalles de proyecto se derivan de PROYECTOS más abajo. */
const PAGINAS: readonly MetaRuta[] = [
  {
    ruta: '/',
    titulo: SUFIJO,
    descripcion:
      'Desarrollador Full Stack .NET y React con ocho años sobre un ERP contable en producción: APIs, integraciones fiscales y modernización de sistemas heredados.',
    prioridad: '1.0',
  },
  {
    ruta: '/proyectos',
    titulo: `Proyectos · ${SUFIJO}`,
    descripcion: `${PROYECTOS.length} sistemas explicados con el problema real, la decisión técnica que los sostiene y el resultado.`,
    prioridad: '0.9',
  },
  {
    ruta: '/stack',
    titulo: `Stack y conocimientos · ${SUFIJO}`,
    descripcion:
      'Tecnologías con proyecto detrás: .NET, React, PostgreSQL, Azure, RabbitMQ, firma digital y modernización de legado. Si no tiene proyecto, no aparece.',
    prioridad: '0.8',
  },
  {
    ruta: '/trayectoria',
    titulo: `Trayectoria y formación · ${SUFIJO}`,
    descripcion:
      'Ocho años sobre un ERP contable: dominios regulatorios, modernización de sistemas heredados, metodologías de trabajo y certificaciones verificables.',
    prioridad: '0.8',
  },
  {
    ruta: '/servicios',
    titulo: `Servicios · ${SUFIJO}`,
    descripcion:
      'APIs y backends que aguantan producción, aplicaciones web a la medida, integraciones y rescate de sistemas heredados. Con entregables y precio por escrito.',
    prioridad: '0.7',
  },
  {
    ruta: '/contacto',
    titulo: `Contacto · ${SUFIJO}`,
    descripcion: `Escríbeme con lo que necesitas resolver. ${PERFIL.ubicacion} · trabajo remoto.`,
    prioridad: '0.6',
  },
];

/** Cada caso aporta su propia entrada: título y descripción salen del proyecto. */
const DETALLES: readonly MetaRuta[] = PROYECTOS.map((p) => ({
  ruta: `/proyectos/${p.slug}`,
  titulo: `${p.nombre} · ${PERFIL.nombre}`,
  descripcion: p.resumen,
  prioridad: '0.7',
}));

export const RUTAS_META: readonly MetaRuta[] = [...PAGINAS, ...DETALLES];

/**
 * Datos estructurados de la portada. Es lo que permite que una búsqueda por el
 * nombre muestre cargo, ciudad y perfiles en lugar de un resultado suelto.
 */
export const JSON_LD_PERSONA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERFIL.nombre,
  jobTitle: PERFIL.titular,
  email: `mailto:${PERFIL.email}`,
  url: URL_BASE,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bogotá',
    addressCountry: 'CO',
  },
  sameAs: [PERFIL.linkedin, `https://github.com/${PERFIL.github}`],
} as const;
