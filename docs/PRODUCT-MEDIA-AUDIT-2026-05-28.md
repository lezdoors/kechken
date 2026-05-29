# Maison Tanneurs Product Media Audit — 2026-05-28

Purpose: prevent duplicate Higgsfield generations. Use this before asking HF
for new product images.

## Source Map

- Live product truth: Supabase project `xbtabpurfavngwmwtawc`, table `products`.
  - Production table queried 2026-05-28: 30 rows total.
  - 29 rows are `available` + `featured`; 5 of those are launch-suppressed by
    `lib/hidden-skus.ts`, leaving 24 visible storefront PDPs in the live
    storefront scrape.
- Storefront: `https://maisontanneurs.com/products`.
- Supabase storage bucket/path: `products/drop-01/*`, `products/drop-02/*`.
- Google Drive folder: `usable product pics`
  - URL: `https://drive.google.com/drive/folders/1JcbYNmy67tbQxUZvRNwQQYcvrw5WDMS6`
  - Local sync path:
    `/Users/ryanz/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics`
  - Connector verified 2026-05-28.
- Local HF archive:
  - `/Users/ryanz/brand-assets/maison-tanneurs/_hf-archive/sku`
- Local supplier/source references:
  - `/Users/ryanz/brand-assets/maison-tanneurs/_supplier-pool`

## Raw/Oussam/Screenshot Source Rule

Raw screenshots, Oussam uploads, supplier originals, and files from screenshot
folders are reference-only. They can help identify which bag is which, but they
must not be encoded, uploaded, or wired into PDP galleries.

The accepted path is: use raw/source material only for visual matching, locate
the HF-improved 9-shot output for the same bag, sync that finished set into
`Maison Tanneurs/usable product pics/<product-slug>`, rename final images to
`<product-slug>-pdp-01.webp` through `<product-slug>-pdp-09.webp`, then QA,
encode, upload, and wire.

If a raw image is accidentally staged, move it to:

`/Users/ryanz/brand-assets/maison-tanneurs/_rejected-reference/raw-screenshot-sources/<slug>-<date>/`

2026-05-28 correction: three raw screenshot-derived `medina-crossbody-cognac`
WebPs were staged/uploaded during review, but Ryan clarified these are
source-only. The Storage objects were removed, the product row was not updated,
and the staged files were moved to
`/Users/ryanz/brand-assets/maison-tanneurs/_rejected-reference/raw-screenshot-sources/medina-crossbody-cognac-2026-05-28/`.

Current source totals:

- Google Drive `usable product pics`: 277 image files.
- Local HF SKU archive: 203 image files.
- Local supplier/source pool: 67 image files.

## Live Catalogue State

Fresh live-page audit command:

```bash
pnpm exec tsx scripts/audit-media-sources.ts
pnpm exec tsx scripts/audit-assets.ts
pnpm run audit:sources
pnpm run audit:drive-sets
```

Live visible product PDPs found on `https://maisontanneurs.com/products`: 24.

Hard product-media blockers on visible products:

- Zero-image visible products: 0.
- Missing clean PDP-white visible products: 0.
- Risky visible heroes using supplier/macro/raw source: 0.

Conclusion: the live site is not missing required product pictures. The gap is
gallery depth and lifestyle/scale coverage on a subset of products.

`scripts/audit-assets.ts` now defaults to the live storefront when no Supabase
key is present. This avoids the old false-positive fallback list from
`STATIC_PRODUCTS`, which undercounted live Supabase galleries.

Latest live asset audit:

- Visible product count: 24.
- Zero-image visible products: 0.
- Missing PDP-white / clean product shots: 0.
- Risky visible hero images: 0.
- Low-gallery visible products: 4, counted by same-SKU images only.
- Mixed-product PDP galleries: 0.
- Do not generate yet. Ryan confirmed all bag 9-shot sets may already exist in
  HF/Drive, but names may be unreliable. First resolve exact visual mapping by
  bag silhouette and live PDP reference.

Visual source sheets archived:

`/Users/ryanz/brand-assets/maison-tanneurs/_audits/2026-05-28-product-source-sheets`

Focused backpack verification sheet archived:

`/Users/ryanz/brand-assets/maison-tanneurs/_audits/2026-05-28-product-source-sheets/focused-backpack-search/cognac-woven-visual-verification.jpg`

