import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SustAccordion } from "@/components/sostenibilidad/Accordion";
import { HorizontalTabs } from "@/components/sostenibilidad/HorizontalTabs";
import { LogoCarousel } from "@/components/sostenibilidad/LogoCarousel";
import { media } from "@/lib/media";

export const metadata: Metadata = { title: "Sostenibilidad" };

// Textos copiados literalmente de https://www.haid.com.ec/sostenibilidad/

/** Títulos h2 de la página (2.1rem; 2.5rem en tablet; sin capitalizar). */
const h2 =
  "text-[2.1rem] normal-case max-lg:text-[2.5rem] max-md:text-[2.1rem]";
const list = "m-0 list-disc pl-10";

// Plantilla "Certificaciones" (post 1051) incrustada en la última pestaña.
const certificationLogos = [
  { src: "2024/06/haid-logos-13-768x576.jpg", alt: "haid logos-13" },
  { src: "2024/06/haid-logos-11-768x576.jpg", alt: "haid logos-11" },
  { src: "2024/06/haid-logos-10-768x576.jpg", alt: "haid logos-10" },
  { src: "2024/06/haid-logos-09-768x576.jpg", alt: "haid logos-09" },
  { src: "2024/06/haid-logos-14-768x576.jpg", alt: "haid logos-14" },
];

const sourcingTabs = [
  {
    label: "Abastecimiento responsable",
    content: (
      <ul className={list}>
        <li>
          En HAID (Ecuador) FEED CIA. LTDA., realizamos una evaluación
          sistemática de los riesgos de sostenibilidad asociados con el
          productor de materias primas y con el fabricante de ingredientes. Con
          base en los resultados de estas evaluaciones de riesgo o Due
          Dilligence se toma la decision de adquisicion. Nuestro equipo de
          adquisiciones se esfuerza por reducir el impacto ambiental causado por
          la pesca y agricultura.
        </li>
      </ul>
    ),
  },
  {
    label: "Evaluación de proveedores",
    content: (
      <ul className={list}>
        <li>
          El punto de partida es el cumplimiento del Código de Conducta de
          Proveedores para gestionar los posibles riesgos socioambientales de
          los ingredientes. Este código de conducta se combina con el Due
          Diligence, que se llevará a cabo respecto los fabricantes de
          ingredientes, así como a la producción de materias primas básica.
          Estos incluyen proveedores locales e internacionales. Para esta
          evaluación inicial, requerimos: <br />* Ficha Técnica de la materia
          prima
          <br />* Certificaciones aceptadas por ISEAL o algún esquema aceptado
          por ASC.
          <br />* Aplicación de nuestro Código de Conducta
          <br />* Evaluación de Riesgos Due Dilligence.
        </li>
      </ul>
    ),
  },
  {
    label: "Estándares adecuados",
    content: (
      <>
        Los productores de materias primas de origen marino y de origen vegetal
        deberán considerar prácticas sostenibles, asegurándose de que los
        procesos de producción de las materias primas cumplan con estándares
        medioambientales según los objetivos de la ODS: <br />{" "}
        <u>
          Productores de ingredientes de origen marino, HAID (Ecuador) FEED CIA.
          LTDA:
        </u>
        <ul className={list}>
          <li>
            Se abastecerá de fuentes certificadas según estándares tales como:
            MARIN TRUST, MSC, SMETA, RFVS y FIP.
          </li>
          <li>
            El fabricante de materias primas debe garantizar que las especies
            utilizadas no procedan de la de la captura de peces silvestres
            clasificados como en peligro crítico o en peligro de extinción en la
            Lista Roja de la UICN (Unión Internacional para la Conservación de
            la Naturaleza).
          </li>
          <li>
            Para las pesquerías de reducción: El productor debe presentar
            documentación que constate que la captura no procede de pesca de
            especies incluidas en la lista roja de UICN, tal como se define en
            el Código de Conducta para la Pesca Responsable de la FAO.
          </li>
        </ul>
        {"  "}
        <u>
          Productores de ingredientes de origen vegetal, HAID (Ecuador) FEED
          CIA. LTDA:
        </u>
        <ul className={list}>
          <li>
            Se abastecerá de ingredientes de zonas que no procedan de
            deforestación ilegal, ni de tierras agrícolas procedentes de la
            conversión de tierras de zonas designadas de alto valor de
            conservación. Se deben aplicar normas que cumplan con las
            Directrices FEFAC que estén certificadas bajo estándares tales como:
            RSPO, RTRS, DONAU SOJA, PROTERRA, ISCC PLUS, RAINFOREST.
          </li>
        </ul>
      </>
    ),
  },
  {
    label: "Comunicación con proveedores",
    content: (
      <>
        Apreciamos que nuestro progreso se fundamenta en la colaboración con
        nuestros asociados comerciales. Por ello, hemos establecido un Código de
        Conducta que rige nuestra relación con ellos, abordando aspectos de
        integridad, cumplimiento y sostenibilidad. Nos comprometemos a entablar
        negociaciones únicamente con entidades o personas que se adhieran a las
        pautas establecidas en nuestro Código de Conducta para Proveedores.{" "}
        <br />
        <br />{" "}
        {/* Enlace con el color por defecto del tema (Hello Elementor). */}
        <a
          href={media("2024/07/COMP-04-Codigo-de-Conducta.pdf")}
          className="text-[#c36] hover:text-[#336]"
        >
          Descargar Codigo de Conducta
        </a>
      </>
    ),
  },
  {
    label: "Adaptabilidad y revisión constante",
    content: (
      <p>
        Nuestra política de abastecimiento se enfoca en adquirir fuentes
        responsables de origen marino y vegetal, conforme a los requisitos de
        ASC feed mill, los cuales se basan en los Objetivos de Desarrollo
        Sostenible (ODS). Nos comprometemos a revisar regularmente nuestras
        prácticas de abastecimiento para garantizar que estén alineadas con los
        principios de sostenibilidad y contribuyan activamente al logro de los
        ODS. Esta adaptabilidad nos permite no solo cumplir con los estándares
        éticos y ambientales más altos, sino también promover un impacto
        positivo en las comunidades y el medio ambiente en los&nbsp;que&nbsp;operamos.
      </p>
    ),
  },
  {
    label: "Esquemas de certificacion\u00a0aceptados",
    content: (
      <>
        <p>
          HAID (Ecuador) FEED CIA. LTDA. se compromete a cumplir con el
          abastecimiento y compra responsable de ingredientes.&nbsp; Realizaremos
          revisiones periódicas de esta política para asegurarnos de que se
          mantenga actualizada y sea efectiva en el logro de nuestros objetivos
          de sostenibilidad.
        </p>
        <p />
        {/* Plantilla Elementor 1051: contenedor con título y carrusel de logos. */}
        <div className="flex flex-col gap-5 p-2.5">
          <h2 className="text-center text-[25px] max-lg:text-[25px] max-md:text-[25px]">
            Certificaciones
          </h2>
          <LogoCarousel images={certificationLogos} />
        </div>
        <p />
      </>
    ),
  },
];

