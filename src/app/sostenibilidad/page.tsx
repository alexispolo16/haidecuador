import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SustAccordion } from "@/components/sostenibilidad/Accordion";
import { SourcingPolicy } from "@/components/sostenibilidad/SourcingPolicy";
import { Shrimp } from "@/components/Shrimp";
import { media } from "@/lib/media";

export const metadata: Metadata = { title: "Sostenibilidad" };

// Textos copiados literalmente de https://www.haid.com.ec/sostenibilidad/; el compromiso público,
// del PDF «Compromiso Público para la Transición a Cadenas de Suministro Libres de Deforestación y Conversión».


const commitments = [
  {
    title: "Procedimientos para cadenas suministro libre de Deforestación y Conversión.",
    text: "Nos comprometemos a revisar periódicamente nuestros procedimientos y realizar las actualizaciones correspondientes para asegurar el abastecimiento de ingredientes vegetales libre de deforestación y conversión en todas nuestras operaciones y en nuestra cadena de suministro.",
  },
  {
    title: "Transparencia y Trazabilidad.",
    text: "Ejecutar con rigor nuestros procesos operativos y de control, manteniendo un trabajo articulado y una comunicación continua con los proveedores para asegurar la recopilación oportuna de toda la evidencia documental de respaldo, garantizando la trazabilidad completa de los productos desde su origen hasta el consumidor final, respaldada por esquemas de certificación que avalan la transparencia e integridad de toda nuestra cadena de suministro.",
  },
  {
    title: "Colaboración con Proveedores.",
    text: "Trabajaremos estrechamente con nuestros proveedores para garantizar que cumplan con nuestros estándares de sostenibilidad. Esto puede incluir capacitaciones y auditorías regulares.",
  },
  {
    title: "Transparencia en los Informes.",
    text: "Nuestros informes serán accesibles y auditables por partes interesadas y el público en general, reflejando nuestro compromiso con la rendición de cuentas y la transparencia.",
  },
  {
    title: "Educación y Concienciación.",
    text: "Proveer información a los consumidores sobre la importancia de elegir productos libres de deforestación y conversión. Fomentaremos una mayor demanda de productos sostenibles a través de la concientización pública.",
  },
  {
    title: "Plan de acción público:",
    text: "Se suspenderá a cualquier proveedor que no cumpla con los estándares éticos y sostenibles. La suspensión se levantará solo cuando el proveedor establece un plan de acción, en un plazo de 1 año a partir de la auditoria inicial y se verifique el cumplimiento continuo.",
  },
];

const tableHead = [
  "Ingrediente",
  "Materia prima básica",
  "Pesquería de origen (MP marina) / País de origen (MP terrestre)",
];
const marine = "Anchoveta / Botella / Chuhueco / Corbata / Jurel / Macarela / Morenillo / Picudillo / Roncador / Sardina / Sardina redonda";
const tableRows = [
  ["Trigo", "Trigo", "Argentina / Brasil / Canada / Estados Unidos"],
  ["Torta de soya", "Soya", "Argentina / Bolivia / Estados Unidos"],
  ["Lecitina de soya", "Soya", "Argentina / Brasil / China / Usa"],
  ["Harina de Pescado", marine, "Chile / Ecuador / Perú"],
  ["Hidrolizado de pescado", marine, "Ecuador / Chile"],
  ["Harina de origen aviar", "Pollo", "Brasil / Estados Unidos"],
];

/** Divide «A / B / C» en etiquetas; si no hay barras, devuelve el texto tal cual. */
function Origins({ value }: { value: string }) {
  if (!value.includes("/")) return <>{value}</>;
  return (
    <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
      {value.split("/").map((v, i) => (
        <li key={i} className="rounded-full bg-mist px-2.5 py-0.5 text-[0.78rem] leading-snug whitespace-nowrap text-navy ring-1 ring-navy/10">
          {v.trim()}
        </li>
      ))}
    </ul>
  );
}

const energy = [
  "En HAID nos comprometemos a implementar y mantener un sistema de gestión de la energía eficiente y sostenible, orientado a la mejora continua del desempeño energético y alineado con nuestros objetivos de calidad, productividad y sostenibilidad ambiental.",
  "Establecemos y revisamos metas energéticas claras, asegurando la disponibilidad de recursos e información necesarios para cumplirlas. Cumplimos con la normativa vigente y otros compromisos relacionados con el uso y consumo de energía.",
  "Promovemos la mejora continua del desempeño energético, priorizando la adquisición de productos eficientes y aplicando criterios de eficiencia en nuestros procesos y diseños.",
  "Esta política guía nuestras decisiones y es comunicada a todo el personal y partes interesadas.",
];

