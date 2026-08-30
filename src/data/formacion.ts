/**
 * Formación académica, forma de trabajo y certificaciones.
 *
 * Las certificaciones enlazan al diploma público del emisor: cualquiera puede
 * verificarlas sin pedir nada. Lo que no se puede verificar no se declara.
 */

export interface TituloAcademico {
  readonly titulo: string;
  readonly institucion: string;
  readonly anio: string;
  /** Qué acredita, en una frase. */
  readonly detalle: string;
}

export const FORMACION_ACADEMICA: readonly TituloAcademico[] = [
  {
    titulo: 'Ingeniero de Sistemas',
    institucion: 'Universidad Nacional Abierta y a Distancia (UNAD)',
    anio: '2025',
    detalle:
      'Título profesional con tarjeta profesional vigente, que habilita el ejercicio de la ingeniería en Colombia.',
  },
];

export interface Experiencia {
  readonly rol: string;
  readonly contexto: string;
  readonly periodo: string;
  readonly descripcion: string;
  /** Lo que se hizo, en logros verificables. */
  readonly logros: readonly string[];
}

/**
 * Experiencia profesional. El empleador va sin nombrar, igual que en los proyectos:
 * lo que demuestra el trabajo es el alcance, no el logotipo.
 */
export const EXPERIENCIA: readonly Experiencia[] = [
  {
    rol: 'Desarrollador Full Stack .NET',
    contexto: 'Casa de software de un ERP contable colombiano y su plataforma SaaS',
    periodo: '2018 – actualidad',
    descripcion:
      'Ocho años construyendo y sosteniendo el ecosistema completo del producto: desde las aplicaciones de escritorio y los servicios heredados que siguen facturando todos los días, hasta las APIs nuevas con arquitectura limpia y la interfaz web moderna que las consume. Un perfil híbrido, porque el sistema real es híbrido.',
    logros: [
      'Ecosistema cubierto de punta a punta: escritorio, servicios, APIs, portal web y aplicaciones móviles instalables',
      'Rango tecnológico de más de quince años de plataforma, del framework heredado a la versión más reciente',
      'Integraciones fiscales y regulatorias donde un error de esquema o de firma bloquea la operación de miles de empresas',
      'Integración del trabajo de un equipo de más de ocho desarrolladores hacia la rama principal, de forma sostenida durante años',
      'Modernización continua de código heredado sin romper a un solo cliente en producción',
      'Diagnóstico de incidencias reales: concurrencia, consultas lentas, límites de carga y fugas de recursos',
    ],
  },
];

export interface DominioNegocio {
  readonly titulo: string;
  readonly descripcion: string;
  /** Por qué es difícil. Es lo que separa este conocimiento del de un framework. */
  readonly alcance: readonly string[];
}

/**
 * Dominios regulatorios. Es la parte menos común del perfil: el conocimiento
 * normativo no se aprende leyendo la documentación de un framework.
 */
export const DOMINIOS: readonly DominioNegocio[] = [
  {
    titulo: 'Facturación electrónica — Colombia',
    descripcion:
      'El ciclo completo ante la autoridad tributaria colombiana, desde el armado del documento hasta el acuse y el reproceso de lo que quedó a medias.',
    alcance: [
      'Estándar XML, identificadores únicos del documento y firma digital con certificado',
      'Documento soporte, documentos equivalentes, notas crédito y débito, exportación y otra moneda',
      'Retenciones, tributos especiales, sector transporte, sector salud y contratos por administración',
    ],
  },
  {
    titulo: 'Factura como título valor',
    descripcion:
      'El registro que convierte una factura electrónica en un título negociable, con todos sus eventos de circulación.',
    alcance: [
      'Los quince tipos de evento: acuse, aceptación expresa y tácita, reclamo y protesto',
      'Aval, mandato y endoso en propiedad, en garantía o en procuración, con su cancelación',
      'Inscripción del documento, informe de pago y pagos parciales',
    ],
  },
  {
    titulo: 'Nómina electrónica',
    descripcion:
      'Reporte del pago de nómina ante la autoridad tributaria, con su propio esquema y su propio ciclo de corrección.',
    alcance: [
      'Documento de nómina individual y su identificador único',
      'Notas de ajuste y de reemplazo cuando el reporte ya enviado cambia',
      'Habilitación de empresas, validación, envío y reproceso',
    ],
  },
  {
    titulo: 'Facturación electrónica — Perú',
    descripcion:
      'La misma necesidad en otro país, con otro esquema, otro protocolo de seguridad y otras reglas.',
    alcance: [
      'Comprobantes, guía de remisión y resumen diario',
      'Consulta del estado del comprobante ante la autoridad',
      'Seguridad de mensajes con credencial resumida, implementada a mano',
    ],
  },
  {
    titulo: 'Sector salud — facturación con soporte clínico',
    descripcion:
      'Radicación de facturas acompañadas del detalle de cada servicio prestado ante la plataforma del Ministerio de Salud.',
    alcance: [
      'Carga de facturas, notas de ajuste, capitación y acuerdos de voluntades',
      'Recuperación del código único que acredita la validación',
      'Gestión de observaciones y rechazos, con paquetes comprimidos de gran tamaño',
    ],
  },
  {
    titulo: 'Debida diligencia y prevención de lavado',
    descripcion:
      'Verificación automatizada de personas y empresas contra listas restrictivas nacionales e internacionales, con evidencia archivada.',
    alcance: [
      'Diez fuentes distintas consultadas de forma programada y desatendida',
      'Generación del soporte documental de cada consulta y su archivo',
      'Reintentos escalonados frente a fuentes que fallan o cambian sin aviso',
    ],
  },
];

