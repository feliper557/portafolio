import { Box, Paper, Typography, useTheme } from '@mui/material';
import type { Proyecto } from '../data/tipos';

/**
 * Diagramas de arquitectura dibujados como SVG inline: escalan sin perder nitidez,
 * heredan los colores del tema y no cargan ninguna librería externa.
 */

interface ColoresDiagrama {
  readonly caja: string;
  readonly borde: string;
  readonly texto: string;
  readonly tenue: string;
  readonly acento: string;
  readonly linea: string;
}

function useColores(): ColoresDiagrama {
  const t = useTheme();
  return {
    caja: t.palette.background.paper,
    borde: t.palette.divider,
    texto: t.palette.text.primary,
    tenue: t.palette.text.secondary,
    acento: t.palette.primary.main,
    linea: t.palette.text.secondary,
  };
}

interface CajaProps {
  readonly x: number;
  readonly y: number;
  readonly w?: number;
  readonly h?: number;
  readonly titulo: string;
  readonly sub?: string;
  readonly acento?: boolean;
  readonly c: ColoresDiagrama;
}

function Caja({ x, y, w = 150, h = 54, titulo, sub, acento = false, c }: CajaProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={c.caja}
        stroke={acento ? c.acento : c.borde}
        strokeWidth={acento ? 2 : 1.25}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        fill={c.texto}
        fontSize={13}
        fontWeight={600}
      >
        {titulo}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fill={c.tenue} fontSize={10.5}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Flecha({
  d,
  c,
  etiqueta,
  ex,
  ey,
  punteada = false,
}: {
  d: string;
  c: ColoresDiagrama;
  etiqueta?: string;
  ex?: number;
  ey?: number;
  punteada?: boolean;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={c.linea}
        strokeWidth={1.5}
        strokeDasharray={punteada ? '5 4' : undefined}
        markerEnd="url(#punta)"
      />
      {etiqueta && ex !== undefined && ey !== undefined && (
        <text x={ex} y={ey} textAnchor="middle" fill={c.tenue} fontSize={10.5}>
          {etiqueta}
        </text>
      )}
    </g>
  );
}

function Lienzo({ children, alto, c }: { children: React.ReactNode; alto: number; c: ColoresDiagrama }) {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Box
        component="svg"
        viewBox={`0 0 700 ${alto}`}
        role="img"
        sx={{ width: '100%', minWidth: 560, height: 'auto', display: 'block' }}
      >
        <defs>
          <marker id="punta" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={c.linea} />
          </marker>
        </defs>
        {children}
      </Box>
    </Box>
  );
}

function DiagramaServerless() {
  const c = useColores();
  return (
    <Lienzo alto={330} c={c}>
      <Caja c={c} x={20} y={130} titulo="PWA React 19" sub="instalable en el celular" acento />
      <Flecha c={c} d="M 175 157 L 240 157" />
      <Caja c={c} x={245} y={130} titulo="Static Web Apps" sub="CDN + rutas SPA" />
      <Flecha c={c} d="M 400 157 L 465 157" etiqueta="JWT" ex={432} ey={148} />
      <Caja c={c} x={470} y={130} titulo="Azure Functions" sub="27 funciones · .NET 8" acento />
      <Flecha c={c} d="M 545 189 L 545 240" />
      <Caja c={c} x={470} y={245} titulo="Cosmos DB" sub="datos del torneo" />

      <Caja c={c} x={470} y={25} w={150} h={48} titulo="Timer: SyncResults" sub="cierra partidos y puntúa" />
      <Flecha c={c} d="M 545 76 L 545 125" punteada />

      <Caja c={c} x={245} y={25} w={150} h={48} titulo="Pasarela de pago" sub="webhook firmado" />
      <Flecha c={c} d="M 397 55 L 465 55" punteada etiqueta="webhook" ex={432} ey={45} />

      <Caja c={c} x={20} y={245} w={150} h={48} titulo="GitHub Actions" sub="push a main → producción" />
      <Flecha c={c} d="M 175 268 L 300 268 L 320 200" punteada etiqueta="CI/CD" ex={245} ey={260} />
    </Lienzo>
  );
}

function DiagramaApiMonolito() {
  const c = useColores();
  return (
    <Lienzo alto={310} c={c}>
      <Caja c={c} x={20} y={130} titulo="SPA React 19" sub="TypeScript + Tailwind" acento />
      <Flecha c={c} d="M 175 157 L 235 157" />
      <Caja c={c} x={240} y={130} w={130} titulo="nginx" sub="proxy /api" />
      <Flecha c={c} d="M 375 157 L 435 157" />
      <Caja c={c} x={440} y={130} titulo="API .NET 10" sub="Minimal API" acento />
      <Flecha c={c} d="M 515 189 L 515 235" />
      <Caja c={c} x={440} y={240} titulo="PostgreSQL 17" sub="restricción de exclusión" />

      <Caja c={c} x={440} y={20} w={150} h={44} titulo="Pasarela de pago" />
      <Flecha c={c} d="M 515 67 L 515 125" punteada etiqueta="webhook firmado" ex={585} ey={100} />

      <Caja c={c} x={230} y={240} w={150} h={44} titulo="Firebase Auth" />
      <Flecha c={c} d="M 305 238 L 305 190 L 435 165" punteada etiqueta="valida JWT" ex={330} ey={205} />

      <Caja c={c} x={230} y={20} w={150} h={44} titulo="Correo + Calendar" sub="vía outbox" />
      <Flecha c={c} d="M 470 128 L 400 70" punteada />
    </Lienzo>
  );
}

interface Props {
  readonly tipo: NonNullable<Proyecto['diagrama']>;
}

export default function Diagrama({ tipo }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Arquitectura
      </Typography>
      {tipo === 'serverless-azure' ? <DiagramaServerless /> : <DiagramaApiMonolito />}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Las líneas punteadas son flujos que ocurren solos, sin que nadie esté usando la aplicación.
      </Typography>
    </Paper>
  );
}
