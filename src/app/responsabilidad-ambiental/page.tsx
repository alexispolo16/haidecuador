import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { ElementorForm } from "@/components/contacto/ElementorForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Shrimp } from "@/components/Shrimp";
import { media } from "@/lib/media";

export const metadata: Metadata = { title: "Responsabilidad Ambiental" };

// Textos copiados literalmente de https://www.haid.com.ec/responsabilidad-ambiental/ (incluidas sus erratas).

type Faq = { q: string; a: string; capitalize?: boolean };

const rows: { image: string; reverse?: boolean; faqs: Faq[] }[] = [
  {
    image: "2024/06/DSC7068-scaled.jpg",
    faqs: [
      {
        q: "¿Qué pasa si tengo una pregunta sobre una responsabilidad ambiental de HAID FEED ECUADOR?",
        a: "Es importante que haga cualquier pregunta que tenga sobre nuestras responsabilidades ambientales. Hacer una pregunta nos da la oportunidad de explicar cómo llevamos a cabo nuestra actividad.",
      },
      {
        q: "¿Quiénes pueden realizar denuncias o sugerencias?",
        a: "Solo los representantes de cada comunidad son quienes podrán realizar formalmente una denuncia o sugerencia con respecto al comportamiento ambiental de la empresa.",
      },
    ],
  },
  {
    image: "2024/06/DSC5718-scaled.jpg",
    reverse: true,
    faqs: [
      {
        q: "¿Cuándo debo notificar una inquietud sobre una posible inadecuada responsabilidad ambiental relacionadas a las actividades de la empresa?",
        a: "Queremos que informe de sus preocupaciones cuando observe un comportamiento ambiental inadecuado que crea que infringe los derechos a la naturaleza. Si tiene alguna inquietud sobre este tema de algún comportamiento ambiental no adecuado, te brindamos los medios, para hacernos conocer e informarnos la inquietud.",
        capitalize: true,
      },
      {
        q: "¿Qué debo hacer si me preocupa que al hacer una denuncia me afecte negativamente a mí o a mi entorno?",
        a: "Tiene la opción de hacer una denuncia a través de nuestra página web, “Responsabilidad Ambiental”. Su confidencialidad se mantendrá en la mayor medida posible según las circunstancias. HAID (ECUADOR) FEED CIA. LDTA., no aceptará que se tome ningún tipo de represalia contra aquellas personas que planteen una inquietud o participen de una investigación.",
        capitalize: true,
      },
    ],
  },
];

export default function ResponsabilidadAmbientalPage() {
  return (
    <>
      <PageHero title="Responsabilidad Ambiental" image="2024/06/HAID-18-scaled.jpg" overlay={0.75} position="0px -460px" />

      {/* Introducción: titular, explicación y acceso directo al formulario */}
      <section className="px-5 py-10 lg:px-8 lg:py-14">
        <div className="e-container grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal animation="fadeInLeft">
            <div className="e-stack flex flex-col">
              <h6>Línea directa</h6>
              <h2 className="max-w-[20ch] text-[clamp(1.6rem,1.1rem+1.7vw,2.5rem)]">
                Ahora también puedes realizar tus comentarios o sugerenticas en cuanto a nuestras actividades
              </h2>
              <div className="pt-1">
                <a href="#comentarios" className="e-btn !bg-green-btn hover:!bg-navy">
                  Déjanos tus comentarios
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal animation="fadeInRight">
            <div className="rounded-[20px] bg-white p-6 text-[1rem] text-ink shadow-[0_24px_54px_-36px_rgba(6,34,63,0.5)] ring-1 ring-navy/10 lg:p-8">
              <p>
                Como parte de nuestro esfuerzo constante de comunicación directa y buscando tener una mayor cercanía con nuestros vecinos, comunidades y
                clientes, ponemos a su disposición este servicio de contacto, por medio del cual nos puede manifestar sus dudas o inquietudes sobre las
                practicas ambientales de nuestra compañía.
              </p>
              <p className="!mb-0 border-t border-navy/10 pt-4">
                De antemano agradecemos su interés por conocer más sobre los procedimientos y operación de nuestra compañía. Así mismo, le garantizamos
                un seguimiento detallado a sus comentarios.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Preguntas frecuentes: las fotos igualan la altura de sus acordeones */}
      {rows.map((row, r) => (
        <section key={row.image} className={`px-5 py-8 lg:px-8 lg:py-10 ${r === 0 ? "bg-mist" : ""}`}>
          <div className={`e-container grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10 ${row.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <Reveal animation="fadeIn" className="relative min-h-[240px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media(row.image)}
                alt=""
                width={2560}
                height={1707}
                loading="lazy"
                className="absolute inset-0 block h-full w-full rounded-[20px] object-cover shadow-[0_30px_70px_-36px_rgba(6,34,63,0.55)]"
              />
            </Reveal>
            <Reveal animation={row.reverse ? "fadeInLeft" : "fadeInRight"} className="flex flex-col justify-center">
              <Accordion items={row.faqs.map((f) => ({ title: f.q, content: <p className="!mb-0 text-[0.98rem]">{f.a}</p> }))} defaultOpen={0} />
            </Reveal>
          </div>
        </section>
      ))}

      {/* Formulario: aviso a la izquierda, campos a la derecha */}
      <section id="comentarios" className="relative scroll-mt-24 overflow-clip bg-navy px-5 py-8 lg:px-8 lg:py-10">
        <Shrimp gap="#103b70" className="pointer-events-none absolute -bottom-[10%] -left-[8%] w-[min(620px,100vw)] text-white opacity-[0.05]" />
        <div className="e-container relative z-[2] grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div className="e-stack flex flex-col lg:sticky lg:top-24">
            <h2 className="text-white">Déjanos tus comentarios</h2>
            <p className="!mb-0 border-l-[3px] border-leaf pl-4 text-[1.02rem] leading-relaxed text-white/85">
              <em>
                Cualquier queja, reclamo o inquietud de partes externas en relación con la responsabilidad ambiental de la empresa, puede presentarse a
                la Línea directa de ayuda para asuntos <strong className="text-white">“Responsabilidad Ambiental” </strong>de la empresa.
              </em>
            </p>
          </div>
          <div className="rounded-[20px] bg-white p-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] md:p-6">
            <ElementorForm
              formName="responsabilidad-ambiental"
              buttonSize="lg"
              rowGap={10}
              colGap={0}
              fields={[
                { name: "nombre_apellido", half: true, label: "Nombres y Apellidos", required: true },
                { name: "cargo", half: true, label: "Cargo", required: true },
                { name: "empresa", half: true, label: "Empresa", required: true },
                { name: "email", half: true, label: "Email", type: "email", required: true },
                { name: "pais_provincia", half: true, label: "País/Provincia", required: true },
                { name: "asunto", half: true, label: "Asunto", required: true },
                { name: "mensaje", label: "Mensaje", type: "textarea", required: true },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
