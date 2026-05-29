# Rocco Product Media Handoff — Maison Tanneurs — 2026-05-28

Use this before generating or wiring product pictures. Names are not product
truth; visual match to the live PDP is product truth.

## Source Of Truth

- Live storefront: `https://maisontanneurs.com/products`
- Supabase project: `xbtabpurfavngwmwtawc`
- Supabase Storage bucket: `products`
- Active repo on Turbo: `/Users/ryanz/kechken`
- Rocco repo: `/Users/lezdoors/maisontanneurs`
- Google Drive folder: `Maison Tanneurs/usable product pics`
- Drive URL: `https://drive.google.com/drive/folders/1JcbYNmy67tbQxUZvRNwQQYcvrw5WDMS6`
- Turbo local Drive sync:
  `/Users/ryanz/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics`
- HF local archive:
  `/Users/ryanz/brand-assets/maison-tanneurs/_hf-archive/sku`
- Contact sheets:
  `/Users/ryanz/brand-assets/maison-tanneurs/_audits/2026-05-28-product-source-sheets`
- Focused backpack verification:
  `/Users/ryanz/brand-assets/maison-tanneurs/_audits/2026-05-28-product-source-sheets/focused-backpack-search/cognac-woven-visual-verification.jpg`

## Current Audit

- Visible live products: 24
- Hidden/test products: 5
- Zero-image visible products: 0
- Missing clean PDP-white hero shots: 0
- Risky supplier/macro heroes: 0
- Mixed-product galleries: 0
- Drive/HF/supplier folders with 4+ images: 61
- Likely complete 8/9-shot folders: 54

## Drive Set Audit — 2026-05-28 Continuation

Run this on any machine with the Drive sync mounted:

```bash
pnpm audit:drive-sets
```

This audits `Maison Tanneurs/usable product pics` against visible launch SKUs
and prints exact `wire-drive-product-set.ts` commands. It does not trust raw
screenshots, supplier folders, or Oussam/source folders.

Current Drive result from `pnpm audit:drive-sets`:

- Ready 9-shot folders already in Drive:
  - `atlas-field-briefcase`
  - `atlas-kilim-duffle` (`Kilim Leather Duffle Bag` and `Kilim-duffle-alt`)
  - `atlas-kilim-rucksack`
  - `atlas-messenger-laptop`
  - `atlas-weekender-cognac`
  - `cognac-brogue-backpack`
  - `expedition-rolltop-cognac`
  - `expedition-rolltop-noir`
  - `explorer-rolltop-cognac`
  - `heritage-rucksack`
  - `marrakech-tote-cognac`
  - `medina-crossbody-envelope`
  - `medina-duffle`
  - `medina-rucksack-drawstring`
  - `medina-rucksack-flap-chocolate`
  - `medina-saddlebag-tooled-cognac`
  - `oasis-weekender-oxblood`
  - `vintage-buckle-backpack`
  - `woven-leather-backpack`
- Partial finished folder:
  - `medina-crossbody-tooled-walnut` has an 8-image macro folder; treat as
    supplement, not necessarily a full replacement gallery.
- Exact finished HF 9-shot exports still needed in Drive before full-gallery
  wiring:
  - `atlas-briefcase-vintage`
  - `medina-crossbody-cognac`
  - `vintage-satchel-light-brown`
- Launch-acceptable live galleries with no finished Drive source folder yet:
  - `black-stitched-backpack` has 5 same-SKU live images.
  - `classic-cognac-satchel` has 4 same-SKU live images.
  Archive the finished source sets when found, but do not generate these just
  because the Drive source folder is not mounted locally.

Upload/wire helper:

```bash
SUPABASE_SERVICE_ROLE_KEY=... pnpm tsx scripts/wire-drive-product-set.ts \
  --slug atlas-field-briefcase \
  --source "/Users/ryanz/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics/atlas-field-briefcase"
```

The helper encodes PNG/JPG/WebP sources into WebP, uploads to
`products/drop-02/`, and replaces the Supabase `products.images[]` array for
the slug. It accepts the service-role key from `SUPABASE_SERVICE_ROLE_KEY`,
`SRK`, or `~/.rocco/maisontanneurs-supabase.json` (override with
`MT_SUPABASE_KEY_FILE`). On Turbo right now, `.env.local` has empty Supabase
values and `~/.rocco/maisontanneurs-supabase.json` is missing, so upload/wiring
cannot be completed until credentials are restored.

## Raw Source Rule

Raw screenshots, Oussam uploads, supplier originals, and files from screenshot
folders are reference material only. They are not PDP assets.

Use them only to identify the bag before looking for the HF-improved output.
If a raw/source image was improved in Higgsfield, download or sync the finished
HF 9-shot set into `Maison Tanneurs/usable product pics/<product-slug>`. Do not
wire the raw/source original. The upload helper will encode PNG/JPG/WebP sources
to WebP; keep final filenames slug-based when possible so the next machine is
not guessing from UUIDs.

