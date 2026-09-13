import { responseCache } from '../cache.ts'
import { benchmarkSources } from './legacySources.ts'
import type { SourceLink } from '../types.ts'

const catalogs = responseCache<ReturnType<typeof benchmarkSources>>(3_600_000, 2 * 1024 * 1024)

export function loadBenchmarkSources(commit: string) {
  if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error('Expected a full commit SHA')
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

// Solar PR #1449 owns provenance for new runs. Only old results need a catalog.
export function normalizeSourceLinks(value: unknown): SourceLink[] {
  if (!Array.isArray(value)) return []
  const links = new Map<string, SourceLink>()
  for (const link of value.slice(0, 32)) {
    if (
      !link ||
      typeof link.label !== 'string' ||
      !link.label.trim() ||
      link.label.length > 512 ||
      typeof link.url !== 'string' ||
      link.url.length > 4096
    )
      continue
    try {
      const url = new URL(link.url)
      if (url.protocol !== 'https:' || url.username || url.password) continue
      links.set(url.href, { label: link.label, url: url.href })
    } catch {
      /* Ignore malformed producer metadata. */
    }
  }
  return [...links.values()]
}

export async function enrichSources(commit: string, rows: Record<string, unknown>[]) {
  const missing = rows.filter((row) => !normalizeSourceLinks(row.source_links).length)
  if (!missing.length) return
  const catalog = await loadBenchmarkSources(commit)
  for (const row of missing)
    if (Object.hasOwn(catalog, String(row.test_id))) row.source_links = catalog[String(row.test_id)]
}
