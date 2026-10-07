"use client";

import { useState, type ReactNode } from "react";

/**
 * Widget "Tabs" horizontal de Elementor (alineación centrada). En escritorio/tablet
 * las pestañas van en fila sobre un panel con borde; en móvil cada título se
 * apila con su contenido debajo (acordeón).
 */
export function ProductTabs({ items }: { items: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const color = (i: number) => (i === active ? "text-amber" : "text-navy");

  return (
    <div className="text-start">
      {/* Títulos de escritorio */}
      <div role="tablist" className="flex justify-center overflow-hidden max-md:hidden">
        {items.map((it, i) => (
          <div
            key={it.label}
            role="tab"
            tabIndex={i === active ? 0 : -1}
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}
            className={`relative cursor-pointer border border-solid px-[25px] py-5 font-display text-base leading-none font-semibold ${color(i)} ${
              i === active
                ? "border-[#d5d8dc] border-b-0 before:absolute before:right-full before:bottom-0 before:w-[999em] before:border-b before:border-[#d5d8dc] before:content-[''] after:absolute after:bottom-0 after:left-full after:w-[999em] after:border-b after:border-[#d5d8dc] after:content-['']"
                : "border-transparent"
            }`}
          >
            {it.label}
          </div>
        ))}
      </div>
      <div className="max-md:border-b max-md:border-[#d5d8dc]">
        {items.map((it, i) => (
          <div key={it.label}>
            {/* Título móvil */}
            <div
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`cursor-pointer border-x border-t border-[#d5d8dc] p-2.5 font-display font-semibold md:hidden ${color(i)}`}
            >
              {it.label}
            </div>
            <div
              role="tabpanel"
              hidden={i !== active}
              className="border-[#d5d8dc] p-5 max-md:border-x max-md:border-t max-md:p-2.5 md:border-x md:border-b"
            >
              {it.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
