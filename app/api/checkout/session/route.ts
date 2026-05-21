import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/revolut";

// Creates a Revolut Acquiring order and returns the public token for the
// embedded payment widget. Webhook fires ORDER_COMPLETED on success →
// app/api/webhooks/revolut handles persistence + emails + Meta CAPI.

type CartItem = {
  product_id: string;
  title: string;
  price: number; // minor units (cents)
  quantity: number;
  image?: string;
};

export async function POST(request: NextRequest) {
  const { items } = (await request.json()) as { items?: CartItem[] };
  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items" }, { status: 400 });
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.maisontanneurs.com";

  // Sum minor-unit amounts directly to avoid float drift
  const totalMinor = items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0,
  );

  try {
    // Revolut metadata values are limited per field. Mirror the Stripe-era
    // approach: store item_count + item_N to reconstruct the cart later.
    const itemMetadata: Record<string, string> = {
      item_count: String(items.length),
    };
    items.forEach((i, idx) => {
      itemMetadata[`item_${idx}`] = JSON.stringify({
        product_id: i.product_id,
        title: i.title.slice(0, 80),
        price: i.price,
        quantity: i.quantity,
      });
    });

    const order = await createOrder({
      amount: totalMinor,
      currency: "USD",
      capture_mode: "automatic",
      // Static redirect_url — Revolut does NOT substitute template
      // placeholders like {ORDER_ID}. The embedded popup is the primary
      // flow; on success the client redirects to
      // /checkout/success?revolut_order_id=<actual id> from JS.
      // The static URL below is only the hosted-checkout fallback.
      redirect_url: `${siteUrl}/checkout/success`,
      description: `Maison Tanneurs · ${items.length} item${items.length > 1 ? "s" : ""}`,
      metadata: itemMetadata,
      line_items: items.map((i) => ({
        name: i.title,
        type: "physical",
        quantity: { value: i.quantity, unit: "piece" },
        unit_price_amount: i.price,
        total_amount: i.price * i.quantity,
        external_id: i.product_id,
        image_urls: i.image
          ? [i.image.startsWith("http") ? i.image : `${siteUrl}${i.image}`]
          : undefined,
      })),
    });

    return NextResponse.json({
      orderId: order.id,
      token: order.token,
      checkoutUrl: order.checkout_url,
      publicKey: process.env.NEXT_PUBLIC_REVOLUT_PUBLIC_KEY,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Revolut createOrder failed:", message);
    return NextResponse.json(
      { error: "Failed to create checkout order", detail: message },
      { status: 500 },
    );
  }
}
