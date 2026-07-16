# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: edge-cases.spec.ts >> Page responsiveness (not hung) >> kanban request doesn't freeze the page
- Location: e2e/edge-cases.spec.ts:61:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/demo/task-manager
Call log:
  - navigating to "http://localhost:3000/demo/task-manager", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("Page responsiveness (not hung)", () => {
  4   |   test("dashboard request doesn't freeze the page", async ({ page }) => {
  5   |     await page.goto("/demo/dashboard-data");
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
> 62  |     await page.goto("/demo/task-manager");
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/demo/task-manager
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
  106 | 
  107 |     const isDarkAfter = await page.evaluate(() =>
  108 |       document.documentElement.classList.contains("dark")
  109 |     );
  110 |     expect(isDarkAfter).not.toBe(isDarkBefore);
  111 |   });
  112 | 
  113 |   test("sidebar toggle works during AI processing", async ({ page }) => {
  114 |     await page.goto("/demo/dashboard-data");
  115 |     await page.waitForTimeout(2000);
  116 | 
  117 |     // Send request
  118 |     const textarea = page.locator("textarea");
  119 |     await textarea.fill("Dashboard de ventas completo con 12 meses de datos y KPIs");
  120 |     await textarea.press("Enter");
  121 | 
  122 |     await page.waitForTimeout(3000);
  123 | 
  124 |     // PROBE: Toggle sidebar (desktop)
  125 |     const sidebarToggle = page.locator('button:has(svg)').filter({ has: page.locator('.hidden.md\\:flex') }).first();
  126 | 
  127 |     // Try the sidebar toggle button
  128 |     const sidebarBtn = page.locator('.hidden.md\\:flex button').first();
  129 |     if (await sidebarBtn.isVisible().catch(() => false)) {
  130 |       await sidebarBtn.click();
  131 |       await page.waitForTimeout(300);
  132 | 
  133 |       // Sidebar state changed - page is responsive
  134 |       const sidebarExists = await page.locator('.hidden.md\\:flex.border-r').count();
  135 |       // Either sidebar appeared or disappeared - both mean page responded
  136 |       expect(sidebarExists >= 0).toBe(true);
  137 |     }
  138 | 
  139 |     // Also verify theme toggle works as backup probe
  140 |     const toggle = page.locator('button[title="Modo claro"], button[title="Modo oscuro"]').first();
  141 |     await expect(toggle).toBeVisible({ timeout: 5000 });
  142 | 
  143 |     const isDarkBefore = await page.evaluate(() =>
  144 |       document.documentElement.classList.contains("dark")
  145 |     );
  146 |     await toggle.click();
  147 |     await page.waitForTimeout(500);
  148 | 
  149 |     const isDarkAfter = await page.evaluate(() =>
  150 |       document.documentElement.classList.contains("dark")
  151 |     );
  152 |     expect(isDarkAfter).not.toBe(isDarkBefore);
  153 |   });
  154 | 
  155 |   test("multiple rapid requests don't freeze the page", async ({ page }) => {
  156 |     await page.goto("/demo/dashboard-data");
  157 |     await page.waitForTimeout(2000);
  158 | 
  159 |     const textarea = page.locator("textarea");
  160 | 
  161 |     // Send 3 rapid requests
  162 |     await textarea.fill("Dashboard de ventas");
```