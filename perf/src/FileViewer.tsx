import { lazy, Suspense, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { artifactTree, mergeArtifactFiles, type ArtifactNode } from './artifactTree'
import { loadArtifact, loadViewerRuns } from './data'
import { useImportProgress } from './importProgress'
import { artifactSides, initialArtifactSides } from './artifactSides'
import { replaceUrl } from './navigation'
import type { RunDocument, Theme } from './types'

const loadRenderer = () => import('./ArtifactDiff')
const ArtifactDiff = lazy(loadRenderer)

interface Props {
  base: string
  head: string
  benchmark: string
  theme: Theme
}

function FileTree({
  nodes,
  selected,
  onSelect,
}: {
  nodes: ArtifactNode[]
  selected: string
  onSelect: (path: string) => void
}) {
  return (
    <>
      {nodes.map((node) => (
        <div key={node.path}>
          {node.file && (
            <button
              className={`artifact-file${selected === node.path ? ' active' : ''}`}
              title={node.path}
              onClick={() => onSelect(node.path)}
            >
              <span>{node.name}</span>
            </button>
          )}
          {!!node.children.length && (
            <details open>
              <summary>{node.name}/</summary>
              <div className="artifact-directory">
                <FileTree nodes={node.children} selected={selected} onSelect={onSelect} />
              </div>
            </details>
          )}
        </div>
      ))}
    </>
  )
}

export function FileViewer({ base, head, benchmark, theme }: Props) {
  const importProgress = useImportProgress(base, head)
  const params = new URLSearchParams(window.location.search)
  const baseRevision = params.get('baseRevision') ?? undefined
  const headRevision = params.get('headRevision') ?? undefined
  const [runs, setRuns] = useState<[RunDocument, RunDocument] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeBenchmark, setActiveBenchmark] = useState(benchmark)
  const [sides, setSides] = useState(() => initialArtifactSides(params))
  const [selected, setSelected] = useState(params.get('file') || '')
  const [diffStyle, setDiffStyle] = useState<'split' | 'unified'>('split')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(270)
  const drag = useRef<{ x: number; width: number } | null>(null)
  const resizeSidebar = (width: number) => setSidebarWidth(Math.max(200, Math.min(480, width)))

  useEffect(() => {
    // A new file starts at its first line, rather than the previous file's page offset.
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [selected, activeBenchmark, sides.left, sides.right])

  useEffect(() => {
    let cancelled = false
    // Download the renderer alongside metadata, not after manifests arrive.
    void loadRenderer().catch(() => {})
    setLoading(true)
    setLoadError(null)
    loadViewerRuns(base, head, activeBenchmark, baseRevision, headRevision).then(
      (value) => {
        if (!cancelled) {
          setRuns(value)
          setLoading(false)
          const url = new URL(window.location.href)
          if (value[0].revision) url.searchParams.set('baseRevision', value[0].revision)
          if (value[1].revision) url.searchParams.set('headRevision', value[1].revision)
          if (url.search !== window.location.search) replaceUrl(url)
        }
      },
      (error: unknown) => {
        if (!cancelled)
          setLoadError(
            error instanceof Error ? error.message : 'Could not load these benchmark runs.',
          )
      },
    )
    return () => {
      cancelled = true
    }
  }, [base, head, activeBenchmark, baseRevision, headRevision])
  useEffect(() => {
    setActiveBenchmark(benchmark)
  }, [benchmark])

  const benchmarks = useMemo(
    () =>
      runs
        ? [
            ...new Set([
              ...runs[0].results.map((result) => result.test_id),
              ...runs[1].results.map((result) => result.test_id),
              activeBenchmark,
            ]),
          ].sort()
        : [],
    [runs, activeBenchmark],
  )
  const choices = useMemo(
    () => (runs ? artifactSides(runs, activeBenchmark) : []),
    [runs, activeBenchmark],
  )
  const left =
    choices.find((choice) => choice.id === sides.left) ||
    choices.find((choice) => choice.id === 'base:solar')
  const right =
    choices.find((choice) => choice.id === sides.right) ||
    choices.find((choice) => choice.id === 'head:solar')
  const visibleFiles = useMemo(
    () =>
      left && right
        ? mergeArtifactFiles(
            (left.run.artifacts[activeBenchmark] || []).filter((file) =>
              file.compilers.includes(left.compiler),
            ),
            (right.run.artifacts[activeBenchmark] || []).filter((file) =>
              file.compilers.includes(right.compiler),
            ),
          )
        : [],
    [left, right, activeBenchmark],
  )
  const selectedFile = visibleFiles.find((file) => file.path === selected) || visibleFiles[0]

  // Start bodies as soon as the descriptor arrives, even while the renderer chunk loads.
  useEffect(() => {
    if (!selectedFile) return
    for (const side of [left, right]) {
      if (!side) continue
      const file = side.run.artifacts[activeBenchmark]?.find(
        (file) => file.path === selectedFile.path && file.compilers.includes(side.compiler),
      )
      if (file)
        void loadArtifact(
          side.run.commit,
          activeBenchmark,
          side.compiler,
          file.storagePath,
          file.contentHashes?.[side.compiler],
        ).catch(() => {})
    }
  }, [left, right, activeBenchmark, selectedFile])

  const updateUrl = (key: string, value: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set(key, value)
    url.hash = ''
    if (key === 'benchmark') url.searchParams.delete('file')
    replaceUrl(url)
  }
  const selectFile = (path: string) => {
    setSelected(path)
    updateUrl('file', path)
  }

  return (
    <main
      className="file-viewer"
      style={{ '--sidebar-width': `${sidebarWidth}px` } as CSSProperties}
    >
      <div className="viewer-toolbar">
        <button
          aria-label={sidebarOpen ? 'Hide file tree' : 'Show file tree'}
          aria-expanded={sidebarOpen}
          aria-controls="artifact-sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>
        <span className="viewer-filename" title={selectedFile?.path}>
          {selectedFile?.path || 'Artifacts'}
        </span>
        <div className="diff-tools" aria-label="Diff layout">
          {(['split', 'unified'] as const).map((style) => (
            <button
              key={style}
              className={diffStyle === style ? 'active' : ''}
              aria-pressed={diffStyle === style}
              onClick={() => setDiffStyle(style)}
            >
              {style === 'split' ? 'Split' : 'Unified'}
            </button>
          ))}
        </div>
      </div>
      {loadError ? (
        <p className="error">{loadError}</p>
      ) : !runs ? (
        <p className="empty" role="status">
          {importProgress || 'Loading files…'}
        </p>
      ) : (
        <div className={`file-viewer-body${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
          <aside id="artifact-sidebar" hidden={!sidebarOpen}>
            <div className="file-selector-head">
              <select
                aria-label="Benchmark"
                value={activeBenchmark}
                onChange={(event) => {
                  setActiveBenchmark(event.target.value)
                  setSelected('')
                  updateUrl('benchmark', event.target.value)
                }}
              >
                {benchmarks.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              {(['left', 'right'] as const).map((side) => (
                <label key={side}>
                  {side === 'left' ? 'Left' : 'Right'}
                  <select
                    aria-label={side === 'left' ? 'Left' : 'Right'}
                    disabled={loading}
                    value={(side === 'left' ? left : right)?.id}
                    onChange={(event) => {
                      const next = { left: left!.id, right: right!.id, [side]: event.target.value }
                      setSides(next)
                      const url = new URL(window.location.href)
                      url.searchParams.set('left', next.left)
                      url.searchParams.set('right', next.right)
                      url.searchParams.delete('compiler')
                      url.searchParams.delete('against')
                      url.hash = ''
                      replaceUrl(url)
                    }}
                  >
                    {(['base', 'head'] as const).map((runSide) => (
                      <optgroup key={runSide} label={runSide === 'base' ? 'Base' : 'Head'}>
                        {choices
                          .filter((choice) => choice.side === runSide)
                          .map((choice) => (
                            <option key={choice.id} value={choice.id}>
                              {choice.label}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            {loading ? (
              <p className="empty" role="status">
                Loading files…
              </p>
            ) : (
              <FileTree
                nodes={artifactTree(visibleFiles)}
                selected={selectedFile?.path || ''}
                onSelect={selectFile}
              />
            )}
          </aside>
          {sidebarOpen && (
            <div
              className="sidebar-resizer"
              role="separator"
              aria-label="Resize file tree"
              aria-orientation="vertical"
              aria-controls="artifact-sidebar"
              aria-valuemin={200}
              aria-valuemax={480}
              aria-valuenow={sidebarWidth}
              tabIndex={0}
              onPointerDown={(event) => {
                if (event.button !== 0) return
                drag.current = { x: event.clientX, width: sidebarWidth }
                event.currentTarget.setPointerCapture(event.pointerId)
                event.preventDefault()
              }}
              onPointerMove={(event) => {
                if (drag.current) resizeSidebar(drag.current.width + event.clientX - drag.current.x)
              }}
              onPointerUp={(event) => {
                drag.current = null
                event.currentTarget.releasePointerCapture(event.pointerId)
              }}
              onLostPointerCapture={() => {
                drag.current = null
              }}
              onKeyDown={(event) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
                event.preventDefault()
                resizeSidebar(
                  event.key === 'Home'
                    ? 200
                    : event.key === 'End'
                      ? 480
                      : sidebarWidth + (event.key === 'ArrowLeft' ? -20 : 20),
                )
              }}
            />
          )}
          <div className="file-diff">
            {loading ? (
              <p className="empty" role="status">
                Loading files…
              </p>
            ) : selectedFile && left && right ? (
              <>
                <div className="diff-sides">
                  <span>{left.label}</span>
                  <span>{right.label}</span>
                </div>
                <Suspense fallback={<p className="empty">Loading renderer…</p>}>
                  <ArtifactDiff
                    before={{
                      label: left.label,
                      commit: left.run.commit,
                      benchmark: activeBenchmark,
                      compiler: left.compiler,
                      contentHash: left.run.artifacts[activeBenchmark]?.find(
                        (file) => file.path === selectedFile.path,
                      )?.contentHashes?.[left.compiler],
                      storagePath: left.run.artifacts[activeBenchmark]?.find(
                        (file) =>
                          file.path === selectedFile.path && file.compilers.includes(left.compiler),
                      )?.storagePath,
                    }}
                    after={{
                      commit: right.run.commit,
                      benchmark: activeBenchmark,
                      compiler: right.compiler,
                      contentHash: right.run.artifacts[activeBenchmark]?.find(
                        (file) => file.path === selectedFile.path,
                      )?.contentHashes?.[right.compiler],
                      label: right.label,
                      storagePath: right.run.artifacts[activeBenchmark]?.find(
                        (file) =>
                          file.path === selectedFile.path &&
                          file.compilers.includes(right.compiler),
                      )?.storagePath,
                    }}
                    path={selectedFile.path}
                    language={selectedFile.language}
                    theme={theme}
                    style={diffStyle}
                  />
                </Suspense>
              </>
            ) : (
              <p className="empty">
                No files were published for this benchmark in either run. Older runs may contain
                metrics only.
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
