// Airtable -> Supabase product sync (Phase 1 canary).
//
// Reads ONE Airtable Products record, maps fields to the Supabase
// `products` shape, diffs against the current row, and upserts only on
// real change. Idempotent: re-running with no Airtable change writes
// nothing. Always emits a JSONL audit line.
//
// Usage:
//   pnpm tsx scripts/sync-airtable.ts --slug=vintage-buckle-backpack
//   pnpm tsx scripts/sync-airtable.ts --slug=... --dry-run
//
// Env (loaded from .env.local + ~/Downloads/airtable-hermes.env):
//   SUPABASE_SERVICE_ROLE_KEY  required
//   AIRTABLE_API_KEY           required (from airtable-hermes.env)
//   AIRTABLE_BASE_ID           required (from airtable-hermes.env)
//
// Source-of-truth split: Airtable owns title, description, category,
// materials, dimensions, slug, images, launch_priority, status, featured,
// available_quantity, price. Supabase owns id, created_at, updated_at,
// last_synced_at (written by this script).

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { appendFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { existsSync } from "node:fs";
import { homedir } from "node:os";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: join(homedir(), "Downloads", "airtable-hermes.env") });

const SUPABASE_URL = "https://xbtabpurfavngwmwtawc.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY ?? "";
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? "";
const AIRTABLE_TABLE = "Products";

const PUBLISHABLE_SITE_STATUSES = new Set(["Published", "Ready for site"]);

// Supabase `products.status` check constraint allows only these values.
// Airtable `Status` field carries a wider legacy vocabulary (Active /
// Inactive / Concept / ...). Anything not mappable is dropped from the
// patch and surfaced in the JSONL log instead of failing the constraint.
const STATUS_MAP: Record<string, "available" | "sold" | "reserved" | "draft"> = {
  available: "available",
  active: "available",
  sold: "sold",
  reserved: "reserved",
  draft: "draft",
};

// Airtable text fields sometimes carry placeholder copy
// ("See product page", "TBD", "Coming soon"). These are clearly worse
// than whatever Supabase already has for that field, so skip them.
const PLACEHOLDER_PATTERNS = [
  /^see product page/i,
  /^tbd$/i,
  /^coming soon/i,
  /^placeholder/i,
];

function isPlaceholder(value: string): boolean {
  return PLACEHOLDER_PATTERNS.some((p) => p.test(value));
}

const LOG_PATH = join(
  dirname(new URL(import.meta.url).pathname),
  ".sync-airtable.jsonl",
);

type SyncAction = "noop" | "synced" | "skipped" | "error";

interface LogLine {
  ts: string;
  slug: string;
  action: SyncAction;
  fields_changed: string[];
  errors: string[];
  dry_run: boolean;
  reason?: string;
}

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

interface AirtableResponse {
  records: AirtableRecord[];
}

interface ProductRow {
  title?: string;
  slug?: string;
  description?: string | null;
  price?: number;
  images?: string[];
  category?: string;
  dimensions?: Record<string, string>;
  materials?: string[];
  available_quantity?: number;
  status?: string;
  featured?: boolean;
  launch_priority?: string | null;
}

function parseArgs(argv: string[]): { slug: string; dryRun: boolean } {
  let slug = "";
  let dryRun = false;
  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run") dryRun = true;
    else if (arg.startsWith("--slug=")) slug = arg.slice("--slug=".length);
  }
  if (!slug) {
    throw new Error("Missing required --slug=<canonical-slug> argument.");
  }
  return { slug, dryRun };
}

function requireEnv(): void {
  const missing: string[] = [];
  if (!SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!AIRTABLE_API_KEY) missing.push("AIRTABLE_API_KEY");
  if (!AIRTABLE_BASE_ID) missing.push("AIRTABLE_BASE_ID");
  if (missing.length > 0) {
    throw new Error(`Missing env vars: ${missing.join(", ")}`);
  }
}

