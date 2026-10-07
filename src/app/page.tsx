import type { Metadata } from "next";
import Link from "next/link";
import { CertSlides } from "@/components/home/CertSlides";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { ProductsCarousel } from "@/components/home/ProductsCarousel";
import { boxIcons, certIcons } from "@/components/home/svgs";
import { Reveal } from "@/components/Reveal";
import { FaFasCircle } from "@/components/fa";
import { media } from "@/lib/media";

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
  { image: "2024/06/haid-productos-01.png", title: "Starter Pro" },
  { image: "2024/06/haid-productos-03.png", title: "Happiness" },
  { image: "2024/06/haid-productos-02.png", title: "Starter" },
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

// Botón de los widgets (verde, sin mayúsculas); al pasar el mouse toma el color de acento del kit.
const greenBtn = "e-btn bg-green-btn normal-case hover:bg-amber";
// Encabezado pequeño (h6) en azul.
const eyebrow = "text-navy normal-case";

export default function Home() {
  return (
    <>
      {/* Hero con slideshow de fondo */}
      <section className="relative px-[1em] pt-[2em] pb-[6em]">
        <HeroSlideshow images={["2024/06/工厂2023-5-scaled.jpg", "2024/06/Header.png"]} />
        <div className="absolute inset-0 z-[1] bg-navy opacity-[0.79]" />
        <div className="e-container relative z-[2] flex min-h-[65vh] items-center">
          <Reveal animation="fadeInLeft" className="w-[53.333%] max-lg:w-full">
            <div className="e-stack flex flex-col p-[1em] max-lg:pt-[10em]">
              <h1 className="text-[3.5rem] leading-none normal-case max-lg:text-[4.25rem] max-md:text-center max-md:text-[2.2rem]">
                Líder mundial en producción de piensos&nbsp;acuáticos
              </h1>
              <div className="pr-[12em] text-left text-[1.3em] leading-[1.8em] text-line max-lg:text-[1rem] max-md:pr-0 max-md:text-center max-md:text-[0.9rem]">
                <p>Desarrollo de alta calidad y sostenible</p>
              </div>
              <div className="max-md:text-center">
                <Link href="/alimentos-servicios/" className="e-btn bg-green-btn px-[35px] py-5 hover:bg-amber">
                  Ver más
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pilares */}
      <section className="px-[1em]">
        <div className="e-container">
          <Reveal
            animation="fadeInUp"
            className="relative z-[3] mt-[-9%] flex gap-[10px] p-[10px] max-lg:flex-wrap max-md:flex-col"
          >
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="flex min-h-[398px] flex-1 flex-col justify-start rounded-[5px] border-b-[5px] border-[#097635] bg-white p-[2%] shadow-[0_0_2px_0_#9A9A9A] max-lg:basis-[calc(50%-5px)] max-md:basis-auto"
              >
                <div className="text-center">
                  <div className="mx-auto mb-4">
                    <span
                      className={`inline-block text-[90px] leading-none ${p.color} [&>svg]:relative [&>svg]:block [&>svg]:size-[1em]`}
                      dangerouslySetInnerHTML={{ __html: boxIcons[i] }}
                    />
                  </div>
                  <h3 className="mt-2 mb-4 normal-case max-lg:mb-10 max-md:mb-[15px]">{p.title}</h3>
                  <p className="m-0">{p.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Nosotros */}
      <section className="px-[1em] py-[6em]">
        <div className="e-container flex max-lg:flex-col">
          <Reveal animation="fadeInDown" className="flex w-1/2 max-lg:w-full">
            <div className="flex w-full items-center p-[1em]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media("2024/06/工厂2023-6-scaled.jpg")}
                alt=""
                width={2560}
                height={1440}
                className="mx-auto block h-auto w-[1000px] max-w-full rounded"
              />
            </div>
          </Reveal>
          <Reveal animation="fadeInRight" className="w-1/2 max-lg:w-full">
            <div className="e-stack flex flex-col py-[1em] pr-[1em] pl-[4em] max-lg:pl-[1em]">
              <h6 className="text-navy">Nosotros</h6>
              <h2 className="normal-case">Acerca de Haid Ecuador</h2>
              <div className="text-black">
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
              <div>
                <Link href="/estos-es-haid" className={greenBtn}>
                  Leer más
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Servicio al cliente (en tablet y móvil la imagen va primero) */}
      <section className="pt-[4em] pb-[5em]">
        <div className="e-container flex max-lg:flex-col-reverse">
          <Reveal animation="fadeInLeft" className="flex w-[54%] max-lg:w-full">
            <div className="flex w-full flex-col justify-center py-[1em] pr-[4em] pl-[1em] max-lg:pr-[1em]">
              <div className="e-stack flex flex-col">
                <h6 className={eyebrow}>Servicio al cliente</h6>
                <h2 className="normal-case">Optimización integral: valor y servicios para nuestros clientes</h2>
                <div className="text-justify text-black">
                  <p>
                    La misión de Haid es proveer servicio técnico integrado que incluye: diagnóstico en campo, estrategia de alimentación de
                    precisión, manejo de producción, asesoramiento en campo, capacitación al personal de camaronera y servicio de
                    laboratorio&nbsp;
                  </p>
                </div>
                <div className="flex pb-[10px] max-md:flex-col">
                  {services.map((col, c) => (
                    <div key={c} className={`w-1/2 p-[15px] max-md:w-full ${c === 1 ? "max-md:mt-[4%]" : ""}`}>
                      <ul className="list-none p-0">
                        {col.map((s, i) => (
                          <li key={s} className={`flex items-center ${i > 0 ? "mt-[6px]" : ""} ${i < col.length - 1 ? "pb-[6px]" : ""}`}>
                            <span className="flex pr-[14px]">
                              <FaFasCircle className="mr-[3px] size-3 fill-navy" />
                            </span>
                            <span className="self-center pl-[5px] font-display text-[14px] leading-[28.8px] font-medium text-ink max-md:leading-[25.92px] max-lg:text-[1rem] max-md:text-[0.9rem]">
                              {s}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Link href="/alimentos-servicios/" className={greenBtn}>
                  Leer más
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="flex w-[45.919%] max-lg:w-full">
            <div className="flex w-full items-center justify-center p-[1em]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media("2024/06/Group-70-2.png")}
                alt=""
                width={1440}
                height={1589}
                className="mx-auto block h-auto w-full rounded max-lg:w-[45%] max-md:w-[80%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros productos */}
      <section className="px-[30px] py-[60px]">
        <div className="e-container flex flex-col gap-5">
          <h2 className="text-center normal-case">Nuestros productos</h2>
          <div className="px-[50px] pt-[15px] text-center max-md:p-0">
            <p>
              Descubre nuestra gama premium de alimentos para camarones. Con ingredientes de calidad superior, garantizamos un crecimiento
              saludable y un rendimiento óptimo para tus peces y crustáceos. ¡Alimenta el éxito de tu granja acuícola con nosotros!
            </p>
          </div>
          <div className="p-[10px]">
            <ProductsCarousel items={products} />
          </div>
          <div className="-mt-3 text-center">
            <Link href="/alimentos-servicios/" className={greenBtn}>
              Ver más
            </Link>
          </div>
        </div>
      </section>

      {/* Sostenibilidad */}
      <section className="py-[5em]">
        <div className="e-container flex max-lg:flex-col">
          <div className="flex w-[45.919%] max-lg:w-full">
            <div className="flex w-full items-center justify-center p-[1em]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media("2024/06/DSC7762-scaled.jpg")}
                alt=""
                width={2560}
                height={1707}
                className="mx-auto block h-auto w-full rounded-[5px] max-lg:w-[45%] max-md:w-full"
              />
            </div>
          </div>
          <Reveal animation="fadeInLeft" className="flex w-[54%] max-lg:w-full">
            <div className="e-stack flex w-full flex-col justify-center py-[1em] pr-[4em] pl-[1em] max-lg:pr-[1em]">
              <h6 className={eyebrow}>Sostenibilidad</h6>
              <h2 className="normal-case">Producción Sostenible de Ingredientes</h2>
              <div className="-mb-[17px] text-black">
                <p>
                  Los productores de materias primas de origen marino deben adoptar prácticas sostenibles, asegurando el cumplimiento de
                  estándares ambientales como MARIN TRUST, MSC, SMETA, RFVS y FIP, para garantizar un abastecimiento responsable. Además, no
                  deben incluir especies en peligro según la Lista Roja de la UICN y deben documentar la procedencia de las pesquerías de
                  reducción conforme al Código de la FAO. El abastecimiento de materias primas de origen vegetal también debe provenir de zonas
                  libres de deforestación y conversión, así como de áreas de alto valor de conservación, aplicando normas certificadas por los
                  miembros de ISEAL, promoviendo así una producción respetuosa con el entorno y la&nbsp;biodiversidad.
                </p>
              </div>
              <div>
                <Link href="/sostenibilidad" className={greenBtn}>
                  Leer más
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Presencia */}
      <section className="bg-[#023894] p-[10px]">
        <div className="e-container flex flex-col gap-5">
          <h2 className="py-5 text-center text-[37px] text-white normal-case max-lg:text-[37px] max-md:text-[37px]">
            Haid tiene presencia en más de 10 países y regiones
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media("2024/06/Mapa-1.png")} alt="" width={1354} height={538} className="mx-auto block h-auto w-full" />
        </div>
      </section>

      {/* Certificaciones */}
      <section className="px-[1em] pt-[4em] pb-[6em]">
        <div className="e-container flex max-lg:flex-col">
          <div className="flex w-[45.919%] max-lg:w-full">
            <div className="flex w-full items-center p-[1em]">
              <CertSlides images={certSlides} />
            </div>
          </div>
          <Reveal animation="fadeInRight" className="w-[54%] max-lg:w-full">
            <div className="e-stack flex flex-col py-[1em] pr-[1em] pl-[4em] max-lg:pl-[1em]">
              <h2 className="text-[3.2rem] normal-case max-lg:text-[2.938rem] max-md:text-[2.3rem]">Haid cuenta con las siguientes certificaciones</h2>
              <div className="text-left text-muted">
                Conoce nuestras certificaciones. Haid se certifica para dar un mejor servicio, garantizando altos estándares de calidad, gestión
                ambiental y seguridad laboral en todas sus operaciones.
              </div>
              <ul className="list-none p-0">
                {certifications.map((c, i) => (
                  <li
                    key={c}
                    className={`flex items-center justify-start text-left ${i > 0 ? "mt-[5px]" : ""} ${i < certifications.length - 1 ? "pb-[5px]" : ""}`}
                  >
                    <span
                      className="flex [&>svg]:mr-[12.5px] [&>svg]:size-[50px] [&>svg]:fill-white"
                      dangerouslySetInnerHTML={{ __html: certIcons[i] }}
                    />
                    <span className="self-center pl-[5px] text-[#8B8B8B]">{c}</span>
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