Inventory TSV archived:

`/Users/ryanz/brand-assets/maison-tanneurs/_audits/2026-05-28-product-source-folders.tsv`

## Fresh Source Audit

This table compares same-SKU live PDP images against Google Drive, local
Higgsfield, and checked-in local product folders. It uses file/folder evidence
only, so it must be paired with visual QA. Use this before generating anything.

`scripts/audit-media-sources.ts` now separates finished Drive/HF candidates
from reference-only source evidence. Reference-only means raw screenshot,
Oussam, supplier, or source material: useful for identifying a product, banned
for direct PDP upload/wiring.

| SKU | Live same-SKU images | Drive finished | Drive reference | HF | Supplier reference | Local Public | Recommendation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `atlas-briefcase-vintage` | 2 | 0 | 0 | 1 | 2 | 0 | Partial finished evidence; find exact 9-shot |
| `atlas-field-briefcase` | 9 | 9 | 0 | 0 | 0 | 0 | Do not generate |
| `atlas-kilim-duffle` | 9 | 18 | 2 | 18 | 1 | 1 | Do not generate |
| `atlas-kilim-rucksack` | 10 | 11 | 0 | 1 | 11 | 0 | Do not generate |
| `atlas-messenger-laptop` | 9 | 9 | 3 | 9 | 4 | 0 | Do not generate |
| `atlas-weekender-cognac` | 9 | 9 | 4 | 0 | 8 | 0 | Do not generate |
| `black-stitched-backpack` | 5 | 0 | 0 | 0 | 0 | 0 | Do not generate; live gallery is already usable |
| `classic-cognac-satchel` | 4 | 0 | 0 | 0 | 1 | 0 | Reference-only evidence; find HF-improved shot only if needed |
| `cognac-brogue-backpack` | 9 | 9 | 0 | 0 | 0 | 0 | Do not generate |
| `expedition-rolltop-cognac` | 9 | 9 | 0 | 0 | 0 | 0 | Do not generate |
| `expedition-rolltop-noir` | 9 | 9 | 2 | 0 | 0 | 0 | Do not generate |
| `explorer-rolltop-cognac` | 9 | 18 | 0 | 27 | 0 | 1 | Do not generate |
| `heritage-rucksack` | 9 | 9 | 0 | 9 | 6 | 1 | Do not generate |
| `marrakech-tote-cognac` | 9 | 9 | 2 | 9 | 5 | 0 | Do not generate |
| `medina-crossbody-cognac` | 2 | 0 | 5 | 1 | 13 | 0 | Use raw refs only for identity; find HF-improved 9-shot |
| `medina-crossbody-envelope` | 9 | 9 | 0 | 9 | 10 | 1 | Do not generate |
| `medina-crossbody-tooled-walnut` | 5 | 8 | 2 | 19 | 10 | 0 | Do not generate |
| `medina-duffle` | 9 | 25 | 0 | 18 | 0 | 0 | Do not generate |
| `medina-rucksack-drawstring` | 9 | 25 | 0 | 27 | 6 | 1 | Do not generate |
| `medina-rucksack-flap-chocolate` | 9 | 9 | 0 | 0 | 8 | 0 | Do not generate |
| `medina-saddlebag-tooled-cognac` | 9 | 9 | 3 | 0 | 3 | 0 | Do not generate |
| `oasis-weekender-oxblood` | 9 | 9 | 2 | 0 | 6 | 0 | Do not generate |
| `vintage-buckle-backpack` | 9 | 26 | 0 | 36 | 0 | 0 | Do not generate |
| `vintage-satchel-light-brown` | 2 | 0 | 0 | 1 | 2 | 0 | Partial finished evidence; find exact 9-shot |
| `woven-leather-backpack` | 9 | 9 | 0 | 0 | 0 | 0 | Do not generate |

## 2026-05-28 HF Clean-BG Review

Ryan fixed several wrong-background single PDP shots in Higgsfield using the
unlimited toggle. The reviewed outputs are archived locally at:

`/Users/ryanz/brand-assets/maison-tanneurs/_hf-archive/review-2026-05-28-clean-bg-and-multishot`

Review notes:

- `hf-3.png` visually matches `atlas-briefcase-vintage`, but it is another
  clean front/back-style single, not a full side/back/detail gallery pack.
