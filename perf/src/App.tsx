import { useEffect, useMemo, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { HistoryGraph } from './HistoryGraph'
import { Compare } from './Compare'
import { loadHistory, loadIndex, resolveCommit } from './data'
import { comparisonHref, navigate, useNavigation } from './navigation'
import { comparisonBase } from './comparisonBase'
import logo from './assets/logo.png'
import { FileViewer } from './FileViewer'
import type { HistorySeries, RunIndex, RunSummary, Theme } from './types'

const short = (commit: string) => commit.slice(0, 8)

const charts = [
  { metric: 'total_gas', title: 'Runtime gas', unit: 'gas' },
  { metric: 'deploy_gas', title: 'Deploy gas', unit: 'gas' },
  { metric: 'runtime_size', title: 'Runtime bytecode', unit: 'bytes' },
  { metric: 'bytecode_size', title: 'Creation bytecode', unit: 'bytes' },
  { metric: 'compile_time_seconds', title: 'Compile time', unit: 'seconds' },
  { metric: 'peak_rss_bytes', title: 'Peak memory (RSS)', unit: 'memory' },
]

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

export function CommitInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label>
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Commit, branch, tag, or PR"
        autoComplete="off"
        spellCheck={false}
        aria-label={`${label} commit`}
      />
    </label>
  )
}

export function App() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const navigation = useNavigation()
  const route = new URLSearchParams(navigation.search)
  const base = route.get('base')
  const head = route.get('head')
  const benchmark = route.get('benchmark')
  const fileViewer = route.get('view') === 'files' && benchmark
  const comparison = Boolean(base && head)
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
        comparisonHref={comparisonHref(navigation.search)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      {comparison ? (
        fileViewer ? (
          <FileViewer
            key={navigation.key}
            base={base!}
            head={head!}
            benchmark={benchmark!}
            theme={theme}
          />
        ) : (
          <Compare key={navigation.key} base={base!} head={head!} theme={theme} />
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
  comparisonHref,
  theme,
  onToggleTheme,
}: {
  compact: boolean
  dashboard: boolean
  comparisonHref?: string
  theme: Theme
  onToggleTheme: () => void
}) {
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  return (
    <header className={compact ? 'file-header' : ''}>
      <a className="wordmark" href={import.meta.env.BASE_URL}>
        <img alt="Solar" src={logo} />
        <span>Web</span>
      </a>
      <nav>
        {compact ? (
          <a href={comparisonHref}>Comparison</a>
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
  const [history, setHistory] = useState<HistorySeries | null>(null)
  const [historyError, setHistoryError] = useState('')
  const [metric, setMetric] = useState(charts[0].metric)
  const [filter, setFilter] = useState('')
  const chart = charts.find((chart) => chart.metric === metric)!
  const benchmarks = useMemo(() => Object.keys(history?.values ?? {}).sort(), [history])
  const [index, setIndex] = useState<RunIndex | null>(null)
  const [error, setError] = useState('')
  const [base, setBase] = useState('')
  const [head, setHead] = useState('')
  const runs = useMemo(() => index?.runs ?? [], [index])
  const mainRuns = useMemo(() => runs.filter((run) => run.branch === 'main'), [runs])
  const [resolving, setResolving] = useState(false)
  const [compareError, setCompareError] = useState('')

  useEffect(() => {
    loadIndex()
      .then(setIndex)
      .catch((value: Error) => setError(value.message))
  }, [])

  useEffect(() => {
    let cancelled = false
    setHistory(null)
    setHistoryError('')
    loadHistory(metric).then(
      (value) => {
        if (!cancelled) setHistory(value)
      },
      (value: Error) => {
        if (!cancelled) setHistoryError(value.message)
      },
    )
    return () => {
      cancelled = true
    }
  }, [metric])

  const compare = async () => {
    if (resolving || !base.trim() || !head.trim()) return
    setResolving(true)
    setCompareError('')
    try {
      const [selectedBase, selectedHead] = await Promise.all([
        resolveCommit(base),
        resolveCommit(head),
      ])
      if (selectedBase === selectedHead) throw new Error('Choose two different commits.')
      const url = new URL(window.location.href)
      url.search = new URLSearchParams({ base: selectedBase, head: selectedHead }).toString()
      navigate(url)
    } catch (error) {
      setCompareError(error instanceof Error ? error.message : 'Could not resolve commits.')
    } finally {
      setResolving(false)
    }
  }

  return (
    <main className="dashboard">
      <section className="dashboard-title">
        <div>
          <h1>Performance</h1>
          <p>Main branch benchmark history</p>
        </div>
        <span>{index?.totalMainRuns ?? mainRuns.length} runs</span>
      </section>
      <form
        className="compare-box"
        aria-label="Compare commits"
        onSubmit={(event) => {
          event.preventDefault()
          void compare()
        }}
      >
        <CommitInput label="base" value={base} onChange={setBase} />
        <span className="arrow">→</span>
        <CommitInput label="head" value={head} onChange={setHead} />
        <button type="submit" disabled={resolving || !base.trim() || !head.trim()}>
          {resolving ? 'Resolving…' : 'Compare'}
        </button>
      </form>
      {compareError && (
        <p className="error" role="alert">
          {compareError}
        </p>
      )}
      <section className="history-controls" aria-label="Graph settings">
        <label>
          Metric
          <select value={metric} onChange={(event) => setMetric(event.target.value)}>
            {charts.map((chart) => (
              <option key={chart.metric} value={chart.metric}>
                {chart.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Benchmark
          <input
            type="search"
            placeholder="Filter benchmarks"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </label>
        <span>Solar · latest {history?.runs.length ?? 0} main runs · lower is better</span>
      </section>
      <p className="history-note">
        Each graph is one benchmark. Gaps indicate failed or missing measurements. Click a point to
        compare commits.
      </p>
      {error || historyError ? (
        <p className="error">{error || historyError}</p>
      ) : history === null ? (
        <p className="empty">Loading benchmark history…</p>
      ) : (
        <section className="chart-grid">
          {benchmarks
            .filter((benchmark) => benchmark.toLowerCase().includes(filter.toLowerCase()))
            .map((benchmark) => (
              <HistoryGraph
                hideMissingLatest
                key={`${benchmark}:${metric}`}
                runs={history}
                benchmark={benchmark}
                {...chart}
              />
            ))}
          {!benchmarks.some((benchmark) =>
            benchmark.toLowerCase().includes(filter.toLowerCase()),
          ) && <p className="empty">No matching benchmarks.</p>}
        </section>
      )}
      <section className="recent">
        <div className="section-heading">
          <h2>Recent runs</h2>
        </div>
        <div className="run run-head">
          <span>commit</span>
          <span>change</span>
          <span>date</span>
          <span>benchmarks</span>
          <span>branch</span>
        </div>
        {runs.length === 0 ? (
          <p className="empty">No published benchmark runs yet.</p>
        ) : (
          runs.slice(0, 12).map((run) => {
            const comparison = comparisonBase(runs, run)
            const contents = (
              <>
                <code>{short(run.commit)}</code>
                <span title={runTitle(run)}>{runTitle(run)}</span>
                <time>{new Date(run.timestamp).toLocaleDateString()}</time>
                <strong>{run.benchmarkCount}</strong>
                <span title={runRef(run)}>{runRef(run)}</span>
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
