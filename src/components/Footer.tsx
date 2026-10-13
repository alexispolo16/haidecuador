import Image from "next/image";
import Link from "next/link";
import { auditNotice, company, legalDocs } from "@/content/site";
import { media } from "@/lib/media";
import { Shrimp } from "./Shrimp";
import { FaFasEnvelope, FaFasMapMarkerAlt, FaFasPhone } from "./fa";

// h2 (orden de encabezados correcto tras el contenido) con el aspecto de los antiguos h4.
const colTitle = "mb-3 font-display text-[0.85rem] leading-[1.2] font-semibold tracking-[-0.025em] text-leaf";
const link = "inline-block py-0.5 text-[0.9rem] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline";

/** Pie de página: el fondo del estanque, con el anillo de la marca detrás del logotipo. */
export function Footer() {
  return (
    <footer className="relative overflow-clip bg-footer px-5 pt-8 pb-4 text-[0.9rem] text-white/80 lg:px-8 lg:pt-10">
      <Shrimp gap="#061b30" className="pointer-events-none absolute -right-[6%] -bottom-[8%] w-[min(760px,120vw)] text-white opacity-[0.06]" />
      <div className="e-container relative z-[2]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[auto_0.8fr_1.3fr_1.5fr_1.1fr] lg:gap-10">
          {/* Logo */}
          <div>
            <Image src={media("2024/05/logo-haid.png")} alt="" width={800} height={632} className="h-auto w-[72px]" sizes="72px" />
          </div>

          {/* Menú */}
          <div>
            <h2 className={colTitle}>Menú</h2>
            <ul>
              {[
                ["/estos-es-haid", "Esto es Haid"],
                ["/productos", "Productos"],
                ["/contactanos", "Contáctanos"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className={link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contáctanos */}
          <div>
            <h2 className={colTitle}>Contáctanos</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <FaFasMapMarkerAlt className="mt-1 h-[18px] w-[14px] shrink-0 text-leaf" />
                <span>{company.legalName}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaFasPhone className="size-[16px] shrink-0 text-leaf" />
                <span>{company.phone}</span>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-white/80 underline-offset-4 hover:text-white hover:underline">
                  <FaFasEnvelope className="size-[16px] shrink-0 text-leaf" />
                  <span className="break-all">{company.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Destacado */}
          <div>
            <h2 className={colTitle}>Destacado</h2>
            <div className="rounded-xl border border-white/15 bg-white/[0.05] p-3.5 text-[0.82rem] leading-snug text-white/90">
              <p className="!mb-1.5 font-display font-semibold text-white">{auditNotice.title}</p>
              <p className="!mb-0.5">Contacto: {auditNotice.contact}</p>
              <p className="!mb-0.5">Fecha de auditoría: {auditNotice.date}</p>
              <p className="!mb-0">Empresa auditora (CBA): {auditNotice.auditor}</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h2 className={colTitle}>Links</h2>
            <ul>
              {legalDocs.map((d) => (
                <li key={d.file}>
                  <a href={media(d.file)} className={link}>
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 mb-0 max-w-none border-t border-white/15 pt-4 text-center text-[0.8rem] text-white/70">
          Copyright © 2024 Haid (Ecuador) Feed Cia. Ltda. Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
