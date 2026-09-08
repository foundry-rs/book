import { expect, test } from '@playwright/test'

const url =
  '/perf/solar/?base=8c7b6a5e4f32100123456789abcdef0123456789&head=9d8c7b6a5e4f32100123456789abcdef01234567&view=files&benchmark=demo::factorial&file=runtime.disasm'

test('computes diff in a worker and reuses it for presentation changes', async ({ page }) => {
  let workers = 0
  page.on('worker', () => workers++)
  await page.goto(url)
  await expect(page.getByRole('button', { name: 'Unified', exact: true })).toBeVisible()
  await expect(page.locator('diffs-container').locator('pre')).toBeVisible()
  expect(workers).toBe(1)
  await page.getByRole('button', { name: 'Unified', exact: true }).click()
  await page.getByRole('button', { name: /Switch to .* theme/ }).click()
  await expect(page.locator('diffs-container').locator('pre')).toBeVisible()
  expect(workers).toBe(1)
})

test('worker failures retain readable previews and full downloads', async ({ page }) => {
  await page.route('**/diff.worker.ts*', (route) => route.abort())
  await page.goto(url)
  await expect(page.getByText(/Download the full files below/)).toBeVisible({ timeout: 10000 })
  await expect(page.getByRole('link', { name: 'Download runtime.disasm' })).toHaveCount(2)
})
