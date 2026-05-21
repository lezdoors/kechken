// One-off: register the Revolut webhook + capture the signing secret.
//
// Run AFTER /api/webhooks/revolut is deployed on prod:
//   REVOLUT_SECRET_KEY=sk_m... pnpm tsx scripts/register-revolut-webhook.ts
//
// Output: the response body. Copy the `signing_secret` field into Vercel
// as REVOLUT_WEBHOOK_SECRET (production scope), then redeploy so the
// webhook route can verify signatures.
//
// Idempotency: lists existing webhooks first. If a Tanneurs webhook already
// exists pointed at the same URL, prints its details and exits without
// re-registering (Revolut returns 409 on duplicate URL).

import { registerWebhook, listWebhooks } from "@/lib/revolut";

const TARGET_URL = "https://www.maisontanneurs.com/api/webhooks/revolut";
const EVENTS = [
  "ORDER_AUTHORISED",
  "ORDER_COMPLETED",
  "ORDER_CANCELLED",
  "ORDER_FAILED",
  "REFUND_COMPLETED",
  "REFUND_FAILED",
  "PAYMENT_FAILED",
  "PAYMENT_AUTHENTICATION_CHALLENGE",
];

async function main() {
  console.log("Listing existing webhooks…");
  const existing = await listWebhooks();
  const dupe = existing.find((w) => w.url === TARGET_URL);
  if (dupe) {
    console.log(`Webhook already exists for ${TARGET_URL}:`);
    console.log(`  id:              ${dupe.id}`);
    console.log(`  events:          ${dupe.events.join(", ")}`);
    console.log(`  signing_secret:  ${dupe.signing_secret}`);
    console.log("\nUse the signing_secret above as REVOLUT_WEBHOOK_SECRET on Vercel.");
    return;
  }

  console.log(`Registering ${TARGET_URL} for ${EVENTS.length} events…`);
  const sub = await registerWebhook(TARGET_URL, EVENTS);
  console.log("Webhook registered:");
  console.log(`  id:              ${sub.id}`);
  console.log(`  url:             ${sub.url}`);
  console.log(`  events:          ${sub.events.join(", ")}`);
  console.log(`  signing_secret:  ${sub.signing_secret}`);
  console.log("\nSet REVOLUT_WEBHOOK_SECRET on Vercel production:");
  console.log(`  echo "${sub.signing_secret}" | vercel env add REVOLUT_WEBHOOK_SECRET production`);
  console.log("Then trigger a redeploy.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
