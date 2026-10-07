"use server";

export type FormState = { ok: boolean; message: string; errors?: Record<string, string> } | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mensajes por defecto del widget Formulario de Elementor Pro (es_ES); el sitio original no los personaliza.
const MSG = {
  success: "El formulario fue enviado exitosamente.",
  error: "Ocurrió un error.",
  required: "Este campo es obligatorio.",
  invalid: "Hay algo mal. El formulario no es válido.",
};

type FieldRule = { label: string; required?: boolean; email?: boolean };

// Campos reales de cada formulario del sitio original (validados también en el servidor).
const FORMS: Record<string, Record<string, FieldRule>> = {
  contacto: {
    name: { label: "Nombre & Apellido" },
    email: { label: "Email", required: true, email: true },
    asunto: { label: "Asunto", required: true },
    message: { label: "Mensaje" },
  },
  "responsabilidad-ambiental": {
    nombre_apellido: { label: "Nombres y Apellidos", required: true },
    cargo: { label: "Cargo", required: true },
    empresa: { label: "Empresa", required: true },
    email: { label: "Email", required: true, email: true },
    pais_provincia: { label: "País/Provincia", required: true },
    asunto: { label: "Asunto", required: true },
    mensaje: { label: "Mensaje", required: true },
  },
};

export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const data = Object.fromEntries([...formData.entries()].filter(([k]) => !k.startsWith("$")).map(([k, v]) => [k, String(v).trim()]));

  if (data.website) return { ok: true, message: MSG.success }; // honeypot

  const rules = FORMS[data.formulario];
  if (!rules) return { ok: false, message: MSG.error };

  const errors: Record<string, string> = {};
  const fields: Record<string, string> = {};
  for (const [name, rule] of Object.entries(rules)) {
    const value = (data[name] ?? "").slice(0, 5000);
    if (rule.required && !value) errors[name] = MSG.required;
    else if (rule.email && value && !EMAIL_RE.test(value)) errors[name] = MSG.invalid;
    fields[rule.label] = value;
  }
  if (Object.keys(errors).length) return { ok: false, message: MSG.invalid, errors };

  // TODO: conectar con el proveedor de correo (Resend, SMTP, etc.) usando process.env.CONTACT_TO.
  console.info("[formulario]", data.formulario, fields);

  return { ok: true, message: MSG.success };
}
