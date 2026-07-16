import { test, expect } from "@playwright/test";

test.describe("Task Manager", () => {
  test("renders header and chat input", async ({ page }) => {
    await page.goto("/demo/task-manager");
    await page.waitForTimeout(1500);
    await expect(page.getByText("Task Manager")).toBeVisible();
    await expect(page.locator("textarea")).toBeVisible();
  });

  test("generates a kanban board", async ({ page }) => {
    await page.goto("/demo/task-manager");
    await page.waitForTimeout(1500);

    const textarea = page.locator("textarea");
    await textarea.fill("Crea un tablero kanban para un sprint de desarrollo");
    await textarea.press("Enter");

    const gotContent = await page.waitForFunction(
      () => {
        const html = document.body.innerHTML;
        return (
          html.includes("Pendiente") ||
          html.includes("EN PROGRESO") ||
          html.includes("Completado") ||
          html.includes("Sprint") ||
          html.includes("Tarea")
        );
      },
      { timeout: 55_000, polling: 3000 }
    ).then(() => true).catch(() => false);

    expect(gotContent).toBe(true);
    await page.waitForTimeout(2000);

    // Verify kanban content is visible
    const kanbanVisible = await page.getByText(/Sprint|Tarea|Pendiente/i).first().isVisible().catch(() => false);
    expect(kanbanVisible).toBe(true);
  });
});
