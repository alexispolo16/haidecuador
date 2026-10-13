import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // El botón de cookies ocupa la esquina inferior izquierda (como Cookiebot).
  devIndicators: { position: "bottom-right" },
  // Igual que el WordPress original: /alimentos-servicios/ redirige (301) a /productos/.
  redirects() {
    return [{ source: "/alimentos-servicios", destination: "/productos", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75],
    localPatterns: [{ pathname: "/media/**", search: "" }],
    minimumCacheTTL: 2678400,
  },
  // Imágenes y PDFs de public/media: nombres fechados que no cambian.
  headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
