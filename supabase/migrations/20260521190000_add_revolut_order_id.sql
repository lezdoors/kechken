-- Add revolut_order_id to the orders table.
-- Maison Tanneurs uses Revolut Acquiring (approved 2026-05-21 under Akal Ltd
-- #17229387) as its payment processor from day one. Stripe-era columns
-- (stripe_session_id, etsy_order_id) remain for cross-channel future flexibility.

alter table orders add column if not exists revolut_order_id text unique;
create index if not exists idx_orders_revolut on orders(revolut_order_id);
