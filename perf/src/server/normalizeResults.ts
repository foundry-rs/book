import { validIdentifier } from './artifacts.ts'
import { normalizeSourceLinks } from './benchmarkSources.ts'

function number(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function text(value: unknown, maximum: number) {
  return typeof value === 'string' && value.length <= maximum ? value : ''
}

export function normalizeResults(
  document: unknown,
  run: { workflowRunId: number; commit: string },
) {
  const results = Array.isArray(document)
    ? document
    : document &&
        typeof document === 'object' &&
        Array.isArray((document as { results?: unknown }).results)
      ? (document as { results: unknown[] }).results
      : null
  if (!results) throw new Error('Benchmark results must be an array')
  if (results.length > 500) throw new Error('Benchmark results exceed 500 entries')
  const rows = results.flatMap((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return []
    const result = entry as Record<string, unknown>
    const testId = result.test_id ?? result.id ?? result.name
    if (typeof testId !== 'string' || !validIdentifier.test(testId)) return []
    const compilers =
      result.compilers && typeof result.compilers === 'object' && !Array.isArray(result.compilers)
        ? (result.compilers as Record<string, unknown>)
        : { solar: result.solar, solc: result.solc }
    return Object.entries(compilers).flatMap(([compiler, metrics]) => {
      if (
        !validIdentifier.test(compiler) ||
        !metrics ||
        typeof metrics !== 'object' ||
        Array.isArray(metrics)
      )
        return []
      const values = metrics as Record<string, unknown>
      return [
        {
          workflow_run_id: run.workflowRunId,
          commit: run.commit,
          test_id: testId,
          description: text(result.description, 4_096),
          suite: text(result.suite, 128) || 'unknown',
          source_links: normalizeSourceLinks(result.source_links),
          compiler,
          status: text(values.status, 64) || 'unknown',
          label: text(values.label, 512),
          compile_time_seconds: number(values.compile_time_seconds ?? values.compileTime),
          bytecode_size: number(values.bytecode_size ?? values.bytecodeSize),
          runtime_size: number(values.runtime_size ?? values.runtimeSize),
          deploy_gas: number(values.deploy_gas ?? values.deployGas),
          total_gas: number(values.total_gas ?? values.runtimeGas),
          peak_rss_bytes: number(values.peak_rss_bytes ?? values.peakMemory),
        },
      ]
    })
  })
  if (!rows.length) throw new Error('Benchmark archive contains no supported results')
  return rows
}
