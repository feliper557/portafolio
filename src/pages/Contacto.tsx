import { Box, Button, Container, Link, Paper, Stack, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DownloadIcon from '@mui/icons-material/Download';
import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import { PERFIL } from '../data/perfil';

/** Un dato de contacto sin resolver aún no debe renderizarse como enlace roto. */
function estaPendiente(valor: string): boolean {
  return valor.startsWith('[PENDIENTE');
}

interface CanalProps {
  readonly icono: React.ReactNode;
  readonly etiqueta: string;
  readonly valor: string;
  readonly href?: string;
  /** Texto del enlace, cuando el valor completo es demasiado largo para mostrarlo. */
  readonly textoEnlace?: string;
  /**
   * Repite el valor como texto plano bajo el enlace. Para quien navega desde un
   * equipo sin cliente de correo configurado: un mailto: ahí no sirve de nada.
   */
  readonly seleccionable?: boolean;
}

function Canal({ icono, etiqueta, valor, href, textoEnlace, seleccionable }: CanalProps) {
  const pendiente = estaPendiente(valor);

  return (
    <Paper variant="outlined" sx={{ p: 2.5, display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box sx={{ color: 'primary.main', display: 'flex' }}>{icono}</Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" color="text.secondary">
          {etiqueta}
        </Typography>
        {href && !pendiente ? (
          <Link href={href} underline="hover" sx={{ wordBreak: 'break-word', fontWeight: 600 }}>
            {textoEnlace ?? valor}
          </Link>
        ) : (
          <Typography sx={{ wordBreak: 'break-word', fontWeight: 600 }}>
            {textoEnlace ?? valor}
          </Typography>
        )}
        {seleccionable && !pendiente && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ wordBreak: 'break-all', userSelect: 'all' }}
          >
            {valor}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default function Contacto() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography variant="h1" sx={{ mb: 2, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
        Hablemos
      </Typography>
      <Typography variant="subtitle1" sx={{ maxWidth: 640, mb: 5 }}>
        Escríbeme con lo que necesitas resolver, aunque todavía no tengas claro el alcance. Respondo
        con una valoración honesta de si puedo ayudarte y cuánto tomaría.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          mb: 5,
        }}
      >
        <Canal
          icono={<MailOutlineIcon />}
          etiqueta="Correo"
          valor={PERFIL.email}
          href={`mailto:${PERFIL.email}?subject=Proyecto%20de%20software`}
          textoEnlace="Escribir un correo"
          seleccionable
        />
        <Canal
          icono={<LinkedInIcon />}
          etiqueta="LinkedIn"
          valor={PERFIL.linkedin}
          href={PERFIL.linkedin}
          textoEnlace={PERFIL.linkedin.replace('https://www.', '')}
        />
        <Canal
          icono={<GitHubIcon />}
          etiqueta="GitHub"
          valor={PERFIL.github}
          href={`https://github.com/${PERFIL.github}`}
        />
        <Canal icono={<PlaceIcon />} etiqueta="Ubicación" valor={PERFIL.ubicacion} />
      </Box>

      <Paper variant="outlined" sx={{ p: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ mb: 0.5, fontSize: '1.25rem' }}>
              Hoja de vida
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Versión resumida en PDF, lista para adjuntar a una vacante o propuesta.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, alignItems: 'center' }}>
            <Button href={PERFIL.cv} download variant="contained" startIcon={<DownloadIcon />}>
              Descargar PDF
            </Button>
            {/* Misma hoja de vida en web: funciona aunque el PDF no esté publicado. */}
            <Button href={PERFIL.cvWeb} target="_blank" rel="noopener noreferrer">
              Verla en el navegador
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        {PERFIL.disponibilidad}.
      </Typography>
    </Container>
  );
}
