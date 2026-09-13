import type { SourceLink } from './types'

export function BenchmarkSources({ links = [] }: { links?: SourceLink[] }) {
  if (!links.length) return <span>Source metadata unavailable.</span>
  return links.map((link) => (
    <a key={link.url} href={link.url}>
      {link.label} ↗
    </a>
  ))
}
