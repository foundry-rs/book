import type { BenchmarkResult, CompilerResult } from './types'

export function benchmarkMetric(result: BenchmarkResult | undefined, metric: string) {
  const compiler = result?.compilers.solar
  if (compiler?.status !== 'ok') return null
  const value = compiler[metric as keyof CompilerResult]
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}
