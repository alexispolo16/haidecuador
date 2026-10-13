import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { UsageTable } from "@/components/productos/UsageTable";
import { Shrimp } from "@/components/Shrimp";
import { ProductTabs } from "@/components/productos/ProductTabs";
import { engorde, iniciadores, postTransferencia, salud } from "@/components/productos/TabPanels";
import iconoIniciadores from "@/components/productos/icono-iniciadores.svg";
import { media } from "@/lib/media";

export const metadata: Metadata = { title: "Productos" };

// Textos copiados literalmente de https://www.haid.com.ec/productos/

const tabs = [
  { label: "Iniciadores", content: iniciadores },
  { label: "Post-transferencia", content: postTransferencia },
  { label: "Engorde", content: engorde },
  { label: "Salud", content: salud },
];

const lines = [
  {
    // Ícono SVG insertado en línea en el original (8em, sin margen inferior).
    icon: iconoIniciadores.src,
    size: "size-[8em]",
    title: "Iniciadores",
    gap: "mt-[17px] max-md:mt-4",
    text: "Soluciones nutricionales diseñadas para la etapa inicial, promueven el desarollo saludable asegurando una alta tasa de supervivencia. Uso sugerido en raceways y precrías",
  },
  {
    icon: media("2024/06/engorde.svg"),
    size: "size-[6rem]",
    title: "Engorde",
    gap: "mt-[44px] max-md:mt-[43px]",
    text: "Soluciones nutricionales, costo – eficientes que aseguran la mayor tasa de crecimiento, disminuyendo los días de cultivo y aumentando la utilidad ha/día",
  },
  {
    icon: media("2024/06/salud.svg"),
    size: "size-[6rem]",
    title: "Salud",
    gap: "mt-[44px] max-md:mt-[43px]",
    text: "Solución nutricional terapéutica que da el impulso inmunológico que los camarones necesitan para combatir brotes virales e infecciosos, repara hepatopáncreas, y combate la enteritis leve",
  },
];

export default function ProductosPage() {
  return (
    <>
      <PageHero title="Productos" image="2024/06/MG_1500-scaled.jpg" />

      {/* Soluciones nutricionales: pestañas por línea de producto */}
      <section className="bg-[#FAFAFA] py-6">
        <div className="e-container">
          <div className="p-2.5">
            <div className="pb-4">
              <h2 className="text-center text-navy">Soluciones nutricionales </h2>
            </div>
            <div>
              <ProductTabs items={tabs} />
            </div>
            <div className="relative mt-6 overflow-hidden rounded-[20px] bg-gradient-to-r from-navy to-deep px-6 py-6 md:px-10 md:py-7">
              <Shrimp gap="transparent" className="pointer-events-none absolute -top-[30%] -right-[4%] w-[min(420px,70%)] text-white opacity-[0.08]" />
              <p className="relative mx-auto !mb-0 max-w-[88ch] border-l-[3px] border-leaf pl-5 text-[1.02rem] leading-relaxed text-white/90 md:text-[1.1rem]">
                A través de un sistema integral de alta tecnología basado en la I+D, HAID presenta productos de alto desempeño para cubrir las necesidades
                nutricionales en las diferentes etapas del cultivo de camarones, con el objetivo de construir sinergia entre el servicio técnico, la creación de
                valor y la maximización de rentabilidad de nuestros clientes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Soluciones a la medida */}
      <section className="py-[36px]">
        <div className="e-container">
          <h2 className="text-center text-navy normal-case">Soluciones a la medida</h2>
          <div className="mt-5 px-[17%] py-[1%] text-center">
            <p>Desarrollamos dietas a la medida para satisfacer las distintas necesidades nutricionales durante el ciclo de cultivo. Conoce nuestros productos</p>
          </div>
          <div className="mt-5 flex gap-5 p-2.5 max-md:flex-col">
            {lines.map((l) => (
              <div key={l.title} className="flex-1 p-2.5 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.icon} alt="" className={`mx-auto block ${l.size}`} />
                <h3 className={`mb-4 text-navy ${l.gap}`}>{l.title}</h3>
                <p className="mb-0">{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sugerencias de alimentación */}
      <section className="bg-[#FAFAFA] py-[36px]">
        <div className="e-container flex gap-5 max-md:flex-col">
          <div className="flex shrink-0 flex-col justify-center gap-5 p-2.5 md:w-[33.145%]">
            <h2 className="text-navy normal-case max-lg:text-[30px] max-md:text-center">Sugerencias de alimentación</h2>
            <div className="text-justify max-lg:text-[14px] max-lg:leading-[28.8px] max-md:leading-[25.92px]">
              <p>Las sugerencias de alimentación se basan en las necesidades nutricionales del camarón en cada etapa</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center p-2.5 text-center">
            <Image
              src={media("2024/06/tabla-formatos-18.png")}
              alt=""
              width={1887}
              height={1391}
              className="mx-auto inline-block h-auto w-[65%] max-md:w-[95%]"
              sizes="(min-width: 768px) 520px, 95vw"
            />
          </div>
        </div>
      </section>

      {/* Tabla de sugerencia de uso */}
      <section className="pt-[24px] pb-[28px]">
        <div className="e-container px-4">
          <h2 className="mb-4 text-center text-navy normal-case">Tabla de sugerencia de uso</h2>
          <UsageTable />
        </div>
      </section>
    </>
  );
}
