import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { ElementorForm } from "@/components/contacto/ElementorForm";
import { FaFasLocationArrow, FaFasPhoneAlt } from "@/components/contacto/icons";

export const metadata: Metadata = { title: "Contáctanos" };

// Textos copiados literalmente de https://www.haid.com.ec/contactanos/

/** Dato de contacto: icono en recuadro azul, título y texto. */
function InfoBox({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_16px_36px_-28px_rgba(6,34,63,0.5)] ring-1 ring-navy/10">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy text-white">{icon}</span>
      <div className="min-w-0">
        <h3 className="mb-0.5 text-[1.05rem]">{title}</h3>
        <p className="m-0 font-display text-[0.92rem] leading-snug font-medium text-muted">{text}</p>
      </div>
    </div>
  );
}

export default function ContactanosPage() {
  return (
    <>
      <PageHero title="Contáctanos" image="2024/06/20240606-171916-scaled.jpg" position="50% 38%" />

      <section className="px-5 py-8 lg:px-8 lg:py-12">
        <div className="e-container grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="e-stack flex flex-col">
            <h2 className="text-[clamp(1.6rem,1.1rem+1.7vw,2.5rem)]">Contáctanos</h2>
            <p className="!mb-0 text-[1.02rem] text-ink/85">
              En Haid Ecuador estamos para ayudarte. Completa el formulario de contacto a continuación y nos pondremos en contacto contigo lo antes
              posible.
              <br />
              ¡Esperamos colaborar juntos para el éxito de tu producción de camarones!
            </p>
            <div className="grid gap-3 pt-1">
              <InfoBox icon={<FaFasPhoneAlt className="size-[22px]" />} title="Centro de Atención al Cliente" text="+59343915100" />
              <InfoBox
                icon={<FaFasLocationArrow className="size-[22px]" />}
                title="Dirección"
                text="LOTIZACION. LAS BRISAS MZ C - SOLAR 30 A VIA DURAN TAMBO ÁREA INDUSTRIAL"
              />
            </div>
          </div>
          <div className="rounded-[20px] bg-white p-5 shadow-[0_30px_70px_-40px_rgba(6,34,63,0.5)] ring-1 ring-navy/10 md:p-6">
            <ElementorForm
              formName="contacto"
              rowGap={10}
              fields={[
                { name: "name", label: "Nombre & Apellido", half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "asunto", label: "Asunto", required: true },
                { name: "message", label: "Mensaje", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
