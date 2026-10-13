"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { media } from "@/lib/media";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Cabecera sobre agua clara: logo, menú y idiomas en una sola línea; "Contáctanos" es la
 * acción principal y va como píldora. En tablet y móvil el menú se abre como panel.
 */
export function Header() {
  const pathname = usePathname();
  // El menú se cierra solo al cambiar de ruta: queda abierto únicamente en la ruta donde se abrió.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const cta = nav[nav.length - 1];
  const links = nav.slice(0, -1);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_0_rgba(16,59,112,0.1)]">
      {/* Filete de marca: azul → verde */}
      <div className="h-[3px] bg-gradient-to-r from-navy via-blue to-green-btn" />
      <div className="relative mx-auto flex h-[72px] max-w-[1360px] items-center gap-8 px-5 lg:px-8">
        <Link href="/" aria-label="Haid Ecuador, inicio" className="block w-[112px] shrink-0 max-md:w-[92px]">
          <Image src={media("2024/05/1.海大logo无去掉背景.png")} alt="" width={1791} height={689} loading="eager" fetchPriority="low" sizes="112px" className="block h-auto w-full !rounded-none" />
        </Link>

        <nav aria-label="Principal" className="hidden flex-1 lg:block">
          <ul className="flex items-center justify-center gap-0.5 leading-none xl:gap-2">
            {links.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative block px-3 py-[27px] font-display text-[0.88rem] font-medium whitespace-nowrap transition-colors xl:px-4 ${
                      active ? "text-navy" : "text-ink/70 hover:text-navy"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3 bottom-0 h-[3px] origin-center bg-green-btn transition-transform duration-300 xl:inset-x-4 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4 lg:ml-0 lg:gap-5">
          <LanguageSwitcher />
          <Link
            href={cta.href}
            aria-current={pathname.startsWith(cta.href) ? "page" : undefined}
            className="hidden items-center rounded-lg bg-green-btn px-5 py-3 font-display text-[0.88rem] leading-none font-semibold text-white transition-colors duration-300 hover:bg-navy lg:inline-flex"
          >
            {cta.label}
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg border border-navy/15 text-navy transition-colors hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="Móvil" className="absolute inset-x-0 top-full border-t border-navy/10 bg-white shadow-[0_24px_40px_-20px_rgba(6,34,63,0.4)] lg:hidden">
            <ul className="mx-auto max-w-[1360px] px-3 py-2">
              {nav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-12 items-center border-l-[3px] px-4 py-3 font-display text-[1rem] font-medium ${
                        active ? "border-green-btn bg-mist text-navy" : "border-transparent text-ink hover:bg-mist"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
