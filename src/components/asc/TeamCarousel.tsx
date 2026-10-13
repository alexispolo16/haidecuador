"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { media } from "@/lib/media";

/**
 * Carrusel de fotos del equipo. Pensado primero para móvil: una foto a ancho completo; al tocarla
 * (o con las flechas, los puntos o deslizando) pasa a la siguiente hacia la izquierda, en bucle.
 */
export function TeamCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const n = images.length;
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  const moved = useRef(false);

  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <div className="relative select-none">
      <div
        className="relative overflow-hidden rounded-[28px] rounded-br-[110px] shadow-[0_30px_70px_-34px_rgba(6,34,63,0.55)] ring-1 ring-navy/10 max-md:rounded-[20px] max-md:rounded-br-[70px]"
        onPointerDown={(e) => {
          startX.current = e.clientX;
          moved.current = false;
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 40) {
            moved.current = true;
            go(dx < 0 ? 1 : -1);
          }
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,0.7,0.2,1)]"
          style={{ transform: `translate3d(${-i * 100}%, 0, 0)` }}
        >
          {images.map((im, k) => (
            <button
              key={im.src}
              type="button"
              aria-label={`Siguiente foto (${k + 1} de ${n})`}
              aria-hidden={k !== i}
              tabIndex={k === i ? 0 : -1}
              onClick={() => {
                if (!moved.current) go(1);
              }}
              className="relative block aspect-[4/3] w-full shrink-0 cursor-pointer lg:aspect-[5/4]"
            >
              <Image src={media(im.src)} alt={im.alt} fill sizes="(min-width: 1025px) 560px, 100vw" draggable={false} className="!rounded-none object-cover" />
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Foto anterior"
          onClick={() => go(-1)}
          className="absolute bottom-4 left-4 grid size-10 place-items-center rounded-full bg-white/90 text-navy shadow-[0_8px_20px_-8px_rgba(6,34,63,0.6)] backdrop-blur transition hover:bg-green-btn hover:text-white"
        >
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12.5 4l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Foto siguiente"
          onClick={() => go(1)}
          className="absolute bottom-4 left-16 grid size-10 place-items-center rounded-full bg-white/90 text-navy shadow-[0_8px_20px_-8px_rgba(6,34,63,0.6)] backdrop-blur transition hover:bg-green-btn hover:text-white"
        >
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7.5 4l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-2" role="tablist" aria-label="Fotos del equipo">
        {images.map((im, k) => (
          <button
            key={im.src}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-label={`Foto ${k + 1}`}
            onClick={() => setI(k)}
            className="grid h-6 place-items-center px-1"
          >
            <span className={`block h-[6px] rounded-full transition-all duration-300 ${k === i ? "w-7 bg-green-btn" : "w-[6px] bg-navy/25"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
