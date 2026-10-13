"use client";

import type { KeyboardEvent } from "react";

/** Navegación por teclado de un tablist: flechas, Inicio y Fin. */
export function tabKeys(e: KeyboardEvent, count: number, active: number, set: (i: number) => void, vertical = false) {
  const next = vertical ? "ArrowDown" : "ArrowRight";
  const prev = vertical ? "ArrowUp" : "ArrowLeft";
  let i = -1;
  if (e.key === next) i = (active + 1) % count;
  else if (e.key === prev) i = (active - 1 + count) % count;
  else if (e.key === "Home") i = 0;
  else if (e.key === "End") i = count - 1;
  if (i < 0) return;
  e.preventDefault();
  set(i);
  const list = (e.currentTarget as HTMLElement).closest('[role="tablist"]');
  (list?.querySelectorAll<HTMLElement>('[role="tab"]')[i])?.focus();
}

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={`size-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}
