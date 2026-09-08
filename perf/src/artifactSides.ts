import { compilerLabel } from './compilerLabel'
import { orderedCompilers } from './compilers'
import type { RunDocument } from './types'

export function initialArtifactSides(params: URLSearchParams) {
  const compiler = params.get('compiler') || 'solar'
  const against = params.get('against') || 'base'
  return {
    left: params.get('left') || (against === 'base' ? `base:${compiler}` : `head:${against}`),
    right: params.get('right') || `head:${compiler}`,
  }
}

export function artifactSides(runs: [RunDocument, RunDocument], benchmark: string) {
  return runs.flatMap((run, index) => {
    const side = index === 0 ? 'base' : 'head'
    const compilers = orderedCompilers([
      ...Object.keys(run.results.find((result) => result.test_id === benchmark)?.compilers || {}),
      ...(run.artifacts[benchmark] || []).flatMap((file) => file.compilers),
    ])
    return compilers.map((compiler) => ({
      id: `${side}:${compiler}`,
      side,
      run,
      compiler,
      label: compilerLabel(run, benchmark, compiler, side),
    }))
  })
}
