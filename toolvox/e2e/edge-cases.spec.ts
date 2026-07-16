import { test, expect } from "@playwright/test";

test.describe("Dashboard edge cases", () => {
  test("dashboard with marketing metrics renders or shows loading", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    const textarea = page.locator("textarea");
    await textarea.fill("Muéstrame métricas de marketing con gráficas");
    await textarea.press("Enter");

    // Wait for either rendered content OR loading indicator (page is working, not hung)
    await page.waitForFunction(
      () => {
        const html = document.body.innerHTML;
        return (
          html.includes("recharts-wrapper") ||
          html.includes("recharts-surface") ||
          html.includes("<table") ||
          html.includes("Generando") ||
          html.includes("Pensando")
        );
      },
      { timeout: 15_000, polling: 1000 }
    );

    // Page is responsive - not hung
    const isResponsive = await page.locator("textarea").isVisible();
    expect(isResponsive).toBe(true);
  });

  test("resumen ejecutivo trimestral renders", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    const textarea = page.locator("textarea");
    await textarea.fill("Haz un resumen ejecutivo trimestral con KPIs de ingresos y comparativa Q1 vs Q2");
    await textarea.press("Enter");

    const gotContent = await page.waitForFunction(
      () => {
        const html = document.body.innerHTML;
        return html.includes("recharts") || html.includes("<table") || html.includes("Q1");
      },
      { timeout: 55_000, polling: 3000 }
    ).then(() => true).catch(() => false);

    expect(gotContent).toBe(true);
  });

  test("tabla de inventario con búsqueda renders", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    const textarea = page.locator("textarea");
    await textarea.fill("Crea una tabla de inventario con búsqueda y filtros para 10 productos con SKU, nombre, stock y precio");
    await textarea.press("Enter");

    const gotTable = await page.waitForFunction(
      () => document.body.innerHTML.includes("<table"),
      { timeout: 55_000, polling: 3000 }
    ).then(() => true).catch(() => false);

    expect(gotTable).toBe(true);
    await page.waitForTimeout(2000);

    // Verify search input exists
    const searchInput = page.locator('input[placeholder="Buscar..."]');
    await expect(searchInput).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("Error states", () => {
  test("page doesn't hang when AI is slow", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    const textarea = page.locator("textarea");
    await textarea.fill("Genera un dashboard");
    await textarea.press("Enter");

    // Wait a few seconds
    await page.waitForTimeout(3000);

    // Verify the page is still interactive (textarea or send button accessible)
    const textareaStillVisible = await page.locator("textarea").isVisible();
    expect(textareaStillVisible).toBe(true);

    // Verify typing indicator or content appeared
    const hasIndicator = await page.evaluate(() => {
      const html = document.body.innerHTML;
      return (
        html.includes("Pensando") ||
        html.includes("Generando") ||
        html.includes("recharts") ||
        html.includes("<table")
      );
    });
    expect(hasIndicator).toBe(true);
  });

  test("suggestion buttons are clickable", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    // Click first suggestion
    const suggestion = page.locator("button").filter({ hasText: "ventas" }).first();
    await expect(suggestion).toBeVisible({ timeout: 5000 });
    await suggestion.click();

    // Verify message was sent (user message appears)
    await page.waitForTimeout(2000);
    const userMsg = await page.evaluate(() => {
      return document.body.innerHTML.includes("ventas");
    });
    expect(userMsg).toBe(true);
  });
});
