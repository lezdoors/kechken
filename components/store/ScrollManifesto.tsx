"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "Made by hand,",
  "shaped by use,",
  "carried for life.",
];

export default function ScrollManifesto() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Section is ~180vh tall and the inner content is sticky-pinned at
      // top: 0 for one viewport. Progress = how far through the scrollable
      // overhang we are. 0 the instant the sticky pin engages, 1 right before
      // it releases at the bottom of the section.
      const scrollable = Math.max(1, rect.height - vh);
      const p = (-rect.top) / scrollable;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (raf === 0) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, []);

  // Move text from +160px (sitting low) up through 0 to -160px as the user
  // scrolls past. 320px total swing reads as obvious parallax against the
  // still backdrop.
  const translate = 160 - progress * 320;
  const backdropTranslate = -progress * 80;

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{
        background: "#F9F9F9",
        borderTop: "1px solid #E5E5E5",
        borderBottom: "1px solid #E5E5E5",
        height: "180vh",
      }}
      aria-label="House manifesto"
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/brand/hero/home-hero-1-arches.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 46%",
            opacity: 0.18,
            filter: "saturate(0.85)",
            transform: `translateY(${backdropTranslate}px) scale(1.08)`,
            willChange: "transform",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #F9F9F9 0%, rgba(249,249,249,0.4) 50%, #F9F9F9 100%)",
          }}
        />

        <div
          className="relative mx-auto flex items-center h-full"
          style={{
            maxWidth: "1600px",
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)",
          }}
        >
          <div
            style={{
              transform: `translateY(${translate}px)`,
              willChange: "transform",
            }}
          >
            <div
              className="uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                fontWeight: 500,
                color: "#8C4A26",
                marginBottom: "32px",
              }}
            >
              The House
            </div>
            {LINES.map((line) => (
              <div
                key={line}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "clamp(48px, 7vw, 128px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  color: "#0F0F0F",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
