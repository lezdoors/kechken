import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping — Kechken",
  description:
    "How Kechken ships apparel, jewelry, and leather goods worldwide. Three to five day delivery from US and EU warehouses.",
};

export default function ShippingPage() {
  return (
    <article>
      <span className="eyebrow">Shipping</span>
      <h1>How it gets to you.</h1>
      <p className="updated">Last updated · 19 May 2026</p>

      <p>
        Every Kechken piece is made to order. When you place an order, the
        piece is printed, cut, finished, and quality-checked by our fulfillment
        partner&apos;s warehouse closest to your delivery address — typically
        within 48 hours. The warehouse then hands it off to the courier.
      </p>

      <h2>Delivery times</h2>
      <ul>
        <li><strong>United States · 3–5 business days</strong> · USPS or UPS Ground from a US warehouse.</li>
        <li><strong>European Union, UK · 3–5 business days</strong> · regional carrier from an EU warehouse.</li>
        <li><strong>Canada, Australia, Japan · 5–8 business days</strong> · DHL or local equivalent.</li>
        <li><strong>Rest of world · 7–14 business days</strong> · tracked international post.</li>
      </ul>
      <p>
        Production windows are added to delivery time when stated separately
        on the product page (limited drops may take longer to produce).
      </p>

      <h2>Tracking</h2>
      <p>
        You will receive a tracking link by email as soon as the courier
        collects the order. If your tracking has not updated within five
        business days of dispatch, write to <Link href="mailto:hello@kechken.com">hello@kechken.com</Link> and we will follow it
        up with the carrier on your behalf.
      </p>

      <h2>Shipping cost</h2>
      <p>
        Standard shipping is included in the listed price on orders over
        $80 USD shipped within the US and EU. Below that threshold and for
        all international destinations, a flat shipping fee is shown at
        checkout before you pay.
      </p>
      <p>
        Customs duties and import VAT on international orders (outside the
        US and EU) are the responsibility of the recipient. We declare the
        actual value of the order on the customs form — we do not under-declare.
      </p>

      <h2>Lost or damaged packages</h2>
      <p>
        Every order is insured to its full value during transit. If your
        package arrives damaged, send us photographs of the damage and the
        packaging within 72 hours of delivery (<Link href="mailto:hello@kechken.com">hello@kechken.com</Link>). We will file the
        insurance claim with the carrier and replace, repair, or refund at
        your option.
      </p>
      <p>
        If your tracking shows delivered but the package has not arrived,
        please check with neighbours and your building&apos;s mail room first.
        If still missing after 24 hours, contact us and we will open an
        investigation with the carrier.
      </p>

      <h2>Address changes</h2>
      <p>
        We can change a shipping address up until the order is dispatched
        from the warehouse — usually within 4 hours of you placing the
        order. After dispatch, the address is locked. Email us as soon as
        you spot an error.
      </p>

      <h2>Questions</h2>
      <p>
        Write to <Link href="mailto:hello@kechken.com">hello@kechken.com</Link>. We
        answer within one working day.
      </p>
    </article>
  );
}
