-- Drop 01 catalog expansion: 5 new leather backpack/satchel SKUs.
-- Real supplier shots uploaded to Supabase Storage products/drop-01/.
-- Stays parallel to lib/products.ts STATIC_PRODUCTS — both updated.

insert into products (
  title, slug, price, images, category, dimensions, weight_lbs, materials,
  available_quantity, status, featured, description
) values
  (
    'Black Stitched Backpack',
    'black-stitched-backpack',
    24500,
    array[
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/black-stitched-backpack-01.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/black-stitched-backpack-02.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/black-stitched-backpack-03.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/black-stitched-backpack-04.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/black-stitched-backpack-05.webp'
    ],
    'Leather Goods',
    '{"size": "40cm × 28cm × 12cm · single-buckle flap"}'::jsonb,
    2.5,
    array['Full-grain Moroccan leather', 'Cream contrast zigzag stitching', 'Solid brass buckle', 'Tan-finished interior', 'Hand-stitched in Marrakech'],
    20,
    'available',
    true,
    'Boxy square-cut backpack in deep black full-grain leather, framed by a cream zigzag stitch border. Single brass buckle closure, internal zip pocket, dual adjustable shoulder straps. Editorial silhouette, daily-carry size.'
  ),
  (
    'Cognac Brogue Backpack',
    'cognac-brogue-backpack',
    26500,
    array[
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/cognac-brogue-backpack-01.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/cognac-brogue-backpack-02.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/cognac-brogue-backpack-03.webp'
    ],
    'Leather Goods',
    '{"size": "38cm × 30cm × 12cm · single front pocket"}'::jsonb,
    2.5,
    array['Full-grain Moroccan leather', 'Brogue-style edge stitching', 'Brass buckle hardware', 'Hand-stitched in Marrakech'],
    20,
    'available',
    true,
    'Cognac full-grain backpack with brogue-style scallop stitching framing each panel. Long flap with single buckle, external front pocket, leather top handle plus adjustable shoulder straps. Patinas warm with wear.'
  ),
  (
    'Classic Cognac Satchel',
    'classic-cognac-satchel',
    28500,
    array[
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/classic-cognac-satchel-01.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/classic-cognac-satchel-02.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/classic-cognac-satchel-03.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/classic-cognac-satchel-04.webp'
    ],
    'Leather Goods',
    '{"size": "40cm × 30cm × 12cm · briefcase silhouette"}'::jsonb,
    3,
    array['Full-grain Moroccan leather', 'Dual brass buckle closures', 'Top carry handle + crossbody strap', 'Cream contrast saddle-stitch', 'Hand-stitched in Marrakech'],
    20,
    'available',
    true,
    'Classic briefcase satchel in rich cognac full-grain leather. Dual brass buckle closures, sturdy top handle plus removable crossbody strap. Cream saddle-stitch edges throughout. Carries a 14" laptop. Heirloom-grade.'
  ),
  (
    'Woven Leather Backpack',
    'woven-leather-backpack',
    29500,
    array[
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/woven-leather-backpack-01.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/woven-leather-backpack-02.webp'
    ],
    'Leather Goods',
    '{"size": "36cm × 28cm · drawstring + flap"}'::jsonb,
    2.5,
    array['Full-grain Moroccan leather', 'Hand-woven leather panels', 'Brass-finished buckle', 'Drawstring closure', 'Hand-stitched in Marrakech'],
    15,
    'available',
    true,
    'Dark-chocolate full-grain leather woven by hand into a diamond lattice across the body and flap. Drawstring inner closure under the buckled flap. Smooth saddle leather base and shoulder straps. The most labour-intensive bag in the drop.'
  ),
  (
    'Vintage Buckle Backpack',
    'vintage-buckle-backpack',
    22500,
    array[
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/vintage-buckle-backpack-01.webp',
      'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/vintage-buckle-backpack-02.webp'
    ],
    'Leather Goods',
    '{"size": "38cm × 30cm × 14cm · drawstring + 3 pockets"}'::jsonb,
    2.5,
    array['Full-grain Moroccan leather', 'Aged brass hardware', 'Three external pockets', 'Drawstring inner closure', 'Hand-stitched in Marrakech'],
    25,
    'available',
    true,
    'Safari-classic silhouette in cognac full-grain leather. Buckled flap over a drawstring inner closure, plus three exterior buckled pockets (one front, two side). Patinas to a deep tobacco with daily wear.'
  )
on conflict (slug) do nothing;
