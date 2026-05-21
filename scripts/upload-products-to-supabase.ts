// Upload all /public/products/drop-01/*.webp + leather-goods-tile.webp to the
// Maison Tanneurs Supabase Storage `products` bucket, public-read.
//
// Run: pnpm tsx scripts/upload-products-to-supabase.ts
//
// After upload, the script prints the public URLs for each file so they can
// be wired into lib/products.ts STATIC_PRODUCTS + the DB products.images[]
// arrays.
import { createClient } from "@supabase/supabase-js";
import { readFile, readdir } from "node:fs/promises";
import { join, extname } from "node:path";

const SUPABASE_URL = "https://xbtabpurfavngwmwtawc.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "products";
const LOCAL_DIR = "public/products/drop-01";
const REMOTE_PREFIX = "drop-01";

function mimeFor(filename: string): string {
  const ext = extname(filename).toLowerCase();
  if (ext === ".webp") return "image/webp";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

async function main() {
  if (!SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY env var not set. Run with: SUPABASE_SERVICE_ROLE_KEY=... pnpm tsx scripts/upload-products-to-supabase.ts",
    );
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // 1. Create the bucket if it doesn't exist (public-read).
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find((b) => b.name === BUCKET)) {
    const { error: createErr } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024, // 5 MB per file
    });
    if (createErr) throw new Error(`createBucket: ${createErr.message}`);
    console.log(`Created bucket "${BUCKET}" (public).`);
  } else {
    console.log(`Bucket "${BUCKET}" already exists.`);
  }

  // 2. Upload each file in LOCAL_DIR.
  const files = await readdir(LOCAL_DIR);
  const uploadable = files.filter((f) => /\.(webp|png|jpe?g|svg)$/i.test(f));

  const urls: Record<string, string> = {};

  for (const filename of uploadable) {
    const localPath = join(LOCAL_DIR, filename);
    const remotePath = `${REMOTE_PREFIX}/${filename}`;
    const body = await readFile(localPath);

    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(remotePath, body, {
        contentType: mimeFor(filename),
        upsert: true,
      });

    if (uploadErr) {
      console.error(`UPLOAD FAIL ${remotePath}: ${uploadErr.message}`);
      continue;
    }

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(remotePath);
    urls[filename] = pub.publicUrl;
    console.log(`✓ ${remotePath}`);
  }

  console.log("\n--- Public URLs ---");
  for (const [name, url] of Object.entries(urls)) {
    console.log(`${name}\n  ${url}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
