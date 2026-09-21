import { benchmarkMetric } from './benchmarkMetric'
import { orderedCompilers } from './compilers'
import type { RunDocument } from './types'

export function comparisonCompilers(run: RunDocument) {
  return orderedCompilers(run.results.flatMap((result) => Object.keys(result.compilers)))
}

export interface ComparisonSort {
  column: 'benchmark' | 'head' | `compiler:${string}`
  direction: 'ascending' | 'descending'
}

export function comparisonRows(
  base: RunDocument,
  head: RunDocument,
  metric: string,
  query: string,
  sort?: ComparisonSort,
) {
  const before = new Map(base.results.map((result) => [result.test_id, result]))
  const after = new Map(head.results.map((result) => [result.test_id, result]))
  const rows = [...new Set([...after.keys(), ...before.keys()])]
    .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
    .map((name) => ({
      before: before.get(name),
      headResult: after.get(name),
      result: after.get(name) || before.get(name)!,
    }))
    .filter(
      ({ before, headResult }) =>
        benchmarkMetric(before, metric) !== null ||
        Object.keys(headResult?.compilers ?? {}).some(
          (compiler) => benchmarkMetric(headResult, metric, compiler) !== null,
        ),
    )
  if (!sort) return rows
  const direction = sort.direction === 'ascending' ? 1 : -1
  const sortValue = (row: (typeof rows)[number]) => {
    const headValue = benchmarkMetric(row.headResult, metric)
    if (sort.column === 'head') return headValue
    const compiler = sort.column.slice('compiler:'.length)
    return percentChange(
      headValue,
      benchmarkMetric(compiler === 'solar' ? row.before : row.headResult, metric, compiler),
    )
  }
  return rows.sort((a, b) => {
    const nameOrder = a.result.test_id.localeCompare(b.result.test_id)
    if (sort.column === 'benchmark') return direction * nameOrder
    const left = sortValue(a)
    const right = sortValue(b)
    // Missing measurements stay last in either direction.
    if (left === null) return right === null ? nameOrder : 1
    if (right === null) return -1
    return direction * (left - right) || nameOrder
  })
}

export function percentChange(before: number | null, after: number | null) {
  if (before === null || after === null) return null
  if (before === 0) return after === 0 ? 0 : null
  return ((after - before) / before) * 100
}
