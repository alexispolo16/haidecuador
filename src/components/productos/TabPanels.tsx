import Link from "next/link";
import type { ReactNode } from "react";
import { FaFarArrowAltCircleRight } from "@/components/fa";
import { media } from "@/lib/media";

/*
 * Contenido de las pestañas de /productos: plantillas Elementor 1499 (Iniciadores),
 * 1551 (Post-transferencia), 1580 (Engorde) y 1587 (Salud), copiadas literalmente.
 * Sufijos: base = escritorio, max-lg = ≤1024px, max-md = ≤767px.
 */

/** Botón "Más detalles" (texto azul, fondo transparente, ícono a la derecha). */
function MoreButton({ href, label = "Más detalles", iconGap = "ml-[5px]" }: { href: string; label?: string; iconGap?: string }) {
  return (
    <div className="text-center">
      <Link href={href} className="e-btn inline-flex items-center bg-transparent font-medium text-navy normal-case">
        {/* Como en Elementor, el SVG va en línea dentro del span (su altura incluye el descendente). */}
        <span className={`order-last block ${iconGap}`}>
          <FaFarArrowAltCircleRight className="inline w-[1em] align-baseline" />
        </span>
        <span>{label}</span>
      </Link>
    </div>
  );
}

/** Image box: imagen del saco + título h3. */
function ImageBox({ image, title, imgClass, titleClass = "", className = "" }: { image: string; title: string; imgClass: string; titleClass?: string; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={media(image)} alt="" width={1042} height={1042} loading="lazy" className={`mx-auto block h-auto ${imgClass}`} />
      <h3 className={`mt-[17px] mb-4 text-navy max-md:mt-4 ${titleClass}`}>{title}</h3>
    </div>
  );
}

/** Divisor de Elementor con separador de ancho 0%: solo ocupa espacio vertical. */
function Divider({ className, line }: { className: string; line: string }) {
  return (
    <div className={className}>
      <div className={line} />
    </div>
  );
}

const Justify = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`text-justify text-navy ${className}`}>{children}</div>
);
const Italic = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`text-left font-bold text-navy italic ${className}`}>
    <p>{children}</p>
  </div>
);

/** El original envuelve la plantilla en un <p> que el navegador deja vacío antes y después. */
const Gap = () => <div className="h-[0.9rem]" />;

/** Fila de columnas de la plantilla (contenedor boxed, gap 0). */
const Row = ({ children }: { children: ReactNode }) => (
  <>
    <Gap />
    <div className="p-2.5">
      <div className="mx-auto flex max-w-[1230px] max-md:flex-col">{children}</div>
    </div>
    <Gap />
  </>
);

// Columna: el original usa borde "groove" de 1px que Chrome pinta en #EEE.
const col = "flex min-w-0 flex-1 flex-col gap-5 border-[#eee]";
const lgImg = "w-[80%] max-lg:w-[95%]";
const lgTitle = "max-lg:text-[20px]";
const m2 = (
  <>
    m<sup>2</sup>
  </>
);

export const iniciadores = (
  <Row>
    {["starter-pro", "starter"].map((slug, i) => (
      <div key={slug} className={`${col} p-[3%] ${i === 0 ? "border-r" : "border-l"} max-md:border-0`}>
        {i === 0 ? (
          <>
            <ImageBox image="2024/06/haid-productos-01.png" title="Starter Pro" imgClass="w-[55%] max-lg:w-[70%]" />
            <Justify>
              <p>Alimento micro extruido para alimentar a post-larvas de camarón desde PL10 a 1 gramo de peso.</p>
            </Justify>
            <Italic>Uso sugerido raceways y precrías de alta densidad.</Italic>
            <MoreButton href="/starter-pro" iconGap="ml-[15px]" />
          </>
        ) : (
          <>
            <ImageBox image="2024/06/haid-productos-02.png" title="Starter" imgClass="w-[55%] max-lg:w-[70%]" />
            <Justify>
              <p>Alimento extruido y quebrantado para alimentar a post-larvas de camarón desde PL10 a 1 gramo de peso.</p>
            </Justify>
            <Italic>Uso sugerido siembras directas, precrías y juveniles.</Italic>
            <MoreButton href="/starter" iconGap="ml-[15px]" />
          </>
        )}
      </div>
    ))}
  </Row>
);

