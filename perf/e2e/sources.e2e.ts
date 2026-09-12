import { expect, test } from '@playwright/test'

test('loads pinned sources only when expanded and reuses the commit catalog', async ({ page }) => {
  let requests = 0
  const source =
    'https://github.com/paradigmxyz/solar/blob/9d8c7b6a5e4f32100123456789abcdef01234567/testdata/Factorial.sol'
  await page.route('**/api/data/sources/*.json', (route) => {
    requests++
    return route.fulfill({
      json: {
        'demo::factorial': [{ label: 'Factorial.sol', url: source }],
        'demo::fibonacci': [
          { label: 'Fibonacci.sol', url: source.replace('Factorial', 'Fibonacci') },
        ],
      },
    })
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
  expect(requests).toBe(1)
  await expect(page.getByRole('link', { name: 'Solar repository' })).toHaveCount(0)
})
