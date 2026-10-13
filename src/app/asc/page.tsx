import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  JetAccordion,
  type JetAccordionItem,
} from "@/components/asc/JetAccordion";
import { PageHero } from "@/components/PageHero";
import { TeamCarousel } from "@/components/asc/TeamCarousel";
import { Reveal } from "@/components/Reveal";
import { Shrimp } from "@/components/Shrimp";
import { media } from "@/lib/media";

export const metadata: Metadata = { title: "ASC" };

// Contenido copiado literalmente de https://www.haid.com.ec/asc/

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 transition-transform duration-300 group-hover/dl:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3v10m0 0l-4-4m4 4l4-4M4 17h12" />
    </svg>
  );
}

// Documento descargable: icono, título y enlace «Descargar».
function InfoBox({ image, title, file, tall = false }: { image?: string; title: string; file: string; tall?: boolean }) {
  return (
    <div
      className={`flex h-full gap-4 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-30px_rgba(6,34,63,0.5)] ring-1 ring-navy/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:ring-green-btn/40 ${
        tall ? "flex-col items-center text-center" : "items-center"
      }`}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media(image)} alt="" loading="lazy" className={`shrink-0 object-contain ${tall ? "h-[88px] w-auto max-w-full" : "size-14 !rounded-xl"}`} />
      ) : (
        <span
          aria-hidden="true"
          className={`grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#2a9fc4] via-[#1763b4] to-[#0a2f86] font-display font-bold text-white ${
            tall ? "h-[88px] w-[88px] text-[1rem]" : "size-14 text-[0.8rem]"
          }`}
        >
          ISO
          <span className="-mt-3 block text-[0.62rem] font-semibold tracking-wide">50001</span>
        </span>
      )}
      <div className={`flex min-w-0 flex-1 flex-col gap-2 ${tall ? "items-center justify-between" : ""}`}>
        <h3 className="text-[0.95rem] leading-snug font-semibold text-navy">{title}</h3>
        <a
          href={media(file)}
          className="group/dl inline-flex items-center gap-1.5 self-start rounded-lg bg-green-btn/10 px-3 py-1.5 font-display text-[0.82rem] font-semibold text-green-btn transition-colors duration-300 hover:bg-green-btn hover:text-white"
        >
          <DownloadIcon />
          Descargar
        </a>
      </div>
    </div>
  );
}

