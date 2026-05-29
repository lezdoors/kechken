#!/usr/bin/env python3
"""Render manifest.json into a human-readable markdown doc."""
import json, os, sys
from datetime import datetime

DRIVE_ROOT = '/Users/lezdoors/Library/CloudStorage/GoogleDrive-ryanaoufal@gmail.com/My Drive/Maison Tanneurs/usable product pics'
LOCAL_ROOT = '/Users/lezdoors/maisontanneurs/public/products'

m = json.load(open('/tmp/manifest.json'))

def drive_folder_for(slug):
    if not os.path.isdir(DRIVE_ROOT):
        return None
    candidates = []
    for entry in os.listdir(DRIVE_ROOT):
        if slug in entry.lower().replace(' ', '-'):
            candidates.append(entry)
    return candidates if candidates else None

def local_folder_for(slug):
    p = os.path.join(LOCAL_ROOT, slug)
    return p if os.path.isdir(p) else None

lines = []
W = lines.append

W('# Product Images — Canonical Manifest')
W('')
W(f'_Generated: {datetime.now().strftime("%Y-%m-%d %H:%M")} by `scripts/build-images-manifest.py`_')
W('')
W('Single source of truth for **every Maison Tanneurs product image**: what\'s in Supabase Storage, what\'s on Drive, what\'s wired to `products.images[]` on the live site, and what state each SKU is in.')
W('')
W('**Stop hunting.** When you need to add, replace, or audit a product photo, start here.')
W('')
W('---')
W('')
W('## Locations')
W('')
W('| What | Where |')
W('|---|---|')
W('| Live storefront | https://maisontanneurs.com |')
W('| Supabase Storage (canonical) | `https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-02/<slug>-<kind>.webp` |')
W('| Legacy Storage | `products/drop-01/` (5 SKUs from launch — do not add more there) |')
W('| Drive source-of-pixels | `My Drive/Maison Tanneurs/usable product pics/<slug>/` |')
W('| Local mirror (Drop 02 only) | `~/maisontanneurs/public/products/<slug>/` (9 SKUs, the ones Rocco generated 2026-05-24) |')
W('| Wired array | Supabase Postgres `products.images[]` per slug |')
W('| Hidden-SKU escape hatch | `lib/hidden-skus.ts` (only slugs with no canonical hero) |')
W('')
W('---')
W('')
W('## Naming convention (Supabase Storage `drop-02/`)')
W('')
W('| Suffix | Meaning | Used as |')
W('|---|---|---|')
W('| `<slug>-pdp-white.webp` | Seamless studio cyclorama, hero | `images[0]` ideal |')
W('| `<slug>-scale.webp` | Lifestyle / in-context hero | `images[0]` or `[1]` |')
W('| `<slug>-pdp-04.webp` | HF Shots set, shot-04 = canonical front 3/4 | gallery |')
W('| `<slug>-pdp-01..09.webp` | HF Shots gallery angles | gallery 2+ |')
W('| `<slug>-scale-01..09.webp` | HF Shots lifestyle gallery | gallery 2+ |')
W('| `<slug>-macro-01..09.webp` | Detail crops (stitch, brass, grain) | gallery 2+ |')
W('| `<slug>-pdp-alt-NN.webp` | Alt lighting / styling variant | gallery fallback |')
W('| `<slug>-supplier-*.webp` | Original supplier raw — **BANNED** in `images[]` | archived only |')
W('| `<slug>-pdp-hero.webp` | Legacy naming — **BANNED** by audit | replace with `pdp-white` |')
W('| `<slug>-scale-hero.webp` | Legacy naming — **BANNED** by audit | replace with `scale` |')
W('')
W('Hero priority order applied by the manifest builder:')
W('1. `pdp-white` 2. `pdp-hero` 3. `scale-hero` 4. `scale` 5. `hero` 6. `pdp-04` 7. `scale-04` 8. `pdp-01` 9. `scale-01` 10. `macro-04` (last resort) 11. `macro-01` 12. `archive-1`')
W('')
W('---')
W('')

# Sort: ready first, then partial, then no-hero
ordered = sorted(m.items(), key=lambda kv: ({'ready':0,'partial':1,'no-hero':2}[kv[1]['status']], kv[0]))

