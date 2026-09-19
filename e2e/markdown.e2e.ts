import { expect, test } from "@playwright/test";

test("production build serves the Markdown exports", async ({ request }) => {
  const index = await request.get("/llms.txt");
  expect(index.ok()).toBe(true);
  expect(await index.text()).toContain("/introduction/getting-started");

  const full = await request.get("/llms-full.txt");
  expect(full.ok()).toBe(true);
  expect(await full.text()).toContain("## Getting Started");

  const page = await request.get("/assets/md/introduction/getting-started.md");
  expect(page.ok()).toBe(true);
  expect(await page.text()).toContain("## Getting Started");
});