Never encode, upload, or wire raw screenshots/Oussam/supplier images into
`products.images[]`. If any raw image gets staged by mistake, move it to:

`/Users/ryanz/brand-assets/maison-tanneurs/_rejected-reference/raw-screenshot-sources/<slug>-<date>/`

Current rejected-reference cleanup:

- `medina-crossbody-cognac` raw screenshot-derived WebPs were removed from
  Supabase Storage, left unwired in the product row, and moved to
  `/Users/ryanz/brand-assets/maison-tanneurs/_rejected-reference/raw-screenshot-sources/medina-crossbody-cognac-2026-05-28/`.

## Rendered Product Image QA

Do not mistake the heavy black lines visible on some rendered product images
for site CSS. The product frame CSS is a subtle warm-white plate; the black
right/bottom/top lines are baked into some HF/exported image files.

Needs clean finished export replacement when available:

- `atlas-field-briefcase`
- `cognac-brogue-backpack`
- `atlas-kilim-rucksack`

Use only the finished HF/Drive export of the same bag. Do not replace these
with supplier/raw/Oussam/screenshot files.

## Low-Gallery SKUs

These are not generation requests. Ryan says all bags should already have
9-shot sets in HF/Drive, possibly under bad names. If the exact set is visible
in the HF UI but not synced locally, download the whole HF 9-shot export into
the Drive folder named with the SKU below.

- `atlas-briefcase-vintage` — 2 live same-SKU images; local HF single and supplier evidence. Need exact finished HF 9-shot export in `usable product pics/atlas-briefcase-vintage`.
- `classic-cognac-satchel` — 4 live same-SKU images; acceptable for launch. Archive the finished source set later; do not generate just because the Drive source folder is missing.
- `cognac-brogue-backpack` — resolved. Ryan confirmed the Drive folder
  `usable product pics/cognac-brogue-backpack` is the correct product source.
  The folder images were normalized from UUID `.png` names to
  `cognac-brogue-backpack-pdp-01.webp` through `-09.webp`, uploaded to
  Supabase Storage `products/drop-02/`, and wired to the product row. Storage
  also has a `cognac-brogue-backpack-pdp-white.webp` alias for the hero because
  the launch audit requires featured heroes to use `pdp-white` or `scale`.
  - Encoded WebP staging folder:
    `/Users/ryanz/brand-assets/maison-tanneurs/_upload-ready/2026-05-28-cognac-brogue-backpack`
  - Contact sheet:
    `/Users/ryanz/brand-assets/maison-tanneurs/_upload-ready/2026-05-28-cognac-brogue-backpack/contact-sheet.png`
- `medina-crossbody-cognac` — 2 live same-SKU images; raw Drive/supplier
  references exist but are not usable PDP assets. Need exact finished HF 9-shot
  export in `usable product pics/medina-crossbody-cognac`.
- `vintage-satchel-light-brown` — 2 live same-SKU images; local HF single and supplier evidence. Need exact finished HF 9-shot export in `usable product pics/vintage-satchel-light-brown`.
- `woven-leather-backpack` — resolved. Ryan provided the Drive folder
  `usable product pics/woven-leather-backpack` with 9 multishots. The folder
  images were normalized from UUID `.png` names to
  `woven-leather-backpack-pdp-01.webp` through `-09.webp`, staged, uploaded to
  Supabase Storage `products/drop-02/`, and wired to the product row. Storage
  also has a `woven-leather-backpack-pdp-white.webp` alias for the hero because
  the launch audit requires featured heroes to use `pdp-white` or `scale`.
  - Encoded WebP staging folder:
    `/Users/ryanz/brand-assets/maison-tanneurs/_upload-ready/2026-05-28-woven-leather-backpack`
  - Contact sheet:
    `/Users/ryanz/brand-assets/maison-tanneurs/_upload-ready/2026-05-28-woven-leather-backpack/contact-sheet.png`
- `atlas-kilim-rucksack` — resolved. Ryan provided the Drive folder
  `usable product pics/atlas-kilim-rucksack` with 9 multishots. The folder
  images were normalized from UUID `.png` names to
  `atlas-kilim-rucksack-pdp-01.webp` through `-09.webp`, staged at
  `/Users/ryanz/brand-assets/maison-tanneurs/_upload-ready/2026-05-28-atlas-kilim-rucksack-full`,
  uploaded to Supabase Storage `products/drop-02/`, and wired to the live row.
  Storage also has `atlas-kilim-rucksack-pdp-white.webp` and
  `atlas-kilim-rucksack-scale.webp` aliases for launch audit compatibility.
