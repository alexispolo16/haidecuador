"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { legalDocs } from "@/content/site";
import { CONSENT_COOKIE, CONSENT_EVENT, readConsent, saveConsent, type ConsentCategory } from "@/lib/consent";
import { media } from "@/lib/media";

/**
 * Banner de consentimiento con el mismo funcionamiento que Cookiebot (el que
 * usa el sitio original): pestañas Consentimiento / Detalles / Acerca de,
 * cuatro categorías, botones Denegar / Permitir selección / Permitir todas y
 * un botón flotante para cambiar la decisión en cualquier momento.
 */

type Cookie = { name: string; provider: string; purpose: string; expiry: string; type: string };

const categories: { id: ConsentCategory; label: string; description: string; cookies: Cookie[] }[] = [
  {
    id: "necessary",
    label: "Necesarias",
    description:
      "Las cookies necesarias ayudan a hacer una página web utilizable activando funciones básicas como la navegación en la página y el acceso a áreas seguras de la página web. La página web no puede funcionar adecuadamente sin estas cookies.",
    cookies: [
      { name: CONSENT_COOKIE, provider: "haid.com.ec", purpose: "Almacena el estado de consentimiento de cookies del usuario para el dominio actual.", expiry: "1 año", type: "HTTP Cookie" },
      { name: "googtrans", provider: "haid.com.ec", purpose: "Recuerda el idioma elegido por el visitante en el traductor de la página.", expiry: "1 año", type: "HTTP Cookie" },
    ],
  },
  {
    id: "preferences",
    label: "Preferencias",
    description:
      "Las cookies de preferencias permiten a la página web recordar información que cambia la forma en que la página se comporta o el aspecto que tiene, como su idioma preferido o la región en la que usted se encuentra.",
    cookies: [],
  },
  {
    id: "statistics",
    label: "Estadísticas",
    description:
      "Las cookies estadísticas ayudan a los propietarios de páginas web a comprender cómo interactúan los visitantes con las páginas web reuniendo y proporcionando información de forma anónima.",
    cookies: [],
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Las cookies de marketing se utilizan para rastrear a los visitantes en las páginas web. La intención es mostrar anuncios relevantes y atractivos para el usuario individual, y por lo tanto, más valiosos para los editores y terceros anunciantes.",
    cookies: [],
  },
];

type Choice = Record<Exclude<ConsentCategory, "necessary">, boolean>;
const ALL: Choice = { preferences: true, statistics: true, marketing: true };
const NONE: Choice = { preferences: false, statistics: false, marketing: false };

type Tab = "consent" | "details" | "about";

/** "ssr" en el servidor; luego el valor crudo de la cookie (o "" si no hay decisión). */
function useConsentSnapshot() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(CONSENT_EVENT, cb);
      return () => window.removeEventListener(CONSENT_EVENT, cb);
    },
    () => (readConsent() ? document.cookie.match(new RegExp(`${CONSENT_COOKIE}=([^;]+)`))![1] : ""),
    () => "ssr",
  );
}

export function CookieConsent() {
  const snapshot = useConsentSnapshot();
  const [reopened, setReopened] = useState(false);
  const [tab, setTab] = useState<Tab>("consent");
  const [choice, setChoice] = useState<Choice | null>(null);

  if (snapshot === "ssr") return null;

  const decided = snapshot !== "";
  const open = !decided || reopened;
  const stored = readConsent();
  const current: Choice = choice ?? (stored ? { preferences: stored.preferences, statistics: stored.statistics, marketing: stored.marketing } : NONE);

  const submit = (value: Choice) => {
    saveConsent(value);
    setReopened(false);
    setChoice(null);
    setTab("consent");
  };

  const toggle = (id: ConsentCategory) => {
    if (id === "necessary") return;
    setChoice({ ...current, [id]: !current[id] });
  };

  const reopen = () => {
    setTab("consent");
    setChoice(null);
    setReopened(true);
  };

  return (
    <>
      {open && <Dialog tab={tab} setTab={setTab} current={current} toggle={toggle} submit={submit} stored={stored} />}
      {decided && !open && (
        <button
          type="button"
          onClick={reopen}
          aria-label="Configuración de cookies"
          title="Configuración de cookies"
          className="fixed bottom-4 left-4 z-[60] grid size-12 place-items-center rounded-full bg-[#141414] text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-5-5Z" />
            <circle cx="8.5" cy="11.5" r=".8" fill="currentColor" />
            <circle cx="12.5" cy="16" r=".8" fill="currentColor" />
            <circle cx="15.5" cy="12.5" r=".8" fill="currentColor" />
          </svg>
        </button>
      )}
    </>
  );
}

