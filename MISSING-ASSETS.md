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

## Deferred SKUs — supplier shots exist, need restaging + multi-angle

These have product photos in `~/brand-assets/maison-tanneurs/_unsorted/leather-bags-supplier-pool/` but on cream-wall + linen-surface backgrounds or in-souk phone snaps rather than clean white-bg studio. **Renamed to brand-canonical slugs.** Fire the listed HF prompts to fill the gaps.

| Final slug | Style | Have (source files) | Gap |
|---|---|---|---|
| `marrakech-tote-noir` | Plain black tote, cream contrast saddle-stitch | 3 angles cream-wall (image_4b5ea538, image_8ed7f752, image_b9024dfd) | White-bg hero + lifestyle |
| `marrakech-tote-bordeaux` | Plain burgundy tote, cream contrast saddle-stitch | 3 angles cream-wall (image_3028860e, image_7842a5d3, image_a5c51ba1) | White-bg hero + lifestyle |
| `medina-crossbody-cognac` | Diamond-floral embossed saddle crossbody | 1 product (brown-leather-bag-small) + 1 Berber-rug (Morocco0044) | Multi-angle white-bg |
| `medina-crossbody-jade` | Same silhouette, jade-teal colorway | 1 on Berber linen (0cf6e4_*) | Multi-angle white-bg |
| `medina-crossbody-bordeaux` | Same silhouette, burgundy colorway | 1 lifestyle hanging on hook (Morocco0026) | Hero white-bg + multi-angle |
| `medina-duffle` | Tall cognac duffle, single pocket | 1 supplier-in-souk phone snap (01fd3484) | White-bg hero + multi-angle |
| `explorer-rucksack` | Cognac X-strap, multi-pocket, very large | 2 in-souk snaps (86b8c4fb, 32e97985) | White-bg hero + lifestyle |

## HF prompts — restage these 7 SKUs

**Workflow per shot:**
1. **HF UI → Image tab**, model: `nano_banana_2` (best for reference-image fidelity, 2 credits per shot — toggle Unlimited)
2. Upload the source file from `~/brand-assets/maison-tanneurs/_unsorted/leather-bags-supplier-pool/` as the **reference image**
3. Paste the prompt below
4. Aspect: **1:1 square** for white-bg PDP shots, **4:5 portrait** for lifestyle
5. Generate 2-4 per slot, pick strongest, save to local

Then ping me with the chosen filenames and I'll upload + wire into the SKU.

---

### `marrakech-tote-noir` — 2 shots to fire

**Reference:** `image_4b5ea538-e7fd-46fd-a672-d60fa0fbf08d.heic.webp` (or `image_8ed7f752`, `image_b9024dfd`)

**Shot 1 — White-bg hero (1:1):**
```
Restage this exact black full-grain leather tote bag on a pure
white seamless cyclorama background, photographed in soft
overhead studio light. Keep the leather grain, the cream contrast
saddle-stitching, and the bag's silhouette identical to the
reference. Editorial product photography, no shadows below the
bag except a faint contact shadow, medium-format quality, no
typography, no logos. 1:1 square.
```

**Shot 2 — Lifestyle (4:5):**
```
Same black full-grain leather tote bag from the reference image,
sitting on a sun-warmed limestone bench inside a minimalist
Marrakech atelier. Soft afternoon side-light catches the cream
contrast stitching. Cream linen folded beside. Editorial 4:5
portrait composition, no logos, no text.
```

---

### `marrakech-tote-bordeaux` — 2 shots to fire

**Reference:** `image_3028860e-ccdf-426b-9625-c5e64dc070d3.heic.webp`

**Shot 1 — White-bg hero (1:1):**
```
Restage this exact burgundy / oxblood full-grain leather tote bag
on a pure white seamless cyclorama background, photographed in
soft overhead studio light. Preserve the leather grain, the cream
contrast saddle-stitching, and the bag's silhouette identical to
the reference. Faint contact shadow only. Editorial, no
typography, 1:1 square.
```

**Shot 2 — Lifestyle (4:5):**
```
Same burgundy full-grain leather tote bag from the reference,
placed on a warm-toned walnut writing desk near a sunlit Moroccan
window, ivory linen handkerchief draped to one side, ink-blue
inkwell visible. Soft daylight, cinematic shadows, no logos,
no text. 4:5 portrait.
```

---

### `medina-crossbody-cognac` — 3 shots to fire

**Reference:** `brown-leather-bag-small.jpg.webp` (cognac embossed saddle bag, half-moon silhouette with diamond floral motif)

**Shot 1 — White-bg hero (1:1):**
```
Restage this exact cognac full-grain leather crossbody saddle
bag on a pure white seamless cyclorama background, soft overhead
studio light. Keep the embossed diamond-floral motif on the flap
exactly as in the reference. Preserve the shoulder strap, the
silhouette, the natural patina. Faint contact shadow only.
Editorial product photography, 1:1 square, no typography.
```

**Shot 2 — Open / interior (1:1):**
```
Same cognac embossed crossbody saddle bag, photographed with the
flap open showing a clean leather interior in a slightly darker
tan tone, single inner pocket visible. Pure white seamless
cyclorama, overhead light, 1:1 square. Editorial detail shot.
```

**Shot 3 — Lifestyle (4:5):**
```
Same cognac embossed crossbody saddle bag worn over the shoulder
by a refined Mediterranean woman in cream linen, walking through
a Marrakech medina alley with carved-arch doorway in soft focus
background, warm afternoon light. Editorial, 4:5 portrait,
no logos.
```

