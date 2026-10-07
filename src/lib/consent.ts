/**
 * Consentimiento de cookies con el mismo modelo que Cookiebot: cuatro categorías
 * guardadas en la cookie `CookieConsent` durante 12 meses.
 *
 * Antes de cargar un script de analítica o marketing, comprueba la categoría:
 *   if (hasConsent("statistics")) cargarAnalytics();
 * o escucha el evento `haid:consent` para reaccionar cuando el visitante decide.
 */

export const consentCategories = ["necessary", "preferences", "statistics", "marketing"] as const;
export type ConsentCategory = (typeof consentCategories)[number];

export type Consent = Record<ConsentCategory, boolean> & {
  method: "explicit";
  stamp: string;
  date: string;
};

export const CONSENT_COOKIE = "CookieConsent";
export const CONSENT_EVENT = "haid:consent";
const MAX_AGE = 60 * 60 * 24 * 365;

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]+)`));
  if (!m) return null;
  try {
    const value = JSON.parse(decodeURIComponent(m[1]));
    return value && typeof value === "object" && value.necessary === true ? (value as Consent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: Omit<Record<ConsentCategory, boolean>, "necessary">): Consent {
  const consent: Consent = {
    necessary: true,
    ...choice,
    method: "explicit",
    stamp: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; path=/; max-age=${MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

export function hasConsent(category: ConsentCategory) {
  return readConsent()?.[category] === true;
}
