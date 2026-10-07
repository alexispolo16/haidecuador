import Link from "next/link";
import { auditNotice, company, legalDocs } from "@/content/site";
import { media } from "@/lib/media";
import { FaFasEnvelope, FaFasMapMarkerAlt, FaFasPhone } from "./fa";

/** Pie de página idéntico a la plantilla Elementor del sitio original (post-94). */
export function Footer() {
  return (
    <footer className="bg-footer px-[1em] pt-[3em] pb-[1em]">
      <div className="p-[1em] max-lg:pb-[3em]">
        <div className="e-container flex flex-wrap">
          {/* Logo */}
          <div className="w-1/5 max-lg:w-full">
            <div className="flex items-start justify-center p-[2%] max-lg:p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media("2024/05/logo-haid.png")}
                alt=""
                width={800}
                height={632}
                className="h-auto w-3/5 max-lg:w-[13%] max-md:w-1/4"
              />
            </div>
          </div>

          {/* Menú */}
          <div className="w-[15.193%] max-lg:w-full">
            <div className="p-[2%]">
              <h4 className="text-white max-lg:text-center max-md:pt-[5%]">
                Menú
              </h4>
              <ul className="mt-5 max-lg:text-center max-md:pb-[5%]">
                {[
                  ["/estos-es-haid", "Esto es Haid"],
                  ["/productos", "Productos"],
                  ["/contactanos", "Contáctanos"],
                ].map(([href, label], i) => (
                  <li
                    key={href}
                    className={i > 0 ? "mt-2 pt-0" : ""}
                    style={{ paddingBottom: i < 2 ? 8 : 0 }}
                  >
                    <Link href={href} className="text-line">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contáctanos */}
          <div className="w-[21.603%] max-lg:w-full">
            <div className="p-[2%]">
              <h4 className="text-white max-lg:text-center">Contáctanos</h4>
              <ul className="mt-5 text-line max-md:pb-[5%]">
                <li className="flex items-center pb-[7px] max-lg:justify-center">
                  <FaFasMapMarkerAlt className="mx-[2.25px] h-[18px] w-[13.5px] shrink-0 text-white" />
                  <span className="pl-2">{company.legalName}</span>
                </li>
                <li className="mt-[7px] flex items-center pb-[7px] max-lg:justify-center">
                  <FaFasPhone className="mx-[2.25px] size-[18px] shrink-0 text-white" />
                  <span className="pl-2">{company.phone}</span>
                </li>
                <li className="mt-[7px] flex max-lg:justify-center">
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center text-line"
                  >
                    <FaFasEnvelope className="mx-[2.25px] size-[18px] shrink-0 text-white" />
                    <span className="pl-2">{company.email}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Destacado */}
          <div className="w-[23.204%] max-lg:w-full">
            <div className="px-[5%]">
              <h4 className="text-white max-lg:text-center">Destacado</h4>
              <div className="mt-5 w-[102.156%] max-w-[102.156%] text-white max-lg:text-center">
                <p>{auditNotice.title}</p>
                <p>Contacto: {auditNotice.contact}</p>
                <p>Fecha de auditoría: {auditNotice.date}</p>
                <p>Empresa auditora (CBA): {auditNotice.auditor}</p>
                <p>Contacto: {auditNotice.auditorContact}</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="w-1/5 max-lg:w-full">
            <div className="px-[5%]">
              <h4 className="text-white max-lg:text-center">Links</h4>
              <ul className="mt-5">
                {legalDocs.map((d) => (
                  <li key={d.file}>
                    <a href={media(d.file)} className="text-white">
                      {d.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-[15px]">
          <hr className="mx-auto w-[98%] border-0 border-t-[1.4px] border-solid border-line" />
        </div>
        <p className="mt-[calc(20px-1%)] mb-0 text-center font-semibold text-line">
          Copyright © 2024 Haid (Ecuador) Feed Cia. Ltda. Todos los derechos
          reservados
        </p>
      </div>
    </footer>
  );
}
