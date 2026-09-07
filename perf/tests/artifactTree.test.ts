import { describe, expect, it } from 'vite-plus/test'
import { artifactTree, mergeArtifactFiles } from '../src/artifactTree'

const file = (path: string, compiler = 'solar') => ({
  path,
  storagePath: path,
  compilers: [compiler],
  bytes: 1,
  label: path,
  language: 'text',
})

describe('dynamic artifact directory', () => {
  it('retains added, removed, and shared files from both sides', () => {
    const files = mergeArtifactFiles(
      [file('removed.txt'), file('same.txt', 'new-compiler')],
      [file('passes/new.log'), file('same.txt')],
    )
    expect(files.map((f) => f.path)).toEqual(['passes/new.log', 'removed.txt', 'same.txt'])
    expect(files[2].compilers).toEqual(['new-compiler', 'solar'])
    expect(artifactTree(files)[0]).toMatchObject({
      name: 'passes',
      children: [{ name: 'new.log', file: { path: 'passes/new.log' } }],
    })
  })
})
