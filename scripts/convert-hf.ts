// HF PNG → WebP converter for site assets.
// Run: pnpm tsx scripts/convert-hf.ts
import sharp from "sharp";

interface Job {
  src: string;
  dst: string;
  width: number;
  height?: number;
}

async function main() {
  const ARCHIVE = `${process.env.HOME}/brand-assets/maison-tanneurs/_hf-archive`;
  const NEW = "/tmp/hf-new";

  const jobs: Job[] = [
    // EditorialStrip "Atelier" card (4:5 portrait) — messenger + travertine + artisan in BG
    {
      src: `${NEW}/19b33082.png`,
      dst: "public/hero/editorial-atelier.webp",
      width: 1024,
      height: 1280,
    },
    // EditorialStrip "Lookbook" card (4:5 portrait) — huge cognac handbag + woman BG
    {
      src: `${NEW}/c1f7d947.png`,
      dst: "public/hero/lookbook-brunette-seated.webp",
      width: 1024,
      height: 1280,
    },
    // BrandStoryEditorial (5:6 portrait) — cognac duffle + woman walking arches
    {
      src: `${NEW}/c3edc7c1.png`,
      dst: "public/hero/atelier-messenger-portrait.webp",
      width: 1024,
      height: 1228,
    },
  ];

  for (const job of jobs) {
    const pipeline = sharp(job.src);
    if (job.height) {
      await pipeline
        .resize(job.width, job.height, { fit: "cover", position: sharp.strategy.attention })
        .webp({ quality: 82 })
        .toFile(job.dst);
    } else {
      await pipeline.resize(job.width).webp({ quality: 82 }).toFile(job.dst);
    }
    console.log(`Wrote ${job.dst}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
