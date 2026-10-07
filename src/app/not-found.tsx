import type { Metadata } from "next";

export const metadata: Metadata = { title: "Página no encontrada" };

/**
 * 404 del tema Hello Elementor del sitio original: contenedor de 1140px, h1 del
 * kit (blanco, por eso no se ve sobre el fondo blanco, igual que en el original) y el párrafo.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1140px] max-[1199px]:px-2.5">
      <h1 className="mt-2 mb-4">No se ha podido encontrar la página.</h1>
      <p>Parece que no se ha encontrado nada en esta ubicación.</p>
    </div>
  );
}
