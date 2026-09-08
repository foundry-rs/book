import { afterEach, expect, it, vi } from 'vite-plus/test'
import { pendingImport } from '../src/server/importStatus'
import { createApi } from '../src/server/api'
import { ImportPendingError } from '../src/server/pending'

const config = { host: 'https://clickhouse.example', database: 'test', user: 'read', password: '' }
const commit = 'a'.repeat(40)
afterEach(() => vi.unstubAllGlobals())

it('returns typed 202 pending responses without caching them', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response('')),
  )
  const app = createApi({
    clickHouse: config,
    importRun: async () => {
      throw new ImportPendingError(1, 'importing', commit)
    },
  })
  const response = await app.request(`/api/data/runs/${commit}/run.json?artifacts=0`)
  expect(response.status).toBe(202)
  expect(response.headers.get('retry-after')).toBe('1')
  expect(response.headers.get('cache-control')).toBe('no-store')
  expect(await response.json()).toMatchObject({ status: 'importing', commit })
})

it('reads durable retry state without exposing internal failure details', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () =>
      Response.json({ state: 'retry', retry_after: 120, last_error: 'private backend detail' }),
    ),
  )
  const pending = await pendingImport(config, commit)
  expect(pending).toMatchObject({ state: 'retry', retryAfter: 120, commit })
  expect(pending?.message).not.toContain('private')
})

it.each(['importing', 'queued'])(
  'polls active %s jobs quickly and recovers expired jobs',
  async (state) => {
    const fetch = vi.fn(async () => Response.json({ state, retry_after: 299 }))
    vi.stubGlobal('fetch', fetch)
    expect(await pendingImport(config, commit)).toMatchObject({ state, retryAfter: 1 })
    fetch.mockImplementation(async () => Response.json({ state, retry_after: 0 }))
    expect(await pendingImport(config, commit)).toBeNull()
  },
)
