-- Maison Tanneurs Drop 01 — seed 2 leather SKUs
-- Mirror of lib/products.ts STATIC_PRODUCTS. When live, the site code reads
-- from this table; if Supabase is unreachable, the route falls back to
-- STATIC_PRODUCTS for parity.

insert into products (title, slug, price, images, category, dimensions, weight_lbs, materials, available_quantity, status, featured, description)
values
  (
    'Heritage Rucksack',
    'heritage-rucksack',
    32500,
    array[
      '/products/drop-01/heritage-rucksack-01-v2.webp',
      '/products/drop-01/heritage-rucksack-02-v2.webp',
      '/products/drop-01/heritage-rucksack-03.webp'
    ],
    'Leather Goods',
    '{"size": "45cm × 32cm × 18cm · multi-pocket"}'::jsonb,
    3,
    array[
      'Full-grain Moroccan leather',
      'Solid brass hardware',
      'Hand-stitched in Marrakech'
    ],
    30,
    'available',
    true,
    'Full-grain cognac leather rucksack with three buckled exterior pockets and a roll-top main compartment. Hand-stitched and brass-fitted by Marrakech leather artisans. Patinas with wear.'
  ),
  (
    'Roll-Top Daypack',
    'rolltop-daypack',
    24500,
    array[
      '/products/drop-01/rolltop-daypack-01.webp',
      '/products/drop-01/rolltop-daypack-02.webp',
      '/products/drop-01/rolltop-daypack-03.webp'
    ],
    'Leather Goods',
    '{"size": "42cm × 30cm × 14cm · single-pocket"}'::jsonb,
    2.5,
    array[
      'Full-grain Moroccan leather',
      'Solid brass hardware',
      'Hand-stitched in Marrakech'
    ],
    30,
    'available',
    true,
    'Cleaner cousin to the Heritage Rucksack. Single front pocket, X-strap closure, soft Moroccan tan leather that softens into the body with use. Built for daily carry.'
  )
on conflict (slug) do nothing;
