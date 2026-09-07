import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { artifactTree, mergeArtifactFiles, type ArtifactNode } from './artifactTree'
import { loadRunWithArtifacts } from './data'
import { compilerLabel } from './compilerLabel'
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
  const [against, setAgainst] = useState(params.get('against') || 'base')
  const [compiler, setCompiler] = useState(params.get('compiler') || 'solar')
  const [selected, setSelected] = useState(params.get('file') || '')

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
  const files = useMemo(
    () =>
      runs
        ? mergeArtifactFiles(
            runs[against === 'base' ? 0 : 1].artifacts[activeBenchmark] || [],
            runs[1].artifacts[activeBenchmark] || [],
          )
        : [],
    [runs, activeBenchmark, against],
  )
  const compilers = useMemo(
    () => [...new Set(files.flatMap((file) => file.compilers))].sort(),
    [files],
  )
  const rightCompiler = compilers.includes(compiler) ? compiler : compilers[0] || compiler
  const comparisonCommit = against === 'base' ? base : head
  const leftCompiler = against === 'base' || !compilers.includes(against) ? rightCompiler : against
  const visibleFiles = files.filter(
    (file) => file.compilers.includes(leftCompiler) || file.compilers.includes(rightCompiler),
  )
  const selectedFile = visibleFiles.find((file) => file.path === selected) || visibleFiles[0]
  const leftLabel = runs
    ? compilerLabel(runs[against === 'base' ? 0 : 1], activeBenchmark, leftCompiler)
    : leftCompiler
  const rightLabel = runs ? compilerLabel(runs[1], activeBenchmark, rightCompiler) : rightCompiler

  const updateUrl = (key: string, value: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set(key, value)
    if (key === 'benchmark') url.searchParams.delete('file')
    history.replaceState(null, '', url)
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
              {!!compilers.length && (
                <>
                  <label>
                    Compiler
                    <select
                      aria-label="Compiler"
                      value={rightCompiler}
                      onChange={(event) => {
                        setCompiler(event.target.value)
                        updateUrl('compiler', event.target.value)
                      }}
                    >
                      {compilers.map((name) => (
                        <option key={name} value={name}>
                          {compilerLabel(runs[1], activeBenchmark, name)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Compare with
                    <select
                      aria-label="Compare with"
                      value={against === 'base' ? 'base' : leftCompiler}
                      onChange={(event) => {
                        setAgainst(event.target.value)
                        updateUrl('against', event.target.value)
                      }}
                    >
                      <option value="base">Base commit</option>
                      {compilers.map((name) => (
                        <option key={name} value={name}>
                          {compilerLabel(runs[1], activeBenchmark, name)}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}
            </div>
            <FileTree
              nodes={artifactTree(visibleFiles)}
              selected={selectedFile?.path || ''}
              onSelect={selectFile}
            />
          </aside>
          <div className="file-diff">
            {selectedFile ? (
              <>
                <div className="diff-sides">
                  <span>{leftLabel}</span>
                  <span>{rightLabel}</span>
                </div>
                <Suspense fallback={<p className="empty">Loading renderer…</p>}>
                  <ArtifactDiff
                    key={`${activeBenchmark}/${selectedFile.path}/${comparisonCommit}/${leftCompiler}/${head}/${rightCompiler}`}
                    before={{
                      label: leftLabel,
                      commit: comparisonCommit,
                      benchmark: activeBenchmark,
                      compiler: leftCompiler,
                      storagePath: runs[against === 'base' ? 0 : 1].artifacts[
                        activeBenchmark
                      ]?.find(
                        (file) =>
                          file.path === selectedFile.path && file.compilers.includes(leftCompiler),
                      )?.storagePath,
                    }}
                    after={{
                      commit: head,
                      benchmark: activeBenchmark,
                      compiler: rightCompiler,
                      label: rightLabel,
                      storagePath: runs[1].artifacts[activeBenchmark]?.find(
                        (file) =>
                          file.path === selectedFile.path && file.compilers.includes(rightCompiler),
                      )?.storagePath,
                    }}
                    path={selectedFile.path}
                    language={selectedFile.language}
                    theme={theme}
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
