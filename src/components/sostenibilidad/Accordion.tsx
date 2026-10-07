"use client";

import { useId, useState, type ReactNode } from "react";
import { FaFasAngleDown, FaFasAngleUp } from "@/components/fa";

/**
 * Widget "Accordion" de Elementor (ícono a la izquierda, primer elemento abierto):
 * títulos Maven Pro 15px en negrita, activo en verde.
 */
export function SustAccordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="text-start">
      {items.map((it, i) => {
        const active = open === i;
        return (
          <div key={it.title} className={`border border-[#d5d8dc] ${i > 0 ? "border-t-0" : ""}`}>
            <div
              id={`${uid}-t${i}`}
              role="button"
              tabIndex={0}
              aria-expanded={active}
              aria-controls={`${uid}-c${i}`}
              onClick={() => setOpen(active ? null : i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(active ? null : i)}
              className="m-0 cursor-pointer px-5 py-[15px] leading-none font-bold outline-none max-md:px-[15px] max-md:py-3"
            >
              <span className={`float-left inline-block w-[1.5em] text-left max-md:w-[1.2em] ${active ? "text-green-btn" : "text-ink"}`} aria-hidden="true">
                {active ? <FaFasAngleUp className="block size-[1em]" /> : <FaFasAngleDown className="block size-[1em]" />}
              </span>
              <a className={`font-display text-[15px] font-bold ${active ? "text-green-btn" : "text-ink"}`}>{it.title}</a>
            </div>
            {active && (
              <div
                id={`${uid}-c${i}`}
                role="region"
                aria-labelledby={`${uid}-t${i}`}
                className="border-t border-[#d5d8dc] px-5 py-[15px] text-muted max-md:px-[15px] max-md:py-[7px]"
              >
                {it.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
