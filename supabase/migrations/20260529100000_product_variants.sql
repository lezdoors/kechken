-- Product variants — first-class support for color/finish twins.
--
-- Previously every variant was a separate row with a unique top-level slug
-- (e.g. "expedition-rolltop-cognac" and "expedition-rolltop-noir"). This
-- forced the storefront to show each as its own card on listings and its
-- own PDP, which doesn't match how Polène / Bleu de Chauffe / Le Tanneur
-- merchandise variants.
--
-- The two new columns let us group rows into a family + name the attribute
-- that distinguishes the variant within the family. Non-breaking: existing
-- code that doesn't know about variants keeps reading rows as flat products.
--
--   family_slug      kebab-case family identifier. NULL = standalone (no variants)
--   variant_attribute jsonb e.g. {"type":"color","value":"Cognac"} or
--                     {"type":"finish","value":"Tooled Walnut"}.
--                     Empty object {} = no variant attribute (treat as primary).
--
-- Phase 2 (storefront PDP swatches + listing dedupe) will land separately
-- once this column is backfilled and confirmed correct.

alter table products
  add column if not exists family_slug text,
  add column if not exists variant_attribute jsonb not null default '{}'::jsonb;

create index if not exists products_family_slug_idx
  on products (family_slug)
  where family_slug is not null;

-- Backfill the known color/finish twins. Add new families here as variants
-- ship; the storefront helper in lib/product-variants.ts uses family_slug
-- to group siblings.
update products
  set family_slug = 'expedition-rolltop',
      variant_attribute = jsonb_build_object('type', 'color', 'value', 'Cognac')
  where slug = 'expedition-rolltop-cognac';

update products
  set family_slug = 'expedition-rolltop',
      variant_attribute = jsonb_build_object('type', 'color', 'value', 'Noir')
  where slug = 'expedition-rolltop-noir';
