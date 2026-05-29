# Maison Tanneurs Fulfillment Architecture

This file replaces the historical Kechken/Printful apparel plan. Maison
Tanneurs launch scope is bags and small leather goods only.

## Model

Maison Tanneurs sells finished leather goods sourced direct from the Marrakech
atelier. No Printful, no blank garments, no apparel SKUs, no print-on-demand
workflow.

Customer flow:

1. Customer places an order on `maisontanneurs.com`.
2. Revolut creates and captures the payment.
3. The checkout API rebuilds the order from server-side product truth.
4. Ops receives the order notification and coordinates atelier dispatch.
5. The parcel ships direct from Marrakech by DHL or FedEx.
6. Customer receives tracking by email.

## Storefront Promise

| Surface | Current promise |
| --- | --- |
| Product details | Hand-stitched in Marrakech. Ships in 3–5 days via DHL or FedEx. |
| Legal shipping page | EU / UK: 2–4 business days. United States: 3–5 business days. |
| Checkout success | Marrakech atelier, shipped direct via DHL or FedEx, 3–5 business days. |
| Order confirmation email | Most orders arrive in 3 to 5 business days. |

Keep these surfaces aligned before launch. Do not reintroduce 2–4 week
production copy unless the operating model changes.

## Ops Responsibilities

- Confirm product availability in Supabase before promoting a SKU.
- Use only HF-improved or confirmed Drive multishot product images.
- Do not use raw screenshots, Oussam uploads, or supplier originals as PDP
  assets.
- Confirm customer name, email, shipping address, product title, quantity, and
  total from the order notification.
- Dispatch with DHL or FedEx and add tracking as soon as the parcel leaves the
  atelier.

## Returns

- 30-day returns for unused bags and small leather goods.
- Items must return undamaged, with dust bag and original packaging.
- Refund after inspection to the original payment method.

## Explicitly Not In Scope

- Clothing, jackets, outerwear, apparel campaign imagery.
- Printful, Stripe print-on-demand webhooks, garment blanks, size variants.
- Kechken graphic-art product copy.

