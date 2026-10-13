import Link from "next/link";
import type { ReactNode } from "react";
import { FaFarArrowAltCircleRight } from "@/components/fa";
import { media } from "@/lib/media";

/*
 * Contenido de las pestañas de /productos (Iniciadores, Post-transferencia, Engorde y Salud),
 * con los textos copiados literalmente de https://www.haid.com.ec/productos/.
 * Cada producto es una ficha compacta: saco, nombre, descripción, uso recomendado y enlace.
 */

const m2 = (
  <>
    m<sup>2</sup>
  </>
);

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media(image)}
              alt=""
              width={1042}
              height={1042}
              loading="lazy"
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media(image)}
          alt=""
          width={1042}
          height={1042}
          loading="lazy"
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

export const iniciadores = (
  <Grid cols={2}>
    <ProductCard image="2024/06/haid-productos-01.png" title="Starter Pro" href="/starter-pro" note="Uso sugerido raceways y precrías de alta densidad.">
      <p>Alimento micro extruido para alimentar a post-larvas de camarón desde PL10 a 1 gramo de peso.</p>
    </ProductCard>
    <ProductCard image="2024/06/haid-productos-02.png" title="Starter" href="/starter" note="Uso sugerido siembras directas, precrías y juveniles.">
      <p>Alimento extruido y quebrantado para alimentar a post-larvas de camarón desde PL10 a 1 gramo de peso.</p>
    </ProductCard>
  </Grid>
);

const speedNote = (
  <>
    Recomendado para producciones que tienen densidades de siembra mayor a 30 camarones / {m2}
    {"  "}en post transferencia.
  </>
);
const lowNote = <>Recomendado para producciones que tienen densidades de siembra menores a 30 camarones/{m2} en la post transferencia.</>;

const speedText = (
  <>
    <p>Alimento extruido y peletizado para alimentar a juveniles post transferencia con 42% – 37% de proteína animal marina de alta calidad.</p>
    <p>Máximo crecimiento, menor FCA, menos días, mayor rentabilidad.</p>
  </>
);
const happinessPlusText = (
  <p>
    Alimento extruido y peletizado para alimentar a juveniles post transferencia con 35% de proteína, especialmente diseñado para cultivos que requieren mayor
    contenido de minerales.
  </p>
);
const happinessText = (
  <p>
    Alimento extruido y peletizado para alimentar a juveniles post transferencia con 35% de proteína, diseñado para cultivos con menores retos de producción.
    Dieta costo – eficiente para cultivos tecnificados.
  </p>
);

export const postTransferencia = (
  <Grid cols={3}>
    <ProductCard image="2024/06/haid-productos-05.png" title="Speed 1.2 – 37%" href="/speed" note={speedNote}>
      {speedText}
    </ProductCard>
    <ProductCard image="2024/06/haid-productos-06.png" title="Happiness Plus 1.2 – 35%" href="/happiness-plus" note={lowNote}>
      {happinessPlusText}
    </ProductCard>
    <ProductCard image="2024/06/haid-productos-03.png" title="Happiness 1.2 – 35%" href="/happiness" note={lowNote}>
      {happinessText}
    </ProductCard>
  </Grid>
);

export const engorde = (
  <Grid cols={3}>
    <ProductCard image="2024/06/haid-productos-05.png" title="Speed 1.6 – 2.0 37%" href="/speed" note={speedNote}>
      {speedText}
    </ProductCard>
    <ProductCard image="2024/06/haid-productos-06.png" title="Happiness Plus 1.6 – 2.0 35%" href="/happiness-plus" note={lowNote}>
      {happinessPlusText}
    </ProductCard>
    <ProductCard image="2024/06/haid-productos-03.png" title="Happiness 1.6 – 2.0 35%" href="/happiness" note={lowNote}>
      {happinessText}
    </ProductCard>
  </Grid>
);

export const salud = (
  <Grid cols={1}>
    <ProductCard image="2024/06/haid-productos-04.png" title="Fitness 1.2 – 2.0 35%" href="/fitness" label="Más detalles " note={lowNote} wide>
      <p>
        Alimento extruido y peletizado para alimentar a juveniles post transferencia con 35% de proteína, diseñado con premezclas de alta gama para reducir el
        estrés de los camarones post – transferencia. Contiene aceites esenciales, inhibe el crecimiento de bacterias patógenas como Vibrio parahaemolyticus y
        potencia el desarrollo del hepatopáncreas.
      </p>
    </ProductCard>
  </Grid>
);