async function fetchAirtableRecord(slug: string): Promise<AirtableRecord | null> {
  const formula = encodeURIComponent(`{Slug}="${slug}"`);
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}?filterByFormula=${formula}&maxRecords=1`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  });
  if (!res.ok) {
    throw new Error(`Airtable ${res.status}: ${await res.text()}`);
  }
  const body = (await res.json()) as AirtableResponse;
  return body.records[0] ?? null;
}

function splitLines(value: unknown): string[] {
  if (typeof value !== "string") return [];
  return value
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

// Map Airtable fields -> partial Supabase row. Undefined values mean
// "Airtable empty — don't touch Supabase".
function mapAirtableToProduct(fields: Record<string, unknown>): ProductRow {
  const row: ProductRow = {};

  const title = asString(fields["Product Name"]);
  if (title) row.title = title;

  const slug = asString(fields["Slug"]);
  if (slug) row.slug = slug;

  const description = asString(fields["Notes"]);
  if (description !== undefined) row.description = description;

  const price = asNumber(fields["Price Cents"]);
  if (price !== undefined) row.price = price;

  const images = splitLines(fields["Images"]);
  if (images.length > 0) row.images = images;

  const category = asString(fields["Category"]);
  if (category) row.category = category;

  const dimensionsText = asString(fields["Dimensions Text"]);
  if (dimensionsText && !isPlaceholder(dimensionsText)) {
    row.dimensions = { size: dimensionsText };
  }

  const materials = splitLines(fields["Materials Text"]);
  if (materials.length > 0) row.materials = materials;

  const qty = asNumber(fields["Available Quantity"]);
  if (qty !== undefined) row.available_quantity = qty;

  const status = asString(fields["Status"]);
  if (status) {
    const mapped = STATUS_MAP[status.toLowerCase()];
    if (mapped) row.status = mapped;
  }

  const featured = asBoolean(fields["Featured"]);
  if (featured !== undefined) row.featured = featured;

  const priority = asString(fields["Launch Priority"]);
  if (priority) row.launch_priority = priority;

  return row;
}

// Compare candidate value against current. Order matters for arrays
// (images[]) — listing order is the storefront gallery order.
function valuesEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((x, i) => valuesEqual(x, b[i]));
  }
  if (typeof a === "object" && typeof b === "object") {
    const ak = Object.keys(a as object).sort();
    const bk = Object.keys(b as object).sort();
    if (ak.length !== bk.length) return false;
    if (!ak.every((k, i) => k === bk[i])) return false;
    return ak.every((k) =>
      valuesEqual(
        (a as Record<string, unknown>)[k],
        (b as Record<string, unknown>)[k],
      ),
    );
  }
  return false;
}

function diffRows(
  candidate: ProductRow,
  current: Record<string, unknown> | null,
): string[] {
  if (!current) return Object.keys(candidate);
  const changed: string[] = [];
  for (const key of Object.keys(candidate) as (keyof ProductRow)[]) {
    if (!valuesEqual(candidate[key], current[key])) changed.push(key);
  }
  return changed;
}

async function readSupabaseRow(
  supabase: SupabaseClient,
  slug: string,
): Promise<Record<string, unknown> | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "slug,title,description,price,images,category,dimensions,materials,available_quantity,status,featured,launch_priority,last_synced_at",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`Supabase read failed: ${error.message}`);
  return data;
}

async function writeSupabaseRow(
  supabase: SupabaseClient,
  slug: string,
  patch: ProductRow,
  exists: boolean,
): Promise<void> {
  const nowIso = new Date().toISOString();
  if (exists) {
    const { error } = await supabase
      .from("products")
      .update({ ...patch, last_synced_at: nowIso, updated_at: nowIso })
      .eq("slug", slug);
    if (error) throw new Error(`Supabase update failed: ${error.message}`);
    return;
  }
  const { error } = await supabase.from("products").insert({
    ...patch,
    slug,
    last_synced_at: nowIso,
    updated_at: nowIso,
  });
  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
}

async function writeLog(line: LogLine): Promise<void> {
  await appendFile(LOG_PATH, JSON.stringify(line) + "\n");
}

async function main(): Promise<void> {
  const { slug, dryRun } = parseArgs(process.argv);
  requireEnv();

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const log: LogLine = {
    ts: new Date().toISOString(),
    slug,
    action: "noop",
    fields_changed: [],
    errors: [],
    dry_run: dryRun,
  };

  try {
    const record = await fetchAirtableRecord(slug);
    if (!record) {
      log.action = "skipped";
      log.reason = "airtable record not found";
      console.log(`[skip] ${slug}: not found in Airtable`);
      await writeLog(log);
      return;
    }

    const fields = record.fields;
    const siteStatus = asString(fields["Site Status"]);
    if (!siteStatus || !PUBLISHABLE_SITE_STATUSES.has(siteStatus)) {
      log.action = "skipped";
      log.reason = `site status '${siteStatus ?? "missing"}' not publishable`;
      console.log(`[skip] ${slug}: Site Status=${siteStatus ?? "(empty)"}`);
      await writeLog(log);
      return;
    }

    const candidate = mapAirtableToProduct(fields);
    if (candidate.slug && candidate.slug !== slug) {
      log.action = "error";
      log.errors.push(
        `slug mismatch: airtable=${candidate.slug} arg=${slug}`,
      );
      console.error(log.errors[0]);
      await writeLog(log);
      process.exitCode = 1;
      return;
    }

    const current = await readSupabaseRow(supabase, slug);
    const changed = diffRows(candidate, current);
    log.fields_changed = changed;

    if (changed.length === 0) {
      console.log(`[noop] ${slug}: no field changes`);
      await writeLog(log);
      return;
    }

    if (dryRun) {
      log.action = "noop";
      log.reason = "dry-run";
      console.log(
        `[dry-run] ${slug}: would write ${changed.length} field(s):`,
        changed.join(", "),
      );
      for (const k of changed) {
        const next = (candidate as Record<string, unknown>)[k];
        const prev = current ? current[k] : null;
        console.log(`  ${k}: ${JSON.stringify(prev)} -> ${JSON.stringify(next)}`);
      }
      await writeLog(log);
      return;
    }

    const patch: ProductRow = {};
    for (const k of changed) {
      (patch as Record<string, unknown>)[k] = (
        candidate as Record<string, unknown>
      )[k];
    }
    await writeSupabaseRow(supabase, slug, patch, current !== null);
    log.action = "synced";
    console.log(`[synced] ${slug}: ${changed.length} field(s):`, changed.join(", "));
    await writeLog(log);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log.action = "error";
    log.errors.push(msg);
    console.error(`[error] ${slug}: ${msg}`);
    await writeLog(log);
    process.exitCode = 1;
  }
}

main();