- `hf-5.png` visually matches `medina-crossbody-cognac`, but it is another
  clean front single, not enough by itself to solve the thin gallery.
- `hf-8.png` / `hf-9.png` are backpack candidates and need SKU mapping before
  wiring.
- `hf-11.png` maps to a kilim duffle family already covered by live galleries.
- `hf-12.png` maps to a tooled crossbody family already covered by live
  galleries.

Do not upload these automatically. Use them as QA-approved candidates only
after mapping each image to the exact live SKU.

Rejected:

- `/Users/ryanz/brand-assets/maison-tanneurs/_hf-archive/review-2026-05-28-clean-bg-and-multishot/rejected-medina-crossbody-multishot`
  contains a lower-level GPT Image 2 multishot attempt for
  `medina-crossbody-cognac`. It preserved product identity, but each output is a
  collage/contact-sheet layout rather than a single PDP image. Do not wire.

Generation guidance from this review:

- Use Ryan's HF unlimited toggle for single clean PDP fixes.
- Use HF's bundled 9-shot product option for true multi-angle packs when
  generation is unavoidable. It should produce the full nine-angle set in one
  run; do not generate each angle one-by-one.
- If `higgsfield product-photoshoot create` is unavailable, lower-level
  `higgsfield generate create gpt_image_2` can run, but must be QA'd carefully;
  the 2026-05-28 fallback produced unusable collage layouts.
- For multishot prompts, explicitly require one separate output image per angle,
  not a grid/collage/contact sheet.
- Maison Tanneurs launch scope is bags and small leather goods only. Ignore any
  old clothing/apparel language in historical Kechken prompt files.

## Filename Trust Correction

Ryan confirmed the completed 9-shot sets may already exist in Higgsfield and
Google Drive under unreliable names. Therefore:

- Do not trust folder names.
- Do not generate only because `audit-media-sources` cannot find a slug-named
  folder.
- Use the archived contact sheets first, then the Higgsfield web UI if the set
  was not downloaded/synced locally.
- If a set is only visible in the Higgsfield web UI, download it into Google
  Drive `usable product pics` before wiring.
- Generate only after visual QA proves the exact bag is not already present.

`pnpm run audit:sources` now lists every Drive/HF/supplier folder with 4+
direct images and flags likely complete 8/9-shot folders without relying on
SKU names.

The old generation request sheet is now a fallback spec, not an automatic todo:

`docs/HF-9SHOT-REQUESTS-2026-05-28.md`

## Rendered UI QA — Black Artboard Lines

Local visual QA on 2026-05-28 showed that some finished exports display baked-in
black artboard/crop lines on rendered product cards and PDP galleries. This is
not a CSS border and should not be solved by editing raw screenshots.

Seen in local screenshots:

- `atlas-field-briefcase` — visible black right/bottom image edge on product
  cards and PDP hero.
- `cognac-brogue-backpack` — visible black edge on at least one PDP gallery
  angle.
- `atlas-kilim-rucksack` — visible black frame on the current grid hero.

Action: find/download the clean HF/Drive finished exports for these exact
products, or re-export the HF 9-shot set without black artboard/crop lines. Do
not use supplier/raw/Oussam/screenshot files as replacements.

## Drive Product Set Audit — 2026-05-28 Continuation

New repeatable command:

```bash
pnpm audit:drive-sets
```

Purpose: list which visible launch SKUs have finished folders in Google Drive
`usable product pics`, count WebP/PNG sources, and print the exact upload/wire
command for each matched folder. The command now separates true finished Drive
sets, launch-acceptable live galleries with missing source archives, and SKUs
that specifically need the finished HF 9-shot export downloaded into Drive.

Current results:

- Ready 9-shot Drive folders: 19 visible products.
- Partial Drive folder: `medina-crossbody-tooled-walnut` has 8 macro images.
- Need exact finished HF 9-shot export downloaded to Drive:
  - `atlas-briefcase-vintage`
  - `medina-crossbody-cognac`
  - `vintage-satchel-light-brown`
- Launch-acceptable live galleries, archive finished source set when found:
  - `black-stitched-backpack` has 5 live same-SKU images.
  - `classic-cognac-satchel` has 4 live same-SKU images.

Target folders for the three HF exports:

