import { expect, test } from '@playwright/test'

test('column headers toggle sorting with mouse and keyboard and retain filtering', async ({
  page,
}) => {
  await page.goto(
    '/perf/solar/?base=8c7b6a5e4f32100123456789abcdef0123456789&head=9d8c7b6a5e4f32100123456789abcdef01234567',
  )
  const names = page.locator('.benchmark-row > button code')
  await expect(names).toHaveText(['›demo::factorial', '›demo::fibonacci'])
  const benchmark = page.locator('.header-row button').first()
  await benchmark.click()
  await expect(benchmark).toHaveAccessibleName('Benchmark, sorted ascending')
  await benchmark.press('Enter')
  await expect(names).toHaveText(['›demo::fibonacci', '›demo::factorial'])
  await expect(benchmark).toHaveAccessibleName('Benchmark, sorted descending')
  for (const header of await page.locator('.header-row button').all()) {
    await header.click()
    await expect(header).toHaveAttribute('aria-pressed', 'true')
    await expect(header).toHaveAccessibleName(/sorted ascending/)
    await header.press('Space')
    await expect(header).toHaveAccessibleName(/sorted descending/)
  }
  await page.getByRole('textbox', { name: 'Filter benchmarks' }).fill('factorial')
  await expect(names).toHaveText(['›demo::factorial'])
  await page.getByRole('combobox', { name: 'Metric', exact: true }).selectOption('runtimeSize')
  await expect(names).toHaveText(['›demo::factorial'])
})

test('keeps the selected benchmark in view after loading a link and sorting', async ({ page }) => {
  await page.route('**/api/data/runs.json?*', async (route) => {
    const response = await route.fetch()
    const data = await response.json()
    for (const run of data.runs) {
      run.results = Array.from({ length: 40 }, (_, index) => ({
        ...run.results[0],
        test_id: `benchmark-${String(index).padStart(2, '0')}`,
      }))
    }
    await route.fulfill({ json: data })
  })
  await page.goto(
    '/perf/solar/?base=8c7b6a5e4f32100123456789abcdef0123456789&head=9d8c7b6a5e4f32100123456789abcdef01234567&benchmark=benchmark-39',
  )
  const selected = page.locator('.benchmark-row > button[aria-expanded="true"]')
  await expect(selected).toContainText('benchmark-39')
  await expect(selected).toBeInViewport({ ratio: 1 })
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)

  const header = page.locator('.header-row button').first()
  await header.click()
  await expect(selected).toBeInViewport({ ratio: 1 })
  await header.click()
  await expect(selected).toBeInViewport({ ratio: 1 })
  await expect(page.locator('.benchmark-row > button').first()).toHaveAttribute(
    'aria-expanded',
    'true',
  )

  // Opening a later row collapses the earlier details, which can move the new selection.
  const another = page.getByRole('button', { name: /benchmark-20/ })
  await another.click()
  await expect(another).toHaveAttribute('aria-expanded', 'true')
  await expect(another).toBeInViewport({ ratio: 1 })
})