---

### `medina-crossbody-jade` — 2 shots to fire

**Reference:** `0cf6e4_e7b3984a64fd4a79a057f99d4e3ce414_mv2.jpg.webp` (jade-teal embossed crossbody)

**Shot 1 — White-bg hero (1:1):**
```
Restage this exact jade-teal full-grain leather crossbody saddle
bag on a pure white seamless cyclorama background, soft overhead
studio light. Keep the embossed diamond-floral motif on the flap
identical to the reference. Saturate the teal naturally — not
electric, more aged-patina mineral green. Faint contact shadow.
Editorial, 1:1 square, no typography.
```

**Shot 2 — Lifestyle (4:5):**
```
Same jade-teal embossed crossbody saddle bag resting on a cream
Berber wool rug, soft afternoon daylight, woven textile shadows.
Editorial still-life, 4:5 portrait, no logos, no text.
```

---

### `medina-crossbody-bordeaux` — 3 shots to fire

**Reference:** `Morocco0026.jpg.webp` (burgundy embossed crossbody hanging on a hook in a Moroccan room)

**Shot 1 — White-bg hero (1:1):**
```
Restage this exact burgundy / oxblood full-grain leather crossbody
saddle bag on a pure white seamless cyclorama background, soft
overhead studio light. Keep the embossed diamond-floral motif on
the flap exactly as in the reference image. Saturate the burgundy
as a deep aged wine tone. Faint contact shadow. Editorial,
1:1 square, no typography, no logos.
```

**Shot 2 — Three-quarter angle (1:1):**
```
Same burgundy embossed crossbody at a 3/4 angle showing the
shoulder strap and the side panel detail, pure white seamless
cyclorama background, overhead light. Editorial product
photography, 1:1 square.
```

**Shot 3 — Lifestyle (4:5):**
```
Same burgundy embossed crossbody hanging on a wrought-iron hook
inside a sunlit Moroccan riad, plaster wall, narrow brass mirror
visible in shallow background. Warm afternoon side light.
Editorial 4:5 portrait, no logos.
```

---

### `medina-duffle` — 3 shots to fire

**Reference:** `01fd3484-0349-4c88-895c-71b609cddbf2.JPG` (souk-context phone snap of a tall cognac duffle backpack)

**Shot 1 — White-bg hero (1:1):**
```
Restage this exact tall cognac full-grain leather duffle backpack
on a pure white seamless cyclorama background, soft overhead
studio light. Cylindrical silhouette with single front buckled
pocket, drawstring top closure with buckle flap, vertical
shoulder strap. Preserve the leather grain and brass hardware
from the reference. Faint contact shadow. Editorial, 1:1 square,
no typography, no logos.
```

**Shot 2 — Side profile (1:1):**
```
Same tall cognac leather duffle from the reference, side profile
view showing the full vertical silhouette and the side seam
saddle-stitching, pure white seamless cyclorama, overhead light.
Editorial, 1:1 square.
```

**Shot 3 — Lifestyle worn (4:5):**
```
Same tall cognac leather duffle worn cross-body by a young
Mediterranean man in a cream linen shirt, walking through a
Marrakech medina alley at golden hour, warm sun spilling along
the limestone walls. Bag dominant in the lower-foreground.
Editorial 4:5 portrait, no logos.
```

---

### `explorer-rucksack` — 3 shots to fire

**Reference:** `86b8c4fb-064d-40eb-9685-e3cf3f9b6e3c.JPG` (large cognac X-strap rucksack, multi-pocket, tile-floor supplier shot)

**Shot 1 — White-bg hero (1:1):**
```
Restage this exact large cognac full-grain leather rucksack with
double X-strap closure on the main compartment, multiple
exterior pockets, brass buckles throughout, on a pure white
seamless cyclorama background. Soft overhead studio light,
faint contact shadow. Editorial product photography, 1:1 square,
no typography, no logos.
```

**Shot 2 — Back / strap detail (1:1):**
```
Same cognac X-strap rucksack from the reference, photographed
from the back showing the dual shoulder straps and the top
handle, pure white seamless cyclorama, overhead light.
Editorial, 1:1 square.
```

**Shot 3 — Lifestyle worn (4:5):**
```
Same cognac X-strap rucksack worn on the back by a young
Mediterranean man in a black puffer jacket and jeans, walking
through a sun-soaked Marrakech medina alley with ornate carved-
arch doorway behind. Warm Mediterranean daylight, cinematic
shadows. Editorial 4:5 portrait, no logos, no text.
```

---

## Output naming convention when you save HF results

Save the chosen WebP from each batch to `~/Downloads/` with this exact filename pattern:

```
<slug>-<NN>.webp
```

Where `NN` is `01` for hero white-bg, `02-04` for additional angles, `05` for lifestyle. Examples:

```
marrakech-tote-noir-01.webp        ← white-bg hero
marrakech-tote-noir-05.webp        ← lifestyle 4:5
medina-crossbody-cognac-01.webp    ← white-bg hero
medina-crossbody-cognac-02.webp    ← open interior
medina-crossbody-cognac-05.webp    ← lifestyle 4:5
```

When all 7 SKUs are shot, ping me with "renders ready in ~/Downloads" and I'll batch-upload to Supabase Storage + seed the SKUs into the catalog + remove the corresponding row from the deferred table above.

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
