import { expect, test } from '@playwright/test'

const url =
  '/perf/solar/?base=8c7b6a5e4f32100123456789abcdef0123456789&head=9d8c7b6a5e4f32100123456789abcdef01234567&view=files&benchmark=demo::factorial&file=abi.json'
const raw = '{"html":"<script>window.artifactExecuted=true</script>","value":1}\r\n'

test('copies original text and opens a safe plain-text tab for either side', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.route('**/api/data/runs/**/2.json', (route) => route.fulfill({ json: raw }))
  await page.goto(url)
  const groups = page.getByRole('group', { name: /file actions$/ })
  await expect(groups).toHaveCount(2)
  for (const index of [0, 1]) {
    const group = groups.nth(index)
    await expect(group.getByRole('button', { name: /^Copy/ })).toBeEnabled()
    await group.getByRole('button', { name: /^Copy/ }).click()
    await expect(group.getByRole('status')).toHaveText('Copied')
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(raw)
    const popupPromise = page.waitForEvent('popup')
    await group.getByRole('link', { name: /^Open/ }).click()
    const popup = await popupPromise
    await popup.waitForLoadState()
    expect(await popup.evaluate(() => document.contentType)).toBe('text/plain')
    expect(
      await popup.evaluate(() => fetch(location.href).then((response) => response.text())),
    ).toBe(raw)
    expect(await popup.evaluate(() => 'artifactExecuted' in window)).toBe(false)
    await popup.close()
  }
})

test('offers the raw tab when clipboard access fails', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined })
  })
  await page.goto(url)
  const group = page.getByRole('group', { name: /file actions$/ }).first()
  await expect(group.getByRole('button', { name: /^Copy/ })).toBeEnabled()
  await group.getByRole('button', { name: /^Copy/ }).click()
  await expect(group.getByRole('status')).toHaveText('Copy failed; open raw to copy manually')
  await expect(group.getByRole('link', { name: /^Open/ })).toBeVisible()
})

test('disables actions for missing files and enables them for empty files', async ({ page }) => {
  await page.route('**/api/data/runs/**/2.json', (route) =>
    route.request().url().includes('8c7b6a5e4f32100123456789abcdef0123456789')
      ? route.fulfill({ status: 404 })
      : route.fulfill({ json: '' }),
  )
  await page.goto(url)
  const groups = page.getByRole('group', { name: /file actions$/ })
  await expect(groups.nth(1).getByRole('button', { name: /^Copy/ })).toBeEnabled()
  await expect(groups.nth(0).getByRole('button', { name: /^Copy/ })).toBeDisabled()
  await expect(groups.nth(0).getByRole('button', { name: /^Open/ })).toBeDisabled()
  await expect(groups.nth(1).getByRole('link', { name: /^Open/ })).toBeVisible()
})

test('updates actions after switching files and compilers', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto(url)
  await page.getByRole('treeitem', { name: 'optimized.yul', exact: true }).click()
  await page.getByRole('combobox', { name: 'Right', exact: true }).selectOption('head:solc')
  const group = page.getByRole('group', { name: /file actions$/ }).nth(1)
  await expect(group.getByRole('button', { name: /^Copy/ })).toBeEnabled()
  await group.getByRole('button', { name: /^Copy/ }).click()
  await expect(group.getByRole('status')).toHaveText('Copied')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('calldataload(0), 43')
})
