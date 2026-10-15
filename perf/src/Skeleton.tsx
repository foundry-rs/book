import type { ReactNode } from 'react'
import { LoadingText } from './LoadingText'

// Narrow screens and landscape phones show the file tree as a bottom sheet.
// Keep in sync with the matching media queries in styles.css.
export const narrowQuery = '(max-width: 760px), (max-height: 500px) and (pointer: coarse)'

const widths = [72, 54, 86, 63, 47, 78, 58, 91, 66, 51]
const width = (index: number) => widths[index % widths.length]

export function Skeleton({ width, height = 12 }: { width: number | string; height?: number }) {
  return <span className="skeleton" style={{ width, height }} />
}

function Status({
  className,
  label,
  children,
}: {
  className?: string
  label: string
  children: ReactNode
}) {
  return (
    <div className={className} role="status">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  )
}

function GraphSkeleton({ index }: { index: number }) {
  return (
    <section className="graph-card" aria-hidden="true">
      <div className="graph-heading">
        <Skeleton width={width(index) * 2} height={11} />
        <div>
          <Skeleton width={96} height={20} />
          <Skeleton width={48} height={12} />
        </div>
      </div>
      <div className="skeleton graph-skeleton-plot" />
    </section>
  )
}

export function GraphsSkeleton({ count }: { count: number }) {
  return (
    <Status className={count > 1 ? 'chart-grid' : undefined} label="Loading benchmark history">
      {Array.from({ length: count }, (_, index) => (
        <GraphSkeleton key={index} index={index} />
      ))}
    </Status>
  )
}

export function RunsSkeleton() {
  return (
    <Status label="Loading benchmark runs">
      {Array.from({ length: 12 }, (_, index) => (
        <div className="run" key={index} aria-hidden="true">
          <Skeleton width={64} />
          <Skeleton width={`${width(index)}%`} />
          <Skeleton width={72} />
          <Skeleton width={20} />
          <Skeleton width={48} />
        </div>
      ))}
    </Status>
  )
}

export function CompareSkeleton({ progress }: { progress?: string }) {
  return (
    <main className="compare-page">
      <Status label="Loading benchmark comparison">
        <section className="run-overview">
          <p className="eyebrow">Benchmark run</p>
          <h1>Benchmark comparison</h1>
          <p className="run-meta">
            {progress ? (
              <LoadingText>{progress}</LoadingText>
            ) : (
              <Skeleton width={420} height={13} />
            )}
          </p>
        </section>
        <section className="filters" aria-hidden="true">
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
        </section>
        <section className="results" aria-hidden="true">
          {Array.from({ length: 13 }, (_, index) => (
            <div className={`result${index ? '' : ' header-row'}`} key={index}>
              <Skeleton width={index ? width(index) * 2 : 80} height={index ? 13 : 10} />
              <Skeleton width={index ? 88 : 40} height={index ? 13 : 10} />
              <Skeleton width={index ? 56 : 40} height={index ? 13 : 10} />
            </div>
          ))}
        </section>
      </Status>
    </main>
  )
}

export function TreeSkeleton() {
  return (
    <Status className="tree-skeleton" label="Loading files">
      {[0, 1, 2, 2, 2, 1, 2, 2, 0, 1, 1, 1].map((depth, index) => (
        <span
          key={index}
          className="skeleton"
          style={{ width: `${width(index) - depth * 12}%`, height: 14, marginLeft: depth * 16 }}
        />
      ))}
    </Status>
  )
}

export function DiffSkeleton({ label, progress }: { label: string; progress?: string }) {
  return (
    <Status className="diff-skeleton" label={label}>
      {progress && (
        <p className="empty">
          <LoadingText>{progress}</LoadingText>
        </p>
      )}
      {Array.from({ length: 4 }, (_, hunk) => (
        <div key={hunk} aria-hidden="true">
          <Skeleton width="100%" height={22} />
          {Array.from({ length: 5 + (hunk % 3) }, (_, line) => (
            <Skeleton key={line} width={`${width(hunk * 7 + line)}%`} />
          ))}
        </div>
      ))}
    </Status>
  )
}

export function FilesSkeleton({
  sidebarOpen = !matchMedia(narrowQuery).matches,
  progress,
}: {
  sidebarOpen?: boolean
  progress?: string
}) {
  return (
    <div className={`file-viewer-body${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
      <aside hidden={!sidebarOpen}>
        <div className="file-selector-head" aria-hidden="true">
          <Skeleton width="100%" height={28} />
          <Skeleton width={32} />
          <Skeleton width="100%" height={28} />
          <Skeleton width={40} />
          <Skeleton width="100%" height={28} />
        </div>
        <TreeSkeleton />
      </aside>
      {sidebarOpen && <div />}
      <div className="file-diff">
        <DiffSkeleton label="Loading diff" progress={progress} />
      </div>
    </div>
  )
}
