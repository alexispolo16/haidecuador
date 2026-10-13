"use client";

import { useEffect } from "react";
import { FaFasGlobeAmericas } from "./fa";

/**
 * Traducción simultánea con Google Translate, igual que el plugin
 * "Google Language Translator" del sitio original: un globo y las banderas
 * EN / ES. Google traduce el DOM en vivo, incluido el contenido que React
 * renderiza después de navegar.
 */

const PAGE_LANG = "es";
const SCRIPT_ID = "google-translate-script";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate?: { TranslateElement: new (opts: object, id: string) => unknown } };
  }
}

function readLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : PAGE_LANG;
}

function setGoogtrans(value: string | null) {
  const host = location.hostname;
  // Google Translate escribe la cookie en el host y en el dominio padre: hay que limpiar ambas.
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const d of domains) {
    const domain = d ? `; domain=${d}` : "";
    document.cookie = value
      ? `googtrans=${value}; path=/; max-age=31536000${domain}`
      : `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${domain}`;
  }
}

const CONTAINER_ID = "google_translate_element";

function loadScript() {
  if (document.getElementById(SCRIPT_ID)) return;
  // El widget de Google vive fuera del árbol de React para que React no lo toque.
  if (!document.getElementById(CONTAINER_ID)) {
    const box = document.createElement("div");
    box.id = CONTAINER_ID;
    box.style.display = "none";
    document.body.appendChild(box);
  }
  window.googleTranslateElementInit = () => {
    new window.google!.translate!.TranslateElement(
      { pageLanguage: PAGE_LANG, includedLanguages: "en,es", autoDisplay: false },
      CONTAINER_ID,
    );
  };
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

/** Espera a que Google cree su selector de idioma (máx. 10 s). */
function whenCombo(fn: (combo: HTMLSelectElement) => void, tries = 50) {
  const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (combo && combo.options.length > 1) fn(combo);
  else if (tries > 0) setTimeout(() => whenCombo(fn, tries - 1), 200);
}

/**
 * Google Translate envuelve los textos en <font>, y React falla al quitar o
 * insertar nodos que ya no son hijos directos. Este parche evita el error.
 */
function patchDomForTranslate() {
  const proto = Node.prototype as Node & { __haidPatched?: boolean };
  if (proto.__haidPatched) return;
  proto.__haidPatched = true;
  const removeChild = proto.removeChild;
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child) as T;
  };
  const insertBefore = proto.insertBefore;
  proto.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node;
    return insertBefore.call(this, node, ref) as T;
  };
}

function translateTo(lang: string) {
  if (lang === PAGE_LANG) {
    if (readLang() === PAGE_LANG) return;
    setGoogtrans(null);
    location.reload();
    return;
  }
  setGoogtrans(`/${PAGE_LANG}/${lang}`);
  patchDomForTranslate();
  loadScript();
  whenCombo((combo) => {
    if (combo.value === lang) return;
    combo.value = lang;
    combo.dispatchEvent(new Event("change"));
  });
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  useEffect(() => {
    // Si el visitante ya eligió otro idioma, se traduce al volver.
    if (readLang() !== PAGE_LANG) {
      patchDomForTranslate();
      loadScript();
    }
  }, []);

  return (
    <div className={`notranslate flex items-center gap-3 ${className}`} translate="no">
      <FaFasGlobeAmericas className="size-[15px] text-navy" />
      <div className="flex gap-1">
        {flags.map((f) => (
          <button
            key={f.lang}
            type="button"
            title={f.title}
            aria-label={f.label}
            onClick={() => translateTo(f.lang)}
            className="grid h-[16px] w-[22px] cursor-pointer place-items-center overflow-hidden rounded-[4px] shadow-[0_0_0_1px_rgba(6,34,63,0.2)] transition duration-200 hover:-translate-y-px hover:shadow-[0_0_0_2px_#09893c] focus-visible:shadow-[0_0_0_2px_#09893c]"
          >
            {f.lang === "en" ? <FlagUS /> : <FlagES />}
          </button>
        ))}
      </div>
    </div>
  );
}

const flags = [
  { lang: "en", title: "English", label: "Translate to English" },
  { lang: "es", title: "Spanish", label: "Ver en español" },
];

/** Banderas en SVG (nítidas y a todo color, sin el sprite borroso del plugin original). */
function FlagUS() {
  return (
    <svg viewBox="0 0 30 22" className="block size-full" aria-hidden="true">
      <rect width="30" height="22" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 22) / 13} width="30" height={22 / 13} fill="#b22234" />
      ))}
      <rect width="13" height={(7 * 22) / 13} fill="#3c3b6e" />
      {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={2.6 + c * 4 + (r % 2) * 2} cy={2.2 + r * 2.3} r="0.7" fill="#fff" />))}
    </svg>
  );
}
function FlagES() {
  return (
    <svg viewBox="0 0 30 22" className="block size-full" aria-hidden="true">
      <rect width="30" height="22" fill="#c60b1e" />
      <rect y="5.5" width="30" height="11" fill="#ffc400" />
      <rect x="6" y="8.5" width="3.4" height="5" rx="1" fill="#a8312b" opacity="0.85" />
    </svg>
  );
}
