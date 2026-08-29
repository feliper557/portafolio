import { createTheme, type Theme } from '@mui/material/styles';

export type ModoColor = 'light' | 'dark';

/**
 * Paleta propia en lugar de la de MUI por defecto: un portafolio que se ve como
 * la plantilla estándar del framework transmite exactamente eso.
 */
const PALETA = {
  light: {
    primario: '#0B5FFF',
    secundario: '#00897B',
    fondo: '#F7F8FA',
    superficie: '#FFFFFF',
    texto: '#111418',
    textoTenue: '#5A6472',
    borde: '#E2E6EC',
    codigoFondo: '#F2F4F7',
  },
  dark: {
    primario: '#7AA2FF',
    secundario: '#4DB6AC',
    fondo: '#0D1117',
    superficie: '#161B22',
    texto: '#E6EDF3',
    textoTenue: '#9BA6B4',
    borde: '#252C36',
    codigoFondo: '#11161D',
  },
} as const;

export function crearTema(modo: ModoColor): Theme {
  const c = PALETA[modo];

  return createTheme({
    palette: {
      mode: modo,
      primary: { main: c.primario },
      secondary: { main: c.secundario },
      background: { default: c.fondo, paper: c.superficie },
      text: { primary: c.texto, secondary: c.textoTenue },
      divider: c.borde,
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily:
        '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      h1: { fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 },
      h2: { fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 700, letterSpacing: '-0.01em' },
      h4: { fontSize: '1.15rem', fontWeight: 700 },
      subtitle1: { fontSize: '1.1rem', lineHeight: 1.6, color: c.textoTenue },
      body1: { fontSize: '1rem', lineHeight: 1.7 },
      body2: { fontSize: '0.9rem', lineHeight: 1.65 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          // El código monoespaciado se usa en varias páginas; se centraliza aquí.
          'code, pre': {
            fontFamily: '"JetBrains Mono", "Cascadia Code", Consolas, monospace',
          },
          // Respeta a quien pidió menos animación en su sistema operativo.
          '@media (prefers-reduced-motion: reduce)': {
            '*': { animationDuration: '0.01ms !important', transitionDuration: '0.01ms !important' },
          },
          ':focus-visible': {
            outline: `2px solid ${c.primario}`,
            outlineOffset: '2px',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: modo === 'dark' ? 'rgba(13,17,23,0.82)' : 'rgba(247,248,250,0.82)',
            backdropFilter: 'blur(12px)',
            color: c.texto,
            borderBottom: `1px solid ${c.borde}`,
          },
        },
        defaultProps: { elevation: 0, color: 'transparent' },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${c.borde}`,
            backgroundImage: 'none',
          },
        },
        defaultProps: { elevation: 0 },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, paddingInline: 20 },
        },
        defaultProps: { disableElevation: true },
      },
    },
  });
}

export const COLOR_CODIGO_FONDO = PALETA;
