"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0 },
};

export default function BatchGuarantee() {
  return (
    <section
      aria-label="The batch and the guarantee"
      className="w-full bg-[var(--color-paper)] text-[var(--color-ink)] border-y border-[var(--color-rule)] py-[clamp(64px,10vw,140px)]"
    >
      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        variants={fadeUp}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        {/* THE BATCH */}
        <article className="md:border-r border-[color:var(--color-rule)] border-b md:border-b-0 px-6 py-14 md:py-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="tech-label opacity-50">07A</span>
            <span className="h-px w-10 bg-[color:var(--color-rule-strong)]" />
            <span className="tech-label">The Batch</span>
          </div>
          <h3
            className="display-xxl"
            style={{ fontSize: "clamp(36px, 4.4vw, 72px)" }}
          >
            Seven hands.
            <br />
            One table.
            <br />
            <span className="opacity-50">Small by design.</span>
          </h3>
          <p
            className="mt-8 leading-relaxed text-[color:rgba(44,42,40,0.75)]"
            style={{ fontSize: "14px", letterSpacing: "-0.01em", maxWidth: "52ch" }}
          >
            Each Maison Tanneurs object passes through a fixed circle of seven
            artisans in the Marrakech medina. Cutting, stitching, burnishing and
            final inspection stay close to the same bench, so the edition remains
            limited by hand time rather than inventory targets.
          </p>
          <ul className="mt-10 divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
            <Row k="Edition" v="Small Runs" />
            <Row k="Atelier" v="Marrakech Medina" />
            <Row k="Finish" v="By Hand" />
          </ul>
        </article>

        {/* THE GUARANTEE */}
        <article className="bg-[color:var(--color-warm-black)] text-[color:var(--color-ivory)] px-6 py-14 md:py-24">
          <div className="flex items-center gap-4 mb-8 text-[color:rgba(244,240,232,0.7)]">
            <span className="tech-label opacity-60">07B</span>
            <span className="h-px w-10 bg-[color:rgba(244,240,232,0.3)]" />
            <span className="tech-label">The Guarantee</span>
          </div>
          <h3
            className="display-xxl text-[color:var(--color-ivory)]"
            style={{ fontSize: "clamp(36px, 4.4vw, 72px)" }}
          >
            Lifetime
            <br />
            Repair<span className="opacity-50">.</span>
          </h3>
          <p
            className="mt-8 leading-relaxed text-[color:rgba(244,240,232,0.75)]"
            style={{ fontSize: "14px", letterSpacing: "-0.01em", maxWidth: "52ch" }}
          >
            Full-grain Moroccan leather is chosen for the way it records a life.
            Edges darken, surfaces soften and the grain develops a patina that
            belongs only to its carrier. If a strap, stitch or lining needs care,
            the object can return to the atelier for repair.
          </p>
          <ul className="mt-10 divide-y divide-[rgba(244,240,232,0.15)] border-y border-[color:rgba(244,240,232,0.15)]">
            <Row k="Patina" v="Expected" dark />
            <Row k="Repair" v="Lifetime" dark />
            <Row k="Care" v="Atelier Led" dark />
          </ul>
          <a
            href="mailto:repair@maisontanneurs.com?subject=Repair%20Request"
            className="mt-10 inline-flex h-12 items-center border border-[color:rgba(244,240,232,0.4)] px-7 text-[color:var(--color-ivory)] hover:opacity-70 transition-opacity"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Request Care
          </a>
        </article>
      </motion.div>
    </section>
  );
}

function Row({ k, v, dark = false }: { k: string; v: string; dark?: boolean }) {
  return (
    <li className="flex items-baseline justify-between py-3.5">
      <span
        className={`tech-label ${dark ? "text-[color:rgba(244,240,232,0.55)]" : "opacity-60"}`}
      >
        {k}
      </span>
      <span className={`tech-meta ${dark ? "text-[color:rgba(244,240,232,0.9)]" : ""}`}>{v}</span>
    </li>
  );
}
