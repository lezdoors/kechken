import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const SOURCE_ROOTS = {
  drive:
    "/Users/ryanz/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics",
  hf: "/Users/ryanz/brand-assets/maison-tanneurs/_hf-archive/sku",
  supplier: "/Users/ryanz/brand-assets/maison-tanneurs/_supplier-pool",
};

const IMAGE_EXT = /\.(webp|png|jpe?g|avif)$/i;

type FolderRow = {
  source: string;
  folder: string;
  imageCount: number;
  firstImages: string[];
  assetStatus: "finished-candidate" | "reference-only";
};

function isReferenceOnly(source: string, folder: string, firstImages: string[]): boolean {
  const haystack = [source, folder, ...firstImages].join(" ").toLowerCase();
  if (source === "supplier") return true;
  return (
    haystack.includes("screen shot") ||
    haystack.includes("screenshot") ||
    haystack.includes("oussam") ||
    haystack.includes("supplier") ||
    /(?:^|[\/\s._-])raw(?:$|[\/\s._-])/.test(haystack)
  );
}

async function walkSource(source: string, root: string, maxDepth = 5): Promise<FolderRow[]> {
  const rows: FolderRow[] = [];

  async function walk(current: string, depth: number) {
    if (depth > maxDepth) return;

    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
      const info = await stat(current);
      if (!info.isDirectory()) return;
    } catch {
      return;
    }

    const images = entries
      .filter((entry) => entry.isFile() && IMAGE_EXT.test(entry.name))
      .map((entry) => entry.name)
      .sort();

    if (images.length >= 4) {
      const folder = current.replace(`${root}/`, "");
      rows.push({
        source,
        folder,
        imageCount: images.length,
        firstImages: images.slice(0, 5),
        assetStatus: isReferenceOnly(source, folder, images)
          ? "reference-only"
          : "finished-candidate",
      });
    }

    for (const entry of entries) {
      if (entry.isDirectory()) await walk(join(current, entry.name), depth + 1);
    }
  }

  await walk(root, 1);
  return rows;
}

async function main() {
  const rows = (
    await Promise.all(
      Object.entries(SOURCE_ROOTS).map(([source, root]) => walkSource(source, root)),
    )
  )
    .flat()
    .sort((a, b) => b.imageCount - a.imageCount || a.source.localeCompare(b.source));

  const completeSets = rows.filter((row) => row.imageCount >= 8);

  console.log("=== Maison Tanneurs product source folder inventory ===");
  console.log("Use this with visual contact sheets; folder names are not product truth.");
  console.log(
    "Folders marked reference-only are raw screenshots/Oussam/supplier/source evidence. Do not upload or wire them.",
  );
  console.log(`Folders with 4+ direct images: ${rows.length}`);
  console.log(`Likely complete 8/9-shot folders: ${completeSets.length}`);
  console.log("");
  console.log(["source", "status", "images", "folder", "first_images"].join("\t"));
  for (const row of rows) {
    console.log(
      [row.source, row.assetStatus, row.imageCount, row.folder, row.firstImages.join("|")].join(
        "\t",
      ),
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
