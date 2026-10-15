import type { FileDiffMetadata, LineDiffTypes } from '@pierre/diffs'

// Shiki checks every pair of decorations for overlaps, so the cost grows with the square of
// the changed line count.
export function intralineOptions(diff: FileDiffMetadata) {
  const changed = diff.hunks.reduce((sum, hunk) => sum + hunk.additionLines + hunk.deletionLines, 0)
  return { lineDiffType: (changed <= 20_000 ? 'word-alt' : 'none') as LineDiffTypes }
}
