import { expect, it, vi } from 'vitest'
import { loadRawArtifact } from '../src/ArtifactActions'
import { loadArtifact } from '../src/data'

vi.mock('../src/data', () => ({ loadArtifact: vi.fn(), artifactUrl: vi.fn() }))

const source = {
  commit: 'a'.repeat(40),
  benchmark: 'factorial',
  compiler: 'solar',
  label: 'Head Solar',
  storagePath: '0.json',
  contentHash: 'b'.repeat(64),
}

it('loads the selected side without formatting its contents', async () => {
  const contents = '{"html":"<script>alert(1)</script>","value":1}\r\n'
  vi.mocked(loadArtifact).mockResolvedValueOnce(contents)
  expect(await loadRawArtifact(source)).toBe(contents)
  expect(loadArtifact).toHaveBeenLastCalledWith(
    source.commit,
    source.benchmark,
    source.compiler,
    source.storagePath,
    source.contentHash,
  )
})

it('does not request files absent from the selected compiler manifest', async () => {
  vi.mocked(loadArtifact).mockClear()
  expect(await loadRawArtifact({ ...source, storagePath: undefined })).toBeNull()
  expect(loadArtifact).not.toHaveBeenCalled()
})

it('preserves empty files and reports missing bodies', async () => {
  vi.mocked(loadArtifact).mockResolvedValueOnce('').mockResolvedValueOnce(null)
  expect(await loadRawArtifact(source)).toBe('')
  expect(await loadRawArtifact(source)).toBeNull()
})
