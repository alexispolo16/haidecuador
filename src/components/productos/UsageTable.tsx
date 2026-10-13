/**
 * Tabla de sugerencia de uso (antes un SVG): misma información y colores, ahora como tabla real.
 * Las columnas son las etapas del cultivo (peso del camarón); cada barra de color es un alimento.
 */

export const stages = ["PL10", "PL20", "1g", "3g", "8g"] as const;

export const color = {
  pro: "#e0d11f",
  starter: "#f79524",
  speed: "#a04042",
  fitness: "#ab4d9c",
  plus: "#00ac4e",
  happiness: "#00a1d4",
};

type Bar = { text: string; color: string };
/** Una fila: por cada etapa (0–4), la barra que ocupa esa casilla. */
type Row = Partial<Record<0 | 1 | 2 | 3 | 4, Bar>>;
type Group = { label: string; bg: string; rows: Row[] };

const bar = (text: string, c: string): Bar => ({ text, color: c });

const groups: Group[] = [
  {
    label: "Alimentos para raceways",
    bg: "#d2d5d8",
    rows: [
      { 0: bar("Starter PRO 0.5 – 45%", color.pro) },
      { 1: bar("Starter 0.3 – 42%", color.starter) },
      { 1: bar("Starter 0.6 – 42%", color.starter) },
    ],
  },
  {
    label: "Alimentos para siembras directas y precrías",
    bg: "#edeeef",
    rows: [{ 1: bar("Starter 0.8 – 42%", color.starter) }, { 1: bar("Starter 0.8 – 35%", color.starter) }],
  },
  {
    label: "Alimentos para post – transferencia y engorde",
    bg: "#d2d5d8",
    rows: [
      { 2: bar("Speed 1.2 – 37%", color.speed), 3: bar("Speed 1.6 – 37%", color.speed), 4: bar("Speed 2.0 – 37%", color.speed) },
      { 2: bar("Fitness 1.2 – 35%", color.fitness), 3: bar("Fitness 1.6 – 35%", color.fitness), 4: bar("Fitness 2.0 – 35%", color.fitness) },
      { 4: bar("Fitness 2.0 – 30%", color.fitness) },
      {
        2: bar("Happiness Plus 1.2 – 35%", color.plus),
        3: bar("Happiness Plus 1.6 – 35%", color.plus),
        4: bar("Happiness Plus 2.0 – 35%", color.plus),
      },
      { 4: bar("Happiness Plus 2.0 – 30%", color.plus) },
      {
        2: bar("Happiness 1.2 – 35%", color.happiness),
        3: bar("Happiness 1.6 – 35%", color.happiness),
        4: bar("Happiness 2.0 – 35%", color.happiness),
      },
      { 4: bar("Happiness 2.0 – 30%", color.happiness) },
    ],
  },
];

/** Filas de la tabla en las que aparece un alimento (por su color), con la casilla de cada barra. */
export function usageRows(c: string) {
  return groups.flatMap((g) =>
    g.rows
      .map((row) => (Object.entries(row) as [string, Bar][]).filter(([, b]) => b.color === c).map(([ci, b]) => ({ stage: Number(ci), text: b.text })))
      .filter((r) => r.length > 0)
      .map((bars) => ({ group: g.label, bars })),
  );
}

/** Etiqueta de etapa para cada columna (se usa en la versión móvil). */
export const stageLabel = ["PL10", "PL20", "1 g", "3 g", "8 g – cosecha"];

export function UsageTable() {
  return (
    <>
      {/* Escritorio y tablet: tabla completa (con desplazamiento horizontal si no cabe) */}
      <div className="overflow-x-auto rounded-2xl bg-white p-2 shadow-[0_20px_44px_-32px_rgba(6,34,63,0.5)] ring-1 ring-navy/10 max-md:hidden">
        <table className="w-full min-w-[780px] table-fixed border-collapse text-left">
          <caption className="sr-only">Tabla de sugerencia de uso por etapa de cultivo</caption>
          <colgroup>
            <col className="w-[17%]" />
            {stages.map((s) => (
              <col key={s} />
            ))}
          </colgroup>
          <thead>
            <tr className="bg-gradient-to-r from-[#103c66] to-[#103b70] text-white">
              <th scope="col" className="rounded-tl-xl px-4 py-2.5 font-display text-[0.85rem] font-semibold">
                Peso g
              </th>
              {stages.map((s, i) => (
                <th key={s} scope="col" className={`px-2.5 py-2.5 font-display text-[0.85rem] font-semibold ${i === 4 ? "rounded-tr-xl" : ""}`}>
                  {i === 4 ? (
                    <span className="flex justify-between gap-2">
                      <span>{s}</span>
                      <span>cosecha</span>
                    </span>
                  ) : (
                    s
                  )}
                </th>
              ))}
            </tr>
          </thead>
          {groups.map((g, gi) => (
            <tbody key={g.label} className={gi > 0 ? "[&>tr:first-child>*]:border-t-[4px] [&>tr:first-child>*]:border-t-white" : "[&>tr:first-child>*]:border-t-[4px] [&>tr:first-child>*]:border-t-white"}>
              {g.rows.map((row, ri) => (
                <tr key={ri}>
                  {ri === 0 && (
                    <th
                      scope="row"
                      rowSpan={g.rows.length}
                      className="px-4 align-middle font-display text-[0.85rem] leading-snug font-bold text-[#565759]"
                      style={{ backgroundColor: g.bg }}
                    >
                      {g.label}
                    </th>
                  )}
                  {stages.map((_, ci) => {
                    const b = row[ci as 0 | 1 | 2 | 3 | 4];
                    return (
                      <td key={ci} className="p-[1px]" style={{ backgroundColor: g.bg }}>
                        {b ? (
                          <div className="flex h-[30px] items-center rounded-[4px] px-2.5 text-[0.78rem] leading-none font-medium whitespace-nowrap text-white" style={{ backgroundColor: b.color }}>
                            {b.text}
                          </div>
                        ) : (
                          <div className="h-[30px]" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* Móvil: cada grupo es una tarjeta con sus alimentos y la etapa de cada uno */}
      <div className="space-y-3 md:hidden">
        {groups.map((g) => (
          <section key={g.label} className="overflow-hidden rounded-2xl ring-1 ring-navy/10" style={{ backgroundColor: g.bg }}>
            <h3 className="px-3 py-2 font-display text-[0.88rem] leading-snug font-bold text-[#565759]">{g.label}</h3>
            <ul className="grid list-none gap-1 p-1.5 pt-0">
              {g.rows.map((row, ri) =>
                (Object.entries(row) as [string, Bar][]).map(([ci, b]) => (
                  <li key={`${ri}-${ci}`} className="flex items-center justify-between gap-3 rounded-[5px] px-2.5 py-1.5 text-[0.8rem] leading-tight font-medium text-white" style={{ backgroundColor: b.color }}>
                    <span>{b.text}</span>
                    <span className="shrink-0 text-[0.7rem] font-semibold opacity-85">{stageLabel[Number(ci)]}</span>
                  </li>
                )),
              )}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