W('## Status summary')
W('')
W('| Status | Count | Meaning |')
W('|---|---|---|')
ready_n = sum(1 for _,v in m.items() if v['status']=='ready')
partial_n = sum(1 for _,v in m.items() if v['status']=='partial')
nohero_n = sum(1 for _,v in m.items() if v['status']=='no-hero')
W(f'| READY | {ready_n} | Live on site, canonical hero + ≥3 gallery shots |')
W(f'| PARTIAL | {partial_n} | Live but thin gallery (≤3 shots) — find/download the finished HF/Drive set before generating |')
W(f'| NO-HERO | {nohero_n} | Hidden by `lib/hidden-skus.ts` — source refs only or no canonical hero; find finished HF/Drive output first |')
W('')
W('---')
W('')

for status_label, status_key in [('READY (live on site)', 'ready'), ('PARTIAL (live but thin)', 'partial'), ('NO-HERO (hidden until finished HF/Drive hero is found)', 'no-hero')]:
    W(f'## {status_label}')
    W('')
    for slug, info in ordered:
        if info['status'] != status_key:
            continue
        W(f'### `{slug}`')
        W('')
        W(f'- **Storage files:** {info["total_storage_files"]} ({info["usable_files"]} usable, {info["banned_files"]} supplier-raw / banned)')
        if info['hero_file']:
            W(f'- **Hero:** `{info["hero_file"]}`')
        else:
            W('- **Hero:** _none — find/download finished HF/Drive hero first; generate only after visual search fails_')

        drive = drive_folder_for(slug)
        if drive:
            W(f'- **Drive source:** `usable product pics/{drive[0]}/`' + (f' (+ {len(drive)-1} more)' if len(drive)>1 else ''))
        local = local_folder_for(slug)
        if local:
            W(f'- **Local mirror:** `public/products/{slug}/`')

        if info['images']:
            W('')
            W('Wired to `products.images[]`:')
            W('')
            for i, u in enumerate(info['images']):
                fname = u.split('/')[-1]
                folder = 'drop-02' if 'drop-02' in u else 'drop-01'
                W(f'{i}. `{folder}/{fname}`')
        W('')

W('---')
W('')
W('## How to add a new shot')
W('')
W('### 1. Generate the shot')
W('Use the `maison-tanneurs-product-shots` skill (in `~/.claude/skills/`). It locks the brand register, gives you the prompt, and the model order (nano_banana_2 → seedream_v5_pro → flux_2_pro).')
W('')
W('### 2. Re-encode to WebP q=82')
W('```bash')
W('cwebp -q 82 -resize 3840 0 ~/Downloads/<raw>.png -o /tmp/<slug>-<kind>.webp')
W('```')
W('')
W('Canonical kinds: `pdp-white`, `scale`, `pdp-NN`, `scale-NN`, `macro-NN`, `pdp-alt-NN`.')
W('')
W('### 3. Upload to Supabase Storage `drop-02/`')
W('```bash')
W('export SRK=$(cat ~/.rocco/maisontanneurs-supabase.json | python3 -c "import json,sys; print(json.load(sys.stdin)[\'service_role_key\'])")')
W('curl -X POST \\')
W('  -H "Authorization: Bearer $SRK" \\')
W('  -H "Content-Type: image/webp" \\')
W('  --data-binary @/tmp/<slug>-<kind>.webp \\')
W('  "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/products/drop-02/<slug>-<kind>.webp"')
W('```')
W('')
W('### 4. Rebuild + apply the manifest')
W('```bash')
W('cd ~/maisontanneurs')
W('SRK=$(cat ~/.rocco/maisontanneurs-supabase.json | python3 -c "import json,sys; print(json.load(sys.stdin)[\'service_role_key\'])")')
W('SRK=$SRK python3 scripts/build-images-manifest.py > /tmp/manifest.json')
W('SRK=$SRK python3 scripts/patch-products-from-manifest.py')
W('SRK=$SRK python3 scripts/write-images-manifest-md.py')
W('```')
W('')
W('### 5. Remove the slug from `lib/hidden-skus.ts` if it was hidden')
W('')
W('### 6. Commit + push (Vercel auto-deploys)')
W('')
W('---')
W('')
W('## Build pipeline scripts')
W('')
W('| Script | Reads | Writes |')
W('|---|---|---|')
W('| `scripts/build-images-manifest.py` | Supabase Storage `drop-02/` + `drop-01/` | `/tmp/manifest.json` |')
W('| `scripts/patch-products-from-manifest.py` | `/tmp/manifest.json` | Supabase `products.images[]` rows |')
W('| `scripts/write-images-manifest-md.py` | `/tmp/manifest.json` + Drive folder | `docs/PRODUCT-IMAGES-MANIFEST.md` (this file) |')
W('')
W('All three are idempotent. Run them in order any time you add or change Storage files.')
W('')

print('\n'.join(lines))
