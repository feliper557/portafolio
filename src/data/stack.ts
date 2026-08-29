import type { Categoria, Tecnologia } from './tipos';
import { CATEGORIAS } from './tipos';

/**
 * Stack declarado. Cada entrada apunta a los proyectos donde realmente se usó:
 * si una tecnología no tiene proyecto detrás, no está en esta lista.
 */
export const STACK: readonly Tecnologia[] = [
  // Backend
  {
    nombre: 'C# / .NET 8 – 10',
    categoria: 'Backend',
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac', 'reserva-citas-pagos', 'api-empleados-cqrs', 'mantenimiento-erp-legacy'],
    nota: 'Lenguaje principal. Desde APIs modernas hasta mantenimiento de sistemas heredados.',
  },
  {
    nombre: 'Azure Functions',
    categoria: 'Backend',
    proyectos: ['worldcup-2026'],
    nota: 'Backend serverless con escala a cero: se paga por uso real, no por servidor encendido.',
  },
  {
    nombre: 'Minimal API',
    categoria: 'Backend',
    proyectos: ['reserva-citas-pagos'],
  },
  {
    nombre: 'Entity Framework Core',
    categoria: 'Backend',
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos'],
  },
  {
    nombre: 'MediatR / CQRS',
    categoria: 'Backend',
    proyectos: ['api-empleados-cqrs'],
  },
  {
    nombre: 'FluentValidation',
    categoria: 'Backend',
    proyectos: ['plataforma-omnicanal-sac', 'api-empleados-cqrs'],
  },
  {
    nombre: 'Python',
    categoria: 'Backend',
    proyectos: ['footballedge'],
    nota: 'Modelado estadístico, backtesting y automatización de recolección de datos.',
  },

  // Frontend
  {
    nombre: 'React 19',
    categoria: 'Frontend',
    proyectos: ['worldcup-2026', 'reserva-citas-pagos', 'misfinanzas'],
  },
  {
    nombre: 'TypeScript',
    categoria: 'Frontend',
    proyectos: ['worldcup-2026', 'reserva-citas-pagos', 'misfinanzas'],
    nota: 'Tipado estricto, sin any. Los errores se detectan al compilar, no en producción.',
  },
  {
    nombre: 'Vite',
    categoria: 'Frontend',
    proyectos: ['worldcup-2026', 'misfinanzas'],
  },
  {
    nombre: 'MUI',
    categoria: 'Frontend',
    proyectos: ['worldcup-2026'],
  },
  {
    nombre: 'Tailwind CSS',
    categoria: 'Frontend',
    proyectos: ['reserva-citas-pagos'],
  },
  {
    nombre: 'Redux Toolkit',
    categoria: 'Frontend',
    proyectos: ['misfinanzas'],
  },
  {
    nombre: 'React Router',
    categoria: 'Frontend',
    proyectos: ['worldcup-2026'],
  },
  {
    nombre: 'PWA',
    categoria: 'Frontend',
    proyectos: ['worldcup-2026'],
    nota: 'Instalable en el celular y funcional sin conexión estable.',
  },
  {
    nombre: 'Recharts / D3',
    categoria: 'Frontend',
    proyectos: ['misfinanzas'],
  },
  {
    nombre: 'Blazor',
    categoria: 'Frontend',
    proyectos: ['footballedge'],
  },

  // Datos
  {
    nombre: 'PostgreSQL',
    categoria: 'Datos',
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos'],
    nota: 'Más allá del CRUD: restricciones de exclusión, índices GiST e integridad garantizada por el motor.',
  },
  {
    nombre: 'Cosmos DB',
    categoria: 'Datos',
    proyectos: ['worldcup-2026'],
  },
  {
    nombre: 'SQL Server',
    categoria: 'Datos',
    proyectos: ['mantenimiento-erp-legacy'],
  },
  {
    nombre: 'Firebase',
    categoria: 'Datos',
    proyectos: ['reserva-citas-pagos', 'misfinanzas'],
    nota: 'Autenticación y persistencia gestionada, cuando montar un backend propio no se justifica.',
  },
  {
    nombre: 'Microsoft Access / DAO',
    categoria: 'Datos',
    proyectos: ['mantenimiento-erp-legacy'],
  },

  // Cloud y DevOps
  {
    nombre: 'Azure Container Apps',
    categoria: 'Cloud y DevOps',
    proyectos: ['plataforma-omnicanal-sac'],
  },
  {
    nombre: 'Azure Static Web Apps',
    categoria: 'Cloud y DevOps',
    proyectos: ['worldcup-2026'],
  },
  {
    nombre: 'GitHub Actions',
    categoria: 'Cloud y DevOps',
    proyectos: ['worldcup-2026'],
    nota: 'Cada push a main compila, prueba y despliega. Sin pasos manuales que alguien pueda olvidar.',
  },
  {
    nombre: 'Docker',
    categoria: 'Cloud y DevOps',
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos', 'api-empleados-cqrs'],
  },
  {
    nombre: 'nginx / Caddy',
    categoria: 'Cloud y DevOps',
    proyectos: ['reserva-citas-pagos'],
  },
  {
    nombre: 'Application Insights',
    categoria: 'Cloud y DevOps',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Telemetría y tableros: saber qué pasa en producción antes de que lo reporte el cliente.',
  },
  {
    nombre: 'Windows Services',
    categoria: 'Cloud y DevOps',
    proyectos: ['mantenimiento-erp-legacy'],
  },

  // Prácticas
  {
    nombre: 'Clean Architecture',
    categoria: 'Prácticas',
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos', 'api-empleados-cqrs'],
    nota: 'El núcleo del negocio no depende de la base de datos ni del framework. Cambiar uno no rompe el otro.',
  },
  {
    nombre: 'TDD',
    categoria: 'Prácticas',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'La prueba se escribe antes que el código. El resultado es una suite que de verdad protege.',
  },
  {
    nombre: 'Testcontainers',
    categoria: 'Prácticas',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Pruebas de integración contra la base de datos real, no contra un simulador que miente.',
  },
  {
    nombre: 'Vertical Slice',
    categoria: 'Prácticas',
    proyectos: ['plataforma-omnicanal-sac'],
  },
  {
    nombre: 'Multitenant',
    categoria: 'Prácticas',
    proyectos: ['plataforma-omnicanal-sac'],
  },
  {
    nombre: 'JWT / AES-256 / BCrypt',
    categoria: 'Prácticas',
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac', 'api-empleados-cqrs'],
  },
  {
    nombre: 'Integración de IA (RAG)',
    categoria: 'Prácticas',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Agentes que responden sobre documentación propia, con escalamiento a humano cuando no saben.',
  },
  {
    nombre: 'Integraciones de terceros',
    categoria: 'Prácticas',
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac', 'reserva-citas-pagos'],
    nota: 'Pasarelas de pago, WhatsApp, telefonía, correo y calendarios. Webhooks firmados e idempotentes.',
  },
];

/** Stack agrupado por categoría, en el orden de CATEGORIAS. */
export const STACK_POR_CATEGORIA: readonly (readonly [Categoria, readonly Tecnologia[]])[] =
  CATEGORIAS.map((categoria) => [
    categoria,
    STACK.filter((t) => t.categoria === categoria),
  ] as const);
