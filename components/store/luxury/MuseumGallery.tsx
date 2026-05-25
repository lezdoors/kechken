import Image from "next/image";
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { STATIC_PRODUCTS, mergeWithStatic } from "@/lib/products";
import { HIDDEN_SKUS, HIDDEN_SKUS_ARRAY } from "@/lib/hidden-skus";
import type { Product } from "@/lib/supabase/types";

const GALLERY_LIMIT = 6;

async function loadGallery(): Promise<Product[]> {
  try {
    const supabase = await createServerSupabase();
    if (!supabase) {
      return (STATIC_PRODUCTS as Product[])
        .filter((p) => !HIDDEN_SKUS.has(p.slug) && p.status === "available")
        .slice(0, GALLERY_LIMIT);
    }
    const hiddenList = `(${HIDDEN_SKUS_ARRAY.join(",")})`;
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("status", "available")
      .eq("featured", true)
      .not("slug", "in", hiddenList)
      .order("created_at", { ascending: false });
    const merged = mergeWithStatic((data ?? []) as Product[]).filter(
      (p) => !HIDDEN_SKUS.has(p.slug),
    );
    return merged.slice(0, GALLERY_LIMIT);
  } catch {
    return (STATIC_PRODUCTS as Product[])
      .filter((p) => !HIDDEN_SKUS.has(p.slug) && p.status === "available")
      .slice(0, GALLERY_LIMIT);
  }
}

export default async function MuseumGallery() {
  const products = await loadGallery();
  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white py-[clamp(80px,12vw,180px)] px-[clamp(24px,6vw,96px)]">
      <div className="mx-auto max-w-[1400px]">
        {/* Section eyebrow */}
        <div className="mb-[clamp(48px,6vw,96px)] flex items-end justify-between border-b border-black/10 pb-8">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(36px, 4vw, 64px)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              margin: 0,
              color: "#000000",
            }}
          >
            The Collection
          </h2>
          <Link
            href="/products"
            className="hover:opacity-60 transition-opacity"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#000000",
            }}
          >
            View All →
          </Link>
        </div>

        {/* Asymmetrical 2-col grid with generous gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(24px,4vw,80px)] gap-y-[clamp(64px,8vw,140px)]">
          {products.map((p, idx) => {
            // Stagger every other product into a taller frame for asymmetry.
            const portrait = idx % 3 === 1;
            return <ProductCell key={p.slug} product={p} portrait={portrait} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ProductCell({
  product,
  portrait,
}: {
  product: Product;
  portrait: boolean;
}) {
  const hero = product.images?.[0];
  const color = (product.materials ?? [])[0]?.split(/[·,]/)[0]?.trim() ?? "Cognac";
  const skuTag = product.slug.toUpperCase().replace(/-/g, " · ");

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className="relative w-full overflow-hidden"
        style={{
          background: "#F5F5F5",
          aspectRatio: portrait ? "4 / 5" : "1 / 1",
        }}
      >
        {hero ? (
          <Image
            src={hero}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.02]"
            style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
          />
        ) : null}
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-6">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(22px, 2vw, 30px)",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            margin: 0,
            color: "#000000",
          }}
        >
          {product.title}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#000000",
            opacity: 0.55,
            whiteSpace: "nowrap",
          }}
        >
          {skuTag} / {color}
        </span>
      </div>
    </Link>
  );
}
