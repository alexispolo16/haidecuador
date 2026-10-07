import type { CSSProperties, ReactNode } from "react";
import { media } from "@/lib/media";

/**
 * Cabecera de página del sitio original: sección Elementor de alto mínimo 25vh,
 * padding 6em 1em, imagen de fondo con capa #040E1A y título h1 alineado a la izquierda.
 */
export function PageHero({
  title,
  image,
  overlay = 0.7,
  position = "center center",
  tabletPosition,
  className = "",
  children,
}: {
  title: ReactNode;
  image: string;
  /** Opacidad de la capa oscura (0.7 o 0.75 según la página). */
  overlay?: number;
  /** background-position en escritorio. */
  position?: string;
  /** background-position en tablet/móvil (Elementor lo reinicia a 0 0 cuando el escritorio usa un desplazamiento). */
  tabletPosition?: string;
  className?: string;
  children?: ReactNode;
}) {
  const style = {
    backgroundImage: `url("${media(image)}")`,
    "--hero-pos": position,
    "--hero-pos-t": tabletPosition ?? (position === "center center" ? position : "0px 0px"),
  } as CSSProperties;

  return (
    <section
      className={`relative bg-cover bg-no-repeat px-[1em] py-[6em] [background-position:var(--hero-pos-t)] lg:[background-position:var(--hero-pos)] ${className}`}
      style={style}
    >
      <div className="absolute inset-0 bg-night" style={{ opacity: overlay }} />
      <div className="e-container relative flex min-h-[25vh] items-center">
        <div className="w-full p-[1em]">
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}
