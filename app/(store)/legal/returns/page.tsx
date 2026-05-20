import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns — Kechken",
  description:
    "Kechken returns and exchanges. Thirty days, unworn and unwashed, with original tags. Standard apparel returns policy.",
};

export default function ReturnsPage() {
  return (
    <article>
      <span className="eyebrow">Returns</span>
      <h1>Returns and exchanges.</h1>
      <p className="updated">Last updated · 19 May 2026</p>

      <p>
        We want you to wear what you order. If something does not fit or
        does not feel right, you have thirty days from delivery to send
        it back for a full refund or an exchange.
      </p>

      <h2>What we accept</h2>
      <ul>
        <li>Apparel returned unworn, unwashed, with original tags attached.</li>
        <li>Jewelry returned in original packaging, undamaged.</li>
        <li>Leather goods returned unused, undamaged, with the dust bag.</li>
      </ul>

      <h2>What we cannot accept</h2>
      <ul>
        <li>Items returned more than 30 days after delivery.</li>
        <li>Items that have been worn, washed, altered, or damaged by the customer.</li>
        <li>Final-sale items (clearly marked on the product page at purchase).</li>
      </ul>

      <h2>How to return</h2>
      <ol style={{paddingLeft: "20px", marginBottom: "20px"}}>
        <li style={{marginBottom: "8px"}}>Write to <Link href="mailto:hello@kechken.com">hello@kechken.com</Link> within 30 days of delivery with your order number and the reason for the return.</li>
        <li style={{marginBottom: "8px"}}>We will email you a return label (US and EU orders) and the warehouse address.</li>
        <li style={{marginBottom: "8px"}}>Ship the item back within 14 days of receiving the label.</li>
        <li style={{marginBottom: "8px"}}>Once we receive and inspect the return, we will refund the original payment method within 5 business days, or dispatch the exchange.</li>
      </ol>

      <h2>Return shipping cost</h2>
      <p>
        US and EU returns are free — we cover the return label. International
        return shipping is the responsibility of the customer; we recommend
        a tracked service, as we cannot refund items that do not reach us.
      </p>

      <h2>Refunds</h2>
      <p>
        Refunds are issued to the original payment method only. They appear
        on your statement within 5 to 10 business days depending on your
        bank. Original shipping is non-refundable except where the order
        arrived damaged or the wrong item was sent.
      </p>

      <h2>Damaged or wrong items</h2>
      <p>
        If your order arrives damaged, or we sent the wrong piece, please
        write to <Link href="mailto:hello@kechken.com">hello@kechken.com</Link> within 72 hours of
        delivery with photographs. We will cover the full cost of return
        and replacement — no questions asked.
      </p>

      <h2>Questions</h2>
      <p>
        Write to <Link href="mailto:hello@kechken.com">hello@kechken.com</Link>. We
        answer within one working day.
      </p>
    </article>
  );
}
