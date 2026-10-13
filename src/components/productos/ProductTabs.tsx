"use client";

import { useId, useState, type ReactNode } from "react";
import { Chevron, tabKeys } from "../TabsShared";

/**
 * Pestañas horizontales: selector segmentado (píldora) sobre un panel blanco de radio amplio.
 * En móvil cada título se convierte en un acordeón con su contenido debajo.
 */
export function ProductTabs({ items }: { items: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();

  return (
    <div className="text-start">
      {/* Escritorio y tablet */}
      <div className="flex justify-center max-md:hidden">
        <div
          role="tablist"
          aria-label="Etapas de cultivo"
          className="inline-flex gap-1 rounded-full bg-white p-1.5 shadow-[0_10px_30px_-18px_rgba(6,34,63,0.45)] ring-1 ring-navy/10"
        >
          {items.map((it, i) => (
            <button
              key={it.label}
              type="button"
              role="tab"
              id={`${uid}-t${i}`}
              tabIndex={i === active ? 0 : -1}
              aria-selected={i === active}
              aria-controls={`${uid}-p${i}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => tabKeys(e, items.length, active, setActive)}
              className={`rounded-full px-5 py-2.5 font-display text-[0.9rem] leading-none font-semibold whitespace-nowrap transition-[background-color,color,box-shadow] duration-300 ${
                i === active ? "bg-navy text-white shadow-[0_8px_20px_-10px_rgba(16,59,112,0.9)]" : "text-navy/70 hover:bg-mist hover:text-navy"
              }`}
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 md:mt-5 md:space-y-0">
        {items.map((it, i) => (
          <div key={it.label} className="max-md:overflow-hidden max-md:rounded-[20px] max-md:bg-white max-md:ring-1 max-md:ring-navy/10">
            {/* Título móvil */}
            <button
              type="button"
              aria-expanded={i === active}
              aria-controls={`${uid}-m${i}`}
              onClick={() => setActive(i)}
              className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold md:hidden ${
                i === active ? "text-green-btn" : "text-navy"
              }`}
            >
              {it.label}
              <Chevron open={i === active} />
            </button>
            <div
              role="tabpanel"
              id={`${uid}-p${i}`}
              aria-labelledby={`${uid}-t${i}`}
              hidden={i !== active}
              className="p-4 max-md:pt-0 md:rounded-[22px] md:bg-white md:p-5 md:shadow-[0_24px_50px_-34px_rgba(6,34,63,0.45)] md:ring-1 md:ring-navy/10"
            >
              <span id={`${uid}-m${i}`} />
              {it.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
