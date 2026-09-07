import { afterEach, expect, it, vi } from 'vite-plus/test'

afterEach(() => vi.unstubAllGlobals())

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
    undefined,
  )
  await loadHistory('total_gas', 'other')
  await loadHistory('runtime_size', 'test')
  expect(fetch).toHaveBeenCalledTimes(6)
})
