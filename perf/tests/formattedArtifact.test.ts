import { afterEach, expect, it, vi } from 'vite-plus/test'

afterEach(() => vi.unstubAllGlobals())

it('retains formatted contents across viewer visits and keeps large files unparsed', async () => {
  vi.resetModules()
  const fetch = vi.fn(async () => Response.json('{"value":1}'))
  vi.stubGlobal('fetch', fetch)
  const { loadFormattedArtifact, maxInteractiveArtifact } = await import('../src/formattedArtifact')
  const source = {
    commit: 'a'.repeat(40),
    benchmark: 'test',
    compiler: 'solar',
    storagePath: '1.json',
    label: 'Solar',
    contentHash: 'b'.repeat(64),
  }
  const first = await loadFormattedArtifact(source, 'output.json', 'json')
  expect(first).toBe('{\n  "value": 1\n}\n')
  expect(await loadFormattedArtifact(source, 'output.json', 'json')).toBe(first)
  expect(fetch).toHaveBeenCalledOnce()
  const large = `{"value":"${'x'.repeat(maxInteractiveArtifact)}"}`
  fetch.mockImplementation(async () => Response.json(large))
  expect(
    await loadFormattedArtifact({ ...source, contentHash: 'c'.repeat(64) }, 'output.json', 'json'),
  ).toBe(large)
})
