import type { CSSProperties } from "react";

/**
 * Camarón en perfil construido con geometría: una curva de Bézier define el lomo, el contorno
 * se obtiene desplazando la curva según un perfil de grosor (cabeza ancha, cola fina) y los
 * segmentos del caparazón son cortes transversales. Hereda `currentColor`; `gap` es el color
 * del fondo, que dibuja los cortes y el ojo.
 */

type V = [number, number];
const P: V[] = [
  [86, 138],
  [150, 78],
  [420, -70],
  [300, 214],
];

const r1 = (n: number) => Math.round(n * 10) / 10;

function bez(t: number): V {
  const u = 1 - t;
  return [
    u ** 3 * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t ** 3 * P[3][0],
    u ** 3 * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t ** 3 * P[3][1],
  ];
}
function tan(t: number): V {
  const u = 1 - t;
  const x = 3 * u * u * (P[1][0] - P[0][0]) + 6 * u * t * (P[2][0] - P[1][0]) + 3 * t * t * (P[3][0] - P[2][0]);
  const y = 3 * u * u * (P[1][1] - P[0][1]) + 6 * u * t * (P[2][1] - P[1][1]) + 3 * t * t * (P[3][1] - P[2][1]);
  const l = Math.hypot(x, y);
  return [x / l, y / l];
}
/** Grosor del cuerpo en t: cabeza redondeada, pico en el tórax, afinado hacia la cola. */
function width(t: number) {
  if (t < 0.12) return 26 + (t / 0.12) * 34;
  if (t < 0.3) return 60 + Math.sin(((t - 0.12) / 0.18) * Math.PI) * 4;
  return 60 - ((t - 0.3) / 0.7) ** 0.85 * 46;
}

const STEPS = 48;
const top: V[] = [];
const bottom: V[] = [];
for (let i = 0; i <= STEPS; i++) {
  const t = i / STEPS;
  const [x, y] = bez(t);
  const [tx, ty] = tan(t);
  const w = width(t) / 2;
  // normal (−ty, tx): hacia el interior de la curva (abajo en el lomo)
  top.push([x + ty * w, y - tx * w]);
  bottom.push([x - ty * w, y + tx * w]);
}
const outline =
  "M" +
  top.map((p) => `${r1(p[0])} ${r1(p[1])}`).join(" L") +
  " L" +
  [...bottom]
    .reverse()
    .map((p) => `${r1(p[0])} ${r1(p[1])}`)
    .join(" L") +
  " Z";

// Cortes transversales (segmentos del abdomen).
const cuts = [0.36, 0.45, 0.54, 0.63, 0.72, 0.81, 0.9].map((t) => {
  const [x, y] = bez(t);
  const [tx, ty] = tan(t);
  const w = width(t) / 2 + 2;
  return `M${r1(x + ty * w)} ${r1(y - tx * w)} L${r1(x - ty * w)} ${r1(y + tx * w)}`;
});
// Borde del caparazón (cefalotórax).
const carapace = (() => {
  const t = 0.3;
  const [x, y] = bez(t);
  const [tx, ty] = tan(t);
  const w = width(t) / 2 + 2;
  return `M${r1(x + ty * w)} ${r1(y - tx * w)} L${r1(x - ty * w)} ${r1(y + tx * w)}`;
})();

// Patas natatorias bajo el abdomen y patas del tórax.
const legs = [0.14, 0.2, 0.26, 0.38, 0.47, 0.56, 0.65].map((t) => {
  const [x, y] = bez(t);
  const [tx, ty] = tan(t);
  const w = width(t) / 2;
  const x0 = x - ty * w * 0.8;
  const y0 = y + tx * w * 0.8;
  const len = t < 0.3 ? 30 : 22;
  return `M${r1(x0)} ${r1(y0)} Q ${r1(x0 - ty * len * 0.8 - tx * 10)} ${r1(y0 + tx * len * 0.8 - ty * 10)} ${r1(x0 - ty * len - tx * 18)} ${r1(y0 + tx * len - ty * 18)}`;
});

const head = bez(0);
const headT = tan(0);
const tail = bez(1);
const tailT = tan(1);
const tailAngle = (Math.atan2(tailT[1], tailT[0]) * 180) / Math.PI;

export function Shrimp({ className = "", gap = "transparent", style }: { className?: string; gap?: string; style?: CSSProperties }) {
  const hx = head[0];
  const hy = head[1];
  return (
    <svg viewBox="-60 -50 500 330" fill="currentColor" className={className} style={style} aria-hidden="true" focusable="false">
      {/* antenas largas hacia atrás sobre el lomo */}
      <path
        d={`M${r1(hx - 6)} ${r1(hy - 18)} C ${r1(hx - 40)} ${r1(hy - 70)}, ${r1(hx + 30)} ${r1(hy - 130)}, ${r1(hx + 130)} ${r1(hy - 150)} S ${r1(hx + 230)} ${r1(hy - 150)}, ${r1(hx + 260)} ${r1(hy - 130)}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M${r1(hx + 2)} ${r1(hy - 22)} C ${r1(hx - 10)} ${r1(hy - 90)}, ${r1(hx + 60)} ${r1(hy - 160)}, ${r1(hx + 150)} ${r1(hy - 176)}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* rostro */}
      <path d={`M${r1(hx + 24)} ${r1(hy - 20)} L${r1(hx - 66)} ${r1(hy - 52)} L${r1(hx + 6)} ${r1(hy + 2)} Z`} />
      {/* patas */}
      {legs.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" />
      ))}
      {/* abanico de la cola */}
      {[-38, -13, 13, 38].map((deg) => {
        const a = ((tailAngle + deg) * Math.PI) / 180;
        const cx = r1(tail[0] + Math.cos(a) * 26);
        const cy = r1(tail[1] + Math.sin(a) * 26);
        return <ellipse key={deg} cx={cx} cy={cy} rx="28" ry="9" transform={`rotate(${r1(tailAngle + deg)} ${cx} ${cy})`} />;
      })}
      {/* cuerpo */}
      <path d={outline} stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      {cuts.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={gap} strokeWidth="3.6" />
      ))}
      <path d={carapace} fill="none" stroke={gap} strokeWidth="3.6" />
      {/* ojo */}
      <circle cx={r1(hx + 14)} cy={r1(hy - 6)} r="5.5" fill={gap === "transparent" ? "#fff" : gap} />
      <path d="M0 0" transform={`translate(${headT[0]} 0)`} fill="none" />
    </svg>
  );
}
