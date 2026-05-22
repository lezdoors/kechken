// Administrative supply-chain register. Reads like a procurement dossier,
// not a marketing About page. Black on white, structured, thin rules.

interface DossierRow {
  label: string;
  value: string;
  meta?: string;
}

const ROWS: DossierRow[] = [
  {
    label: "Atelier location",
    value: "Marrakech Medina, Morocco",
    meta: "Lat 31.6295°N / Lng -7.9811°W",
  },
  {
    label: "Direct artisan collaboration",
    value: "7 dedicated leatherworkers",
    meta: "Avg. tenure with house: 14 years",
  },
  {
    label: "Primary tannery source",
    value: "Fes traditional pits, Chouara district",
    meta: "Vegetable-tanned, 60-day cure",
  },
  {
    label: "Leather grade",
    value: "Full-grain Moroccan goatskin & cowhide",
    meta: "No top-coat correction, no embossed grain",
  },
  {
    label: "Hardware",
    value: "Solid antique brass, 100% — no plating",
    meta: "Cast & finished in-region",
  },
  {
    label: "Construction",
    value: "Hand saddle-stitch, contrast thread",
    meta: "No glue, no machine assembly on closing seams",
  },
  {
    label: "Output cadence",
    value: "Small batch, 30-60 units per drop",
    meta: "Two drops per year (Spring / Autumn)",
  },
  {
    label: "Carbon footprint",
    value: "≈ 4.2 kg CO₂e per unit",
    meta: "Marrakech → EU air, packaging incl.",
  },
];

export default function ArtisanDossier() {
  return (
    <section
      className="relative bg-[color:var(--color-paper)]"
      style={{
        paddingTop: "clamp(80px, 9vw, 140px)",
        paddingBottom: "clamp(80px, 9vw, 140px)",
        paddingLeft: "clamp(24px, 5vw, 80px)",
        paddingRight: "clamp(24px, 5vw, 80px)",
        borderTop: "1px solid var(--color-rule-strong)",
        borderBottom: "1px solid var(--color-rule-strong)",
      }}
    >
      <div className="max-w-[1480px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        {/* Left column — section title, dossier register */}
        <div className="flex flex-col">
          <div
            className="mb-6 uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "var(--color-ink-muted)",
            }}
          >
            DOC.MT-001 / Production
          </div>
          <h2
            className="max-w-[14ch]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(34px, 4.2vw, 64px)",
              letterSpacing: "-0.018em",
              lineHeight: 1.02,
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            Production Footprint
          </h2>
          <p
            className="mt-6 max-w-[44ch]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              lineHeight: 1.65,
              color: "var(--color-ink-soft)",
            }}
          >
            We publish what we make, where it comes from, and who builds it.
            No partial disclosures, no opaque sourcing language. The list at
            right is the supply chain in full — read it before you buy.
          </p>
        </div>

        {/* Right column — administrative dossier list */}
        <div role="list" className="flex flex-col">
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              role="listitem"
              className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] gap-x-6 gap-y-1 py-5"
              style={{
                borderTop:
                  i === 0
                    ? "1px solid var(--color-rule-strong)"
                    : "1px solid var(--color-rule)",
                borderBottom:
                  i === ROWS.length - 1
                    ? "1px solid var(--color-rule-strong)"
                    : undefined,
              }}
            >
              <div
                className="uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10.5px",
                  letterSpacing: "0.14em",
                  color: "var(--color-ink-muted)",
                  paddingTop: "2px",
                }}
              >
                {row.label}
              </div>
              <div className="flex flex-col gap-1">
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "var(--color-ink)",
                    lineHeight: 1.35,
                  }}
                >
                  {row.value}
                </div>
                {row.meta && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.04em",
                      color: "var(--color-ink-muted)",
                    }}
                  >
                    {row.meta}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
