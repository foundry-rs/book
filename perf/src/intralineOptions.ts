import type { FileDiffMetadata, LineDiffTypes } from '@pierre/diffs'

// Shiki applies decorations across the full file, even with a virtualized view.
// Bound both the file and changed-line counts; a line-length limit alone is not enough.
export function intralineOptions(diff: FileDiffMetadata) {
  const lines = diff.additionLines.length + diff.deletionLines.length
  const changed = diff.hunks.reduce((sum, hunk) => sum + hunk.additionLines + hunk.deletionLines, 0)
  const bounded =
    lines <= 2000 &&
    changed <= 200 &&
    [...diff.additionLines, ...diff.deletionLines].reduce((sum, line) => sum + line.length, 0) <=
      32_768
  return { lineDiffType: (bounded ? 'word-alt' : 'none') as LineDiffTypes, maxLineDiffLength: 256 }
}
