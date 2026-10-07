"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FaFasMinus, FaFasPlus } from "@/components/fa";

/**
 * Réplica del widget "jet-accordion" (JetTabs) de la página ASC:
 * todos cerrados al inicio, uno abierto a la vez (plegable), altura animada 0.5s
 * y efecto "move up" en el contenido.
 */
export type JetAccordionItem = { title: string; content: ReactNode };

function Toggle({ item, open, onToggle }: { item: JetAccordionItem; open: boolean; onToggle: () => void }) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const h = inner.current?.offsetHeight ?? 0;
    if (open) {
      setHeight(h);
      inner.current?.animate(
        [
          { opacity: 0, transform: "translateY(25px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 500, easing: "cubic-bezier(.26,.69,.37,.96)" },
      );
      const t = setTimeout(() => setHeight("auto"), 500);
      return () => clearTimeout(t);
    }
    // Cierre: fija la altura actual y anima a 0.
    setHeight(h);
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setHeight(0)));
    return () => cancelAnimationFrame(r);
  }, [open]);

  return (
    <div className="flex flex-col rounded-[5px] border border-[#e8e8f6] bg-white">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="flex cursor-pointer flex-row flex-nowrap items-center justify-start px-5 py-[15px]"
      >
        <div className="mr-2.5">
          <span className="flex size-[25px] items-center justify-center rounded-full bg-[#6ec1e4] text-white">
            {open ? <FaFasMinus className="size-[15px]" /> : <FaFasPlus className="size-[15px]" />}
          </span>
        </div>
        <div className="m-0 text-left font-semibold text-[#4A4A4A] select-none">{item.title}</div>
      </div>
      <div
        role="region"
        style={{ height, visibility: open || height !== 0 ? "visible" : "hidden" }}
        className="overflow-hidden transition-[height] duration-500 ease-in-out"
      >
        <div ref={inner} className="relative p-[30px]">
          {item.content}
        </div>
      </div>
    </div>
  );
}

export function JetAccordion({ items }: { items: JetAccordionItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="flex flex-col items-stretch gap-5">
      {items.map((item, i) => (
        <Toggle key={item.title} item={item} open={active === i} onToggle={() => setActive(active === i ? null : i)} />
      ))}
    </div>
  );
}
