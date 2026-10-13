"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitForm, type FormState } from "@/app/actions";

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
  /** Ocupa media fila desde tablet (dos campos por línea). */
  half?: boolean;
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

  const gutter = fields.some((f) => f.half) ? Math.max(colGap, 12) : colGap;
  const group = { paddingInline: gutter / 2, marginBottom: rowGap };
  const field =
    "block w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2 font-sans text-[0.95rem] leading-[1.5] font-normal text-ink outline-none transition-[border-color,box-shadow] duration-200 hover:border-navy/30 focus:border-green-btn focus:shadow-[0_0_0_4px_rgba(9,137,60,0.15)]";

  return (
    <form onSubmit={onSubmit} aria-busy={pending}>
      <input type="hidden" name="formulario" value={formName} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-wrap" style={{ marginInline: -gutter / 2, marginBottom: -rowGap }}>
        {fields.map((f) => {
          const id = `form-field-${f.name}`;
          const error = state?.errors?.[f.name];
          return (
            <div key={f.name} className={`w-full ${f.half ? "md:w-1/2" : ""}`} style={group}>
              <label htmlFor={id} className="block w-fit pb-1 font-display text-[0.85rem] leading-none font-semibold text-navy">
                {f.label}
              </label>
              {f.type === "textarea" ? (
                <textarea id={id} name={f.name} rows={4} required={f.required} className={`${field} h-[96px] resize-y ${error ? "border-[#d9534f]" : ""}`} />
              ) : (
                <input
                  id={id}
                  name={f.name}
                  type={f.type ?? "text"}
                  size={1}
                  required={f.required}
                  className={`${field} min-h-[42px] ${error ? "border-[#d9534f]" : ""}`}
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
            className={`e-btn !flex w-full disabled:opacity-60 ${buttonSize === "lg" ? "min-h-[56px]" : "min-h-[42px]"}`}
          >
            Send
          </button>
        </div>
      </div>
      {state && (
        <div role="alert" className={`my-[10px] text-[1em] leading-none ${state.ok ? "font-semibold text-green-btn" : "text-[#d9534f]"}`}>
          {state.message}
        </div>
      )}
    </form>
  );
}
