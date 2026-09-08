import type { RunDocument } from './types'

// Discover reference compilers from data, not a registry of supported binaries.
// Keep the primary compiler first and reference columns stable across runs.
export function orderedCompilers(compilers: Iterable<string>) {
  return [...new Set(['solar', ...compilers])].sort((a, b) => {
    const rank = (name: string) => (name === 'solar' ? 0 : name === 'solc' ? 1 : 2)
    return rank(a) - rank(b) || a.localeCompare(b)
  })
}

export function compilerColumn(run: RunDocument, compiler: string) {
  const labels = [
    ...new Set(
      run.results.flatMap((result) => {
        const label = result.compilers[compiler]?.label?.trim()
        return label ? [label] : []
      }),
    ),
  ].sort()
  return {
    title: labels.join(', '),
    label: compiler === 'solar' ? 'Base' : labels.length === 1 ? labels[0].split('+')[0] : compiler,
  }
}
