"use client";

import type { ReactNode } from "react";
import { Accordion } from "@/components/Accordion";

/** Acordeón de compromisos (primer elemento abierto). */
export function SustAccordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  return <Accordion items={items} defaultOpen={0} />;
}
