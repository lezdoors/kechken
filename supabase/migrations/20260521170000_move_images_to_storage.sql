-- Rewrite products.images[] arrays from local /products/drop-01/ paths to
-- Supabase Storage public URLs in the `products` bucket.
-- See ~/kechken/scripts/upload-products-to-supabase.ts for the upload step.

update products
set images = array[
  'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/heritage-rucksack-01-v2.webp',
  'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/heritage-rucksack-02-v2.webp',
  'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/heritage-rucksack-03.webp'
],
updated_at = now()
where slug = 'heritage-rucksack';

update products
set images = array[
  'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/rolltop-daypack-01.webp',
  'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/rolltop-daypack-02.webp',
  'https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/rolltop-daypack-03.webp'
],
updated_at = now()
where slug = 'rolltop-daypack';
