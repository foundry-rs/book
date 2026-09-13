import { expect, test } from 'vitest'
import { lineHash, parseLineHash } from '../src/lineSelection'

test('line anchors round-trip sides, ranges, and backwards selections', () => {
  for (const hash of ['#L12', '#R7', '#R12-R20', '#L20-L12', '#L12-R20'])
    expect(lineHash(parseLineHash(hash))).toBe(hash)
  expect(lineHash(null)).toBe('')
})

test('rejects malformed, zero, negative, and unsafe line numbers', () => {
  for (const hash of ['', '#L0', '#L-1', '#R1-R0', '#L1.5', '#R9007199254740992', '#L2oops'])
    expect(parseLineHash(hash)).toBeNull()
})
