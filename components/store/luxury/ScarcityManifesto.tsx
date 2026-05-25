// Full-bleed black banner. Three minimal columns, thin hairline dividers,
// micro copy. Restraint over ornament.
const PILLARS = [
  {
    eyebrow: "I",
    title: "Limited Batches",
    body: "Editions of twenty-four. Numbered, signed, never restocked.",
  },
  {
    eyebrow: "II",
    title: "Full-Grain Patina",
    body: "Top-layer hide only. Softens with wear, deepens with years.",
  },
  {
    eyebrow: "III",
    title: "Lifetime Repair",
    body: "Send the piece back. We restitch, re-edge, return.",
  },
];

export default function ScarcityManifesto() {
  return (
    <section className="w-full bg-black text-white py-[clamp(80px,12vw,160px)] px-[clamp(24px,6vw,96px)]">
      <div className="mx-auto max-w-[1400px]">
        <p
          className="mb-[clamp(48px,6vw,96px)] text-center"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontWeight: 500,
            opacity: 0.6,
          }}
        >
          The House Promises
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(48px,5vw,96px)]">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className={`flex flex-col ${i > 0 ? "md:border-l md:border-white/15 md:pl-[clamp(24px,3vw,48px)]" : ""}`}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  letterSpacing: "0.1em",
                  fontStyle: "italic",
                  opacity: 0.5,
                  marginBottom: "32px",
                }}
              >
                {p.eyebrow}.
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(28px, 2.8vw, 40px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  margin: 0,
                  marginBottom: "24px",
                }}
              >
                {p.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  fontWeight: 400,
                  opacity: 0.78,
                  maxWidth: "32ch",
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
