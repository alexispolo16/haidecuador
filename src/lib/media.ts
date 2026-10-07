/**
 * Imágenes y PDFs alojados en public/media (descargados con `npm run import:media`).
 * Para servirlos desde otro origen (p. ej. un CDN), define NEXT_PUBLIC_MEDIA_BASE.
 */
const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE ?? "/media";

export function media(path: string) {
  return `${MEDIA_BASE}/${encodeURI(path.replace(/^\//, ""))}`;
}
