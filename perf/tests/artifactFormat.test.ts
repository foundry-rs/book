import { describe, expect, it } from 'vite-plus/test'

import { creationCodeByteLength, formatArtifactContents } from '../src/artifactFormat'

describe('artifact formatting', () => {
  it('keeps only creation code before its runtime suffix', () => {
    expect(creationCodeByteLength('0x6001600203', '0x03')).toBe(4)
  })

  it('formats JSON and normalizes disassembly push values', () => {
    expect(formatArtifactContents('{"sources":{"A.sol":{}}}', 'input.json', 'json')).toBe(
      '{\n  "sources": {\n    "A.sol": {}\n  }\n}\n',
    )
    expect(formatArtifactContents('PUSH1 4 JUMPDEST', 'runtime.disasm', 'text')).toBe(
      'PUSH1 0x04\nJUMPDEST\n',
    )
  })
})
