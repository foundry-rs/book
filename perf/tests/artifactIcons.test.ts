import { createFileTreeIconResolver } from '@pierre/trees'
import { describe, expect, it } from 'vite-plus/test'

import { artifactIcons } from '../src/artifactIcons'

describe('artifact icons', () => {
  const { resolveIcon } = createFileTreeIconResolver(artifactIcons)
  const icon = (path: string) => resolveIcon('file-tree-icon-file', path).name

  it('maps compiler outputs to custom icons', () => {
    expect(
      [
        'src/Counter.sol',
        'solc/optimized-ir.yul',
        'solx/runtime.optimized.ll',
        'solar/mir.mir',
        'solar/runtime.evmir',
        'solar/runtime.disasm',
        'solar/runtime.hex',
      ].map(icon),
    ).toEqual([
      'perf-icon-solidity',
      'perf-icon-yul',
      'perf-icon-llvm',
      'perf-icon-mir',
      'perf-icon-evm',
      'perf-icon-disasm',
      'perf-icon-hex',
    ])
  })

  it('keeps built-in icons for other files', () => {
    expect(icon('solar/output.json')).toBe('file-tree-builtin-json')
  })

  it('defines every mapped symbol', () => {
    for (const extension of Object.keys(artifactIcons.byFileExtension ?? {}))
      expect(artifactIcons.spriteSheet).toContain(`id="${icon(`file.${extension}`)}"`)
  })
})
