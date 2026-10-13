"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionItem = { title: ReactNode; content: ReactNode };

/**
 * Acordeón corporativo: filas independientes con indicador de marca (azul → verde) en la abierta,
 * botón +/− y apertura animada con filas de grid (solo cambia la altura, sin saltos). Uno abierto
 * a la vez; se puede cerrar el abierto.
 */
export function Accordion({
  items,
  defaultOpen = null,
  className = "",
  titleClassName = "",
  variant = "cards",
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  className?: string;
  titleClassName?: string;
  /** "cards": filas separadas (por defecto). "list": una sola tarjeta con filas numeradas, más compacta. */
  variant?: "cards" | "list";
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();

  if (variant === "list") {
    return (
      <div className={`overflow-hidden rounded-2xl bg-white shadow-[0_20px_46px_-34px_rgba(6,34,63,0.5)] ring-1 ring-navy/10 ${className}`}>
        {items.map((it, i) => {
          const active = open === i;
          return (
            <div key={i} className={`relative ${i > 0 ? "border-t border-navy/10" : ""} ${active ? "bg-foam" : ""}`}>
              <span
                className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-navy to-green-btn transition-opacity duration-300 ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />
              <h3 className="m-0 text-[0.95rem] leading-snug">
                <button
                  type="button"
                  id={`${uid}-t${i}`}
                  aria-expanded={active}
                  aria-controls={`${uid}-c${i}`}
                  onClick={() => setOpen(active ? null : i)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left font-display font-semibold transition-colors duration-300 hover:bg-mist/60 md:px-5 ${
                    active ? "text-navy" : "text-ink"
                  } ${titleClassName}`}
                >
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-lg text-[0.74rem] transition-colors duration-300 ${
                      active ? "bg-navy text-white" : "bg-mist text-navy"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{it.title}</span>
                  <svg viewBox="0 0 20 20" className={`size-4 shrink-0 text-navy transition-transform duration-300 ${active ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </button>
              </h3>
              <div
                id={`${uid}-c${i}`}
                role="region"
                aria-labelledby={`${uid}-t${i}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className={`px-4 pt-1 pb-4 text-muted md:pr-6 md:pl-[3.75rem] ${active ? "" : "invisible"}`}>{it.content}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 text-start ${className}`}>
      {items.map((it, i) => {
        const active = open === i;
        return (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl bg-white ring-1 transition-[box-shadow,--tw-ring-color] duration-300 ${
              active ? "shadow-[0_22px_50px_-30px_rgba(6,34,63,0.55)] ring-navy/20" : "ring-navy/10 hover:ring-navy/25"
            }`}
          >
            <span
              className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-navy to-green-btn transition-opacity duration-300 ${
                active ? "opacity-100" : "opacity-0"
              }`}
            />
            <h3 className="m-0 text-[1rem] leading-snug">
              <button
                type="button"
                id={`${uid}-t${i}`}
                aria-expanded={active}
                aria-controls={`${uid}-c${i}`}
                onClick={() => setOpen(active ? null : i)}
                className={`flex w-full items-center justify-between gap-5 px-6 py-5 text-left font-display font-semibold transition-colors duration-300 max-md:px-5 ${
                  active ? "text-navy" : "text-ink hover:text-navy"
                } ${titleClassName}`}
              >
                <span>{it.title}</span>
                <span
                  aria-hidden="true"
                  className={`relative grid size-8 shrink-0 place-items-center rounded-lg transition-colors duration-300 ${
                    active ? "bg-navy text-white" : "bg-mist text-navy"
                  }`}
                >
                  <span className="absolute h-[2px] w-3.5 rounded bg-current" />
                  <span className={`absolute h-3.5 w-[2px] rounded bg-current transition-transform duration-300 ${active ? "scale-y-0" : ""}`} />
                </span>
              </button>
            </h3>
            <div
              id={`${uid}-c${i}`}
              role="region"
              aria-labelledby={`${uid}-t${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className={`px-6 pt-0 pb-6 text-muted max-md:px-5 ${active ? "" : "invisible"}`}>{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
