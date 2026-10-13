"use client";

import type { ReactNode } from "react";
import { Accordion } from "@/components/Accordion";

/** Política de abastecimiento responsable (ASC): todos cerrados al inicio, uno abierto a la vez. */
export type JetAccordionItem = { title: string; content: ReactNode };

export function JetAccordion({ items }: { items: JetAccordionItem[] }) {
  return <Accordion items={items} variant="list" />;
}
