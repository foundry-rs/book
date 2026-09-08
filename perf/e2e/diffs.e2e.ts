import { expect, test } from '@playwright/test'

const url =
  '/perf/solar/?base=8c7b6a5e4f32100123456789abcdef0123456789&head=9d8c7b6a5e4f32100123456789abcdef01234567&view=files&benchmark=demo::factorial&file=runtime.disasm'

test('computes diff in a worker and reuses it for presentation changes', async ({ page }) => {
  let workers = 0
  page.on('worker', (worker) => {
    if (worker.url().includes('diff.worker')) workers++
  })
  await page.goto(url)
  await expect(page.getByRole('button', { name: 'Unified', exact: true })).toBeVisible()
  await expect(page.locator('diffs-container').locator('pre')).toBeVisible()
  await expect(page.locator('.solar-diff')).toHaveCSS('overflow', 'auto')
  // A plain-text placeholder is not proof that worker highlighting succeeded.
  await expect(page.locator('diffs-container').locator('code span[style]').first()).toBeVisible()
  expect(workers).toBe(1)
  await page.getByRole('button', { name: 'Unified', exact: true }).click()
  await page.getByRole('button', { name: /Switch to .* theme/ }).click()
  await expect(page.locator('diffs-container').locator('pre')).toBeVisible()
  expect(workers).toBe(1)
})

test('compiler switches isolate highlight caches and revisits reuse computed diffs', async ({
  page,
}) => {
  const workers: string[] = []
  page.on('worker', (worker) => workers.push(worker.url()))
  await page.goto(url)
  const code = page.locator('diffs-container').locator('code[data-additions]')
  await expect(code).toContainText('0x28')
  await expect(page.locator('diffs-container').locator('code span[style]').first()).toBeVisible()
  const initialWorkers = workers.length
  await page.getByRole('combobox', { name: 'Right', exact: true }).selectOption('head:solx')
  await expect(code).toContainText('0x2e')
  await expect(code).not.toContainText('0x28')
  await page.getByRole('combobox', { name: 'Right', exact: true }).selectOption('head:solar')
  await expect(code).toContainText('0x28')
  await expect(code).not.toContainText('0x2e')
  expect(workers.length).toBe(initialWorkers + 1)
})

test('virtualizes long files and renders their last lines on scroll', async ({ page }) => {
  const contents = Array.from(
    { length: 2000 },
    (_, i) => `PUSH2 0x${i.toString(16).padStart(4, '0')}`,
  ).join('\n')
  await page.route('**/api/data/runs/**/1.json', (route) => route.fulfill({ json: contents }))
  await page.goto(url)
  await expect(page.getByText('Contents are identical.', { exact: true })).toBeVisible()
  const code = page.locator('diffs-container').locator('code')
  await expect(code).toContainText('0x0000')
  await expect(code).not.toContainText('0x07cf')
  await page.locator('.solar-diff').press('End')
  await expect(code).toContainText('0x07cf')
  await expect(code).not.toContainText('0x0000')
})

test('leaving a pending diff cannot replace the newly selected file', async ({ page }) => {
  await page.route('**/diff.worker.ts*', (route) =>
    route.fulfill({ contentType: 'text/javascript', body: 'self.onmessage = () => {}' }),
  )
  await page.goto(url)
  await expect(page.getByText('Computing diff…', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'abi.json', exact: true }).click()
  await expect(page.getByText('Contents are identical.', { exact: true })).toBeVisible()
  await expect(page.locator('diffs-container').locator('pre')).toBeVisible()
  await expect(page.getByText(/Download the full files below/)).toHaveCount(0)
})

test('worker failures retain readable previews and full downloads', async ({ page }) => {
  await page.route('**/diff.worker.ts*', (route) => route.abort())
  await page.goto(url)
  await expect(page.getByText(/Download the full files below/)).toBeVisible({ timeout: 10000 })
  await expect(page.getByRole('link', { name: 'Download runtime.disasm' })).toHaveCount(2)
})

test('defers computation while hidden and starts when visible', async ({ page }) => {
  let workers = 0
  page.on('worker', (worker) => {
    if (worker.url().includes('diff.worker')) workers++
  })
  await page.addInitScript(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
  })
  await page.goto(url)
  await expect(page.getByText('Computing diff…', { exact: true })).toBeVisible()
  expect(workers).toBe(0)
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(page.getByRole('button', { name: 'Unified', exact: true })).toBeVisible()
  expect(workers).toBe(1)
})
