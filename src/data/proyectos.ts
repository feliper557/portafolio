import type { Proyecto } from './tipos';

/**
 * Fuente única de verdad del portafolio.
 *
 * Todo lo que aparece aquí corresponde a sistemas que construí. Los proyectos de cliente
 * están descritos sin nombrar a la empresa ni exponer datos del negocio: se explica el
 * problema, la arquitectura y el resultado, que es lo que realmente demuestra el trabajo.
 */
export const PROYECTOS: readonly Proyecto[] = [
  {
    slug: 'worldcup-2026',
    nombre: 'WorldCup 2026',
    resumen:
      'Plataforma de predicciones deportivas con acceso por invitación, ranking en vivo y cobro en línea.',
    tipo: 'Propio',
    anio: '2026',
    destacado: true,
    problema:
      'Una comunidad quería competir prediciendo los resultados del Mundial, pero necesitaba mucho más que un formulario: registro cerrado por invitación, puntuación automática apenas termina cada partido, ranking confiable, cobro de la inscripción y todo funcionando en el celular. Sostener un servidor encendido durante un mes para picos de tráfico que solo ocurren durante los partidos no tenía sentido económico.',
    solucion:
      'Construí la plataforma completa: un backend serverless de 27 Azure Functions sobre Cosmos DB y una aplicación React instalable como PWA. El sistema gestiona invitaciones cifradas, autenticación, predicciones, un motor de puntuación, rifas, eventos, notificaciones por correo y el cobro con confirmación por webhook de la pasarela.',
    decision:
      'Arquitectura serverless con escala a cero. El costo sigue al uso real en lugar de a un servidor encendido las 24 horas, y los picos durante los partidos se absorben solos. La sincronización de resultados no depende de que nadie entre a la aplicación: una función por temporizador consulta la fuente de datos deportivos, detecta los partidos terminados y dispara el recálculo de puntos de todas las predicciones. Los tokens de invitación se cifran con AES-256 y llevan su propia fecha de expiración dentro, así que no hay que consultar la base de datos para saber si una invitación sigue viva.',
    resultado:
      'Sistema en producción con despliegue automático: cada push a main compila y publica el frontend y las funciones sin intervención manual. La puntuación es automática y auditable, y la infraestructura cuesta prácticamente cero fuera de los días de partido.',
    tecnologias: [
      'C# / .NET 8',
      'Azure Functions',
      'Cosmos DB',
      'React 19',
      'TypeScript',
      'MUI',
      'Vite',
      'PWA',
      'React Router',
      'JWT',
      'AES-256',
      'GitHub Actions',
      'Azure Static Web Apps',
    ],
    metricas: [
      { valor: '27', etiqueta: 'Azure Functions' },
      { valor: '25+', etiqueta: 'componentes React' },
      { valor: '0', etiqueta: 'costo fuera de picos' },
      { valor: 'CI/CD', etiqueta: 'despliegue automático' },
    ],
    diagrama: 'serverless-azure',
    snippets: [
      {
        titulo: 'Clave de cifrado fuera del código',
        lenguaje: 'csharp',
        explicacion:
          'La clave de AES-256 nunca vive en el repositorio: se inyecta como variable de entorno y el servicio falla al arrancar si no está configurada. Es preferible que el sistema no levante a que levante en silencio con una clave insegura.',
        codigo: `public EncryptionService(ILogger<EncryptionService> logger)
{
    _logger = logger;
    _encryptionKey = Environment.GetEnvironmentVariable("ENCRYPTION_KEY")
        ?? throw new InvalidOperationException(
            "ENCRYPTION_KEY environment variable not set");
}`,
      },
      {
        titulo: 'Sincronización de resultados sin intervención humana',
        lenguaje: 'csharp',
        explicacion:
          'La función recorre los partidos, consulta la fuente deportiva y recalcula la puntuación de las predicciones afectadas. El margen de 115 minutos evita cerrar un partido que aún puede tener tiempo añadido o prórroga.',
        codigo: `private const int BufferMinutes = 115;

[Function("SyncResults")]
public async Task<HttpResponseData> Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "sync-results")]
    HttpRequestData req)
{
    var allMatches = await _matchRepository.GetAllAsync();
    var updatedCount = 0;

    foreach (var match in allMatches.Where(EstaListoParaCerrar))
    {
        var resultado = await _footballDataService.GetResultAsync(match.ExternalId);
        if (resultado is null) continue;

        await _matchRepository.SetScoreAsync(match.Id, resultado);
        await _scoringService.RecalculateAsync(match.Id);
        updatedCount++;
    }

    return await req.OkAsync(new { updated = updatedCount });
}`,
      },
    ],
  },

  {
    slug: 'plataforma-omnicanal-sac',
    nombre: 'Plataforma omnicanal de servicio al cliente',
    resumen:
      'Bandeja única que reúne WhatsApp, correo y llamadas de un ERP, con un agente de IA que responde y escala a un humano cuando no sabe.',
    tipo: 'Cliente',
    anio: '2026',
    destacado: true,
    problema:
      'El área de soporte de un ERP atendía por WhatsApp, por correo y por teléfono, cada canal en una herramienta distinta. Un mismo cliente escribía por tres vías y nadie veía la conversación completa. Además el producto es multiempresa: los datos de cada licencia deben quedar aislados de los demás sin excepción, porque una fuga entre empresas no es un error de software, es un incidente legal.',
    solucion:
      'Backend en .NET 10 con Clean Architecture y Vertical Slice, desarrollado con TDD. Unifica los tres canales en una sola conversación por cliente, incorpora un agente de IA con recuperación sobre la base de conocimiento del producto (RAG) y un modo de contingencia que garantiza que, si la IA no está disponible, toda conversación escala a un asesor humano en lugar de quedarse sin respuesta.',
    decision:
      'El aislamiento entre empresas no se confía al programador de turno: vive en un filtro global de consultas de la capa de datos, de modo que una consulta que olvide filtrar por empresa simplemente no puede devolver datos ajenos. Y no se verifica con un mock, sino con pruebas de integración contra una base de datos PostgreSQL real levantada en contenedor para cada ejecución. Los webhooks de los canales son idempotentes: el proveedor puede reintentar el mismo evento y el mensaje no se duplica.',
    resultado:
      'Trazabilidad completa de cada cliente en una sola bandeja, el aislamiento entre empresas verificado por pruebas automáticas en cada compilación, y despliegue en contenedores con telemetría y tableros de monitoreo. Diecinueve documentos de diseño técnico acompañan el código.',
    tecnologias: [
      'C# / .NET 10',
      'Clean Architecture',
      'Vertical Slice',
      'TDD',
      'PostgreSQL',
      'EF Core',
      'Testcontainers',
      'Multitenant',
      'IA / RAG',
      'Docker',
      'Azure Container Apps',
      'Application Insights',
    ],
    metricas: [
      { valor: '3', etiqueta: 'canales unificados' },
      { valor: '19', etiqueta: 'documentos de diseño' },
      { valor: 'TDD', etiqueta: 'prueba antes que código' },
      { valor: '100%', etiqueta: 'aislamiento verificado' },
    ],
    snippets: [
      {
        titulo: 'El aislamiento entre empresas vive en la infraestructura',
        lenguaje: 'csharp',
        explicacion:
          'Un filtro global se aplica a todas las consultas de la entidad. Aunque un caso de uso olvide filtrar por empresa, la consulta no puede devolver datos de otra. La seguridad deja de depender de que nadie se equivoque.',
        codigo: `protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Conversacion>()
        .HasQueryFilter(c => c.TenantId == _tenantContext.TenantId);

    modelBuilder.Entity<Mensaje>()
        .HasQueryFilter(m => m.TenantId == _tenantContext.TenantId);
}`,
      },
      {
        titulo: 'Verificado contra una base de datos real, no contra un mock',
        lenguaje: 'csharp',
        explicacion:
          'La prueba levanta un PostgreSQL efímero en contenedor, escribe con una empresa y lee con otra. Un mock habría pasado igual con el filtro roto; esta prueba no.',
        codigo: `[Fact]
public async Task Una_empresa_no_puede_leer_conversaciones_de_otra()
{
    await CrearConversacionComo(TenantA, asunto: "Factura 001");

    var resultado = await ClienteComo(TenantB)
        .GetFromJsonAsync<ConversacionDto[]>("/api/conversaciones");

    Assert.Empty(resultado!);
}`,
      },
    ],
  },

  {
    slug: 'reserva-citas-pagos',
    nombre: 'Plataforma de reserva y pago de citas',
    resumen:
      'Agenda en línea con cobro anticipado: el paciente reserva y paga, y la franja se bloquea sola.',
    tipo: 'Cliente',
    anio: '2026',
    destacado: true,
    problema:
      'Una profesional independiente agendaba por WhatsApp y cobraba por transferencia. Perdía horas confirmando citas, sufría ausencias sin aviso y ocasionalmente prometía la misma hora a dos personas. Necesitaba que el sistema fuera dueño de la agenda y del cobro, con tres modalidades de atención y recargo por desplazamiento según el municipio.',
    solucion:
      'API en .NET 10 con Clean Architecture y una aplicación React 19 en TypeScript. La profesional marca en un calendario qué días atiende y en qué horario; lo que no marca sencillamente no se ofrece. El paciente elige paquete, modalidad y hora, paga en línea, y la cita se confirma sola. Al confirmarse se dispara el correo y el evento de calendario con enlace de videollamada.',
    decision:
      'Que una franja no se venda dos veces no se puede garantizar desde el código de la aplicación: entre que se consulta la disponibilidad y se escribe la reserva, otro usuario puede colarse. La garantía real la da la base de datos con una restricción de exclusión sobre rangos de tiempo; el segundo intento simultáneo falla en el motor y la API lo traduce a un conflicto limpio. Hay una prueba que lanza ocho reservas a la vez sobre la misma franja y exige que gane exactamente una. El dinero, por su parte, solo lo confirma la pasarela: el webhook verifica su firma, registra el evento con clave única para tolerar reintentos, y vuelve a consultar la transacción al proveedor antes de confirmar nada.',
    resultado:
      'Cero dobles reservas por diseño, no por suerte. Cobro anticipado que elimina las ausencias sin aviso, y una agenda que la profesional administra sola sin depender de nadie.',
    tecnologias: [
      'C# / .NET 10',
      'Minimal API',
      'Clean Architecture',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'EF Core',
      'Firebase Auth',
      'Docker',
      'nginx',
      'Google Calendar API',
    ],
    metricas: [
      { valor: '8', etiqueta: 'reservas simultáneas probadas' },
      { valor: '1', etiqueta: 'gana siempre' },
      { valor: '3', etiqueta: 'modalidades de atención' },
      { valor: '6', etiqueta: 'reglas de negocio aisladas' },
    ],
    diagrama: 'api-monolito',
    snippets: [
      {
        titulo: 'La base de datos impide vender dos veces la misma hora',
        lenguaje: 'sql',
        explicacion:
          'Una restricción de exclusión sobre el rango horario. No hay ventana de carrera posible: el segundo insert simultáneo falla en el motor con el código 23P01, que la API traduce a un HTTP 409.',
        codigo: `ALTER TABLE appointments
ADD CONSTRAINT ck_appointments_no_overlap
EXCLUDE USING gist (advisor_id WITH =, slot WITH &&)
WHERE (status IN ('PendingPayment', 'Confirmed'));`,
      },
      {
        titulo: 'Cada regla de negocio es una clase, no un if más',
        lenguaje: 'csharp',
        explicacion:
          'Patrón Strategy. Añadir una política nueva es crear una clase y registrarla; ni el orquestador ni los casos de uso se tocan. Es lo que mantiene el sistema barato de cambiar seis meses después.',
        codigo: `public interface IBookingRule
{
    Task<RuleResult> EvaluateAsync(BookingRequest request, CancellationToken ct);
}

// Registro: añadir una regla no modifica ningún archivo existente
services.AddBookingRules(
    typeof(AdvisorMustBeActiveRule),
    typeof(SlotDurationMustMatchPackageRule),
    typeof(SlotMustBeOfferedRule),
    typeof(PatientMustNotHaveOverlappingAppointmentRule),
    typeof(PatientPendingPaymentLimitRule));`,
      },
    ],
  },

  {
    slug: 'footballedge',
    nombre: 'FootballEdge',
    resumen:
      'Motor de predicción de fútbol con modelo estadístico propio y validación histórica antes de confiar en él.',
    tipo: 'Propio',
    anio: '2026',
    destacado: false,
    problema:
      'Predecir resultados de fútbol es fácil; saber si tu predicción vale algo es lo difícil. Cualquier modelo parece brillante mirando hacia atrás. Hacía falta un sistema que no solo generara pronósticos sino que probara, contra temporadas completas ya jugadas, si el modelo realmente aporta algo o solo describe el pasado.',
    solucion:
      'Motor en Python que modela los goles de cada equipo con una distribución de Poisson calibrada por fuerza ofensiva y defensiva, calcula probabilidades para cada mercado y las contrasta con las cuotas disponibles. Sobre eso, un simulador de torneo completo y un módulo de backtesting que reproduce temporadas históricas partido a partido.',
    decision:
      'Ninguna estrategia se da por buena sin pasar el backtest. El modelo se calibra con datos anteriores al periodo evaluado y se prueba sobre datos que nunca vio, para no engañarse a sí mismo. La recolección de datos usa automatización de navegador, porque las fuentes públicas confiables no siempre exponen una API.',
    resultado:
      'El backtest descartó la mayoría de las combinaciones y dejó solo un par realmente rentables. Ese resultado negativo es el valor del proyecto: el sistema sabe decir "esto no funciona", que es exactamente lo que un modelo mal construido nunca dice.',
    tecnologias: [
      'Python',
      'NumPy',
      'Modelo de Poisson',
      'Backtesting',
      'Playwright',
      'C# / .NET 8',
      'Blazor',
    ],
    metricas: [
      { valor: '2', etiqueta: 'estrategias sobrevivieron' },
      { valor: '1', etiqueta: 'torneo simulado completo' },
      { valor: 'Poisson', etiqueta: 'modelo base' },
    ],
    snippets: [
      {
        titulo: 'Probabilidad de cada marcador, no solo del ganador',
        lenguaje: 'python',
        explicacion:
          'La matriz de Poisson da la probabilidad de cada marcador exacto. De ahí salen todos los mercados por suma, en lugar de modelar cada mercado por separado y arriesgarse a que se contradigan entre sí.',
        codigo: `def matriz_marcadores(lambda_local, lambda_visitante, max_goles=8):
    """Probabilidad conjunta de cada marcador bajo Poisson independiente."""
    local = poisson.pmf(np.arange(max_goles + 1), lambda_local)
    visitante = poisson.pmf(np.arange(max_goles + 1), lambda_visitante)
    return np.outer(local, visitante)

matriz = matriz_marcadores(lam_local, lam_visitante)
p_local = np.tril(matriz, -1).sum()   # gana local
p_empate = np.trace(matriz)           # empate
p_visitante = np.triu(matriz, 1).sum()`,
      },
    ],
  },

  {
    slug: 'misfinanzas',
    nombre: 'MisFinanzas',
    resumen:
      'Aplicación de finanzas personales con presupuestos, préstamos, inversiones y tendencias visualizadas.',
    tipo: 'Propio',
    anio: '2026',
    destacado: false,
    problema:
      'Llevar las finanzas personales en una hoja de cálculo funciona hasta que hay que consultarla desde el celular, o hasta que entran préstamos con cuotas e inversiones con rendimientos y la hoja se vuelve inmanejable.',
    solucion:
      'Aplicación web en React 19 con TypeScript y almacenamiento en la nube. Módulos de resumen, presupuestos, préstamos, inversiones y tendencias, con gráficas construidas sobre la misma base de datos.',
    decision:
      'El estado global se maneja con Redux Toolkit y los cálculos financieros viven aislados en un módulo puro, sin dependencias de React. Eso permite razonar sobre las fórmulas y probarlas sin montar un solo componente: la lógica de dinero no debería depender de cómo se pinta la pantalla.',
    resultado:
      'Visión consolidada del patrimonio en cualquier dispositivo, con sincronización en la nube y sin servidor propio que mantener.',
    tecnologias: [
      'React 19',
      'TypeScript',
      'Redux Toolkit',
      'Vite',
      'Firebase',
      'Recharts',
      'D3',
    ],
    metricas: [
      { valor: '5', etiqueta: 'módulos financieros' },
      { valor: '0', etiqueta: 'servidores que mantener' },
    ],
    snippets: [],
  },

  {
    slug: 'api-empleados-cqrs',
    nombre: 'API de gestión de empleados',
    resumen:
      'Prueba técnica resuelta con Clean Architecture, CQRS y pruebas por capa. El estándar con el que trabajo.',
    tipo: 'Prueba técnica',
    anio: '2026',
    destacado: false,
    problema:
      'Una prueba técnica pedía un CRUD de empleados. La mayoría lo entrega como un controlador con acceso directo a la base de datos: funciona, pero no dice nada sobre cómo se trabaja en un proyecto real.',
    solucion:
      'API en .NET con las capas separadas por la regla de dependencias, comandos y consultas resueltos con CQRS y MediatR, validación declarativa con FluentValidation, autenticación con JWT y todo empaquetado en Docker. Pruebas por capa y documentación de arquitectura incluida.',
    decision:
      'Separar comandos de consultas incluso en un CRUD pequeño. No porque el CRUD lo necesite, sino porque establece la estructura en la que el proyecto puede crecer sin reescribirse: cuando aparece la primera consulta con reportes o el primer comando con reglas, ya hay dónde ponerlos.',
    resultado:
      'Entrega con documentación de arquitectura, diagramas de flujo de la petición y despliegue en contenedor. Sirve como muestra directa de mi estándar de trabajo.',
    tecnologias: [
      'C# / .NET',
      'Clean Architecture',
      'CQRS',
      'MediatR',
      'FluentValidation',
      'JWT',
      'Docker',
    ],
    metricas: [
      { valor: '4', etiqueta: 'capas separadas' },
      { valor: '2', etiqueta: 'proyectos de pruebas' },
    ],
    snippets: [
      {
        titulo: 'Validación declarativa, fuera del controlador',
        lenguaje: 'csharp',
        explicacion:
          'Las reglas de entrada no se mezclan con la lógica de negocio ni con el controlador. Se leen de corrido y se prueban solas.',
        codigo: `public class CreateEmployeeValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.CompanyId).GreaterThan(0);
    }
}`,
      },
    ],
  },

  {
    slug: 'mantenimiento-erp-legacy',
    nombre: 'Mantenimiento y modernización de ERP legacy',
    resumen:
      'Soporte y migración a 64 bits de módulos de un ERP contable en producción desde hace años.',
    tipo: 'Cliente',
    anio: '2024 – 2026',
    destacado: false,
    problema:
      'Un ERP contable con años en producción y cientos de empresas usándolo tenía módulos atados a componentes de 32 bits que dejaron de funcionar en equipos modernos. Reescribir el sistema no era una opción: hay que mantenerlo funcionando mientras se moderniza por partes.',
    solucion:
      'Migración de los módulos afectados a 64 bits, actualizadores automáticos que llevan cada instalación de cliente a la versión correcta sin visita técnica, y un servicio de Windows que monitorea la disponibilidad de los servicios y deja registro.',
    decision:
      'No tocar lo que funciona. Cada cambio se aísla al módulo afectado y se entrega con un actualizador que puede revertirse, porque en un ERP contable en producción una migración fallida no es un bug: es una empresa que no puede facturar mañana.',
    resultado:
      'Instalaciones funcionando en equipos modernos sin interrumpir la operación de los clientes ni migrar sus datos históricos.',
    tecnologias: [
      'C#',
      '.NET',
      'Windows Services',
      'Microsoft Access / DAO',
      'Migración x86 a x64',
      'Instaladores',
    ],
    metricas: [
      { valor: 'x64', etiqueta: 'migración sin downtime' },
      { valor: '0', etiqueta: 'pérdida de datos' },
    ],
    snippets: [],
  },
] as const;

/** Índice por slug para el detalle. Se construye una sola vez al cargar el módulo. */
const PROYECTOS_POR_SLUG = new Map(PROYECTOS.map((p) => [p.slug, p]));

export function buscarProyecto(slug: string | undefined): Proyecto | undefined {
  return slug ? PROYECTOS_POR_SLUG.get(slug) : undefined;
}

export const PROYECTOS_DESTACADOS = PROYECTOS.filter((p) => p.destacado);

/** Todas las tecnologías mencionadas, ordenadas por frecuencia de uso. */
export const TECNOLOGIAS_USADAS: readonly string[] = [
  ...new Set(PROYECTOS.flatMap((p) => p.tecnologias)),
].sort((a, b) => a.localeCompare(b, 'es'));
