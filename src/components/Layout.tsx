import { useState } from 'react';
import { Link as RouterLink, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import { useColorMode } from '../hooks/useColorMode';
import { PERFIL } from '../data/perfil';

const NAVEGACION = [
  { texto: 'Inicio', a: '/' },
  { texto: 'Proyectos', a: '/proyectos' },
  { texto: 'Stack', a: '/stack' },
  { texto: 'Servicios', a: '/servicios' },
  { texto: 'Contacto', a: '/contacto' },
] as const;

export default function Layout() {
  const [abierto, setAbierto] = useState(false);
  const { modo, alternar } = useColorMode();
  const theme = useTheme();
  const esMovil = useMediaQuery(theme.breakpoints.down('md'));
  const { pathname } = useLocation();

  const esActivo = (a: string) => (a === '/' ? pathname === '/' : pathname.startsWith(a));

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Salto directo al contenido: navegación por teclado sin recorrer el menú entero. */}
      <Link
        href="#contenido"
        sx={{
          position: 'absolute',
          left: -9999,
          top: 8,
          zIndex: 2000,
          px: 2,
          py: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          '&:focus': { left: 8 },
        }}
      >
        Saltar al contenido
      </Link>

      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1 }}>
            <Typography
              component={RouterLink}
              to="/"
              variant="h4"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'text.primary',
                fontSize: '1.05rem',
                letterSpacing: '-0.02em',
              }}
            >
              {PERFIL.nombre}
              <Box component="span" sx={{ color: 'primary.main' }}>
                .
              </Box>
            </Typography>

            {!esMovil && (
              <Stack direction="row" spacing={0.5} component="nav" aria-label="Principal">
                {NAVEGACION.map((item) => (
                  <Button
                    key={item.a}
                    component={NavLink}
                    to={item.a}
                    size="small"
                    sx={{
                      color: esActivo(item.a) ? 'primary.main' : 'text.secondary',
                      fontWeight: esActivo(item.a) ? 700 : 500,
                    }}
                  >
                    {item.texto}
                  </Button>
                ))}
              </Stack>
            )}

            <IconButton
              onClick={alternar}
              aria-label={modo === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
              size="small"
            >
              {modo === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {esMovil && (
              <IconButton onClick={() => setAbierto(true)} aria-label="Abrir menú" size="small">
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={abierto} onClose={() => setAbierto(false)}>
        <Box sx={{ width: 260 }} role="presentation">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setAbierto(false)} aria-label="Cerrar menú">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {NAVEGACION.map((item) => (
              <ListItemButton
                key={item.a}
                component={RouterLink}
                to={item.a}
                onClick={() => setAbierto(false)}
                selected={esActivo(item.a)}
              >
                <ListItemText primary={item.texto} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" id="contenido" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Divider />
      <Box component="footer" sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {PERFIL.nombre} · {PERFIL.titular}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Este sitio está hecho con React 19, TypeScript y MUI. El código es parte del portafolio.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
