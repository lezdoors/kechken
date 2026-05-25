"use client";

import Link from "next/link";
import { useState } from "react";

// White footer, single 1px hairline above, allocations-only email capture
// left, micro-sans links right. No social icons, no marketing fluff.
export default function AtelierFooter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "sending") return;
    setState("sending");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "luxury-footer" }),
      });
      setState(r.ok ? "ok" : "err");
    } catch {
      setState("err");
    }
  }

  return (
    <footer className="w-full bg-white" style={{ borderTop: "1px solid #000000" }}>
      <div className="mx-auto max-w-[1400px] px-[clamp(24px,6vw,96px)] py-[clamp(64px,8vw,120px)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(48px,5vw,96px)] items-start">
          {/* LEFT — allocations email capture */}
          <div className="md:col-span-7">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "#000000",
                opacity: 0.55,
                marginBottom: "24px",
              }}
            >
              The Atelier List
            </p>

            <form
              onSubmit={submit}
              className="relative"
              style={{ borderBottom: "1px solid #000000" }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER EMAIL FOR PRIVATE ALLOCATIONS"
                className="w-full bg-transparent outline-none pr-12 py-4"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#000000",
                }}
                aria-label="Email for private allocations"
                disabled={state === "sending" || state === "ok"}
              />
              <button
                type="submit"
                aria-label="Submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-60 transition-opacity"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  color: "#000000",
                  background: "transparent",
                  border: "none",
                  padding: "8px",
                  cursor: "pointer",
                }}
                disabled={state === "sending" || state === "ok"}
              >
                →
              </button>
            </form>

            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.04em",
                fontWeight: 400,
                color: "#000000",
                opacity: 0.55,
                minHeight: "1.2em",
              }}
              aria-live="polite"
            >
              {state === "ok"
                ? "Confirmed. We'll write when the next edition opens."
                : state === "err"
                  ? "Something didn't go through. Try once more."
                  : state === "sending"
                    ? "Confirming…"
                    : "One email per drop. Never shared."}
            </p>
          </div>

          {/* RIGHT — luxury micro-link nav */}
          <nav
            className="md:col-span-5 grid grid-cols-2 gap-y-3 gap-x-8"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#000000",
            }}
          >
            <Link href="/legal/shipping" className="hover:opacity-60 transition-opacity">
              Shipping
            </Link>
            <Link href="/legal/returns" className="hover:opacity-60 transition-opacity">
              Returns
            </Link>
            <Link href="/legal/care" className="hover:opacity-60 transition-opacity">
              Care
            </Link>
            <Link href="/contact" className="hover:opacity-60 transition-opacity">
              Atelier
            </Link>
            <Link href="/legal/terms" className="hover:opacity-60 transition-opacity">
              Terms
            </Link>
            <Link href="/legal/privacy" className="hover:opacity-60 transition-opacity">
              Privacy
            </Link>
          </nav>
        </div>

        {/* Bottom row — wordmark + copyright */}
        <div
          className="mt-[clamp(64px,8vw,120px)] pt-8 flex flex-wrap items-end justify-between gap-y-4"
          style={{ borderTop: "1px solid #000000" }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 7vw, 96px)",
              letterSpacing: "-0.02em",
              fontWeight: 400,
              lineHeight: 0.95,
              color: "#000000",
            }}
          >
            MAISON TANNEURS
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#000000",
              opacity: 0.55,
            }}
          >
            © MMXXVI · Marrakech / Paris
          </span>
        </div>
      </div>
    </footer>
  );
}
