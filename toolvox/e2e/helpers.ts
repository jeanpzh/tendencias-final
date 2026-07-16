import { type Page } from "@playwright/test";

export async function sendChatMessage(page: Page, message: string) {
  const textarea = page.locator("textarea");
  await textarea.fill(message);
  await textarea.press("Enter");
}

export async function waitForToolRender(page: Page, timeout = 40_000) {
  await page.waitForFunction(
    () => {
      const html = document.body.innerHTML;
      return (
        html.includes("recharts") ||
        html.includes("<table") ||
        html.includes("kanban-block") ||
        html.includes("form-block") ||
        html.includes("config-block") ||
        html.includes("selector-block") ||
        html.includes("slider-block")
      );
    },
    { timeout }
  );
}

export async function scrollContainer(page: Page, scrollTop: number) {
  await page.evaluate((top) => {
    const els = document.querySelectorAll("div");
    for (const el of els) {
      if (el.scrollHeight > el.clientHeight && el.clientHeight > 100) {
        el.scrollTop = top;
        return;
      }
    }
  }, scrollTop);
}
