import { afterEach, expect, it, vi } from 'vite-plus/test'

afterEach(() => vi.unstubAllGlobals())

it('polls 202 without caching its status as a run document', async () => {
  vi.resetModules()
  vi.useFakeTimers()
  try {
    const commit = 'a'.repeat(40)
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json(
          { status: 'importing', commit },
          { status: 202, headers: { 'retry-after': '1' } },
        ),
      )
      .mockResolvedValueOnce(Response.json({ commit, results: [] }))
    vi.stubGlobal('fetch', fetch)
    const { loadRun } = await import('../src/data')
    const result = loadRun(commit)
    await vi.advanceTimersByTimeAsync(1000)
    expect(await result).toMatchObject({ commit, results: [] })
    await loadRun(commit)
    expect(fetch).toHaveBeenCalledTimes(2)
  } finally {
    vi.useRealTimers()
  }
})

it('reports durable retry backoff instead of waiting or showing unpublished data', async () => {
  vi.resetModules()
  vi.stubGlobal(
    'fetch',
    vi.fn(async () =>
      Response.json(
        { status: 'retry', commit: 'a'.repeat(40) },
        { status: 202, headers: { 'retry-after': '120' } },
      ),
    ),
  )
  const { loadRun } = await import('../src/data')
  await expect(loadRun('a'.repeat(40))).rejects.toThrow('Retry scheduled in 120 seconds')
})

it('reuses a resolved run when returning from a revision-pinned viewer link', async () => {
  vi.resetModules()
  const commit = 'a'.repeat(40)
  const revision = 'b'.repeat(64)
  const fetch = vi.fn(async () => Response.json({ commit, revision }))
  vi.stubGlobal('fetch', fetch)
  const { loadRun } = await import('../src/data')
  await loadRun(commit)
  await loadRun(commit, revision)
  expect(fetch).toHaveBeenCalledOnce()
})

it('shares content-addressed artifact reads across commits and compilers', async () => {
  vi.resetModules()
  const fetch = vi.fn(async () => Response.json('same content'))
  vi.stubGlobal('fetch', fetch)
  const { loadArtifact } = await import('../src/data')
  const hash = 'c'.repeat(64)
  await Promise.all([
    loadArtifact('a'.repeat(40), 'test', 'solar', '1.json', hash),
    loadArtifact('b'.repeat(40), 'test', 'solc', '2.json', hash),
  ])
  expect(fetch).toHaveBeenCalledExactlyOnceWith(`/api/data/blobs/${hash}.json`)
})

it('loads both viewer manifests in one request and includes revision pins in cache keys', async () => {
  vi.resetModules()
  const commits = ['a'.repeat(40), 'b'.repeat(40)]
  const fetch = vi.fn(async () => Response.json({ runs: commits.map((commit) => ({ commit })) }))
  vi.stubGlobal('fetch', fetch)
  const { loadViewerRuns } = await import('../src/data')
  await loadViewerRuns(commits[0], commits[1], 'counter', 'c'.repeat(64))
  await loadViewerRuns(commits[0], commits[1], 'counter', 'c'.repeat(64))
  expect(fetch).toHaveBeenCalledOnce()
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('/viewer.json?'),
    expect.objectContaining({ signal: expect.any(AbortSignal) }),
  )
  await loadViewerRuns(commits[0], commits[1], 'counter', 'd'.repeat(64))
  expect(fetch).toHaveBeenCalledTimes(2)
})

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
    expect.objectContaining({ signal: expect.any(AbortSignal) }),
  )
  await Promise.all(commits.map((commit) => loadRun(commit)))
  expect(fetch).toHaveBeenCalledOnce()
})

it('only fetches the uncached comparison side', async () => {
  vi.resetModules()
  const commits = ['a'.repeat(40), 'b'.repeat(40)]
  const fetch = vi.fn(async (url: string) => Response.json({ commit: url.split('/')[4] }))
  vi.stubGlobal('fetch', fetch)
  const { loadRun } = await import('../src/data')
  await loadRun(commits[0])
  await Promise.all(commits.map((commit) => loadRun(commit)))
  expect(fetch).toHaveBeenCalledTimes(2)
  expect(fetch).toHaveBeenLastCalledWith(
    `/api/data/runs/${commits[1]}/run.json?artifacts=0`,
    expect.objectContaining({ signal: expect.any(AbortSignal) }),
  )
})

it('retries failed batches without caching failures', async () => {
  vi.resetModules()
  const commits = ['a'.repeat(40), 'b'.repeat(40)]
  const fetch = vi.fn(async () => new Response('unavailable', { status: 503 }))
  vi.stubGlobal('fetch', fetch)
  const { loadRun } = await import('../src/data')
  expect(
    (await Promise.allSettled(commits.map((commit) => loadRun(commit)))).every(
      (r) => r.status === 'rejected',
    ),
  ).toBe(true)
  fetch.mockImplementation(async () =>
    Response.json({ runs: commits.map((commit) => ({ commit })) }),
  )
  await Promise.all(commits.map((commit) => loadRun(commit)))
  expect(fetch).toHaveBeenCalledTimes(2)
})

it('allows the index HTTP cache while keeping mutable ref resolution fresh', async () => {
  vi.resetModules()
  const fetch = vi.fn(async () => Response.json({ runs: [], commit: 'c'.repeat(40) }))
  vi.stubGlobal('fetch', fetch)
  const { loadIndex, resolveCommit } = await import('../src/data')
  await loadIndex()
  expect(fetch).toHaveBeenLastCalledWith(
    '/api/data/index.json',
    expect.objectContaining({ signal: expect.any(AbortSignal) }),
  )
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
  expect(fetch).toHaveBeenLastCalledWith(
    '/api/data/history.json?metric=total_gas&benchmark=test',
    expect.objectContaining({ signal: expect.any(AbortSignal) }),
  )
  await loadHistory('total_gas', 'other')
  await loadHistory('runtime_size', 'test')
  expect(fetch).toHaveBeenCalledTimes(6)
})
