import { expect, it } from 'vite-plus/test'
import { compilerLabels } from '../src/compilerMetadata'
import { compilerLabel } from '../src/compilerLabel'
import type { RunDocument } from '../src/types'

const run: RunDocument = {
  commit: 'abcdef0123456789abcdef0123456789abcdef01',
  schemaVersion: 1,
  branch: 'main',
  pr: null,
  title: null,
  timestamp: '',
  artifacts: {},
  results: [
    {
      test_id: 'test',
      suite: 'runtime',
      compilers: { solc: { status: 'ok', label: 'solc 0.8.36' } },
    },
  ],
}

it('names Solar by commit and solc by recorded version', () => {
  expect(compilerLabel(run, 'test', 'solar')).toBe('solar abcdef01')
  expect(compilerLabel(run, 'test', 'solc')).toBe('solc 0.8.36')
  expect(compilerLabel(run, 'missing', 'solc')).toBe('solc (version unknown)')
})

it('identifies the source run in selectors and diff headings', () => {
  expect(compilerLabel(run, 'test', 'solar', 'base')).toBe('solar abcdef01 (base)')
  expect(compilerLabel(run, 'test', 'solar', 'head')).toBe('solar abcdef01 (head)')
  expect(compilerLabel(run, 'test', 'solc', 'head')).toBe('solc 0.8.36 (head)')
})

it.each([
  [{ test_id: 'test', compilers: { solc: { label: 'solc 0.8.36' } } }],
  { results: [{ id: 'test', solc: { label: 'solc 0.8.36' } }] },
])('recovers labels from original results', (document) => {
  expect(compilerLabels(JSON.stringify(document)).get('test')?.solc).toBe('solc 0.8.36')
})

it.each([undefined, '', 'null', 'invalid'])('tolerates missing legacy metadata: %s', (raw) => {
  expect(compilerLabels(raw).size).toBe(0)
})
