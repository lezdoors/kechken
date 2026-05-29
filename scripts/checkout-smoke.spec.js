const { test, expect } = require("@playwright/test");

const SITE_URL = process.env.SITE_URL || "https://maisontanneurs.com";

test("checkout has payment configuration for a cart", async ({ page }) => {
  let sessionRequested = false;
  await page.route("**/api/checkout/session", (route) => {
    sessionRequested = true;
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "blocked by smoke test" }),
    });
  });

  await page.goto(`${SITE_URL}/products/atlas-field-briefcase`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /add to cart/i }).first().click();
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          try {
            return JSON.parse(localStorage.getItem("perle-cart") || "[]").length;
          } catch {
            return 0;
          }
        }),
      { timeout: 5000 },
    )
    .toBeGreaterThan(0);

  await page.goto(`${SITE_URL}/checkout/pay`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);

  const body = await page.locator("body").innerText();
  const result = {
    sessionRequested,
    hasConfigurationUnavailable: body.includes("Checkout temporarily unavailable"),
    hasStartError: body.includes("couldn't start your checkout"),
    hasPaymentCopy: body.includes("Card, Apple Pay, Google Pay"),
    hasOrderSummaryItem: body.includes("Atlas Field Briefcase"),
    payButton: await page.locator('button[type="submit"]').first().textContent().catch(() => null),
  };
  console.log(JSON.stringify(result, null, 2));

  expect(result.hasConfigurationUnavailable).toBe(false);
  expect(result.sessionRequested).toBe(true);
  expect(result.hasStartError).toBe(true);
});
