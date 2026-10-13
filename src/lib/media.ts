/**
 * Imágenes y PDFs alojados en public/media (descargados con `npm run import:media`).
 * Para servirlos desde otro origen (p. ej. un CDN), define NEXT_PUBLIC_MEDIA_BASE.
 */
const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE ?? "/media";

export function media(path: string) {
  return `${MEDIA_BASE}/${encodeURI(path.replace(/^\//, ""))}`;
}

/**
 * URL optimizada (AVIF/WebP redimensionado) para imágenes usadas como fondo CSS.
 * `width` debe ser uno de los tamaños de next/image (p. ej. 640, 828, 1080, 1200, 1920).
 */
export function optimized(path: string, width: number, quality: 50 | 75 = 75) {
  const src = media(path);
  if (/^https?:/.test(src)) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}
