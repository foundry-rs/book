import { expect, test } from 'vitest'
import { processFile, trimPatchContext } from '@pierre/diffs'
import { patiencePatch } from '../src/patiencePatch'
import { searchDiff, searchFile } from '../src/diffSearch'

function diffOf(before: string[], after: string[]) {
  return diffOfContents(before.join('\n') + '\n', after.join('\n') + '\n')
}

function diffOfContents(before: string, after: string) {
  const oldFile = { name: 'a.txt', contents: before }
  const newFile = { name: 'a.txt', contents: after }
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

test('searches a diff whose new file is empty', () => {
  const diff = diffOfContents('foo\nbar\n', '')
  expect(searchDiff(diff, 'bar')).toEqual([{ line: 2, side: 'deletions' }])
})

test('searches a single file on the given side', () => {
  expect(searchFile('one\ntwo\nthree two\n', 'deletions', 'Two')).toEqual([
    { line: 2, side: 'deletions' },
    { line: 3, side: 'deletions' },
  ])
})
