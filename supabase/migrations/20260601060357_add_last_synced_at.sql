-- Add last_synced_at to products — written by scripts/sync-airtable.ts
-- when a row is upserted from Airtable. Used to surface staleness in audits
-- and to gate "drift checks" once Phase 4 (Supabase -> Airtable echo) lands.
--
-- Also add launch_priority — Airtable owns this field (P0/P1/P2/Later),
-- and we want it on the row so the storefront / launch-readiness scripts
-- can read it without round-tripping to Airtable.

alter table products
  add column if not exists last_synced_at timestamptz,
  add column if not exists launch_priority text;
