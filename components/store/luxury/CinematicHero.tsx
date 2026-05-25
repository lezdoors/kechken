import Link from "next/link";
import Image from "next/image";

// Full-bleed 16:9 hero — uses the existing colonnade-walk poster while a
// proper film cut lands. Massive serif wordmark dead-center, micro-sans
// tagline + outlined CTA.
export default function CinematicHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div
        className="relative w-full"
        style={{ aspectRatio: "16 / 9", maxHeight: "100vh" }}
      >
        {/* Poster as fallback — once a cinematic film cut lands, swap to <video />. */}
        <Image
          src="/brand/hero/home-hero-1-arches.webp"
          alt="Maison Tanneurs — cognac duffle, Marrakech arches at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark scrim for legibility — kept low (25%) to preserve the image. */}
        <div className="absolute inset-0 bg-black/25" aria-hidden />

        {/* Center stack */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
          <p
            className="mb-8 opacity-80"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Spring / Été · MMXXVI
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(3rem, 11vw, 10rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              margin: 0,
            }}
          >
            MAISON TANNEURS
          </h1>

          <p
            className="mt-8 opacity-90"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            Parisian Elegance. Medina Craftsmanship.
          </p>

          <Link
            href="/products"
            className="mt-14 inline-flex items-center justify-center transition-colors hover:bg-white hover:text-black"
            style={{
              padding: "16px 36px",
              border: "1px solid #ffffff",
              background: "transparent",
              color: "#ffffff",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.28em",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            Discover the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