function Row({ children, cols = 4 }: { children: ReactNode; cols?: 3 | 4 | 5 }) {
  return <div className={`grid gap-3 sm:grid-cols-2 ${cols === 5 ? "lg:grid-cols-5" : cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>{children}</div>;
}

const qualityCerts: { image?: string; title: string; file: string }[] = [
  { image: "2025/12/certificaciones-haid-02.png", title: "Global G.A.P.", file: "2026/10/certificado-globalgap.pdf" },
  { image: "2025/12/certificaciones-haid-03.png", title: "Aquaculture Stewardship Council (ASC)", file: "2026/10/certificado-asc.pdf" },
  { image: "2025/12/certificaciones-haid-04.png", title: "Best Aquaculture Practices (BAP)", file: "2026/10/certificado-bap.pdf" },
  { image: "2025/12/haid-05.jpg", title: "HACCP Plan", file: "2026/10/certificado-haccp.pdf" },
  { title: "ISO 50001", file: "2026/10/certificado-iso-50001.pdf" },
];

// Informes de transparencia (PDF). Los cuatro últimos aún no se han enviado actualizados: se enlazan los vigentes en el sitio.
const reports = [
  { title: "Informe de diligencia debida 2025", file: "2026/10/informe-diligencia-debida-2025.pdf" },
  { title: "Informe de volumen de ingredientes marinos y MSL 2025", file: "2026/10/informe-ingredientes-marinos-msl-2025.pdf" },
  { title: "Informe de materias primas certificadas 2025", file: "2025/12/Raw-Material-Report-2024.pdf" },
  { title: "Informe de emisiones GEI 2025", file: "2026/10/informe-emisiones-gei-2025.pdf" },
  { title: "Informe resumido de la evaluación sectorial.", file: "2026/10/informe-evaluacion-sectorial.pdf" },
  {
    title: "Plan de Acción de HAID Ecuador para Cadenas de Suministro Libres de Deforestación y Conversión",
    file: "2025/12/PLAN-DE-ACCION-DE-HAID-ECUADOR-V1.1.pdf",
  },
  {
    title: "Reporte de Progreso de No Deforestación de HAID Ecuador (2025 - 2026)",
    file: "2025/12/REPORTE-DE-PROGRESO-NO-DEFORESTACION-DE-HAID-ECUADOR.pdf",
  },
  {
    title: "Compromiso Público para la Transición a Cadenas de Suministro Libres de Deforestación y Conversión.",
    file: "2025/12/COMPROMISO-PUBLICO-HAID-ECUADOR-V1.1.pdf",
  },
];

const teamPhotos = [
  { src: "2026/10/equipo-1.jpg", alt: "Parte del equipo de HAID Ecuador en las oficinas" },
  { src: "2026/10/equipo-2.jpg", alt: "Reunión de trabajo del equipo de HAID Ecuador" },
  { src: "2026/10/equipo-3.jpg", alt: "Colaboradores de HAID Ecuador frente a la planta" },
];

// Plantilla Elementor embebida en cada pestaña del acordeón (contenedor boxed, padding 10px).
function Template({ children }: { children: ReactNode }) {
  return <div className="rich">{children}</div>;
}


const policy: JetAccordionItem[] = [
  {
    title: "Abastecimiento y compra responsable de ingredientes.",
    content: (
      <Template>
        <div>
          <p>
            En HAID (Ecuador) FEED CIA. LTDA. estamos comprometidos con un
            abastecimiento y una compra responsable de ingredientes de origen
            marino y vegetal, asegurando prácticas alineadas con la
            sostenibilidad, la ética y la protección del medio ambiente.
          </p>
          <p>
            Esta política establece los lineamientos que guían nuestras
            decisiones de compra, integrando criterios sociales, ambientales y
            operativos. Su objetivo es garantizar que los insumos utilizados en
            la producción de alimentos cumplan con requisitos verificables de
            sostenibilidad y responsabilidad
          </p>
        </div>
      </Template>
    ),
  },
  {
    title: "Evaluación de proveedores",
    content: (
      <Template>
        <div>
          <p>
            HAID Ecuador evalúa a sus proveedores bajo criterios estrictos para
            garantizar un abastecimiento responsable. El proceso inicia con el
            cumplimiento del Código de Conducta para Proveedores y se
            complementa con un Due Diligence aplicado a fabricantes de
            ingredientes y productores de materias primas, tanto locales como
            internacionales.
          </p>
          <p>Para esta evaluación se requiere:</p>
          <ul>
            <li>Ficha técnica del ingrediente</li>
            <li>Certificaciones reconocidas por ISEAL o aceptadas por ASC</li>
            <li>Aplicación del Código de Conducta de HAID</li>
            <li>Evaluación de riesgos (Due Diligence)</li>
          </ul>
          <p>
            Este enfoque asegura que nuestros proveedores cumplan estándares
            ambientales, sociales y éticos, alineados con los principios de
            sostenibilidad de HAID Ecuador.
          </p>
        </div>
      </Template>
    ),
  },
  {
    title: "Sostenibilidad",
    content: (
      <Template>
        <div>
          <p>
            Los productores de materias primas de origen marino y de origen
            vegetal deberán considerar prácticas sostenibles, asegurándose de
            que los procesos de producción de las materias primas cumplan con
            estándares medioambientales según los objetivos de la ODS:
          </p>
          <p>
            <strong>
              Productores de ingredientes de origen marino, HAID (Ecuador) FEED
              CIA. LTDA:
            </strong>
          </p>
          <ul>
            <li>
              Se abastecerá de fuentes certificadas según estándares tales como:
              MARIN TRUST, MSC, SMETA, RFVS y FIP.
            </li>
            <li>
              El fabricante de materias primas debe garantizar que las especies
              utilizadas no procedan de la de la captura de peces silvestres
              clasificados como en peligro crítico o en peligro de extinción en
              la Lista Roja de la UICN (Unión Internacional para la Conservación
              de la Naturaleza).
            </li>
            <li>
              Para las pesquerías de reducción: El productor debe presentar
              documentación que constate que la captura no procede de pesca de
              especies incluidas en la lista roja de UICN, tal como se define en
              el Código de Conducta para la Pesca Responsable de la FAO.
            </li>
          </ul>
          <p>
            <strong>
              Productores de ingredientes de origen vegetal, HAID (Ecuador) FEED
              CIA. LTDA:
            </strong>
          </p>
          <ul>
            <li>
              Se abastecerá de ingredientes de zonas que no procedan de
              deforestación ilegal, ni de tierras agrícolas procedentes de la
              conversión de tierras de zonas designadas de alto valor de
              conservación. Se deben aplicar normas que cumplan con las
              Directrices FEFAC que estén certificadas bajo estándares tales
              como: RSPO, RTRS, DONAU SOJA, PROTERRA, ISCC PLUS, RAINFOREST.
            </li>
          </ul>
        </div>
      </Template>
    ),
  },
  {
    title: "Código de conducta para proveedores",
    content: (
      <Template>
        <div>
          <p>
            En HAID Ecuador comprendemos que nuestro progreso depende de
            relaciones responsables con nuestros aliados comerciales. Por ello,
            contamos con un Código de Conducta que establece los principios de
            integridad, cumplimiento y sostenibilidad que deben seguir todos
            nuestros proveedores.
          </p>
          <p>
            Nos comprometemos a negociar únicamente con entidades que adopten
            estas directrices, garantizando prácticas éticas en toda la cadena
            de suministro. Este Código refleja nuestros estándares corporativos
            y promueve un diálogo continuo con empleados y partes interesadas
            para fortalecer la transparencia y la mejora constante.
          </p>
        </div>
        <div>
          <a
            href={media("2025/12/COMP-04CodigodeConducta.pdf")}
            className="e-btn !bg-green-btn hover:!bg-navy"
          >
            Descargar código de conducta
          </a>
        </div>
      </Template>
    ),
  },
  {
    title: "Adaptabilidad y revisión constante",
    content: (
      <Template>
        <div>
          <p>
            Nuestra política de abastecimiento está orientada a garantizar la
            adquisición de ingredientes marinos y vegetales provenientes de
            fuentes responsables, en cumplimiento con los requisitos del
            estándar ASC Feed Mill, alineados a su vez con los Objetivos de
            Desarrollo Sostenible (ODS). Nos comprometemos a revisar y mejorar
            continuamente nuestras prácticas de compra para asegurar que
            reflejen los más altos principios de sostenibilidad, ética y
            protección ambiental. Esta adaptabilidad fortalece nuestra
            responsabilidad corporativa y nos permite generar un impacto
            positivo en las comunidades, los ecosistemas y toda la cadena de
            valor en la que operamos.
          </p>
        </div>
      </Template>
    ),
  },
  {
    title: "Esquemas de certificación aceptados",
    content: (
      <Template>
        <div>
          <p>
            HAID (Ecuador) FEED CIA. LTDA. se compromete a cumplir con el
            abastecimiento y compra responsable de ingredientes.
            <br />
            Realizaremos revisiones periódicas de esta política para asegurarnos
            de que se mantenga actualizada y sea efectiva en el logro de
            nuestros objetivos de sostenibilidad.
          </p>
        </div>
      </Template>
    ),
  },
  {
    title: "Certificaciones y Sistemas de Calidad.",
    content: (
      <>
        <Template>
          <h4 className="!border-0 !mt-4 !pb-0 !text-[1.1rem]">
            Nuestro compromiso con la excelencia, la trazabilidad y la seguridad
            alimentaria.
          </h4>
          <div>
            <p>
              Trabajamos con una visión clara: garantizar que cada uno de
              nuestros productos cumpla con los más altos estándares de{" "}
              <strong>calidad, inocuidad y trazabilidad</strong>. Este
              compromiso se refleja en la implementación de{" "}
              <strong>
                certificaciones internacionales y sistemas de gestión
                reconocidos
              </strong>
              , que aseguran procesos robustos, controlados y alineados con las
              exigencias de la industria acuícola.
            </p>
            <p>
              Nuestra dedicación a la mejora continua, al cumplimiento normativo
              y a la transparencia en cada etapa del proceso productivo nos
              permite ofrecer alimentos confiables, seguros y consistentes para
              nuestros clientes y socios comerciales.
            </p>
          </div>
          <h4 className="!text-center !text-[1.05rem]">
            Certificaciones de Calidad en HAID (Ecuador) FEED CIA. LTDA.
          </h4>
        </Template>
        <div className="mt-4">
          <Row cols={5}>
            {qualityCerts.map((c) => (
              <InfoBox key={c.file} image={c.image} title={c.title} file={c.file} tall />
            ))}
          </Row>
        </div>
      </>
    ),
  },
];

/** Versión de la sección «Transparencia»: "grid" (tarjetas en dos columnas) o "split" (índice oscuro numerado). */
const TRANSPARENCY: "grid" | "split" = "split";

const principles = [
  "Respeto a los derechos sociales y laborales",
  "Protección de la salud y seguridad de los colaboradores",
  "Gestión ambiental responsable y preventiva",
  "Uso sostenible y trazable de materias primas",
];

export default function AscPage() {
  return (
    <>
      <PageHero
        title="Nuestro Compromiso con La Certificación ASC."
        image="2024/06/HAID-18-scaled.jpg"
        overlay={0.75}
        position="50% 65%"
        className="[&_h1]:max-w-[22ch] [&_h1]:text-[clamp(1.9rem,1rem+3vw,3.6rem)]"
      />

      {/* Introducción: texto a la izquierda, certificado ASC a la derecha */}
      <section className="px-5 py-10 lg:px-8 lg:py-14">
        <div className="e-container grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal animation="fadeInLeft">
            <div className="e-stack flex flex-col text-ink/85">
              <p className="!mb-0 text-[1.15rem] leading-[1.6] text-ink">
                El <strong className="text-navy">Aquaculture Stewardship Council (ASC)</strong> es una organización independiente reconocida a nivel mundial
                por promover prácticas responsables en la acuicultura mediante rigurosos programas de certificación.
              </p>
              <p className="!mb-0">
                En <strong className="text-navy">HAID (ECUADOR) FEED CIA. LTDA.</strong> reafirmamos nuestro compromiso con la sostenibilidad y la
                responsabilidad en cada etapa de nuestro proceso productivo, implementando de manera íntegra el{" "}
                <strong className="text-navy">Estándar ASC para Alimentos (ASC Feed Standard)</strong>.
              </p>
              <p className="!mb-0">
                Este estándar establece los requisitos que deben cumplir las plantas productoras de alimentos para peces y camarones, garantizando una
                operación responsable basada en principios fundamentales como:
              </p>
            </div>
          </Reveal>
          <Reveal animation="fadeInRight">
            <a href={media("2026/10/certificado-asc.pdf")} target="_blank" rel="noopener" className="mx-auto block w-full max-w-[400px]" aria-label="Abrir certificado ASC (PDF)">
              <Image
                src={media("2026/10/certificado-asc.webp")}
                alt="Certificado ASC Feed Standard de HAID (Ecuador) Feed Cia Ltda."
                width={1075}
                height={1521}
                className="block h-auto w-full !rounded-2xl shadow-[0_30px_64px_-34px_rgba(6,34,63,0.6)] ring-1 ring-navy/10"
                sizes="(min-width: 1025px) 480px, 100vw"
              />
            </a>
          </Reveal>
        </div>

        <div className="e-container mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((t) => (
            <div key={t} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-30px_rgba(6,34,63,0.5)] ring-1 ring-navy/10">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-green-btn text-white">
                <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4.5 10.5l3.5 3.5 7.5-8" />
                </svg>
              </span>
              <strong className="font-display text-[0.95rem] leading-snug font-semibold text-navy">{t}</strong>
            </div>
          ))}
        </div>

        <div className="e-container mt-6">
          <p className="relative !mb-0 !max-w-none overflow-hidden rounded-2xl bg-gradient-to-r from-navy to-deep px-6 py-5 text-[1.02rem] leading-relaxed text-white/90 md:px-8">
            <Shrimp gap="transparent" className="pointer-events-none absolute -top-[40%] -right-[3%] w-[min(380px,60%)] text-white opacity-[0.08]" />
            <span className="relative block border-l-[3px] border-leaf pl-4">
              Nuestro objetivo es asegurar que cada uno de nuestros productos contribuya al desarrollo de una acuicultura más ética, segura y sostenible,
              alineada con las expectativas del mercado global y los valores corporativos de HAID.
            </span>
          </p>
        </div>
      </section>

      {TRANSPARENCY === "grid" && (
      <>
      {/* Transparencia (versión A): encabezado con imagen y, debajo, los informes en dos columnas (cada uno abre su PDF) */}
      <section className="bg-mist px-5 py-8 lg:px-8 lg:py-12">
        <div className="e-container">
          <Reveal animation="fadeIn">
            <div className="grid overflow-hidden rounded-[22px] bg-white shadow-[0_28px_60px_-38px_rgba(6,34,63,0.55)] ring-1 ring-navy/10 lg:grid-cols-[0.7fr_1.3fr]">
              <Image
                src={media("2026/10/transparencia.jpg")}
                alt=""
                width={1300}
                height={866}
                className="block h-[180px] w-full !rounded-none object-cover object-[30%_50%] lg:h-full lg:min-h-[240px]"
                sizes="(min-width: 1025px) 560px, 100vw"
              />
              <div className="e-stack flex flex-col justify-center p-5 md:p-7 lg:p-9">
                <h2 className="text-[clamp(1.4rem,1.05rem+1.3vw,2.1rem)]">Transparencia que impulsa nuestro futuro.</h2>
                <p className="!mb-0 text-[0.98rem]">
                  En HAID creemos que la transparencia es un pilar fundamental para avanzar firmemente hacia la sustentabilidad. Por eso, ponemos a
                  disposición de nuestros stakeholders el resumen de nuestras materias primas y los procesos de debida diligencia de nuestros proveedores.
                  Conoce nuestros informes y compromisos oficiales:
                </p>
              </div>
            </div>
          </Reveal>

          <ul className="m-0 mt-4 grid list-none gap-2.5 p-0 md:grid-cols-2">
            {reports.map((r, i) => (
              <li key={r.file}>
                <a
                  href={media(r.file)}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full items-center gap-3 rounded-xl bg-white p-3 pr-4 shadow-[0_12px_28px_-24px_rgba(6,34,63,0.5)] ring-1 ring-navy/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:ring-green-btn/40"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-navy font-display text-[0.8rem] font-semibold text-white transition-colors duration-300 group-hover:bg-green-btn">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-[0.9rem] leading-snug font-medium text-navy">{r.title}</span>
                  <span className="flex shrink-0 items-center gap-1 rounded-md bg-green-btn/10 px-2 py-1 text-[0.68rem] font-bold tracking-wide text-green-btn transition-colors duration-300 group-hover:bg-green-btn group-hover:text-white">
                    PDF
                    <svg viewBox="0 0 20 20" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 13l6-6M8 7h5v5" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </>
      )}

      {TRANSPARENCY === "split" && (
        /* Transparencia (versión B): títulos y texto fijos a la izquierda; informes como índice numerado a la derecha */
        <section className="relative overflow-clip bg-deep px-5 py-10 lg:px-8 lg:py-14">
          <Shrimp gap="#06223f" className="pointer-events-none absolute -top-[8%] -right-[8%] w-[min(700px,110vw)] text-white opacity-[0.045]" />
          <div className="e-container relative grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
            <Reveal animation="fadeInLeft" className="flex">
              <div className="e-stack flex w-full flex-col">
                <h2 className="text-[clamp(1.5rem,1.1rem+1.5vw,2.4rem)] text-white">Transparencia que impulsa nuestro futuro.</h2>
                <p className="!mb-0 border-l-[3px] border-leaf pl-4 text-[0.95rem] leading-relaxed text-white/85">
                  En HAID creemos que la transparencia es un pilar fundamental para avanzar firmemente hacia la sustentabilidad. Por eso, ponemos a
                  disposición de nuestros stakeholders el resumen de nuestras materias primas y los procesos de debida diligencia de nuestros
                  proveedores. Conoce nuestros informes y compromisos oficiales:
                </p>
                {/* La imagen ocupa el alto restante, hasta igualar la altura de la lista de informes. */}
                <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-[20px] shadow-[0_26px_56px_-34px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
                  <Image
                    src={media("2026/10/transparencia.jpg")}
                    alt="Manos sosteniendo una plántula"
                    width={1300}
                    height={866}
                    className="absolute inset-0 size-full !rounded-none object-cover object-[25%_70%]"
                    sizes="(min-width: 1025px) 560px, 100vw"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal animation="fadeInRight">
              <ol className="m-0 list-none overflow-hidden rounded-2xl bg-white/[0.06] p-0 ring-1 ring-white/15">
                {reports.map((r, i) => (
                  <li key={r.file} className={i > 0 ? "border-t border-white/10" : ""}>
                    <a
                      href={media(r.file)}
                      target="_blank"
                      rel="noopener"
                      className="group flex items-center gap-4 px-4 py-3.5 transition-colors duration-300 hover:bg-white/[0.08] md:px-5"
                    >
                      <span className="font-display text-[1.3rem] leading-none font-semibold tracking-[-0.03em] text-leaf/80 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-[0.93rem] leading-snug font-medium text-white">{r.title}</span>
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 group-hover:bg-leaf group-hover:text-deep">
                        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M10 4v9m0 0l-3.5-3.5M10 13l3.5-3.5M5 16h10" />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>
      )}

      {/* Nuestro equipo */}
      <section className="px-5 py-8 lg:px-8 lg:py-12">
        <div className="e-container grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <Reveal animation="fadeInLeft" className="max-lg:order-2">
            <div className="e-stack flex flex-col">
              <h2 className="text-[clamp(1.5rem,1.1rem+1.5vw,2.3rem)]">Nuestro equipo, construyendo nuevas oportunidades.</h2>
              <p className="!mb-0 text-ink">
                En HAID., entendemos que nuestro liderazgo y crecimiento en la industria de la acuicultura son el resultado directo del compromiso, la
                experiencia y las capacidades de las personas que forman parte de nuestra organización. Por ello, cultivamos un entorno de trabajo colaborativo
                que fomenta el desarrollo de nuestro talento humano, permitiéndoles alcanzar su máximo potencial.
              </p>
              <p className="!mb-0">
                Bajo este propósito, reafirmamos nuestro compromiso con la excelencia en la fabricación de alimentos balanceados, operando en cumplimiento
                con los requisitos con los más altos estándares internacionales de certificación, tales como ASC Feed Standard V 1.2 (Aquaculture Stewardship
                Council), BAP Feed Mill Standard V 3.1 (Best Aquaculture Practices) y los estándares aplicables de GLOBALG.A.P. Compound Feed Manufacturing
                (CFM) V 3.1
              </p>
              <p className="!mb-0">
                Para sostener este compromiso, aseguramos la calidad, la inocuidad y un abastecimiento responsable, reflejado en el mantenimiento de cadenas de
                suministro libres de deforestación y de conversión de tierras, así como en la protección de los océanos mediante el uso de zonas específicas de
                pesca responsable. Asimismo, garantizamos que todos nuestros proveedores cuenten con las certificaciones necesarias en sus cadenas de
                suministro.
              </p>
            </div>
          </Reveal>
          <Reveal animation="fadeInRight" className="max-lg:order-1">
            <TeamCarousel images={teamPhotos} />
          </Reveal>
        </div>
      </section>

      {/* Política de abastecimiento responsable (acordeón) */}
      <section className="px-5 pt-2 pb-10 lg:px-8 lg:pb-14">
        <div className="e-container flex flex-col">
          <JetAccordion items={policy} />
        </div>
      </section>
    </>
  );
}
