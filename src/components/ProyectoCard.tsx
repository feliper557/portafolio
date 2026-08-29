import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Proyecto } from '../data/tipos';

interface Props {
  readonly proyecto: Proyecto;
  /** Máximo de chips de tecnología antes de resumir con "+N". */
  readonly maxTecnologias?: number;
}

const COLOR_TIPO = {
  Propio: 'primary',
  Cliente: 'secondary',
  Profesional: 'success',
  'Prueba técnica': 'default',
} as const;

export default function ProyectoCard({ proyecto, maxTecnologias = 5 }: Props) {
  const visibles = proyecto.tecnologias.slice(0, maxTecnologias);
  const restantes = proyecto.tecnologias.length - visibles.length;

  return (
    <Card sx={{ height: '100%', transition: 'border-color .2s', '&:hover': { borderColor: 'primary.main' } }}>
      <CardActionArea
        component={RouterLink}
        to={`/proyectos/${proyecto.slug}`}
        sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <Chip label={proyecto.tipo} size="small" color={COLOR_TIPO[proyecto.tipo]} variant="outlined" />
          <Chip label={proyecto.anio} size="small" variant="outlined" />
        </Stack>

        <Typography variant="h3" sx={{ mb: 1 }}>
          {proyecto.nombre}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {proyecto.resumen}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
          {visibles.map((t) => (
            <Chip key={t} label={t} size="small" />
          ))}
          {restantes > 0 && <Chip label={`+${restantes}`} size="small" variant="outlined" />}
        </Box>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'primary.main' }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Ver el caso completo
          </Typography>
          <ArrowForwardIcon fontSize="small" />
        </Stack>
      </CardActionArea>
    </Card>
  );
}
