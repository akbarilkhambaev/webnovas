'use client'

import { useEffect, useRef } from "react";
import type { TileField } from "./tileField";

interface HeroSceneProps {
  /** WebGL недоступен — показываем статичный орнамент вместо сцены */
  onFail: () => void;
}

/**
 * Обёртка 3D-сцены. three.js грузится отдельным чанком уже после отрисовки страницы,
 * поэтому не задерживает первый экран.
 */
const HeroScene = ({ onFail }: HeroSceneProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let field: TileField | null = null;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    import("./tileField")
      .then(({ createTileField }) => {
        if (cancelled || !ref.current) return;
        try {
          field = createTileField({ container: ref.current, reducedMotion });
        } catch {
          onFail();
        }
      })
      .catch(onFail);

    return () => {
      cancelled = true;
      field?.dispose();
    };
  }, [onFail]);

  return <div ref={ref} aria-hidden="true" className="wn-hero-canvas pointer-events-none absolute" />;
};

export default HeroScene;
