import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const SITE_URL = process.env.SITE_URL || "https://maisontanneurs.com";
const OUT_DIR =
  "/Users/ryanz/brand-assets/maison-tanneurs/_audits/2026-05-28-thin-gallery-decision-sheets";
const SUPABASE_HOST = "xbtabpurfavngwmwtawc.supabase.co";
const IMAGE_EXT = /\.(webp|png|jpe?g|avif)$/i;
const REFERENCE_ONLY_NOTICE =
  "REFERENCE ONLY: raw screenshots, Oussam uploads, and supplier/source files are identity evidence only. Do not upload or wire them.";

type Group = {
  label: string;
  paths: string[];
};

type DecisionSku = {
  slug: string;
  decision: string;
  groups: Group[];
};

const driveRoot =
  "/Users/ryanz/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics";
const hfRoot = "/Users/ryanz/brand-assets/maison-tanneurs/_hf-archive/sku";
const supplierRoot = "/Users/ryanz/brand-assets/maison-tanneurs/_supplier-pool";

const SKUS: DecisionSku[] = [
  {
    slug: "atlas-briefcase-vintage",
    decision:
      "Do not wire raw/source field briefcase, messenger, or tote candidates. Need exact HF-improved structured burgundy/cognac top-handle briefcase angles.",
    groups: [
      {
        label: "HF single",
        paths: [join(hfRoot, "atlas-briefcase-vintage/pdp-white")],
      },
      {
        label: "Supplier hidden-needed",
        paths: [join(supplierRoot, "bags-pics-5-26-renamed/hidden-needed/atlas-briefcase-vintage")],
      },
      {
        label: "Supplier messenger pool",
        paths: [join(supplierRoot, "01_pdp-ready-supplier/messenger")],
      },
    ],
  },
  {
    slug: "medina-crossbody-cognac",
    decision:
      "Only wire HF-improved plain rectangular cognac crossbody shots. Raw screenshot/Oussam/supplier images are reference-only. Reject tooled, tassel, envelope, double-bag, and extra-pocket variants.",
    groups: [
      {
        label: "REFERENCE ONLY Drive screenshot folder",
        paths: [join(driveRoot, "Bags Screen shots/Cognac Leather Crossbody Purse – Handcrafted Everyday Bag")],
      },
      {
        label: "HF single",
        paths: [join(hfRoot, "medina-crossbody-cognac/pdp-white")],
      },
      {
        label: "REFERENCE ONLY Supplier crossbody pool",
        paths: [join(supplierRoot, "01_pdp-ready-supplier/crossbody")],
      },
      {
        label: "REFERENCE ONLY Supplier hidden-needed",
        paths: [join(supplierRoot, "bags-pics-5-26-renamed/hidden-needed/medina-crossbody-cognac")],
      },
    ],
  },
  {
    slug: "vintage-satchel-light-brown",
    decision:
      "Only wire HF-improved tall plain light-brown vertical satchel shots. Raw/source files are reference-only. Reject orange crossbody, structured buckle satchel, and briefcase shapes.",
    groups: [
      {
        label: "HF single",
        paths: [join(hfRoot, "vintage-satchel-light-brown/pdp-white")],
      },
      {
        label: "REFERENCE ONLY Drive loose screenshot",
        paths: [join(driveRoot, "Bags Screen shots/Vintage Leather Satchel Bag — Handmade Light Brown Crossbody.png")],
      },
      {
        label: "REFERENCE ONLY Supplier hidden-needed",
        paths: [join(supplierRoot, "bags-pics-5-26-renamed/hidden-needed/vintage-satchel-light-brown")],
      },
      {
        label: "REFERENCE ONLY Supplier satchel pool",
        paths: [join(supplierRoot, "01_pdp-ready-supplier/satchel")],
      },
    ],
  },
  {
    slug: "classic-cognac-satchel",
    decision:
      "Launch acceptable with 4 live images. Add only an exact detail/scale shot if later requested.",
    groups: [
      {
        label: "REFERENCE ONLY possible satchel supplier pool",
        paths: [join(supplierRoot, "01_pdp-ready-supplier/satchel")],
      },
    ],
  },
];

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
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

async function listImages(path: string): Promise<string[]> {
  if (IMAGE_EXT.test(path)) return [path];
  try {
    const entries = await readdir(path, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
      const full = join(path, entry.name);
      if (entry.isDirectory()) files.push(...(await listImages(full)));
      if (entry.isFile() && IMAGE_EXT.test(entry.name)) files.push(full);
    }
    return files.sort();
  } catch {
    return [];
  }
}

