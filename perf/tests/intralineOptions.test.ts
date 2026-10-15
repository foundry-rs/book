import { expect, test } from 'vitest'
import { processFile } from '@pierre/diffs'
import { patiencePatch } from '../src/patiencePatch'
import { intralineOptions } from '../src/intralineOptions'

function options(before: string, after: string) {
  return intralineOptions(
    processFile(patiencePatch(before, after), {
      oldFile: { name: 'test.asm', contents: before },
      newFile: { name: 'test.asm', contents: after },
      throwOnError: true,
    })!,
  )
}

test('enables bounded word matching for small diffs', () => {
  expect(options('PUSH1 0x00\n', 'PUSH1 0x11\n')).toEqual({ lineDiffType: 'word-alt' })
})

test('disables decorations above 20,000 changed lines', () => {
  expect(options('ADD\n'.repeat(10_000), 'SUB\n'.repeat(10_000)).lineDiffType).toBe('word-alt')
  expect(options('ADD\n'.repeat(10_001), 'SUB\n'.repeat(10_001)).lineDiffType).toBe('none')
})

test('keeps decorations for few changes in large files', () => {
  const context = 'ADD\n'.repeat(100_000)
  expect(options(`${context}PUSH1 0x00\n`, `${context}PUSH1 0x11\n`).lineDiffType).toBe('word-alt')
  expect(options('a'.repeat(100_000), 'b'.repeat(100_000)).lineDiffType).toBe('word-alt')
})
