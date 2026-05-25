import Image from "next/image";

// Editorial 2-column block: a tall portrait image right, a small justified
// paragraph anchored to the bottom-left of a near-empty column. The negative
// space is the design.
export default function ArtisanDossier() {
  return (
    <section className="w-full bg-white px-[clamp(24px,6vw,96px)] py-[clamp(80px,12vw,180px)]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(32px,5vw,96px)] items-end">
          {/* LEFT — copy block anchored to bottom-left of a tall column */}
          <div className="md:col-span-7 flex flex-col justify-end min-h-[clamp(360px,55vh,640px)] md:pr-12">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "#000000",
                marginBottom: "32px",
                opacity: 0.6,
              }}
            >
              I — The Atelier
            </p>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(40px, 5.2vw, 88px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                margin: 0,
                color: "#000000",
                marginBottom: "40px",
              }}
            >
              Seven hands.<br />
              <span style={{ fontStyle: "italic", opacity: 0.7 }}>
                One cycle.
              </span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                lineHeight: 1.75,
                fontWeight: 400,
                color: "#111111",
                maxWidth: "44ch",
                textAlign: "justify",
                hyphens: "auto",
              }}
            >
              In a quiet courtyard off the Medina, seven master tanners cut,
              saddle-stitch, edge-burnish and number every object. No machines
              for the seams. No outsourced finishing. Each piece sits on the
              workbench for fourteen days before it ships — long enough for the
              leather to remember the hand that shaped it.
            </p>
          </div>

          {/* RIGHT — tall portrait image */}
          <div className="md:col-span-5">
            <div
              className="relative w-full overflow-hidden"
              style={{
                background: "#F5F5F5",
                aspectRatio: "4 / 5",
              }}
            >
              <Image
                src="/brand/section/atelier-bw.webp"
                alt="A master tanner saddle-stitching cognac leather in the Marrakech atelier"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
