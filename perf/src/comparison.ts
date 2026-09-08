import { benchmarkMetric } from './benchmarkMetric'
import { orderedCompilers } from './compilers'
import type { RunDocument } from './types'

export function comparisonCompilers(run: RunDocument) {
  return orderedCompilers(run.results.flatMap((result) => Object.keys(result.compilers)))
}

export function comparisonRows(
  base: RunDocument,
  head: RunDocument,
  metric: string,
  query: string,
) {
  const before = new Map(base.results.map((result) => [result.test_id, result]))
  const after = new Map(head.results.map((result) => [result.test_id, result]))
  return [...new Set([...after.keys(), ...before.keys()])]
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
}

export function percentChange(before: number | null, after: number | null) {
  if (before === null || after === null) return null
  if (before === 0) return after === 0 ? 0 : null
  return ((after - before) / before) * 100
}
