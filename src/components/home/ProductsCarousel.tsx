"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { media } from "@/lib/media";

type Item = { image: string; title: string };

/** Chevrons "eicons" de Elementor. */
export function ChevronLeft({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z" />
    </svg>
  );
}
export function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
    </svg>
  );
}

/**
 * Widget "Testimonial Carousel" de Elementor (skin bubble, imagen a la derecha) usado como carrusel de productos:
 * 3 por vista en escritorio (Elementor limita las 4 configuradas al número de slides), 2 en tablet, 1 en móvil,
 * 10px entre slides, bucle, autoplay cada 5 s con transición de 900 ms y pausa al pasar el mouse.
 */
export function ProductsCarousel({ items }: { items: Item[] }) {
  const n = items.length;
  // Tres copias para el bucle infinito; se arranca en la copia central.
  const slides = [...items, ...items, ...items];
  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);
  const paused = useRef(false);
  const busy = useRef(false);

  const go = useCallback((dir: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    setTimeout(() => (busy.current = false), 900);
    setAnimate(true);
    setIndex((i) => i + dir);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) go(1);
    }, 5000);
    return () => clearInterval(t);
  }, [go]);

  // Al salir de la copia central se salta sin animación a la posición equivalente.
  const onEnd = () => {
    if (index >= 2 * n || index < n) {
      setAnimate(false);
      setIndex(((index % n) + n) % n + n);
    }
  };

  useEffect(() => {
    if (animate) return;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(r);
  }, [animate]);

  const slideW = "((100% - (var(--spv) - 1) * 10px) / var(--spv))";
  const trackStyle: CSSProperties = {
    transform: `translate3d(calc(${-index} * (${slideW} + 10px)), 0, 0)`,
    transitionDuration: animate ? "900ms" : "0ms",
  };

  return (
    <div
      className="relative [--spv:3] max-lg:[--spv:2] max-md:[--spv:1]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="mx-[2.5%] w-[95%] overflow-hidden pb-10">
        <div className="flex w-full transition-transform ease-[ease]" style={trackStyle} onTransitionEnd={onEnd}>
          {slides.map((it, i) => (
            <div
              key={i}
              className="mr-[10px] shrink-0 overflow-hidden p-5"
              style={{ width: `calc(${slideW})` }}
              aria-hidden={i < n || i >= 2 * n ? true : undefined}
            >
              <div className="flex flex-row text-center">
                <div className="flex shrink-0 flex-col justify-start pt-5 pl-5">
                  <div className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media(it.image)}
                      alt=""
                      width={200}
                      height={200}
                      className="inline h-[200px] align-baseline w-[200px] rounded-[999px] object-cover"
                    />
                  </div>
                  <cite className="flex flex-col text-[14px] leading-[1.5] not-italic">
                    <span className="font-display text-[19px] font-extrabold text-ink">{it.title}</span>
                  </cite>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => go(-1)}
        onKeyDown={(e) => e.key === "Enter" && go(-1)}
        className="absolute top-[calc(50%-20px)] left-[10px] z-[1] inline-flex -translate-y-1/2 cursor-pointer text-[20px] leading-[28.8px] text-[#097635] max-md:leading-[25.92px]"
      >
        <ChevronLeft className="size-[1em] fill-[#097635]" />
        <span className="sr-only">Previous</span>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => go(1)}
        onKeyDown={(e) => e.key === "Enter" && go(1)}
        className="absolute top-[calc(50%-20px)] right-[10px] z-[1] inline-flex -translate-y-1/2 cursor-pointer text-[20px] leading-[28.8px] text-[#097635] max-md:leading-[25.92px]"
      >
        <ChevronRight className="size-[1em] fill-[#097635]" />
        <span className="sr-only">Next</span>
      </div>
    </div>
  );
}
