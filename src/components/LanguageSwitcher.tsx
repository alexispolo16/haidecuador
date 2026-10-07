"use client";

import { useEffect } from "react";
import { media } from "@/lib/media";
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
    <div className={`notranslate flex items-center gap-[30px] ${className}`} translate="no">
      <FaFasGlobeAmericas className="h-[22px] w-[22px] text-navy" />
      <div className="flex">
        {flags.map((f) => (
          <button
            key={f.lang}
            type="button"
            title={f.title}
            aria-label={f.label}
            onClick={() => translateTo(f.lang)}
            className="mr-0.5 box-content h-[18px] w-6 cursor-pointer bg-no-repeat py-px"
            style={{ backgroundImage: `url("${media("plugins/flags.png")}")`, backgroundPosition: f.position }}
          />
        ))}
      </div>
    </div>
  );
}

/** Sprite del plugin "Google Language Translator" (mismas posiciones que en el sitio original). */
const flags = [
  { lang: "en", title: "English", label: "Translate to English", position: "-116px -351px" },
  { lang: "es", title: "Spanish", label: "Ver en español", position: "0 -322px" },
];
