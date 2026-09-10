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
  expect(options('PUSH1 0x00\n', 'PUSH1 0x11\n')).toEqual({
    lineDiffType: 'word-alt',
    maxLineDiffLength: 256,
  })
})

test('disables decorations for many changed lines', () => {
  expect(options('ADD\n'.repeat(101), 'SUB\n'.repeat(101)).lineDiffType).toBe('none')
})

test('bounds whole-file decoration work even with few changes', () => {
  const context = 'ADD\n'.repeat(1000)
  expect(options(`${context}PUSH1 0x00\n`, `${context}PUSH1 0x11\n`).lineDiffType).toBe('none')
})

test('bounds character volume as well as line counts', () => {
  expect(options('a'.repeat(20_000), 'b'.repeat(20_000)).lineDiffType).toBe('none')
})
