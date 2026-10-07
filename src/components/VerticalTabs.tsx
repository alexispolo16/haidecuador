"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Widget "Tabs" vertical de Elementor: títulos a la izquierda (25 %) y contenido
 * enmarcado a la derecha; en móvil cada título lleva su contenido debajo.
 */
export function VerticalTabs({ items }: { items: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const border = "border-[#d5d8dc]";

  return (
    <div>
      {/* Escritorio y tablet */}
      <div className="flex max-md:hidden" role="tablist" aria-orientation="vertical">
        <div className={`flex w-1/4 shrink-0 flex-col border-r ${border}`}>
          {items.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              id={`${uid}-t${i}`}
              aria-selected={i === active}
              aria-controls={`${uid}-p${i}`}
              onClick={() => setActive(i)}
              className={`-mr-px border px-5 py-5 text-left font-display text-[12px] leading-none font-bold ${
                i === active ? `${border} border-r-white bg-white text-navy` : "border-transparent text-black"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className={`grow border border-l-0 ${border} p-5 text-black`}>
          {items.map((t, i) => (
            <div key={t.label} role="tabpanel" id={`${uid}-p${i}`} aria-labelledby={`${uid}-t${i}`} hidden={i !== active}>
              {t.content}
            </div>
          ))}
        </div>
      </div>

      {/* Móvil */}
      <div className={`border-b ${border} md:hidden`}>
        {items.map((t, i) => (
          <div key={t.label}>
            <button
              type="button"
              aria-expanded={i === active}
              onClick={() => setActive(i)}
              className={`block w-full border border-b-0 ${border} px-2.5 py-[15px] text-left font-display text-[12px] leading-none font-bold ${
                i === active ? "text-navy" : "text-black"
              }`}
            >
              {t.label}
            </button>
            {i === active && <div className={`border border-b-0 ${border} px-2.5 py-[15px] text-black`}>{t.content}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
