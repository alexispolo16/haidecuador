"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Animaciones de entrada de Elementor usadas en el sitio original. */
export type RevealAnimation = "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight";

export function Reveal({
  children,
  className = "",
  delay = 0,
  animation,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: RevealAnimation;
  as?: "div" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("is-visible");
    const io = new IntersectionObserver(
      ([entry]) => {
        // Mostrar al entrar en pantalla o si ya quedó por encima (scroll rápido, anclas, recarga a mitad de página).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    // Red de seguridad: el contenido nunca queda oculto más de 2.5 s.
    const fallback = setTimeout(show, 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${className}`}
      style={{ animationDelay: `${delay}ms`, ...(animation && { "--reveal": animation }) } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
