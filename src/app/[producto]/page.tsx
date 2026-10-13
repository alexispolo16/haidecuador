import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFarArrowAltCircleRight, FaFarCheckCircle } from "@/components/fa";
import { Shrimp } from "@/components/Shrimp";
import { color, stageLabel, stages, usageRows } from "@/components/productos/UsageTable";
import { getProduct, products, SITE_URL } from "@/content/site";
import { media } from "@/lib/media";

// Todas las fichas se prerenderizan; bloquear la navegación hasta tener params es aceptable.
export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ producto: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[producto]">): Promise<Metadata> {
  const { producto } = await params;
  const p = getProduct(producto);
  if (!p) return {};
  const description = p.summary.join(" ");
  return {
    title: p.name,
    description,
    alternates: { canonical: `/${p.slug}` },
    openGraph: { title: `${p.name} - Haid Ecuador`, description, images: [media(p.image)], type: "website" },
  };
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3v10m0 0l-4-4m4 4l4-4M4 17h12" />
    </svg>
  );
}

/**
 * Ficha de producto (https://www.haid.com.ec/<slug>/): portada oscura con el saco, tarjetas con
 * características, descripción y conservación, la etapa de uso del alimento y el resto del catálogo.
 * Los textos salen de `src/content/site.ts` (ficha original + catálogo de /productos).
 */
