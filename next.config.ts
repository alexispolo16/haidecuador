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