const commitments = [
  {
    title:
      "Procedimientos para cadenas suministro libre de Deforestación y Conversión",
    text: "Establecer procedimientos para asegurar el abastecimiento de ingredientes vegetales libres de deforestación y conversión en todas nuestras operaciones y en nuestra cadena de suministro.",
  },
  {
    title: "Transparencia y Trazabilidad",
    text: "Implementar sistemas para asegurar la trazabilidad de todos nuestros productos desde su origen hasta el consumidor final. Utilizar certificaciones para garantizar la transparencia y la integridad de nuestra cadena de suministro.",
  },
  {
    title: "Colaboración con Proveedores",
    text: "Trabajar estrechamente con nuestros proveedores para garantizar que cumplan con nuestros estándares de sostenibilidad. Incluir capacitaciones y auditorías regulares.",
  },
  {
    title: "Transparencia en los Informes",
    text: "Ser accesibles y auditables por partes interesadas y el público en general, reflejar nuestro compromiso con la rendición de cuentas y la transparencia.",
  },
  {
    title: "Educación y Concienciación",
    text: "Proveer información a los consumidores sobre la importancia de elegir productos libres de pesca ilegal, deforestación y conversión. Fomentar una mayor demanda de productos sostenibles a través de la concienciación pública.",
  },
  {
    title: "Plan de acción público",
    text: "Suspender a cualquier proveedor que no cumpla con los estándares éticos y sostenibles. Levantar la suspensión solo cuando el proveedor establezca un plan de acción, en un plazo de 1 año a partir de la auditoría inicial y se verifique el cumplimiento continuo.",
  },
];

