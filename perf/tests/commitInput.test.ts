import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vite-plus/test'
import { CommitInput, resolveCommit } from '../src/App'
import type { RunSummary } from '../src/types'

const run: RunSummary = {
  commit: 'abcdef0123456789abcdef0123456789abcdef01',
  timestamp: '2026-09-07T00:00:00Z',
  branch: 'main',
  pr: 1400,
  title: null,
  benchmarkCount: 1,
  metrics: {
    compileTime: null,
    creationSize: null,
    runtimeSize: null,
    deployGas: null,
    runtimeGas: null,
    peakMemory: null,
  },
}

it.each(['base', 'head'])('renders an empty %s input without suggestions', (label) => {
  const html = renderToStaticMarkup(
    createElement(CommitInput, { label, value: '', onChange: () => {} }),
  )
  expect(html).toContain('value=""')
  expect(html).toContain('autoComplete="off"')
  expect(html).not.toMatch(/datalist|list=|disabled/)
})

it.each([run.commit, 'abcdef0', 'main', '#1400', '1400'])('still resolves %s', (ref) => {
  expect(resolveCommit(ref, [run])).toBe(run.commit)
})

it('still resolves published tag refs', () => {
  expect(resolveCommit('v0.1.0', [{ ...run, branch: 'v0.1.0' }])).toBe(run.commit)
})

it('does not resolve an empty input', () => {
  expect(resolveCommit('', [run])).toBe('')
})
