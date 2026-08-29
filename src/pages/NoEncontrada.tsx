import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';

export default function NoEncontrada() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 14 }, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ color: 'primary.main', mb: 1 }}>
        404
      </Typography>
      <Typography variant="h2" sx={{ mb: 2, fontSize: '1.5rem' }}>
        Esta página no existe
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Puede que el enlace esté mal escrito o que la página haya cambiado de sitio.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'center' }}>
        <Button component={RouterLink} to="/" variant="contained">
          Ir al inicio
        </Button>
        <Button component={RouterLink} to="/proyectos" variant="outlined">
          Ver proyectos
        </Button>
      </Stack>
    </Container>
  );
}
