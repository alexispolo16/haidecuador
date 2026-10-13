import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { VerticalTabs } from "@/components/VerticalTabs";
import { FaFarCheckCircle, FaFarLightbulb, FaFasAward, FaFasRocket } from "@/components/fa";
import { Shrimp } from "@/components/Shrimp";
import { media } from "@/lib/media";

export const metadata: Metadata = { title: "Estos es Haid" };

// Textos copiados literalmente de https://www.haid.com.ec/estos-es-haid/

const values = [
  { title: "Externamente", text: "Crear valor para nuestros clientes." },
  { title: "Internamente", text: "Mejorar el valor para nuestros colaboradores." },
];

const commitment: { Icon: typeof FaFasAward; title: string; text: string }[] = [
  {
    Icon: FaFasAward,
    title: "Misión",
    text: "Promover la agricultura a través de la ciencia y la tecnología, cambiando la situación actual de las zonas rurales.",
  },
  {
    Icon: FaFarLightbulb,
    title: "Visión",
    text: "Ser líder en alimentos acuícolas de alta calidad, con excelencia en servicio y tecnología en América Latina.",
  },
  {
    Icon: FaFasRocket,
    title: "Espíritu",
    text: "El mar recibe miles de ríos, la afluencia le hace inmenso.",
  },
];

const history = [
  {
    label: "1998 - 2002",
    content: (
      <p>
        <strong>Startup y establecer una base sólida</strong>
        <br />
        Guangzhou Haid Feed Company se fundó en 1998 lo que marcó la primera gloria de Haid.
        <br />
        Fuimos líderes en el mercado de Premezclas acuáticas en China y entramos en el mercado de Piensos acuáticos del sur de China.
      </p>
    ),
  },
  {
    label: "2003 - 2005",
    content: (
      <>
        <strong>Avanzar rápido y marcar en todo el país de China</strong>
        <br /> Haid Group se estableció para lograr el desarrollo de toda la cadena. Ingresó al mercado de alimentos para camarones por primera vez y
        se expandió alrededor del Centro de China, Sur de China, Este de China, Suroeste y otras regiones.
      </>
    ),
  },
  {
    label: "2009 - 2011",
    content: (
      <>
        <strong>Expandirse en el extranjero con el apoyo de capital público</strong>
        <br /> Se cotizó con éxito en la Bolsa de Valores de Shenzhen, el desarrollo de la compañía alcanzó un nuevo nivel; Los ingresos del grupo
        superaron los mil millones de dólares estadounidenses, ingresó al mercado de Vietnam y comenzó un nuevo viaje de desarrollo internacional.
      </>
    ),
  },
  {
    label: "2012 - 2017",
    content: (
      <>
        <strong>Fortalecer las bases y guiarse por la tecnología</strong>
        <br /> Se profundizó en la gestión, en cultivar la fuerza interna, se estableció un comité de dirección y se implementó un centro de
        operación de fábrica. Ganó el segundo premio de Invención Tecnológica Nacional y aceleró el desarrollo del sector de salud animal.
      </>
    ),
  },
  {
    label: "2018 - Actualidad",
    content: (
      <>
        <strong>Miles de glorias y desarrollo de cadena de industrias.</strong>
        <br /> Acelerando el diseño de toda la cadena de la industria de cría, las ventas de piensos superaron los 20 millones de toneladas, se
        estableció un comité de desarrollo de piensos para cerdos y se introdujo el pienso para ganado. El negocio de larvas y el negocio de salud
        animal se desarrollaron rápidamente.
      </>
    ),
  },
];

const photo = "block w-full rounded-[18px] object-cover shadow-[0_24px_50px_-30px_rgba(6,34,63,0.55)]";

