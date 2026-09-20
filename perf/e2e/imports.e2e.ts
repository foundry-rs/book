import { expect, test } from '@playwright/test'

const base = '8c7b6a5e4f32100123456789abcdef0123456789'
const head = '9d8c7b6a5e4f32100123456789abcdef01234567'

test('comparison shows import progress then real table content, without a page reload', async ({
  page,
}) => {
  let polls = 0
  await page.route('**/api/data/runs.json?*', async (route) => {
    if (++polls > 2) return route.continue()
    return route.fulfill({
      status: 202,
      headers: { 'retry-after': '1' },
      json: { status: 'importing', commit: head },
    })
  })
  await page.goto(`/perf/solar/?base=${base}&head=${head}`)
  await expect(page.getByRole('status')).toHaveText('Importing benchmark runs…')
  await page.screenshot({ path: '/tmp/perf-import-pending.png' })
  await expect(page.getByRole('heading', { name: 'Benchmark comparison' })).toBeVisible()
  expect(polls).toBe(3)
})

test('comparison reports actual retry backoff rather than unpublished data', async ({ page }) => {
  await page.route('**/api/data/runs.json?*', (route) =>
    route.fulfill({
      status: 202,
      headers: { 'retry-after': '120' },
      json: { status: 'retry', commit: head },
    }),
  )
  await page.goto(`/perf/solar/?base=${base}&head=${head}`)
  await expect(
    page.getByText('Benchmark import failed. Retry scheduled in 120 seconds.'),
  ).toBeVisible()
  await page.screenshot({ path: '/tmp/perf-import-retry.png' })
})

test('file viewer also displays import progress and surfaces a missing workflow', async ({
  page,
}) => {
  let polls = 0
  await page.route('**/api/data/viewer.json?*', (route) =>
    route.fulfill(
      ++polls === 1
        ? { status: 202, headers: { 'retry-after': '1' }, json: { status: 'queued', commit: head } }
        : {
            status: 404,
            json: { error: 'No benchmark workflow is available for this commit' },
          },
    ),
  )
  await page.goto(`/perf/solar/?base=${base}&head=${head}&view=files&benchmark=demo::factorial`)
  await expect(page.getByRole('status')).toHaveText('Importing benchmark runs…')
  await expect(page.getByText('No benchmark workflow is available for this commit.')).toBeVisible()
})

for (const view of ['comparison', 'files']) {
  test(`${view} resolves full synthetic merge SHAs in direct links`, async ({ page }) => {
    const synthetic = 'a'.repeat(40)
    await page.route(`**/api/resolve?ref=${synthetic}`, (route) =>
      route.fulfill({ json: { commit: base } }),
    )
    const request = page.waitForRequest((request) => {
      const url = new URL(request.url())
      return url.pathname === `/api/data/${view === 'files' ? 'viewer' : 'runs'}.json`
    })
    await page.goto(
      `/perf/solar/?base=${synthetic}&head=${head}${view === 'files' ? '&view=files&benchmark=demo::factorial' : ''}`,
    )
    expect(new URL((await request).url()).searchParams.get('commits')).toBe(`${base},${head}`)
    if (view === 'files') await expect(page.locator('#artifact-sidebar')).toBeVisible()
    else await expect(page.getByRole('heading', { name: 'Benchmark comparison' })).toBeVisible()
  })
}
