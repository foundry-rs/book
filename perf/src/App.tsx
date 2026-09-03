import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Compare } from './Compare'
import { FileViewer } from './FileViewer'
import type { Theme } from './types'

function comparisonHref(base: string | null, head: string | null) {
  if (!base || !head) return import.meta.env.BASE_URL
  return `?${new URLSearchParams({ base, head })}`
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
  const content = comparison ? (
    fileViewer ? (
      <FileViewer base={base!} head={head!} benchmark={benchmark!} theme={theme} />
    ) : (
      <Compare base={base!} head={head!} theme={theme} />
    )
  ) : (
    <main className="compare-page empty-page">
      <h1>Benchmark viewer</h1>
      <p>Open the benchmark link in a pull request comment.</p>
    </main>
  )
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
        comparison={comparisonHref(base, head)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      {content}
    </>
  )
}

function SiteHeader({
  compact,
  comparison,
  theme,
  onToggleTheme,
}: {
  compact: boolean
  comparison: string
  theme: Theme
  onToggleTheme: () => void
}) {
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  return (
    <header className={compact ? 'file-header' : ''}>
      <a className="wordmark" href={comparison}>
        <img alt="Solar" src={`${import.meta.env.BASE_URL}logo.png`} />
        <span>Web</span>
      </a>
      <nav>
        {compact && <a href={comparison}>Benchmark</a>}
        <a href="https://github.com/paradigmxyz/solar">Repository</a>
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
