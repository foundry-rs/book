import { afterEach, expect, it, vi } from 'vite-plus/test'

afterEach(() => vi.unstubAllGlobals())

it('reuses fresh compact dashboard history for an individual benchmark', async () => {
  vi.resetModules()
  const history = {
    runs: [{ commit: 'a'.repeat(40), timestamp: '2026-09-08' }],
    values: { test: [0], other: [null] },
  }
  const fetch = vi.fn(async () => Response.json(history))
  vi.stubGlobal('fetch', fetch)
  const { loadHistory } = await import('../src/data')
  expect(await loadHistory('total_gas')).toEqual(history)
  expect(await loadHistory('total_gas', 'test')).toEqual({
    runs: history.runs,
    values: { test: [0] },
  })
  expect(await loadHistory('total_gas', 'absent')).toEqual({ runs: history.runs, values: {} })
  expect(fetch).toHaveBeenCalledOnce()
})

it('batches comparison runs and retains each run in the individual cache', async () => {
  vi.resetModules()
  const commits = ['a'.repeat(40), 'b'.repeat(40)]
  const fetch = vi.fn(async () => Response.json({ runs: commits.map((commit) => ({ commit })) }))
  vi.stubGlobal('fetch', fetch)
  const { loadRun } = await import('../src/data')
  const runs = await Promise.all([loadRun(commits[1]), loadRun(commits[0])])
  expect(runs.map((run) => run.commit)).toEqual([...commits].reverse())
  expect(fetch).toHaveBeenCalledExactlyOnceWith(
    `/api/data/runs.json?commits=${commits.join('%2C')}`,
  )
  await Promise.all(commits.map(loadRun))
  expect(fetch).toHaveBeenCalledOnce()
})

it('only fetches the uncached comparison side', async () => {
  vi.resetModules()
  const commits = ['a'.repeat(40), 'b'.repeat(40)]
  const fetch = vi.fn(async (url: string) => Response.json({ commit: url.split('/')[4] }))
  vi.stubGlobal('fetch', fetch)
  const { loadRun } = await import('../src/data')
  await loadRun(commits[0])
  await Promise.all(commits.map(loadRun))
  expect(fetch).toHaveBeenCalledTimes(2)
  expect(fetch).toHaveBeenLastCalledWith(`/api/data/runs/${commits[1]}/run.json?artifacts=0`)
})

it('retries failed batches without caching failures', async () => {
  vi.resetModules()
  const commits = ['a'.repeat(40), 'b'.repeat(40)]
  const fetch = vi.fn(async () => new Response('unavailable', { status: 503 }))
  vi.stubGlobal('fetch', fetch)
  const { loadRun } = await import('../src/data')
  expect(
    (await Promise.allSettled(commits.map(loadRun))).every((r) => r.status === 'rejected'),
  ).toBe(true)
  fetch.mockImplementation(async () =>
    Response.json({ runs: commits.map((commit) => ({ commit })) }),
  )
  await Promise.all(commits.map(loadRun))
  expect(fetch).toHaveBeenCalledTimes(2)
})

it('allows the index HTTP cache while keeping mutable ref resolution fresh', async () => {
  vi.resetModules()
  const fetch = vi.fn(async () => Response.json({ runs: [], commit: 'c'.repeat(40) }))
  vi.stubGlobal('fetch', fetch)
  const { loadIndex, resolveCommit } = await import('../src/data')
  await loadIndex()
  expect(fetch).toHaveBeenLastCalledWith('/api/data/index.json')
  await resolveCommit('main')
  expect(fetch).toHaveBeenLastCalledWith('/api/resolve?ref=main', { cache: 'no-store' })
})

it('loads manifests lazily without repeating comparison metrics', async () => {
  vi.resetModules()
  const sha = 'b'.repeat(40)
  const fetch = vi.fn(async (input) =>
    Response.json(
      String(input).endsWith('artifacts.json')
        ? { test: [] }
        : { commit: sha, results: [], artifacts: {} },
    ),
  )
  vi.stubGlobal('fetch', fetch)
  const { loadRun, loadRunWithArtifacts } = await import('../src/data')
  await loadRun(sha)
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch.mock.calls[0][0]).toContain('artifacts=0')
  expect((await loadRunWithArtifacts(sha)).artifacts).toEqual({ test: [] })
  await loadRunWithArtifacts(sha)
  expect(fetch).toHaveBeenCalledTimes(2)
})

it('revisiting artifacts and runs does not fetch again in the same instance', async () => {
  vi.resetModules()
  const fetch = vi.fn(async () => new Response(JSON.stringify('contents')))
  vi.stubGlobal('fetch', fetch)
  const { loadArtifact, loadRun, loadHistory } = await import('../src/data')
  const sha = 'a'.repeat(40)
  await loadArtifact(sha, 'test', 'solar', '1.json')
  await loadArtifact(sha, 'test', 'solar', '2.json')
  await loadArtifact(sha, 'test', 'solar', '1.json')
  expect(fetch).toHaveBeenCalledTimes(2)
  fetch.mockImplementation(async () => new Response(JSON.stringify({ commit: sha })))
  await loadRun(sha)
  await loadRun(sha)
  expect(fetch).toHaveBeenCalledTimes(3)
  fetch.mockImplementation(async () => new Response(JSON.stringify({ runs: [], values: {} })))
  await loadHistory('total_gas', 'test')
  await loadHistory('total_gas', 'test')
  expect(fetch).toHaveBeenCalledTimes(4)
  expect(fetch).toHaveBeenLastCalledWith('/api/data/history.json?metric=total_gas&benchmark=test')
  await loadHistory('total_gas', 'other')
  await loadHistory('runtime_size', 'test')
  expect(fetch).toHaveBeenCalledTimes(6)
})
