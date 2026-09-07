import type { BenchmarkResult, CompilerResult } from './types'

export function benchmarkMetric(
  result: BenchmarkResult | undefined,
  metric: string,
  name = 'solar',
) {
  const compiler = result?.compilers[name]
  if (compiler?.status !== 'ok') return null
  const value = compiler[metric as keyof CompilerResult]
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}
