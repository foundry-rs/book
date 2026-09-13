import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { BenchmarkHistory } from './BenchmarkHistory'
import { changeClass, formatChange } from './change'
import { formatRawValue, formatValue } from './formatValue'
import { loadHistory, loadRun } from './data'
import { BenchmarkSources } from './BenchmarkSources'
import type { RunDocument, Theme } from './types'
import { benchmarkMetric as value } from './benchmarkMetric'
import { replaceUrl } from './navigation'
import { comparisonCompilers, comparisonRows, percentChange } from './comparison'
import { compilerLabel } from './compilerLabel'
import { compilerColumn } from './compilers'
import { useImportProgress } from './importProgress'

const metrics: Record<
  string,
  { label: string; key: string; unit: 'bytes' | 'gas' | 'seconds' | 'memory' }
> = {
  runtimeGas: { label: 'Runtime gas', key: 'total_gas', unit: 'gas' },
  deployGas: { label: 'Deploy gas', key: 'deploy_gas', unit: 'gas' },
  runtimeSize: { label: 'Runtime bytes', key: 'runtime_size', unit: 'bytes' },
  creationSize: { label: 'Creation bytes', key: 'bytecode_size', unit: 'bytes' },
  compileTime: { label: 'Compile time', key: 'compile_time_seconds', unit: 'seconds' },
  peakMemory: { label: 'Peak memory (RSS)', key: 'peak_rss_bytes', unit: 'memory' },
}

const short = (commit: string) => commit.slice(0, 8)

