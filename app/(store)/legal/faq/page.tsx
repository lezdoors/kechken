import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Kechken",
  description:
    "Common questions about ordering, shipping, sizing, and caring for Kechken apparel and accessories.",
};

const FAQ = [
  {
    q: "What is Kechken?",
    a: "Kechken is a modern Moroccan apparel label — streetwear, jewelry, and leather goods designed in-house and produced when you order. The visual register is rooted in the Maghreb (Atlas mountain silhouettes, zellige geometry, Berber typography) but the silhouettes are modern.",
  },
  {
    q: "How is each piece produced?",
    a: "We work with a vetted print-on-demand and fulfillment partner with warehouses in the US and EU. When you place an order, the piece is printed, cut, finished, and quality-checked by the warehouse closest to you — typically within 48 hours. We hold no advance inventory.",
  },
  {
    q: "How long does shipping take?",
    a: "Three to five business days from when you order, in most cases. Tracking is included on every order. International shipping is available; transit times vary by country (see Shipping).",
  },
  {
    q: "Do you offer free shipping?",
    a: "Standard shipping is included in the listed price for orders over $80 USD shipped within the US and EU. Smaller orders carry a flat shipping fee shown at checkout.",
  },
  {
    q: "What sizes do you carry?",
    a: "Tees and hoodies are cut oversized and run XS through 3XL. Jewelry is one-size with adjustable chain length. Leather bags are one-size; dimensions are listed on each product page.",
  },
  {
    q: "Can I return something that doesn't fit?",
    a: "Yes — within thirty days of delivery, unworn and unwashed, with original tags. Full policy on the Returns page.",
  },
  {
    q: "Where can I get help with my order?",
    a: "Email hello@kechken.com — we reply within one working day, usually faster.",
  },
];

export default function FaqPage() {
  return (
    <article>
      <span className="eyebrow">Help</span>
      <h1>Frequently asked.</h1>
      <p className="updated">Last updated · 19 May 2026</p>

      {FAQ.map((item, i) => (
        <div key={i}>
          <h2>{item.q}</h2>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Still have a question?</h2>
      <p>
        Write to{" "}
        <Link href="mailto:hello@kechken.com">hello@kechken.com</Link>. We
        reply within one working day.
      </p>
    </article>
  );
}
