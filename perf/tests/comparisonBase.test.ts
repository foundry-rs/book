import { expect, it } from 'vite-plus/test'
import { comparisonBase } from '../src/comparisonBase'
import type { RunSummary } from '../src/types'

const runs: RunSummary[] = ['main', 'feature', 'main', 'main'].map((branch, index) => ({
  commit: String(4 - index).repeat(40),
  timestamp: `2026-09-0${4 - index}T00:00:00Z`,
  branch,
  pr: null,
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
}))

it('compares each main run with its predecessor, skipping PR runs', () => {
  expect(comparisonBase(runs, runs[0])).toBe(runs[2].commit)
  expect(comparisonBase(runs, runs[2])).toBe(runs[3].commit)
})

it('compares a PR run with the preceding main run, never a future run', () => {
  expect(comparisonBase(runs, runs[1])).toBe(runs[2].commit)
})

it('does not invent a baseline when no earlier main run is published', () => {
  expect(comparisonBase(runs, runs[3])).toBeUndefined()
  expect(comparisonBase([runs[1]], runs[1])).toBeUndefined()
})
