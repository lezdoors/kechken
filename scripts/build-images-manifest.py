#!/usr/bin/env python3
"""
Build the canonical Maison Tanneurs product-image mapping from Supabase Storage.

For each slug in HIDDEN_SKUS:
  1. List drop-02/ files matching the slug
  2. Choose a canonical hero per priority
  3. Build a 5-9 image gallery (hero first, then variety)
  4. Output:
     - JSON map of {slug: {images: [...], status: ready|partial|hidden}}
     - Markdown manifest

This script ONLY READS Storage. It does not mutate anything.
"""
import sys, json, os, re, urllib.request
from collections import defaultdict

SRK = os.environ.get('SRK') or os.environ['SUPABASE_SERVICE_ROLE_KEY']
URL = 'https://xbtabpurfavngwmwtawc.supabase.co'

HIDDEN = [
    'atlas-briefcase-vintage', 'atlas-kilim-duffle', 'atlas-kilim-rucksack',
    'atlas-messenger-laptop', 'explorer-rolltop-cognac', 'explorer-rolltop-noir',
    'heritage-rucksack', 'marrakech-tote-bordeaux', 'marrakech-tote-cognac',
    'marrakech-tote-noir', 'medina-crossbody-cognac', 'medina-crossbody-envelope',
    'medina-crossbody-tassel', 'medina-crossbody-tooled-walnut', 'medina-duffle',
    'medina-rucksack-drawstring', 'vintage-buckle-backpack', 'vintage-satchel-light-brown',
]
# Also include the 4 already-live SKUs so manifest is complete
LIVE = [
    'black-stitched-backpack', 'classic-cognac-satchel', 'cognac-brogue-backpack',
    'woven-leather-backpack',
]
ALL = sorted(set(HIDDEN + LIVE))

HIDDEN_SORTED = sorted(HIDDEN, key=lambda s: -len(s))

def list_bucket(folder):
    req = urllib.request.Request(
        f'{URL}/storage/v1/object/list/products',
        data=json.dumps({'prefix': f'{folder}/', 'limit': 1000, 'offset': 0}).encode(),
        headers={'apikey': SRK, 'Authorization': f'Bearer {SRK}', 'Content-Type': 'application/json'},
        method='POST',
    )
    with urllib.request.urlopen(req) as r:
        return [f['name'] for f in json.loads(r.read())]

drop_02 = list_bucket('drop-02')
drop_01 = list_bucket('drop-01')

# Group files by slug + (folder, kind, sort_key)
by_slug = defaultdict(list)
for name in drop_02:
    base = name.replace('drop-02/', '')
    matched = False
    for slug in HIDDEN_SORTED + LIVE:
        if base.startswith(slug + '-'):
            rest = base[len(slug)+1:].replace('.webp', '')
            by_slug[slug].append(('drop-02', rest, base))
            matched = True
            break
    if not matched:
        by_slug['_orphan'].append(('drop-02', base.replace('.webp',''), base))

for name in drop_01:
    base = name.replace('drop-01/', '')
    for slug in ALL:
        if base.startswith(slug + '-'):
            rest = base[len(slug)+1:].replace('.webp', '')
            by_slug[slug].append(('drop-01', rest, base))
            break

def url_for(folder, base):
    return f'{URL}/storage/v1/object/public/products/{folder}/{base}'

# Banned suffixes anywhere in images[]
BANNED = ('-supplier-', '-pdp-hero', '-scale-hero', '-benisouk-', '-dealer-',
          '-tannery-raw-', '-pexels-', '-workshop-')
def banned(name):
    return any(b in name for b in BANNED) or name.endswith('-pdp-hero.webp') or name.endswith('-scale-hero.webp')

# Priority for HERO selection. Macros are last-resort heroes — they're meant
# for gallery position 2-3 but if a SKU has nothing else, a macro-04 beats
# leaving the product hidden.
HERO_PRIORITY = ['pdp-white', 'pdp-hero', 'scale-hero', 'scale', 'hero',
                 'pdp-04', 'scale-04', 'pdp-01', 'scale-01',
                 'macro-04', 'macro-01', 'archive-1']

# Priority for gallery (after hero)
def gallery_score(rest):
    """Lower = earlier in gallery."""
    # Prefer pdp-04 then 05..09 then 01..03, then alt, then scale, then macro
    if rest == 'pdp-white': return 0
    if rest == 'scale': return 1
    if re.match(r'^pdp-0[4-9]$', rest): return 10 + int(rest[-1])
    if re.match(r'^pdp-0[1-3]$', rest): return 30 + int(rest[-1])
    if re.match(r'^scale-0[4-9]$', rest): return 100 + int(rest[-1])
    if re.match(r'^scale-0[1-3]$', rest): return 130 + int(rest[-1])
    if re.match(r'^macro-0[4-9]$', rest): return 200 + int(rest[-1])
    if re.match(r'^macro-0[1-3]$', rest): return 230 + int(rest[-1])
    if re.match(r'^pdp-alt-0[4-9]$', rest): return 300 + int(rest[-1])
    if re.match(r'^pdp-alt-0[1-3]$', rest): return 330 + int(rest[-1])
    if re.match(r'^scale-alt-0[4-9]$', rest): return 400 + int(rest[-1])
    if re.match(r'^scale-alt-0[1-3]$', rest): return 430 + int(rest[-1])
    if rest.startswith('archive-'): return 500 + int(rest.split('-')[-1])
    if rest == 'pdp': return 600
    if rest == 'macro': return 601
    return 999

manifest = {}
for slug in ALL:
    entries = by_slug.get(slug, [])
    # Filter banned
    usable = [(f, k, n) for (f, k, n) in entries if not banned(n)]

    # Pick hero
    hero = None
    for tag in HERO_PRIORITY:
        for (f, k, n) in usable:
            if k == tag:
                hero = (f, k, n)
                break
        if hero:
            break

    # If still no hero, pick the first pdp-* or scale-* shot
    if not hero:
        sorted_usable = sorted(usable, key=lambda x: gallery_score(x[1]))
        for entry in sorted_usable:
            if entry[1].startswith('pdp') or entry[1].startswith('scale') or entry[1] == 'hero':
                hero = entry
                break

    # Build gallery: hero first, then top 8 more sorted by gallery_score.
    # Dedupe by base filename so we never get two URLs that resolve to the
    # same image (e.g. when a file lives in both drop-01 and drop-02).
    gallery = []
    seen_bases = set()
    if hero:
        gallery.append(url_for(hero[0], hero[2]))
        seen_bases.add(hero[2])
        remaining = sorted([e for e in usable if e[2] not in seen_bases], key=lambda x: gallery_score(x[1]))
        for entry in remaining:
            if entry[2] in seen_bases:
                continue
            gallery.append(url_for(entry[0], entry[2]))
            seen_bases.add(entry[2])
            if len(gallery) >= 9:
                break

    status = 'ready' if (hero and len(gallery) >= 3) else ('partial' if hero else 'no-hero')
    manifest[slug] = {
        'status': status,
        'hero_file': hero[2] if hero else None,
        'images': gallery,
        'total_storage_files': len(entries),
        'usable_files': len(usable),
        'banned_files': len(entries) - len(usable),
    }

print(json.dumps(manifest, indent=2))