```text
/Users/ryanz/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics/atlas-briefcase-vintage
/Users/ryanz/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics/medina-crossbody-cognac
/Users/ryanz/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics/vintage-satchel-light-brown
```

- 19 visible launch SKUs have ready 9-shot Drive folders.
- 1 visible SKU has partial finished Drive evidence:
  - `medina-crossbody-tooled-walnut` — 8-image macro folder; supplement only.
- 5 visible SKUs still need exact finished Drive/HF mapping:
  - `atlas-briefcase-vintage`
  - `black-stitched-backpack`
  - `classic-cognac-satchel`
  - `medina-crossbody-cognac`
  - `vintage-satchel-light-brown`

Do not generate for these five until the HF web UI and Drive are visually
checked. Ryan has said names may be unreliable and all bags may already have
their 9-shot sets.

The upload helper is:

```bash
SUPABASE_SERVICE_ROLE_KEY=... pnpm tsx scripts/wire-drive-product-set.ts \
  --slug <slug> \
  --source "<Drive finished folder>"
```

It will encode PNG/JPG/WebP into WebP, upload to `products/drop-02/`, and
replace `products.images[]` for that slug. The script accepts credentials from
`SUPABASE_SERVICE_ROLE_KEY`, `SRK`, or
`~/.rocco/maisontanneurs-supabase.json` (override path with
`MT_SUPABASE_KEY_FILE`). Current blocker: this machine has empty Supabase env
values and no `~/.rocco/maisontanneurs-supabase.json`, so the script has only
been verified in `--dry-run` mode.

## Current Generation Policy

Do not generate for every low-gallery SKU. Use this split:

Needs visual mapping before wiring or generating. For these, supplier and
screenshot evidence is identity/reference only; wire only finished HF-improved
shots:

- `atlas-briefcase-vintage`
- `medina-crossbody-cognac`
- `vintage-satchel-light-brown`

Acceptable but thin:

- `classic-cognac-satchel` has 4 identity-safe live images and no slug-named
  local evidence; add only an exact detail/scale shot if later required.

`woven-leather-backpack` is resolved. Ryan provided the slug-named Drive folder
with 9 multishots; files are now canonical `woven-leather-backpack-pdp-01.webp`
through `-09.webp`, uploaded to Supabase Storage, and wired to the product row.

Drive connector and visual QA update:

- `cognac-brogue-backpack` exists in Google Drive as
  `usable product pics/cognac-brogue-backpack` with 9 multishots. Ryan
  confirmed this folder is the correct source. Files are now canonical
  `cognac-brogue-backpack-pdp-01.webp` through `-09.webp`, uploaded to
  Supabase Storage, and wired to the product row.
- `woven-leather-backpack` exists in Google Drive as
  `usable product pics/woven-leather-backpack` with 9 multishots. Files are now
  canonical `woven-leather-backpack-pdp-01.webp` through `-09.webp`, uploaded
  to Supabase Storage, and wired to the product row.

Current `audit-assets` wording after staging upload-ready candidates:

- Hard media priorities: `0`.
- Unsynced thin galleries to verify in HF/Drive: none for
  `cognac-brogue-backpack` or `woven-leather-backpack`; both are resolved.
- Select/wire existing before generating now includes:
  - `atlas-briefcase-vintage`
  - `medina-crossbody-cognac`
  - `vintage-satchel-light-brown`

Upload-ready supplemental candidates staged 2026-05-28:

`/Users/ryanz/brand-assets/maison-tanneurs/_upload-ready/2026-05-28-thin-gallery`

- `atlas-briefcase-vintage-pdp-03.webp` from HF review `hf-3.png`.
- `cognac-brogue-backpack-pdp-04.webp` from HF review `hf-10.png`.

These were encoded but not uploaded or wired because local/Vercel-pulled Supabase
service-role values resolved to empty strings, and Storage rejected the upload.
Do not add these URLs to `products.images[]` until the public Storage URLs
return `200`.

`classic-cognac-satchel` has only 4 live images and no matching local evidence,
but visual QA shows front, back, rear/zip, and side views. It is acceptable for
launch and is not a generation priority unless the PDP is later rejected.

Read:

- `Live PDP URLs >= 5`: do not generate. Only replace if visual QA rejects a specific shot.
- `Live PDP URLs < 5` with visually rejected/mismatched existing evidence: use
  the HF 9-shot request sheet, then QA, encode, upload, and wire accepted shots.
