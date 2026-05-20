import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Care — Kechken",
  description:
    "How to care for Kechken apparel, jewelry, and leather goods so they last.",
};

export default function CarePage() {
  return (
    <article>
      <span className="eyebrow">Care</span>
      <h1>How to keep it.</h1>
      <p className="updated">Last updated · 19 May 2026</p>

      <p>
        Every Kechken piece is built to age well. Following the right care
        ritual makes the difference between a wardrobe staple that lasts a
        decade and one that fades after a season.
      </p>

      <h2>Heavyweight cotton (tees, hoodies)</h2>
      <ul>
        <li>Wash cold (30°C / 86°F max), inside out, with similar colours.</li>
        <li>Use a gentle detergent. Avoid bleach and fabric softener — both break down the print.</li>
        <li>Tumble dry low or hang to dry. Avoid direct sunlight when drying to preserve the colour.</li>
        <li>Iron inside out, low heat. Never iron directly on a print.</li>
        <li>Do not dry clean.</li>
      </ul>

      <h2>Full-grain leather (rucksacks, daypacks)</h2>
      <ul>
        <li>Wipe with a dry soft cloth after use. Leather develops its character through wear — small marks are part of the patina.</li>
        <li>Apply a neutral leather conditioner every 3–6 months, working with the grain.</li>
        <li>Store in the included dust bag, away from direct sunlight and heat sources.</li>
        <li>If the leather gets wet, blot dry with a soft towel and let it air dry at room temperature. Do not use a hairdryer.</li>
        <li>Avoid contact with oils, alcohol-based products, and dark denim (which can transfer dye onto lighter leather).</li>
      </ul>

      <h2>Sterling silver jewelry</h2>
      <ul>
        <li>Put jewelry on last (after perfume, lotion, and hairspray) and take it off first.</li>
        <li>Polish with a soft silver-cleaning cloth when it starts to tarnish — sterling silver naturally oxidises over time.</li>
        <li>Store in the included pouch, ideally inside a sealed bag with an anti-tarnish strip.</li>
        <li>Remove before swimming, showering, or going to the gym — chlorine, sweat, and saltwater accelerate tarnishing.</li>
      </ul>

      <h2>Repairs</h2>
      <p>
        If a piece gets damaged through normal wear, write to{" "}
        <Link href="mailto:hello@kechken.com">hello@kechken.com</Link> with
        a photo. Minor repairs (loose stitching, broken chain) are usually
        free of charge in the first year. Beyond that, we will quote at
        cost.
      </p>

      <h2>End of life</h2>
      <p>
        When a piece is truly done, please don&apos;t throw it away. Cotton
        can be recycled at most clothing collection points. Leather can be
        composted (with the metal hardware removed). Sterling silver can be
        melted and reused indefinitely — bring it to any jeweler or send it
        back to us and we will pass it to our partner&apos;s recycling stream.
      </p>

      <h2>Questions</h2>
      <p>
        Write to <Link href="mailto:hello@kechken.com">hello@kechken.com</Link>.
        We answer within one working day.
      </p>
    </article>
  );
}
