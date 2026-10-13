"use client";

import dynamic from "next/dynamic";

/**
 * El banner de cookies solo existe en el navegador (lee la cookie de consentimiento), así que su
 * código se descarga después de hidratar y no compite con la carga inicial de la página.
 */
export const CookieConsentLazy = dynamic(() => import("./CookieConsent").then((m) => m.CookieConsent), { ssr: false });
