import { afterEach, expect, it, vi } from 'vite-plus/test'

afterEach(() => vi.unstubAllGlobals())

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
  fetch.mockImplementation(async () => new Response(JSON.stringify({ runs: [] })))
  await loadHistory()
  await loadHistory()
  expect(fetch).toHaveBeenCalledTimes(4)
})
