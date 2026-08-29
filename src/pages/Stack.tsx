import { Link as RouterLink } from 'react-router-dom';
import { Box, Chip, Container, Paper, Stack as MuiStack, Typography } from '@mui/material';
import { STACK_POR_CATEGORIA } from '../data/stack';
import { buscarProyecto } from '../data/proyectos';

export default function Stack() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography variant="h1" sx={{ mb: 2, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
        Stack y conocimientos
      </Typography>
      <Typography variant="subtitle1" sx={{ maxWidth: 720, mb: 5 }}>
        Regla de esta página: si una tecnología no tiene al menos un proyecto detrás, no aparece.
        Cada una enlaza a los sistemas donde la apliqué de verdad.
      </Typography>

      <MuiStack spacing={4}>
        {STACK_POR_CATEGORIA.map(([categoria, tecnologias]) => (
          <Box key={categoria} component="section">
            <Typography variant="h2" sx={{ mb: 0.5, fontSize: '1.5rem' }}>
              {categoria}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              {tecnologias.length} {tecnologias.length === 1 ? 'tecnología' : 'tecnologías'}
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              }}
            >
              {tecnologias.map((t) => (
                <Paper key={t.nombre} variant="outlined" sx={{ p: 2.5 }}>
                  <Typography variant="h4" sx={{ mb: t.nota ? 0.75 : 1.5, fontSize: '1.05rem' }}>
                    {t.nombre}
                  </Typography>

                  {t.nota && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      {t.nota}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {t.proyectos.map((slug) => {
                      const proyecto = buscarProyecto(slug);
                      if (!proyecto) return null;
                      return (
                        <Chip
                          key={slug}
                          label={proyecto.nombre}
                          size="small"
                          variant="outlined"
                          clickable
                          component={RouterLink}
                          to={`/proyectos/${slug}`}
                        />
                      );
                    })}
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        ))}
      </MuiStack>
    </Container>
  );
}
