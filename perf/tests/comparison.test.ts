import { expect, it } from 'vite-plus/test'
import { comparisonCompilers, comparisonRows, percentChange } from '../src/comparison'
import { formatRawValue, formatValue } from '../src/formatValue'
import { changeClass } from '../src/change'
import { compilerColumn, orderedCompilers } from '../src/compilers'
import { benchmarkMetric } from '../src/benchmarkMetric'
import type { RunDocument } from '../src/types'

const base: RunDocument = {
  schemaVersion: 1,
  commit: 'a'.repeat(40),
  branch: 'main',
  pr: null,
  title: null,
  timestamp: '',
  artifacts: {},
  results: [
    { test_id: 'empty', suite: '', compilers: { solar: { status: 'error', total_gas: 0 } } },
    { test_id: 'removed', suite: '', compilers: { solar: { status: 'ok', total_gas: 10 } } },
  ],
}
const head: RunDocument = {
  ...base,
  results: [
    ...base.results.slice(0, 1),
    {
      test_id: 'new',
      suite: '',
      compilers: {
        experimental: { status: 'ok', total_gas: 0 },
        solc: { status: 'ok', total_gas: 12 },
        solx: { status: 'ok', total_gas: 15, label: 'solx 0.1.8+build' },
      },
    },
  ],
}

it('hides empty metrics but retains zero, added, removed and non-Solar measurements', () => {
  expect(comparisonRows(base, head, 'total_gas', '').map((row) => row.result.test_id)).toEqual([
    'new',
    'removed',
  ])
  expect(comparisonRows(base, head, 'runtime_size', '')).toEqual([])
  expect(comparisonCompilers(head)).toEqual(['solar', 'solc', 'experimental', 'solx'])
})

it('discovers solx and future compilers without depending on producer ordering', () => {
  expect(orderedCompilers(['solx', 'solc', 'solar', 'future', 'solx'])).toEqual([
    'solar',
    'solc',
    'future',
    'solx',
  ])
  expect(compilerColumn(head, 'solx')).toEqual({ label: 'solx 0.1.8', title: 'solx 0.1.8+build' })
  expect(compilerColumn(head, 'future').label).toBe('future')
  expect(compilerColumn(base, 'solar').label).toBe('Base')
  expect(benchmarkMetric(head.results[1], 'total_gas', 'solx')).toBe(15)
  expect(benchmarkMetric(base.results[1], 'total_gas', 'solx')).toBeNull()
})

it('uses the reference denominator and handles zero without bogus infinities or colors', () => {
  expect(percentChange(100, 120)).toBe(20)
  expect(changeClass(percentChange(100, 120))).toBe('bad')
  expect(changeClass(percentChange(100, 80))).toBe('good')
  expect(percentChange(0, 0)).toBe(0)
  expect(percentChange(0, 1)).toBeNull()
  expect(percentChange(null, 1)).toBeNull()
})

it('colors higher Base and compiler costs green relative to Head', () => {
  const headValue = 100
  expect(percentChange(headValue, 120)).toBe(20)
  expect(changeClass(percentChange(headValue, 120), true)).toBe('good')
  expect(changeClass(percentChange(headValue, 80), true)).toBe('bad')
  expect(changeClass(percentChange(headValue, null), true)).toBe('neutral')
})

it('preserves exact values and units for Head and comparison tooltips', () => {
  expect(formatRawValue(12345, 'bytes')).toBe('12345 b')
  expect(formatRawValue(0.012345, 'seconds')).toBe('0.012345 s')
  expect(formatRawValue(0, 'gas')).toBe('0 gas')
  expect(formatRawValue(null, 'memory')).toBe('No measurement')
})

it('formats byte units consistently without rounding small values to zero KiB', () => {
  expect(formatValue(0, 'bytes')).toBe('0 b')
  expect(formatValue(64, 'memory')).toBe('64 b')
  expect(formatValue(1024, 'bytes')).toBe('1 KiB')
  expect(formatValue(1.5 * 1024 ** 2, 'memory')).toBe('1.5 MiB')
})
