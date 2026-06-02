"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocalizedHref, useT } from "@/lib/i18n-client";

const HERO_IMAGE = "/brand/hero/home-hero-bright-atelier-plinth.webp";

export default function Hero() {
  const t = useT();
  const href = useLocalizedHref();

  useEffect(() => {
    document.documentElement.dataset.heroTone = "light";
    window.dispatchEvent(
      new CustomEvent("mt:hero-tone", { detail: { tone: "light" } }),
    );
    return () => {
      document.documentElement.removeAttribute("data-hero-tone");
    };
  }, []);

  return (
    <section
      id="top"
      className="relative w-full min-h-[100svh] overflow-hidden bg-[var(--color-paper)] text-[var(--color-ink)]"
      aria-label="Maison Tanneurs — hand-stitched leather, Marrakech to Paris"
    >
      <Image
        src={HERO_IMAGE}
        alt="Cognac leather bag staged on a pale stone plinth in a sunlit Moroccan interior"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_center] sm:object-center"
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(244,240,232,0.88) 0%, rgba(244,240,232,0.46) 34%, rgba(244,240,232,0.04) 76%), linear-gradient(to top, rgba(244,240,232,0.62) 0%, rgba(244,240,232,0.16) 42%, rgba(244,240,232,0) 72%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-[clamp(72px,10svh,112px)] md:px-12 md:pb-[8vh]">
        <div className="max-w-[1320px] pl-0 md:pl-[clamp(0px,2vw,28px)]">
          <p
            className="mb-7 tech-meta"
            style={{ color: "rgba(31,29,27,0.68)" }}
          >
            {t("hero.kicker")}
          </p>

          <h1
            style={{
              color: "var(--color-ink)",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(62px, 12.4vw, 188px)",
              letterSpacing: "-0.035em",
              lineHeight: 0.84,
              margin: 0,
              maxWidth: "9.8ch",
              textWrap: "balance",
            }}
          >
            Maison
            <br />
            Tanneurs<span style={{ fontStyle: "italic", opacity: 0.48 }}>.</span>
          </h1>

          <p
            className="mt-7"
            style={{
              color: "rgba(31,29,27,0.76)",
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(13px, 1.1vw, 16px)",
              lineHeight: 1.7,
              letterSpacing: "-0.005em",
              maxWidth: "38ch",
            }}
          >
            {t("hero.copy")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href={href("/products")}
              className="inline-flex items-center border-b border-current pb-1 transition-opacity hover:opacity-60"
              style={{
                color: "var(--color-ink)",
                fontFamily: "var(--font-sans)",
                fontSize: "10.5px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              View the Edition
            </Link>
            <Link
              href={href("/about")}
              className="inline-flex items-center border-b border-current pb-1 transition-opacity hover:opacity-60"
              style={{
                color: "rgba(31,29,27,0.72)",
                fontFamily: "var(--font-sans)",
                fontSize: "10.5px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Read the Dossier
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
