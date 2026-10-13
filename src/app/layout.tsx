import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { media } from "@/lib/media";

// Display técnico y seguro (Sora) + texto limpio y muy legible (Hanken Grotesk).
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap" });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.haid.com.ec"),
  title: { default: "Haid Ecuador - Haid Ecuador", template: "%s - Haid Ecuador" },
  description:
    "Haid Ecuador Feed Cia. Ltda, líder en producción de piensos acuáticos y balanceados para camarón desde 1998. Innovación y excelencia en premezclas acuáticas y piensos, con un fuerte enfoque en investigación y desarrollo para la acuicultura.",
  icons: { icon: media("2024/06/cropped-favicon-192x192.png"), apple: media("2024/06/cropped-favicon-180x180.png") },
};

export const viewport: Viewport = { themeColor: "#06223F" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${sora.variable} ${hanken.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
