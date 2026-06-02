"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrency } from "@/components/store/CurrencyProvider";
import { useCart } from "@/components/store/CartProvider";
import { useLocalizedHref, useT } from "@/lib/i18n-client";
import { productToCartItem } from "@/lib/cart";
import { trackGA4Event } from "@/components/store/GA4";
import { trackPixelEvent } from "@/components/store/MetaPixel";
import type { Product } from "@/lib/supabase/types";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem, openCart } = useCart();
  const { currency, convert, format } = useCurrency();
  const t = useT();
  const href = useLocalizedHref();
  const [justAdded, setJustAdded] = useState(false);

  // GA4 + Pixel: view_item / ViewContent on PDP mount
  useEffect(() => {
    const value = convert(product.price) / 100;
    trackGA4Event("view_item", {
      currency,
      value,
      items: [
        {
          item_id: product.slug,
          item_name: product.title,
          item_category: product.category,
          price: value,
          quantity: 1,
        },
      ],
    });
    trackPixelEvent("ViewContent", {
      content_ids: [product.slug],
      content_name: product.title,
      content_type: "product",
      content_category: product.category,
      currency,
      value,
    });
  }, [currency, convert, product.slug, product.title, product.price, product.category]);

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 2500);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  function handleAddToCart() {
    addItem(productToCartItem(product));
    setJustAdded(true);
    const value = convert(product.price) / 100;
    trackGA4Event("add_to_cart", {
      currency,
      value,
      items: [
        {
          item_id: product.slug,
          item_name: product.title,
          item_category: product.category,
          price: value,
          quantity: 1,
        },
      ],
    });
    trackPixelEvent("AddToCart", {
      content_ids: [product.slug],
      content_name: product.title,
      content_type: "product",
      content_category: product.category,
      currency,
      value,
    });
  }

  const sku = `MT-${product.id.slice(0, 6).toUpperCase().padStart(6, "0")}`;
  const displayPrice = format(product.price);
  const primaryMaterial =
    product.materials[0]?.replace(/\.$/, "") || "full-grain Moroccan leather";
  const atelierNote = `Cut in a small Marrakech atelier from ${primaryMaterial}. The grain, tone, and handle are left visible so the piece can soften and develop its own patina with use.`;

  return (
    <>
      <div className="lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto">
        <div className="px-5 sm:px-8 lg:px-[clamp(42px,5vw,72px)] pt-8 sm:pt-10 lg:pt-[clamp(48px,7vw,88px)] pb-32 sm:pb-20 lg:pb-[120px]">
          <div className="flex flex-col gap-6 sm:gap-7 lg:gap-7">
          {/* Breadcrumbs */}
          <nav className="font-sans text-[9.5px] tracking-[0.18em] uppercase text-mineral">
            <Link href={href("/")} className="hover:text-graphite transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={href(`/products?category=${encodeURIComponent(product.category.toLowerCase())}`)}
              className="hover:text-graphite transition-colors"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-graphite">{product.title}</span>
          </nav>

          {/* Product name */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(48px, 8.5vw, 86px)",
              letterSpacing: "-0.035em",
              lineHeight: 0.9,
              color: "var(--color-ink)",
              textWrap: "balance",
            }}
          >
            {product.title}
          </h1>

          {/* Price + SKU */}
          <div className="flex items-baseline justify-between border-b border-stone pb-5 sm:pb-6">
            <span className="font-sans text-[18px] sm:text-[20px] text-ink tracking-[0.08em] uppercase">
              {format(product.price)}
            </span>
            <span className="font-sans text-[9.5px] tracking-[0.18em] uppercase text-mineral">
              {sku}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="body-copy max-w-[48ch] text-[14px] leading-[1.85] sm:text-[15px] sm:leading-[1.9]">{product.description}</p>
          )}

          <div className="border-y border-stone/40 py-5 sm:py-6">
            <span className="tech-meta block text-mineral">Note from the atelier</span>
            <p
              className="mt-3 max-w-[44ch]"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 1.8vw, 23px)",
                lineHeight: 1.55,
                color: "var(--color-ink-soft)",
              }}
            >
              {atelierNote}
            </p>
          </div>

          {/* Add to Cart — keep the commerce action above specs on desktop */}
          <div className="space-y-3 pt-1 sm:pt-2 hidden md:block">
            <button
              onClick={handleAddToCart}
              className="rb-cta w-full"
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", padding: "18px 24px" }}
            >
              {t("product.addToCart")}
            </button>
            <p className="text-[10.5px] font-sans text-mineral leading-relaxed tracking-[0.04em]">
              {t("product.delivery")}
            </p>
            <div className="min-h-5">
              {justAdded && (
                <button
                  type="button"
                  onClick={openCart}
            className="font-sans text-[10px] tracking-[0.14em] uppercase text-graphite hover:text-ink transition-colors"
                >
                  {t("product.added")}
                </button>
              )}
            </div>
          </div>

          {/* Materials */}
          {product.materials.length > 0 && (
            <div>
              <span className="font-sans text-[9.5px] tracking-[0.18em] uppercase text-mineral block mb-3">
                {t("product.materials")}
              </span>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material) => (
                  <span
                    key={material}
                    className="font-sans text-[10px] tracking-[0.1em] text-graphite border border-stone px-3 py-1.5"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dimensions */}
          {product.dimensions &&
            Object.keys(product.dimensions).length > 0 && (
              <div>
                <span className="font-sans text-[9.5px] tracking-[0.18em] uppercase text-mineral block mb-3">
                  {t("product.dimensions")}
                </span>
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.dimensions).map(([key, value]) => (
                      <tr key={key} className="border-b border-stone/20">
                        <td className="font-sans text-[10px] tracking-[0.14em] text-mineral uppercase py-2 pr-4 w-24">
                          {key}
                        </td>
                        <td className="font-sans text-[13px] text-graphite py-2">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          {/* Trust strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-y border-stone/40 py-4">
            <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-graphite">{t("product.secure")}</span>
            <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-graphite">{t("product.returns")}</span>
            <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-graphite">{t("product.worldwide")}</span>
          </div>

          {/* Shipping + care note */}
          <p className="font-sans text-[12px] tracking-[0.04em] text-mineral leading-[1.75]">
            Hand-stitched in Marrakech. Free worldwide shipping by tracked express courier, 3–5 days.
          </p>

          {/* Care + sizing links */}
          <div className="border-t border-stone/40 pt-6 flex flex-col gap-2.5">
            <Link
              href={href("/legal/care")}
              className="font-sans text-[9.5px] tracking-[0.18em] uppercase text-graphite hover:text-ink transition-colors flex items-center justify-between"
            >
              <span>{t("product.care").replace(" →", "")}</span>
              <span className="text-mineral">→</span>
            </Link>
            <Link
              href={href("/legal/shipping")}
              className="font-sans text-[9.5px] tracking-[0.18em] uppercase text-graphite hover:text-ink transition-colors flex items-center justify-between"
            >
              <span>{t("product.shipping").replace(" →", "")}</span>
              <span className="text-mineral">→</span>
            </Link>
            <Link
              href={href("/legal/returns")}
              className="font-sans text-[9.5px] tracking-[0.18em] uppercase text-graphite hover:text-ink transition-colors flex items-center justify-between"
            >
              <span>{t("product.returnsLink").replace(" →", "")}</span>
              <span className="text-mineral">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>

      <div className="md:hidden fixed inset-x-0 bottom-0 z-[68] border-t border-stone/40 bg-[color:var(--color-paper)]/95 backdrop-blur px-4 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-mineral">Ready to order</p>
            <p className="font-sans text-[15px] text-ink leading-none mt-1 tracking-[0.06em]">{displayPrice}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="rb-cta flex-1"
            style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", padding: "14px 16px" }}
          >
            {t("product.addToCart")}
          </button>
        </div>
        <p className="mt-2 text-[10px] font-sans text-mineral leading-relaxed">
          {t("product.delivery")}
        </p>
      </div>

      <div
        className={`fixed left-1/2 -translate-x-1/2 bottom-[88px] md:bottom-5 z-[70] px-4 py-2.5 bg-[color:var(--color-warm-black)] text-[color:var(--color-ivory)] border border-[color:rgba(244,240,232,0.22)] shadow-[0_10px_30px_rgba(31,29,27,0.24)] transition-all duration-700 ${
          justAdded
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!justAdded}
        inert={!justAdded}
      >
        <button
          type="button"
          onClick={openCart}
          className="font-sans text-[10px] tracking-[0.14em] uppercase"
        >
          {t("product.added")}
        </button>
      </div>
    </>
  );
}
