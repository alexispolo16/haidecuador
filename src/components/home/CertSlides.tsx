"use client";

import { useEffect, useRef, useState } from "react";
import { media } from "@/lib/media";
import { ChevronLeft, ChevronRight } from "./ProductsCarousel";

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
    "absolute top-1/2 z-[1] inline-flex -translate-y-1/2 cursor-pointer text-[25px] leading-[28.8px] text-[rgba(238,238,238,0.9)] max-md:leading-[25.92px]";

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
          style={{ backgroundImage: `url("${media(src)}")`, opacity: i === active ? 1 : 0 }}
        />
      ))}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setActive((i) => (i - 1 + n) % n)}
        onKeyDown={(e) => e.key === "Enter" && setActive((i) => (i - 1 + n) % n)}
        className={`${arrow} left-[10px]`}
      >
        <ChevronLeft className="size-[1em] fill-[rgba(238,238,238,0.9)]" />
        <span className="sr-only">Previous slide</span>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setActive((i) => (i + 1) % n)}
        onKeyDown={(e) => e.key === "Enter" && setActive((i) => (i + 1) % n)}
        className={`${arrow} right-[10px]`}
      >
        <ChevronRight className="size-[1em] fill-[rgba(238,238,238,0.9)]" />
        <span className="sr-only">Next slide</span>
      </div>
    </div>
  );
}