export default function EstoEsHaidPage() {
  return (
    <>
      <PageHero title="Haid Ecuador" image="2024/06/工厂2023-5-1-scaled.jpg" overlay={0.75} position="0px -290px" />

      {/* Cultura empresarial: foto + texto, y los dos valores como fichas pequeñas */}
      <section className="px-5 py-8 lg:px-8 lg:py-12">
        <div className="e-container grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <Reveal animation="fadeInLeft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media("2024/06/20240606-171916-scaled.jpg")} alt="" width={2560} height={1707} className={`${photo} aspect-[4/3]`} />
          </Reveal>
          <Reveal animation="fadeInRight">
            <div className="e-stack flex flex-col">
              <h6>conócenos</h6>
              <h2>Cultura empresarial</h2>
              <div className="text-[#343434]">
                <p className="!mb-2">
                  Nuestra cultura se inspira en la filosofía del Grupo Haid, que promueve una mentalidad de crecimiento constante basada en practicar,
                  aprender y ganar. Creemos que el desarrollo surge del esfuerzo diario, del aprendizaje continuo y de la colaboración para alcanzar metas
                  comunes.
                </p>
                <p className="!mb-0">
                  En Haid Ecuador Feed Cia. Ltda., fomentamos una cultura que impulsa la excelencia, la innovación y la responsabilidad. Valoramos el
                  trabajo en equipo, la integridad y el compromiso como fundamentos para generar valor sostenible tanto para nuestros clientes como para
                  nuestros colaboradores.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_16px_36px_-26px_rgba(6,34,63,0.5)] ring-1 ring-navy/10">
                    <FaFarCheckCircle className="size-9 shrink-0 text-navy" />
                    <div>
                      <h3 className="text-[1.1rem]">{v.title}</h3>
                      <p className="m-0 text-[0.9rem] leading-snug">{v.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Nuestro compromiso: tres fichas horizontales */}
      <section className="bg-mist px-5 py-8 lg:px-8 lg:py-10">
        <div className="e-container flex flex-col gap-5">
          <h2 className="text-center">Nuestro compromiso</h2>
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            {commitment.map(({ Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[0_16px_36px_-26px_rgba(6,34,63,0.5)] ring-1 ring-navy/10">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-white">
                  <Icon className="size-[22px]" />
                </span>
                <div>
                  <h3 className="mb-1 text-[1.2rem]">{title}</h3>
                  <p className="m-0 text-[0.92rem] leading-snug">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Centrado en el cliente */}
      <section className="relative overflow-clip px-5 py-8 lg:px-8 lg:py-10" style={{ backgroundImage: `url("${media("2024/06/haid-home-verde-07.png")}")` }}>
        <Shrimp gap="transparent" className="pointer-events-none absolute -top-[40%] -right-[4%] w-[min(480px,70vw)] text-white opacity-[0.1]" />
        <div className="e-container relative flex flex-col gap-2 text-center">
          <h2 className="text-[clamp(1.6rem,1.1rem+1.9vw,2.6rem)] text-[#FFFDFD]">Centrado en el cliente y orientado al esfuerzo</h2>
          <p className="mx-auto !mb-0 text-[clamp(1.15rem,1rem+0.8vw,1.6rem)] leading-snug text-[#FFFCFC]">
            <strong>“Practicar, aprender, ganar”</strong>
          </p>
        </div>
      </section>

      {/* Haid Group en el mundo */}
      <section className="px-5 py-8 lg:px-8 lg:py-12">
        <div className="e-container grid items-start gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <Reveal animation="fadeInLeft">
            <div className="e-stack flex flex-col">
              <h2>Haid Group en el mundo</h2>
              <div className="text-black">
                <p className="!mb-2">
                  Haid Group lleva a cabo el diseño industrial con una perspectiva internacional. En la actualidad, el negocio de la compañía cubre el sur
                  de Asia, el sudeste de Asia, América, África y otras regiones.
                </p>
                <p className="!mb-0">Establecer filiales en muchos países, incluidos Vietnam, Singapur, Estados Unidos, India, Indonesia, Ecuador y otros países.</p>
              </div>
              <h3 className="!mt-6 text-[1.5rem]">Historia</h3>
              <div className="!mt-3">
                <VerticalTabs items={history} />
              </div>
            </div>
          </Reveal>
          <Reveal animation="fadeInRight" className="lg:sticky lg:top-24">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media("2024/06/HAID-18-scaled.jpg")} alt="" width={2560} height={1707} loading="lazy" className={`${photo} aspect-[4/3] lg:aspect-[3/4]`} />
          </Reveal>
        </div>
      </section>

      {/* Frase */}
      <section className="bg-navy px-5 py-6 lg:px-8 lg:py-7">
        <div className="e-container">
          <h2 className="text-center text-[clamp(1.3rem,1rem+1.2vw,2rem)] text-[#FFFDFD] italic">“Reflexiona mientras avanzas, avanza mientras reflexionas.”</h2>
        </div>
      </section>
    </>
  );
}
