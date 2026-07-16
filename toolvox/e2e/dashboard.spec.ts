import { test, expect } from "@playwright/test";

test.describe("Dashboard & Data Explorer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(1500);
  });

  test("renders header with model selector and chat input", async ({
    page,
  }) => {
    await expect(page.getByText("Dashboard & Data Explorer")).toBeVisible();
    await expect(page.getByText("Tencent Hy3")).toBeVisible();
    await expect(page.locator("textarea")).toBeVisible();
  });

  test("shows suggestion buttons when empty", async ({ page }) => {
    const suggestions = page.locator(
      'button:has-text("Genera un dashboard")'
    );
    await expect(suggestions.first()).toBeVisible();
  });

  test("generates dashboard with charts and table", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("Genera un dashboard de ventas mensuales del 2024");
    await textarea.press("Enter");

    // Wait for either charts or table to appear in DOM
    const gotContent = await page.waitForFunction(
      () => {
        const html = document.body.innerHTML;
        return html.includes("recharts-wrapper") || html.includes("<table");
      },
      { timeout: 55_000, polling: 3000 }
    ).then(() => true).catch(() => false);

    expect(gotContent).toBe(true);

    // Wait for React to paint
    await page.waitForTimeout(2000);

    // Verify either chart or table is visible
    const chartVisible = await page.locator(".recharts-wrapper").first().isVisible().catch(() => false);
    const tableVisible = await page.locator("table").first().isVisible().catch(() => false);
    expect(chartVisible || tableVisible).toBe(true);
  });

  test("table has search functionality", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("Genera un dashboard de ventas mensuales del 2024");
    await textarea.press("Enter");

    await page.waitForFunction(
      () => document.body.innerHTML.includes("<table"),
      { timeout: 55_000, polling: 3000 }
    );

    await page.waitForTimeout(2000);

    const searchInput = page.locator('input[placeholder="Buscar..."]');
    await expect(searchInput).toBeVisible({ timeout: 10_000 });

    await searchInput.fill("Enero");
    await page.waitForTimeout(500);

    const rows = page.locator("table tbody tr");
    expect(await rows.count()).toBeGreaterThanOrEqual(1);
  });
});
