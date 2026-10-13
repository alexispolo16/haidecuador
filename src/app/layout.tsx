import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsentLazy } from "@/components/CookieConsentLazy";
import { SITE_URL } from "@/content/site";
import { media } from "@/lib/media";

// Display técnico y seguro (Sora) + texto limpio y muy legible (Hanken Grotesk).
// Fuentes variables de Google Fonts (OFL) recortadas a los pesos que usa el sitio y a los caracteres
// latinos: pesan ~40 % menos que las de next/font/google y salen antes en la carga.
const sora = localFont({
  src: "./fonts/sora-latin-500-700.woff2",
  weight: "500 700",
  variable: "--font-sora",
  display: "swap",
  adjustFontFallback: "Arial",
});
const hanken = localFont({
  src: "./fonts/hanken-grotesk-latin-400-700.woff2",
  weight: "400 700",
  variable: "--font-hanken",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Haid Ecuador - Haid Ecuador", template: "%s - Haid Ecuador" },
  description:
    "Haid Ecuador Feed Cia. Ltda, líder en producción de piensos acuáticos y balanceados para camarón desde 1998. Innovación y excelencia en premezclas acuáticas y piensos, con un fuerte enfoque en investigación y desarrollo para la acuicultura.",
  icons: { apple: media("2024/06/cropped-favicon-180x180.png") },
};

export const viewport: Viewport = { themeColor: "#06223F" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${sora.variable} ${hanken.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsentLazy />
      </body>
    </html>
  );
}
