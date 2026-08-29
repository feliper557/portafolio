import { Box, Chip, Container, Typography } from '@mui/material';
import ProyectoCard from '../components/ProyectoCard';
import { useFiltroProyectos } from '../hooks/useFiltroProyectos';

export default function Proyectos() {
  const { tecnologiaActiva, proyectos, tecnologiasDisponibles, filtrarPor } = useFiltroProyectos();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography variant="h1" sx={{ mb: 2, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
        Proyectos
      </Typography>
      <Typography variant="subtitle1" sx={{ maxWidth: 720, mb: 4 }}>
        Sistemas que construí de punta a punta. Los de cliente están descritos sin nombrar a la
        empresa: lo que importa aquí es el problema, la arquitectura y el resultado.
      </Typography>

      {/* El filtro se refleja en la URL, así que este enlace se puede compartir. */}
      <Box component="section" aria-label="Filtrar por tecnología" sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Filtrar por tecnología
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          <Chip
            label="Todas"
            size="small"
            color={tecnologiaActiva ? 'default' : 'primary'}
            variant={tecnologiaActiva ? 'outlined' : 'filled'}
            onClick={() => filtrarPor(null)}
          />
          {tecnologiasDisponibles.map((t) => {
            const activa = t === tecnologiaActiva;
            return (
              <Chip
                key={t}
                label={t}
                size="small"
                color={activa ? 'primary' : 'default'}
                variant={activa ? 'filled' : 'outlined'}
                onClick={() => filtrarPor(activa ? null : t)}
              />
            );
          })}
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} aria-live="polite">
        {proyectos.length} {proyectos.length === 1 ? 'proyecto' : 'proyectos'}
        {tecnologiaActiva ? ` con ${tecnologiaActiva}` : ''}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        }}
      >
        {proyectos.map((p) => (
          <ProyectoCard key={p.slug} proyecto={p} />
        ))}
      </Box>
    </Container>
  );
}
