import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { ElementorForm } from "@/components/contacto/ElementorForm";
import { FaFasLocationArrow, FaFasPhoneAlt } from "@/components/contacto/icons";

export const metadata: Metadata = { title: "Contáctanos" };

// Textos copiados literalmente de https://www.haid.com.ec/contactanos/

/** Icon box "stacked" (cuadro azul a la izquierda; en móvil el ícono pasa arriba). */
function InfoBox({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center max-md:block">
      <span className="mr-[25px] inline-flex shrink-0 rounded bg-navy p-[14px] text-white max-md:mr-0 max-md:mb-[25px]">{icon}</span>
      <div className="grow">
        <h3 className="mt-2 mb-[4px]">{title}</h3>
        <p className="mb-0 font-display font-medium text-muted">{text}</p>
      </div>
    </div>
  );
}

export default function ContactanosPage() {
  return (
    <>
      <PageHero title="Contáctanos" image="2024/06/20240606-171916-scaled.jpg" position="0px -271px" />

      <section className="px-[1em] pt-[6em] pb-[3em]">
        <div className="e-container rounded border-2 border-mist px-[2em] py-[3em] max-md:p-[1em]">
          <div className="flex max-md:block">
            <div className="w-1/2 p-[10px] max-md:w-full">
              <ElementorForm
                formName="contacto"
                fields={[
                  { name: "name", label: "Nombre & Apellido" },
                  {
                    name: "email",
                    label: "Email",
                    type: "email",
                    required: true,
                  },
                  { name: "asunto", label: "Asunto", required: true },
                  { name: "message", label: "Mensaje", type: "textarea" },
                ]}
              />
            </div>
            <div className="e-stack flex w-1/2 flex-col justify-center pl-[3em] max-lg:pl-[2em] max-md:w-full max-md:pl-[1em]">
              <h2>Contáctanos</h2>
              <div>
                En Haid Ecuador estamos para ayudarte. Completa el formulario de contacto a continuación y nos pondremos en contacto contigo lo antes
                posible. <br />
                ¡Esperamos colaborar juntos para el éxito de tu producción de camarones!
              </div>
              <InfoBox icon={<FaFasPhoneAlt className="size-[28px]" />} title="Centro de Atención al Cliente" text="+59343915100" />
              <div className="py-[15px]">
                <div className="border-t border-line" />
              </div>
              <InfoBox
                icon={<FaFasLocationArrow className="size-[28px]" />}
                title="Dirección"
                text="LOTIZACION. LAS BRISAS MZ C - SOLAR 30 A VIA DURAN TAMBO ÁREA INDUSTRIAL"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
