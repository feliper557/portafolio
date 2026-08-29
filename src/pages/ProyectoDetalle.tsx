import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Diagrama from '../components/Diagramas';
import SnippetCodigo from '../components/SnippetCodigo';
import { buscarProyecto } from '../data/proyectos';

/** Bloque narrativo del caso: el mismo formato para todos los proyectos. */
function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography
        variant="overline"
        sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.08em' }}
      >
        {titulo}
      </Typography>
      <Typography variant="body1" sx={{ mt: 0.5 }}>
        {children}
      </Typography>
    </Box>
  );
}

export default function ProyectoDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const proyecto = buscarProyecto(slug);

  // Slug inexistente: se redirige al listado en lugar de mostrar una página rota.
  if (!proyecto) return <Navigate to="/proyectos" replace />;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 7 } }}>
      <Button component={RouterLink} to="/proyectos" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
        Volver a proyectos
      </Button>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip label={proyecto.tipo} size="small" color="primary" variant="outlined" />
        <Chip label={proyecto.anio} size="small" variant="outlined" />
      </Stack>

      <Typography variant="h1" sx={{ fontSize: 'clamp(2rem, 5vw, 3rem)', mb: 1.5 }}>
        {proyecto.nombre}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        {proyecto.resumen}
      </Typography>

      {proyecto.metricas.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3, mb: 5 }}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: `repeat(${Math.min(proyecto.metricas.length, 4)}, 1fr)`,
              },
            }}
          >
            {proyecto.metricas.map((m) => (
              <Box key={m.etiqueta}>
                <Typography variant="h3" color="primary.main">
                  {m.valor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {m.etiqueta}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      <Seccion titulo="El problema">{proyecto.problema}</Seccion>
      <Seccion titulo="La solución">{proyecto.solucion}</Seccion>

      <Paper
        variant="outlined"
        sx={{ p: 3, mb: 4, borderLeftWidth: 4, borderLeftColor: 'primary.main' }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.08em' }}
        >
          La decisión técnica que lo sostiene
        </Typography>
        <Typography variant="body1" sx={{ mt: 0.5 }}>
          {proyecto.decision}
        </Typography>
      </Paper>

      <Seccion titulo="El resultado">{proyecto.resultado}</Seccion>

      {proyecto.diagrama && (
        <Box sx={{ my: 5 }}>
          <Diagrama tipo={proyecto.diagrama} />
        </Box>
      )}

      {proyecto.snippets.length > 0 && (
        <Box component="section" sx={{ my: 5 }}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            Cómo se ve por dentro
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Fragmentos del código real, con la razón de cada decisión.
          </Typography>
          <Stack spacing={2.5}>
            {proyecto.snippets.map((s) => (
              <SnippetCodigo key={s.titulo} snippet={s} />
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" sx={{ mb: 1.5 }}>
        Stack del proyecto
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 5 }}>
        {proyecto.tecnologias.map((t) => (
          <Chip
            key={t}
            label={t}
            size="small"
            component={RouterLink}
            to={`/proyectos?tech=${encodeURIComponent(t)}`}
            clickable
          />
        ))}
      </Box>

      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          ¿Necesitas algo parecido?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Cuéntame tu caso y te digo con franqueza si es viable y cuánto toma.
        </Typography>
        <Button component={RouterLink} to="/contacto" variant="contained">
          Hablemos
        </Button>
      </Paper>
    </Container>
  );
}
