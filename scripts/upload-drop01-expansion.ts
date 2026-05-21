// Drop 01 catalog expansion — upload 5 new SKUs' images to Supabase Storage.
// Reads from ~/brand-assets/maison-tanneurs/_unsorted/leather-bags-supplier-pool/
// Writes WebPs (q=82, max 1600px on long edge) to products/drop-01/<slug>-NN.webp
//
// Run: SUPABASE_SERVICE_ROLE_KEY=... pnpm tsx scripts/upload-drop01-expansion.ts
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const SUPABASE_URL = "https://xbtabpurfavngwmwtawc.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "products";
const POOL = `${process.env.HOME}/brand-assets/maison-tanneurs/_unsorted/leather-bags-supplier-pool`;

// Source-file → destination-slug-and-index mapping.
// Files are converted to WebP q=82, 1600px long edge cap.
const JOBS: Array<{ source: string; slug: string; index: number }> = [
  // black-stitched-backpack (5 angles)
  { source: "21.png.webp", slug: "black-stitched-backpack", index: 1 },
  { source: "22.png.webp", slug: "black-stitched-backpack", index: 2 },
  { source: "23.png.webp", slug: "black-stitched-backpack", index: 3 },
  { source: "24.png.webp", slug: "black-stitched-backpack", index: 4 },
  { source: "25.png.webp", slug: "black-stitched-backpack", index: 5 },

  // cognac-brogue-backpack (3 angles)
  { source: "41.jpg.webp", slug: "cognac-brogue-backpack", index: 1 },
  { source: "42.jpg.webp", slug: "cognac-brogue-backpack", index: 2 },
  { source: "43.jpg.webp", slug: "cognac-brogue-backpack", index: 3 },

  // classic-cognac-satchel (4 angles)
  { source: "1.jpg.webp", slug: "classic-cognac-satchel", index: 1 },
  { source: "5.jpg.webp", slug: "classic-cognac-satchel", index: 2 },
  { source: "4.jpg.webp", slug: "classic-cognac-satchel", index: 3 },
  { source: "6.jpg.webp", slug: "classic-cognac-satchel", index: 4 },

  // woven-leather-backpack (2 angles)
  { source: "Moroccan-Brown-Leather-Woven-Backpack.jpg", slug: "woven-leather-backpack", index: 1 },
  { source: "Moroccan-Brown-Leather-Woven-Backpack-2.jpg", slug: "woven-leather-backpack", index: 2 },

  // vintage-buckle-backpack (2 angles)
  { source: "Moroccan-Leather-Buckle-Backpack.webp", slug: "vintage-buckle-backpack", index: 1 },
  { source: "Moroccan-Leather-Buckle-Backpack-2.webp", slug: "vintage-buckle-backpack", index: 2 },
];

async function main() {
  if (!SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const uploaded: Record<string, string[]> = {};

  for (const job of JOBS) {
    const srcPath = join(POOL, job.source);
    const dstPath = `drop-01/${job.slug}-${String(job.index).padStart(2, "0")}.webp`;

    const bytes = await readFile(srcPath);
    const webp = await sharp(bytes)
      .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(dstPath, webp, {
        contentType: "image/webp",
        upsert: true,
      });

    if (error) {
      console.error(`FAIL ${dstPath}: ${error.message}`);
      continue;
    }

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(dstPath);
    if (!uploaded[job.slug]) uploaded[job.slug] = [];
    uploaded[job.slug].push(pub.publicUrl);
    console.log(`✓ ${dstPath}`);
  }

  console.log("\n--- Per-slug URL arrays (paste into seed migration) ---");
  for (const [slug, urls] of Object.entries(uploaded)) {
    console.log(`\n${slug}:`);
    for (const url of urls) console.log(`  ${url}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
