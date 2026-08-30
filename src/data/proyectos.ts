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
    slug: 'facturacion-electronica-dian',
    nombre: 'Núcleo de facturación electrónica DIAN y SUNAT',
    resumen:
      'El motor fiscal de un ERP contable: construye, firma y envía los documentos electrónicos de miles de empresas ante las autoridades tributarias de Colombia y Perú.',
    tipo: 'Profesional',
    anio: '2021 – 2026',
    destacado: true,
    problema:
      'La facturación electrónica no admite “casi bien”. Un atributo fuera de lugar en el XML, una firma mal construida o un identificador mal calculado y la autoridad tributaria rechaza el documento: la empresa no puede facturar, y no facturar es no vender. A eso se suma que el catálogo no para de crecer —documento soporte, documentos equivalentes POS, notas crédito y débito, exportación, sector transporte, sector salud, AIU, retenciones— y que cada país tiene su propio esquema y su propia forma de firmar.',
    solucion:
      'Construí y mantengo el núcleo que resuelve el ciclo completo: armado del XML bajo el estándar UBL 2.1, cálculo de los identificadores únicos de cada documento, firma digital XAdES con certificado, envío a la autoridad, comparación de la respuesta contra lo enviado, generación del PDF con su código QR, envío del correo con los adjuntos y reproceso automático de lo que quedó a medias. Cubre facturación electrónica, nómina electrónica y los eventos de factura como título valor.',
    decision:
      'El diálogo con la autoridad tributaria es SOAP, un protocolo de otra época que no se puede cambiar de forma unilateral: del otro lado hay una entidad estatal. La tentación era dejar ese núcleo congelado en el framework antiguo para siempre. En vez de eso lo reescribí sobre .NET moderno usando CoreWCF, que permite seguir hablando SOAP exactamente igual mientras el resto del código gana inyección de dependencias, acceso a datos moderno y pruebas. El contrato hacia afuera no cambió ni un carácter; hacia adentro cambió todo. Los errores de la autoridad, por su parte, no se resuelven con una cadena de condicionales que nadie se atreve a tocar: cada tipo de error es una estrategia independiente que una factoría selecciona.',
    resultado:
      'Miles de empresas facturando a diario contra dos autoridades tributarias, con reprocesos automáticos que resuelven las caídas del servicio estatal sin intervención humana, y un núcleo que hoy corre sobre .NET moderno sin que ningún consumidor tuviera que migrar.',
    tecnologias: [
      'C# / .NET 8',
      'CoreWCF',
      'WCF / SOAP',
      'UBL 2.1',
      'Firma XAdES',
      'BouncyCastle',
      'Certificados X.509',
      'EF Core',
      'SQL Server',
      'Azure Blob Storage',
      'Azure Functions',
      'Strategy + Factory',
    ],
    metricas: [
      { valor: '2', etiqueta: 'autoridades tributarias' },
      { valor: '15', etiqueta: 'tipos de evento de título valor' },
      { valor: '11', etiqueta: 'estrategias de error' },
      { valor: '0', etiqueta: 'contratos rotos al modernizar' },
    ],
    snippets: [
      {
        titulo: 'Cada error de la autoridad es una clase, no un caso más del switch',
        lenguaje: 'csharp',
        explicacion:
          'La autoridad devuelve decenas de códigos de rechazo distintos, y aparecen nuevos cada resolución. Con estrategias registradas, soportar uno nuevo es añadir una clase: el orquestador no se toca y no hay riesgo de romper el manejo de los demás.',
        codigo: `public interface IEstrategiaErrorDian
{
    bool Aplica(string codigo);
    Task<ResultadoReproceso> ResolverAsync(DocumentoElectronico doc, CancellationToken ct);
}

public sealed class FabricaEstrategiasError
{
    private readonly IEnumerable<IEstrategiaErrorDian> _estrategias;

    public IEstrategiaErrorDian Resolver(string codigo) =>
        _estrategias.FirstOrDefault(e => e.Aplica(codigo))
            ?? throw new ErrorDianNoReconocidoException(codigo);
}`,
      },
      {
        titulo: 'SOAP heredado sobre .NET moderno',
        lenguaje: 'csharp',
        explicacion:
          'CoreWCF expone el mismo contrato SOAP de siempre desde .NET moderno. Para la autoridad tributaria nada cambió; del lado de acá el servicio ya recibe sus dependencias por inyección y es comprobable con pruebas.',
        codigo: `builder.Services.AddServiceModelServices();

app.UseServiceModel(serviceBuilder =>
{
    serviceBuilder.AddService<ServicioFacturacionElectronica>();
    serviceBuilder.AddServiceEndpoint<ServicioFacturacionElectronica, IFacturacionElectronica>(
        new BasicHttpBinding(BasicHttpSecurityMode.Transport),
        "/FacturacionElectronica.svc");
});`,
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
    destacado: false,
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
      '.NET Framework',
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
    slug: 'identidad-terceros',
    nombre: 'Microservicios de identidad de terceros',
    resumen:
      'Resuelve quién es un tercero a partir de su número de documento, cruzando la base propia, el servicio de la autoridad tributaria y fuentes públicas.',
    tipo: 'Profesional',
    anio: '2024 – 2026',
    destacado: false,
    problema:
      'Para emitir una factura hay que saber exactamente a nombre de quién se emite, y el dato llega mal: nombres abreviados, apellidos en desorden, razones sociales con puntuación distinta cada vez. Consultar la fuente oficial en cada operación es lento y frágil. Peor aún: cuando un dato cambia, hay que distinguir si el tercero realmente se llama distinto ahora o si solo lo escribieron de otra forma, porque actualizar por cada variación tipográfica genera ruido interminable.',
    solucion:
      'Un conjunto de microservicios que consulta en cascada: primero la base propia, después las transacciones ya existentes, luego el servicio de la autoridad tributaria y por último las fuentes públicas. Cada capa responde más rápido que la siguiente y solo se baja un escalón si hace falta. Un servicio aparte consume una cola de mensajes para actualizar en segundo plano sin bloquear a nadie.',
    decision:
      'La comparación de nombres no se hace por igualdad de texto, porque “Rodríguez Martínez Luis F.” y “LUIS FELIPE RODRIGUEZ MARTINEZ” son la misma persona escrita de dos maneras. Un servicio en Python convierte ambos nombres a vectores semánticos y mide su similitud: por encima del umbral es la misma identidad escrita distinto y no se toca nada, por debajo es un cambio real que sí debe registrarse. Eso eliminó de raíz las actualizaciones falsas. La descomposición de un nombre en sus partes tampoco es un algoritmo único: nombres de una, dos, tres o más palabras se resuelven con estrategias distintas ensambladas explícitamente al arrancar.',
    resultado:
      'Identificación resuelta en milisegundos en el caso común, sin golpear la fuente oficial, y con las actualizaciones por variación de escritura eliminadas. Cada servicio va en su contenedor y los secretos viven en el almacén de claves, nunca en el repositorio.',
    tecnologias: [
      'C# / .NET 8',
      'Minimal API',
      'RabbitMQ',
      'Python',
      'FastAPI',
      'Embeddings',
      'EF Core',
      'SQL Server',
      'Azure Key Vault',
      'Docker',
      'API Key',
      'Rate limiting',
    ],
    metricas: [
      { valor: '4', etiqueta: 'fuentes consultadas en cascada' },
      { valor: '3', etiqueta: 'microservicios independientes' },
      { valor: '0', etiqueta: 'secretos en el repositorio' },
    ],
    snippets: [
      {
        titulo: 'Un cambio real no es lo mismo que otra forma de escribirlo',
        lenguaje: 'python',
        explicacion:
          'Los dos nombres se convierten en vectores semánticos y se compara su ángulo. Por encima del umbral se considera la misma identidad, así que no se genera una actualización que solo sería ruido.',
        codigo: `UMBRAL_MISMA_IDENTIDAD = 0.92

def es_cambio_real(nombre_actual: str, nombre_nuevo: str) -> bool:
    """True solo si el nombre cambió de verdad, no si lo escribieron distinto."""
    vectores = modelo.encode([normalizar(nombre_actual), normalizar(nombre_nuevo)])
    similitud = float(util.cos_sim(vectores[0], vectores[1]))
    return similitud < UMBRAL_MISMA_IDENTIDAD`,
      },
      {
        titulo: 'La clave de API se valida antes de tocar el endpoint',
        lenguaje: 'csharp',
        explicacion:
          'Un filtro de endpoint corta la petición sin credencial válida antes de que llegue al manejador. La autorización no se repite en cada endpoint ni depende de que nadie la olvide.',
        codigo: `public sealed class ApiKeyEndpointFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext contexto, EndpointFilterDelegate siguiente)
    {
        var recibida = contexto.HttpContext.Request.Headers["X-Api-Key"];
        if (!_validador.EsValida(recibida))
            return Results.Problem(statusCode: StatusCodes.Status401Unauthorized);

        return await siguiente(contexto);
    }
}`,
      },
    ],
  },

  {
    slug: 'facturacion-salud-rips',
    nombre: 'Facturación electrónica del sector salud',
    resumen:
      'Integra el ERP con la plataforma del Ministerio de Salud para radicar facturas con su soporte clínico y recuperar el código que las valida.',
    tipo: 'Profesional',
    anio: '2025 – 2026',
    destacado: false,
    problema:
      'Una institución de salud no cobra con la factura sola: debe radicarla acompañada del detalle de cada servicio prestado a cada usuario. El paquete resultante pesa varios megas, llega comprimido, y cualquier inconsistencia se traduce en una glosa que retrasa el pago semanas. Además la plataforma estatal expone más de una decena de operaciones distintas según se trate de una factura, una nota de ajuste, un acuerdo de voluntades o una capitación.',
    solucion:
      'Una API en .NET 8 con arquitectura por capas concéntricas que recibe el paquete comprimido, lo valida antes de enviar nada, lo radica ante la plataforma estatal, recupera el código único que acredita la validación y administra las observaciones y rechazos que devuelve. Una función complementaria arma el correo con los soportes y lo envía.',
    decision:
      'Validar en casa antes de enviar. La plataforma estatal es lenta y sus mensajes de error son crípticos, así que cada regla que se pueda comprobar localmente se comprueba con validación declarativa antes de gastar un viaje de red: el usuario recibe un error entendible en segundos en lugar de un rechazo incomprensible minutos después. El tipo de usuario del paquete tampoco se resuelve con condicionales anidados sino con una estrategia por tipo, porque la norma cambia y cambia seguido. Y ninguna cadena de conexión vive en el repositorio: todos los secretos se resuelven contra el almacén de claves en el arranque.',
    resultado:
      'Radicación automatizada del ciclo completo, con los rechazos detectados antes del envío y el código de validación recuperado y almacenado sin intervención manual.',
    tecnologias: [
      'C# / .NET 8',
      'Minimal API',
      'Onion Architecture',
      'FluentValidation',
      'EF Core',
      'SQL Server',
      'Azure Key Vault',
      'Azure Functions',
      'AWS SES',
      'Strategy + Factory',
    ],
    metricas: [
      { valor: '16', etiqueta: 'operaciones de la plataforma estatal' },
      { valor: '3', etiqueta: 'contextos de datos' },
      { valor: 'gzip', etiqueta: 'paquetes de gran tamaño' },
    ],
    snippets: [
      {
        titulo: 'Los secretos se resuelven en el arranque, no se versionan',
        lenguaje: 'csharp',
        explicacion:
          'La configuración se completa desde el almacén de claves antes de construir la aplicación. El repositorio no contiene ninguna cadena de conexión, y rotar una credencial no exige recompilar ni desplegar.',
        codigo: `builder.Configuration.AddAzureKeyVault(
    new Uri(builder.Configuration["KeyVault:Uri"]
        ?? throw new InvalidOperationException("KeyVault:Uri sin configurar")),
    new DefaultAzureCredential());

builder.Services
    .AddOptions<OpcionesPlataformaSalud>()
    .BindConfiguration("PlataformaSalud")
    .ValidateDataAnnotations()
    .ValidateOnStart();   // si falta algo, no arranca: mejor que fallar en la primera radicación`,
      },
    ],
  },

  {
    slug: 'portal-saas-crm',
    nombre: 'Portal SaaS y CRM de un ERP contable',
    resumen:
      'El portal donde los clientes compran, renuevan y administran su licencia, y donde la empresa gestiona su operación comercial.',
    tipo: 'Profesional',
    anio: '2021 – 2026',
    destacado: false,
    problema:
      'Un ERP vendido por licencias necesita mucho más que un botón de pago: catálogo y cotizaciones, renovaciones, activación de instancias, seguimiento comercial, capacitaciones, certificaciones, tickets de soporte y facturación de todo lo anterior. Todo eso creció durante años sobre tecnología web de generaciones distintas y siguió en producción, con clientes reales pagando a través de él todos los días.',
    solucion:
      'Portal con más de cuarenta módulos de negocio que sostengo y amplío: licenciamiento, cotizaciones, seguimiento comercial, capacitaciones, tickets, encuestas, agenda, tableros y campañas. Convive tecnología de varias épocas sobre una misma base, con trabajos programados que ejecutan la facturación recurrente y las notificaciones, y notificaciones en vivo hacia el navegador.',
    decision:
      'Cuatro pasarelas de pago distintas, cada una con su propia forma de cobrar, tokenizar una tarjeta y notificar el resultado. Meterlas en el flujo de cobro habría convertido ese flujo en un nudo imposible de tocar. Cada pasarela está detrás de una estrategia con la misma interfaz: el flujo de cobro no sabe con cuál está hablando, y añadir una quinta no obliga a modificar ni una línea del código que ya funciona. Cuando una pasarela cae, se conmuta a otra por configuración en lugar de por despliegue.',
    resultado:
      'Cobro en línea operativo por cuatro vías simultáneas, renovaciones y facturación recurrente ejecutándose solas, y una base heredada que sigue evolucionando en lugar de congelarse.',
    tecnologias: [
      '.NET Framework',
      'ASP.NET MVC 5',
      'Web Forms',
      'OWIN',
      'SignalR',
      'Hangfire',
      'Entity Framework 6',
      'SQL Server',
      'Pasarelas de pago',
      'AWS SES',
      'Strategy + Factory',
    ],
    metricas: [
      { valor: '40+', etiqueta: 'módulos de negocio' },
      { valor: '4', etiqueta: 'pasarelas de pago' },
      { valor: '7', etiqueta: 'bases de datos integradas' },
    ],
    snippets: [
      {
        titulo: 'El flujo de cobro no sabe qué pasarela está usando',
        lenguaje: 'csharp',
        explicacion:
          'Una interfaz común y un selector por configuración. Añadir una pasarela es escribir una clase; conmutar de proveedor cuando uno falla es cambiar un valor, no desplegar una versión.',
        codigo: `public interface IPasarelaPago
{
    string Codigo { get; }
    Task<ResultadoPago> CobrarAsync(SolicitudPago solicitud, CancellationToken ct);
    Task<ResultadoPago> ConsultarAsync(string referencia, CancellationToken ct);
}

public sealed class SelectorPasarela(IEnumerable<IPasarelaPago> pasarelas,
                                     IOptionsMonitor<OpcionesCobro> opciones)
{
    public IPasarelaPago Activa() =>
        pasarelas.Single(p => p.Codigo == opciones.CurrentValue.PasarelaPreferida);
}`,
      },
    ],
  },

  {
    slug: 'mantenimiento-erp-legacy',
    nombre: 'Asistente y modernización de un ERP de escritorio',
    resumen:
      'Aplicación de escritorio que se acopla en vivo al ERP heredado para configurar empresas, contabilizar, facturar y migrar sus datos a la nube.',
    tipo: 'Profesional',
    anio: '2021 – 2026',
    destacado: false,
    problema:
      'Un ERP contable con años en producción y cientos de empresas encima seguía funcionando sobre una base de escritorio de generación anterior. Reescribirlo no era una opción —esas empresas facturan todos los días con él— pero tampoco podía quedarse quieto: hacían falta funcionalidades nuevas (nómina electrónica, facturación electrónica, informes, migración a la nube) y los componentes de 32 bits dejaron de funcionar en equipos modernos.',
    solucion:
      'Una aplicación de escritorio en arquitectura por capas estricta que actúa como asistente del sistema heredado: se acopla a la instancia que el usuario ya tiene abierta y opera sobre ella. Cubre configuración inicial de empresas, terceros, inventarios, contabilización, nómina, facturación electrónica, informes y la migración de los datos históricos a la nube. En paralelo, la migración de los módulos afectados a 64 bits, actualizadores que llevan cada instalación a la versión correcta sin visita técnica y un servicio que vigila la disponibilidad y deja registro.',
    decision:
      'No reemplazar el sistema: acoplarse a él. La aplicación se adjunta en tiempo de ejecución a la instancia viva del ERP mediante interoperabilidad de componentes, lee y escribe sobre su base heredada y a la vez opera contra el motor de datos moderno. El usuario ve una sola herramienta; por dentro conviven dos generaciones de tecnología. Cada cambio se aísla al módulo afectado y se entrega con un actualizador reversible, porque en un ERP contable una migración fallida no es un error: es una empresa que mañana no puede facturar.',
    resultado:
      'Funcionalidad nueva entregada durante años sobre un sistema que nunca dejó de operar, instalaciones corriendo en equipos modernos y datos históricos migrados a la nube sin pérdida ni interrupción del servicio.',
    tecnologias: [
      '.NET Framework',
      'WinForms',
      'COM / Interop',
      'Microsoft Access / DAO',
      'Dapper',
      'ADO.NET',
      'SQL Server',
      'Windows Services',
      'WCF / SOAP',
      'Migración x86 a x64',
      'Instaladores',
    ],
    metricas: [
      { valor: '8', etiqueta: 'años de evolución continua' },
      { valor: 'x64', etiqueta: 'migración sin downtime' },
      { valor: '0', etiqueta: 'pérdida de datos' },
    ],
    snippets: [
      {
        titulo: 'Acoplarse al sistema que ya está abierto',
        lenguaje: 'csharp',
        explicacion:
          'En lugar de abrir su propia sesión y competir por los bloqueos del archivo, la aplicación localiza la ventana del ERP en ejecución y obtiene su objeto de automatización. Trabaja sobre la instancia que el usuario ya tiene abierta, con sus datos y sus permisos.',
        codigo: `private const uint OBJID_NATIVEOM = 0xFFFFFFF0;

public static Application? ObtenerInstanciaViva(IntPtr ventana)
{
    var iid = typeof(Application).GUID;
    var resultado = AccessibleObjectFromWindow(ventana, OBJID_NATIVEOM, ref iid, out var obj);

    // Sin instancia abierta no se inventa una: el llamador decide qué hacer.
    return resultado == 0 ? obj as Application : null;
}`,
      },
    ],
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
