import { responseCache } from './cache'
import { loadArtifact } from './data'
import { formatArtifactContents } from './artifactFormat'
import { artifactLanguage } from './highlight'
import type { FileContents } from '@pierre/diffs'

export const maxInteractiveArtifact = 512 * 1024
const formatted = responseCache<string | null>(3_600_000, 16 * 1024 * 1024)

export interface ArtifactSource {
  commit: string
  benchmark: string
  compiler: string
  label: string
  storagePath?: string
  contentHash?: string
}

export async function loadDiffFile(
  source: ArtifactSource,
  path: string,
  language: string,
): Promise<FileContents | null> {
  const contents = await loadFormattedArtifact(source, path, language)
  if (contents === null) return null
  const lang = artifactLanguage(path, language)
  if (contents.length > maxInteractiveArtifact) return { name: path, contents, lang }
  // Hash the actual formatted text, including legacy artifacts without content hashes.
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(contents))
  const digest = Array.from(new Uint8Array(hash), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('')
  return { name: path, contents, lang, cacheKey: JSON.stringify([path, lang, digest]) }
}

export function loadFormattedArtifact(source: ArtifactSource, path: string, language: string) {
  if (!source.storagePath) return Promise.resolve(null)
  const identity = source.contentHash ?? [
    source.commit,
    source.benchmark,
    source.compiler,
    source.storagePath,
  ]
  return formatted(JSON.stringify([identity, path, language]), async () => {
    const contents = await loadArtifact(
      source.commit,
      source.benchmark,
      source.compiler,
      source.storagePath!,
      source.contentHash,
    )
    // Large outputs remain downloadable, but must not freeze navigation with parsing/diffing.
    return contents && contents.length > maxInteractiveArtifact
      ? contents
      : formatArtifactContents(contents, path, language)
  })
}
