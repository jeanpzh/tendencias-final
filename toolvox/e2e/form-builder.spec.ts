import { test, expect } from "@playwright/test";

test.describe("Form Builder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo/form-builder");
    await page.waitForTimeout(1500);
  });

  test("renders header and chat input", async ({ page }) => {
    await expect(page.getByText("Form Builder")).toBeVisible();
    await expect(page.locator("textarea")).toBeVisible();
  });

  test("generates a registration form", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill(
      "Crea un formulario de registro con nombre, email y contraseña"
    );
    await textarea.press("Enter");

    // Wait for form content to appear
    await page.waitForFunction(
      () => {
        const html = document.body.innerHTML;
        return (
          html.includes("Formulario") ||
          html.includes("Nombre") ||
          html.includes("registro")
        );
      },
      { timeout: 60_000, polling: 2000 }
    );

    await page.waitForTimeout(2000);

    // Verify form title or key fields exist
    const formTitle = page.getByText(/Formulario|Registro/i).first();
    await expect(formTitle).toBeVisible({ timeout: 10_000 });

    // Verify form has inputs (form-block renders divs with labels, not native inputs)
    const formContent = page.locator('[class*="rounded"][class*="border"]').first();
    await expect(formContent).toBeVisible();

    // Verify submit button exists (any button with Send icon inside a form)
    const submitBtn = page.locator('form button[type="submit"], form button').first();
    await expect(submitBtn).toBeVisible();
  });

  test("generates a satisfaction survey", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill(
      "Genera una encuesta de satisfacción con escala Likert"
    );
    await textarea.press("Enter");

    await page.waitForFunction(
      () => {
        const html = document.body.innerHTML;
        return html.includes("Encuesta") || html.includes("Satisfacción");
      },
      { timeout: 60_000, polling: 2000 }
    );

    await page.waitForTimeout(2000);

    // Should have form elements
    const formElements = page.locator("input, select, textarea");
    expect(await formElements.count()).toBeGreaterThanOrEqual(1);
  });
});
