import { expect, it } from 'vite-plus/test'
import { artifactSides, initialArtifactSides } from '../src/artifactSides'
import type { RunDocument } from '../src/types'

it('defaults to Base on the left and Head on the right', () => {
  expect(initialArtifactSides(new URLSearchParams())).toEqual({
    left: 'base:solar',
    right: 'head:solar',
  })
})

it('preserves old comparison links and accepts independent new sides', () => {
  expect(initialArtifactSides(new URLSearchParams('compiler=solc&against=base'))).toEqual({
    left: 'base:solc',
    right: 'head:solc',
  })
  expect(initialArtifactSides(new URLSearchParams('compiler=solar&against=solc'))).toEqual({
    left: 'head:solc',
    right: 'head:solar',
  })
  expect(initialArtifactSides(new URLSearchParams('left=head:solc&right=base:solar'))).toEqual({
    left: 'head:solc',
    right: 'base:solar',
  })
})

it('offers compilers from both runs with the correct provenance and no solc suffix', () => {
  const base: RunDocument = {
    schemaVersion: 1,
    commit: 'a'.repeat(40),
    branch: null,
    pr: null,
    title: null,
    timestamp: '',
    results: [
      { test_id: 'test', suite: '', compilers: { solc: { status: 'ok', label: 'solc 0.8.30' } } },
    ],
    artifacts: {},
  }
  const head: RunDocument = {
    ...base,
    commit: 'b'.repeat(40),
    results: [],
    artifacts: {
      test: [
        {
          path: 'x.txt',
          storagePath: '0.json',
          label: 'x',
          language: 'text',
          bytes: 0,
          compilers: ['solx', 'future'],
        },
      ],
    },
  }
  const choices = artifactSides([base, head], 'test')
  expect(choices.map((choice) => choice.id)).toEqual([
    'base:solar',
    'base:solc',
    'head:solar',
    'head:future',
    'head:solx',
  ])
  expect(choices.find((choice) => choice.id === 'base:solc')).toMatchObject({
    label: 'solc 0.8.30',
    run: base,
    compiler: 'solc',
  })
  expect(choices.find((choice) => choice.id === 'head:future')?.run.commit).toBe(head.commit)
})
