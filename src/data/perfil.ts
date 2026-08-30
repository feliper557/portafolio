/**
 * Datos personales y comerciales. Único archivo que hay que tocar para actualizar
 * contacto, titular o servicios ofrecidos.
 */

export const PERFIL = {
  nombre: 'Felipe Rodríguez',
  titular: 'Desarrollador Full Stack .NET + React',
  /** Una línea. Lo primero que lee un cliente. */
  propuesta:
    'Ocho años sosteniendo y modernizando el ecosistema completo de un ERP contable en producción: desde servicios heredados hasta APIs en .NET 10 con Clean Architecture, incluidas integraciones fiscales donde un error de esquema deja a miles de empresas sin poder facturar.',
  aniosExperiencia: '8',
  /** Credencial profesional. Se muestra junto a la disponibilidad en la portada. */
  credencial: 'Ingeniero de Sistemas · Tarjeta profesional vigente',
  ubicacion: 'Bogotá, Colombia',
  disponibilidad: 'Disponible para proyectos freelance · Remoto',
  email: 'feliper421@gmail.com',
  linkedin: 'https://www.linkedin.com/in/felipe-rodriguez-03111927b',
  github: 'feliper557',
  cv: '/cv-felipe-rodriguez.pdf',
  /** Misma hoja de vida en web. Sirve de respaldo si el PDF aún no está publicado. */
  cvWeb: '/cv-felipe-rodriguez.html',
} as const;

export interface Servicio {
  readonly titulo: string;
  readonly descripcion: string;
  readonly entregables: readonly string[];
}

export const SERVICIOS: readonly Servicio[] = [
  {
    titulo: 'APIs y backends que aguantan producción',
    descripcion:
      'Servicios en .NET diseñados para crecer sin reescribirse: arquitectura por capas, reglas de negocio aisladas y pruebas automáticas que evitan que arreglar una cosa rompa otra.',
    entregables: [
      'API documentada con Swagger y contratos estables',
      'Pruebas unitarias y de integración contra base de datos real',
      'Despliegue en contenedor con configuración por entorno',
    ],
  },
  {
    titulo: 'Aplicaciones web a la medida',
    descripcion:
      'Aplicaciones en React con TypeScript, pensadas primero para el celular. Desde el panel administrativo interno hasta el producto que usa el cliente final.',
    entregables: [
      'Interfaz responsive y accesible',
      'Código tipado, sin sorpresas en producción',
      'Instalable como PWA si el caso lo pide',
    ],
  },
  {
    titulo: 'Integraciones que conectan lo que ya tienes',
    descripcion:
      'Pasarelas de pago, WhatsApp, correo, telefonía, calendarios y agentes de IA. La parte donde casi todos los proyectos se atascan: webhooks que se repiten, pagos que quedan a medias, mensajes duplicados.',
    entregables: [
      'Webhooks firmados e idempotentes',
      'Reintentos y registro de eventos para auditoría',
      'Modo degradado cuando el tercero se cae',
    ],
  },
  {
    titulo: 'Rescate y modernización de sistemas heredados',
    descripcion:
      'Sistemas antiguos que siguen sosteniendo la operación y que nadie quiere tocar. Los mantengo funcionando y los modernizo por partes, sin detener el negocio.',
    entregables: [
      'Diagnóstico del estado real y riesgos',
      'Migración por módulos, reversible',
      'Documentación de lo que antes solo estaba en la cabeza de alguien',
    ],
  },
];

export interface PasoProceso {
  readonly numero: string;
  readonly titulo: string;
  readonly descripcion: string;
}

export const PROCESO: readonly PasoProceso[] = [
  {
    numero: '01',
    titulo: 'Entender el problema',
    descripcion:
      'Antes de proponer tecnología, entiendo qué duele y cuánto cuesta. Muchas veces el mejor sistema es el más pequeño.',
  },
  {
    numero: '02',
    titulo: 'Acordar alcance y precio',
    descripcion:
      'Propuesta escrita con entregables, plazos y precio cerrado. Sin sorpresas a mitad del proyecto.',
  },
  {
    numero: '03',
    titulo: 'Entregar por partes',
    descripcion:
      'Entregas funcionando cada una o dos semanas, no un big bang al final. Ves avance real y puedes corregir el rumbo a tiempo.',
  },
  {
    numero: '04',
    titulo: 'Dejarlo andando y documentado',
    descripcion:
      'Despliegue automatizado, documentación de arquitectura y acompañamiento posterior. El proyecto no depende de que yo siga ahí.',
  },
];

export interface Modalidad {
  readonly titulo: string;
  readonly descripcion: string;
}

export const MODALIDADES: readonly Modalidad[] = [
  {
    titulo: 'Proyecto cerrado',
    descripcion:
      'Alcance definido y precio fijo. Ideal cuando ya sabes qué necesitas y quieres saber cuánto cuesta desde el primer día.',
  },
  {
    titulo: 'Bolsa de horas',
    descripcion:
      'Horas mensuales para evolución, soporte y mejoras continuas sobre un sistema que ya está en marcha.',
  },
  {
    titulo: 'Refuerzo de equipo',
    descripcion:
      'Me integro a tu equipo por un periodo, con tus herramientas y tu proceso, para sacar adelante una entrega concreta.',
  },
];
