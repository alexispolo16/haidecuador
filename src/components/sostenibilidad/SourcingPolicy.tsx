import type { ReactNode } from "react";
import { Accordion } from "@/components/Accordion";
import { media } from "@/lib/media";

/*
 * Política de abastecimiento y compra responsable de ingredientes (acordeón de 7 puntos).
 * Contenido copiado literalmente de https://www.haid.com.ec/asc/; se muestra en /sostenibilidad,
 * debajo de la sección «Política de abastecimiento y compra responsable de ingredientes».
 */

type PolicyItem = { title: string; content: ReactNode };

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

// Plantilla Elementor embebida en cada pestaña del acordeón (contenedor boxed, padding 10px).
function Template({ children }: { children: ReactNode }) {
  return <div className="rich">{children}</div>;
}


const policy: PolicyItem[] = [
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

/** Todos cerrados al inicio, uno abierto a la vez. */
export function SourcingPolicy() {
  return <Accordion items={policy} variant="list" />;
}
