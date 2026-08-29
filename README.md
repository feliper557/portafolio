# Portafolio — Felipe Rodríguez

Portafolio profesional construido como aplicación React 19 multipágina. El sitio no solo
describe lo que sé hacer: el código de este repositorio es parte de la muestra.

## Stack

| Capa | Tecnología |
|---|---|
| UI | React 19 · MUI |
| Lenguaje | TypeScript (modo estricto, sin `any`) |
| Build | Vite |
| Ruteo | React Router 7, con carga diferida por ruta |
| Despliegue | GitHub Actions → Azure Static Web Apps |

## Correr en local

```bash
npm install
npm run dev      # http://localhost:5173
```

Otros comandos:

```bash
npm run build    # verifica tipos y compila a dist/
npm run preview  # sirve dist/ como en producción
npm run smoke    # renderiza las 13 rutas en servidor y verifica que ninguna falla
npx tsc -b       # solo verificación de tipos
```

## Estructura

```
src/
  data/          Contenido del sitio, tipado. Aquí se edita el texto, no en los componentes.
    tipos.ts       Contratos: Proyecto, Tecnologia, Snippet, Metrica
    proyectos.ts   Fuente única de verdad de los casos
    stack.ts       Tecnologías agrupadas, cada una ligada a sus proyectos
    perfil.ts      Datos personales, servicios, proceso y modalidades
  theme/         Tema claro/oscuro con paleta propia
  hooks/         useColorMode (preferencia persistida) · useFiltroProyectos (filtro en la URL)
  components/    Layout, tarjeta de proyecto, snippet de código, diagramas SVG
  pages/         Una por ruta, cargadas con React.lazy
```

**Para actualizar el contenido del portafolio no hace falta tocar ningún componente**: todo el
texto vive en `src/data/`.

## Decisiones técnicas

- **Carga diferida por ruta** (`React.lazy` + `Suspense`): quien entra a la portada no descarga
  el código de las otras cinco páginas.
- **El filtro de proyectos vive en la URL** (`useSearchParams`): `/proyectos?tech=React%2019` es
  un enlace compartible y sobrevive a un refresco.
- **Sin peticiones de red**: el contenido está tipado en `src/data/`. El sitio despliega como
  estático puro, sin backend que mantener ni que pueda caerse.
- **Tema claro/oscuro** respetando `prefers-color-scheme` en la primera visita y persistiendo la
  elección en `localStorage`, con acceso protegido por `try/catch` para el modo incógnito.
- **Accesibilidad**: enlace de salto al contenido, `aria-label` en los controles sin texto,
  regiones anunciadas al filtrar y respeto por `prefers-reduced-motion`.

## Desplegar en Azure Static Web Apps

1. Crear el repositorio en GitHub y subir este proyecto.
2. En el portal de Azure, crear un recurso **Static Web App** con plan gratuito y origen
   **Other** (el workflow ya está escrito; no hace falta que Azure genere uno).
3. Copiar el **deployment token** del recurso.
4. En GitHub: *Settings → Secrets and variables → Actions → New repository secret*, con nombre
   `AZURE_STATIC_WEB_APPS_API_TOKEN` y el token como valor.
5. Hacer push a `main`. El workflow `.github/workflows/azure-static-web-apps.yml` verifica tipos,
   compila y publica.

`staticwebapp.config.json` incluye el *navigation fallback* que hace que las rutas de React Router
funcionen al recargar o al entrar directo a una URL profunda como `/proyectos/worldcup-2026`.
Sin él, esas rutas responderían 404.

## Hoja de vida

`public/cv-felipe-rodriguez.html` está pensado para imprimirse: ábrelo en el navegador,
`Ctrl+P` → *Guardar como PDF*, y guarda el resultado como `public/cv-felipe-rodriguez.pdf`.
La página de Contacto ofrece ese PDF para descargar.
