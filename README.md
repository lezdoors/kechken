# Maison Tanneurs

Hand-stitched leather bags and small leather goods from a small Marrakech atelier. Full-grain leather, solid brass hardware, contrast saddle-stitch. Ready to ship from Morocco via DHL or FedEx — 3–5 days worldwide.

Sister brand to **Maison Izem** (home & interior) and **Maison Chapuis** (ceramics, tagines, glassware), all under Akal Digital Services Ltd.

Domain: `maisontanneurs.com`

## Quick start

```bash
pnpm install
pnpm dev
```

Site runs at http://localhost:3000.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 App Router, React 19, Tailwind 4 |
| Commerce | Revolut Checkout / Acquiring |
| Data | Supabase (Postgres + Storage) |
| Email | Resend (transactional) |
| Fulfillment | Direct ship from the Marrakech atelier via DHL / FedEx business accounts |
| Hosting | Vercel |

## Brand identity

- Cream/bone base, ink primary, brass accent, leather cognac
- Cormorant Garamond (serif), Inter Tight (sans), JetBrains Mono (utility)
- Sparse type hierarchy, generous negative space
- Restraint over ornament — Le Tanneur / Loewe / Lemaire register
- Photography: warm chiaroscuro, full-grain leather + brass, Marrakech atelier context — no souks, no lanterns, no faces (hands only)

## Repo conventions

- This is **Next.js 16** — read `node_modules/next/dist/docs/` before adding APIs (breaking changes from 14/15)
- No invented copy; nothing ships with TBDs in production
- Brand identity is config-driven — see `app/layout.tsx` metadata + `app/icon.png` + `public/brand/maison-tanneurs.png`
- Wordmark renderer: `/brand/wordmark` route (server-side ImageResponse, dynamic SVG)

## Drop 01

Two leather SKUs at launch: Heritage Rucksack (€325) and Roll-Top Daypack (€245). Both full-grain cognac Moroccan leather, solid brass hardware, hand-stitched in Marrakech.

## Family

Maison Tanneurs sits alongside two sister brands under Akal Digital Services Ltd:

- **Maison Izem** — Moroccan home + interior (poufs, lighting, rugs, furniture). [maisonizem.com](https://www.maisonizem.com)
- **Maison Chapuis** — Ceramics, tagines, glassware, Berber textiles. [maison-chapuis.com](https://maison-chapuis.com)
- **Maison Tanneurs** — Hand-stitched leather. *(this repo)*

Each brand operates under its own forming entity with its own bank + payment acquirer per the Akal blast-radius isolation strategy.
