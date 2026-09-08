import { responseCache } from './cache'
import { loadArtifact } from './data'
import { formatArtifactContents } from './artifactFormat'

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