const photo =
  "block w-full rounded-[18px] object-cover shadow-[0_26px_56px_-32px_rgba(6,34,63,0.6)]";

export default function SostenibilidadPage() {
  return (
    <>
      <PageHero title="Sostenibilidad" image="2024/06/DSC7751-1-scaled.jpg" />

      {/* 1 · Política de abastecimiento: texto con entrada alta y la fotografía como contrapeso */}
      <section className="px-5 py-10 lg:px-8 lg:py-14">
        <div className="e-container grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal animation="fadeInLeft">
            <Image
              src={media("2024/06/DSC7723-768x1152.webp")}
              alt=""
              width={768}
              height={1152}
              className={`${photo} aspect-[4/3] object-[50%_25%] lg:aspect-[4/4.6]`}
              sizes="(min-width: 1025px) 560px, 100vw"
            />
          </Reveal>
          <Reveal animation="fadeInRight">
            <div className="e-stack flex flex-col">
              <h2 className="text-[clamp(1.6rem,1.1rem+1.7vw,2.5rem)]">Política de abastecimiento y compra responsable de ingredientes.</h2>
              <p className="text-[1.12rem] leading-[1.6] text-ink">
                En HAID (Ecuador) FEED CIA. LTDA, nos comprometemos a garantizar el abastecimiento y la compra responsable de ingredientes para alimentos
                animales, provenientes de fuentes marinas y vegetales.
              </p>
              <p className="!mb-0">
                Nuestra política de abastecimiento responsable incluye requisitos claramente definidos en cuanto a sostenibilidad, abordando tanto las
                preocupaciones sociales como ambientales. Esta política describe las estrategias adoptadas para adquirir insumos de manera ética y sostenible,
                asegurando que nuestras prácticas beneficien a las comunidades y al medio ambiente.
              </p>
            </div>
          </Reveal>
        </div>
        {/* Los siete puntos de la política (antes en /asc) */}
        <Reveal animation="fadeInUp" className="e-container mt-8 lg:mt-10">
          <SourcingPolicy />
        </Reveal>
      </section>

      {/* 2 · Gestión de la energía: banda de agua somera, políticas como lista */}
      <section className="relative overflow-clip bg-mist px-5 py-10 lg:px-8 lg:py-14">
        <Shrimp gap="#eaf3f1" className="pointer-events-none absolute -right-[6%] -bottom-[18%] w-[min(560px,90vw)] text-navy opacity-[0.07]" />
        <div className="e-container relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal animation="fadeInLeft" className="max-lg:order-2">
            <div className="e-stack flex flex-col">
              <h2 className="text-[clamp(1.6rem,1.1rem+1.7vw,2.5rem)]">Política de gestión de la energía</h2>
              <ul className="m-0 !mt-5 grid list-none gap-3 p-0">
                {energy.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.98rem] leading-[1.6] text-ink/85">
                    <span className="mt-[0.55rem] size-2 shrink-0 rounded-sm bg-green-btn" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal animation="fadeInRight" className="max-lg:order-1">
            <Image src={media("2025/11/politicas-768x507.jpeg")} alt="" width={768} height={507} className={`${photo} aspect-[4/3]`} sizes="(min-width: 1025px) 560px, 100vw" />
          </Reveal>
        </div>
      </section>

      {/* 3 · Compromiso público: el fondo oscuro marca el cambio de tema y concentra los seis compromisos */}
      <section className="relative overflow-clip bg-deep px-5 py-10 lg:px-8 lg:py-14">
        <Shrimp gap="#06223f" className="pointer-events-none absolute -top-[6%] -right-[8%] w-[min(760px,120vw)] text-white opacity-[0.045]" />
        <div className="e-container relative">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal animation="fadeInLeft" className="max-lg:order-2">
              <div className="e-stack flex flex-col">
                <h2 className="text-[clamp(1.6rem,1.1rem+1.7vw,2.5rem)] text-white">Compromiso público para la transición a cadenas de suministro libres de deforestación y conversión.</h2>
                <p className="!mb-0 border-l-[3px] border-leaf pl-4 text-white/85">
                  Nosotros, Haid (Ecuador) Feed Cia Ltda., reconociendo la urgente necesidad de proteger nuestros bosques y otros ecosistemas naturales,
                  declaramos públicamente nuestro compromiso de transitar hacia cadenas de suministro libres de deforestación y conversión. A continuación,
                  se describen los elementos clave de este compromiso:
                </p>
              </div>
            </Reveal>
            <Reveal animation="fadeInRight" className="max-lg:order-1">
              <Image src={media("2024/06/DSC5805-scaled.webp")} alt="" width={2560} height={1707} className={`${photo} aspect-[4/3] max-h-[340px]`} sizes="(min-width: 1025px) 560px, 100vw" />
            </Reveal>
          </div>

          <Reveal animation="fadeInUp" className="mt-8">
            <SustAccordion
              items={commitments.map((c) => ({
                title: c.title,
                content: (
                  <div className="rich">
                    <ul>
                      <li>{c.text}</li>
                    </ul>
                  </div>
                ),
              }))}
            />
          </Reveal>
          <div className="mx-auto mt-6 flex max-w-[860px] items-start gap-4 rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/15 md:items-center md:p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-leaf/20 text-leaf">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
                <path d="M8.5 12l2.5 2.5 4.5-5" />
              </svg>
            </span>
            <p className="m-0 max-w-none text-[1rem] leading-relaxed text-white/90 md:text-[1.05rem]">
              Haid (Ecuador) Feed Cia Ltda., se compromete a asegurar el abastecimiento de ingredientes vegetales libres de deforestación/conversión
              teniendo cómo fecha máxima <strong className="font-semibold text-leaf">diciembre&nbsp;2028</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · Sustentabilidad: ingredientes y su origen */}
      <section className="px-5 py-10 lg:px-8 lg:py-14">
        <div className="e-container flex flex-col gap-5">
          <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-navy to-deep p-6 shadow-[0_28px_60px_-36px_rgba(6,34,63,0.8)] md:p-8 lg:grid lg:grid-cols-[0.6fr_1.4fr] lg:items-center lg:gap-12 lg:p-10">
            <Shrimp gap="transparent" className="pointer-events-none absolute -right-[6%] -bottom-[24%] w-[min(460px,80%)] text-white opacity-[0.06]" />
            <h2 className="relative text-white max-lg:mb-4">Sustentabilidad</h2>
            <p className="relative !mb-0 !max-w-none border-l-[3px] border-leaf pl-4 text-[0.98rem] leading-[1.7] text-white/90 md:text-[1.02rem]">
              Asegurarnos de fabricar nuestros alimentos a partir de materias primas de origen responsable es esencial para nuestra sostenibilidad. Cada
              producto se elabora con ingredientes seleccionados por su bajo impacto ambiental y procedencia ética. Nos comprometemos a que todos los
              componentes sean obtenidos de manera responsable, apoyando así la preservación del medio ambiente y las comunidades locales. Priorizamos la
              sostenibilidad en cada etapa de nuestra cadena de suministro, garantizando productos de alta calidad y respetuosos con el planeta.
            </p>
          </div>

          {/* Escritorio y tablet: tabla */}
          <div className="overflow-x-auto rounded-2xl bg-white shadow-[0_24px_54px_-36px_rgba(6,34,63,0.5)] ring-1 ring-navy/10 max-md:hidden">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="bg-navy text-white">
                  {tableHead.map((h) => (
                    <th key={h} className="px-4 py-3 align-middle font-display text-[0.82rem] leading-tight font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row[0]} className="border-t border-navy/10 transition-colors odd:bg-white even:bg-foam hover:bg-mist">
                    <th scope="row" className="w-[22%] px-4 py-3 text-left align-top font-display text-[0.92rem] font-semibold text-navy">
                      {row[0]}
                    </th>
                    <td className="px-4 py-3 align-top text-[0.88rem] leading-snug text-ink">
                      <Origins value={row[1]} />
                    </td>
                    <td className="px-4 py-3 align-top text-[0.88rem] leading-snug text-ink">
                      <Origins value={row[2]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Móvil: una ficha por ingrediente */}
          <ul className="grid list-none gap-3 p-0 md:hidden">
            {tableRows.map((row) => (
              <li key={row[0]} className="rounded-2xl bg-white p-4 ring-1 ring-navy/10">
                <p className="m-0 font-display text-[1rem] font-semibold text-navy">{row[0]}</p>
                <dl className="m-0 mt-3 grid gap-2.5">
                  {[1, 2].map((i) => (
                    <div key={i}>
                      <dt className="text-[0.72rem] font-semibold tracking-wide text-muted">{tableHead[i]}</dt>
                      <dd className="m-0 mt-1 text-[0.88rem] leading-snug text-ink">
                        <Origins value={row[i]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
