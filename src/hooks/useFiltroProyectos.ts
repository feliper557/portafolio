import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PROYECTOS } from '../data/proyectos';
import type { Proyecto } from '../data/tipos';

const PARAM = 'tech';

interface FiltroProyectos {
  readonly tecnologiaActiva: string | null;
  readonly proyectos: readonly Proyecto[];
  /** Tecnologías presentes en al menos un proyecto, ordenadas por frecuencia. */
  readonly tecnologiasDisponibles: readonly string[];
  readonly filtrarPor: (tecnologia: string | null) => void;
}

/**
 * El filtro vive en la URL, no en el estado del componente: así el enlace
 * "/proyectos?tech=React 19" se puede compartir y sobrevive a un refresco.
 */
export function useFiltroProyectos(): FiltroProyectos {
  const [searchParams, setSearchParams] = useSearchParams();
  const tecnologiaActiva = searchParams.get(PARAM);

  const tecnologiasDisponibles = useMemo(() => {
    const conteo = new Map<string, number>();
    for (const proyecto of PROYECTOS) {
      for (const tecnologia of proyecto.tecnologias) {
        conteo.set(tecnologia, (conteo.get(tecnologia) ?? 0) + 1);
      }
    }
    return [...conteo.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'es'))
      .map(([nombre]) => nombre);
  }, []);

  const proyectos = useMemo(() => {
    if (!tecnologiaActiva) return PROYECTOS;
    return PROYECTOS.filter((p) => p.tecnologias.includes(tecnologiaActiva));
  }, [tecnologiaActiva]);

  const filtrarPor = (tecnologia: string | null) => {
    // replace: true evita llenar el historial con un paso por cada clic en un chip.
    setSearchParams(tecnologia ? { [PARAM]: tecnologia } : {}, { replace: true });
  };

  return { tecnologiaActiva, proyectos, tecnologiasDisponibles, filtrarPor };
}
