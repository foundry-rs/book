import { useEffect, useState } from 'react'
import type { FileDiffMetadata } from '@pierre/diffs'
import type { FileTreeRowDecoration } from '@pierre/trees'
import { computeDiff } from './computeDiff'
import { loadDiffFile, type ArtifactSource } from './formattedArtifact'
import { imageType } from './imageArtifacts'

export interface LineCounts {
  added: number
  removed: number
}

export interface LineCountRequest {
  path: string
  language: string
  before: ArtifactSource
  after: ArtifactSource
}

const concurrency = 3

const lines = (text: string) => (text ? text.split('\n').length - (text.endsWith('\n') ? 1 : 0) : 0)

export function sumHunks(diff: FileDiffMetadata): LineCounts {
  return {
    added: diff.hunks.reduce((sum, hunk) => sum + hunk.additionLines, 0),
    removed: diff.hunks.reduce((sum, hunk) => sum + hunk.deletionLines, 0),
  }
}

/** A pair needs counting unless it is an image or both sides are known to hold the same bytes. */
export function mayDiffer({ path, before, after }: LineCountRequest) {
  if (imageType(path) || (!before.storagePath && !after.storagePath)) return false
  return (
    !before.storagePath ||
    !after.storagePath ||
    !before.contentHash ||
    before.contentHash !== after.contentHash
  )
}

/** The +N −M label of a file row, or of a directory row for the files beneath it. */
export function lineCountDecoration(
  item: { kind: 'directory' | 'file'; path: string },
  counts: Record<string, LineCounts>,
): FileTreeRowDecoration | null {
  const prefix = item.path.endsWith('/') ? item.path : `${item.path}/`
  const total = { added: 0, removed: 0 }
  for (const [path, count] of Object.entries(counts)) {
    if (item.kind === 'file' ? path !== item.path : !path.startsWith(prefix)) continue
    total.added += count.added
    total.removed += count.removed
  }
  const parts = [
    total.added && { text: `+${total.added}`, color: 'var(--good)' },
    total.removed && { text: `\u2212${total.removed}`, color: 'var(--bad)' },
  ].filter((part) => !!part)
  if (!parts.length) return null
  const text = parts.map((part) => part.text).join(' ')
  return {
    text,
    title: `${total.added} added, ${total.removed} removed`,
    parts: parts.flatMap((part, index) => (index ? [{ text: ' ' }, part] : [part])),
  }
}

export async function loadLineCounts(
  { path, language, before, after }: LineCountRequest,
  signal: AbortSignal,
): Promise<LineCounts | null> {
  const [oldFile, newFile] = await Promise.all([
    loadDiffFile(before, path, language),
    loadDiffFile(after, path, language),
  ])
  if (!oldFile || !newFile) {
    const file = oldFile ?? newFile
    return file
      ? { added: newFile ? lines(file.contents) : 0, removed: oldFile ? lines(file.contents) : 0 }
      : null
  }
  if (oldFile.contents === newFile.contents) return { added: 0, removed: 0 }
  return sumHunks(await computeDiff(oldFile, newFile, signal))
}

/** Added and removed lines per path, filled in as each file's diff finishes. */
export function useLineCounts(requests: LineCountRequest[]) {
  const [counts, setCounts] = useState<Record<string, LineCounts>>({})
  useEffect(() => {
    setCounts({})
    const controller = new AbortController()
    const queue = requests.filter(mayDiffer)
    const work = async () => {
      for (let request = queue.shift(); request; request = queue.shift()) {
        // A file that cannot be loaded or diffed in time shows no counts.
        const result = await loadLineCounts(request, controller.signal).catch(() => null)
        if (result && !controller.signal.aborted)
          setCounts((previous) => ({ ...previous, [request.path]: result }))
      }
    }
    for (let worker = 0; worker < concurrency; worker++) void work()
    return () => controller.abort()
  }, [requests])
  return counts
}
