import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Moon, Sun } from 'lucide-react'
import { changeClass, formatChange } from './change'
import { Compare } from './Compare'
import { loadIndex } from './data'
import { FileViewer } from './FileViewer'
import type { MetricSummary, RunIndex, RunSummary, Theme } from './types'

const short = (commit: string) => commit.slice(0, 8)

const charts: { metric: keyof MetricSummary; title: string; unit: string }[] = [
  { metric: 'runtimeGas', title: 'Runtime gas', unit: 'gas' },
  { metric: 'deployGas', title: 'Deployment gas', unit: 'gas' },
  { metric: 'runtimeSize', title: 'Runtime bytecode', unit: 'bytes' },
  { metric: 'creationSize', title: 'Creation bytecode', unit: 'bytes' },
  { metric: 'compileTime', title: 'Compile time', unit: 'seconds' },
  { metric: 'peakMemory', title: 'Peak memory (RSS)', unit: 'memory' },
]

function formatValue(value: number, unit: string) {
  if (unit === 'seconds') return `${value.toFixed(2)} s`
  if (unit === 'memory')
    return value >= 1024 * 1024
      ? `${(value / 1024 / 1024).toFixed(1)} MiB`
      : `${Math.round(value / 1024).toLocaleString()} KiB`
  return `${Math.round(value).toLocaleString()} ${unit}`
}

function runRef(run: RunSummary) {
  return run.branch ?? (run.pr ? `PR #${run.pr}` : 'detached')
}

