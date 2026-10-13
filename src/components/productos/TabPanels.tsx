import Link from "next/link";
import type { ReactNode } from "react";
import { FaFarArrowAltCircleRight } from "@/components/fa";
import Image from "next/image";
import { getProduct } from "@/content/site";
import { media } from "@/lib/media";

/*
 * Contenido de las pestañas de /productos (Iniciadores, Post-transferencia, Engorde y Salud),
 * con los textos copiados literalmente de https://www.haid.com.ec/productos/.
 * Cada producto es una ficha compacta: saco, nombre, descripción, uso recomendado y enlace.
 */

/**
 * Diseño de las fichas: "rows" (filas horizontales: saco · descripción · uso y enlace) o
 * "cards" (tarjetas verticales). Cambiar esta constante alterna entre ambas opciones.
 */
const LAYOUT: "rows" | "cards" = "rows";

/**
 * Ficha de producto. El PNG del saco trae ~15 % de margen transparente arriba y abajo;
 * se recorta con un contenedor de altura fija para que el saco ocupe todo el alto.
 */
function ProductCard({
  image,
  title,
  href,
  label = "Más detalles",
  note,
  children,
  wide = false,
}: {
  image: string;
  title: string;
  href: string;
  label?: string;
  note: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  const link = (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 self-start pt-1 font-display text-[0.9rem] font-semibold text-green-btn underline-offset-4 hover:underline"
    >
      {label}
      <FaFarArrowAltCircleRight className="size-[1em] transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
  const noteEl = (
    <p className="m-0 max-w-none border-l-[3px] border-green-btn pl-3 text-[0.85rem] leading-snug font-semibold text-navy italic">{note}</p>
  );

  if (LAYOUT === "rows") {
    return (
      <article className="grid items-center gap-4 rounded-2xl bg-mist/60 p-4 ring-1 ring-navy/10 md:grid-cols-[132px_1fr_minmax(250px,30%)] md:gap-6 md:p-4 md:pr-6">
        <div className="flex items-center gap-4 md:contents">
          <div className="flex h-[112px] w-[112px] shrink-0 items-start justify-center overflow-hidden rounded-xl bg-white ring-1 ring-navy/10 md:h-[132px] md:w-[132px]">
            <Image
              src={media(image)}
              alt=""
              width={1042}
              height={1042}
              sizes="(min-width: 768px) 190px, 160px"
              className="-mt-[24px] h-[160px] w-auto max-w-none !rounded-none md:-mt-[28px] md:h-[190px]"
            />
          </div>
          <h3 className="text-[1.2rem] leading-tight text-navy md:hidden">{title}</h3>
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="max-md:hidden text-[1.25rem] leading-tight text-navy">{title}</h3>
          <div className="space-y-1.5 text-[0.9rem] leading-[1.55] text-ink/80 [&_p]:m-0 [&_p]:max-w-none">{children}</div>
        </div>
        <div className="flex flex-col gap-2">
          {noteEl}
          {link}
        </div>
      </article>
    );
  }

  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl bg-mist/60 p-5 ring-1 ring-navy/10 ${
        wide ? "md:grid md:grid-cols-[minmax(180px,30%)_1fr] md:items-center md:gap-8 md:p-6" : ""
      }`}
    >
      <div className="flex h-[150px] justify-center overflow-hidden md:h-[170px]">
        <Image
          src={media(image)}
          alt=""
          width={1042}
          height={1042}
          sizes="(min-width: 768px) 244px, 216px"
          className="-mt-[32px] h-[216px] w-auto max-w-none !rounded-none md:-mt-[36px] md:h-[244px]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <h3 className={`text-[1.2rem] leading-tight text-navy ${wide ? "" : "text-center"}`}>{title}</h3>
        <div className="space-y-2 text-[0.9rem] leading-[1.55] text-ink/80 [&_p]:m-0 [&_p]:max-w-none">{children}</div>
        {noteEl}
        <div className="mt-auto">{link}</div>
      </div>
    </article>
  );
}

const Grid = ({ cols, children }: { cols: 1 | 2 | 3; children: ReactNode }) => (
  <div
    className={`grid gap-3 ${
      LAYOUT === "rows" ? "" : `gap-4 ${cols === 3 ? "lg:grid-cols-3 md:grid-cols-2" : cols === 2 ? "md:grid-cols-2" : ""}`
    }`}
  >
    {children}
  </div>
);

/** Ficha del catálogo con los textos del producto (`src/content/site.ts`). */
function Card({ slug, title, label, wide }: { slug: string; title: string; label?: string; wide?: boolean }) {
  const p = getProduct(slug)!;
  return (
    <ProductCard image={p.image} title={title} href={`/${slug}`} label={label} note={p.note} wide={wide}>
      {p.summary.map((t) => (
        <p key={t}>{t}</p>
      ))}
    </ProductCard>
  );
}

export const iniciadores = (
  <Grid cols={2}>
    <Card slug="starter-pro" title="Starter Pro" />
    <Card slug="starter" title="Starter" />
  </Grid>
);

export const postTransferencia = (
  <Grid cols={3}>
    <Card slug="speed" title="Speed 1.2 – 37%" />
    <Card slug="happiness-plus" title="Happiness Plus 1.2 – 35%" />
    <Card slug="happiness" title="Happiness 1.2 – 35%" />
  </Grid>
);

export const engorde = (
  <Grid cols={3}>
    <Card slug="speed" title="Speed 1.6 – 2.0 37%" />
    <Card slug="happiness-plus" title="Happiness Plus 1.6 – 2.0 35%" />
    <Card slug="happiness" title="Happiness 1.6 – 2.0 35%" />
  </Grid>
);

export const salud = (
  <Grid cols={1}>
    <Card slug="fitness" title="Fitness 1.2 – 2.0 35%" label="Más detalles " wide />
  </Grid>
);
