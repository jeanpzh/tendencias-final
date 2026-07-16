# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: edge-cases.spec.ts >> Page responsiveness (not hung) >> dashboard request doesn't freeze the page
- Location: e2e/edge-cases.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/demo/dashboard-data
Call log:
  - navigating to "http://localhost:3000/demo/dashboard-data", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("Page responsiveness (not hung)", () => {
  4   |   test("dashboard request doesn't freeze the page", async ({ page }) => {
> 5   |     await page.goto("/demo/dashboard-data");
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/demo/dashboard-data
  6   |     await page.waitForTimeout(2000);
  7   | 
  8   |     // Send a heavy request
  9   |     const textarea = page.locator("textarea");
  10  |     await textarea.fill("Muéstrame métricas de marketing con gráficas de conversión, CPA, ROAS y CTR");
  11  |     await textarea.press("Enter");
  12  | 
  13  |     // Wait for request to start processing
  14  |     await page.waitForTimeout(5000);
  15  | 
  16  |     // PROBE: Click theme toggle - if page is hung, this won't work
  17  |     const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
  18  |     await expect(toggle).toBeVisible({ timeout: 5000 });
  19  | 
  20  |     const isDarkBefore = await page.evaluate(() =>
  21  |       document.documentElement.classList.contains("dark")
  22  |     );
  23  | 
  24  |     await toggle.click();
  25  |     await page.waitForTimeout(500);
  26  | 
  27  |     const isDarkAfter = await page.evaluate(() =>
  28  |       document.documentElement.classList.contains("dark")
  29  |     );
  30  | 
  31  |     // Theme must have changed - page is responsive
  32  |     expect(isDarkAfter).not.toBe(isDarkBefore);
  33  |   });
  34  | 
  35  |   test("form request doesn't freeze the page", async ({ page }) => {
  36  |     await page.goto("/demo/form-builder");
  37  |     await page.waitForTimeout(2000);
  38  | 
  39  |     const textarea = page.locator("textarea");
  40  |     await textarea.fill("Formulario de votación con DNI peruano y 5 candidatos");
  41  |     await textarea.press("Enter");
  42  | 
  43  |     await page.waitForTimeout(5000);
  44  | 
  45  |     // PROBE: Toggle theme
  46  |     const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
  47  |     await expect(toggle).toBeVisible({ timeout: 5000 });
  48  | 
  49  |     const isDarkBefore = await page.evaluate(() =>
  50  |       document.documentElement.classList.contains("dark")
  51  |     );
  52  |     await toggle.click();
  53  |     await page.waitForTimeout(500);
  54  | 
  55  |     const isDarkAfter = await page.evaluate(() =>
  56  |       document.documentElement.classList.contains("dark")
  57  |     );
  58  |     expect(isDarkAfter).not.toBe(isDarkBefore);
  59  |   });
  60  | 
  61  |   test("kanban request doesn't freeze the page", async ({ page }) => {
  62  |     await page.goto("/demo/task-manager");
  63  |     await page.waitForTimeout(2000);
  64  | 
  65  |     const textarea = page.locator("textarea");
  66  |     await textarea.fill("Crea un tablero kanban para un sprint de desarrollo con 8 tareas");
  67  |     await textarea.press("Enter");
  68  | 
  69  |     await page.waitForTimeout(5000);
  70  | 
  71  |     // PROBE: Toggle theme
  72  |     const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
  73  |     await expect(toggle).toBeVisible({ timeout: 5000 });
  74  | 
  75  |     const isDarkBefore = await page.evaluate(() =>
  76  |       document.documentElement.classList.contains("dark")
  77  |     );
  78  |     await toggle.click();
  79  |     await page.waitForTimeout(500);
  80  | 
  81  |     const isDarkAfter = await page.evaluate(() =>
  82  |       document.documentElement.classList.contains("dark")
  83  |     );
  84  |     expect(isDarkAfter).not.toBe(isDarkBefore);
  85  |   });
  86  | 
  87  |   test("general chat doesn't freeze the page", async ({ page }) => {
  88  |     await page.goto("/demo/general");
  89  |     await page.waitForTimeout(2000);
  90  | 
  91  |     const textarea = page.locator("textarea");
  92  |     await textarea.fill("Genera un dashboard de ventas mensuales con KPIs y charts");
  93  |     await textarea.press("Enter");
  94  | 
  95  |     await page.waitForTimeout(5000);
  96  | 
  97  |     // PROBE: Toggle theme
  98  |     const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
  99  |     await expect(toggle).toBeVisible({ timeout: 5000 });
  100 | 
  101 |     const isDarkBefore = await page.evaluate(() =>
  102 |       document.documentElement.classList.contains("dark")
  103 |     );
  104 |     await toggle.click();
  105 |     await page.waitForTimeout(500);
```