import type { Metadata } from "next";
import { Lato, Maven_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { media } from "@/lib/media";

// Mismas familias que el sitio original (Google Fonts: Maven Pro y Lato, todos los pesos).
const maven = Maven_Pro({ variable: "--font-maven", subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato", subsets: ["latin"], weight: ["100", "300", "400", "700", "900"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.haid.com.ec"),
  title: { default: "Haid Ecuador - Haid Ecuador", template: "%s - Haid Ecuador" },
  description:
    "Haid Ecuador Feed Cia. Ltda, líder en producción de piensos acuáticos y balanceados para camarón desde 1998. Innovación y excelencia en premezclas acuáticas y piensos, con un fuerte enfoque en investigación y desarrollo para la acuicultura.",
  icons: { icon: media("2024/06/cropped-favicon-192x192.png"), apple: media("2024/06/cropped-favicon-180x180.png") },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${maven.variable} ${lato.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
