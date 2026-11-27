import { afterEach, expect, it, vi } from 'vite-plus/test'
import { normalizeResults } from '../src/server/normalizeResults'
import { enrichSources, normalizeSourceLinks } from '../src/server/benchmarkSources'
import { publication } from '../src/server/publication'
import { backfillSources } from '../src/server/backfillSources'

afterEach(() => vi.unstubAllGlobals())

const commit = 'f'.repeat(40)
const links = [
  { label: 'example/upstream', url: `https://github.com/example/upstream/tree/${commit}` },
]
const config = {
  host: 'https://clickhouse.example',
  database: 'solar_perf',
  user: 'writer',
  password: '',
}

it('preserves PR 1449 source_links on successful and failed results without fetching catalogs', async () => {
  const fetch = vi.fn()
  vi.stubGlobal('fetch', fetch)
  const rows = normalizeResults(
    {
      results: [
        {
          test_id: 'new-project',
          source_links: links,
          compilers: { solar: { status: 'ok' }, solx: { status: 'failed' } },
        },
      ],
    },
    { commit, workflowRunId: 1 },
  )
  await enrichSources(commit, rows)
  expect(fetch).not.toHaveBeenCalled()
  expect(rows.map((row) => row.source_links)).toEqual([links, links])
  const run = { commit, workflow_run_id: 1 }
  const snapshot = publication(run, rows, [])
  expect(snapshot.source_links).toEqual({
    'new-project': links.map((link) => [link.label, link.url]),
  })
  expect(snapshot.revision).toBe(
    publication(
      run,
      rows.map((row) => ({ ...row, source_links: [] })),
      [],
    ).revision,
  )
})

it('rejects unsafe and malformed links, deduplicates, and bounds producer metadata', () => {
  expect(
    normalizeSourceLinks([
      ...links,
      ...links,
      { label: 'unsafe', url: 'javascript:alert(1)' },
      { label: 'credentials', url: 'https://user:pass@example.com/' },
      { label: '', url: 'https://example.com/' },
      null,
    ]),
  ).toEqual(links)
  expect(
    normalizeSourceLinks(
      Array.from({ length: 100 }, (_, i) => ({ label: 'source', url: `https://example.com/${i}` })),
    ),
  ).toHaveLength(32)
})

it('backfills historical snapshots without changing revisions, timestamps, metrics, or artifacts', async () => {
  const old = {
    commit: 'e'.repeat(40),
    revision: 'a'.repeat(64),
    workflow_run_id: 7,
    run_attempt: 1,
    published_at: '2026-01-01 00:00:00.000',
    measurements: [['counter', '', '', 'solar', 'ok']],
    artifacts: [['counter', 'output.json', 'solar', 2, 'hash', '1.json']],
    source_links: {},
  }
  let written: Record<string, unknown> | undefined
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input, init) => {
      const url = new URL(String(input))
      if (url.hostname === 'raw.githubusercontent.com')
        return new Response('TestCase(test_id="counter", source_code=source("Counter.sol"))')
      if (url.searchParams.has('query')) {
        written = JSON.parse(String(init.body).trim())
        return new Response('')
      }
      expect(String(init.body)).toContain('empty(source_links[m.test_id])')
      return new Response(written ? '' : JSON.stringify(old))
    }),
  )
  expect(await backfillSources(config)).toEqual({ scanned: 1, updated: 1, failed: [] })
  expect(written).toEqual({
    ...old,
    source_links: {
      counter: [
        [
          'Counter.sol',
          `https://github.com/paradigmxyz/solar/blob/${old.commit}/testdata/Counter.sol`,
        ],
      ],
    },
  })
  expect(await backfillSources(config)).toEqual({ scanned: 0, updated: 0, failed: [] })
})

it('reports unresolved historical benchmarks without publishing incomplete metadata', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const fetch = vi.fn(async (input) =>
    String(input).includes('raw.githubusercontent.com')
      ? new Response('')
      : Response.json({ commit: 'b'.repeat(40), measurements: [['unknown']] }),
  )
  vi.stubGlobal('fetch', fetch)
  expect(await backfillSources(config)).toEqual({
    scanned: 1,
    updated: 0,
    failed: ['b'.repeat(40)],
  })
  expect(fetch).toHaveBeenCalledTimes(2)
  warn.mockRestore()
})
