import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  JetAccordion,
  type JetAccordionItem,
} from "@/components/asc/JetAccordion";
import { media } from "@/lib/media";

export const metadata: Metadata = { title: "ASC" };

// Contenido copiado literalmente de https://www.haid.com.ec/asc/

// Info boxes (Essential Addons) con imagen, título y botón "Descargar".
function InfoBox({
  image,
  title,
  file,
  color,
}: {
  image: string;
  title: string;
  file: string;
  color: "teal" | "green";
}) {
  const btn =
    color === "teal"
      ? "border-[#04B3AB] hover:bg-[#04B3AB]"
      : "border-[#09893C] hover:bg-[#09893C]";
  return (
    <div className="text-center">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media(image)} alt="" className="inline max-w-full align-baseline" />
      </div>
      <div>
        <h2 className="mt-2 mb-4 text-[12px] text-black">{title}</h2>
        <div>
          <a
            href={media(file)}
            className={`inline-flex items-center rounded-[7px] leading-[1.8em] border-[3px] border-solid bg-white px-2.5 py-[5px] text-black transition-all duration-300 ease-in-out hover:text-white ${btn}`}
          >
            <span className="text-[13px]">Descargar</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// Contenedor flex de Elementor (padding 10px, gap 20px).
function Box({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-1 flex-col gap-5 p-2.5 ${className}`}>
      {children}
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex gap-5 p-2.5 max-md:flex-col">{children}</div>;
}

const reportRows = [
  [
    { title: "GHG Emission Report", file: "2025/12/GHG-Emission-Report.pdf" },
    {
      title: "Due Diligence Report 2024",
      file: "2025/12/Due-Diligence-Report.pdf",
    },
    {
      title: "Volume if marine ingredients and MSL Report 2023",
      file: "2025/12/Volume-if-marine-ingredients-and-MSL-Report.pdf",
    },
  ],
  [
    {
      title: "Due Dilgence Report 2025",
      file: "2025/12/2024-Plantilla-ASC-para-Reportes-de-Via-de-Due-Diligence-y-Ingredientes-vegetales-de-bajo-riesgo.pdf",
    },
    {
      title: "Raw Material Report 2024",
      file: "2025/12/Raw-Material-Report-2024.pdf",
    },
    {
      title: "PLAN DE ACCION DE HAID ECUADOR",
      file: "2025/12/PLAN-DE-ACCION-DE-HAID-ECUADOR-V1.1.pdf",
    },
  ],
  [
    {
      title: "REPORTE DE PROGRESO NO DEFORESTACION DE HAID ECUADOR",
      file: "2025/12/REPORTE-DE-PROGRESO-NO-DEFORESTACION-DE-HAID-ECUADOR.pdf",
    },
    {
      title: "COMPROMISO PUBLICO HAID ECUADOR",
      file: "2025/12/COMPROMISO-PUBLICO-HAID-ECUADOR-V1.1.pdf",
    },
    null, // contenedor vacío en el original
  ],
];

const qualityCerts = [
  {
    image: "2025/12/certificaciones-haid-02.png",
    title: "Global G.A.P.",
    file: "2025/12/GLOBAL-GAP.pdf",
  },
  {
    image: "2025/12/certificaciones-haid-03.png",
    title: "Aquaculture Stewardship Council (ASC)",
    file: "2025/12/ASC.pdf",
  },
  {
    image: "2025/12/certificaciones-haid-04.png",
    title: "Best Aquaculture Practices (BAP)",
    file: "2025/12/BAP.pdf",
  },
  {
    image: "2025/12/haid-05.jpg",
    title: "HACCP Plan",
    file: "2025/12/HACCP.pdf",
  },
];

// Plantilla Elementor embebida en cada pestaña del acordeón (contenedor boxed, padding 10px).
function Template({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-5 p-2.5">{children}</div>;
}

const list = "list-disc pl-10";

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
          <ul className={list}>
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
          <ul className={list}>
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
          <ul className={list}>
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
            className="e-btn bg-green-btn"
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
          <h2 className="text-[20px]">
            Nuestro compromiso con la excelencia, la trazabilidad y la seguridad
            alimentaria.
          </h2>
          <div className="text-black">
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
          <h2 className="text-center text-[19px]">
            Certificaciones de Calidad en HAID (Ecuador) FEED CIA. LTDA.
          </h2>
        </Template>
        <div className="p-2.5">
          <div className="flex flex-col justify-center p-2.5">
            <Row>
              {qualityCerts.map((c) => (
                <Box key={c.file}>
                  <InfoBox
                    image={c.image}
                    title={c.title}
                    file={c.file}
                    color="green"
                  />
                </Box>
              ))}
            </Row>
          </div>
        </div>
      </>
    ),
  },
];

export default function AscPage() {
  return (
    <>
      {/* Cabecera: contenedor con imagen, capa #040E1A al 75 % y padding 8em 1em */}
      <section
        className="relative flex min-h-[25vh] flex-col bg-cover bg-no-repeat px-[1em] py-[8em] bg-position-[0px_-460px] max-lg:bg-position-[0px_0px]"
        style={{
          backgroundImage: `url("${media("2024/06/HAID-18-scaled.jpg")}")`,
        }}
      >
        <div className="absolute inset-0 bg-night opacity-75" />
        <div className="e-container relative">
          <h2 className="text-left text-[4.625em] font-bold text-white max-md:text-[2.5em]">
            Nuestro Compromiso con La Certificación ASC.
          </h2>
        </div>
      </section>

      {/* Texto introductorio */}
      <section className="mt-[8%] mb-[2%] flex flex-col px-[6%]">
        <div className="e-container flex flex-col text-black">
          <div>
            <p>
              El <strong>Aquaculture Stewardship Council (ASC)</strong> es una
              organización independiente reconocida a nivel mundial por promover
              prácticas responsables en la acuicultura mediante rigurosos
              programas de certificación.
            </p>
            <p>
              En <strong>HAID (ECUADOR) FEED CIA. LTDA.</strong> reafirmamos
              nuestro compromiso con la sostenibilidad y la responsabilidad en
              cada etapa de nuestro proceso productivo, implementando de manera
              íntegra el{" "}
              <strong>Estándar ASC para Alimentos (ASC Feed Standard)</strong>.
            </p>
            <p>
              Este estándar establece los requisitos que deben cumplir las
              plantas productoras de alimentos para peces y camarones,
              garantizando una operación responsable basada en principios
              fundamentales como:
            </p>
            <ul className={list}>
              <li>
                <strong>Respeto a los derechos sociales y laborales</strong>
              </li>
              <li>
                <strong>
                  Protección de la salud y seguridad de los colaboradores
                </strong>
              </li>
              <li>
                <strong>Gestión ambiental responsable y preventiva</strong>
              </li>
              <li>
                <strong>Uso sostenible y trazable de materias primas</strong>
              </li>
            </ul>
            <div>
              <b>{" "}</b>
            </div>
            <p>
              Nuestro objetivo es asegurar que cada uno de nuestros productos
              contribuya al desarrollo de una acuicultura más ética, segura y
              sostenible, alineada con las expectativas del mercado global y los
              valores corporativos de HAID.
            </p>
          </div>
        </div>
      </section>

      {/* Imagen de certificación + reportes ASC */}
      <section className="p-2.5">
        <div className="e-container flex gap-5 max-md:flex-col">
          <div className="flex w-[46.392%] shrink-0 flex-col justify-center p-2.5 max-md:w-full">
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media("2025/12/certificacion-ASC-1024x793.webp")}
                alt=""
                width={800}
                height={620}
                className="inline-block h-auto max-w-full align-middle"
              />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 p-2.5">
            {reportRows.map((row, i) => (
              <Row key={i}>
                {row.map((r, j) =>
                  r ? (
                    <Box key={r.file}>
                      <InfoBox
                        image="2025/12/asc-haid.png"
                        title={r.title}
                        file={r.file}
                        color="teal"
                      />
                    </Box>
                  ) : (
                    <Box key={j} />
                  ),
                )}
              </Row>
            ))}
          </div>
        </div>
      </section>

      {/* Política de abastecimiento responsable (acordeón) */}
      <section className="p-2.5">
        <div className="e-container flex flex-col">
          <JetAccordion items={policy} />
        </div>
      </section>
    </>
  );
}