function formatRunDate(timestamp: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

function fileViewerHref(base: RunDocument, head: RunDocument, benchmark: string, metric: string) {
  return `?${new URLSearchParams({ base: base.commit, head: head.commit, benchmark, metric, view: 'files', ...(base.revision ? { baseRevision: base.revision } : {}), ...(head.revision ? { headRevision: head.revision } : {}) })}`
}

interface Props {
  base: string
  head: string
  theme: Theme
}

export function Compare({ base, head }: Props) {
  const importProgress = useImportProgress(base, head)
  const initial = new URLSearchParams(window.location.search)
  const initialMetric = initial.get('metric')
  const baseRevision = initial.get('baseRevision') ?? undefined
  const headRevision = initial.get('headRevision') ?? undefined
  const [runs, setRuns] = useState<[RunDocument, RunDocument] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [metric, setMetric] = useState(
    Object.entries(metrics).find(
      ([name, definition]) => name === initialMetric || definition.key === initialMetric,
    )?.[0] ?? 'runtimeGas',
  )
  const [expanded, setExpanded] = useState(initial.get('benchmark') ?? '')

  useEffect(() => {
    let cancelled = false
    setRuns(null)
    setLoadError(null)
    Promise.all([loadRun(base, baseRevision), loadRun(head, headRevision)]).then(
      (value) => {
        if (!cancelled) setRuns(value)
      },
      (error: unknown) => {
        if (!cancelled)
          setLoadError(error instanceof Error ? error.message : 'Could not load benchmark runs.')
      },
    )
    return () => {
      cancelled = true
    }
  }, [base, head, baseRevision, headRevision])

  useEffect(() => {
    if (expanded) void loadHistory(metrics[metric].key, expanded).catch(() => {})
  }, [expanded, metric])

  const rows = useMemo(() => {
    if (!runs) return []
    return comparisonRows(runs[0], runs[1], metrics[metric].key, query)
  }, [metric, query, runs])
  const compilers = useMemo(() => (runs ? comparisonCompilers(runs[1]) : []), [runs])

  const selectBenchmark = (benchmark: string) => {
    const next = expanded === benchmark ? '' : benchmark
    setExpanded(next)
    const url = new URL(window.location.href)
    if (next) url.searchParams.set('benchmark', next)
    else url.searchParams.delete('benchmark')
    replaceUrl(url)
  }

  if (loadError)
    return (
      <main className="compare-page">
        <p className="error">{loadError}</p>
      </main>
    )
  if (!runs)
    return (
      <main className="compare-page">
        <p className="empty" role="status">
          {importProgress || 'Loading benchmark runs…'}
        </p>
      </main>
    )
  const [beforeRun, afterRun] = runs

  return (
    <main className="compare-page">
      <section className="run-overview">
        <p className="eyebrow">Benchmark run</p>
        <h1>Benchmark comparison</h1>
        <p className="run-meta">
          <time>{formatRunDate(afterRun.timestamp)}</time> ·{' '}
          <a href={`https://github.com/paradigmxyz/solar/commit/${head}`}>{short(head)}</a> ·{' '}
          {afterRun.pr ? (
            <a href={`https://github.com/paradigmxyz/solar/pull/${afterRun.pr}`}>
              PR #{afterRun.pr}
            </a>
          ) : (
            (afterRun.branch ?? 'detached')
          )}{' '}
          · {afterRun.results.length} benchmarks ·{' '}
          <a
            href={
              afterRun.workflow_run_id
                ? `https://github.com/paradigmxyz/solar/actions/runs/${afterRun.workflow_run_id}`
                : 'https://github.com/paradigmxyz/solar/actions'
            }
          >
            GitHub workflow
          </a>
        </p>
      </section>
      <section className="filters">
        <input
          aria-label="Filter benchmarks"
          placeholder="Filter benchmarks"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          aria-label="Metric"
          value={metric}
          onChange={(event) => {
            setMetric(event.target.value)
            const url = new URL(window.location.href)
            url.searchParams.set('metric', metrics[event.target.value].key)
            replaceUrl(url)
          }}
        >
          {Object.entries(metrics).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>
      </section>
      <section
        className="results"
        id="benchmarks"
        style={{ '--compiler-count': compilers.length } as CSSProperties}
      >
        <div className="result header-row">
          <span>Benchmark</span>
          <span>Head</span>
          {compilers.map((compiler) => {
            const column = compilerColumn(afterRun, compiler)
            return (
              <span key={compiler} title={column.title}>
                {column.label}
              </span>
            )
          })}
        </div>
        {rows.map(({ before, headResult, result: after }) => {
          const selected = expanded === after.test_id
          const headValue = value(headResult, metrics[metric].key)
          return (
            <div key={after.test_id} className="benchmark-row">
              <button
                className={`result ${selected ? 'selected' : ''}`}
                onClick={() => selectBenchmark(after.test_id)}
                aria-expanded={selected}
              >
                <code>
                  <span className="row-chevron">{selected ? '⌄' : '›'}</span>
                  {after.test_id}
                </code>
                <span
                  title={`${compilerLabel(afterRun, after.test_id, 'solar')}: ${formatRawValue(headValue, metrics[metric].unit)}`}
                >
                  {headValue === null ? '—' : formatValue(headValue, metrics[metric].unit)}
                </span>
                {compilers.map((compiler) => {
                  const comparedValue = value(
                    compiler === 'solar' ? before : headResult,
                    metrics[metric].key,
                    compiler,
                  )
                  const delta = percentChange(headValue, comparedValue)
                  const label = compilerLabel(
                    compiler === 'solar' ? beforeRun : afterRun,
                    after.test_id,
                    compiler,
                  )
                  return (
                    <strong
                      key={compiler}
                      className={changeClass(delta, true)}
                      title={`${label}: ${formatRawValue(comparedValue, metrics[metric].unit)}`}
                    >
                      {formatChange(delta, '—')}
                    </strong>
                  )
                })}
              </button>
              {selected && (
                <section className="benchmark-detail" id={after.test_id}>
                  <div className="detail-copy">
                    <p className="eyebrow">Benchmark details</p>
                    <h2>{after.test_id}</h2>
                    {after.description && (
                      <p className="benchmark-description">{after.description}</p>
                    )}
                    <div className="detail-chart">
                      <p className="eyebrow">History</p>
                      <BenchmarkHistory
                        benchmark={after.test_id}
                        metric={metrics[metric].key}
                        title={metrics[metric].label}
                        unit={metrics[metric].unit}
                      />
                    </div>
                  </div>
                  <aside className="benchmark-links">
                    <p className="eyebrow">Links</p>
                    <a href={fileViewerHref(runs[0], runs[1], after.test_id, metrics[metric].key)}>
                      Artifacts diff viewer →
                    </a>
                    <BenchmarkSources links={after.source_links} />
                  </aside>
                </section>
              )}
            </div>
          )
        })}
        {!rows.length && <p className="empty">No benchmarks match this view.</p>}
      </section>
    </main>
  )
}
