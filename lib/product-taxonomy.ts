import type { Product } from "@/lib/supabase/types";

export const PRODUCT_FILTERS = [
  "All",
  "Backpack",
  "Briefcase",
  "Crossbody",
  "Duffle",
  "Messenger",
  "Rolltop",
  "Saddlebag",
  "Satchel",
  "Tote",
  "Weekender",
] as const;

const FAMILY_BY_TOKEN: Array<[string, string]> = [
  ["briefcase", "Briefcase"],
  ["messenger", "Messenger"],
  ["crossbody", "Crossbody"],
  ["saddlebag", "Saddlebag"],
  ["saddle", "Saddlebag"],
  ["weekender", "Weekender"],
  ["duffle", "Duffle"],
  ["tote", "Tote"],
  ["satchel", "Satchel"],
  ["rolltop", "Rolltop"],
  ["rucksack", "Backpack"],
  ["backpack", "Backpack"],
];

export function productFamily(product: Pick<Product, "slug" | "title" | "category">): string {
  const haystack = `${product.slug} ${product.title}`.toLowerCase();
  const match = FAMILY_BY_TOKEN.find(([token]) => haystack.includes(token));
  return match?.[1] || product.category || "Leather Goods";
}

export function withProductFamily<T extends Product>(product: T): T {
  return { ...product, category: productFamily(product) };
}

export function normalizeProductFamilies<T extends Product>(products: T[]): T[] {
  return products.map(withProductFamily);
}
