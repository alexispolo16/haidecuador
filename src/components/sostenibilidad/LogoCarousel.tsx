"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { media } from "@/lib/media";

/**
 * Widget "Image Carousel" de Elementor (plantilla "Certificaciones"): 6 imágenes visibles
 * en escritorio (avanza de 2 en 2), 2 en tablet y 1 en móvil; bucle infinito, flechas
 * dentro, autoplay 3,5 s con pausa al pasar el ratón, transición de 500 ms, sin separación entre imágenes.
 */
const GAP = 0;

function layout(width: number) {
  if (width <= 767) return { perView: 1, group: 1 };
  if (width <= 1024) return { perView: 2, group: 1 };
  return { perView: 6, group: 2 };
}

export function LogoCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const n = images.length;
  const [{ perView, group }, setLayout] = useState({ perView: 6, group: 2 });
  // Posición dentro de la pista (5 copias; se trabaja sobre la copia central).
  const [pos, setPos] = useState(2 * n);
  const [animate, setAnimate] = useState(true);
  const paused = useRef(false);

  useEffect(() => {
    const update = () => setLayout(layout(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setAnimate(true);
      setPos((p) => p + dir * group);
    },
    [group],
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) go(1);
    }, 3500);
    return () => clearInterval(id);
  }, [go]);

  // Al terminar la transición, vuelve a la copia central sin animación.
  const onEnd = () => {
    if (pos >= 3 * n || pos < 2 * n) {
      setAnimate(false);
      setPos((((pos % n) + n) % n) + 2 * n);
    }
  };
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  const slides = Array.from({ length: 5 }, () => images).flat();
  const slideW = `calc((100% - ${(perView - 1) * GAP}px) / ${perView})`;

  return (
    <div
      className="relative"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            gap: GAP,
            transform: `translateX(calc(-${pos} * (${slideW} + ${GAP}px)))`,
            transition: animate ? "transform 500ms ease" : "none",
          }}
          onTransitionEnd={onEnd}
        >
          {slides.map((img, i) => (
            <figure key={i} className="m-0 shrink-0 text-center" style={{ width: slideW }} aria-hidden={i < pos || i >= pos + perView}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media(img.src)} alt={img.alt} width={768} height={576} className="inline h-auto max-w-full align-baseline" />
            </figure>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => go(-1)}
        className="absolute top-1/2 left-2.5 z-[1] -translate-y-1/2 cursor-pointer text-[25px] text-[#0D0D0D]"
      >
        <svg aria-hidden="true" viewBox="0 0 1000 1000" className="size-[1em] fill-current">
          <path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => go(1)}
        className="absolute top-1/2 right-2.5 z-[1] -translate-y-1/2 cursor-pointer text-[25px] text-[#0D0D0D]"
      >
        <svg aria-hidden="true" viewBox="0 0 1000 1000" className="size-[1em] fill-current">
          <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
        </svg>
      </button>
    </div>
  );
}
