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
    anio: '[PENDIENTE: año de grado]',
    detalle:
      'Título profesional con tarjeta profesional vigente, que habilita el ejercicio de la ingeniería en Colombia.',
  },
];

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
