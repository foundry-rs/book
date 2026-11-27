import { afterEach, expect, it, vi } from 'vite-plus/test'
import { createApi } from '../src/server/api'
import { validHistoryCursor } from '../src/historySeries'

const config = {
  database: 'solar_perf',
  host: 'https://clickhouse.example',
  password: '',
  user: 'solar_web',
}
afterEach(() => vi.unstubAllGlobals())

it('paginates by timestamp and commit, retaining milliseconds and a complete page of values', async () => {
  const rows = Array.from({ length: 1001 }, (_, index) => ({
    commit: (1001 - index).toString(16).padStart(40, '0'),
    timestamp: '2026-10-01T12:00:00.123000Z',
    test_id: 'counter',
    value: index,
  }))
  const fetch = vi.fn<typeof globalThis.fetch>(
    async () => new Response(rows.map((row) => JSON.stringify(row)).join('\n')),
  )
  vi.stubGlobal('fetch', fetch)
  const app = createApi({ clickHouse: config })
  const response = await app.request('/api/data/history.json?range=all')
  const page = await response.json()
  expect(page.runs).toHaveLength(1000)
  expect(page.values.counter).toHaveLength(1000)
  expect(page.nextCursor).toBe(`${rows[999].timestamp},${rows[999].commit}`)
  expect(fetch.mock.calls[0][1]?.body).not.toContain('{cutoff:String}')
  await app.request(
    `/api/data/history.json?range=all&cursor=${encodeURIComponent(page.nextCursor)}`,
  )
  const [url, options] = fetch.mock.calls[1]
  expect((url as URL).searchParams.get('param_before')).toBe(rows[999].timestamp)
  expect((url as URL).searchParams.get('param_commit')).toBe(rows[999].commit)
  expect(options?.body).toContain(
    '(started_at, commit) < (parseDateTime64BestEffort({before:String}, 3), {commit:String})',
  )
})

it('bounds date ranges and rejects invalid selections before querying', async () => {
  const fetch = vi.fn<typeof globalThis.fetch>(async () => new Response(''))
  vi.stubGlobal('fetch', fetch)
  const app = createApi({ clickHouse: config })
  for (const [range, days] of [
    ['30d', 30],
    ['90d', 90],
    ['1y', 365],
  ] as const) {
    const response = await app.request(`/api/data/history.json?range=${range}`)
    expect(await response.json()).toEqual({ runs: [], values: {} })
    const url = fetch.mock.calls.at(-1)![0] as URL
    const cutoff = Date.parse(url.searchParams.get('param_cutoff')!)
    expect(Math.abs(Date.now() - cutoff - days * 86400000)).toBeLessThan(1000)
  }
  for (const query of [
    'range=forever',
    'cursor=oops',
    `cursor=2026-02-30T00:00:00Z,${'a'.repeat(40)}`,
  ])
    expect((await app.request(`/api/data/history.json?${query}`)).status).toBe(400)
  expect(fetch).toHaveBeenCalledTimes(3)
  expect(validHistoryCursor(`2026-10-01T12:00:00.123000Z,${'a'.repeat(40)}`)).toBe(true)
})
