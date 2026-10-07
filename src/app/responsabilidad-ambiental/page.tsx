import type { Metadata } from "next";
import { ElementorForm } from "@/components/contacto/ElementorForm";
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
      {/* Cabecera: contenedor con padding 8em 1em, capa #040E1A al 75 % */}
      <section
        className="relative flex min-h-[25vh] flex-col bg-cover bg-no-repeat px-[1em] py-[8em] [background-position:0px_0px] lg:[background-position:0px_-460px]"
        style={{
          backgroundImage: `url("${media("2024/06/HAID-18-scaled.jpg")}")`,
        }}
      >
        <div className="absolute inset-0 bg-night opacity-75" />
        <div className="e-container relative">
          <div className="p-[1em]">
            <h2 className="text-[4.625em] font-bold text-white max-md:text-[2.5em]">Responsabilidad Ambiental</h2>
          </div>
        </div>
      </section>

      <div className="mt-[8%] mb-[2%] flow-root px-[6%]">
        <div className="e-container e-stack text-center">
          <h2 className="text-[32px] normal-case max-lg:text-[32px] max-md:text-[32px]">
            Ahora también puedes realizar tus comentarios o sugerenticas en cuanto a nuestras actividades
          </h2>
          <div className="text-black">
            <p>
              Como parte de nuestro esfuerzo constante de comunicación directa y buscando tener una mayor cercanía con nuestros vecinos, comunidades y
              clientes, ponemos a su disposición este servicio de contacto, por medio del cual nos puede manifestar sus dudas o inquietudes sobre las
              practicas ambientales de nuestra compañía.
            </p>
            <p>
              De antemano agradecemos su interés por conocer más sobre los procedimientos y operación de nuestra compañía. Así mismo, le garantizamos
              un seguimiento detallado a sus comentarios.
            </p>
          </div>
        </div>
      </div>

      {rows.map((row) => (
        <div key={row.image} className="p-[10px]">
          <div className={`e-container flex gap-5 max-lg:flex-col ${row.reverse ? "flex-row-reverse" : ""}`}>
            <div className="flex flex-1 flex-col justify-center p-[10px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media(row.image)} alt="" width={2560} height={1707} className="h-auto w-full rounded-lg" loading="lazy" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-5 p-[10px]">
              {row.faqs.map((f) => (
                <div key={f.q} className="rounded-lg border border-[#CCCCCC] p-[10px] text-center shadow-[1px_2px_10px_0px_rgba(0,0,0,0.5)]">
                  <div className="p-[2%]">
                    <h3 className={`mt-2 mb-4 text-[19px] max-lg:text-[19px] max-md:text-[19px] ${f.capitalize ? "" : "normal-case"}`}>{f.q}</h3>
                    <p className="mb-0 text-[15px] leading-[28.8px] max-md:leading-[25.92px]">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="my-[1%] p-[10px]">
        <div className="e-container text-center text-black">
          <p>
            <em>
              Cualquier queja, reclamo o inquietud de partes externas en relación con la responsabilidad ambiental de la empresa, puede presentarse a
              la Línea directa de ayuda para asuntos <strong>“Responsabilidad Ambiental” </strong>de la empresa.
            </em>
          </p>
        </div>
      </div>

      <div className="e-container text-center">
        <h2 className="mb-[2%] normal-case">Déjanos tus comentarios</h2>
      </div>

      <div className="flex justify-center p-[10px] max-md:mx-auto max-md:w-[330.727px]">
        <div className="w-[72.876%] shrink-0 max-md:w-full">
          <div className="mb-[5%]">
            <ElementorForm
              formName="responsabilidad-ambiental"
              buttonSize="lg"
              rowGap={12}
              colGap={8}
              fields={[
                {
                  name: "nombre_apellido",
                  label: "Nombres y Apellidos",
                  required: true,
                },
                { name: "cargo", label: "Cargo", required: true },
                { name: "empresa", label: "Empresa", required: true },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  required: true,
                },
                {
                  name: "pais_provincia",
                  label: "País/Provincia",
                  required: true,
                },
                { name: "asunto", label: "Asunto", required: true },
                {
                  name: "mensaje",
                  label: "Mensaje",
                  type: "textarea",
                  required: true,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
