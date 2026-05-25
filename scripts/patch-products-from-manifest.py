#!/usr/bin/env python3
"""PATCH products.images[] for every READY slug. Skip NO-HERO slugs."""
import sys, json, os, urllib.request

SRK = os.environ['SRK']
URL = 'https://xbtabpurfavngwmwtawc.supabase.co'
m = json.load(open('/tmp/manifest.json'))

for slug, info in sorted(m.items()):
    if info['status'] == 'no-hero':
        print(f'  SKIP  {slug:35s} (no hero — stays hidden)')
        continue
    patch = {
        'images': info['images'],
        'status': 'available',
        'featured': True,
    }
    req = urllib.request.Request(
        f'{URL}/rest/v1/products?slug=eq.{slug}',
        data=json.dumps(patch).encode(),
        headers={
            'apikey': SRK,
            'Authorization': f'Bearer {SRK}',
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
        },
        method='PATCH',
    )
    try:
        with urllib.request.urlopen(req) as r:
            ok = r.status < 300
        print(f'  {"OK   " if ok else "FAIL "} {slug:35s} → {len(info["images"])} images')
    except Exception as e:
        print(f'  FAIL  {slug:35s} → {e}')
