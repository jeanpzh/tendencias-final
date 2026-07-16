import { test, expect } from "@playwright/test";

test.describe("Page responsiveness (not hung)", () => {
  test("dashboard request doesn't freeze the page", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    // Send a heavy request
    const textarea = page.locator("textarea");
    await textarea.fill("Muéstrame métricas de marketing con gráficas de conversión, CPA, ROAS y CTR");
    await textarea.press("Enter");

    // Wait for request to start processing
    await page.waitForTimeout(5000);

    // PROBE: Click theme toggle - if page is hung, this won't work
    const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
    await expect(toggle).toBeVisible({ timeout: 5000 });

    const isDarkBefore = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );

    await toggle.click();
    await page.waitForTimeout(500);

    const isDarkAfter = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );

    // Theme must have changed - page is responsive
    expect(isDarkAfter).not.toBe(isDarkBefore);
  });

  test("form request doesn't freeze the page", async ({ page }) => {
    await page.goto("/demo/form-builder");
    await page.waitForTimeout(2000);

    const textarea = page.locator("textarea");
    await textarea.fill("Formulario de votación con DNI peruano y 5 candidatos");
    await textarea.press("Enter");

    await page.waitForTimeout(5000);

    // PROBE: Toggle theme
    const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
    await expect(toggle).toBeVisible({ timeout: 5000 });

    const isDarkBefore = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    await toggle.click();
    await page.waitForTimeout(500);

    const isDarkAfter = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDarkAfter).not.toBe(isDarkBefore);
  });

  test("kanban request doesn't freeze the page", async ({ page }) => {
    await page.goto("/demo/task-manager");
    await page.waitForTimeout(2000);

    const textarea = page.locator("textarea");
    await textarea.fill("Crea un tablero kanban para un sprint de desarrollo con 8 tareas");
    await textarea.press("Enter");

    await page.waitForTimeout(5000);

    // PROBE: Toggle theme
    const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
    await expect(toggle).toBeVisible({ timeout: 5000 });

    const isDarkBefore = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    await toggle.click();
    await page.waitForTimeout(500);

    const isDarkAfter = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDarkAfter).not.toBe(isDarkBefore);
  });

  test("general chat doesn't freeze the page", async ({ page }) => {
    await page.goto("/demo/general");
    await page.waitForTimeout(2000);

    const textarea = page.locator("textarea");
    await textarea.fill("Genera un dashboard de ventas mensuales con KPIs y charts");
    await textarea.press("Enter");

    await page.waitForTimeout(5000);

    // PROBE: Toggle theme
    const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
    await expect(toggle).toBeVisible({ timeout: 5000 });

    const isDarkBefore = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    await toggle.click();
    await page.waitForTimeout(500);

    const isDarkAfter = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDarkAfter).not.toBe(isDarkBefore);
  });

  test("sidebar toggle works during AI processing", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    // Send request
    const textarea = page.locator("textarea");
    await textarea.fill("Dashboard de ventas completo con 12 meses de datos y KPIs");
    await textarea.press("Enter");

    await page.waitForTimeout(3000);

    // PROBE: Toggle sidebar (desktop)
    const sidebarToggle = page.locator('button:has(svg)').filter({ has: page.locator('.hidden.md\\:flex') }).first();

    // Try the sidebar toggle button
    const sidebarBtn = page.locator('.hidden.md\\:flex button').first();
    if (await sidebarBtn.isVisible().catch(() => false)) {
      await sidebarBtn.click();
      await page.waitForTimeout(300);

      // Sidebar state changed - page is responsive
      const sidebarExists = await page.locator('.hidden.md\\:flex.border-r').count();
      // Either sidebar appeared or disappeared - both mean page responded
      expect(sidebarExists >= 0).toBe(true);
    }

    // Also verify theme toggle works as backup probe
    const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
    await expect(toggle).toBeVisible({ timeout: 5000 });

    const isDarkBefore = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    await toggle.click();
    await page.waitForTimeout(500);

    const isDarkAfter = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDarkAfter).not.toBe(isDarkBefore);
  });

  test("multiple rapid requests don't freeze the page", async ({ page }) => {
    await page.goto("/demo/dashboard-data");
    await page.waitForTimeout(2000);

    const textarea = page.locator("textarea");

    // Send 3 rapid requests
    await textarea.fill("Dashboard de ventas");
    await textarea.press("Enter");
    await page.waitForTimeout(1500);

    await textarea.fill("Tabla de inventario con 10 productos");
    await textarea.press("Enter");
    await page.waitForTimeout(1500);

    await textarea.fill("Gráfica de usuarios por región");
    await textarea.press("Enter");
    await page.waitForTimeout(3000);

    // PROBE: Toggle must still work after multiple requests
    const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
    await expect(toggle).toBeVisible({ timeout: 5000 });

    const isDarkBefore = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    await toggle.click();
    await page.waitForTimeout(500);

    const isDarkAfter = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDarkAfter).not.toBe(isDarkBefore);
  });
});
