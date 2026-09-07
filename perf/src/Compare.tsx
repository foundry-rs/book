import { useEffect, useMemo, useState } from 'react'
import { BenchmarkHistory } from './BenchmarkHistory'
import { changeClass, formatChange } from './change'
import { loadRun } from './data'
import { benchmarkSource } from './sources'
import type { RunDocument, Theme } from './types'
import { benchmarkMetric as value } from './benchmarkMetric'

const metrics: Record<
  string,
  { label: string; key: string; unit: 'bytes' | 'gas' | 'seconds' | 'memory' }
> = {
  runtimeGas: { label: 'Runtime gas', key: 'total_gas', unit: 'gas' },
  deployGas: { label: 'Deployment gas', key: 'deploy_gas', unit: 'gas' },
  runtimeSize: { label: 'Runtime bytes', key: 'runtime_size', unit: 'bytes' },
  creationSize: { label: 'Creation bytes', key: 'bytecode_size', unit: 'bytes' },
  compileTime: { label: 'Compile time', key: 'compile_time_seconds', unit: 'seconds' },
  peakMemory: { label: 'Peak memory (RSS)', key: 'peak_rss_bytes', unit: 'memory' },
}

const short = (commit: string) => commit.slice(0, 8)

function change(before: number | null, after: number | null) {
  if (before === null || after === null || before === 0) return null
  return ((after - before) / before) * 100
}

function formatRunDate(timestamp: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

function fileViewerHref(base: string, head: string, benchmark: string) {
  return `?${new URLSearchParams({ base, head, benchmark, view: 'files' })}`
}

interface Props {
  base: string
  head: string
  theme: Theme
}

export function Compare({ base, head }: Props) {
  const initial = new URLSearchParams(window.location.search)
  const initialMetric = initial.get('metric')
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
    Promise.all([loadRun(base), loadRun(head)]).then(
      (value) => {
        if (!cancelled) setRuns(value)
      },
      () => {
        if (!cancelled) setLoadError('These benchmark runs are not published yet.')
      },
    )
    return () => {
      cancelled = true
    }
  }, [base, head])

  const rows = useMemo(() => {
    if (!runs) return []
    const before = new Map(runs[0].results.map((result) => [result.test_id, result]))
    const after = new Map(runs[1].results.map((result) => [result.test_id, result]))
    return [...new Set([...after.keys(), ...before.keys()])]
      .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
      .map((name) => ({
        before: before.get(name),
        headResult: after.get(name),
        result: after.get(name) || before.get(name)!,
      }))
  }, [metric, query, runs])

  const selectBenchmark = (benchmark: string) => {
    const next = expanded === benchmark ? '' : benchmark
    setExpanded(next)
    const url = new URL(window.location.href)
    if (next) url.searchParams.set('benchmark', next)
    else url.searchParams.delete('benchmark')
    history.replaceState(null, '', url)
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
        <p className="empty">Loading benchmark runs…</p>
      </main>
    )
  const [, afterRun] = runs

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
          onChange={(event) => setMetric(event.target.value)}
        >
          {Object.entries(metrics).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>
      </section>
      <section className="results" id="benchmarks">
        <div className="result header-row">
          <span>Benchmark</span>
          <span>{short(base)}</span>
          <span>{short(head)}</span>
          <span>Change</span>
        </div>
        {rows.map(({ before, headResult, result: after }) => {
          const selected = expanded === after.test_id
          const beforeValue = value(before, metrics[metric].key)
          const afterValue = value(headResult, metrics[metric].key)
          const delta = change(beforeValue, afterValue)
          const source = benchmarkSource(after.test_id, head)
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
                <span>{beforeValue?.toLocaleString() ?? '—'}</span>
                <strong>{afterValue?.toLocaleString() ?? '—'}</strong>
                <strong className={changeClass(delta)}>
                  {!before ? 'Added' : !headResult ? 'Removed' : formatChange(delta)}
                </strong>
              </button>
              {selected && (
                <section className="benchmark-detail" id={after.test_id}>
                  <div className="detail-copy">
                    <p className="eyebrow">Benchmark details</p>
                    <h2>{after.test_id}</h2>
                    <p className="detail-muted">
                      Compiler status — base: {before?.compilers.solar?.status ?? 'not present'};
                      head: {headResult?.compilers.solar?.status ?? 'not present'}. Missing metrics
                      are shown as —.
                    </p>
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
                    <a href={fileViewerHref(base, head, after.test_id)}>Artifacts diff viewer →</a>
                    <a href={source.url}>Source: {source.label} ↗</a>
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
