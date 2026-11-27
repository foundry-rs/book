import { expect, it } from 'vite-plus/test'
import { applyPatch } from 'diff'
import { processFile, trimPatchContext } from '@pierre/diffs'
import { patiencePatch } from '../src/patiencePatch'

it('round trips empty files, line endings, repeated lines and patch markers', () => {
  const files = [
    '',
    '\n',
    'a',
    'a\n',
    'a\r\n',
    'a\nb',
    'a\nb\n',
    'a\na\nb\na\n',
    '@@ -1 +1 @@\n--- before\n+++ after\n\\ No newline at end of file\n',
    '🦀\nλ\n',
  ]
  for (const before of files)
    for (const after of files) {
      const patch = patiencePatch(before, after)
      expect(applyPatch(before, patch, { autoConvertLineEndings: false })).toBe(after)
      expect(
        applyPatch(before, trimPatchContext(patch, 3), { autoConvertLineEndings: false }),
      ).toBe(after)
    }
})

it('round trips deterministic randomized edits with repetitive lines', () => {
  let seed = 42
  const random = (max: number) => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed % max
  }
  for (let trial = 0; trial < 300; trial++) {
    const lines = Array.from({ length: random(100) }, () => `${random(15)}\n`)
    const changed = [...lines]
    for (let i = 0; i < 15; i++)
      changed.splice(random(changed.length + 1), random(4), `${random(15)}\n`)
    const before = lines.join('')
    const after = changed.join('')
    expect(applyPatch(before, trimPatchContext(patiencePatch(before, after), 3))).toBe(after)
  }
})

it('preserves anchors and full context in library metadata for large generated files', () => {
  const before = Array.from({ length: 40000 }, (_, i) => `PUSH2 0x${i.toString(16)}\n`).join('')
  const after = before.replaceAll('PUSH2 0x1', 'PUSH3 0x1')
  const patch = trimPatchContext(patiencePatch(before, after), 3)
  expect(applyPatch(before, patch)).toBe(after)
  const diff = processFile(patch, {
    oldFile: { name: 'runtime.disasm', contents: before },
    newFile: { name: 'runtime.disasm', contents: after },
    throwOnError: true,
  })!
  expect(diff.hunks.length).toBeGreaterThan(1)
  expect(diff.deletionLines.join('')).toBe(before)
  expect(diff.additionLines.join('')).toBe(after)
  expect(diff.deletionLines.length).toBe(40000)
})
