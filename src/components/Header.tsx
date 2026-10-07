"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/content/site";
import { media } from "@/lib/media";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Cabecera idéntica a la plantilla Elementor del sitio original (post-91):
 * tres columnas (logo / menú / idiomas) sobre blanco al 58 %, menú hamburguesa
 * en tablet y móvil. En tablet la cabecera se superpone al contenido (margin-bottom -23 %).
 */
export function Header() {
  const pathname = usePathname();
  // El menú se cierra solo al cambiar de ruta: queda abierto únicamente en la ruta donde se abrió.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF94] max-lg:mb-[-23%] max-md:mb-0">
      <div className="relative flex items-stretch">
        {/* Logo */}
        <div className="flex w-1/5 items-center p-[1em] max-lg:w-[34%] max-md:w-[38%]">
          <Link href="/" aria-label="Haid Ecuador, inicio" className="-mt-[2%] block w-full text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media("2024/05/1.海大logo无去掉背景.png")} alt="" width={1791} height={689} className="inline-block h-auto w-3/4 max-md:w-full" />
          </Link>
        </div>

        {/* Menú */}
        <div className="flex w-[63.018%] items-center p-[1em] max-lg:w-[36%] max-md:w-[20%]">
          <nav aria-label="Principal" className="hidden w-full justify-end lg:flex">
            <ul className="flex flex-wrap justify-end leading-normal">
              {nav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block px-5 py-[13px] font-display text-[18px] leading-5 transition-colors duration-400 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-green after:transition-opacity after:duration-400 ${
                        active ? "text-black after:opacity-100" : "text-ink after:opacity-0 hover:text-black hover:after:opacity-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            className="mx-auto grid place-items-center rounded-[3px] bg-black/5 p-[5.5px] text-[#33373d] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3.5 6h17M3.5 12h17M3.5 18h17" />}
            </svg>
          </button>
        </div>

        {/* Idiomas */}
        <div className="flex w-[16.315%] items-center p-2.5 max-lg:w-[30%] max-md:w-[42%]">
          <LanguageSwitcher />
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="Móvil" className="absolute inset-x-0 top-full -mt-[1em] bg-white lg:hidden">
            <ul>
              {nav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block border-l-8 border-transparent px-5 py-2.5 text-center font-display text-[18px] leading-5 ${
                        active ? "bg-[#3f444b] text-white" : "text-[#33373d] hover:bg-[#3f444b] hover:text-white"
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
