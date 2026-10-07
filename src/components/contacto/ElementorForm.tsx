"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitForm, type FormState } from "@/app/actions";

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
};

/**
 * Widget "Formulario" de Elementor Pro tal como lo usa el sitio original: etiquetas encima,
 * campos de tamaño "sm" (#F0F2F6), botón "Send" a todo el ancho (#113B70) y mensajes debajo.
 */
export function ElementorForm({
  formName,
  fields,
  buttonSize = "sm",
  rowGap = 30,
  colGap = 0,
}: {
  formName: string;
  fields: FormField[];
  /** Tamaño del botón de Elementor: sm (alto mínimo 40px) o lg (59px). */
  buttonSize?: "sm" | "lg";
  /** Espacio entre filas (margin-bottom de cada grupo) y entre columnas, en px. */
  rowGap?: number;
  colGap?: number;
}) {
  const [state, setState] = useState<FormState>(null);
  const [pending, startTransition] = useTransition();

  // Se envía manualmente para no vaciar los campos si el servidor devuelve un error (Elementor solo limpia al enviar con éxito).
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    startTransition(async () => {
      const res = await submitForm(null, data);
      setState(res);
      if (res?.ok) form.reset();
    });
  }

  const group = { paddingInline: colGap / 2, marginBottom: rowGap };
  const field =
    "block w-full rounded-[3px] border border-[#F0F2F6] bg-[#F0F2F6] px-[14px] py-[5px] font-display text-[13px] leading-[1.4] font-normal text-[#7E7E7E] outline-none focus:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]";

  return (
    <form onSubmit={onSubmit} aria-busy={pending}>
      <input type="hidden" name="formulario" value={formName} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-wrap" style={{ marginInline: -colGap / 2, marginBottom: -rowGap }}>
        {fields.map((f) => {
          const id = `form-field-${f.name}`;
          const error = state?.errors?.[f.name];
          return (
            <div key={f.name} className="w-full" style={group}>
              <label htmlFor={id} className="block w-fit pb-[10px] font-display leading-none font-semibold text-black">
                {f.label}
              </label>
              {f.type === "textarea" ? (
                <textarea id={id} name={f.name} rows={4} required={f.required} className={`${field} h-[96px] ${error ? "border-[#d9534f]" : ""}`} />
              ) : (
                <input
                  id={id}
                  name={f.name}
                  type={f.type ?? "text"}
                  size={1}
                  required={f.required}
                  className={`${field} min-h-[40px] ${error ? "border-[#d9534f]" : ""}`}
                />
              )}
              {error && <span className="mt-[10px] block text-[1em] leading-none text-[#d9534f]">{error}</span>}
            </div>
          );
        })}
        <div className="w-full" style={group}>
          <button
            type="submit"
            disabled={pending}
            className={`flex w-full items-center justify-center rounded bg-[#113B70] px-[30px] py-[15px] font-display text-[0.938rem] leading-none font-medium tracking-[0.5px] text-white uppercase max-lg:text-[0.9rem] max-md:text-[0.8rem] ${buttonSize === "lg" ? "min-h-[59px]" : "min-h-[40px]"}`}
          >
            Send
          </button>
        </div>
      </div>
      {state && (
        <div role="alert" className={`my-[10px] text-[1em] leading-none ${state.ok ? "text-[#5cb85c]" : "text-[#d9534f]"}`}>
          {state.message}
        </div>
      )}
    </form>
  );
}
