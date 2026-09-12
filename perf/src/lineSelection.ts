import { useEffect, useRef, useState } from 'react'
import { VirtualizedFile, VirtualizedFileDiff } from '@pierre/diffs'
import type {
  File,
  FileDiff,
  FileDiffMetadata,
  SelectedLineRange,
  PostRenderPhase,
} from '@pierre/diffs'

export function parseLineHash(hash: string): SelectedLineRange | null {
  const match = /^#([LR])(\d+)(?:-([LR])(\d+))?$/.exec(hash)
  if (!match) return null
  const start = Number(match[2])
  const end = Number(match[4] ?? match[2])
  if (![start, end].every((line) => Number.isSafeInteger(line) && line > 0)) return null
  return {
    start,
    end,
    side: match[1] === 'L' ? 'deletions' : 'additions',
    endSide: (match[3] ?? match[1]) === 'L' ? 'deletions' : 'additions',
  }
}

export function lineHash(range: SelectedLineRange | null) {
  if (!range) return ''
  const start = `${range.side === 'deletions' ? 'L' : 'R'}${range.start}`
  const end = `${(range.endSide ?? range.side) === 'deletions' ? 'L' : 'R'}${range.end}`
  return `#${start}${start === end ? '' : `-${end}`}`
}

// Pierre owns pointer/Shift-click selection and painting, including virtual rows.
export function useLineSelection(path: string, diff?: FileDiffMetadata, fileSide = 'R') {
  const [selectedLines, setSelectedLines] = useState(() => parseLineHash(location.hash))
  const pendingScroll = useRef(!!selectedLines)
  const frame = useRef(0)
  useEffect(() => {
    const update = () => {
      cancelAnimationFrame(frame.current)
      frame.current = 0
      const selection = parseLineHash(location.hash)
      pendingScroll.current = !!selection
      setSelectedLines(selection)
    }
    window.addEventListener('hashchange', update)
    return () => {
      window.removeEventListener('hashchange', update)
      cancelAnimationFrame(frame.current)
      frame.current = 0
    }
  }, [])
  return {
    selectedLines,
    options: {
      enableLineSelection: true,
      // Unlike onLineSelected, this fires only for pointer interactions, not
      // when React restores selectedLines from the URL.
      onLineSelectionEnd(range: SelectedLineRange | null) {
        if (range && !diff) range = { ...range, side: fileSide === 'L' ? 'deletions' : 'additions' }
        pendingScroll.current = false
        cancelAnimationFrame(frame.current)
        frame.current = 0
        setSelectedLines(range)
        const url = new URL(location.href)
        url.searchParams.set('file', path)
        url.hash = lineHash(range)
        window.history.replaceState(null, '', url)
      },
      onPostRender(node: HTMLElement, instance: File | FileDiff, phase: PostRenderPhase) {
        if (phase === 'unmount') {
          cancelAnimationFrame(frame.current)
          frame.current = 0
          return
        }
        if (!pendingScroll.current || !selectedLines || frame.current) return
        if (!(instance instanceof VirtualizedFile || instance instanceof VirtualizedFileDiff))
          return
        frame.current = requestAnimationFrame(() => {
          if (!node.isConnected || !pendingScroll.current) return
          // Reveal only the context blocks containing the linked endpoints.
          if (instance instanceof VirtualizedFileDiff && diff) {
            for (const [line, side] of [
              [selectedLines.start, selectedLines.side],
              [selectedLines.end, selectedLines.endSide ?? selectedLines.side],
            ] as const) {
              const start = side === 'deletions' ? 'deletionStart' : 'additionStart'
              const count = side === 'deletions' ? 'deletionCount' : 'additionCount'
              const next = diff.hunks.findIndex((hunk) => line < hunk[start])
              if (next >= 0 && line >= diff.hunks[next][start] - diff.hunks[next].collapsedBefore)
                instance.expandHunk(next, 'up', Infinity)
              else if (next < 0 && diff.hunks.length) {
                const last = diff.hunks.at(-1)!
                if (line >= last[start] + last[count])
                  instance.expandHunk(diff.hunks.length - 1, 'down', Infinity)
              }
            }
          }
          frame.current = requestAnimationFrame(() => {
            frame.current = 0
            if (!node.isConnected || !pendingScroll.current) return
            pendingScroll.current = false
            const position = instance.getLinePosition(selectedLines.start, selectedLines.side)
            if (!position) return
            const stickyHeight = ['.viewer-toolbar', '.diff-sides'].reduce(
              (height, selector) =>
                height + (document.querySelector(selector)?.getBoundingClientRect().height ?? 0),
              8,
            )
            window.scrollTo({
              top: window.scrollY + node.getBoundingClientRect().top + position.top - stickyHeight,
              behavior: 'instant',
            })
          })
        })
      },
    },
  }
}
