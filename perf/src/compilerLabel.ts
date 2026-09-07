import type { RunDocument } from './types'

export function compilerLabel(run: RunDocument, benchmark: string, compiler: string) {
  if (compiler === 'solar') return `solar ${run.commit.slice(0, 8)}`
  const label = run.results.find((result) => result.test_id === benchmark)?.compilers[compiler]
    ?.label
  if (label?.trim()) return label.trim()
  return `${compiler} (version unknown)`
}