function runPr(run: RunSummary) {
  return run.pr ?? (Number(run.title?.match(/\(#(\d+)\)/)?.[1]) || null)
}

function runTitle(run: RunSummary) {
  const title = run.title || runRef(run)
  const pr = runPr(run)
  return pr && !title.includes(`#${pr}`) ? `${title} (#${pr})` : title
}

function runSelectorValue(run: RunSummary) {
  const pr = runPr(run)
  if (pr) return `#${pr}`
  if (run.branch?.startsWith('v')) return run.branch
  return run.branch || short(run.commit)
}

function runLabel(run: RunSummary) {
  return `${runSelectorValue(run)} · ${short(run.commit)} · ${runTitle(run)}`
}

function resolveCommit(value: string, runs: RunSummary[]) {
  const normalized = value.trim().toLowerCase()
  const pr = normalized.match(/^#?(\d+)$/)?.[1]
  return (
    runs.find(
      (run) =>
        run.commit === normalized ||
        run.branch?.toLowerCase() === normalized ||
        (pr !== undefined && String(runPr(run)) === pr),
    )?.commit ??
    (normalized.length >= 7
      ? runs.find((run) => run.commit.startsWith(normalized))?.commit
      : undefined) ??
    ''
  )
}

function CommitPicker({
  label,
  value,
  runs,
  onChange,
}: {
  label: string
  value: string
  runs: RunSummary[]
  onChange: (value: string) => void
}) {
  const list = `${label}-runs`
  return (
    <label>
      {label}
      <input
        list={list}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Commit SHA"
        disabled={!runs.length}
        spellCheck={false}
        aria-label={`${label} commit`}
      />
      <datalist id={list}>
        {runs.map((run) => (
          <option key={run.commit} value={runSelectorValue(run)} label={runLabel(run)} />
        ))}
      </datalist>
    </label>
  )
}

function HistoryGraph({
  runs,
  metric,
  title,
  unit,
}: {
  runs: RunSummary[]
  metric: keyof MetricSummary
  title: string
  unit: string
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null)
  const points = runs
    .filter((run) => run.branch === 'main' && typeof run.metrics[metric] === 'number')
    .slice(0, 60)
    .reverse()
  const values = points.map((run) => run.metrics[metric]!)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min
  const padding = range === 0 ? Math.max(Math.abs(max) * 0.04, 1) : range * 0.1
  const chartMin = min - padding
  const chartMax = max + padding
  const position = (value: number) =>
    Math.max(10, Math.min(90, 90 - ((value - chartMin) / (chartMax - chartMin)) * 80))
  const path = points
    .map((run, index) => {
      const x = 3 + (index / Math.max(points.length - 1, 1)) * 94
      return `${index ? 'L' : 'M'} ${x} ${position(run.metrics[metric]!)}`
    })
    .join(' ')
  const first = values[0]
  const latest = values.at(-1)
  const active = points[hovered ?? points.length - 1]
  const activeIndex = hovered ?? points.length - 1
  const activeX = 3 + (activeIndex / Math.max(points.length - 1, 1)) * 94
  const activeY = active ? position(active.metrics[metric]!) : 0
  const change = first && latest !== undefined ? ((latest - first) / first) * 100 : null

  return (
    <section className="graph-card">
      <div className="graph-heading">
        <h2>{title}</h2>
        {active && latest !== undefined && (
          <div>
            <strong>{formatValue(active.metrics[metric]!, unit)}</strong>
            <span className={changeClass(change, false)}>{formatChange(change)}</span>
          </div>
        )}
      </div>
      {points.length < 2 ? (
        <div className="empty-graph">Waiting for two main-branch runs.</div>
      ) : (
        <>
          <div className="chart-body">
            <div className="chart-scale">
              <span>{formatValue(max, unit)}</span>
              <span>{formatValue(min, unit)}</span>
            </div>
            <div
              className="history-plot"
              onPointerMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect()
                const x = (event.clientX - bounds.left) / bounds.width
                setHovered(
                  Math.max(
                    0,
                    Math.min(
                      points.length - 1,
                      Math.round(((x - 0.03) / 0.94) * (points.length - 1)),
                    ),
                  ),
                )
                setTooltip({ x: event.clientX, y: event.clientY })
              }}
              onPointerLeave={() => {
                setHovered(null)
                setTooltip(null)
              }}
            >
              <svg
                className="history"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                role="img"
                aria-label={`${title} over time`}
              >
                <defs>
                  <clipPath id={`chart-clip-${metric}`}>
                    <rect width="100" height="100" />
                  </clipPath>
                </defs>
                <g clipPath={`url(#chart-clip-${metric})`}>
                  <path className="grid" d="M0 12H100 M0 50H100 M0 88H100" />
                  <path className="series" d={path} />
                </g>
              </svg>
              {hovered !== null && (
                <>
                  <span
                    className="chart-crosshair chart-crosshair-x"
                    style={{ left: `${activeX}%` }}
                  />
                  <span
                    className="chart-crosshair chart-crosshair-y"
                    style={{ top: `${activeY}%` }}
                  />
                </>
              )}
              {points.map((run, index) => {
                const x = 3 + (index / Math.max(points.length - 1, 1)) * 94
                const y = position(run.metrics[metric]!)
                const label = `${formatValue(run.metrics[metric]!, unit)} · ${short(run.commit)} · ${new Date(run.timestamp).toLocaleDateString()}`
                return (
                  <button
                    key={run.commit}
                    className={`history-point${index === (hovered ?? points.length - 1) ? ' active-point' : ''}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onPointerEnter={() => setHovered(index)}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setHovered(index)}
                    onBlur={() => setHovered(null)}
                    onClick={() => {
                      const base = points[index - 1]
                      if (!base) return
                      const url = new URL(window.location.href)
                      url.search = new URLSearchParams({
                        base: base.commit,
                        head: run.commit,
                      }).toString()
                      window.location.href = url.toString()
                    }}
                    disabled={index === 0}
                    aria-label={label}
                    title={label}
                  />
                )
              })}
            </div>
            {hovered !== null &&
              tooltip &&
              createPortal(
                <span
                  className="chart-tooltip chart-tooltip-floating"
                  style={{ left: tooltip.x, top: tooltip.y }}
                >
                  {new Date(active.timestamp).toLocaleString()} · {short(active.commit)} ·{' '}
                  {formatValue(active.metrics[metric]!, unit)}
                </span>,
                document.body,
              )}
          </div>
          <div className="chart-dates">
            <span>{new Date(points[0].timestamp).toLocaleDateString()}</span>
            <span>{new Date(points.at(-1)!.timestamp).toLocaleDateString()}</span>
          </div>
        </>
      )}
    </section>
  )
}

export function App() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const route = new URLSearchParams(window.location.search)
  const base = route.get('base')
  const head = route.get('head')
  const benchmark = route.get('benchmark')
  const fileViewer = route.get('view') === 'files' && benchmark
  const comparison = Boolean(base && head && base !== head)
  const toggleTheme = () =>
    setTheme((value) => {
      const next = value === 'light' ? 'dark' : 'light'
      localStorage.setItem('solar-web-theme', next)
      return next
    })

  return (
    <>
      <SiteHeader
        compact={Boolean(fileViewer)}
        dashboard={!comparison}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      {comparison ? (
        fileViewer ? (
          <FileViewer base={base!} head={head!} benchmark={benchmark!} theme={theme} />
        ) : (
          <Compare base={base!} head={head!} theme={theme} />
        )
      ) : (
        <Home />
      )}
      {!fileViewer && <SiteFooter />}
    </>
  )
}

function SiteHeader({
  compact,
  dashboard,
  theme,
  onToggleTheme,
}: {
  compact: boolean
  dashboard: boolean
  theme: Theme
  onToggleTheme: () => void
}) {
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  return (
    <header className={compact ? 'file-header' : ''}>
      <a className="wordmark" href={import.meta.env.BASE_URL}>
        <img alt="Solar" src={`${import.meta.env.BASE_URL}logo.png`} />
        <span>Web</span>
      </a>
      <nav>
        {compact ? (
          <a href={import.meta.env.BASE_URL}>Dashboard</a>
        ) : (
          <>
            <a className={dashboard ? 'nav-active' : undefined} href={import.meta.env.BASE_URL}>
              Dashboard
            </a>
            <a href="https://github.com/paradigmxyz/solar">Repository</a>
          </>
        )}
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${nextTheme} theme`}
          title={`Switch to ${nextTheme} theme`}
        >
          {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
        </button>
      </nav>
    </header>
  )
}

function SiteFooter() {
  return <footer>Measured by the in-repository runtime corpus.</footer>
}

function Home() {
  const [index, setIndex] = useState<RunIndex | null>(null)
  const [error, setError] = useState('')
  const [base, setBase] = useState('')
  const [head, setHead] = useState('')
  const defaultsApplied = useRef(false)
  const runs = useMemo(() => index?.runs ?? [], [index])
  const mainRuns = useMemo(() => runs.filter((run) => run.branch === 'main'), [runs])
  const selectedBase = resolveCommit(base, runs)
  const selectedHead = resolveCommit(head, runs)

  useEffect(() => {
    loadIndex()
      .then(setIndex)
      .catch((value: Error) => setError(value.message))
  }, [])
  useEffect(() => {
    if (defaultsApplied.current || runs.length === 0) return
    const nextHead = runSelectorValue(runs[0])
    setHead(nextHead)
    if (runs.length > 1) {
      const nextBase = runSelectorValue(runs[1])
      setBase(resolveCommit(nextBase, runs) === runs[0].commit ? short(runs[1].commit) : nextBase)
    }
    defaultsApplied.current = true
  }, [runs])

  const compare = () => {
    if (!selectedBase || !selectedHead || selectedBase === selectedHead) return
    const url = new URL(window.location.href)
    url.search = new URLSearchParams({ base: selectedBase, head: selectedHead }).toString()
    window.location.href = url.toString()
  }

  return (
    <main className="dashboard">
      <section className="dashboard-title">
        <div>
          <h1>Performance</h1>
          <p>Main branch benchmark history</p>
        </div>
        <span>{mainRuns.length} runs</span>
      </section>
      <section className="compare-box" aria-label="Compare commits">
        <CommitPicker label="base" value={base} runs={runs} onChange={setBase} />
        <span className="arrow">→</span>
        <CommitPicker label="head" value={head} runs={runs} onChange={setHead} />
        <button
          onClick={compare}
          disabled={!selectedBase || !selectedHead || selectedBase === selectedHead}
        >
          Compare
        </button>
      </section>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <section className="chart-grid">
          {charts.map((chart) => (
            <HistoryGraph key={chart.metric} runs={runs} {...chart} />
          ))}
        </section>
      )}
      <section className="recent">
        <div className="section-heading">
          <h2>Recent runs</h2>
          <span>lower is better</span>
        </div>
        <div className="run run-head">
          <span>commit</span>
          <span>change</span>
          <span>date</span>
          <span>runtime gas</span>
          <span>runtime bytes</span>
        </div>
        {runs.length === 0 ? (
          <p className="empty">No published benchmark runs yet.</p>
        ) : (
          runs.slice(0, 12).map((run) => {
            const comparison = runs.find((candidate) => candidate.commit !== run.commit)?.commit
            const contents = (
              <>
                <code>{short(run.commit)}</code>
                <span title={runTitle(run)}>{runTitle(run)}</span>
                <time>{new Date(run.timestamp).toLocaleDateString()}</time>
                <strong>{run.metrics.runtimeGas?.toLocaleString() ?? 'n/a'}</strong>
                <strong>{run.metrics.runtimeSize?.toLocaleString() ?? 'n/a'}</strong>
              </>
            )
            return comparison ? (
              <a className="run" key={run.commit} href={`?base=${comparison}&head=${run.commit}`}>
                {contents}
              </a>
            ) : (
              <div className="run" key={run.commit}>
                {contents}
              </div>
            )
          })
        )}
      </section>
    </main>
  )
}
