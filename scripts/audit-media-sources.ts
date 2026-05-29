import { readdir, stat } from "node:fs/promises";
import { join, basename } from "node:path";

const SITE_URL = process.env.SITE_URL || "https://maisontanneurs.com";
const SUPABASE_HOST = "xbtabpurfavngwmwtawc.supabase.co";

const SOURCE_ROOTS = {
  drive:
    "/Users/ryanz/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics",
  hf: "/Users/ryanz/brand-assets/maison-tanneurs/_hf-archive/sku",
  supplier: "/Users/ryanz/brand-assets/maison-tanneurs/_supplier-pool",
  public: join(process.cwd(), "public/products"),
};

const IMAGE_EXT = /\.(webp|png|jpe?g|avif)$/i;

const FOLDER_ALIASES: Record<string, string[]> = {
  "atlas-kilim-duffle": ["kilim-duffle-alt", "kilim-leather-duffle-bag"],
  "medina-duffle": ["classic-leather-duffle-bag-handcrafted-weekend-travel-essential"],
  "oasis-weekender-oxblood": ["brown-leather-travel-bag-for-men-handcrafted-weekender-duffel"],
  "atlas-weekender-cognac": [
    "cognac-leather-weekend-bag-handcrafted-travel-duffle-for-getaways",
    "cognac-leather-travel-bag-50cm-handcrafted-weekend-duffle",
  ],
  "atlas-messenger-laptop": ["atlas-leather-messenger-bag-handcrafted-moroccan-briefcase"],
  "medina-crossbody-cognac": ["cognac-leather-crossbody-purse-handcrafted-everyday-bag"],
  "medina-crossbody-tooled-walnut": [
    "brown-leather-shoulder-bag-with-embossed-cutwork-design",
  ],
  "medina-saddlebag-tooled-cognac": [
    "embossed-leather-shoulder-bag-handcrafted-brown-saddle-bag-with-floral-tooling",
  ],
  "marrakech-tote-cognac": [
    "cognac-leather-tote-bag-handcrafted-designer-satchel-with-lock-closure",
  ],
  "marrakech-tote-bordeaux": [
    "burgundy-brown-leather-tote-bag-handcrafted-work-travel-carryall",
  ],
  "expedition-rolltop-noir": ["urban-black-leather-backpack-handcrafted-rolltop-design"],
};

const VISUAL_MISMATCH_EVIDENCE = new Set<string>();

const PARTIAL_ONLY_EVIDENCE = new Set<string>();

function isReferenceOnlyFolder(source: string, folder: string): boolean {
  const normalized = `${source} ${folder}`.toLowerCase();
  if (source === "supplier") return true;
  return (
    normalized.includes("screen shot") ||
    normalized.includes("screenshot") ||
    normalized.includes("oussam") ||
    normalized.includes("supplier") ||
    /(?:^|[\/\s._-])raw(?:$|[\/\s._-])/.test(normalized)
  );
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function slugFromFile(url: string): string {
  return basename(url)
    .replace(/\.webp.*$/i, "")
    .replace(
      /-(pdp-white|scale|archive-\d+|pdp-\d+|scale-\d+|macro-\d+|pdp-alt-\d+).*$/i,
      "",
    );
}

function belongsToSlug(url: string, slug: string): boolean {
  if (!url.includes(SUPABASE_HOST) && !url.startsWith("/products/")) return true;
  return slugFromFile(url) === slug;
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

async function countImages(path: string): Promise<number> {
  try {
    const info = await stat(path);
    if (info.isFile()) return IMAGE_EXT.test(path) ? 1 : 0;
    const entries = await readdir(path, { withFileTypes: true });
    let total = 0;
    for (const entry of entries) total += await countImages(join(path, entry.name));
    return total;
  } catch {
    return 0;
  }
}

async function matchingFolders(root: string, slug: string, maxDepth = 4) {
  const matches: { folder: string; count: number }[] = [];
  const aliases = new Set([slug, ...(FOLDER_ALIASES[slug] || [])]);

  async function walk(current: string, depth: number) {
    if (depth > maxDepth) return;
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const full = join(current, entry.name);
      const folderSlug = normalize(entry.name);
      const isMatch = Array.from(aliases).some(
        (alias) => folderSlug.includes(alias) || alias.includes(folderSlug),
      );
      if (isMatch) {
        matches.push({
          folder: full.replace(`${root}/`, ""),
          count: await countImages(full),
        });
      }
      await walk(full, depth + 1);
    }
  }

  await walk(root, 1);
  return matches;
}

function recommendation(input: {
  slug: string;
  livePdpCount: number;
  finishedDriveImages: number;
  referenceDriveImages: number;
  hfImages: number;
  supplierImages: number;
}) {
  if (input.livePdpCount >= 5) return "do-not-generate";
  if (VISUAL_MISMATCH_EVIDENCE.has(input.slug)) {
    return "verify-hf-drive-web-before-generation";
  }
  if (PARTIAL_ONLY_EVIDENCE.has(input.slug)) {
    return "verify-hf-drive-web-before-generation";
  }
  if (input.finishedDriveImages + input.hfImages >= 5) {
    return "select-wire-finished-hf-drive";
  }
  if (input.finishedDriveImages + input.hfImages > 0) {
    return "partial-finished-evidence-find-9shot";
  }
  if (input.referenceDriveImages + input.supplierImages > 0) {
    return "reference-only-find-hf-improved";
  }
  return "verify-hf-drive-web-before-generation";
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
  ].map((match) => match[0].replace(/\\$/, ""));
  const localUrls = slug
    ? [
        ...html.matchAll(
          new RegExp(`/products/${slug}/[^"'\\\\) ]+\\.(?:webp|png|jpe?g|avif)`, "gi"),
        ),
      ].map((match) => match[0].replace(/\\$/, ""))
    : [];

  return Array.from(new Set([...supabaseUrls, ...localUrls]));
}

