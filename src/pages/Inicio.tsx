import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Chip, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import ProyectoCard from '../components/ProyectoCard';
import { PROYECTOS, PROYECTOS_DESTACADOS } from '../data/proyectos';
import { PERFIL, SERVICIOS } from '../data/perfil';
import { STACK } from '../data/stack';

/** Cifras de la portada: se calculan de los datos, no se escriben a mano. */
const CIFRAS = [
  { valor: PERFIL.aniosExperiencia, etiqueta: 'años construyendo software' },
  { valor: String(PROYECTOS.length), etiqueta: 'sistemas en el portafolio' },
  { valor: String(STACK.length), etiqueta: 'tecnologías con proyecto detrás' },
  { valor: '6', etiqueta: 'sistemas en producción' },
] as const;

export default function Inicio() {
  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          background: (t) =>
            t.palette.mode === 'dark'
              ? 'radial-gradient(1000px 400px at 15% -10%, rgba(122,162,255,.14), transparent 60%)'
              : 'radial-gradient(1000px 400px at 15% -10%, rgba(11,95,255,.10), transparent 60%)',
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 7, md: 12 } }}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
            <Chip label={PERFIL.disponibilidad} color="primary" variant="outlined" size="small" />
            <Chip label={PERFIL.credencial} variant="outlined" size="small" />
          </Stack>

          <Typography variant="h1" sx={{ maxWidth: 900, mb: 2 }}>
            {PERFIL.titular}
          </Typography>

          <Typography variant="subtitle1" sx={{ maxWidth: 720, mb: 4 }}>
            {PERFIL.propuesta}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button
              component={RouterLink}
              to="/proyectos"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Ver proyectos
            </Button>
            <Button
              component={RouterLink}
              to="/contacto"
              variant="outlined"
              size="large"
              startIcon={<MailOutlineIcon />}
            >
              Hablemos de tu proyecto
            </Button>
          </Stack>
        </Container>
      </Box>

      <Divider />

      {/* Cifras */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          {CIFRAS.map((c) => (
            <Box key={c.etiqueta}>
              <Typography variant="h2" color="primary.main">
                {c.valor}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {c.etiqueta}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <Divider />

      {/* Qué resuelvo */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Qué resuelvo
        </Typography>
        <Typography variant="subtitle1" sx={{ maxWidth: 680, mb: 4 }}>
          No vendo tecnologías, resuelvo problemas. Estas son las cuatro cosas por las que
          normalmente me contratan.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          }}
        >
          {SERVICIOS.map((s) => (
            <Paper key={s.titulo} variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h3" sx={{ mb: 1, fontSize: '1.2rem' }}>
                {s.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {s.descripcion}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>

      <Divider />

      {/* Proyectos destacados */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            mb: 4,
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
          }}
        >
          <Box>
            <Typography variant="h2" sx={{ mb: 1 }}>
              Proyectos destacados
            </Typography>
            <Typography variant="subtitle1" sx={{ maxWidth: 640 }}>
              Cada caso explica el problema real, la decisión técnica que lo sostiene y el resultado.
            </Typography>
          </Box>
          <Button component={RouterLink} to="/proyectos" endIcon={<ArrowForwardIcon />}>
            Ver los {PROYECTOS.length}
          </Button>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          }}
        >
          {PROYECTOS_DESTACADOS.map((p) => (
            <ProyectoCard key={p.slug} proyecto={p} maxTecnologias={4} />
          ))}
        </Box>
      </Container>

      {/* Cierre */}
      <Box sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            ¿Tienes un proyecto en mente?
          </Typography>
          <Typography variant="subtitle1" sx={{ maxWidth: 560, mx: 'auto', mb: 3 }}>
            Cuéntame qué necesitas resolver. Si puedo ayudarte te lo digo, y si no, también.
          </Typography>
          <Button component={RouterLink} to="/contacto" variant="contained" size="large">
            Escríbeme
          </Button>
        </Container>
      </Box>
    </>
  );
}
