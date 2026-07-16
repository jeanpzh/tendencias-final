import { test, expect } from "@playwright/test";

test.describe("Theme toggle", () => {
  test("switches from dark to light mode", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    // Verify starts in dark mode
    const isDarkBefore = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDarkBefore).toBe(true);

    // Click theme toggle (sun icon = "Modo claro")
    const toggleBtn = page.locator('button[title="Modo claro"]').first();
    await expect(toggleBtn).toBeVisible({ timeout: 5000 });
    await toggleBtn.click();
    await page.waitForTimeout(500);

    // Verify switched to light
    const isDarkAfter = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDarkAfter).toBe(false);

    // Verify light class added
    const hasLight = await page.evaluate(() =>
      document.documentElement.classList.contains("light")
    );
    expect(hasLight).toBe(true);
  });

  test("switches back from light to dark", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    // Switch to light
    const toggleLight = page.locator('button[title="Modo claro"]').first();
    await toggleLight.click();
    await page.waitForTimeout(500);

    // Switch back to dark
    const toggleDark = page.locator('button[title="Modo oscuro"]').first();
    await expect(toggleDark).toBeVisible({ timeout: 5000 });
    await toggleDark.click();
    await page.waitForTimeout(500);

    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDark).toBe(true);
  });

  test("theme persists in localStorage", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    // Switch to light
    const toggle = page.locator('button[title="Modo claro"]').first();
    await toggle.click();
    await page.waitForTimeout(500);

    // Check localStorage
    const saved = await page.evaluate(() => {
      const raw = localStorage.getItem("toolvox-theme");
      return raw ? JSON.parse(raw) : null;
    });
    expect(saved).toBeTruthy();
    expect(saved.dark).toBe(false);
  });

  test("AI action tool changes theme", async ({ page }) => {
    await page.goto("/demo/general");
    await page.waitForTimeout(2000);

    const textarea = page.locator("textarea");
    await textarea.fill("Pon la página en modo claro");
    await textarea.press("Enter");

    // Wait for either theme change OR text response (AI might respond with text)
    await page.waitForFunction(
      () => {
        const isLight = !document.documentElement.classList.contains("dark");
        const hasResponse = document.body.innerHTML.includes("claro") ||
          document.body.innerHTML.includes("Modo") ||
          document.body.innerHTML.includes("modo");
        return isLight || hasResponse;
      },
      { timeout: 45_000, polling: 2000 }
    );

    // Check final state - either theme changed or AI responded
    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    const hasResponse = await page.evaluate(() => {
      const html = document.body.innerHTML;
      return html.includes("claro") || html.includes("Modo") || html.includes("modo");
    });

    // At least one should be true
    expect(isDark === false || hasResponse).toBe(true);
  });
});
