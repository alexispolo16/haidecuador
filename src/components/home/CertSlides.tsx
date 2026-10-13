"use client";

import { useEffect, useRef, useState } from "react";
import { optimized } from "@/lib/media";
import { ChevronLeft, ChevronRight } from "./chevrons";

/**
 * Widget "Slides" de Elementor con los certificados: transición fade de 500 ms, autoplay cada 3 s,
 * bucle infinito, flechas internas y fondo blanco con la imagen en "contain".
 */
export function CertSlides({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const n = images.length;

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % n);
    }, 3000);
    return () => clearInterval(t);
  }, [n]);

  const arrow =
    "absolute top-1/2 z-[1] -translate-y-1/2 cursor-pointer grid size-10 place-items-center rounded-full bg-ink/55 text-[18px] backdrop-blur transition hover:bg-green-btn";

  return (
    <div
      className="relative h-[586px] w-full overflow-hidden max-lg:h-[305px]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {images.map((src, i) => (
        <div
          key={src}
          role="img"
          aria-hidden={i !== active}
          className="absolute inset-0 bg-white bg-contain bg-center bg-no-repeat transition-opacity duration-500"
          style={{ backgroundImage: `url("${optimized(src, 1200)}")`, opacity: i === active ? 1 : 0 }}
        />
      ))}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setActive((i) => (i - 1 + n) % n)}
        onKeyDown={(e) => e.key === "Enter" && setActive((i) => (i - 1 + n) % n)}
        className={`${arrow} left-3`}
      >
        <ChevronLeft className="size-[1em] fill-white" />
        <span className="sr-only">Previous slide</span>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setActive((i) => (i + 1) % n)}
        onKeyDown={(e) => e.key === "Enter" && setActive((i) => (i + 1) % n)}
        className={`${arrow} right-3`}
      >
        <ChevronRight className="size-[1em] fill-white" />
        <span className="sr-only">Next slide</span>
      </div>
    </div>
  );
}
