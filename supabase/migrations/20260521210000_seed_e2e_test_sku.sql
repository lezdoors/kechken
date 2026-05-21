-- E2E checkout test SKU. Live on production at /products/test-e2e but
-- featured=false so it doesn't surface on the homepage / category tiles.
-- Direct URL only.
--
-- Reuses an existing leather image so no extra storage upload needed.
-- Price = $0.30 (Revolut Acquiring settles in GBP — effectively ~£0.23
-- per Ryan's "small refundable transactions" test plan).

insert into products (
  title, slug, price, images, category, dimensions, weight_lbs, materials,
  available_quantity, status, featured, description
) values (
  'Test — E2E Checkout',
  'test-e2e',
  30,
  array['https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/heritage-rucksack-01-v2.webp'],
  'Leather Goods',
  '{"note": "Internal E2E test only — not for sale"}'::jsonb,
  1,
  array['Test SKU — not for sale'],
  100,
  'available',
  false,
  'Internal end-to-end checkout test SKU. Not a real product. Used to verify the Revolut Acquiring → webhook → CAPI dispatch path with a refundable transaction.'
)
on conflict (slug) do update set
  price = excluded.price,
  status = excluded.status,
  available_quantity = excluded.available_quantity,
  updated_at = now();
