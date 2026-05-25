# Hero & Editorial Assets — What We Need

_For Ryan to pick from the HF `Maison Tanneurs ` folder (372 assets) and drop the chosen ones into `~/Downloads/maison-tanneurs-hero-pics/` (or paste IDs/URLs in chat). Rocco encodes + wires._

Every slot below lists: **what we need**, **aspect ratio**, **what's there now**, and **why**.

---

## Homepage — `app/(store)/page.tsx`

### 1. `Hero` — top of page (full viewport, 100svh)
6-slide mixed-media rotation. Photos hold 6.5s, videos play to end.

| Slot | What | Aspect | Status |
|---|---|---|---|
| 1 | Model with red kilim leather bag | 16:9 wide | ✅ live (`Model with red KILIM HD.png`) |
| 2 | French woman, chestnut hair, soft window light, leather satchel | 16:9 wide | ✅ live (HF gen `5c2775c7`) |
| 3 | Tall Black woman in cream caftan, cognac duffle, golden hour Marrakech | 16:9 wide | ✅ live (HF gen `bb35a99e`) |
| 4 | Cinematic Dunes video → ends on leather macro | 16:9, 6s | ✅ live (S1) |
| 5 | Cinematic Paris cobblestone video, model walking with bag | 16:9, 6s | ✅ live (S2) |
| 6 | Black man in tailored cream, noir-leather bag | 16:9 wide | ✅ live (HF gen `edef8f4b`) |

**Want to swap any of these?** Tell me which slot + which HF pic.
**Want more slots (8-9 total)?** Pick 2-3 more cinematic 16:9 — diverse casting, warm light, leather visible.

### 2. `ObjectOfTheEdition` — featured product spotlight
- Uses the **product image** from Supabase (the first `featured=true` SKU). No separate hero needed.

### 3. `ArchitecturalGrid` — 6 product cells (the collection grid)
- Each cell uses the **product image** from Supabase. No separate hero needed.

### 4. `FieldLoop` — full-bleed video band, dark backdrop
| Slot | What | Aspect | Status |
|---|---|---|---|
| Video | Editorial loop — model walking with bag, OR atelier hands at work, OR cinematic still | 16:9, 6–10s, no audio | ✅ live (`hero-model-white-suit-bag.mp4`) — swappable |
| Poster | Frame-grab equivalent (still) | matches video | ✅ live |

**Want a different video here?** Drop in `~/Downloads/maison-tanneurs-hero-pics/` and tell me.

### 5. `ArtisanDossier` — atelier portrait, "I — The Atelier" section
| Slot | What | Aspect | Status |
|---|---|---|---|
| Portrait | Master tanner hands at work, B&W or warm sepia. NO faces. | 4:3 landscape OR 4:5 portrait | ✅ live (`atelier-bw-portrait.webp`) |

**Want a sharper artisan shot?** I have 3 B&W hand-stitching candidates in your HF gens (`72a075b1`, `661996ea`, `574d3070`). Or pick a different one from the folder.

### 6. `BatchGuarantee` — text section, no images currently
- Could become a 3-pillar section with one small editorial photo per pillar (Limited Batches / Full-Grain Patina / Lifetime Repair). Optional.

---

## /about page — `app/(store)/about/page.tsx`

| Slot | What | Aspect | Status |
|---|---|---|---|
| Page hero | Atelier interior — bags hanging from beams, golden light, no model | 21:9 cinematic | ⚠️ uses legacy `/hero/hero-atelier.webp`. Could upgrade to a `Cinematic Bag alone HD.png`-tier shot. |
| `InTheirHands` video | Phone-shot atelier doc footage | 9:16 vertical | ✅ live (`atelier-in-their-hands.mp4`) |
| `ArtisanDossier` | (same as homepage) | — | ✅ shared |

**Need:** one strong 21:9 atelier-interior frame. No model. Warm light, bags visible or leather hides on workbench.

---

## /products page — `app/(store)/products/page.tsx`

Currently no hero image. Just a serif "Drops" headline + tagline + filter bar.

**Could add:** one wide editorial banner at the top, model carrying a bag through a Parisian or Marrakech setting. 21:9 cinematic. Optional but would lift the page.

---

## /products/[slug] — PDP (product detail pages)

Uses the product's `images[]` array from Supabase. No separate editorial needed.

---

## /contact, /legal/* — text-only

No editorial images needed.

---

## Editorial photos already encoded, NOT yet wired

In `/public/brand/editorial/`:
- `cinematic-bag-still.webp` — cinematic still life, bag alone
- `model-white-suit.webp` — model in white suit
- `model-white-suit-salon.webp` — same model, salon interior (already used as FieldLoop poster)
- `model-red-kilim.webp` — duplicate of the hero one (was for editorial use)
- `model-green-bag.webp` — model with green bag
- `model-beach.webp` — model at beach
- `model-paris-night.webp` — male model Paris at night
- `office-black-bag.webp` — black bag in office context

**If you want any of these wired into a specific slot above, just say where.**

---

## Asset register reminder (so I don't pick wrong)

- **Photography style:** Warm light, cream/golden register, Polène/Le-Tanneur tier. No saturated colors except cognac/oxblood as accents.
- **Faces:** OK (we have models). Diverse casting always.
- **Settings:** Marrakech atelier, Parisian apartments/streets/cafés, riad courtyards, Atlas Mountain backdrops in soft light.
- **NEVER:** Souks, hanging lanterns, copper fountains, camels, dunes (✗ except in the campaign-context S1 dunes video, which is deliberate), fantasia horsemen, baked-in text, brand logos.
- **Crops:** Generous negative space — we use big serif overlays on top.

---

## How to give me picks

Three formats all work:

1. **Drop files in folder:** `~/Downloads/maison-tanneurs-hero-pics/` — tell me they're ready.
2. **Paste HF asset URLs in chat:** `https://d8j0ntlcm91z4.cloudfront.net/user_3Cs.../hf_xxx.png` — I'll pull.
3. **Describe by prompt fragment:** "the French woman with chignon at the riad pool, the one with the cognac tote" — I'll search my catalog.

When you give me picks, name the slot from above ("Hero slot 4 = X", "About page hero = Y", etc).
