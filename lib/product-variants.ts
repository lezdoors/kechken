// Product variant helpers — group SKUs by family_slug for PDP swatches and
// listing dedup. Currently scaffolded; storefront PDP + listing wiring is
// Phase 2, this file is the foundation.
//
// Family rules:
//   - family_slug null  → standalone product (no siblings). Treat as its own family.
//   - family_slug set   → groups with all other products that share the slug.
//   - variant_attribute names the axis (color/finish/size) + label.
//
// Primary-variant selection — when a listing renders one card per family,
// the "primary" is the variant with the lowest slug alphabetically among
// featured + available siblings. Stable, no DB column needed.

import type { Product, VariantAttribute } from "@/lib/supabase/types";

export type ProductFamily = {
  familySlug: string;
  primary: Product;
  variants: Product[];
};

// Group an array of products by family_slug. Standalone products (no family)
// each get their own group keyed by their own slug.
export function groupByFamily(products: Product[]): ProductFamily[] {
  const byFamily = new Map<string, Product[]>();

  for (const p of products) {
    const key = p.family_slug ?? p.slug;
    const list = byFamily.get(key) ?? [];
    list.push(p);
    byFamily.set(key, list);
  }

  return Array.from(byFamily.entries()).map(([familySlug, variants]) => ({
    familySlug,
    variants: sortVariants(variants),
    primary: pickPrimary(variants),
  }));
}

// Pick the canonical variant for a listing card. Prefers available+featured,
// then the lowest slug alphabetically for stability across renders.
export function pickPrimary(variants: Product[]): Product {
  const available = variants.filter(
    (v) => v.status === "available" && v.featured !== false,
  );
  const pool = available.length > 0 ? available : variants;
  return [...pool].sort((a, b) => a.slug.localeCompare(b.slug))[0];
}

// Sort variants for swatch rows — primary first, then alpha by attribute value.
function sortVariants(variants: Product[]): Product[] {
  const primary = pickPrimary(variants);
  const rest = variants.filter((v) => v.slug !== primary.slug);
  return [
    primary,
    ...rest.sort((a, b) => {
      const av = a.variant_attribute?.value ?? a.slug;
      const bv = b.variant_attribute?.value ?? b.slug;
      return av.localeCompare(bv);
    }),
  ];
}

// Resolve a product (by slug) to its sibling family + variant attribute.
// Returns null if the product isn't part of a multi-variant family.
export function getFamilyForSlug(
  slug: string,
  products: Product[],
): ProductFamily | null {
  const target = products.find((p) => p.slug === slug);
  if (!target || !target.family_slug) return null;
  const siblings = products.filter((p) => p.family_slug === target.family_slug);
  if (siblings.length <= 1) return null;
  return {
    familySlug: target.family_slug,
    variants: sortVariants(siblings),
    primary: pickPrimary(siblings),
  };
}

// Render-helper — short label for a variant chip.
// "Cognac" / "Tooled Walnut" / "Noir" — falls back to the slug suffix.
export function variantLabel(p: Product): string {
  const attr = p.variant_attribute;
  if (attr?.value) return attr.value;
  const parts = p.slug.split("-");
  return parts[parts.length - 1].replace(/\b\w/g, (c) => c.toUpperCase());
}

export type { VariantAttribute };