export const postTransferencia = (
  <Row>
    <div className={`${col} border-r p-[2%] max-md:border-0`}>
      <ImageBox image="2024/06/haid-productos-05.png" title="Speed 1.2 – 37%" imgClass={lgImg} titleClass={lgTitle} />
      <Justify>
        <p>Alimento extruido y peletizado para alimentar a juveniles post transferencia con 42% – 37% de proteína animal marina de alta calidad.</p>
        <p>Máximo crecimiento, menor FCA, menos días, mayor rentabilidad.</p>
      </Justify>
      <Divider className="max-lg:mt-[-6%] max-md:mt-0" line="h-3" />
      <Italic>Recomendado para producciones que tienen densidades de siembra mayor a 30 camarones / {m2}{" \u00a0"}en post transferencia.</Italic>
      <MoreButton href="/speed" />
    </div>
    <div className={`${col} border-r p-[2%] max-md:border-0`}>
      <ImageBox image="2024/06/haid-productos-06.png" title="Happiness Plus 1.2 – 35%" imgClass={lgImg} titleClass={lgTitle} className="max-lg:mb-[-5%]" />
      <Justify className="max-lg:mt-[-5%]">
        <p>
          Alimento extruido y peletizado para alimentar a juveniles post transferencia con 35% de proteína, especialmente diseñado para cultivos que requieren
          mayor contenido de minerales.
        </p>
      </Justify>
      <Divider className="pt-[13%] max-lg:pt-[15%] max-md:pt-0" line="h-3" />
      <Italic>Recomendado para producciones que tienen densidades de siembra menores a 30 camarones/{m2} en la post transferencia.</Italic>
      <MoreButton href="/happiness-plus" />
    </div>
    <div className={`${col} p-[2%]`}>
      <ImageBox image="2024/06/haid-productos-03.png" title="Happiness 1.2 – 35%" imgClass={lgImg} titleClass={lgTitle} />
      <Justify>
        <p>
          Alimento extruido y peletizado para alimentar a juveniles post transferencia con 35% de proteína, diseñado para cultivos con menores retos de
          producción. Dieta costo – eficiente para cultivos tecnificados.
        </p>
      </Justify>
      <Divider className="pt-[5%] max-lg:pt-0" line="h-2.5" />
      <Italic>Recomendado para producciones que tienen densidades de siembra menores a 30 camarones/{m2} en la post transferencia.</Italic>
      <MoreButton href="/happiness" />
    </div>
  </Row>
);

export const engorde = (
  <Row>
    <div className={`${col} border-r p-[2%] max-md:border-0`}>
      <ImageBox image="2024/06/haid-productos-05.png" title="Speed 1.6 – 2.0 37%" imgClass={lgImg} titleClass={lgTitle} />
      <Justify>
        <p>Alimento extruido y peletizado para alimentar a juveniles post transferencia con 42% – 37% de proteína animal marina de alta calidad.</p>
        <p>Máximo crecimiento, menor FCA, menos días, mayor rentabilidad.</p>
      </Justify>
      <Divider className="mt-[-1px] max-lg:mt-[-7%] max-md:mt-0" line="h-1.5 max-md:h-0.5" />
      <Italic className="max-lg:pb-[14px] max-md:pb-0">
        Recomendado para producciones que tienen densidades de siembra mayor a 30 camarones / {m2}{" \u00a0"}en post transferencia.
      </Italic>
      <MoreButton href="/speed" />
    </div>
    <div className={`${col} border-r p-[2%] max-md:border-0`}>
      <ImageBox image="2024/06/haid-productos-06.png" title="Happiness Plus 1.6 – 2.0 35%" imgClass={lgImg} titleClass={lgTitle} className="mb-[-5%]" />
      <Justify className="mt-[-2%] max-lg:mt-[-5%]">
        <p>
          Alimento extruido y peletizado para alimentar a juveniles post transferencia con 35% de proteína, especialmente diseñado para cultivos que requieren
          mayor contenido de minerales.
        </p>
      </Justify>
      <Divider className="pt-[12%] max-lg:pt-[14%] max-md:pt-0" line="h-1.5 max-lg:h-[18px] max-md:h-0.5" />
      <Italic className="max-lg:pb-[14px] max-md:pb-0">
        Recomendado para producciones que tienen densidades de siembra menores a 30 camarones/{m2} en la post transferencia.
      </Italic>
      <MoreButton href="/happiness-plus" />
    </div>
    <div className={`${col} p-[2%]`}>
      <ImageBox image="2024/06/haid-productos-03.png" title="Happiness 1.6 – 2.0 35%" imgClass={lgImg} titleClass={lgTitle} className="max-lg:mb-[-5%]" />
      <Justify className="max-lg:mt-[-5%]">
        <p>
          Alimento extruido y peletizado para alimentar a juveniles post transferencia con 35% de proteína, diseñado para cultivos con menores retos de
          producción. Dieta costo – eficiente para cultivos tecnificados.
        </p>
      </Justify>
      <Divider className="pt-[4%] max-lg:pt-0" line="h-1.5 max-lg:h-[18px] max-md:h-0.5" />
      <Italic className="max-lg:pb-[14px] max-md:pb-0">
        Recomendado para producciones que tienen densidades de siembra menores a 30 camarones/{m2} en la post transferencia.
      </Italic>
      <MoreButton href="/happiness" />
    </div>
  </Row>
);

export const salud = (
  <Row>
    <div className="flex w-full flex-col justify-between gap-5 p-[2%]">
      <div className="flex flex-col">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media("2024/06/haid-productos-04.png")} alt="" width={1042} height={1042} loading="lazy" className="h-auto w-[33.307%] self-center" />
        <h2 className="text-center text-[38px] text-navy max-md:text-[26px]">Fitness 1.2 – 2.0 35%</h2>
      </div>
      <Justify className="shrink-0">
        <p>
          Alimento extruido y peletizado para alimentar a juveniles post transferencia con 35% de proteína, diseñado con premezclas de alta gama para reducir
          el estrés de los camarones post – transferencia. Contiene aceites esenciales, inhibe el crecimiento de bacterias patógenas como Vibrio
          parahaemolyticus y potencia el desarrollo del hepatopáncreas.
        </p>
      </Justify>
      <Italic className="max-lg:pb-[14px] max-md:pb-0">
        Recomendado para producciones que tienen densidades de siembra menores a 30 camarones/{m2} en la post transferencia.
      </Italic>
      <MoreButton href="/fitness" label="Más detalles " />
    </div>
  </Row>
);
