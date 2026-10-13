"use client";

import { useId, useState, type ReactNode } from "react";
import { Chevron, tabKeys } from "./TabsShared";

/**
 * Pestañas verticales: lista de títulos a la izquierda con indicador de marca en la activa y
 * panel blanco de radio amplio a la derecha. En móvil se convierten en acordeón.
 */
export function VerticalTabs({ items }: { items: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();

  return (
    <div>
      {/* Escritorio y tablet */}
      <div className="grid gap-8 max-md:hidden md:grid-cols-[minmax(190px,26%)_1fr]">
        <div role="tablist" aria-orientation="vertical" aria-label="Contenido" className="flex flex-col gap-1.5">
          {items.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              id={`${uid}-t${i}`}
              tabIndex={i === active ? 0 : -1}
              aria-selected={i === active}
              aria-controls={`${uid}-p${i}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => tabKeys(e, items.length, active, setActive, true)}
              className={`relative rounded-2xl py-4 pr-4 pl-6 text-left font-display text-[0.95rem] leading-snug font-semibold transition-[background-color,color,box-shadow] duration-300 ${
                i === active
                  ? "bg-white text-navy shadow-[0_14px_30px_-20px_rgba(6,34,63,0.5)] ring-1 ring-navy/10"
                  : "text-ink/60 hover:bg-white/60 hover:text-navy"
              }`}
            >
              <span
                className={`absolute top-3 bottom-3 left-2.5 w-[3px] rounded-full bg-gradient-to-b from-navy to-green-btn transition-opacity duration-300 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
              {t.label}
            </button>
          ))}
        </div>
        <div className="rounded-[28px] bg-white p-8 text-ink shadow-[0_30px_70px_-40px_rgba(6,34,63,0.45)] ring-1 ring-navy/10 lg:p-10">
          {items.map((t, i) => (
            <div key={t.label} role="tabpanel" id={`${uid}-p${i}`} aria-labelledby={`${uid}-t${i}`} hidden={i !== active}>
              {t.content}
            </div>
          ))}
        </div>
      </div>

      {/* Móvil */}
      <div className="space-y-3 md:hidden">
        {items.map((t, i) => (
          <div key={t.label} className="overflow-hidden rounded-[20px] bg-white ring-1 ring-navy/10">
            <button
              type="button"
              aria-expanded={i === active}
              onClick={() => setActive(i)}
              className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold ${
                i === active ? "text-green-btn" : "text-navy"
              }`}
            >
              {t.label}
              <Chevron open={i === active} />
            </button>
            {i === active && <div className="px-5 pb-5 text-ink">{t.content}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
