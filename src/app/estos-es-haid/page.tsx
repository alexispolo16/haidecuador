import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { VerticalTabs } from "@/components/VerticalTabs";
import { FaFarCheckCircle, FaFarLightbulb, FaFasAward, FaFasRocket } from "@/components/fa";
import { media } from "@/lib/media";

export const metadata: Metadata = { title: "Estos es Haid" };

// Textos copiados literalmente de https://www.haid.com.ec/estos-es-haid/

const values = [
  { title: "Externamente", text: "Crear valor para nuestros clientes." },
  { title: "Internamente", text: "Mejorar el valor para nuestros colaboradores." },
];

const commitment: { Icon: typeof FaFasAward; title: string; text: ReactNode }[] = [
  {
    Icon: FaFasAward,
    title: "Misión",
    text: "Promover la agricultura a través de la ciencia y la tecnología, cambiando la situación actual de las zonas rurales.",
  },
  {
    Icon: FaFarLightbulb,
    title: "Visión",
    text: (
      <>
        Ser líder en alimentos acuícolas de alta calidad, con excelencia en servicio y tecnología en América Latina.
        <br />
        <br />
      </>
    ),
  },
  {
    Icon: FaFasRocket,
    title: "Espíritu",
    text: (
      <>
        El mar recibe miles de ríos, la afluencia le hace inmenso.
        <br />
        <br />
      </>
    ),
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

export default function EstoEsHaidPage() {
  return (
    <>
      <PageHero title="Haid Ecuador" image="2024/06/工厂2023-5-1-scaled.jpg" overlay={0.75} position="0px -290px" />

      {/* Cultura empresarial */}
      <section className="py-[2em]">
        <div className="e-container flex flex-wrap">
          <Reveal animation="fadeInDown" className="flex w-1/2 items-center justify-center p-[1em] max-lg:w-full">
            <Reveal animation="fadeInLeft" className="w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media("2024/06/20240606-171916-scaled.jpg")} alt="" width={2560} height={1707} className="h-auto w-full rounded" />
            </Reveal>
          </Reveal>
          <Reveal animation="fadeInRight" className="e-stack flex w-1/2 flex-col justify-center py-[1em] pr-[1em] pl-[4em] max-lg:w-full max-lg:pl-[1em]">
            <h6 className="text-navy">conócenos</h6>
            <h2 className="normal-case">Cultura empresarial</h2>
            <div className="text-[#343434]">
              <p>
                Nuestra cultura se inspira en la filosofía del Grupo Haid, que promueve una mentalidad de crecimiento constante basada en practicar,
                aprender y ganar. Creemos que el desarrollo surge del esfuerzo diario, del aprendizaje continuo y de la colaboración para alcanzar metas
                comunes.
                <br />
                En Haid Ecuador Feed Cia. Ltda., fomentamos una cultura que impulsa la excelencia, la innovación y la responsabilidad. Valoramos el trabajo
                en equipo, la integridad y el compromiso como fundamentos para generar valor sostenible tanto para nuestros clientes como para nuestros
                colaboradores.
              </p>
            </div>
            {values.map((v) => (
              <div key={v.title} className="e-card flex items-center text-justify max-md:block">
                <FaFarCheckCircle className="mr-5 size-[46px] shrink-0 text-navy max-md:mr-0 max-md:mb-5 max-md:block" />
                <div className="flex grow flex-col">
                  <h3 className="mt-2 mb-1.5 text-[1.438rem] max-lg:text-[1.4rem] max-md:text-[1.2rem]">{v.title}</h3>
                  <p className="m-0">{v.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Nuestro compromiso */}
      <section className="pt-[30px] pb-[50px]">
        <div className="e-container flex flex-col gap-5">
          <h2 className="text-center normal-case">Nuestro compromiso</h2>
          <div className="flex gap-5 p-2.5 max-md:flex-col">
            {commitment.map(({ Icon, title, text }) => (
              <div key={title} className="flex flex-1 flex-col justify-center p-2.5">
                <div className="e-card text-center">
                  <Icon className="mx-auto mb-[17px] size-[38px] text-navy" />
                  <h3 className="mb-1.5 text-[1.438rem] max-lg:text-[1.4rem] max-md:text-[1.2rem]">{title}</h3>
                  <p className="m-0">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Centrado en el cliente */}
      <section className="py-[88px] max-md:py-[65px]" style={{ backgroundImage: `url("${media("2024/06/haid-home-verde-07.png")}")` }}>
        <div className="e-container flex flex-col gap-5 text-center">
          <h2 className="text-[50px] text-[#FFFDFD] normal-case">Centrado en el cliente y orientado al esfuerzo</h2>
          <p className="text-[35px] leading-[1.8rem] text-[#FFFCFC] max-md:leading-[25.92px]">
            <strong>“Practicar, aprender, ganar”</strong>
          </p>
        </div>
      </section>

      {/* Haid Group en el mundo */}
      <section className="py-[4em]">
        <div className="e-container flex flex-wrap">
          <Reveal animation="fadeInLeft" className="e-stack flex w-[57.326%] flex-col justify-center py-[1em] pr-[4em] pl-[1em] max-lg:w-full max-lg:pr-[1em]">
            <h2 className="normal-case">Haid Group en el mundo</h2>
            <div className="text-black">
              <p>
                Haid Group lleva a cabo el diseño industrial con una perspectiva internacional. En la actualidad, el negocio de la compañía cubre el sur
                de Asia, el sudeste de Asia, América, África y otras regiones.
              </p>
              <p>Establecer filiales en muchos países, incluidos Vietnam, Singapur, Estados Unidos, India, Indonesia, Ecuador y otros países.</p>
            </div>
            <h3 className="text-[2rem] normal-case max-lg:text-[2.938rem] max-md:text-[2.3rem]">Historia</h3>
            <VerticalTabs items={history} />
          </Reveal>
          <div className="flex w-[42.593%] items-center p-[1em] max-lg:w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media("2024/06/HAID-18-scaled.jpg")} alt="" width={2560} height={1707} className="h-auto w-full rounded" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Frase */}
      <section className="bg-navy py-[50px]">
        <div className="e-container">
          <h2 className="text-center text-[40px] text-[#FFFDFD] italic normal-case max-md:text-[30px]">
            “Reflexiona mientras avanzas, avanza mientras reflexionas.”
          </h2>
        </div>
      </section>
    </>
  );
}
