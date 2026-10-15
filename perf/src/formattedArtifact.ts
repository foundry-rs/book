import { responseCache } from './cache'
import { loadArtifact } from './data'
import { formatArtifactContents } from './artifactFormat'
import { artifactLanguage } from './highlight'
import type { FileContents } from '@pierre/diffs'

const formatted = responseCache<FileContents | null>(3_600_000, 16 * 1024 * 1024)

export interface ArtifactSource {
  commit: string
  benchmark: string
  compiler: string
  label: string
  storagePath?: string
  contentHash?: string
}

export function loadDiffFile(
  source: ArtifactSource,
  path: string,
  language: string,
): Promise<FileContents | null> {
  if (!source.storagePath) return Promise.resolve(null)
  const identity = source.contentHash ?? [
    source.commit,
    source.benchmark,
    source.compiler,
    source.storagePath,
  ]
  return formatted(JSON.stringify([identity, path, language]), async () => {
    const raw = await loadArtifact(
      source.commit,
      source.benchmark,
      source.compiler,
      source.storagePath!,
      source.contentHash,
    )
    if (raw === null) return null
    const contents = formatArtifactContents(raw, path, language)!
    const lang = artifactLanguage(path, language)
    // Hash the actual formatted text, including legacy artifacts without content hashes.
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(contents))
    const digest = Array.from(new Uint8Array(hash), (byte) =>
      byte.toString(16).padStart(2, '0'),
    ).join('')
    return { name: path, contents, lang, cacheKey: JSON.stringify([path, lang, digest]) }
  })
}
