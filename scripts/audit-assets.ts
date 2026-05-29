import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { access, readdir } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import type { Dirent } from "node:fs";
import { join } from "node:path";
import { STATIC_PRODUCTS } from "../lib/products";
import { HIDDEN_SKUS } from "../lib/hidden-skus";

dotenv.config({ path: ".env.local" });

type ProductRow = {
  slug: string;
  title: string;
  category?: string | null;
  description?: string | null;
  images: string[];
  featured?: boolean | null;
  status?: string | null;
};

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://xbtabpurfavngwmwtawc.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";
const SITE_URL = process.env.SITE_URL || "https://maisontanneurs.com";
const SUPABASE_HOST = "xbtabpurfavngwmwtawc.supabase.co";
const VISUAL_MISMATCH_EVIDENCE = new Set<string>();
const PARTIAL_LOCAL_EVIDENCE = new Set<string>();

const LOCAL_EVIDENCE_ROOTS = [
  "/Users/ryanz/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics",
  "/Users/ryanz/brand-assets/maison-tanneurs/_hf-archive/sku",
  "/Users/ryanz/brand-assets/maison-tanneurs",
  "/Users/ryanz/Downloads/Maison Tanneurs",
  "/Users/ryanz/Downloads/Maison Tanneurs 2",
  join(process.cwd(), "public"),
];

function cleanShot(images: string[]): boolean {
  return (
    images.some((src) => /(?:\/|-)pdp-white(?:\/|\.)/.test(src)) ||
    images.filter((src) => /-pdp-\d+\.webp(?:$|\?)/.test(src)).length >= 5
  );
}

function riskyHero(images: string[]): boolean {
  const hero = images[0] || "";
  return /-supplier-|-dealer-|-macro-|-raw-|Untitled|GPT-|hf_/i.test(hero);
}

function rawSourceImage(url: string): boolean {
  const file = (url.split("/").pop() || "").replace(/\?.*$/, "");
  return /(?:^|[-_.\s])(supplier|dealer|raw|screenshot|screen-shot|ouss?am)(?:[-_.\s]|$)/i.test(file);
}

function apparelScopeLeak(product: ProductRow): string[] {
  const fields = [
    ["title", product.title],
    ["category", product.category || ""],
    ["description", product.description || ""],
  ] as const;
  const leaks: string[] = [];
  for (const [field, value] of fields) {
    if (/\b(jacket|jackets|outerwear|clothes|clothing|wearables|apparel)\b/i.test(value)) {
      leaks.push(field);
    }
  }
  return leaks;
}

function belongsToSlug(url: string, slug: string): boolean {
  if (!url.includes(SUPABASE_HOST) && !url.startsWith("/products/")) return true;
  return slugFromFile(url) === slug;
}

