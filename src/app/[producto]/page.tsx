import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaFarCheckCircle } from "@/components/fa";
import { getProduct, products } from "@/content/site";
import { media } from "@/lib/media";

// Todas las fichas se prerenderizan; bloquear la navegación hasta tener params es aceptable.
export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ producto: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[producto]">): Promise<Metadata> {
  const { producto } = await params;
  const p = getProduct(producto);
  return p ? { title: p.name } : {};
}

/** Ficha de producto: copia de https://www.haid.com.ec/<slug>/ (contenedor Elementor de dos columnas). */
export default async function ProductPage({ params }: PageProps<"/[producto]">) {
  const { producto } = await params;
  const p = getProduct(producto);
  if (!p) notFound();

  // En móvil el original centra los textos en todas las fichas salvo Starter.
  const center = p.mobileCenter ? "max-md:text-center" : "";
  const subtitle = `text-[20px] normal-case ${center}`;
  const textStyle = { "--mw": p.mobileTextWidth ? `${p.mobileTextWidth}px` : "81.026%" } as CSSProperties;

  return (
    <div className="px-[2%] py-[2%]">
      <div className="e-container">
        {/* Fila: en móvil la imagen pasa arriba (column-reverse). */}
        <div className="flex flex-col-reverse gap-5 p-2.5 md:flex-row md:justify-center">
          <div className="flex shrink-0 flex-col justify-center gap-[25px] p-2.5 md:w-1/2">
            <h2 className={center}>{p.fullName}</h2>
            <h2 className={subtitle}>Características del producto final</h2>
            <ul className={`-mx-[25px] flex flex-wrap ${p.mobileCenter ? "max-md:justify-center" : ""}`}>
              {p.sizes.map((s) => (
                <li key={s} className="mx-[25px] flex items-center">
                  <span className="pr-1.5 text-navy">
                    <FaFarCheckCircle className="size-[14px]" />
                  </span>
                  <span className="pl-2 text-muted">{s}</span>
                </li>
              ))}
            </ul>
            <h2 className={subtitle}>Nuestro producto</h2>
            <div className={`w-[81.026%] max-w-full max-md:w-(--mw) ${center}`} style={textStyle}>
              <p>{p.description}</p>
            </div>
            <h2 className={subtitle}>Conservación</h2>
            <div className={center}>
              {p.storage.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <div className="max-md:text-center">
              <a href={media(p.datasheet)} className="e-btn normal-case">
                Descargar ficha técnica
              </a>
            </div>
          </div>
          <div className="flex p-2.5 md:w-1/2 max-lg:items-center max-lg:justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media(p.image)} alt="" width={1042} height={1042} className="h-auto w-full self-start max-lg:self-center" />
          </div>
        </div>
      </div>
    </div>
  );
}
