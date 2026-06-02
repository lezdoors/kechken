import Image from "next/image";
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { STATIC_PRODUCTS, mergeWithStatic } from "@/lib/products";
import { HIDDEN_SKUS, HIDDEN_SKUS_ARRAY } from "@/lib/hidden-skus";
import { bust } from "@/lib/image-url";
import { productImageClass } from "@/lib/product-image-presentation";
import { curateLandingProducts, productListImage } from "@/lib/landing-product-curation";
import type { Product } from "@/lib/supabase/types";

// Editorial product register: gallery spacing, warm tactile product plates,
// restrained sans metadata, and enough asymmetry to avoid catalogue sameness.

const GRID_LIMIT = 6;
const FETCH_LIMIT = 24;

async function loadCurrentEdition(): Promise<Product[]> {
  try {
    const supabase = await createServerSupabase();
    if (!supabase) {
      return curateLandingProducts(
        (STATIC_PRODUCTS as Product[]).filter(
          (p) => !HIDDEN_SKUS.has(p.slug) && p.status === "available",
        ),
        GRID_LIMIT,
      );
    }
    const hiddenList = `(${HIDDEN_SKUS_ARRAY.join(",")})`;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "available")
      .eq("featured", true)
      .not("slug", "in", hiddenList)
      .order("created_at", { ascending: false })
      .limit(FETCH_LIMIT);
    if (error || !data || data.length === 0) {
      return curateLandingProducts(
        (STATIC_PRODUCTS as Product[]).filter(
          (p) => !HIDDEN_SKUS.has(p.slug) && p.status === "available",
        ),
        GRID_LIMIT,
      );
    }
    const merged = mergeWithStatic(data as Product[]).filter(
      (p) => !HIDDEN_SKUS.has(p.slug) && p.status === "available",
    );
    return curateLandingProducts(merged, GRID_LIMIT);
  } catch {
    return curateLandingProducts(
      (STATIC_PRODUCTS as Product[]).filter(
        (p) => !HIDDEN_SKUS.has(p.slug) && p.status === "available",
      ),
      GRID_LIMIT,
    );
  }
}

function colorFor(p: Product): string {
  // Best-effort: pull a color name out of the title (e.g. "Medina Duffle · Cognac")
  // or the first material. Fallback to "Cognac".
  const fromTitle = p.title.split(/[·\-]/)[1]?.trim();
  if (fromTitle && fromTitle.length < 24) return fromTitle;
  const fromMaterial = (p.materials ?? [])[0]?.split(/[·,]/)[0]?.trim();
  return fromMaterial ?? "Cognac";
}

export default async function ArchitecturalGrid() {
  const products = await loadCurrentEdition();
  const total = products.length;

  return (
    <section
      id="collection"
      className="w-full bg-[var(--color-paper)] text-[var(--color-ink)]"
      aria-label="Current edition"
    >
      {/* LT2 .section-head — quiet eyebrow, large serif title, italic subhead */}
      <div className="mx-auto max-w-[1400px] text-center pt-[clamp(64px,9vw,112px)] pb-[clamp(32px,5vw,64px)] px-[clamp(24px,6vw,80px)]">
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10.5px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-ink-soft)",
            marginBottom: "28px",
          }}
        >
          Volume I — The Current Edition
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(56px, 8.2vw, 132px)",
            lineHeight: 0.9,
            letterSpacing: "-0.035em",
            margin: "0 auto",
            maxWidth: "12ch",
            color: "var(--color-ink)",
          }}
        >
          A collection of <span style={{ fontStyle: "italic" }}>{numberWord(total)}.</span>
        </h2>
        <p
          style={{
            margin: "28px auto 0",
            maxWidth: "44ch",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(13px, 1.1vw, 15px)",
            lineHeight: 1.75,
            color: "var(--color-ink-soft)",
          }}
        >
          Hand-cut and saddle-stitched in a small Marrakech atelier. Numbered, never restocked.
        </p>
      </div>

      {/* LT2 .gallery — generous gaps, no cell borders */}
      <div
        className="mx-auto max-w-[1500px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{
          padding: "clamp(20px,3vw,44px) clamp(24px,8vw,104px) clamp(110px,13vw,200px)",
          columnGap: "clamp(48px, 7vw, 118px)",
          rowGap: "clamp(72px, 10vw, 138px)",
        }}
      >
        {products.map((p, i) => (
          <ProductCell key={p.slug} product={p} index={i + 1} />
        ))}
      </div>

      {/* Trailing CTA — quiet bottom rule + view-all link */}
      <div className="mx-auto max-w-[1400px] px-[clamp(24px,6vw,80px)] text-center pb-[clamp(56px,7vw,96px)]">
        <Link
          href="/products"
          className="inline-flex items-center gap-3 hover:opacity-60 transition-opacity"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10.5px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-ink)",
            borderBottom: "1px solid var(--color-ink)",
            paddingBottom: "6px",
          }}
        >
          View the Full Catalogue
        </Link>
      </div>
    </section>
  );
}

function ProductCell({ product, index }: { product: Product; index: number }) {
  const hero = productListImage(product);
  const color = colorFor(product);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="mt-editorial-cell group block cursor-pointer"
    >
      {/* Frame — consistent tactile plate, 4:5 portrait, sharp corners. */}
      <div
        className="mt-product-frame relative"
        style={{
          aspectRatio: "4 / 5",
        }}
      >
        {hero ? (
          <Image
            src={bust(hero)}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={productImageClass(hero)}
            style={{
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              color: "var(--color-ink-soft)",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.18em",
            }}
          >
            IMAGE PENDING
          </div>
        )}

        {/* Italic edition number — top-left, very subtle */}
        <span
          className="absolute"
          style={{
            top: "20px",
            left: "22px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "12px",
            color: "var(--color-ink-muted)",
          }}
        >
          N° {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Meta — no border, generous gap, product-first sans details. */}
      <div className="mt-6 text-left">
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(14px, 1.05vw, 17px)",
            letterSpacing: "0.005em",
            lineHeight: 1.3,
            color: "var(--color-ink)",
            margin: 0,
          }}
        >
          {product.title}
        </h3>
        <p
          style={{
            marginTop: "8px",
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            color: "var(--color-ink-muted)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {color}
        </p>
      </div>
    </Link>
  );
}

function numberWord(n: number): string {
  const words: Record<number, string> = {
    1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
    6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
    11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen",
    15: "fifteen", 16: "sixteen", 18: "eighteen", 20: "twenty",
  };
  return words[n] ?? String(n);
}
