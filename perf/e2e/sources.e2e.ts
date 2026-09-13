import { expect, test } from '@playwright/test'

test('shows imported source links without a separate source request', async ({ page }) => {
  let requests = 0
  const source =
    'https://github.com/paradigmxyz/solar/blob/9d8c7b6a5e4f32100123456789abcdef01234567/testdata/Factorial.sol'
  page.on('request', (request) => {
    if (request.url().includes('/api/data/sources/')) requests++
  })
  await page.route('**/api/data/runs.json?*', async (route) => {
    const response = await route.fetch()
    const data = await response.json()
    for (const run of data.runs)
      for (const result of run.results) {
        const name = result.test_id === 'demo::factorial' ? 'Factorial' : 'Fibonacci'
        result.source_links = [{ label: `${name}.sol`, url: source.replace('Factorial', name) }]
      }
    await route.fulfill({ json: data })
  })
  await page.goto(
    '/perf/solar/?base=8c7b6a5e4f32100123456789abcdef0123456789&head=9d8c7b6a5e4f32100123456789abcdef01234567',
  )
  await expect(page.getByRole('button', { name: /demo::factorial/ })).toBeVisible()
  expect(requests).toBe(0)
  await page.getByRole('button', { name: /demo::factorial/ }).click()
  await expect(page.getByRole('link', { name: 'Factorial.sol ↗', exact: true })).toHaveAttribute(
    'href',
    source,
  )
  await page.getByRole('button', { name: /demo::fibonacci/ }).click()
  await expect(page.getByRole('link', { name: 'Fibonacci.sol ↗', exact: true })).toBeVisible()
  expect(requests).toBe(0)
  await expect(page.getByRole('link', { name: 'Solar repository' })).toHaveCount(0)
})
