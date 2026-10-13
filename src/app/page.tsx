import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CertSlides } from "@/components/home/CertSlides";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { Reveal } from "@/components/Reveal";
import { Shrimp } from "@/components/Shrimp";
import { media, optimized } from "@/lib/media";

export const metadata: Metadata = { title: { absolute: "Haid Ecuador - Haid Ecuador" } };

// Textos copiados literalmente de https://www.haid.com.ec/

const pillars = [
  {
    color: "text-black fill-black",
    title: "Sostenibilidad",
    text: "Haid garantiza el uso de materias primas certificadas libres de deforestación y de pesca ilegal, provenientes de fuentes responsables. Diseñamos productos de materias primas de alta calidad y de bajo impacto ambiental asegurando un futuro sostenible.",
  },
  {
    color: "text-[#635D5D] fill-[#635D5D]",
    title: "Desarrollo de alta calidad",
    text: "El diseño de los productos de Haid se basa en las necesidades nutricionales del camarón y se ajusta con precisión de acuerdo a las condiciones ambientales y planes de cultivo. Trabajamos arduamente para satisfacer la demanda de nuestros clientes sobre piensos nutricionales completos y costo - eficiente.",
  },
  {
    color: "text-[#635D5D] fill-[#635D5D]",
    title: "Servicio técnico integrado",
    text: "Haid ofrece un servicio técnico integral que incluye: diagnóstico en finca, estrategia de alimentación precisa, manejo de producción, capacitación al personal de camaronera y servicio de laboratorio.",
  },
];

const services = [
  ["Abastecimiento de materia prima", "Control de calidad", "Análisis de datos de producción", "Servicio técnico"],
  ["Formulación de balanceado", "Métodos de manejo de cultivo", "Gestión de logística", "Diagnóstico de salud"],
];

const products = [
  // `pos`: encuadre exacto del saco dentro del PNG (sin el margen transparente).
  { image: "2024/06/haid-productos-01.png", title: "Starter Pro", pos: "54.3% 48.1%" },
  { image: "2024/06/haid-productos-03.png", title: "Happiness", pos: "56.8% 48.8%" },
  { image: "2024/06/haid-productos-02.png", title: "Starter", pos: "58.5% 47.5%" },
];

const certSlides = [
  "2024/06/Screenshot-2024-06-03-at-18.39.46.png",
  "2024/06/Screenshot-2024-06-03-at-18.38.58.png",
  "2024/06/Screenshot-2024-06-03-at-18.39.28.png",
  "2024/06/Screenshot-2024-06-03-at-18.38.37.png",
];

const certifications = [
  "Best Aquaculture Practives (BAP V 3.1 FEED MILLS )",
  "National Control Plan of Aquaculture and Fisheries",
  "Buenas Prácticas de Almacenamiento (BPA)",
  "Análisis de Peligros y Puntos Críticos de Control (HACCP)",
  "Global Good Agricultural Practices (GLobal GAP V 2.2 COMPOUND FEED MANUFACTURING)",
];

const btn = "e-btn !bg-green-btn hover:!bg-navy";

