import { expect, test } from '@playwright/test'

const url =
  '/perf/solar/?base=8c7b6a5e4f32100123456789abcdef0123456789&head=9d8c7b6a5e4f32100123456789abcdef01234567&view=files&benchmark=demo::factorial&file=runtime.disasm'

test('gutter clicks and Shift-click ranges update sharable side-aware anchors', async ({
  page,
}) => {
  await page.goto(url)
  const right = page.locator('diffs-container code[data-additions]')
  const left = page.locator('diffs-container code[data-deletions]')
  await right.locator('[data-column-number="2"]').click()
  await expect(page).toHaveURL(/#R2$/)
  await expect(right.locator('[data-column-number="2"]')).toHaveAttribute('data-selected-line')
  await right.locator('[data-column-number="4"]').click({ modifiers: ['Shift'] })
  await expect(page).toHaveURL(/#R2-R4$/)
  await page.reload()
  await expect(right.locator('[data-column-number="3"]')).toHaveAttribute('data-selected-line')
  await left.locator('[data-column-number="2"]').click()
  await expect(page).toHaveURL(/#L2$/)
  await page.getByRole('button', { name: 'Unified', exact: true }).click()
  await expect(
    page.locator('diffs-container [data-column-number="2"][data-selected-line]').first(),
  ).toBeVisible()
  await page.getByRole('combobox', { name: 'Right', exact: true }).selectOption('head:solx')
  await expect(page).not.toHaveURL(/#/)
  await expect(page.locator('diffs-container [data-selected-line]')).toHaveCount(0)
})

for (const identical of [false, true]) {
  test(`deep links reveal virtualized ${identical ? 'identical' : 'collapsed diff'} lines`, async ({
    page,
  }) => {
    await page.route('**/api/data/runs/**/1.json', (route) => {
      const head = route.request().url().includes('9d8c7b6a5e4f32100123456789abcdef01234567')
      return route.fulfill({
        json: Array.from(
          { length: 2000 },
          (_, i) => `PUSH2 ${i === 1000 && head && !identical ? 'changed' : i}`,
        ).join('\n'),
      })
    })
    await page.goto(`${url}#R1800-R1802`)
    const line = page
      .locator('diffs-container [data-column-number="1800"][data-selected-line]')
      .last()
    await expect(line).toBeVisible()
    await expect.poll(async () => (await line.boundingBox())?.y).toBeGreaterThanOrEqual(80)
    expect((await line.boundingBox())!.y).toBeLessThan(200)
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(1000)
    await page.getByRole('button', { name: 'abi.json', exact: true }).click()
    await expect(page).not.toHaveURL(/#/)
    await expect(page.locator('diffs-container [data-selected-line]')).toHaveCount(0)
  })
}
