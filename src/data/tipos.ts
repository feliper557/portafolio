/** Contratos de datos del portafolio. Todo el contenido del sitio se tipa contra estos. */

/** Categorías con las que se agrupa el stack en la página /stack. */
export const CATEGORIAS = [
  'Backend',
  'Frontend',
  'Datos',
  'Cloud y DevOps',
  'Mensajería y procesos',
  'Seguridad y criptografía',
  'Pruebas y calidad',
  'Legado e interoperabilidad',
  'Prácticas y arquitectura',
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

/** Una tecnología del stack, con los proyectos donde se aplicó realmente. */
export interface Tecnologia {
  readonly nombre: string;
  readonly categoria: Categoria;
  /** Slugs de proyectos donde se usó. Se valida contra los proyectos en tiempo de compilación. */
  readonly proyectos: readonly string[];
  /** Por qué importa, en lenguaje de cliente. Opcional. */
  readonly nota?: string;
}

/** Bloque de código real extraído de un proyecto, con el porqué de la decisión. */
export interface Snippet {
  readonly titulo: string;
  readonly lenguaje: 'csharp' | 'sql' | 'typescript' | 'yaml' | 'python';
  readonly codigo: string;
  /** Qué demuestra este fragmento. Una o dos frases. */
  readonly explicacion: string;
}

/** Métrica dura del proyecto, para la fila de cifras del detalle. */
export interface Metrica {
  readonly valor: string;
  readonly etiqueta: string;
}

/**
 * 'Profesional' es trabajo en empresa; 'Cliente', encargos propios. La distinción
 * importa: un ERP corporativo y un encargo freelance no se leen igual.
 */
export type TipoProyecto = 'Propio' | 'Cliente' | 'Profesional' | 'Prueba técnica';

export interface Proyecto {
  readonly slug: string;
  readonly nombre: string;
  /** Una línea que un cliente no técnico entiende. */
  readonly resumen: string;
  readonly tipo: TipoProyecto;
  readonly anio: string;
  /** Aparece en la portada. Máximo tres. */
  readonly destacado: boolean;
  readonly problema: string;
  readonly solucion: string;
  /** La decisión técnica que sostiene el sistema. Es lo que separa un dev de otro. */
  readonly decision: string;
  readonly resultado: string;
  readonly tecnologias: readonly string[];
  readonly metricas: readonly Metrica[];
  readonly snippets: readonly Snippet[];
  /** Identificador del diagrama de arquitectura, si tiene. */
  readonly diagrama?: 'serverless-azure' | 'api-monolito';
}
