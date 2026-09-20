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
