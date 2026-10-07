// Descarga a public/media todas las imágenes y PDFs que el código referencia vía media("…").
// Uso: npm run import:media  y luego NEXT_PUBLIC_MEDIA_BASE=/media en .env.local
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const SOURCE = "https://www.haid.com.ec/wp-content/uploads";
const OUT = "public/media";

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(tsx?|mjs)$/.test(e.name)) yield p;
  }
}

const paths = new Set();
for await (const file of walk("src")) {
  const src = await readFile(file, "utf8");
  for (const m of src.matchAll(/"(20\d\d\/\d\d\/[^"]+\.(?:png|jpe?g|webp|svg|pdf))"/g)) paths.add(m[1]);
}

let ok = 0;
for (const p of paths) {
  const res = await fetch(`${SOURCE}/${encodeURI(p)}`);
  if (!res.ok) {
    console.warn(`✗ ${res.status} ${p}`);
    continue;
  }
  const dest = join(OUT, p);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  ok++;
}
console.log(`${ok}/${paths.size} archivos descargados en ${OUT}`);