- `Live PDP URLs < 5` with no Drive/HF/local evidence: only then consider a small targeted HF run.

## Do Not Regenerate

These products already have 9 images wired in Supabase and should not be sent
back to HF unless a specific shot is rejected in visual QA:

- `atlas-kilim-duffle`
- `atlas-messenger-laptop`
- `atlas-weekender-cognac`
- `expedition-rolltop-cognac`
- `expedition-rolltop-noir`
- `explorer-rolltop-cognac`
- `heritage-rucksack`
- `marrakech-tote-cognac`
- `medina-crossbody-envelope`
- `medina-crossbody-tooled-walnut`
- `medina-duffle`
- `medina-rucksack-drawstring`
- `medina-rucksack-flap-chocolate`
- `medina-saddlebag-tooled-cognac`
- `oasis-weekender-oxblood`
- `vintage-buckle-backpack`

Also do not regenerate these newer live products; they already have 9 PDP URLs
and Drive evidence:

- `atlas-weekender-cognac`
- `expedition-rolltop-cognac`
- `expedition-rolltop-noir`
- `medina-rucksack-flap-chocolate`
- `medina-saddlebag-tooled-cognac`
- `oasis-weekender-oxblood`

Google Drive also has completed folders for many of the above inside
`usable product pics`, including:

- `atlas-kilim-duffle` / `Kilim Leather Duffle Bag` / `Kilim-duffle-alt` — 20 images total.
- `atlas-messenger-laptop` / `Atlas Leather Messenger Bag...` — 12 images total.
- `atlas-weekender-cognac` plus two screenshot-named cognac weekender folders — 13 images total.
- `heritage-rucksack` — 9 webp images + zip.
- `medina-crossbody-envelope` — 9 webp images + zip.
- `medina-duffle` / `Classic Leather Duffle Bag...` / `medina-duffle-scale` / `medina-duffle-macro` — 25 images total.
- `medina-rucksack-drawstring` — 9 webp images.
- `vintage-buckle-backpack-pdp-alt` — 9 webp images + zip.
- `expedition-rolltop-cognac`
- `expedition-rolltop-noir`
- `medina-rucksack-flap-chocolate`
- `medina-saddlebag-tooled-cognac`
- `oasis-weekender-oxblood`

## Low-Gallery Products

These are live, visible, and have clean heroes, but their Supabase galleries are
thin. Existing folders were checked visually from Drive/HF contact sheets. Use
exact product identity, not names.

| SKU | Supabase Images | Existing Evidence | Action |
| --- | ---: | --- | --- |
| `atlas-briefcase-vintage` | 2 same-SKU | Similar `atlas-messenger-laptop` folder is a different front-pocket laptop case; similar `marrakech-tote-cognac` is a different tote. | Do not wire these. Find exact HF/Drive 9-shot or use fallback request. |
| `atlas-field-briefcase` | 9 same-SKU | Ryan-provided Drive folder `usable product pics/atlas-field-briefcase`; renamed, staged, uploaded, and inserted as separate product. | Do not generate. |
| `atlas-kilim-rucksack` | 10 same-SKU | Ryan-provided Drive folder `usable product pics/atlas-kilim-rucksack`; renamed, staged, uploaded, and wired. | Do not generate. |
| `medina-crossbody-cognac` | 2 same-SKU | Drive folder `Bags Screen shots/Cognac Leather Crossbody Purse...` has raw source references only. They must not be wired even when visually close. | Find/download the HF-improved 9-shot set; otherwise ask Ryan/Rocco to export it from HF. |
| `vintage-satchel-light-brown` | 2 same-SKU | Possible plain vertical satchel images are mixed into the same crossbody screenshot area, but no complete 9-shot local set was found. | Select exact vertical-satchel shots only; find/download HF 9-shot if present. |
| `classic-cognac-satchel` | 4 same-SKU | Live assets are identity-safe but thin. | Optionally add one exact detail/scale shot. |
| `woven-leather-backpack` | 9 same-SKU | Ryan-provided Drive folder `usable product pics/woven-leather-backpack`; renamed, staged, uploaded, and wired. | Do not generate. |
| `cognac-brogue-backpack` | 9 same-SKU | Ryan-confirmed Drive folder `usable product pics/cognac-brogue-backpack`; renamed, staged, uploaded, and wired. | Do not generate. |

