import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders hero and demo cards", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("ToolVox", { exact: true }).first()).toBeVisible();
    await expect(
      page.getByText("Componentes interactivos")
    ).toBeVisible();

    const cards = page.locator('a[href^="/demo/"]');
    await expect(cards).toHaveCount(5);
  });

  test("navigates to dashboard demo", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/demo/dashboard-data"]');
    await expect(page).toHaveURL(/demo\/dashboard-data/);
    await expect(page.getByText("Dashboard & Data Explorer")).toBeVisible();
  });
});
