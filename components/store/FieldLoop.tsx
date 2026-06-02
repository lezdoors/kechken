"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC_MP4 = "/videos/hero-model-white-suit-bag.mp4";
const VIDEO_SRC_WEBM = "/videos/atelier-loop.webm"; // legacy fallback only

export default function FieldLoop() {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    el.muted = true;
    el.playsInline = true;
    el.loop = true;
    const tryPlay = () => {
      if (mediaQuery.matches) return;
      el.play().catch(() => undefined);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) tryPlay();
          else el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    const onMotionChange = () => {
      if (mediaQuery.matches) el.pause();
      else if (el.getBoundingClientRect().top < window.innerHeight) tryPlay();
    };
    mediaQuery.addEventListener("change", onMotionChange);
    return () => {
      io.disconnect();
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <section
      aria-label="Field loop"
      className="w-full bg-[color:var(--color-warm-black)] text-[color:var(--color-ivory)] border-y border-[color:var(--color-rule)]"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-[color:rgba(244,240,232,0.15)] text-[color:rgba(244,240,232,0.7)]">
        <span className="tech-meta">§05 — Field Loop</span>
        <span className="tech-meta hidden md:inline">
          PLATE 02 — MARRAKECH ATELIER · 14-DAY CYCLE
        </span>
        <span className="tech-meta">MUTED · LOOPED</span>
      </div>

      {/* Constrained on large screens — the current cut crops awkwardly when
          stretched to ultrawide. Cap at 1100px and center; replace with a
          higher-resolution wide cut later to go full-bleed again. */}
      <div className="w-full bg-[color:var(--color-warm-black)] py-10 lg:py-14">
        <div
          className="relative mx-auto bg-[color:var(--color-warm-black)] overflow-hidden"
          style={{ aspectRatio: "16 / 9", maxWidth: "1100px" }}
        >
          <video
            ref={ref}
            className="absolute inset-0 w-full h-full object-cover"
            preload="none"
            poster="/brand/editorial/model-white-suit-salon.webp"
            aria-hidden
          >
            <source src={VIDEO_SRC_MP4} type="video/mp4" />
            <source src={VIDEO_SRC_WEBM} type="video/webm" />
          </video>
        </div>
      </div>

      <div className="grid grid-cols-12 px-6 py-5 border-t border-[color:rgba(244,240,232,0.15)] text-[color:rgba(244,240,232,0.7)] gap-y-2">
        <span className="col-span-12 md:col-span-6 tech-meta">
          Filmed Marrakech · Atelier Cut
        </span>
        <span className="col-span-12 md:col-span-3 tech-meta md:text-center">
          1080p · 24fps · No Audio
        </span>
        <span className="col-span-12 md:col-span-3 tech-meta md:text-right">
          Director Cut · Y. Berrada
        </span>
      </div>
    </section>
  );
}
