import { expect, test } from '@playwright/test'

for (const hash of ['', '#section', '#benchmark-00', '#benchmark-39']) {
  test(`dashboard scrolls to the requested benchmark with ${hash || 'no fragment'} after history loads`, async ({
    page,
  }) => {
    let releaseHistory = () => {}
    const historyReady = new Promise<void>((resolve) => {
      releaseHistory = resolve
    })
    await page.route('**/api/data/history.json?*', async (route) => {
      const response = await route.fetch()
      const data = await response.json()
      data.values = Object.fromEntries(
        Array.from({ length: 40 }, (_, index) => [
          `benchmark-${String(index).padStart(2, '0')}`,
          Object.values(data.values)[0],
        ]),
      )
      await historyReady
      await route.fulfill({ json: data })
    })
    await page.goto(`/perf/solar/?benchmark=benchmark-39${hash}`)
    await expect(page.locator('.graph-card')).toHaveCount(0)
    releaseHistory()
    const selected = page.locator('.graph-card').filter({
      has: page.getByRole('heading', { name: 'benchmark-39', exact: true }),
    })
    await expect(selected).toBeInViewport({ ratio: 1 })
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
    await page.reload()
    await expect(selected).toBeInViewport({ ratio: 1 })
    const nextHash = hash === '#benchmark-00' ? '#benchmark-01' : '#benchmark-00'
    await page.goto(`/perf/solar/?benchmark=benchmark-39${nextHash}`)
    await expect(selected).toBeInViewport({ ratio: 1 })
    await expect(page).toHaveURL(`/perf/solar/?benchmark=benchmark-39${nextHash}`)
    await page.goBack()
    await expect(selected).toBeInViewport({ ratio: 1 })
    await page.goForward()
    await expect(selected).toBeInViewport({ ratio: 1 })
  })
}