export interface Modernizacion {
  readonly origen: string;
  readonly destino: string;
  readonly cambio: string;
}

/** Modernización de sistemas heredados: origen, destino y qué cambió realmente. */
export const MODERNIZACIONES: readonly Modernizacion[] = [
  {
    origen: 'Servicios de facturación electrónica sobre el framework heredado',
    destino: 'API sobre .NET moderno conservando el diálogo SOAP',
    cambio:
      'La autoridad tributaria siguió viendo exactamente el mismo contrato; por dentro llegaron inyección de dependencias, acceso a datos moderno y pruebas.',
  },
  {
    origen: 'Debida diligencia acoplada a la aplicación web, con automatización frágil',
    destino: 'Servicio independiente con un proceso en segundo plano',
    cambio:
      'De una automatización que se rompía cada vez que una fuente cambiaba, a interfaces por fuente con reintentos escalonados y evidencia archivada.',
  },
  {
    origen: 'Intranet sobre framework y modelo de datos de generación anterior',
    destino: 'Aplicación sobre .NET moderno con acceso a datos actual',
    cambio:
      'Modelo generado desde la base existente, un módulo piloto migrado y una tabla de equivalencias documentada para que el resto siguiera detrás.',
  },
  {
    origen: 'Lógica de seguimiento de uso dentro del monolito',
    destino: 'API propia con arquitectura limpia',
    cambio:
      'Reescritura con capas separadas, errores devueltos como valor y cobertura de pruebas real, incluidas las de integración.',
  },
  {
    origen: 'Instalador generado por una herramienta descontinuada',
    destino: 'Asistente de instalación propio con pasos desacoplados',
    cambio:
      'Cada paso de instalación pasó a ser una estrategia independiente, con verificación de prerrequisitos y pruebas unitarias.',
  },
];

/** El criterio que gobierna toda modernización de las anteriores. */
export const CRITERIO_MODERNIZACION =
  'No se rompen los contratos existentes. Se crea el endpoint nuevo, se documenta en qué se comporta distinto, y cada consumidor migra cuando puede. Una migración que obliga a todos a moverse el mismo día no es una migración: es una caída programada.';

export interface Metodologia {
  readonly titulo: string;
  readonly descripcion: string;
  /** Cómo se traduce en el día a día. Es lo que separa declararla de aplicarla. */
  readonly practicas: readonly string[];
}

/**
 * Metodologías realmente aplicadas en el trabajo diario sobre un ERP en producción,
 * no una lista de nombres. Cada una lista la práctica concreta que la sostiene.
 */