Note: a previous HTML-wide scrape falsely reported mixed-product galleries
because it counted related-product cards on PDPs. The audit now prefers actual
gallery images and JSON-LD; Supabase product image arrays were checked directly
and are same-product.

All currently resolved backpack source folders have slug-named Drive evidence.
Do not generate `woven-leather-backpack`, `cognac-brogue-backpack`, or
`atlas-kilim-rucksack`.

## Wired This Pass

- `medina-crossbody-tooled-walnut` was expanded from 2 to 5 live PDP images in
  Supabase by adding QA-approved existing Storage files:
  - `medina-crossbody-tooled-walnut-macro-01.webp`
  - `medina-crossbody-tooled-walnut-macro-02.webp`
  - `medina-crossbody-tooled-walnut-macro-03.webp`

Rejected for automatic wiring after contact-sheet QA:

- `atlas-briefcase-vintage` supplier candidates are different bags from the
  current hero.
- `medina-crossbody-cognac` supplier and screenshot candidates are raw source
  references. They were rejected as direct uploads even when the silhouette was
  close.
- `vintage-satchel-light-brown` supplier candidate is a different structured
  satchel with buckles.
- `atlas-kilim-rucksack` temporary supplier candidates were superseded by
  Ryan's confirmed Drive 9-shot folder. Do not use teal variants or two-product
  collage files.
- `classic-cognac-satchel` was visually checked from live Storage assets and is
  acceptable as-is for launch despite only having 4 images.
- `woven-leather-backpack`, `cognac-brogue-backpack`, and
  `atlas-kilim-rucksack` are now resolved from Drive 9-shot folders, uploaded
  to Storage, and wired in Supabase.

Do not treat `atlas-kilim-duffle`, `explorer-rolltop-cognac`,
`heritage-rucksack`, `medina-crossbody-envelope`,
`medina-rucksack-drawstring`, or `vintage-buckle-backpack` as generation
priorities. Live PDPs and the synced `STATIC_PRODUCTS` fallback already show 9
URLs for these products.

## Hidden / Suppressed Products

These are intentionally hidden from the storefront by `lib/hidden-skus.ts`.
Do not spend HF credits on them until the business decides they should launch.

- `test-e2e` — internal QA.
- `marrakech-tote-bordeaux` — supplier/raw hero only; local supplier refs exist.
- `marrakech-tote-noir` — supplier/raw hero only; local supplier refs exist.
- `medina-crossbody-tassel` — supplier/raw hero only; local supplier refs exist.
- `explorer-rolltop-noir` — only macro-style HF set in local archive; not a valid hero.

## Local HF Inventory Highlights

Local HF archive has substantial existing sets:

- `atlas-kilim-duffle`: 18 files.
- `explorer-rolltop-cognac`: 27 files.
- `medina-crossbody-envelope`: 9 files.
- `medina-crossbody-tooled-walnut`: 19 files.
- `medina-duffle`: 18 files.
- `medina-rucksack-drawstring`: 27 files.
- `vintage-buckle-backpack`: 36 files.
- `heritage-rucksack`: 9 files.

Single clean PDP-white HF sources exist for:

- `atlas-briefcase-vintage`
- `atlas-kilim-rucksack`
- `medina-crossbody-cognac`
- `vintage-satchel-light-brown`

## Recommended Workflow

1. Do not generate new images by default.
2. For each low-gallery SKU, inspect existing live Supabase images first.
3. Check Google Drive `usable product pics`.
4. Check local HF archive.
5. Check local supplier pool for non-HF angles only if product identity is clear.
6. Pick 3-5 best images per SKU:
   - 1 clean PDP-white hero.
   - 2 alternate angles.
   - 1 macro/detail.
   - 1 lifestyle/scale if available.
7. Encode to WebP.
8. Upload to Supabase Storage.
9. Update `products.images[]` in Supabase.
10. Rerun:
    - `pnpm exec tsx scripts/audit-catalogue.ts`
    - `pnpm exec tsx scripts/audit-assets.ts`
    - `pnpm exec tsx scripts/audit-media-sources.ts`

Only generate after this workflow proves that a SKU has no acceptable existing
source image for the missing shot type.
