# Haid Ecuador — Next.js

Migración de https://www.haid.com.ec (WordPress + Elementor) a Next.js 16 (App Router, TypeScript, Tailwind CSS 4).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Rutas

Se mantienen las URLs del sitio original:

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/productos` | Catálogo con pestañas por línea |
| `/starter-pro`, `/starter`, `/speed`, `/happiness-plus`, `/happiness`, `/fitness` | Fichas de producto (`src/app/[producto]`) |
| `/sostenibilidad`, `/estos-es-haid`, `/asc`, `/responsabilidad-ambiental`, `/contactanos` | Páginas institucionales |

## Contenido

- Todo el contenido (textos, tabs, acordeones, sliders, imágenes, PDFs) está copiado literalmente del sitio original, incluida su ortografía; no hay textos de relleno.
- `src/content/site.ts`: menú, datos de contacto, documentos legales y fichas de producto. El resto del contenido vive en cada `page.tsx`.
- El diseño replica el kit de Elementor del original (`src/app/globals.css`): tipografías h1–h6, colores, contenedor de 1230px y puntos de quiebre de Elementor (tablet ≤1024px, móvil ≤767px).
- Si cambias `src/app/globals.css`, reinicia `npm run dev`: el cargador de Tailwind configurado en `next.config.ts` no siempre recarga ese archivo en caliente.

## Imágenes y PDFs

Están alojados en `public/media` (76 archivos, ~30 MB) y se resuelven con `src/lib/media.ts`. Si agregas nuevas referencias a archivos del WordPress original, vuelve a ejecutar:

```bash
npm run import:media
```

## Rendimiento y SEO

- `/sitemap.xml` (`src/app/sitemap.ts`) y `/robots.txt` (`src/app/robots.ts`) se generan a partir del menú y de las fichas de `src/content/site.ts`; el dominio está en `SITE_URL`.
- Las imágenes usan `next/image` (AVIF/WebP redimensionado). Para fondos CSS usa `optimized()` de `src/lib/media.ts`. La imagen principal de cada portada lleva `fetchPriority="high"`.
- Fuentes: `src/app/fonts/` tiene Sora y Hanken Grotesk (OFL) recortadas a caracteres latinos y a los pesos usados (500–700 y 400–700). Si usas un peso fuera de ese rango, vuelve a generarlas.
- Los íconos SVG grandes viven en `public/media/icons/` (no en línea) para que el HTML pese poco.

## Formularios

`/contactanos` y `/responsabilidad-ambiental` envían a la server action `src/app/actions.ts`, que valida y registra los datos. Falta conectar el envío de correo (Resend, SMTP, etc.) en el `TODO` de ese archivo.

## Traducción y cookies

- **Traducción simultánea** (`src/components/LanguageSwitcher.tsx`): banderas EN / ES en el menú, con Google Translate como en el sitio original. El idioma elegido se guarda en la cookie `googtrans` y se mantiene al navegar.
- **Consentimiento de cookies** (`src/components/CookieConsent.tsx`): banner con el mismo funcionamiento que Cookiebot (Consentimiento / Detalles / Acerca de, cuatro categorías y botón flotante para cambiar la decisión). La decisión se guarda en la cookie `CookieConsent`. Antes de añadir analítica o píxeles de marketing, cárgalos solo si `hasConsent("statistics")` / `hasConsent("marketing")` (`src/lib/consent.ts`) y declara sus cookies en la pestaña Detalles.
