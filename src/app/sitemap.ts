import type { MetadataRoute } from "next";
import { nav, products, SITE_URL } from "@/content/site";

/** /sitemap.xml: portada, páginas del menú y fichas de producto. */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  });
  return [
    page("/", 1),
    ...nav.map((n) => page(n.href, n.href === "/productos" ? 0.9 : 0.7)),
    ...products.map((p) => page(`/${p.slug}`, 0.8)),
  ];
}
