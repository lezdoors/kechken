# Missing assets — Maison Tanneurs

The HF work list. Every asset referenced by the site but not yet generated lives here. One row per shot to fire.

## How to grep for missing assets

```bash
# Find every code reference to a placeholder
grep -rn 'placeholders/leather' --include="*.tsx" --include="*.ts" .

# Find every site-rendered placeholder path
grep -rn 'leather-MISSING' --include="*.tsx" --include="*.ts" .
```

If `grep` returns rows, those slots are still using placeholder art and need HF generation before launch.

## Placeholder convention

When wiring a new SKU before its HF assets land, point the image src at:

```
/placeholders/leather-MISSING.svg
```

That's the universal "shoot pending" graphic. Once the real shot lands, replace the src with the Supabase Storage URL.

## Current state (2026-05-21)

**Production catalogue: 7 SKUs (all featured, white-bg supplier shots ready):**

| Slug | hero | angles | price |
|---|---|---|---|
| `heritage-rucksack` | cognac, multi-pocket roll-top | 3 | $325 |
| `rolltop-daypack` | cognac, X-strap single-pocket | 3 | $245 |
| `black-stitched-backpack` | black, cream zigzag stitch | 5 | $245 |
| `cognac-brogue-backpack` | cognac, brogue edge | 3 | $265 |
| `classic-cognac-satchel` | cognac, briefcase, dual buckle | 4 | $285 |
| `woven-leather-backpack` | dark brown, hand-woven panels | 2 | $295 |
| `vintage-buckle-backpack` | cognac, safari, multi-pocket | 2 | $225 |

Plus `test-e2e` ($0.30, `featured=false`, hidden) for the Revolut checkout test path.

## Deferred SKUs — supplier shots exist but not white-bg multi-angle

These have product photos in `~/brand-assets/maison-tanneurs/_unsorted/leather-bags-supplier-pool/` but on cream-wall + linen-surface backgrounds rather than pure white. Push to Drop 02 unless we restage them.

| Tentative slug | Style | Have | Need |
|---|---|---|---|
| `black-saddle-tote` | Plain black tote, cream contrast saddle-stitch | 3 angles cream-wall | Hero on white bg + lifestyle |
| `burgundy-saddle-tote` | Plain burgundy tote, cream contrast saddle-stitch | 3 angles cream-wall | Hero on white bg + lifestyle |
| `embossed-saddle-cognac` | Diamond-floral embossed saddle bag | 1 product shot + 1 on Berber rug | Multi-angle white bg + interior |
| `embossed-saddle-teal` | Same silhouette, teal colorway | 1 shot on Berber linen | Multi-angle white bg |
| `embossed-saddle-burgundy` | Same silhouette, burgundy colorway | 1 lifestyle shot only | Hero white-bg + multi-angle |
| `tall-duffle-backpack` | Tall cognac duffle, single pocket | 1 supplier-in-souk phone snap | White-bg studio shot |
| `roll-top-x-strap-rucksack` | Cognac, X-strap, very large | 1 in-souk phone snap (32e97985) | White-bg studio shot |

## HF work list — lifestyle + scale shots for current 7 SKUs

These shots are NOT blockers (every SKU has a hero already) but would lift the PDPs significantly. Prompt suggestions assume the current Le Tanneur / Loewe register locked elsewhere on the site.

### Per-SKU lifestyle shots (5:4 or 4:5 portrait)

| Slug | Prompt — drop into HF Image tab |
|---|---|
| `heritage-rucksack` | *"Cognac full-grain leather rucksack with three buckled pockets, photographed on a leather artisan in cream linen walking through Marrakech medina, soft golden afternoon light, narrow doorway visible behind. Editorial, no logos, no text. 4:5 portrait."* |
| `rolltop-daypack` | *"Cognac full-grain leather roll-top daypack with X-strap, propped on a limestone bench inside a Marrakech riad courtyard, sun spilling through carved arches, cream linen draped beside. Editorial product photography, 4:5 portrait."* |
| `black-stitched-backpack` | *"Black full-grain leather backpack with cream zigzag contrast stitching, on a worn wooden workbench inside a Marrakech atelier, warm side light, brass tools visible in shallow background focus. Editorial, 4:5 portrait."* |
| `cognac-brogue-backpack` | *"Cognac full-grain leather backpack with brogue-style scallop stitching, on a travertine limestone shelf, soft daylight through arched window, cream linen folded beside. Editorial product still, 4:5 portrait."* |
| `classic-cognac-satchel` | *"Cognac leather briefcase satchel with dual brass buckles, on a vintage walnut writing desk inside a sunlit Moroccan interior, leather journals stacked beside, ink-blue inkwell. Editorial, 4:5 portrait, no logos."* |
| `woven-leather-backpack` | *"Dark chocolate hand-woven leather backpack with diamond lattice pattern, on a worn workbench inside a Marrakech leather atelier, hand-cut leather strips visible in shallow background, brass awl tool. 4:5 portrait."* |
| `vintage-buckle-backpack` | *"Cognac full-grain safari-style leather backpack with multiple buckled pockets, on a wooden trunk inside a Moroccan riad, brass map compass beside it, sun spilling across the floor. Editorial, 4:5 portrait."* |

### Catalogue tile / category landing shots

Already covered by `hero-leather-campaign.webp` + `leather-goods-tile.webp` for now. Replace if Drop 02 introduces new categories (Small Leather Goods, Wallets, Belts).

## Drop 02 SKU roadmap (planning)

Tentative wearables to add post-launch. Need Oussama's inventory list + photo upload before any of these can ship.

| Tentative slug | Category | Shots needed |
|---|---|---|
| `saddle-belt-cognac` | Belts | hero + scale + pdp-white + detail-macro |
| `saddle-belt-walnut` | Belts | hero + scale + pdp-white + detail-macro |
| `bifold-wallet-cognac` | Wallets | hero + scale + pdp-white + interior-shot |
| `cardholder-cognac` | Wallets | hero + scale + pdp-white |
| `messenger-bag-cognac` | Bags | hero + scale + pdp-white + lifestyle |
| `babouches-cognac` | Babouches | hero + scale + pdp-white + worn-shot |

## Site-level upgrades (nice-to-haves)

| Slot | Shot type | Aspect | Why |
|---|---|---|---|
| Homepage Hero | Animated 16:9 (Seedance i2v from `hero-leather-campaign.webp`) | 16:9 | Add subtle motion to current still — cinematic upgrade |
| About page | Wide atelier exterior (medina alley + door) | 21:9 cinematic | Sets up "where the atelier sits" narrative |
| Product feed OG image | Branded 1200×630 with MT mark + tagline | 1200×630 | Currently uses hero-leather-campaign.webp; could be branded card |

## HF source archive

All HF originals are in `~/brand-assets/maison-tanneurs/_hf-archive/` organized by intent (heroes / atelier-interiors / model-bag-campaign / material-studies). Site WebPs in Supabase Storage `products` bucket are downsampled WebP renders of those PNG masters.

To trace a site WebP → HF source: see the mapping table in `~/brand-assets/maison-tanneurs/README.md`.

## Adding a new missing-asset row

When a new SKU lands without a finished shoot:

1. Add the SKU to `lib/products.ts` + `supabase/migrations/*.sql` with `images: ["/placeholders/leather-MISSING.svg"]`
2. Append a row to the "Deferred SKUs" table above
3. After firing HF + uploading: replace the Supabase URL, remove the row here
4. Commit message: `Replace placeholder for <slug>` so the diff is easy to scan
