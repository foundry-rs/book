import { LoadingText } from './LoadingText'
import { FileTree as PierreFileTree, useFileTree } from '@pierre/trees/react'
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { artifactIcons } from './artifactIcons'
import { ArtifactActions } from './ArtifactActions'
import { Combobox } from './Combobox'
import { mergeArtifactFiles } from './artifactTree'
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

function parentPaths(path: string) {
  const parts = path.split('/')
  return parts.slice(0, -1).map((_, index) => parts.slice(0, index + 1).join('/'))
}

function ArtifactFileTree({
  paths,
  selected,
  onSelect,
}: {
  paths: string[]
  selected: string
  onSelect: (path: string) => void
}) {
  const onSelectRef = useRef(onSelect)
  const selectedRef = useRef(selected)
  const pathsRef = useRef(paths)
  onSelectRef.current = onSelect
  selectedRef.current = selected
  pathsRef.current = paths

  const { model } = useFileTree({
    paths,
    flattenEmptyDirectories: true,
    initialExpansion: 'closed',
    initialExpandedPaths: parentPaths(selected),
    initialSelectedPaths: selected ? [selected] : [],
    icons: artifactIcons,
    density: 'compact',
    search: true,
    onSelectionChange: (selection) => {
      const path = selection.find((item) => pathsRef.current.includes(item))
      if (path && path !== selectedRef.current) onSelectRef.current(path)
    },
  })

  useEffect(() => {
    const expandedPaths = [...new Set(paths.flatMap(parentPaths))].filter((path) => {
      const item = model.getItem(path)
      return !!item && 'isExpanded' in item && item.isExpanded()
    })
    model.resetPaths(paths, { initialExpandedPaths: expandedPaths })
  }, [model, paths])

  useEffect(() => {
    if (!selected || !model.getItem(selected)) return
    for (const path of parentPaths(selected)) {
      const item = model.getItem(path)
      if (item && 'expand' in item) item.expand()
    }
    if (!model.getSelectedPaths().includes(selected)) model.getItem(selected)?.select()
    model.scrollToPath(selected, { focus: false })
  }, [model, selected, paths])

  return (
    <>
      <div className="artifact-tree-toolbar">
        <span>
          Files <small>{paths.length}</small>
        </span>
      </div>
      <PierreFileTree model={model} className="artifact-tree" aria-label="Artifact files" />
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

  // Benchmarks without published files in either run would open an empty viewer. Responses
  // cached before the server listed them fall back to every measured benchmark.
  const benchmarks = useMemo(
    () =>
      runs
        ? [
            ...new Set(
              runs.flatMap(
                (run) => run.artifactBenchmarks ?? run.results.map((result) => result.test_id),
              ),
            ),
          ]
            .sort()
            .map((name) => ({ value: name }))
        : [],
    [runs],
  )
  const choices = useMemo(
    () => (runs ? artifactSides(runs, activeBenchmark) : []),
    [runs, activeBenchmark],
  )
  const sideOptions = useMemo(
    () =>
      choices.map((choice) => ({
        value: choice.id,
        label: choice.label,
        group: choice.side === 'base' ? 'Base' : 'Head',
      })),
    [choices],
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
  const visiblePaths = useMemo(() => visibleFiles.map((file) => file.path), [visibleFiles])
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
          <LoadingText>{importProgress || 'Loading files…'}</LoadingText>
        </p>
      ) : (
        <div className={`file-viewer-body${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
          <aside id="artifact-sidebar" hidden={!sidebarOpen}>
            <div className="file-selector-head">
              <Combobox
                label="Benchmark"
                className="compact"
                value={activeBenchmark}
                options={benchmarks}
                onChange={(name) => {
                  setActiveBenchmark(name)
                  updateUrl('benchmark', name)
                }}
              />
              {(['left', 'right'] as const).map((side) => (
                <label key={side}>
                  {side === 'left' ? 'Left' : 'Right'}
                  <Combobox
                    label={side === 'left' ? 'Left' : 'Right'}
                    className="compact"
                    disabled={loading}
                    value={(side === 'left' ? left : right)?.id ?? ''}
                    options={sideOptions}
                    onChange={(id) => {
                      const next = { left: left!.id, right: right!.id, [side]: id }
                      setSides(next)
                      const url = new URL(window.location.href)
                      url.searchParams.set('left', next.left)
                      url.searchParams.set('right', next.right)
                      url.searchParams.delete('compiler')
                      url.searchParams.delete('against')
                      url.hash = ''
                      replaceUrl(url)
                    }}
                  />
                </label>
              ))}
            </div>
            {loading ? (
              <p className="empty" role="status">
                <LoadingText>Loading files…</LoadingText>
              </p>
            ) : (
              <ArtifactFileTree
                paths={visiblePaths}
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
                <LoadingText>Loading files…</LoadingText>
              </p>
            ) : selectedFile && left && right ? (
              <>
                <div className="artifact-actions-toolbar">
                  {[left, right].map((side, index) => {
                    const file = side.run.artifacts[activeBenchmark]?.find(
                      (file) =>
                        file.path === selectedFile.path && file.compilers.includes(side.compiler),
                    )
                    return (
                      <ArtifactActions
                        key={`${index}:${side.id}:${selectedFile.path}`}
                        source={{
                          label: side.label,
                          commit: side.run.commit,
                          benchmark: activeBenchmark,
                          compiler: side.compiler,
                          storagePath: file?.storagePath,
                          contentHash: file?.contentHashes?.[side.compiler],
                        }}
                      />
                    )
                  })}
                </div>
                <Suspense
                  fallback={
                    <p className="empty">
                      <LoadingText>Loading renderer…</LoadingText>
                    </p>
                  }
                >
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
