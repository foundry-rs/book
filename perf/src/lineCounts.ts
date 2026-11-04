import { useEffect, useState } from 'react'
import type { FileTreeRowDecoration } from '@pierre/trees'
import { loadLineCounts, type LineCountSide } from './data'
import type { LineCounts } from './types'

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

/** Added and removed lines per path, which the server computes from the stored artifacts. */
export function useLineCounts(
  left: LineCountSide | undefined,
  right: LineCountSide | undefined,
  benchmark: string,
) {
  const [counts, setCounts] = useState<Record<string, LineCounts>>({})
  useEffect(() => {
    setCounts({})
    if (!left || !right) return
    let current = true
    // Counts are decoration; a failed request shows none.
    loadLineCounts(left, right, benchmark).then(
      (counts) => current && setCounts(counts),
      () => {},
    )
    return () => {
      current = false
    }
  }, [left, right, benchmark])
  return counts
}
