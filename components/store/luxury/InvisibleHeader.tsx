"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Transparent nav over the hero; resolves to white bg + black text after scroll.
// Mirrors The Row / Saint Laurent: logo dead-center, edge-aligned micro-links.
export default function InvisibleHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone = scrolled ? "text-black" : "text-white";
  const bg = scrolled
    ? "bg-white/95 backdrop-blur-md border-b border-black/10"
    : "bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${bg} ${tone}`}
    >
      <div className="grid grid-cols-3 items-center px-8 py-6 md:px-12">
        <nav
          className="flex items-center gap-8"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            letterSpacing: "0.22em",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          <Link href="/products" className="hover:opacity-60 transition-opacity">
            Shop
          </Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">
            Atelier
          </Link>
        </nav>

        <Link
          href="/luxury"
          className="justify-self-center"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 1.4vw, 22px)",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          MAISON TANNEURS
        </Link>

        <nav
          className="flex items-center justify-end gap-8"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            letterSpacing: "0.22em",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          <Link href="/contact" className="hover:opacity-60 transition-opacity">
            Account
          </Link>
          <Link href="/checkout" className="hover:opacity-60 transition-opacity">
            Cart (0)
          </Link>
        </nav>
      </div>
    </header>
  );
}
