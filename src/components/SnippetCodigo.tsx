import { Box, Chip, Paper, Typography } from '@mui/material';
import type { Snippet } from '../data/tipos';

interface Props {
  readonly snippet: Snippet;
}

/**
 * Bloque de código con su porqué. El código sin explicación no vende nada;
 * lo que convence a un cliente es entender qué problema evitó esa decisión.
 */
export default function SnippetCodigo({ snippet }: Props) {
  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h4" sx={{ fontSize: '0.95rem' }}>
          {snippet.titulo}
        </Typography>
        <Chip label={snippet.lenguaje} size="small" variant="outlined" />
      </Box>

      {/* overflow-x propio: el código largo hace scroll aquí, nunca en la página. */}
      <Box
        component="pre"
        tabIndex={0}
        sx={{
          m: 0,
          p: 2,
          overflowX: 'auto',
          fontSize: '0.82rem',
          lineHeight: 1.6,
          bgcolor: (t) => (t.palette.mode === 'dark' ? '#11161D' : '#F2F4F7'),
        }}
      >
        <code>{snippet.codigo}</code>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 1.75 }}>
        {snippet.explicacion}
      </Typography>
    </Paper>
  );
}
