import { useEffect, useState } from 'react'
import { responseCache } from './cache'
import type { SourceLink } from './sources'

const catalogs = responseCache<Record<string, SourceLink[]>>(3_600_000, 2 * 1024 * 1024)

export function BenchmarkSources({ benchmark, commit }: { benchmark: string; commit: string }) {
  const [links, setLinks] = useState<SourceLink[] | null>(null)
  useEffect(() => {
    let cancelled = false
    setLinks(null)
    catalogs(commit, async () => {
      const response = await fetch(`/api/data/sources/${commit}.json`)
      if (!response.ok) throw new Error('Source metadata unavailable')
      return response.json()
    }).then(
      (catalog) => {
        if (!cancelled) setLinks(Object.hasOwn(catalog, benchmark) ? catalog[benchmark] : [])
      },
      () => {
        if (!cancelled) setLinks([])
      },
    )
    return () => {
      cancelled = true
    }
  }, [benchmark, commit])
  if (links === null) return <span>Loading sources…</span>
  if (!links.length) return <span>Source metadata unavailable.</span>
  return links.map((link) => (
    <a key={link.url} href={link.url}>
      {link.label} ↗
    </a>
  ))
}