export default async function ProductPage({ params }: PageProps<"/[producto]">) {
  const { producto } = await params;
  const p = getProduct(producto);
  if (!p) notFound();

  const accent = color[p.usage];
  // Texto legible sobre el color del alimento (los claros llevan tinta oscura).
  const onAccent = p.usage === "speed" || p.usage === "fitness" ? "text-white" : "text-ink";
  const rows = usageRows(accent);
  const others = products.filter((o) => o.slug !== p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.fullName,
    description: p.summary.join(" "),
    image: `${SITE_URL}${media(p.image)}`,
    category: p.line,
    brand: { "@type": "Brand", name: "Haid" },
    manufacturer: { "@type": "Organization", name: "HAID (ECUADOR) FEED CIA, LTDA." },
  };

  return (
    <div style={{ "--accent": accent } as CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Portada */}
      <section className="relative overflow-clip bg-deep px-5 text-white lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_40%,rgba(28,87,168,0.55),transparent_70%)]" />
        <Shrimp gap="#06223f" className="pointer-events-none absolute -bottom-[30%] -left-[12%] w-[min(720px,120vw)] text-white opacity-[0.05]" />

        <div className="e-container relative grid items-center gap-6 pt-8 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-12 lg:pb-16">
          <div className="flex flex-col gap-5 max-lg:order-2">
            <nav aria-label="Ruta" className="font-display text-[0.82rem] text-white/60">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/productos" className="hover:text-white">
                    Productos
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/90">
                  {p.name}
                </li>
              </ol>
            </nav>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 font-display text-[0.8rem] font-semibold text-white ring-1 ring-white/15">
              <span className="size-2.5 rounded-full bg-(--accent)" />
              {p.line}
            </span>

            <h1 className="text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{p.fullName}</h1>

            <div className="space-y-2 text-[1.02rem] leading-relaxed text-white/80 md:text-[1.1rem]">
              {p.summary.map((t) => (
                <p key={t} className="!mb-0">
                  {t}
                </p>
              ))}
            </div>

            <p className="!mb-0 border-l-[3px] border-leaf pl-4 text-[0.95rem] leading-snug font-semibold text-white italic">{p.note}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href={media(p.datasheet)} className="e-btn !bg-green-btn hover:!bg-white hover:!text-navy" download>
                <DownloadIcon className="size-[18px]" />
                Descargar ficha técnica
              </a>
              <Link
                href="/contactanos"
                className="inline-flex min-h-11 items-center rounded-full px-6 font-display text-[0.92rem] font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/10"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          {/* Saco sobre un halo del color del alimento */}
          <div className="relative mx-auto w-full max-w-[460px] max-lg:order-1 max-lg:max-w-[240px]">
            <div className="absolute inset-[12%] rounded-full bg-(--accent) opacity-30 blur-3xl" />
            <div className="absolute inset-[6%] rounded-full ring-1 ring-white/15" />
            <div className="absolute inset-[18%] rounded-full bg-white/[0.06] ring-1 ring-white/10" />
            <Image
              src={media(p.image)}
              alt={`Saco de ${p.fullName}`}
              width={1042}
              height={1042}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1025px) 460px, 240px"
              className="relative h-auto w-full !rounded-none drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      </section>

      {/* Ficha */}
      <section className="px-5 py-12 lg:px-8 lg:py-16">
        <div className="e-container grid gap-4 md:grid-cols-3 md:gap-5">
          <article className="flex flex-col gap-4 rounded-[22px] bg-white p-6 shadow-[0_24px_50px_-34px_rgba(6,34,63,0.45)] ring-1 ring-navy/10 md:p-7">
            <span className="h-1 w-10 rounded-full bg-(--accent)" />
            <h2 className="text-[1.25rem] leading-tight text-navy">Características del producto final</h2>
            <ul className="flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <li key={s} className="inline-flex items-center gap-2 rounded-full bg-mist px-3.5 py-2 font-display text-[0.85rem] font-semibold text-navy">
                  <FaFarCheckCircle className="size-[14px] text-green-btn" />
                  {s}
                </li>
              ))}
            </ul>
          </article>

          <article className="flex flex-col gap-4 rounded-[22px] bg-white p-6 shadow-[0_24px_50px_-34px_rgba(6,34,63,0.45)] ring-1 ring-navy/10 md:p-7">
            <span className="h-1 w-10 rounded-full bg-(--accent)" />
            <h2 className="text-[1.25rem] leading-tight text-navy">Nuestro producto</h2>
            <p className="!mb-0 text-[0.98rem] text-ink/80">{p.description}</p>
          </article>

          <article className="flex flex-col gap-4 rounded-[22px] bg-white p-6 shadow-[0_24px_50px_-34px_rgba(6,34,63,0.45)] ring-1 ring-navy/10 md:p-7">
            <span className="h-1 w-10 rounded-full bg-(--accent)" />
            <h2 className="text-[1.25rem] leading-tight text-navy">Conservación</h2>
            <div className="text-[0.98rem] text-ink/80">
              {p.storage.map((t) => (
                <p key={t} className="last:!mb-0">
                  {t}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Etapa de uso: las filas de la tabla de sugerencia de uso donde aparece este alimento */}
      {rows.length > 0 && (
        <section className="bg-mist/60 px-5 py-12 lg:px-8 lg:py-14">
          <div className="e-container">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-[clamp(1.5rem,1.1rem+1.4vw,2.2rem)] text-navy">Tabla de sugerencia de uso</h2>
              <Link href="/productos" className="group inline-flex items-center gap-2 font-display text-[0.9rem] font-semibold text-forest">
                Productos
                <FaFarArrowAltCircleRight className="size-[1em] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="rounded-[22px] bg-white p-4 shadow-[0_24px_50px_-34px_rgba(6,34,63,0.45)] ring-1 ring-navy/10 md:p-6">
              {/* Eje de etapas */}
              <div className="grid grid-cols-5 gap-1.5 border-b border-navy/10 pb-3 font-display text-[0.72rem] font-semibold text-navy/70 md:text-[0.85rem]">
                {stages.map((s, i) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="size-2 shrink-0 rounded-full bg-navy/25" />
                    {stageLabel[i]}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-4">
                {rows.map((r, ri) => (
                  <div key={ri}>
                    {(ri === 0 || rows[ri - 1].group !== r.group) && (
                      <p className="!mb-2 font-display text-[0.8rem] font-semibold text-muted">{r.group}</p>
                    )}
                    <div className="grid grid-cols-5 gap-1.5">
                      {r.bars.map((b) => (
                        <div
                          key={b.text}
                          className={`flex min-h-9 items-center rounded-lg bg-(--accent) px-2.5 py-1.5 text-[0.7rem] leading-tight font-semibold md:text-[0.82rem] ${onAccent}`}
                          style={{ gridColumnStart: b.stage + 1 }}
                        >
                          {b.text}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Resto del catálogo */}
      <section className="px-5 py-12 lg:px-8 lg:py-16">
        <div className="e-container">
          <h2 className="mb-6 text-[clamp(1.5rem,1.1rem+1.4vw,2.2rem)] text-navy">Conoce nuestros productos</h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/${o.slug}`}
                  className="group flex h-full flex-col items-center gap-3 rounded-[20px] bg-white p-4 text-center ring-1 ring-navy/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-28px_rgba(6,34,63,0.5)]"
                >
                  <span className="flex h-[150px] w-full justify-center overflow-hidden">
                    <Image
                      src={media(o.image)}
                      alt=""
                      width={1042}
                      height={1042}
                      sizes="210px"
                      className="-mt-[30px] h-[210px] w-auto max-w-none !rounded-none transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="font-display text-[1rem] leading-tight font-semibold text-navy">{o.name}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 font-display text-[0.82rem] font-semibold text-green-btn">
                    Más detalles
                    <FaFarArrowAltCircleRight className="size-[1em] transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
