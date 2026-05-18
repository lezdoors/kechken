# Nitra · Photography Reference Register

_Locked 2026-05-17. Updated 2026-05-17: Aigle replaces Everline as the primary register._

## North star

**Aigle's bright-natural-daylight heritage register × Maison Izem painterly figurative graphics × urban Moroccan-cultural subjects.**

Not moody editorial. Not festival streetwear. Not Marrakech tourism. Not bright-pastel DTC.

The brand-promise atmosphere is **transparent, accessible, heritage-credible**. The made-to-order story (every piece printed when you order it, ships in 3–5 days, no overstock destroyed) needs imagery that reads honest — natural daylight, real settings, no smoke-and-mirrors editorial darkness.

| In | Out |
|---|---|
| Bright natural daylight, midday or soft window light | Moody warm-light editorial darkness |
| Earth-tone palette (cream, indigo, terracotta, onyx, brass) | Saturated digital primaries, neon, pastel-DTC |
| Mix of location-in-context + clean studio neutral | All-location or all-studio monotony |
| Urban Moroccan-cultural settings (Brooklyn brownstone, Lower East Side, riad arch, medina wall) | Outdoor-adventure / hiking / nature romance |
| Cinematic depth — figure in environment, not floating | Garment hovering on no background |
| Generous whitespace + heritage badge system ("Drop 01", "Print-to-order", "Ships in 3–5 days") | No labels, no provenance markers |
| Painterly oil-on-canvas register for the art-print graphics themselves (Izem language) | Vector flatness, illustration-software look |
| Single figure or paired figures in restrained composition | Crowded group shots |
| Heritage typography restraint (Inter Tight, sparse hierarchy) | Decorative display fonts, ornamental flourish |

## Reference brands to match in register

- **Aigle** (aigle.com/int) — **primary** · bright natural daylight, heritage badge system, lifestyle restraint, mission-driven copy
- **Casablanca Paris** — luxe Mediterranean palette, contemplative composition
- **Daily Paper** — pattern-on-streetwear translation, drop cadence
- **Aimé Leon Dore** — editorial menswear restraint, NY-rooted urban context
- **Maison Izem** — painterly Moroccan figurative graphics (for the printed artwork itself)

## Reference brands NOT to match

- Everline Studio — moody warm-light editorial (was a wrong lock; too atmospheric for the made-to-order honesty)
- Generic dropship Shopify lookbooks (overlit, oversaturated, plastic)
- Festival/boho streetwear (cluttered, vintage-clipart vibes)
- "Made in Morocco" tourism aesthetic (souks, mint tea piles, stock-photo feel)
- DTC pastel (Allbirds, Cuts, Vuori — wrong lane)
- Outdoor-adventure heritage (Aigle's hiking/parka/boot subjects don't translate — borrow the lighting, not the activity)

## Higgsfield model recommendations

| Use case | Model | Notes |
|---|---|---|
| Hero campaign still (one image, max quality) | `nano_banana_2` (Pro, 2 credits) | Best skin/fabric detail. Toggle Unlimited. |
| Product-on-model lookbook variations | `nano_banana` (1 credit) | Same prompts, cheaper iterations |
| Editorial-mood scene stills (no product focus) | `FLUX.2 Pro` | Strong on atmosphere + natural light |
| Painterly art-graphic generation (the print artwork itself) | `Seedream` or `nano_banana_2` | When generating the actual Tuareg/Gnawa/caravan oils that get printed |

**Reminder**: every model meters despite "Unlimited" badges. Preflight cost via `get_cost`. Never default to Pro tier when 1-credit nano_banana works for iteration.

## Aspect ratios

| Surface | Ratio |
|---|---|
| Homepage hero (full-bleed) | 16:9 landscape, or 4:5 if vertical hero |
| PDP main image | 4:5 portrait |
| PDP detail crops | 1:1 square |
| IG editorial | 4:5 portrait |
| TikTok / IG Stories | 9:16 vertical |

## Composition rules

1. **One figure, one accent.** Inherited from the Maison Izem language. The figure carries the frame; one tiny element (a sprig, a small object, a hand) adds tension.
2. **Light is natural, midday or soft window.** Not moody studio. Not flat overhead. The made-to-order honesty needs daylight.
3. **Setting is urban Moroccan-cultural, not Moroccan-tourism.** A Brooklyn brownstone with the figure leaning on iron railings beats a Marrakech medina alley. A clean cream studio backdrop beats a souk. Authenticity over postcard.
4. **Wardrobe restricted to the brand palette.** Cream + indigo + terracotta + onyx + brass.
5. **No typography in the image.** Wordmarks composited in Canva or rendered by `/brand/wordmark`. Models hallucinate garbled text.
6. **No brand names in the prompt.** Translate to attribute language. "Aigle-mood" → "bright midday natural daylight, heritage menswear restraint, earth-tone wardrobe, urban architectural backdrop, photographed with the editorial calm of a French heritage brand campaign."

---

_See `docs/brand/HF-PROMPTS-DROP-01.md` for the actual prompts to fire when ready._
