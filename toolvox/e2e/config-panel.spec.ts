import { test, expect } from "@playwright/test";

test.describe("Config Panel", () => {
  test("renders header and chat input", async ({ page }) => {
    await page.goto("/demo/config-panel");
    await page.waitForTimeout(1500);
    await expect(page.getByText("Config Panel")).toBeVisible();
    await expect(page.locator("textarea")).toBeVisible();
  });

  test("generates a theme config panel", async ({ page }) => {
    await page.goto("/demo/config-panel");
    await page.waitForTimeout(1500);

    const textarea = page.locator("textarea");
    await textarea.fill(
      "Genera un panel de configuración de tema (dark/light, idioma, fuente)"
    );
    await textarea.press("Enter");

    const gotContent = await page.waitForFunction(
      () => {
        const html = document.body.innerHTML;
        return (
          html.includes("Configuración") ||
          html.includes("Tema") ||
          html.includes("Modo")
        );
      },
      { timeout: 55_000, polling: 3000 }
    ).then(() => true).catch(() => false);

    expect(gotContent).toBe(true);
    await page.waitForTimeout(2000);

    // Verify config content is visible
    const configVisible = await page.getByText(/Configuración|Tema/i).first().isVisible().catch(() => false);
    expect(configVisible).toBe(true);
  });
});
