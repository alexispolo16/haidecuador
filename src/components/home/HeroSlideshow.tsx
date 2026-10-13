"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { media } from "@/lib/media";

/**
 * Fondo "slideshow" de la portada: transición fade de 500 ms, cada 5 s, en bucle,
 * con efecto Ken Burns hacia dentro (la imagen activa escala a 1.08 en 20 s y al salir vuelve en 10 s).
 * Solo la primera foto se carga con la página (es el LCP); las demás se montan al primer cambio.
 */
export function HeroSlideshow({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(1);
  // El zoom arranca después del primer pintado para que la transición sea visible.
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setZoom(true)));
    return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    // La siguiente foto se monta 1 s antes de mostrarse para que ya esté descargada.
    const pre = setTimeout(() => setLoaded(images.length), 4000);
    const t = setInterval(() => setActive((i) => (i + 1) % images.length), 5000);
    return () => {
      clearTimeout(pre);
      clearInterval(t);
    };
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.slice(0, loaded).map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 overflow-hidden transition-opacity duration-500 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <Image
            src={media(src)}
            alt=""
            fill
            loading="eager"
            fetchPriority={i === 0 ? "high" : "low"}
            sizes="(min-width: 1025px) 68vw, 100vw"
            className="!rounded-none object-cover ease-linear"
            style={{
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