async function liveImages(slug: string): Promise<string[]> {
  const response = await fetch(`${SITE_URL}/products/${slug}`);
  if (!response.ok) throw new Error(`${slug} PDP returned ${response.status}`);
  const html = await response.text();
  const productArea = html.split('aria-label="You May Also Like"')[0] || html;
  const fromNextImage = [...productArea.matchAll(/[?&]url=([^&"']+)/g)]
    .map((match) => {
      try {
        return decodeURIComponent(match[1]).replace(/\?.*$/, "");
      } catch {
        return "";
      }
    })
    .filter((url) => url.includes(SUPABASE_HOST) && slugFromFile(url) === slug);
  const direct = [
    ...productArea.matchAll(
      new RegExp(
        `https://${SUPABASE_HOST.replace(".", "\\.")}/storage/v1/object/public/products/[^"'\\\\) ]+`,
        "g",
      ),
    ),
  ]
    .map((match) => match[0].replace(/\\$/, "").replace(/&amp;/g, "&"))
    .filter((url) => slugFromFile(url) === slug);

  return Array.from(new Set([...fromNextImage, ...direct]));
}

function textSvg(text: string, width: number, height = 34, fontSize = 18) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <text x="0" y="${Math.min(height - 8, fontSize + 6)}" font-family="Arial" font-size="${fontSize}" fill="#111111">${escaped}</text>
    </svg>`,
  );
}

async function tile(input: string, label: string, width = 220, height = 270) {
  const image = input.startsWith("http")
    ? Buffer.from(await (await fetch(input)).arrayBuffer())
    : input;
  const thumb = await sharp(image)
    .resize(width, height - 42, { fit: "inside", background: "#f7f7f7" })
    .extend({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: "#f7f7f7",
    })
    .flatten({ background: "#f7f7f7" })
    .png()
    .toBuffer();
  const labelImg = await sharp(textSvg(label, width, 42, 12)).png().toBuffer();
  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#ffffff",
    },
  })
    .composite([
      { input: thumb, left: Math.floor((width - (await sharp(thumb).metadata()).width!) / 2), top: 0 },
      { input: labelImg, left: 0, top: height - 42 },
    ])
    .png()
    .toBuffer();
}

async function makeSheet(sku: DecisionSku) {
  const tiles: Buffer[] = [];
  const labels: string[] = [];

  for (const [index, url] of (await liveImages(sku.slug)).entries()) {
    tiles.push(await tile(url, `LIVE ${index + 1}: ${basename(url)}`));
    labels.push(url);
  }

  for (const group of sku.groups) {
    for (const groupPath of group.paths) {
      const files = await listImages(groupPath);
      for (const file of files) {
        tiles.push(await tile(file, `${group.label}: ${basename(file)}`));
        labels.push(file);
      }
    }
  }

  const tileW = 220;
  const tileH = 270;
  const cols = 4;
  const gap = 20;
  const headerH = 150;
  const rows = Math.ceil(tiles.length / cols);
  const width = cols * tileW + (cols + 1) * gap;
  const height = headerH + rows * tileH + (rows + 1) * gap;

  const composites: sharp.OverlayOptions[] = [
    { input: textSvg(`${sku.slug} - decision sheet`, width - 2 * gap, 36, 20), left: gap, top: 16 },
    { input: textSvg(REFERENCE_ONLY_NOTICE, width - 2 * gap, 26, 12), left: gap, top: 50 },
    { input: textSvg(sku.decision, width - 2 * gap, 56, 14), left: gap, top: 78 },
  ];

  tiles.forEach((input, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    composites.push({
      input,
      left: gap + col * (tileW + gap),
      top: headerH + gap + row * (tileH + gap),
    });
  });

  const output = join(OUT_DIR, `${sku.slug}-decision-sheet.png`);
  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#ffffff",
    },
  })
    .composite(composites)
    .png()
    .toFile(output);

  await writeFile(
    join(OUT_DIR, `${sku.slug}-decision-sheet.txt`),
    [`# ${sku.slug}`, REFERENCE_ONLY_NOTICE, sku.decision, "", ...labels].join("\n"),
  );

  console.log(output);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const sku of SKUS) await makeSheet(sku);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
