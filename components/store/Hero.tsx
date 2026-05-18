import Image from "next/image";
import Link from "next/link";

// Swap point: when the Drop 01 hero WebP lands, set this to the public path.
// While null, renders the warm editorial gradient placeholder.
// See docs/brand/HF-PROMPTS-DROP-01.md prompt #1 for what to generate.
const HERO_IMAGE: string | null = null;

export default function Hero() {
  const hasImage = HERO_IMAGE !== null;

  return (
    <section className="relative h-[100vh] min-h-[640px] flex items-end overflow-hidden bg-[var(--color-bg)]">
      {hasImage ? (
        <Image
          src={HERO_IMAGE as string}
          alt="Nitra Drop 01"
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
      ) : (
        // Editorial bone-warm gradient placeholder.
        // References the Aigle daylight register × Jacquemus warmth.
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, #f0e6d2 0%, #e8dcc2 32%, #d9c8a3 60%, #b59874 88%, #5c4530 100%)",
          }}
        />
      )}

      {/* Subtle vignette to lift text contrast over gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[5]"
        style={{
          background:
            "linear-gradient(180deg, transparent 50%, rgba(28,26,24,0.18) 100%)",
        }}
      />

      <div className="relative w-full px-[clamp(20px,5vw,80px)] pb-[clamp(60px,8vw,120px)] pt-[clamp(120px,15vw,200px)]">
        <div className="max-w-[1600px] mx-auto">
          <div
            className={`ed-eyebrow mb-6 ${
              hasImage ? "text-white/85" : "text-[var(--color-mineral)]"
            }`}
          >
            Drop 01 · June 2026
          </div>

          <h1
            className={`ed-display text-[clamp(64px,11vw,160px)] max-w-[12ch] ${
              hasImage ? "text-white" : "text-[var(--color-ink)]"
            }`}
          >
            nitra.
          </h1>

          <p
            className={`mt-8 max-w-[36ch] font-sans font-light text-[clamp(15px,1.2vw,18px)] tracking-[0.04em] uppercase ${
              hasImage ? "text-white/80" : "text-[var(--color-ink-soft)]"
            }`}
            style={{ letterSpacing: "0.06em" }}
          >
            Modern Moroccan Identity
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-start gap-5">
            <Link
              href="#drop"
              className={hasImage ? "ed-cta-light" : "ed-cta"}
            >
              Shop the Drop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
