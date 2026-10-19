import { expect, test } from 'vitest'
import { processFile, trimPatchContext } from '@pierre/diffs'
import { patiencePatch } from '../src/patiencePatch'
import { searchDiff, searchFile } from '../src/diffSearch'

function diffOf(before: string[], after: string[]) {
  const oldFile = { name: 'a.txt', contents: before.join('\n') + '\n' }
  const newFile = { name: 'a.txt', contents: after.join('\n') + '\n' }
  return processFile(trimPatchContext(patiencePatch(oldFile.contents, newFile.contents), 3), {
    oldFile,
    newFile,
    throwOnError: true,
  })!
}

test('finds lines in collapsed context, deletions and additions in reading order', () => {
  const before = Array.from({ length: 30 }, (_, i) => `line ${i}`)
  const after = [...before]
  after[5] = 'Line 5 changed'
  const diff = diffOf(before, after)
  expect(searchDiff(diff, 'LINE 5')).toEqual([
    { line: 6, side: 'deletions' },
    { line: 6, side: 'additions' },
  ])
  // Line 21 is unchanged and outside every hunk.
  expect(searchDiff(diff, 'line 20')).toEqual([{ line: 21, side: 'additions' }])
  expect(searchDiff(diff, '')).toEqual([])
})

test('searches a single file on the given side', () => {
  expect(searchFile('one\ntwo\nthree two\n', 'deletions', 'Two')).toEqual([
    { line: 2, side: 'deletions' },
    { line: 3, side: 'deletions' },
  ])
})
