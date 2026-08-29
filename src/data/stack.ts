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
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac', 'reserva-citas-pagos', 'api-empleados-cqrs', 'facturacion-electronica-dian', 'identidad-terceros', 'facturacion-salud-rips'],
    nota: 'Lenguaje principal. Desde APIs modernas hasta mantenimiento de sistemas heredados.',
  },
  {
    nombre: '.NET Framework',
    categoria: 'Backend',
    proyectos: ['mantenimiento-erp-legacy', 'portal-saas-crm'],
    nota: 'El otro extremo del rango: sistemas en producción que se sostienen y modernizan sin reescribirlos.',
  },
  {
    nombre: 'ASP.NET Core',
    categoria: 'Backend',
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos', 'api-empleados-cqrs', 'identidad-terceros', 'facturacion-salud-rips'],
  },
  {
    nombre: 'Minimal API',
    categoria: 'Backend',
    proyectos: ['reserva-citas-pagos', 'identidad-terceros', 'facturacion-salud-rips'],
  },
  {
    nombre: 'Azure Functions',
    categoria: 'Backend',
    proyectos: ['worldcup-2026', 'facturacion-electronica-dian', 'facturacion-salud-rips'],
    nota: 'Backend serverless con escala a cero: se paga por uso real, no por servidor encendido.',
  },
  {
    nombre: 'Worker Services',
    categoria: 'Backend',
    proyectos: ['plataforma-omnicanal-sac', 'identidad-terceros'],
    nota: 'Procesos que trabajan en segundo plano sin que nadie tenga que entrar a la aplicación.',
  },
  {
    nombre: 'Entity Framework Core',
    categoria: 'Backend',
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos', 'facturacion-electronica-dian', 'identidad-terceros', 'facturacion-salud-rips'],
  },
  {
    nombre: 'MediatR / CQRS',
    categoria: 'Backend',
    proyectos: ['api-empleados-cqrs'],
  },
  {
    nombre: 'FluentValidation',
    categoria: 'Backend',
    proyectos: ['plataforma-omnicanal-sac', 'api-empleados-cqrs', 'facturacion-salud-rips'],
  },
  {
    nombre: 'Python',
    categoria: 'Backend',
    proyectos: ['footballedge', 'identidad-terceros'],
    nota: 'Modelado estadístico, similitud semántica y automatización de recolección de datos.',
  },
  {
    nombre: 'FastAPI',
    categoria: 'Backend',
    proyectos: ['identidad-terceros'],
  },

  // Frontend
  {
    nombre: 'React 19',
    categoria: 'Frontend',
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac', 'reserva-citas-pagos', 'misfinanzas'],
  },
  {
    nombre: 'TypeScript',
    categoria: 'Frontend',
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac', 'reserva-citas-pagos', 'misfinanzas'],
    nota: 'Tipado estricto, sin any. Los errores se detectan al compilar, no en producción.',
  },
  {
    nombre: 'Next.js',
    categoria: 'Frontend',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Exportación estática: la interfaz se sirve como archivos, sin servidor de render que mantener.',
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
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos'],
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
    nombre: 'pgvector',
    categoria: 'Datos',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Búsqueda por significado sobre la base de conocimiento, no por coincidencia de palabras.',
  },
  {
    nombre: 'SQL Server',
    categoria: 'Datos',
    proyectos: ['facturacion-electronica-dian', 'identidad-terceros', 'facturacion-salud-rips', 'portal-saas-crm', 'mantenimiento-erp-legacy'],
  },
  {
    nombre: 'Cosmos DB',
    categoria: 'Datos',
    proyectos: ['worldcup-2026'],
  },
  {
    nombre: 'Firebase',
    categoria: 'Datos',
    proyectos: ['reserva-citas-pagos', 'misfinanzas'],
    nota: 'Autenticación y persistencia gestionada, cuando montar un backend propio no se justifica.',
  },
  {
    nombre: 'Entity Framework 6',
    categoria: 'Datos',
    proyectos: ['portal-saas-crm'],
    nota: 'Modelos generados desde una base existente, en sistemas donde rehacer el esquema no es opción.',
  },
  {
    nombre: 'Dapper',
    categoria: 'Datos',
    proyectos: ['mantenimiento-erp-legacy'],
    nota: 'Cuando la consulta la manda el rendimiento y el SQL se escribe a mano a propósito.',
  },
  {
    nombre: 'ADO.NET',
    categoria: 'Datos',
    proyectos: ['mantenimiento-erp-legacy'],
  },
  {
    nombre: 'Microsoft Access / DAO',
    categoria: 'Datos',
    proyectos: ['mantenimiento-erp-legacy'],
  },
  {
    nombre: 'Migraciones de esquema',
    categoria: 'Datos',
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos'],
    nota: 'El esquema evoluciona versionado y se aplica desde la tubería de despliegue, nunca a mano.',
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
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac'],
  },
  {
    nombre: 'Azure Blob Storage',
    categoria: 'Cloud y DevOps',
    proyectos: ['plataforma-omnicanal-sac', 'facturacion-electronica-dian'],
  },
  {
    nombre: 'Azure Key Vault',
    categoria: 'Cloud y DevOps',
    proyectos: ['identidad-terceros', 'facturacion-salud-rips'],
    nota: 'Los secretos se resuelven al arrancar. El repositorio no contiene ninguna credencial.',
  },
  {
    nombre: 'AWS SES / Lambda / S3',
    categoria: 'Cloud y DevOps',
    proyectos: ['facturacion-salud-rips', 'portal-saas-crm'],
  },
  {
    nombre: 'GitHub Actions',
    categoria: 'Cloud y DevOps',
    proyectos: ['worldcup-2026'],
    nota: 'Cada push a main compila, prueba y despliega. Sin pasos manuales que alguien pueda olvidar.',
  },
  {
    nombre: 'Azure DevOps Pipelines',
    categoria: 'Cloud y DevOps',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Tubería por etapas: pruebas, imagen, migración de base de datos, despliegue y verificación de salud.',
  },
  {
    nombre: 'Docker',
    categoria: 'Cloud y DevOps',
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos', 'api-empleados-cqrs', 'identidad-terceros'],
  },
  {
    nombre: 'nginx / Caddy',
    categoria: 'Cloud y DevOps',
    proyectos: ['reserva-citas-pagos'],
  },
  {
    nombre: 'OpenTelemetry / Serilog',
    categoria: 'Cloud y DevOps',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Trazas correlacionadas de punta a punta: una petición se sigue entre servicios sin adivinar.',
  },
  {
    nombre: 'Application Insights',
    categoria: 'Cloud y DevOps',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Telemetría y tableros: saber qué pasa en producción antes de que lo reporte el cliente.',
  },
  {
    nombre: 'Health checks',
    categoria: 'Cloud y DevOps',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'El orquestador sabe si el servicio está vivo y si está listo, que no son la misma pregunta.',
  },
  {
    nombre: 'Windows Services',
    categoria: 'Cloud y DevOps',
    proyectos: ['mantenimiento-erp-legacy'],
  },

  // Mensajería y procesos
  {
    nombre: 'RabbitMQ',
    categoria: 'Mensajería y procesos',
    proyectos: ['identidad-terceros'],
    nota: 'Confirmación manual del mensaje: si el proceso falla, el trabajo no se pierde, se reintenta.',
  },
  {
    nombre: 'Patrón Outbox',
    categoria: 'Mensajería y procesos',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'El evento se guarda en la misma transacción que el dato. O pasan los dos, o no pasa ninguno.',
  },
  {
    nombre: 'Hangfire',
    categoria: 'Mensajería y procesos',
    proyectos: ['portal-saas-crm'],
    nota: 'Trabajos recurrentes con su propio historial: renovaciones y cobros que se ejecutan solos.',
  },
  {
    nombre: 'SignalR',
    categoria: 'Mensajería y procesos',
    proyectos: ['plataforma-omnicanal-sac', 'portal-saas-crm'],
    nota: 'El navegador recibe los cambios en el momento, sin recargar ni preguntar cada pocos segundos.',
  },
  {
    nombre: 'Procesos en segundo plano',
    categoria: 'Mensajería y procesos',
    proyectos: ['plataforma-omnicanal-sac', 'worldcup-2026', 'facturacion-electronica-dian'],
    nota: 'Ingesta de canales, reintentos, vencimiento de plazos y limpieza, coordinados sin intervención.',
  },
  {
    nombre: 'Webhooks idempotentes',
    categoria: 'Mensajería y procesos',
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac', 'reserva-citas-pagos'],
    nota: 'El proveedor puede reenviar el mismo evento diez veces: se procesa una sola.',
  },

  // Seguridad y criptografía
  {
    nombre: 'JWT',
    categoria: 'Seguridad y criptografía',
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac', 'api-empleados-cqrs'],
    nota: 'Con firma simétrica o de clave pública según quién deba poder verificar el token.',
  },
  {
    nombre: 'AES-256 / BCrypt',
    categoria: 'Seguridad y criptografía',
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac'],
  },
  {
    nombre: 'Firma digital XAdES',
    categoria: 'Seguridad y criptografía',
    proyectos: ['facturacion-electronica-dian'],
    nota: 'Firma con validez legal ante la autoridad tributaria, con sello de tiempo y verificación de vigencia.',
  },
  {
    nombre: 'Certificados X.509',
    categoria: 'Seguridad y criptografía',
    proyectos: ['facturacion-electronica-dian'],
  },
  {
    nombre: 'BouncyCastle',
    categoria: 'Seguridad y criptografía',
    proyectos: ['facturacion-electronica-dian'],
  },
  {
    nombre: 'Firebase Auth',
    categoria: 'Seguridad y criptografía',
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos'],
  },
  {
    nombre: 'API Key / Rate limiting',
    categoria: 'Seguridad y criptografía',
    proyectos: ['identidad-terceros', 'plataforma-omnicanal-sac'],
    nota: 'La credencial se valida antes de llegar al manejador, y nadie puede saturar el servicio.',
  },
  {
    nombre: 'Aislamiento multiempresa',
    categoria: 'Seguridad y criptografía',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Filtro global en la capa de datos: una consulta que olvide filtrar no puede devolver datos ajenos.',
  },

  // Pruebas y calidad
  {
    nombre: 'TDD',
    categoria: 'Pruebas y calidad',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'La prueba se escribe antes que el código. El resultado es una suite que de verdad protege.',
  },
  {
    nombre: 'xUnit',
    categoria: 'Pruebas y calidad',
    proyectos: ['plataforma-omnicanal-sac', 'api-empleados-cqrs'],
  },
  {
    nombre: 'NSubstitute / FluentAssertions',
    categoria: 'Pruebas y calidad',
    proyectos: ['plataforma-omnicanal-sac'],
  },
  {
    nombre: 'Testcontainers',
    categoria: 'Pruebas y calidad',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Pruebas de integración contra la base de datos real, no contra un simulador que miente.',
  },
  {
    nombre: 'Pruebas de arquitectura',
    categoria: 'Pruebas y calidad',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Una prueba falla si alguien salta una capa. Las reglas se verifican solas, no en revisión.',
  },
  {
    nombre: 'Playwright / Selenium',
    categoria: 'Pruebas y calidad',
    proyectos: ['footballedge', 'identidad-terceros'],
  },
  {
    nombre: 'Pruebas de carga (k6)',
    categoria: 'Pruebas y calidad',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Se mide cuánto aguanta antes de salir a producción, no después del primer incidente.',
  },
  {
    nombre: 'Pruebas de concurrencia',
    categoria: 'Pruebas y calidad',
    proyectos: ['reserva-citas-pagos'],
    nota: 'Ocho peticiones simultáneas sobre el mismo recurso: la prueba exige que gane exactamente una.',
  },

  // Legado e interoperabilidad
  {
    nombre: 'WCF / SOAP',
    categoria: 'Legado e interoperabilidad',
    proyectos: ['facturacion-electronica-dian', 'mantenimiento-erp-legacy'],
    nota: 'Protocolo obligado cuando del otro lado hay una entidad estatal que no va a cambiarlo.',
  },
  {
    nombre: 'CoreWCF',
    categoria: 'Legado e interoperabilidad',
    proyectos: ['facturacion-electronica-dian'],
    nota: 'La pieza que permite conservar el contrato SOAP y aun así correr sobre .NET moderno.',
  },
  {
    nombre: 'ASP.NET Web Forms',
    categoria: 'Legado e interoperabilidad',
    proyectos: ['portal-saas-crm'],
  },
  {
    nombre: 'ASP.NET MVC 5 / OWIN',
    categoria: 'Legado e interoperabilidad',
    proyectos: ['portal-saas-crm'],
  },
  {
    nombre: 'WinForms',
    categoria: 'Legado e interoperabilidad',
    proyectos: ['mantenimiento-erp-legacy'],
  },
  {
    nombre: 'COM / Interop',
    categoria: 'Legado e interoperabilidad',
    proyectos: ['mantenimiento-erp-legacy'],
    nota: 'Acoplarse en vivo a una aplicación de escritorio ya abierta, en lugar de competir con ella.',
  },
  {
    nombre: 'Migración x86 a x64',
    categoria: 'Legado e interoperabilidad',
    proyectos: ['mantenimiento-erp-legacy'],
  },
  {
    nombre: 'UBL 2.1',
    categoria: 'Legado e interoperabilidad',
    proyectos: ['facturacion-electronica-dian'],
    nota: 'El estándar XML de la factura electrónica. Un atributo fuera de lugar y el documento se rechaza.',
  },

  // Prácticas y arquitectura
  {
    nombre: 'Clean Architecture',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['plataforma-omnicanal-sac', 'reserva-citas-pagos', 'api-empleados-cqrs'],
    nota: 'El núcleo del negocio no depende de la base de datos ni del framework. Cambiar uno no rompe el otro.',
  },
  {
    nombre: 'Vertical Slice',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['plataforma-omnicanal-sac'],
  },
  {
    nombre: 'Onion Architecture',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['facturacion-salud-rips'],
  },
  {
    nombre: 'Strategy + Factory',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['facturacion-electronica-dian', 'reserva-citas-pagos', 'facturacion-salud-rips', 'portal-saas-crm', 'identidad-terceros'],
    nota: 'Añadir un caso nuevo es escribir una clase. Ningún archivo que ya funciona se modifica.',
  },
  {
    nombre: 'Result pattern',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['facturacion-electronica-dian'],
    nota: 'El error esperado se devuelve como valor, no como excepción, y se traduce a un código HTTP explícito.',
  },
  {
    nombre: 'ProblemDetails (RFC 7807)',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['identidad-terceros'],
    nota: 'Errores normalizados con catálogo de códigos: quien consume la API sabe qué hacer con cada uno.',
  },
  {
    nombre: 'Multitenant',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['plataforma-omnicanal-sac'],
  },
  {
    nombre: 'Configuración tipada',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['facturacion-salud-rips', 'plataforma-omnicanal-sac'],
    nota: 'Si falta un valor, el servicio no arranca. Mejor eso que fallar en la primera operación real.',
  },
  {
    nombre: 'Integración de IA (RAG)',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['plataforma-omnicanal-sac'],
    nota: 'Agentes que responden sobre documentación propia, con escalamiento a humano cuando no saben.',
  },
  {
    nombre: 'Integraciones de terceros',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['worldcup-2026', 'plataforma-omnicanal-sac', 'reserva-citas-pagos', 'portal-saas-crm'],
    nota: 'Pasarelas de pago, WhatsApp, telefonía, correo y calendarios. Webhooks firmados e idempotentes.',
  },
  {
    nombre: 'Pasarelas de pago',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['worldcup-2026', 'reserva-citas-pagos', 'portal-saas-crm'],
    nota: 'Cuatro proveedores detrás de una misma interfaz: conmutar de pasarela es configuración, no despliegue.',
  },
  {
    nombre: 'Modernización de legado',
    categoria: 'Prácticas y arquitectura',
    proyectos: ['facturacion-electronica-dian', 'mantenimiento-erp-legacy', 'portal-saas-crm'],
    nota: 'Reescribir por partes sin romper contratos: el consumidor migra cuando puede, no cuando yo despliego.',
  },
];

/** Stack agrupado por categoría, en el orden de CATEGORIAS. */
export const STACK_POR_CATEGORIA: readonly (readonly [Categoria, readonly Tecnologia[]])[] =
  CATEGORIAS.map((categoria) => [
    categoria,
    STACK.filter((t) => t.categoria === categoria),
  ] as const);
