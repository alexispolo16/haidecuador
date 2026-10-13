"use client";

import { useEffect, useState } from "react";
import { media } from "@/lib/media";

/**
 * Fondo "slideshow" de Elementor de la portada: transición fade de 500 ms, cada 5 s, en bucle,
 * con efecto Ken Burns hacia dentro (la imagen activa escala a 1.08 en 20 s y al salir vuelve en 10 s).
 */
export function HeroSlideshow({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  // El zoom arranca después del primer pintado para que la transición sea visible.
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setZoom(true)));
    return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 overflow-hidden transition-opacity duration-500 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center ease-linear"
            style={{
              backgroundImage: `url("${media(src)}")`,
              transitionProperty: "transform",
              transitionDuration: i === active ? "20s" : "10s",
              transform: i === active && zoom ? "scale(1.08)" : "scale(1)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
