// Full-bleed muted-autoplay editorial film block.
// Used as an atmospheric break between commerce sections on home.

import Link from "next/link";

export default function AtelierLoop() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[color:var(--color-near-black)]"
      aria-label="Maison film — the atelier in motion"
      style={{
        borderTop: "1px solid var(--color-rule-strong)",
        borderBottom: "1px solid var(--color-rule-strong)",
      }}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: "1100 / 620", maxHeight: "82svh" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/brand/hero/home-hero-3-woman-arches.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/atelier-loop.webm" type="video/webm" />
          <source src="/videos/atelier-loop.mp4" type="video/mp4" />
        </video>

        {/* Bottom-left scrim for text legibility */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "62%",
            background:
              "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.18) 50%, rgba(10,10,10,0.55) 100%)",
          }}
        />

        {/* Editorial overlay — bottom-left, restrained */}
        <div
          className="absolute inset-x-0 bottom-0 z-[2]"
          style={{
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)",
            paddingBottom: "clamp(36px, 5vw, 72px)",
          }}
        >
          <div className="max-w-[1480px] mx-auto">
            <div
              className="mb-4 uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.22em",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.78)",
              }}
            >
              MAISON FILM / 0:10
            </div>
            <h2
              className="max-w-[18ch]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(28px, 3.4vw, 56px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.04,
                color: "#ffffff",
                margin: 0,
                textShadow: "0 1px 28px rgba(0,0,0,0.18)",
              }}
            >
              Worn where it was made.
            </h2>
            <div className="mt-7">
              <Link href="/about" className="mt-cta mt-cta--ghost-light">
                Read the House
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