function slugFromFile(url: string): string {
  const file = url.split("/").pop() || "";
  return file
    .replace(/\?.*$/, "")
    .replace(/\.(webp|png|jpe?g|avif)$/i, "")
    .replace(
      /-(pdp-white|scale|archive-\d+|pdp-\d+|scale-\d+|macro-\d+|pdp-alt-\d+).*$/i,
      "",
    );
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function productLdImages(html: string, slug: string): string[] {
  const scriptPattern = new RegExp(
    `<script[^>]+id=["']product-ld-${slug}["'][^>]*>([\\s\\S]*?)<\\/script>`,
    "i",
  );
  const match = html.match(scriptPattern);
  const nextScriptPattern = new RegExp(
    `"children":"((?:\\\\.|[^"\\\\])*)"\\s*,\\s*"id":"product-ld-${slug}"`,
    "i",
  );
  const nextMatch = html.match(nextScriptPattern);
  if (!match && !nextMatch) return [];

  try {
    const rawJson = match
      ? decodeHtmlEntities(match[1].trim())
      : JSON.parse(`"${nextMatch![1]}"`);
    const data = JSON.parse(rawJson) as { image?: string | string[] };
    if (Array.isArray(data.image)) return data.image;
    if (typeof data.image === "string") return [data.image];
  } catch {
    return [];
  }

  return [];
}

function productGalleryImages(html: string, slug: string): string[] {
  const productArea = html.split('aria-label="You May Also Like"')[0] || html;
  const urls = [...productArea.matchAll(/[?&]url=([^&"']+)/g)]
    .map((match) => {
      try {
        return decodeURIComponent(match[1]).replace(/\?.*$/, "");
      } catch {
        return "";
      }
    })
    .filter((url) => url.includes(SUPABASE_HOST) && slugFromFile(url) === slug);

  return Array.from(new Set(urls));
}

async function uniqueProductUrls(pathname: string, slug?: string): Promise<string[]> {
  const response = await fetch(`${SITE_URL}${pathname}`);
  if (!response.ok) throw new Error(`${SITE_URL}${pathname} returned ${response.status}`);
  const html = await response.text();

  if (slug) {
    const galleryImages = productGalleryImages(html, slug);
    const ldImages = productLdImages(html, slug);
    if (galleryImages.length > ldImages.length) return galleryImages;
    if (ldImages.length > 0) return Array.from(new Set(ldImages));
  }

  const supabaseUrls = [
    ...html.matchAll(
      new RegExp(
        `https://${SUPABASE_HOST.replace(".", "\\.")}/storage/v1/object/public/products/[^"'\\\\) ]+`,
        "g",
      ),
    ),
  ].map((match) => match[0].replace(/\\$/, "").replace(/&amp;/g, "&"));
  const localUrls = slug
    ? [
        ...html.matchAll(
          new RegExp(`/products/${slug}/[^"'\\\\) ]+\\.(?:webp|png|jpe?g|avif)`, "gi"),
        ),
      ].map((match) => match[0].replace(/\\$/, ""))
    : [];

  return Array.from(new Set([...supabaseUrls, ...localUrls]));
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function findSlugEvidence(root: string, slug: string): Promise<boolean> {
  if (!(await exists(root))) return false;
  const stack = [root];
  let scanned = 0;
  while (stack.length && scanned < 3500) {
    const current = stack.pop()!;
    scanned++;
    let entries: Dirent[];
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const name = entry.name.toLowerCase();
      const full = join(current, entry.name);
      if (name.includes(slug.toLowerCase())) return true;
      if (entry.isDirectory() && !["node_modules", ".next", ".git"].includes(name)) {
        stack.push(full);
      }
    }
  }
  return false;
}

async function loadProducts(): Promise<{ source: string; products: ProductRow[] }> {
  if (SUPABASE_KEY) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data, error } = await supabase
      .from("products")
      .select("slug,title,category,description,images,featured,status")
      .order("slug", { ascending: true });
    if (error) throw new Error(`Supabase products query failed: ${error.message}`);
    return { source: `Supabase products (${SUPABASE_URL})`, products: (data || []) as ProductRow[] };
  }

  try {
    const collectionUrls = await uniqueProductUrls("/products");
    const slugs = Array.from(new Set(collectionUrls.map(slugFromFile))).sort();
    const products: ProductRow[] = [];
    for (const slug of slugs) {
      const images = await uniqueProductUrls(`/products/${slug}`, slug);
      products.push({
        slug,
        title: slug
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
        images,
        featured: true,
        status: "available",
      });
    }

    return {
      source: `LIVE storefront scrape (${SITE_URL})`,
      products,
    };
  } catch (error) {
    console.warn(
      `Live storefront scrape failed; using STATIC_PRODUCTS fallback: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  return {
    source: "STATIC_PRODUCTS fallback (no Supabase key in env)",
    products: STATIC_PRODUCTS.map((p) => ({
      slug: p.slug,
        title: p.title,
        category: p.category,
        description: p.description,
        images: p.images,
        featured: p.featured,
        status: p.status,
    })),
  };
}

function printList(title: string, rows: string[]) {
  console.log(`\n${title}: ${rows.length}`);
  for (const row of rows) console.log(`  - ${row}`);
}

async function main() {
  const { source, products } = await loadProducts();
  const visible = products.filter(
    (p) => p.status === "available" && p.featured && !HIDDEN_SKUS.has(p.slug),
  );

  const zeroImage = visible.filter(
    (p) => (p.images || []).filter((url) => belongsToSlug(url, p.slug)).length === 0,
  );
  const lowGallery = visible.filter((p) => {
    const ownedImageCount = (p.images || []).filter((url) => belongsToSlug(url, p.slug)).length;
    return ownedImageCount > 0 && ownedImageCount < 5;
  });
  const missingPdpWhite = visible.filter((p) => !cleanShot(p.images || []));
  const riskyHeroes = visible.filter((p) => riskyHero(p.images || []));
  const rawGalleryImages = visible
    .map((p) => ({
      product: p,
      raw: (p.images || []).filter(rawSourceImage),
    }))
    .filter((row) => row.raw.length > 0);
  const scopeLeaks = visible
    .map((p) => ({ product: p, fields: apparelScopeLeak(p) }))
    .filter((row) => row.fields.length > 0);
  const mixedGallery = visible
    .map((p) => ({
      product: p,
      foreign: (p.images || []).filter((url) => {
        if (!url.includes(SUPABASE_HOST) && !url.startsWith("/products/")) return false;
        const imageSlug = slugFromFile(url);
        return imageSlug && imageSlug !== p.slug;
      }),
    }))
    .filter((row) => row.foreign.length > 0);

  const noEvidence: ProductRow[] = [];
  for (const product of visible) {
    let found = false;
    for (const root of LOCAL_EVIDENCE_ROOTS) {
      if (await findSlugEvidence(root, product.slug)) {
        found = true;
        break;
      }
    }
    if (!found) noEvidence.push(product);
  }

  const noEvidenceSlugs = new Set(noEvidence.map((p) => p.slug));
  const visualMismatch = visible.filter((p) => VISUAL_MISMATCH_EVIDENCE.has(p.slug));
  const partialEvidence = visible.filter((p) => PARTIAL_LOCAL_EVIDENCE.has(p.slug));
  const selectionPriority = lowGallery
    .filter(
      (p) =>
        !noEvidenceSlugs.has(p.slug) &&
        !VISUAL_MISMATCH_EVIDENCE.has(p.slug) &&
        !PARTIAL_LOCAL_EVIDENCE.has(p.slug),
    )
    .map(
      (p) =>
        `${p.slug} — find/wire finished HF-improved or Drive multishot evidence before generation; raw/supplier screenshots are reference-only (${
          (p.images || []).filter((url) => belongsToSlug(url, p.slug)).length
        } same-SKU live images)`,
    );
  const hardMediaPriorities = [
    ...zeroImage.map((p) => `${p.slug} — no storefront image`),
    ...riskyHeroes.map((p) => `${p.slug} — risky hero: ${p.images?.[0] || "none"}`),
    ...missingPdpWhite
      .filter((p) => !zeroImage.includes(p) && !riskyHeroes.includes(p))
      .map((p) => `${p.slug} — missing clean PDP-white shot`),
  ];
  const unsyncedThinGallery = lowGallery
    .filter(
      (p) =>
        !zeroImage.includes(p) &&
        !missingPdpWhite.includes(p) &&
        (noEvidenceSlugs.has(p.slug) ||
          VISUAL_MISMATCH_EVIDENCE.has(p.slug) ||
          PARTIAL_LOCAL_EVIDENCE.has(p.slug)) &&
        (p.images || []).filter((url) => belongsToSlug(url, p.slug)).length < 4,
    )
    .map(
      (p) => {
        const count = (p.images || []).filter((url) => belongsToSlug(url, p.slug)).length;
        if (VISUAL_MISMATCH_EVIDENCE.has(p.slug)) {
          return `${p.slug} — only ${count} same-SKU live image(s); slug-named Drive candidate is a different zip backpack, find correct slim rectangular brogue-backpack 9-shot set before generating`;
        }
        if (PARTIAL_LOCAL_EVIDENCE.has(p.slug)) {
          return `${p.slug} — only ${count} same-SKU live image(s); local evidence is only the current front/back supplier source, find the 9-shot set in HF/Drive before generating`;
        }
        return `${p.slug} — only ${count} same-SKU live image(s); visually check HF/Drive web before generating`;
      },
    );

  console.log("=== Maison Tanneurs asset audit ===");
  console.log(`Source: ${source}`);
  console.log(`Visible product count: ${visible.length}`);
  console.log(`Hidden launch-suppressed products: ${HIDDEN_SKUS.size}`);

  printList("Zero-image visible products", zeroImage.map((p) => p.slug));
  printList(
    "Low-gallery visible products (<5 same-SKU images)",
    lowGallery.map(
      (p) => `${p.slug} (${(p.images || []).filter((url) => belongsToSlug(url, p.slug)).length})`,
    ),
  );
  printList("Missing PDP-white / clean product shots", missingPdpWhite.map((p) => p.slug));
  printList("Risky visible hero images", riskyHeroes.map((p) => `${p.slug} -> ${p.images?.[0] || "none"}`));
  printList(
    "Raw/source gallery images",
    rawGalleryImages.map(
      ({ product, raw }) =>
        `${product.slug} -> ${raw.map((url) => url.split("/").pop()?.replace(/\?.*$/, "") || url).join(", ")}`,
    ),
  );
  printList(
    "Apparel scope leaks in product catalogue",
    scopeLeaks.map(({ product, fields }) => `${product.slug} -> ${fields.join(", ")}`),
  );
  printList(
    "Mixed-product gallery images",
    mixedGallery.map(
      ({ product, foreign }) =>
        `${product.slug} -> ${foreign.map((url) => url.split("/").pop()).join(", ")}`,
    ),
  );
  printList("Products with no slug-named local evidence found", noEvidence.map((p) => p.slug));
  printList(
    "Products with visually mismatched local evidence",
    visualMismatch.map((p) => p.slug),
  );
  printList(
    "Products with partial local evidence only",
    partialEvidence.map((p) => p.slug),
  );
  printList("Select/wire existing before generating", Array.from(new Set(selectionPriority)));
  printList("Hard media priorities", Array.from(new Set(hardMediaPriorities)));
  printList("Unsynced thin galleries to verify in HF/Drive", Array.from(new Set(unsyncedThinGallery)));

  const hardFailures = zeroImage.length + riskyHeroes.length + rawGalleryImages.length + scopeLeaks.length;
  process.exit(hardFailures > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(2);
});