function Dialog({
  tab,
  setTab,
  current,
  toggle,
  submit,
  stored,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  current: Choice;
  toggle: (id: ConsentCategory) => void;
  submit: (c: Choice) => void;
  stored: ReturnType<typeof readConsent>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<ConsentCategory | null>(null);
  const isOn = (id: ConsentCategory) => id === "necessary" || current[id];

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "consent", label: "Consentimiento" },
    { id: "details", label: "Detalles" },
    { id: "about", label: "Acerca de" },
  ];

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-2 bottom-2 z-[60] flex max-h-[calc(100dvh-16px)] flex-col overflow-hidden rounded-lg bg-white font-[Helvetica,Arial,sans-serif] text-[15px] leading-[1.6] text-[#141414] shadow-[0_30px_70px_rgba(0,0,0,0.3)] outline-none md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[calc(100vh-80px)] md:w-[900px] md:max-w-[calc(100vw-32px)] md:-translate-x-1/2 md:-translate-y-1/2"
    >
      <div className="flex h-14 shrink-0 items-center border-b md:h-[76px] border-[#d6d6d6] px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media("2024/05/1.海大logo无去掉背景.png")} alt="Haid" className="h-9 w-auto" />
      </div>

      <div role="tablist" className="flex shrink-0 border-b border-[#d6d6d6]">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 border-b-[3px] px-2 py-4 text-[15px] font-bold transition-colors ${
              tab === t.id ? "border-[#1032cf] text-[#1032cf]" : "border-transparent text-[#141414] hover:text-[#1032cf]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {tab === "consent" && (
          <div className="px-6 py-5">
            <h2 id="cookie-title" className="mb-2 font-[inherit] text-[15px] font-bold text-[#141414]">
              Esta página web usa cookies
            </h2>
            <p>
              Las cookies de este sitio web se usan para personalizar el contenido y los anuncios, ofrecer funciones de redes sociales y analizar el tráfico.
              Además, compartimos información sobre el uso que haga del sitio web con nuestros partners de redes sociales, publicidad y análisis web, quienes
              pueden combinarla con otra información que les haya proporcionado o que hayan recopilado a partir del uso que haya hecho de sus servicios.
            </p>
          </div>
        )}

        {tab === "details" && (
          <div className="px-6 py-3">
            <h2 id="cookie-title" className="sr-only">Detalles de las cookies</h2>
            <ul className="divide-y divide-[#d6d6d6]">
              {categories.map((c) => (
                <li key={c.id} className="py-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-expanded={expanded === c.id}
                      onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                      className="flex flex-1 items-center gap-3 text-left font-bold"
                    >
                      <svg viewBox="0 0 24 24" className={`size-4 shrink-0 transition-transform ${expanded === c.id ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                      {c.label}
                      <span className="rounded-full bg-[#d6d6d6] px-2 text-xs leading-5 font-bold">{c.cookies.length}</span>
                    </button>
                    <Switch label={c.label} checked={isOn(c.id)} disabled={c.id === "necessary"} onChange={() => toggle(c.id)} />
                  </div>
                  <p className="mt-2 pl-7 text-[14px]">{c.description}</p>
                  {expanded === c.id && (
                    <div className="mt-3 ml-7 space-y-2">
                      {c.cookies.length === 0 ? (
                        <p className="rounded bg-[#f2f2f2] p-3 text-[14px]">Actualmente no utilizamos cookies de este tipo.</p>
                      ) : (
                        c.cookies.map((k) => (
                          <dl key={k.name} className="grid grid-cols-[110px_1fr] gap-x-3 rounded bg-[#f2f2f2] p-3 text-[13px]">
                            <dt className="font-bold">Nombre</dt>
                            <dd>{k.name}</dd>
                            <dt className="font-bold">Proveedor</dt>
                            <dd>{k.provider}</dd>
                            <dt className="font-bold">Propósito</dt>
                            <dd>{k.purpose}</dd>
                            <dt className="font-bold">Caducidad</dt>
                            <dd>{k.expiry}</dd>
                            <dt className="font-bold">Tipo</dt>
                            <dd>{k.type}</dd>
                          </dl>
                        ))
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {stored && (
              <p className="mt-3 text-[13px] text-[#555]">
                Su consentimiento actual: {categories.filter((c) => stored[c.id]).map((c) => c.label).join(", ")}. ID de consentimiento: {stored.stamp}. Fecha:{" "}
                {new Date(stored.date).toLocaleString("es-EC")}.
              </p>
            )}
          </div>
        )}

        {tab === "about" && (
          <div className="space-y-3 px-6 py-5">
            <h2 id="cookie-title" className="sr-only">Acerca de las cookies</h2>
            <p>
              Las cookies son pequeños archivos de texto que las páginas web pueden utilizar para hacer más eficiente la experiencia del usuario.
            </p>
            <p>
              La ley afirma que podemos almacenar cookies en su dispositivo si son estrictamente necesarias para el funcionamiento de esta página. Para todos
              los demás tipos de cookies necesitamos su permiso.
            </p>
            <p>
              Esta página utiliza tipos diferentes de cookies. Algunas cookies son colocadas por servicios de terceros que aparecen en nuestras páginas.
            </p>
            <p>
              En cualquier momento puede cambiar o retirar su consentimiento desde el botón de cookies en la esquina inferior izquierda de nuestra página web.
            </p>
            <p>Obtenga más información sobre quiénes somos, cómo puede contactarnos y cómo procesamos los datos personales en nuestras políticas:</p>
            <ul className="list-disc pl-5">
              {legalDocs.map((d) => (
                <li key={d.file}>
                  <a href={media(d.file)} target="_blank" rel="noopener" className="text-[#1032cf] underline">
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {tab === "consent" && (
        <div className="grid shrink-0 grid-cols-2 border-t border-[#d6d6d6] md:grid-cols-4">
          {categories.map((c, i) => (
            <label
              key={c.id}
              className={`flex cursor-pointer flex-col items-center gap-2 border-[#d6d6d6] px-3 py-4 font-bold ${i % 2 === 1 ? "" : "border-r"} md:border-r md:last:border-r-0 ${
                i < 2 ? "border-b md:border-b-0" : ""
              }`}
            >
              {c.label}
              <Switch label={c.label} checked={isOn(c.id)} disabled={c.id === "necessary"} onChange={() => toggle(c.id)} />
            </label>
          ))}
        </div>
      )}

      <div className="flex shrink-0 flex-col gap-2 border-t border-[#d6d6d6] px-6 py-4 md:flex-row">
        <DialogButton onClick={() => submit(NONE)}>Denegar</DialogButton>
        <DialogButton onClick={() => submit(current)}>Permitir la selección</DialogButton>
        <DialogButton onClick={() => submit(ALL)}>Permitir todas</DialogButton>
      </div>
    </div>
  );
}

function DialogButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-12 shrink-0 rounded border-2 md:flex-1 border-[#1032cf] bg-[#1032cf] px-4 text-[15px] font-bold tracking-[0.4px] text-white uppercase transition hover:border-[#2a4ae0] hover:bg-[#2a4ae0]"
    >
      {children}
    </button>
  );
}

function Switch({ label, checked, disabled, onChange }: { label: string; checked: boolean; disabled?: boolean; onChange: () => void }) {
  return (
    <span className="relative inline-flex">
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-default"
      />
      <span
        aria-hidden="true"
        className={`block h-8 w-[57px] rounded-full transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#1032cf] ${
          checked ? "bg-[#1032cf]" : "bg-[#141414]"
        }`}
      >
        <span className={`absolute top-1 left-1 size-6 rounded-full bg-white transition-transform ${checked ? "translate-x-[25px]" : ""}`} />
      </span>
    </span>
  );
}