async function main() {
  const productUrls = await uniqueProductUrls("/products");
  const slugs = Array.from(new Set(productUrls.map(slugFromFile))).sort();

  console.log("=== Maison Tanneurs media source audit ===");
  console.log(`Site: ${SITE_URL}`);
  console.log(`Live product hero slug count: ${slugs.length}`);
  console.log("");
  console.log(
    [
      "slug",
      "live_product_images",
      "live_same_sku_images",
      "drive_finished_images",
      "drive_reference_images",
      "hf_images",
      "supplier_reference_images",
      "public_images",
      "recommendation",
      "drive_finished_folders",
      "drive_reference_folders",
      "hf_folders",
      "supplier_reference_folders",
    ].join("\t"),
  );

  for (const slug of slugs) {
    const pdpUrls = await uniqueProductUrls(`/products/${slug}`, slug);
    const drive = await matchingFolders(SOURCE_ROOTS.drive, slug);
    const hf = await matchingFolders(SOURCE_ROOTS.hf, slug);
    const supplier = await matchingFolders(SOURCE_ROOTS.supplier, slug);
    const localPublic = await matchingFolders(SOURCE_ROOTS.public, slug);
    const livePdpCount = pdpUrls.filter((url) => belongsToSlug(url, slug)).length;
    const driveFinished = drive.filter((row) => !isReferenceOnlyFolder("drive", row.folder));
    const driveReference = drive.filter((row) => isReferenceOnlyFolder("drive", row.folder));
    const supplierReference = supplier.filter((row) =>
      isReferenceOnlyFolder("supplier", row.folder),
    );
    const finishedDriveImages = driveFinished.reduce((sum, row) => sum + row.count, 0);
    const referenceDriveImages = driveReference.reduce((sum, row) => sum + row.count, 0);
    const hfImages = hf.reduce((sum, row) => sum + row.count, 0);
    const supplierImages = supplierReference.reduce((sum, row) => sum + row.count, 0);
    const sameSkuCount = pdpUrls.filter((url) => belongsToSlug(url, slug)).length;

    console.log(
      [
        slug,
        pdpUrls.length,
        sameSkuCount,
        finishedDriveImages,
        referenceDriveImages,
        hfImages,
        supplierImages,
        localPublic.reduce((sum, row) => sum + row.count, 0),
        recommendation({
          slug,
          livePdpCount,
          finishedDriveImages,
          referenceDriveImages,
          hfImages,
          supplierImages,
        }),
        driveFinished.map((row) => row.folder).join("|") || "-",
        driveReference.map((row) => row.folder).join("|") || "-",
        hf.map((row) => row.folder).join("|") || "-",
        supplierReference.map((row) => row.folder).join("|") || "-",
      ].join("\t"),
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
