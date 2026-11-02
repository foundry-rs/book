import { beforeEach, expect, it, vi } from 'vite-plus/test'
import type { FileContents } from '@pierre/diffs'
import { lineCountDecoration, loadLineCounts, mayDiffer } from '../src/lineCounts'

const files = new Map<string, FileContents | null>()
const computeDiff = vi.fn()
vi.mock('../src/formattedArtifact', () => ({
  loadDiffFile: async (source: { storagePath?: string }) =>
    files.get(source.storagePath ?? '') ?? null,
}))
vi.mock('../src/computeDiff', () => ({ computeDiff: (...args: unknown[]) => computeDiff(...args) }))

const side = (storagePath?: string, contentHash?: string) => ({
  label: 'Solar',
  commit: 'a'.repeat(40),
  benchmark: 'test',
  compiler: 'solar',
  storagePath,
  contentHash,
})
const request = (
  before: ReturnType<typeof side>,
  after: ReturnType<typeof side>,
  path = 'a.mir',
) => ({
  path,
  language: 'text',
  before,
  after,
})
const contents = (text: string) => ({ name: 'a.mir', contents: text })
const signal = new AbortController().signal

beforeEach(() => {
  files.clear()
  computeDiff.mockReset()
})

it('counts added and removed lines from the diff hunks', async () => {
  files.set('old', contents('a\nb\n'))
  files.set('new', contents('a\nc\nd\n'))
  computeDiff.mockResolvedValue({
    hunks: [
      { additionLines: 2, deletionLines: 1 },
      { additionLines: 1, deletionLines: 0 },
    ],
  })
  expect(await loadLineCounts(request(side('old'), side('new')), signal)).toEqual({
    added: 3,
    removed: 1,
  })
})

it('counts every line of a file only one side published', async () => {
  files.set('new', contents('a\nb\nc\n'))
  expect(await loadLineCounts(request(side(), side('new')), signal)).toEqual({
    added: 3,
    removed: 0,
  })
  expect(await loadLineCounts(request(side('new'), side()), signal)).toEqual({
    added: 0,
    removed: 3,
  })
  expect(await loadLineCounts(request(side(), side()), signal)).toBeNull()
  expect(computeDiff).not.toHaveBeenCalled()
})

it('skips the diff when the contents match', async () => {
  files.set('one', contents('a\n'))
  files.set('two', contents('a\n'))
  expect(await loadLineCounts(request(side('one'), side('two')), signal)).toEqual({
    added: 0,
    removed: 0,
  })
  expect(computeDiff).not.toHaveBeenCalled()
})

it('only diffs pairs whose content hashes differ or are unknown', () => {
  expect(mayDiffer(request(side('x', 'h1'), side('x', 'h1')))).toBe(false)
  expect(mayDiffer(request(side('x', 'h1'), side('y', 'h2')))).toBe(true)
  expect(mayDiffer(request(side('x'), side('y')))).toBe(true)
  expect(mayDiffer(request(side(), side('y', 'h2')))).toBe(true)
  expect(mayDiffer(request(side(), side()))).toBe(false)
  expect(mayDiffer(request(side('x', 'h1'), side('y', 'h2'), 'graph.png'))).toBe(false)
})

it('labels files and sums the files beneath a directory', () => {
  const counts = {
    'sources/a.sol': { added: 2, removed: 1 },
    'sources/lib/b.sol': { added: 3, removed: 0 },
    'sources.txt': { added: 100, removed: 100 },
  }
  const file = lineCountDecoration({ kind: 'file', path: 'sources/lib/b.sol' }, counts)
  expect(file).toMatchObject({ text: '+3', title: '3 added, 0 removed' })
  expect(lineCountDecoration({ kind: 'directory', path: 'sources/' }, counts)).toMatchObject({
    text: '+5 \u22121',
    parts: [{ text: '+5' }, { text: ' ' }, { text: '\u22121' }],
  })
  expect(lineCountDecoration({ kind: 'file', path: 'other.mir' }, counts)).toBeNull()
  expect(lineCountDecoration({ kind: 'directory', path: 'other' }, counts)).toBeNull()
})
