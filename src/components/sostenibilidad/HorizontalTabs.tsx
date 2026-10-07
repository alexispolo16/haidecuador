"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Widget "Tabs" horizontal de Elementor (alineación centrada): títulos en fila con la
 * línea inferior que se prolonga a los lados de la pestaña activa; en móvil cada
 * título lleva su contenido debajo (acordeón).
 */
export function HorizontalTabs({ items }: { items: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const border = "border-[#d5d8dc]";

  return (
    <div className="text-start">
      {/* Escritorio y tablet */}
      <div className="flex justify-center overflow-hidden max-md:hidden" role="tablist">
        {items.map((t, i) => (
          <div
            key={t.label}
            role="tab"
            tabIndex={i === active ? 0 : -1}
            id={`${uid}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${uid}-p${i}`}
            onClick={() => setActive(i)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}
            className={`relative cursor-pointer border px-[25px] py-5 font-display leading-none font-bold outline-none ${
              i === active
                ? `${border} border-b-0 text-green-btn before:absolute before:right-full before:bottom-0 before:h-0 before:w-[999em] before:border-b before:border-[#d5d8dc] before:content-[''] after:absolute after:bottom-0 after:left-full after:h-0 after:w-[999em] after:border-b after:border-[#d5d8dc] after:content-['']`
                : "border-transparent text-ink"
            }`}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* Contenidos (en móvil, precedidos de su título) */}
      <div className={`max-md:border-b ${border}`}>
        {items.map((t, i) => (
          <div key={t.label}>
            <div
              role="tab"
              tabIndex={i === active ? 0 : -1}
              aria-selected={i === active}
              onClick={() => setActive(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}
              className={`cursor-pointer border border-b-0 ${border} p-2.5 font-display font-semibold md:hidden ${
                i === active ? "text-green-btn" : "text-ink"
              }`}
            >
              {t.label}
            </div>
            <div
              role="tabpanel"
              id={`${uid}-p${i}`}
              aria-labelledby={`${uid}-t${i}`}
              hidden={i !== active}
              className={`border ${border} p-5 text-muted md:border-t-0 max-md:border-b-0 max-md:p-2.5`}
            >
              {t.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
