import { responseCache } from '../cache'
import { benchmarkSources } from '../sources'

const catalogs = responseCache<ReturnType<typeof benchmarkSources>>(3_600_000, 2 * 1024 * 1024)

export function loadBenchmarkSources(commit: string) {
  return catalogs(commit, async () => {
    const response = await fetch(
      `https://raw.githubusercontent.com/paradigmxyz/solar/${commit}/benches/runtime/cases.py`,
      { signal: AbortSignal.timeout(10_000) },
    )
    if (!response.ok) throw new Error('Benchmark source catalog is unavailable')
    const catalog = await response.text()
    if (catalog.length > 2 * 1024 * 1024) throw new Error('Benchmark source catalog is too large')
    return benchmarkSources(catalog, commit)
  })
}