const fish =
  "Jurel/ Caballa/ Bonito/ Pinchagua/ Morenillo/ Sardina/ Botella/ Atún/ Albacora/ Dorado/ Merluza/ Macerela/ Gallina/ Picudillo/ Barrilete";

const tableHead = [
  "N°",
  "Ingrediente",
  "Materia prima básica",
  "Pesquería de origen (MP marina) / País de origen (MP terrestre)",
];
const tableRows = [
  ["1.", "Trigo", "Trigo", "Estados Unidos / Brasil"],
  [
    "2.",
    "Torta de soya",
    "Soya",
    "Argentina / Estados Unidos / Paraguay / Argentina / Bolivia",
  ],
  [
    "3.",
    "Lecitina de soya",
    "Soya",
    "Argentina / China / Estados Unidos / Brasil / México",
  ],
  ["4.", "Harina de Pescado", fish, "Ecuador / Perú"],
  ["5.", "Hidrolizado de pescado", fish, "Ecuador / Chile"],
  ["6.", "Harina de origen aviar", "Pollo", "Estados Unidos / Italia / Brasil"],
];

export default function SostenibilidadPage() {
  return (
    <>
      <PageHero
        title="Sostenibilidad"
        image="2024/06/DSC7751-1-scaled.jpg"
        className="max-md:px-0 max-md:py-[4em] max-md:[&_h1]:text-[3rem]"
      />

      {/* Política de abastecimiento + tabs + política de energía */}
      <section className="py-[4em] max-md:py-[2em]">
        <div className="e-container flex flex-col gap-5">
          <div className="flex gap-5 p-2.5 max-md:flex-wrap">
            <div className="flex w-full flex-col justify-center p-2.5">
              <div className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media("2024/06/DSC7723-768x1152.webp")}
                  alt=""
                  width={768}
                  height={1152}
                  className="inline-block h-auto w-[90%] rounded align-middle"
                />
              </div>
            </div>
            <div className="flex w-full flex-col justify-center gap-5 p-2.5">
              <h2 className={h2}>
                Política de abastecimiento y compra responsable de ingredientes.
              </h2>
              <div className="text-black">
                <p>
                  En HAID (Ecuador) FEED CIA. LTDA, nos comprometemos a
                  garantizar el abastecimiento y la compra responsable de
                  ingredientes para alimentos animales, provenientes de fuentes
                  marinas y vegetales.
                </p>
                <p>
                  Nuestra política de abastecimiento responsable incluye
                  requisitos claramente definidos en cuanto a sostenibilidad,
                  abordando tanto las preocupaciones sociales como ambientales.
                  Esta política describe las estrategias adoptadas para adquirir
                  insumos de manera ética y sostenible, asegurando que nuestras
                  prácticas beneficien a las comunidades y al medio ambiente.
                </p>
                <p>
                  A continuación, presentamos algunas directrices clave para el
                  abastecimiento y la compra responsable de ingredientes:
                </p>
              </div>
            </div>
          </div>

          <div className="max-lg:order-last max-lg:pr-[9px]">
            <HorizontalTabs items={sourcingTabs} />
          </div>

          <div className="flex gap-5 p-2.5 max-md:flex-wrap">
            <div className="flex shrink-0 grow-0 flex-col justify-center gap-5 p-2.5 md:w-[43.456%] max-md:w-full">
              <h2 className={h2}>POLÍTICA DE GESTIÓN DE LA ENERGÍA</h2>
              <div className="text-black">
                <p>
                  En HAID nos comprometemos a implementar y mantener un sistema
                  de gestión de la energía eficiente y sostenible, orientado a
                  la mejora continua del desempeño energético y alineado con
                  nuestros objetivos de calidad, productividad y sostenibilidad
                  ambiental.
                  <br />
                  Establecemos y revisamos metas energéticas claras, asegurando
                  la disponibilidad de recursos e información necesarios para
                  cumplirlas. Cumplimos con la normativa vigente y otros
                  compromisos relacionados con el uso y consumo de energía.
                  <br />
                  Promovemos la mejora continua del desempeño energético,
                  priorizando la adquisición de productos eficientes y aplicando
                  criterios de eficiencia en nuestros procesos y diseños.
                  <br />
                  Esta política guía nuestras decisiones y es comunicada a todo
                  el personal y partes interesadas.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col justify-center p-2.5">
              <div className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media("2025/11/politicas-768x507.jpeg")}
                  alt=""
                  width={768}
                  height={507}
                  className="inline-block h-auto w-[90%] rounded align-middle"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compromiso público (en tablet/móvil la imagen va primero) */}
      <section className="px-[1em] pt-[5em] max-lg:px-0 max-lg:pt-[2em]">
        <div className="e-container flex max-lg:flex-col-reverse">
          <Reveal
            animation="fadeInLeft"
            className="e-stack flex w-[54%] flex-col justify-center py-[1em] pr-[4em] pl-[1em] max-lg:w-full max-lg:pr-[1em]"
          >
            <h2 className={h2}>
              Compromiso público para la transición a cadenas de suministro
              libres de deforestación y conversión.
            </h2>
            <div className="-mb-[15px] text-left text-base leading-[1.8em] text-black max-md:text-[0.9rem]">
              <p>
                Nosotros, Haid (Ecuador) Feed Cia Ltda., reconociendo la urgente
                necesidad de proteger nuestros bosques y otros ecosistemas
                naturales, declaramos públicamente nuestro compromiso de
                transitar hacia cadenas de suministro libres de pesca ilegal,
                deforestación y conversión. Nos comprometemos a:
              </p>
            </div>
          </Reveal>
          <div className="flex w-[45.919%] flex-col justify-center p-[1em] max-lg:w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media("2024/06/DSC5805-scaled.webp")}
              alt=""
              width={2560}
              height={1707}
              className="inline-block h-auto w-full rounded align-middle"
            />
          </div>
        </div>
      </section>

      <section className="px-[1em] pb-[5em]">
        <div className="e-container">
          <div className="p-[1em]">
            <div className="mb-5 flex py-0.5">
              <span className="mx-auto flex w-[12%] border-t-[3px] border-navy max-md:w-[40%]" />
            </div>
            <div className="overflow-hidden">
              <Reveal animation="fadeInDown" className="p-2.5">
                <SustAccordion
                  items={commitments.map((c) => ({
                    title: c.title,
                    content: (
                      <ul className={list}>
                        <li>{c.text}</li>
                      </ul>
                    ),
                  }))}
                />
              </Reveal>
            </div>
            <div className="pt-2.5 text-center text-black">
              <p>
                Con este compromiso, Haid (Ecuador) Feed Cia Ltda., se
                compromete a asegurar el abastecimiento de ingredientes
                vegetales libres de deforestación/conversión desde el 1 de mayo
                2024 terminando su implementación&nbsp;en&nbsp;mayo&nbsp;2025.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustentabilidad + tabla de ingredientes */}
      <section className="pt-[1%] pb-[6%] max-lg:pt-0 max-lg:pb-[10%]">
        <div className="e-container flex flex-col justify-center gap-5">
          <div className="py-5">
            <h2 className="text-center">Sustentabilidad</h2>
          </div>
          <div className="px-1 py-2.5 text-black">
            <p>
              Asegurarnos de fabricar nuestros alimentos a partir de materias
              primas de origen responsable es esencial para nuestra
              sostenibilidad. Cada producto se elabora con ingredientes
              seleccionados por su bajo impacto ambiental y procedencia ética.
              Nos comprometemos a que todos los componentes sean obtenidos de
              manera responsable, apoyando así la preservación del medio
              ambiente y las comunidades locales. Priorizamos la sostenibilidad
              en cada etapa de nuestra cadena de suministro, garantizando
              productos de alta calidad y respetuosos con el planeta.
            </p>
          </div>
          <div>
            <table className="mx-auto w-full max-w-full">
              <thead>
                <tr>
                  {tableHead.map((h) => (
                    <th
                      key={h}
                      className="border-t border-[rgba(128,128,128,0.5)] bg-navy px-[70px] py-5 text-center align-top font-['Montserrat',sans-serif] text-base leading-none font-semibold text-white first:rounded-tl-[5px] last:rounded-tr-[5px] max-lg:px-1 max-lg:py-[15px]"
                    >
                      <span className="font-display">{h}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr
                    key={row[0]}
                    className="odd:bg-[rgba(128,128,128,0.07)] even:bg-[#f2f2f2]"
                  >
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className="px-[15px] py-5 align-top font-display text-sm leading-none text-black hover:text-green-btn"
                      >
                        <div className="text-center">{cell}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