export const METODOLOGIAS: readonly Metodologia[] = [
  {
    titulo: 'Scrum y desarrollo iterativo',
    descripcion:
      'Trabajo por sprints sobre Azure DevOps Boards, con backlog priorizado y entregas incrementales. El cliente ve avance funcionando cada pocas semanas, no un único entregable al final.',
    practicas: [
      'Backlog refinado y estimado antes de comprometer el sprint',
      'Tableros y trazabilidad de historia a commit y a despliegue',
      'Retrospectiva que cambia el proceso, no que solo lo comenta',
    ],
  },
  {
    titulo: 'Ramas por funcionalidad y revisión de código',
    descripcion:
      'Cada cambio vive en su propia rama acotada y entra a la rama principal por Pull Request revisado. Durante años he sido responsable de integrar a la rama principal el trabajo de un equipo de más de ocho desarrolladores.',
    practicas: [
      'Una rama por funcionalidad o corrección, trazable de principio a fin',
      'Revisión de código como responsabilidad diaria, no como trámite',
      'La rama principal siempre desplegable: nada entra roto',
    ],
  },
  {
    titulo: 'TDD y pruebas automatizadas',
    descripcion:
      'La prueba se escribe antes que el código en la funcionalidad nueva. Las pruebas cubren desde la unidad hasta la arquitectura, y se ejecutan contra infraestructura real, no contra simuladores que mienten.',
    practicas: [
      'Pruebas unitarias y de integración contra base de datos en contenedor',
      'Pruebas de arquitectura que verifican las reglas entre capas',
      'Pruebas de extremo a extremo en navegador y pruebas de carga',
    ],
  },
  {
    titulo: 'Integración y despliegue continuos',
    descripcion:
      'Cada cambio compila, se prueba y se despliega por una tubería automatizada. Un despliegue no depende de que alguien recuerde un paso manual a las once de la noche.',
    practicas: [
      'Tuberías por etapas: pruebas, construcción de imagen, migración, despliegue y verificación',
      'Migraciones de base de datos aplicadas como paso de la tubería, no a mano',
      'Verificación de salud posterior al despliegue antes de dar por buena la entrega',
    ],
  },
  {
    titulo: 'Estándares escritos en el repositorio',
    descripcion:
      'Las convenciones del equipo están codificadas en el repositorio, no en la memoria de quien lleva más tiempo. Un desarrollador nuevo lee las reglas y produce código consistente desde la primera semana.',
    practicas: [
      'Validación declarativa obligatoria y responsabilidad única por clase',
      'Patrón Strategy en lugar de cadenas de condicionales que nadie quiere tocar',
      'Configuración tipada que falla al arrancar si algo está mal, no en producción',
    ],
  },
  {
    titulo: 'Documentación técnica como entregable',
    descripcion:
      'El sistema se entrega documentado: decisiones de arquitectura, contratos de API y guías de migración. El proyecto no depende de que yo siga estando disponible.',
    practicas: [
      'Documento de arquitectura con modelo C4, actores y atributos de calidad',
      'Referencia de API con catálogo de códigos de error de negocio',
      'Guías de migración que describen las diferencias de comportamiento entre versiones',
    ],
  },
];

/** Áreas con las que se agrupan las certificaciones en la página. */
export const AREAS_CERTIFICACION = [
  'Backend y .NET',
  'Arquitectura y datos',
  'Frontend',
  'Inteligencia artificial',
] as const;

export type AreaCertificacion = (typeof AREAS_CERTIFICACION)[number];

export interface Certificacion {
  readonly nombre: string;
  readonly emisor: string;
  readonly area: AreaCertificacion;
  /** Diploma público. Verificable sin credenciales. */
  readonly url: string;
}

export const CERTIFICACIONES: readonly Certificacion[] = [
  {
    nombre: 'Curso de Fundamentos de .NET',
    emisor: 'Platzi',
    area: 'Backend y .NET',
    url: 'https://platzi.com/p/feliper421953/curso/2883-course/diploma/detalle/',
  },
  {
    nombre: 'Curso de Introducción a C# con .NET 3.1',
    emisor: 'Platzi',
    area: 'Backend y .NET',
    url: 'https://platzi.com/p/feliper421953/curso/2198-course/diploma/detalle/',
  },
  {
    nombre: 'Curso de Programación Orientada a Objetos con C#',
    emisor: 'Platzi',
    area: 'Backend y .NET',
    url: 'https://platzi.com/p/feliper421953/curso/8036-course/diploma/detalle/',
  },
  {
    nombre: 'Curso de APIs con .NET',
    emisor: 'Platzi',
    area: 'Backend y .NET',
    url: 'https://platzi.com/p/feliper421953/curso/2983-course/diploma/detalle/',
  },
  {
    nombre: 'Curso de Principios SOLID en C# y .NET',
    emisor: 'Platzi',
    area: 'Arquitectura y datos',
    url: 'https://platzi.com/p/feliper421953/curso/4761-course/diploma/detalle/',
  },
  {
    nombre: 'Curso de Fundamentos de Entity Framework',
    emisor: 'Platzi',
    area: 'Arquitectura y datos',
    url: 'https://platzi.com/p/feliper421953/curso/2987-course/diploma/detalle/',
  },
  {
    nombre: 'Curso Básico de JavaScript',
    emisor: 'Platzi',
    area: 'Frontend',
    url: 'https://platzi.com/p/feliper421953/curso/1814-course/diploma/detalle/',
  },
  {
    nombre: 'Curso de Claude AI',
    emisor: 'Platzi',
    area: 'Inteligencia artificial',
    url: 'https://platzi.com/p/feliper421953/curso/12651-course/diploma/detalle/',
  },
  {
    nombre: 'Curso de Claude Code',
    emisor: 'Platzi',
    area: 'Inteligencia artificial',
    url: 'https://platzi.com/p/feliper421953/curso/12284-course/diploma/detalle/',
  },
];

/** Certificaciones agrupadas por área, en el orden de AREAS_CERTIFICACION. */
export const CERTIFICACIONES_POR_AREA: readonly (readonly [
  AreaCertificacion,
  readonly Certificacion[],
])[] = AREAS_CERTIFICACION.map(
  (area) => [area, CERTIFICACIONES.filter((c) => c.area === area)] as const,
);
