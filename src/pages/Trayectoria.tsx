import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircleOutlined';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import VerifiedIcon from '@mui/icons-material/VerifiedOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  CERTIFICACIONES,
  CERTIFICACIONES_POR_AREA,
  FORMACION_ACADEMICA,
  METODOLOGIAS,
} from '../data/formacion';

export default function Trayectoria() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography variant="h1" sx={{ mb: 2, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
        Trayectoria y formación
      </Typography>
      <Typography variant="subtitle1" sx={{ maxWidth: 720, mb: 6 }}>
        Título profesional, metodologías que aplico a diario en un producto en producción y
        certificaciones con diploma público. Todo lo que aparece aquí se puede verificar.
      </Typography>

      {/* Formación académica */}
      <Box component="section" sx={{ mb: 8 }}>
        <Typography variant="h2" sx={{ mb: 1, fontSize: '1.5rem' }}>
          Formación académica
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 680, mb: 3 }}>
          Ingeniería de sistemas, con la matrícula que habilita el ejercicio profesional en Colombia.
        </Typography>

        <Stack spacing={2.5}>
          {FORMACION_ACADEMICA.map((t) => (
            <Paper key={t.titulo} variant="outlined" sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                <SchoolIcon color="primary" />
                <Box>
                  <Typography variant="h3" sx={{ mb: 0.5, fontSize: '1.2rem' }}>
                    {t.titulo}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    {t.institucion} · {t.anio}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {t.detalle}
                  </Typography>
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Tarjeta profesional vigente"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ mb: 8 }} />

      {/* Metodologías */}
      <Box component="section" sx={{ mb: 8 }}>
        <Typography variant="h2" sx={{ mb: 1, fontSize: '1.5rem' }}>
          Metodologías de desarrollo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 680, mb: 3 }}>
          Nombrar una metodología es fácil. Debajo de cada una está la práctica concreta que la
          sostiene en el día a día de un sistema con clientes reales encima.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          }}
        >
          {METODOLOGIAS.map((m) => (
            <Paper
              key={m.titulo}
              variant="outlined"
              sx={{ p: 3, display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant="h3" sx={{ mb: 1, fontSize: '1.2rem' }}>
                {m.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                {m.descripcion}
              </Typography>

              <Divider sx={{ mb: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                En la práctica
              </Typography>
              <List dense disablePadding>
                {m.practicas.map((p) => (
                  <ListItem key={p} disableGutters sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={p} slotProps={{ primary: { variant: 'body2' } }} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
        </Box>
      </Box>

      <Divider sx={{ mb: 8 }} />

      {/* Certificaciones */}
      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 1, fontSize: '1.5rem' }}>
          Certificaciones
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 680, mb: 3 }}>
          {CERTIFICACIONES.length} cursos aprobados. Cada uno enlaza a su diploma público: se
          verifican sin pedirme nada.
        </Typography>

        <Stack spacing={4}>
          {CERTIFICACIONES_POR_AREA.map(([area, certificaciones]) => (
            <Box key={area}>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                {area}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {certificaciones.length} {certificaciones.length === 1 ? 'curso' : 'cursos'}
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                }}
              >
                {certificaciones.map((c) => (
                  <Paper key={c.url} variant="outlined" sx={{ p: 2.5 }}>
                    <Typography variant="h4" sx={{ mb: 0.5, fontSize: '1.05rem' }}>
                      {c.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      {c.emisor}
                    </Typography>
                    <Link
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                    >
                      Ver diploma
                      <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                    </Link>
                  </Paper>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Así se ve aplicado
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: 'auto', mb: 3 }}>
          Estas prácticas no son teoría: cada proyecto del portafolio explica la decisión técnica que
          lo sostiene y cómo se verificó.
        </Typography>
        <Button component={RouterLink} to="/proyectos" variant="contained" size="large">
          Ver proyectos
        </Button>
      </Paper>
    </Container>
  );
}