export default function Home() {
  return (
    <>
      {/* Superficie: la fotografía se muestra entera a la derecha y se funde con el azul donde vive el titular */}
      <section className="relative overflow-clip bg-deep pb-28 lg:pb-32">
        <div className="relative max-lg:h-[260px] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[68%]">
          <HeroSlideshow images={["2024/06/fabrica-2023-5-scaled.jpg", "2024/06/Header.png"]} />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-deep via-deep/10 to-transparent lg:bg-gradient-to-r lg:from-deep lg:via-deep/35 lg:to-transparent lg:to-60%" />
          <div className="absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-deep to-transparent max-lg:hidden" />
        </div>
        <Shrimp gap="#06223f" className="pointer-events-none absolute top-[4%] -left-[10%] w-[min(900px,130vw)] text-white opacity-[0.045]" />
        <div className="e-container relative z-[2] px-5 pt-2 lg:flex lg:min-h-[500px] lg:items-center lg:px-8 lg:pt-0">
          {/* Sin animación de entrada: el titular es el LCP y debe pintarse de inmediato. */}
          <div className="lg:max-w-[600px]">
            <div className="e-stack flex flex-col">
              <h1 className="max-lg:max-w-none">Líder mundial en producción de piensos&nbsp;acuáticos</h1>
              <p className="max-w-[34ch] border-l-[3px] border-leaf pl-4 text-[clamp(1.05rem,1rem+0.5vw,1.3rem)] leading-snug text-white/85">
                Desarrollo de alta calidad y sostenible
              </p>
              <div className="pt-3">
                <Link href="/alimentos-servicios/" className={btn}>
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares: una sola superficie compacta que flota entre el agua y la orilla */}
      <section className="relative z-10 px-5 lg:px-8">
        <div className="e-container">
          <Reveal animation="fadeInUp" className="-mt-20 lg:-mt-24">
            <div className="grid overflow-hidden rounded-[22px] bg-white shadow-[0_26px_60px_-30px_rgba(6,34,63,0.5)] lg:grid-cols-3 max-md:rounded-[18px]">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className={`flex flex-col gap-2.5 p-5 lg:p-6 ${i === 0 ? "bg-navy text-white" : "text-muted"} ${
                    i > 0 ? "border-line max-lg:border-t lg:border-l" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={media(`icons/pilar-${i + 1}.svg`)} alt="" width={400} height={300} className="block size-[60px] shrink-0 !rounded-none object-contain" />
                    <h3 className={`text-[1.4rem] leading-tight ${i === 0 ? "text-white" : ""}`}>{p.title}</h3>
                  </div>
                  <p className="m-0 text-[0.88rem] leading-[1.55]">{p.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Nosotros: imagen que sangra a la izquierda, texto con entrada alta */}
      <section className="relative overflow-clip py-12 lg:py-20">
        <div className="e-container grid items-center gap-8 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8">
          <Reveal animation="fadeInLeft">
            <div className="relative">
              <Shrimp gap="#f6faf9" className="pointer-events-none absolute -bottom-[20%] -left-[12%] w-[78%] text-navy opacity-[0.09]" />
              <Image
                src={media("2024/06/fabrica-2023-6-scaled.jpg")}
                alt=""
                width={2560}
                height={1440}
                className="relative block aspect-[4/3.3] w-full rounded-[28px] rounded-br-[120px] object-cover shadow-[0_30px_70px_-34px_rgba(6,34,63,0.55)] max-md:rounded-br-[70px]"
                sizes="(min-width: 1025px) 640px, 100vw"
              />
            </div>
          </Reveal>
          <Reveal animation="fadeInRight">
            <div className="e-stack flex flex-col">
              <h6>Nosotros</h6>
              <h2>Acerca de Haid Ecuador</h2>
              <div className="text-justify">
                <p>
                  Haid Ecuador Feed Cia. Ltda. forma parte del Grupo Haid, multinacional líder en nutrición y tecnología acuícola, fundada en
                  1998 en Guangdong, China, y reconocida globalmente por su innovación en alimentos balanceados, genética animal y servicios
                  técnicos integrados.
                </p>
                <p>
                  En Ecuador, la compañía inició sus operaciones productivas en abril de 2021, consolidando su presencia en la industria
                  camaronera nacional con una planta moderna ubicada en el Km 4.5 de la Vía Durán–Tambo, provincia del Guayas. Esta
                  instalación, desarrollada con tecnología de punta y altos estándares de eficiencia. Más allá de la fabricación de alimento
                  balanceado, Haid Ecuador se distingue por su servicio técnico integral, que incluye diagnóstico en finca, asesoría en manejo
                  de alimentación, capacitación de personal y soporte de laboratorio, acompañando de cerca el éxito productivo de sus aliados
                  estratégicos.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/estos-es-haid" className={btn}>
                  Leer más
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Servicio al cliente: agua somera (fondo mist) y el collage circular como pieza central */}
      <section className="relative overflow-clip bg-mist py-8 lg:py-12">
        <div className="e-container grid items-center gap-6 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8">
          <Reveal animation="fadeInLeft" className="max-lg:order-2">
            <div className="e-stack flex flex-col">
              <h6>Servicio al cliente</h6>
              <h2>Optimización integral: valor y servicios para nuestros clientes</h2>
              <p className="!mb-0 text-[1rem] text-ink">
                La misión de Haid es proveer servicio técnico integrado que incluye: diagnóstico en campo, estrategia de alimentación de
                precisión, manejo de producción, asesoramiento en campo, capacitación al personal de camaronera y servicio de
                laboratorio&nbsp;
              </p>
              <ul className="m-0 grid list-none grid-cols-2 gap-x-4 p-0 md:gap-x-8">
                {services.flat().map((sv) => (
                  <li key={sv} className="flex items-center gap-2.5 border-b border-navy/15 py-2.5 md:gap-3">
                    <span className="grid size-[18px] shrink-0 place-items-center rounded-full border border-navy/30">
                      <span className="size-[7px] rounded-full bg-green-btn" />
                    </span>
                    <span className="font-display text-[0.85rem] leading-snug font-medium text-ink md:text-[0.92rem]">{sv}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-1">
                <Link href="/alimentos-servicios/" className={btn}>
                  Leer más
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal animation="fadeIn" className="max-lg:order-1">
            <div className="relative mx-auto w-full max-w-[440px] max-md:max-w-[62%]">
              <Shrimp gap="#eaf3f1" className="pointer-events-none absolute -bottom-[14%] -left-[34%] w-[80%] text-navy opacity-[0.1] max-lg:hidden" />
              <Image
                src={media("2024/06/Group-70-2.png")}
                alt=""
                width={1440}
                height={1589}
                className="relative block h-auto w-full drop-shadow-[0_30px_40px_rgba(6,34,63,0.25)]"
                sizes="(min-width: 1025px) 560px, 90vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Productos: texto a la izquierda y un escenario con los tres sacos a la derecha */}
      <section className="bg-white px-5 py-12 lg:px-8 lg:py-16">
        <div className="e-container grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal animation="fadeInLeft">
            <div className="e-stack flex flex-col">
              <h2>Nuestros productos</h2>
              <p>
                Descubre nuestra gama premium de alimentos para camarones. Con ingredientes de calidad superior, garantizamos un crecimiento
                saludable y un rendimiento óptimo para tus peces y crustáceos. ¡Alimenta el éxito de tu granja acuícola con nosotros!
              </p>
              <div className="pt-2">
                <Link href="/alimentos-servicios/" className={btn}>
                  Ver más
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal animation="fadeInRight">
            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-navy to-deep px-2 py-8 shadow-[0_30px_70px_-36px_rgba(6,34,63,0.7)] sm:px-6 lg:py-10">
              <Shrimp gap="transparent" className="pointer-events-none absolute -top-[6%] -right-[8%] w-[78%] text-white opacity-[0.07]" />
                            <ul className="relative grid list-none grid-cols-3 items-end p-0">
                {products.map((p, i) => (
                  <li key={p.title} className={i === 1 ? "z-[2]" : "z-[1]"}>
                    <Link href="/alimentos-servicios/" className="group flex flex-col items-center">
                      <span
                        role="img"
                        aria-label={p.title}
                        className={`block aspect-[510/720] bg-no-repeat drop-shadow-[0_22px_22px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-y-2 ${
                          i === 1 ? "h-[112px] sm:h-[185px] lg:h-[185px]" : "h-[84px] sm:h-[151px] lg:h-[151px]"
                        }`}
                        style={{ backgroundImage: `url("${optimized(p.image, 640)}")`, backgroundSize: "204.3% auto", backgroundPosition: p.pos }}
                      />
                      <span className="relative mt-4 flex flex-col items-center gap-1.5 font-display text-[0.95rem] font-semibold text-white sm:text-[1.1rem]">
                        {p.title}
                        <span className="h-[3px] w-6 rounded-full bg-leaf transition-[width] duration-300 group-hover:w-12" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sostenibilidad: fotografía y contenido en dos columnas, sobre fondo claro */}
      <section className="px-5 py-12 lg:px-8 lg:py-16">
        <div className="e-container grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal animation="fadeIn">
            <Image
              src={media("2024/06/DSC7762-scaled.jpg")}
              alt=""
              width={2560}
              height={1707}
              className="block aspect-[4/3] w-full rounded-[20px] object-cover shadow-[0_26px_56px_-32px_rgba(6,34,63,0.6)] lg:aspect-[4/5]"
              sizes="(min-width: 1025px) 520px, 100vw"
            />
          </Reveal>
          <Reveal animation="fadeInRight">
            <div className="e-stack flex flex-col">
              <h6>Sostenibilidad</h6>
              <h2>Producción Sostenible de Ingredientes</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_16px_36px_-26px_rgba(6,34,63,0.5)] ring-1 ring-navy/10 md:p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy text-white">
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 12c2.5-4 6-6 10-6 3 0 5.5 1.3 8 4-2.5 2.7-5 4-8 4-4 0-7.5-2-10-6z" />
                      <path d="M3 12l-1-3m1 3l-1 3M16.5 10.5h.01" />
                    </svg>
                  </span>
                  <p className="m-0 text-[0.92rem] leading-[1.6] text-ink/85">
                    Los productores de materias primas de origen marino deben adoptar prácticas sostenibles, asegurando el cumplimiento de estándares
                    ambientales como MARIN TRUST, MSC, SMETA, RFVS y FIP, para garantizar un abastecimiento responsable. Además, no deben incluir especies
                    en peligro según la Lista Roja de la UICN y deben documentar la procedencia de las pesquerías de reducción conforme al Código de la
                    FAO.
                  </p>
                </div>
                <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_16px_36px_-26px_rgba(6,34,63,0.5)] ring-1 ring-navy/10 md:p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-green-btn text-white">
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 19c0-8 4-13 14-14 0 9-4 14-12 14" />
                      <path d="M5 19c2-5 5-8 9-10" />
                    </svg>
                  </span>
                  <p className="m-0 text-[0.92rem] leading-[1.6] text-ink/85">
                    El abastecimiento de materias primas de origen vegetal también debe provenir de zonas libres de deforestación y conversión, así como
                    de áreas de alto valor de conservación, aplicando normas certificadas por los miembros de ISEAL, promoviendo así una producción
                    respetuosa con el entorno y la&nbsp;biodiversidad.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <Link href="/sostenibilidad" className={btn}>
                  Leer más
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Presencia: titular y mapa en una sola fila */}
      <section className="relative overflow-clip bg-[#023894] px-5 py-8 lg:px-8 lg:py-6">
        <Shrimp gap="#023894" className="pointer-events-none absolute -top-[30%] -left-[6%] w-[min(520px,90vw)] text-white opacity-[0.07]" />
        <div className="e-container relative z-[2] grid items-center gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <h2 className="text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] text-white max-lg:text-center">Haid tiene presencia en más de 10 países y regiones</h2>
          <Image src={media("2024/06/Mapa-1.png")} alt="" width={1354} height={538} className="mx-auto block h-auto max-h-[300px] w-auto max-w-full" sizes="(min-width: 768px) 760px, 100vw" />
        </div>
      </section>

      {/* Certificaciones */}
      <section className="px-5 py-12 lg:px-8 lg:py-16">
        <div className="e-container grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal animation="fadeInLeft">
            <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_30px_70px_-34px_rgba(6,34,63,0.5)] ring-1 ring-navy/10">
              <CertSlides images={certSlides} />
            </div>
          </Reveal>
          <Reveal animation="fadeInRight">
            <div className="e-stack flex flex-col">
              <h2 className="text-[clamp(1.9rem,1.2rem+2.2vw,3.1rem)]">Haid cuenta con las siguientes certificaciones</h2>
              <p className="text-muted">
                Conoce nuestras certificaciones. Haid se certifica para dar un mejor servicio, garantizando altos estándares de calidad, gestión
                ambiental y seguridad laboral en todas sus operaciones.
              </p>
              <ul className="list-none p-0">
                {certifications.map((c, i) => (
                  <li key={c} className="flex items-center gap-4 border-b border-navy/15 py-3 first:border-t">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={media(`icons/certificacion-${i + 1}.svg`)} alt="" width={44} height={44} loading="lazy" className="block size-11 shrink-0 !rounded-none object-contain" />
                    <span className="font-display text-[1rem] leading-snug font-medium text-ink">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
