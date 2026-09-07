import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { artifactTree, mergeArtifactFiles, type ArtifactNode } from './artifactTree'
import { loadRunWithArtifacts } from './data'
import { artifactSides, initialArtifactSides } from './artifactSides'
import { replaceUrl } from './navigation'
import type { RunDocument, Theme } from './types'

const ArtifactDiff = lazy(() => import('./ArtifactDiff'))

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
  const params = new URLSearchParams(window.location.search)
  const [runs, setRuns] = useState<[RunDocument, RunDocument] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [activeBenchmark, setActiveBenchmark] = useState(benchmark)
  const [sides, setSides] = useState(() => initialArtifactSides(params))
  const [selected, setSelected] = useState(params.get('file') || '')
  const [diffStyle, setDiffStyle] = useState<'split' | 'unified'>('split')

  useEffect(() => {
    let cancelled = false
    setRuns(null)
    setLoadError(null)
    Promise.all([loadRunWithArtifacts(base), loadRunWithArtifacts(head)]).then(
      (value) => {
        if (!cancelled) setRuns(value)
      },
      () => {
        if (!cancelled) setLoadError('Could not load these benchmark runs.')
      },
    )
    return () => {
      cancelled = true
    }
  }, [base, head])
  useEffect(() => {
    setActiveBenchmark(benchmark)
  }, [benchmark])

  const benchmarks = useMemo(
    () =>
      runs
        ? [
            ...new Set([
              ...Object.keys(runs[0].artifacts),
              ...Object.keys(runs[1].artifacts),
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

  const updateUrl = (key: string, value: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set(key, value)
    if (key === 'benchmark') url.searchParams.delete('file')
    replaceUrl(url)
  }
  const selectFile = (path: string) => {
    setSelected(path)
    updateUrl('file', path)
  }

  return (
    <main className="file-viewer">
      {loadError ? (
        <p className="error">{loadError}</p>
      ) : !runs ? (
        <p className="empty">Loading files…</p>
      ) : (
        <div className="file-viewer-body">
          <aside>
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
                    value={(side === 'left' ? left : right)?.id}
                    onChange={(event) => {
                      const next = { left: left!.id, right: right!.id, [side]: event.target.value }
                      setSides(next)
                      const url = new URL(window.location.href)
                      url.searchParams.set('left', next.left)
                      url.searchParams.set('right', next.right)
                      url.searchParams.delete('compiler')
                      url.searchParams.delete('against')
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
            <FileTree
              nodes={artifactTree(visibleFiles)}
              selected={selectedFile?.path || ''}
              onSelect={selectFile}
            />
          </aside>
          <div className="file-diff">
            {selectedFile && left && right ? (
              <>
                <div className="diff-sides">
                  <span>{left.label}</span>
                  <span>{right.label}</span>
                </div>
                <Suspense fallback={<p className="empty">Loading renderer…</p>}>
                  <ArtifactDiff
                    key={`${activeBenchmark}/${selectedFile.path}/${left.id}/${right.id}`}
                    before={{
                      label: left.label,
                      commit: left.run.commit,
                      benchmark: activeBenchmark,
                      compiler: left.compiler,
                      storagePath: left.run.artifacts[activeBenchmark]?.find(
                        (file) =>
                          file.path === selectedFile.path && file.compilers.includes(left.compiler),
                      )?.storagePath,
                    }}
                    after={{
                      commit: right.run.commit,
                      benchmark: activeBenchmark,
                      compiler: right.compiler,
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
                    onStyleChange={setDiffStyle}
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
