import type { ReactNode } from "react";
import Image from "next/image";
import { media } from "@/lib/media";
import { Shrimp } from "./Shrimp";

/**
 * Cabecera de página: foto de fondo (optimizada y precargada, es el LCP) con capa #040E1A
 * y título h1 alineado a la izquierda.
 */
export function PageHero({
  title,
  image,
  overlay = 0.7,
  position = "50% 50%",
  className = "",
  children,
}: {
  title: ReactNode;
  image: string;
  /** Opacidad de la capa oscura (0.7 o 0.75 según la página). */
  overlay?: number;
  /** object-position de la foto. */
  position?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`relative overflow-clip px-5 py-12 max-md:py-10 lg:px-8 lg:py-16 ${className}`}>
      {/* Bajo la capa oscura la foto no necesita más calidad. */}
      <Image
        src={media(image)}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        quality={50}
        sizes="100vw"
        className="!rounded-none object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-night" style={{ opacity: overlay }} />
      <Shrimp className="pointer-events-none absolute -top-[10%] -right-[4%] w-[min(640px,110vw)] text-white opacity-[0.1]" />
      <div className="e-container relative flex min-h-[14vh] items-end">
        <div className="w-full">
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}
