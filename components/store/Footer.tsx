"use client";

import Link from "next/link";
import { useState } from "react";

const SHOP_LINKS = [
  { label: "New Drop", href: "/products" },
  { label: "Bags", href: "/products?category=Leather%20Goods" },
];

const HOUSE_LINKS = [
  { label: "The Story", href: "/about" },
  { label: "The Atelier", href: "/about" },
  { label: "Press", href: "mailto:hello@maisontanneurs.com?subject=Press" },
];

const HELP_LINKS = [
  { label: "Shipping", href: "/legal/shipping" },
  { label: "Returns", href: "/legal/returns" },
  { label: "Care", href: "/legal/care" },
  { label: "Contact", href: "mailto:hello@maisontanneurs.com" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/maisontanneurs" },
  { label: "TikTok", href: "https://www.tiktok.com/@maisontanneurs" },
];

type NewsletterStatus = "idle" | "submitting" | "ok" | "error";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error || "Could not subscribe right now.");
        return;
      }
      setStatus("ok");
      setMessage("Thank you. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <footer
      className="bg-[color:var(--color-paper)] text-[color:var(--color-ink)]"
      style={{ borderTop: "1px solid var(--color-rule-strong)" }}
    >
      {/* Newsletter editorial band */}
      <div style={{ borderBottom: "1px solid var(--color-rule)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-end">
          <div>
            <div
              className="mb-5 uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.22em",
                fontWeight: 500,
                color: "var(--color-bronze)",
              }}
            >
              The List
            </div>
            <h3
              className="max-w-[18ch]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(26px, 3.2vw, 40px)",
                letterSpacing: "-0.015em",
                lineHeight: 1.1,
                color: "var(--color-ink)",
                margin: 0,
              }}
            >
              Quiet correspondence. Drops, dispatches, nothing else.
            </h3>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-3 md:pb-3"
            aria-live="polite"
          >
            <div
              className="flex items-stretch"
              style={{ borderBottom: "1px solid var(--color-ink)" }}
            >
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "submitting"}
                className="flex-1 py-3.5 text-[15px] bg-transparent outline-none disabled:opacity-50"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink)",
                }}
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-3 uppercase disabled:opacity-60"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  fontWeight: 500,
                  color: "var(--color-ink)",
                }}
              >
                {status === "submitting" ? "Sending…" : "Join"}
              </button>
            </div>
            {message && (
              <p
                className="text-[12px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color:
                    status === "ok"
                      ? "var(--color-ink-soft)"
                      : "var(--color-oxblood)",
                }}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-14 pb-10 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        {[
          { label: "Shop", items: SHOP_LINKS },
          { label: "House", items: HOUSE_LINKS },
          { label: "Help", items: HELP_LINKS },
          { label: "Follow", items: SOCIAL },
        ].map((col) => (
          <div key={col.label}>
            <div
              className="mb-5 uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.22em",
                fontWeight: 500,
                color: "var(--color-bronze)",
              }}
            >
              {col.label}
            </div>
            <ul className="space-y-3">
              {col.items.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13px] transition-colors hover:underline"
                    style={{ color: "var(--color-ink-soft)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom utility */}
      <div style={{ borderTop: "1px solid var(--color-rule)" }}>
        <div
          className="max-w-[1280px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ color: "var(--color-ink-muted)" }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "13px",
              color: "var(--color-ink-soft)",
            }}
          >
            maison tanneurs · hand-stitched in marrakech
          </div>
          <div
            className="flex items-center gap-5 uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.18em",
            }}
          >
            <Link
              href="/legal/privacy"
              className="transition-colors hover:text-[color:var(--color-ink)]"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="transition-colors hover:text-[color:var(--color-ink)]"
            >
              Terms
            </Link>
            <span>© {new Date().getFullYear()} Maison Tanneurs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
