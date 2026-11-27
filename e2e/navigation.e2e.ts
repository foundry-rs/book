import { expect, test as base, type Page } from "@playwright/test";

const test = base.extend<{ browserErrors: void }>({
  browserErrors: [
    async ({ page }, use, testInfo) => {
      const errors: string[] = [];
      // Decorative sponsor logos are external; avoid depending on their host.
      await page.route(
        "https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/*.svg",
        (route) =>
          route.fulfill({
            contentType: "image/svg+xml",
            body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>',
          }),
      );
      // Register before the first navigation to catch hydration failures too.
      page.on("pageerror", (error) => errors.push(error.stack ?? error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await use();
      if (errors.length) {
        await testInfo.attach("browser-errors", {
          body: errors.join("\n\n"),
          contentType: "text/plain",
        });
      }
      expect(errors, "No uncaught exceptions or console errors").toEqual([]);
    },
    { auto: true },
  ],
});

async function expectHydrated(page: Page) {
  // A working interactive control proves hydration completed before clicking links.
  await page.getByRole("button", { name: /Search/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
}

test("homepage hydrates and navigates to documentation", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("img", { name: "Foundry", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Get Started", exact: true })).toBeVisible();

  await expectHydrated(page);

  // A full document reload must not masquerade as working client-side routing.
  const document = await page.locator("html").elementHandle();
  await page.getByRole("link", { name: "Get Started", exact: true }).click();
  await expect(page).toHaveURL(/\/introduction\/getting-started$/);
  await expect(page.getByRole("heading", { name: /^Getting Started\b/, level: 2 })).toBeVisible();
  await expect(page.getByRole("table").first()).toContainText("forge");
  expect(await document!.evaluate((element) => element.isConnected)).toBe(true);

  await page.getByRole("link", { name: "installing Foundry", exact: true }).click();
  await expect(page).toHaveURL(/\/introduction\/installation$/);
  await expect(page.getByRole("heading", { name: /^Installation\b/, level: 2 })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/introduction\/getting-started$/);
  await expect(page.getByRole("heading", { name: /^Getting Started\b/, level: 2 })).toBeVisible();
});

test("documentation renders on direct entry and reload", async ({ page }) => {
  const response = await page.goto("/forge");
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("heading", { name: /^Forge\b/, level: 2 })).toBeVisible();
  await expectHydrated(page);
  await page.getByRole("link", { name: /Build and test Compile contracts/ }).click();
  await expect(page).toHaveURL(/\/forge\/testing$/);
  await expect(page.getByRole("heading", { name: /^Testing\b/, level: 2 })).toBeVisible();
  const reload = await page.reload();
  expect(reload?.ok()).toBe(true);
  await expect(page.getByRole("heading", { name: /^Testing\b/, level: 2 })).toBeVisible();
  await expect(page.locator("pre").first()).toBeVisible();
  await expectHydrated(page);
});
