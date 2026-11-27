import type { FileDiffMetadata, SelectedLineRange, SelectionSide } from '@pierre/diffs'

export interface SearchMatch {
  line: number
  side: SelectionSide
}

function findInLines(
  lines: readonly string[],
  from: number,
  to: number,
  side: SelectionSide,
  needle: string,
  matches: SearchMatch[],
) {
  for (let index = from; index < to; index++) {
    if (lines[index].toLowerCase().includes(needle)) matches.push({ line: index + 1, side })
  }
}

// Virtualized rows are not in the DOM, so the browser's find cannot see them: search the source lines.
// One match per line. Matches come out in reading order: deletions before the additions that replace them.
export function searchDiff(diff: FileDiffMetadata, query: string) {
  const matches: SearchMatch[] = []
  const needle = query.toLowerCase()
  if (!needle) return matches
  const { additionLines, deletionLines } = diff
  let next = 0
  for (const hunk of diff.hunks) {
    findInLines(additionLines, next, hunk.additionLineIndex, 'additions', needle, matches)
    next = Math.max(next, hunk.additionLineIndex)
    for (const block of hunk.hunkContent) {
      if (block.type === 'context') {
        findInLines(
          additionLines,
          block.additionLineIndex,
          block.additionLineIndex + block.lines,
          'additions',
          needle,
          matches,
        )
        next = Math.max(next, block.additionLineIndex + block.lines)
      } else {
        findInLines(
          deletionLines,
          block.deletionLineIndex,
          block.deletionLineIndex + block.deletions,
          'deletions',
          needle,
          matches,
        )
        findInLines(
          additionLines,
          block.additionLineIndex,
          block.additionLineIndex + block.additions,
          'additions',
          needle,
          matches,
        )
        next = Math.max(next, block.additionLineIndex + block.additions)
      }
    }
  }
  findInLines(additionLines, next, additionLines.length, 'additions', needle, matches)
  return matches
}

export function searchFile(contents: string, side: SelectionSide, query: string) {
  const matches: SearchMatch[] = []
  const needle = query.toLowerCase()
  const lines = contents.split('\n')
  if (needle) findInLines(lines, 0, lines.length, side, needle, matches)
  return matches
}

export function matchRange({ line, side }: SearchMatch): SelectedLineRange {
  return { start: line, end: line, side }
}