- `atlas-field-briefcase` — new separate product, not a replacement for
  `atlas-briefcase-vintage`. Ryan provided the Drive folder
  `usable product pics/atlas-field-briefcase` with 9 multishots for the
  wide-flap utility briefcase with twin front pockets. The folder images were
  normalized from UUID `.png` names to `atlas-field-briefcase-pdp-01.webp`
  through `-09.webp`, staged at
  `/Users/ryanz/brand-assets/maison-tanneurs/_upload-ready/2026-05-28-atlas-field-briefcase`,
  uploaded to Supabase Storage `products/drop-02/`, and inserted as the live
  product `Atlas Field Briefcase`. Storage also has
  `atlas-field-briefcase-pdp-white.webp` as the hero alias. Do not name this
  SKU `atlas-briefcase-vintage--supplier`; supplier naming stays internal only.

Current thin-gallery list after the latest live audit:

- `atlas-briefcase-vintage` — 2 live same-SKU images; download exact finished HF 9-shot set to Drive before wiring.
- `classic-cognac-satchel` — 4 live same-SKU images; acceptable for launch, archive exact finished source set when found.
- `medina-crossbody-cognac` — 2 live same-SKU images; reject raw screenshots
  and tooled/tassel/extra-pocket variants. Download only the HF-improved 9-shot set.
- `vintage-satchel-light-brown` — 2 live same-SKU images; reject structured buckle satchels and briefcases. Download exact finished HF 9-shot set to Drive before wiring.

Do not spend HF credits on these until visual Drive/HF search fails. The latest
audit reports hard media priorities `0` and unsynced thin galleries `0`.

## Focused Backpack Sweep — 2026-05-28

Generated a local verification sheet comparing the live targets against synced
Drive, local HF archive, HF review candidates, and supplier/source files:

`/Users/ryanz/brand-assets/maison-tanneurs/_audits/2026-05-28-product-source-sheets/focused-backpack-search/cognac-woven-visual-verification.jpg`

Result:

- `cognac-brogue-backpack`: Ryan confirmed the slug-named Drive folder is the
  correct product source. It is now renamed, staged, uploaded, and wired.
- `woven-leather-backpack`: Ryan provided the slug-named Drive folder with 9
  multishots. It is now renamed, staged, uploaded, and wired.
- `atlas-kilim-rucksack`: Ryan provided the slug-named Drive folder with 9
  multishots. It is now renamed, staged, uploaded, and wired.
- `atlas-field-briefcase`: Ryan provided the slug-named Drive folder with 9
  multishots. It is now renamed, staged, uploaded, and inserted as its own
  product so the current `atlas-briefcase-vintage` product remains separate.

## Workflow

1. Open the live PDP for the SKU and screenshot/reference the exact bag.
2. Search Drive and HF by visual silhouette, not folder name.
3. Once a folder is accepted, rename image files inside that Drive folder to
   `product-slug-pdp-01.webp` through `product-slug-pdp-09.webp` before upload.
   Keep any zip file, but do not rely on UUID filenames for handoff.
3. If the 9-shot set exists in HF but not local/Drive, download it into
   `usable product pics`.
4. QA each shot: reject wrong background, wrong silhouette, collage/grid output,
   changed hardware, changed strap/pocket/closure count, or fake logos/text.
5. Confirm the shot is HF-improved/final product photography, not a raw
   screenshot/Oussam/supplier source.
6. Encode accepted images to WebP.
7. Upload to Supabase Storage under `products/drop-02/<slug>-pdp-01..09.webp`
   or the next safe sequence.
8. Update Supabase `products.images[]`.
9. Rerun:
   - `SITE_URL=https://maisontanneurs.com pnpm exec tsx scripts/audit-assets.ts`
   - `SITE_URL=https://maisontanneurs.com pnpm exec tsx scripts/audit-media-sources.ts`
   - `pnpm audit:public`

## Do Not Do

- Do not generate just because a slug-named folder is missing.
- Do not trust Claude-renamed folder names.
- Do not wire uploaded URLs until they return HTTP 200.
- Do not wire supplier raws into `images[]`.
- Do not wire raw screenshots, Oussam uploads, or screenshot-folder files into
  `images[]`, even if they visually match. They are reference-only.
- Do not wire contact-sheet/collage outputs as PDP images.
- Do not use product pictures as hero/editorial lifestyle images.

## If Generation Is Truly Needed

Only after visual Drive/HF search fails, use HF's 9-shot product option that
generates the full 9-angle set in one run. Do not spend credits generating each
angle separately. The output still needs to be nine separate usable product
images, not a grid/contact sheet/collage. Required mix: front hero, rear, left
side, right side, front three-quarter, rear three-quarter, interior/top detail,
hardware/stitching macro, strap/handle construction detail.

Maison Tanneurs launch scope is bags and small leather goods only. Do not add
or request clothing, jackets, outerwear, apparel products, or apparel campaign
imagery for this launch.
