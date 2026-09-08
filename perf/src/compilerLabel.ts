import type { RunDocument } from './types'

export function compilerLabel(
  run: RunDocument,
  benchmark: string,
  compiler: string,
  side?: 'base' | 'head',
) {
  const recorded = run.results.find((result) => result.test_id === benchmark)?.compilers[compiler]
    ?.label
  const label =
    compiler === 'solar'
      ? `solar ${run.commit.slice(0, 8)}`
      : recorded?.trim() || `${compiler} (version unknown)`
  return compiler === 'solar' && side ? `${label} (${side})` : label
}
