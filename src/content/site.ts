/**
 * Contenido central del sitio.
 *
 * Todos los textos están copiados literalmente de https://www.haid.com.ec
 * (incluida su ortografía); no hay textos de relleno.
 */

export const company = {
  legalName: "HAID (ECUADOR) FEED CIA, LTDA.",
  phone: "+59343915100",
  email: "haid-ecuador@haid.com.cn",
};

export const nav = [
  { href: "/productos", label: "Productos" },
  { href: "/sostenibilidad", label: "Sostenibilidad" },
  { href: "/estos-es-haid", label: "Esto es Haid" },
  { href: "/asc", label: "ASC" },
  { href: "/responsabilidad-ambiental", label: "Responsabilidad Ambiental" },
  { href: "/contactanos", label: "Contáctanos" },
];

export const legalDocs = [
  { label: "Política de privacidad", file: "2026/04/POLITICAS_DE_PRIVACIDAD_HAID_PARA_SITIO_WEB.pdf" },
  { label: "Política de cookie", file: "2026/04/POLITICA_DE_COOKIES_PARA_SITIO_WEB.pdf" },
  { label: "Política de protección de datos", file: "2026/04/POLITICAS_DE_PROTECCION_DE_DATOS_HAID_FEED.pdf" },
];

export const auditNotice = {
  title: "Auditoria Externa del estándar de alimentos ASC",
  contact: "+593 43915100",
  date: "1,2,3 de julio – 2024",
  auditor: "SCS Global Services",
  auditorContact: "+1 510 452 8000",
};

/**
 * Fichas de producto copiadas literalmente de https://www.haid.com.ec/<slug>/
 * (título, tamaños, textos, conservación y ficha técnica).
 */
export type Product = {
  slug: string;
  /** Nombre corto (título de la página: "<name> - Haid Ecuador"). */
  name: string;
  /** Título de la ficha. */
  fullName: string;
  image: string;
  sizes: string[];
  /** "Nuestro producto". */
  description: string;
  /** "Conservación" (un elemento por párrafo). */
  storage: string[];
  datasheet: string;
  /** En móvil el original centra título, lista y textos (todas salvo Starter). */
  mobileCenter: boolean;
  /** Ancho fijo en móvil del texto "Nuestro producto" (px), si el original lo define. */
  mobileTextWidth?: number;
};

const SIZES_PELLET = ["#3 de 1.2 mm", "#4 de 1.6 mm", "#5 de 2.0 mm"];
const DESC_EXT = "Alimento balanceado para camarón Litopenaeus vannamei, elaborado por proceso de extruido.";
const STORAGE_EXT = ["Almacenar en lugar seco, ventilado y cubierto de los rayos solares."];
const STORAGE_PELLET = ["Almacenar en lugares cubiertos, secos y bien ventilados.", "No exponer a los rayos solares."];

export const products: Product[] = [
  {
    slug: "starter-pro",
    name: "Starter Pro",
    fullName: "STARTER PRO 45% EXT",
    image: "2024/06/haid-productos-01.png",
    sizes: ["#0 de 0.3mm", "#1 de 0.5mm", "#2 de 0.8mm"],
    description: "Alimento balanceado para camarón Litopenaus vannamei elaborado por proceso de extruido",
    storage: ["Almacenar en lugar seco, ventilado y cubierto de los rayos solares.\u00a0"],
    datasheet: "2024/07/Ficha-tecnica-Starter-pro-45_-Ext.pdf",
    mobileCenter: true,
    mobileTextWidth: 358.097,
  },
  {
    slug: "starter",
    name: "Starter",
    fullName: "STARTER 42% EXT",
    image: "2024/06/haid-productos-02.png",
    sizes: ["#2 de 0.8 mm"],
    description: DESC_EXT,
    storage: STORAGE_EXT,
    datasheet: "2024/07/Ficha-tecnica-Starter-42_-0.8-Ext.pdf",
    mobileCenter: false,
  },
  {
    slug: "speed",
    name: "Speed",
    fullName: "SPEED PELLET",
    image: "2024/06/haid-productos-05.png",
    sizes: SIZES_PELLET,
    description: DESC_EXT,
    storage: STORAGE_EXT,
    datasheet: "2024/07/ficha-tecnica-Speed-pellet.pdf",
    mobileCenter: true,
    mobileTextWidth: 384.097,
  },
  {
    slug: "happiness-plus",
    name: "Happiness Plus",
    fullName: "HAPPINESS PLUS 35% PELLET",
    image: "2024/06/haid-productos-06.png",
    sizes: SIZES_PELLET,
    description: DESC_EXT,
    storage: STORAGE_EXT,
    datasheet: "2024/07/Ficha-Tecnica-happiness-plus-35-pellet.pdf",
    mobileCenter: true,
    mobileTextWidth: 308.097,
  },
  {
    slug: "happiness",
    name: "Happiness",
    fullName: "SHRYMPY HAPPINESS 35% PELLET",
    image: "2024/06/haid-productos-03.png",
    sizes: SIZES_PELLET,
    description: "Alimento balanceado pelletizado para camarones juveniles y de engorde que proporciona los nutrientes esenciales para el camarón",
    storage: STORAGE_PELLET,
    datasheet: "2024/07/Ficha-tecnica-Shrimpy-happiness-35-pellet.pdf",
    mobileCenter: true,
    mobileTextWidth: 338.097,
  },
  {
    slug: "fitness",
    name: "Fitness",
    fullName: "SHRYMPY FITNESS 35% PELLET",
    image: "2024/06/haid-productos-04.png",
    sizes: SIZES_PELLET,
    description:
      "Alimento balanceado pelletizado para camarones juveniles y de engorde que proporciona los nutrientes esenciales y previene enfermedades en el intestino del camarón",
    storage: STORAGE_PELLET,
    datasheet: "2024/07/Ficha-tecnica-Shrimpy-fitness-35-pellet.pdf",
    mobileCenter: true,
    mobileTextWidth: 338.097,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
