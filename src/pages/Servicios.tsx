import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircleOutlined';
import { MODALIDADES, PROCESO, SERVICIOS } from '../data/perfil';

export default function Servicios() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography variant="h1" sx={{ mb: 2, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
        Servicios
      </Typography>
      <Typography variant="subtitle1" sx={{ maxWidth: 720, mb: 5 }}>
        Trabajo con empresas y emprendedores que necesitan software que funcione y siga funcionando.
        Estos son los frentes en los que puedo ayudarte y qué recibes en cada uno.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          mb: 8,
        }}
      >
        {SERVICIOS.map((s) => (
          <Paper key={s.titulo} variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h3" sx={{ mb: 1, fontSize: '1.2rem' }}>
              {s.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
              {s.descripcion}
            </Typography>

            <Divider sx={{ mb: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Qué recibes
            </Typography>
            <List dense disablePadding>
              {s.entregables.map((e) => (
                <ListItem key={e} disableGutters sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={e} slotProps={{ primary: { variant: 'body2' } }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}
      </Box>

      {/* Proceso */}
      <Typography variant="h2" sx={{ mb: 1 }}>
        Cómo trabajo
      </Typography>
      <Typography variant="subtitle1" sx={{ maxWidth: 680, mb: 4 }}>
        Cuatro pasos, sin misterio. El objetivo es que en todo momento sepas en qué va tu proyecto y
        cuánto falta.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          mb: 8,
        }}
      >
        {PROCESO.map((paso) => (
          <Box key={paso.numero}>
            <Typography variant="h2" sx={{ color: 'primary.main', opacity: 0.35, mb: 0.5 }}>
              {paso.numero}
            </Typography>
            <Typography variant="h4" sx={{ mb: 0.75 }}>
              {paso.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {paso.descripcion}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Modalidades */}
      <Typography variant="h2" sx={{ mb: 1 }}>
        Modalidades de contratación
      </Typography>
      <Typography variant="subtitle1" sx={{ maxWidth: 680, mb: 4 }}>
        El precio depende del alcance. Te lo doy por escrito antes de empezar, nunca sobre la marcha.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          mb: 6,
        }}
      >
        {MODALIDADES.map((m) => (
          <Paper key={m.titulo} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {m.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {m.descripcion}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Cuéntame qué necesitas
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto', mb: 3 }}>
          Una primera conversación no cuesta nada y suele aclarar bastante el alcance real.
        </Typography>
        <Button component={RouterLink} to="/contacto" variant="contained" size="large">
          Ir a contacto
        </Button>
      </Paper>
    </Container>
  );
}
