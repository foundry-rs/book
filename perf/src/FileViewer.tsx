import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { parseDiffFromFile } from '@pierre/diffs'
import { creationCodeByteLength, formatArtifactContents } from './artifactFormat'
import { loadArtifact, loadRun } from './data'
import { artifactLanguage } from './highlight'
import type { ArtifactFile, RunDocument, Theme } from './types'

const ArtifactDiff = lazy(() => import('./ArtifactDiff'))

interface Props {
  base: string
  head: string
  benchmark: string
  theme: Theme
}

interface Counts {
  additions: number
  deletions: number
}

function fileCounts(
  oldContents: string | null,
  newContents: string | null,
  file: ArtifactFile,
  oldByteLength?: number,
  newByteLength?: number,
): Counts {
  oldContents = formatArtifactContents(oldContents, file.path, file.language, oldByteLength)
  newContents = formatArtifactContents(newContents, file.path, file.language, newByteLength)
  if (oldContents === null && newContents === null) return { additions: 0, deletions: 0 }
  const lang = artifactLanguage(file.path, file.language)
  const diff = parseDiffFromFile(
    oldContents === null ? null : { name: file.path, contents: oldContents, lang },
    newContents === null ? null : { name: file.path, contents: newContents, lang },
  )
  return diff.hunks.reduce(
    (counts, hunk) => ({
      additions: counts.additions + hunk.additionLines,
      deletions: counts.deletions + hunk.deletionLines,
    }),
    { additions: 0, deletions: 0 },
  )
}

export function FileViewer({ base, head, benchmark, theme }: Props) {
  const params = new URLSearchParams(window.location.search)
  const [runs, setRuns] = useState<[RunDocument, RunDocument] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [activeBenchmark, setActiveBenchmark] = useState(benchmark)
  const [against, setAgainst] = useState<'base' | 'solc'>(
    params.get('against') === 'solc' ? 'solc' : 'base',
  )
  const [selected, setSelected] = useState(params.get('file') ?? '')
  const [counts, setCounts] = useState<Record<string, Counts>>({})

  useEffect(() => {
    setRuns(null)
    setLoadError(null)
    Promise.all([loadRun(base), loadRun(head)]).then(setRuns, () => {
      setLoadError('These benchmark runs are not published yet.')
    })
  }, [base, head])
  useEffect(() => {
    setActiveBenchmark(benchmark)
  }, [benchmark])
  const benchmarks = useMemo(() => {
    if (!runs) return []
    const available = new Set([
      ...Object.keys(runs[1].artifacts),
      ...Object.keys(runs[0].artifacts),
    ])
    const ordered = [...runs[1].results, ...runs[0].results].map((result) => result.test_id)
    return [...new Set([...ordered, ...available].filter((name) => available.has(name)))]
  }, [runs])
  const files = useMemo(
    () =>
      runs ? (runs[1].artifacts[activeBenchmark] ?? runs[0].artifacts[activeBenchmark] ?? []) : [],
    [activeBenchmark, runs],
  )
  const creationHex = files.find((file) => file.path === 'creation.hex')
  const runtimeHex = files.find((file) => file.path === 'runtime.hex')
  const comparisonCommit = against === 'base' ? base : head
  const comparisonCompiler = against === 'base' ? 'solar' : 'solc'
  const selectedFile = files.find((file) => file.path === selected) ?? files[0]
  const leftCompiler = comparisonCompiler === 'solc' ? 'solc' : 'solar'

  useEffect(() => {
    if (files.length && !files.some((file) => file.path === selected)) setSelected(files[0].path)
  }, [files, selected])

  useEffect(() => {
    let cancelled = false
    if (!files.length) {
      setCounts({})
      return
    }
    setCounts({})
    void Promise.all(
      files.map(async (file) => {
        try {
          const [
            beforeContents,
            afterContents,
            beforeCreation,
            beforeRuntime,
            afterCreation,
            afterRuntime,
          ] = await Promise.all([
            loadArtifact(comparisonCommit, activeBenchmark, comparisonCompiler, file.storagePath),
            loadArtifact(head, activeBenchmark, 'solar', file.storagePath),
            ...(file.path === 'creation.disasm' && creationHex && runtimeHex
              ? [
                  loadArtifact(
                    comparisonCommit,
                    activeBenchmark,
                    comparisonCompiler,
                    creationHex.storagePath,
                  ),
                  loadArtifact(
                    comparisonCommit,
                    activeBenchmark,
                    comparisonCompiler,
                    runtimeHex.storagePath,
                  ),
                  loadArtifact(head, activeBenchmark, 'solar', creationHex.storagePath),
                  loadArtifact(head, activeBenchmark, 'solar', runtimeHex.storagePath),
                ]
              : []),
          ])
          return [
            file.path,
            fileCounts(
              beforeContents,
              afterContents,
              file,
              creationCodeByteLength(beforeCreation ?? null, beforeRuntime ?? null),
              creationCodeByteLength(afterCreation ?? null, afterRuntime ?? null),
            ),
          ] as const
        } catch {
          return [file.path, { additions: 0, deletions: 0 }] as const
        }
      }),
    ).then((entries) => {
      if (!cancelled) setCounts(Object.fromEntries(entries))
    })
    return () => {
      cancelled = true
    }
  }, [activeBenchmark, comparisonCommit, comparisonCompiler, creationHex, files, head, runtimeHex])

  const selectFile = (path: string) => {
    setSelected(path)
    const url = new URL(window.location.href)
    url.searchParams.set('file', path)
    history.replaceState(null, '', url)
  }
  const selectBenchmark = (value: string) => {
    setActiveBenchmark(value)
    setSelected('')
    const url = new URL(window.location.href)
    url.searchParams.set('benchmark', value)
    url.searchParams.delete('file')
    history.replaceState(null, '', url)
  }
  const setComparison = (value: 'base' | 'solc') => {
    setAgainst(value)
    const url = new URL(window.location.href)
    url.searchParams.set('against', value)
    history.replaceState(null, '', url)
  }
  return (
    <main className="file-viewer">
      {loadError ? (
        <p className="error">{loadError}</p>
      ) : !runs ? (
        <p className="empty">Loading files…</p>
      ) : !files.length ? (
        <p className="empty">No files were published for this benchmark run.</p>
      ) : (
        <div className="file-viewer-body">
          <aside>
            <div className="file-selector-head">
              <select
                aria-label="Benchmark"
                value={activeBenchmark}
                onChange={(event) => selectBenchmark(event.target.value)}
              >
                {benchmarks.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="toggle">
                <button
                  className={against === 'base' ? 'active' : ''}
                  onClick={() => setComparison('base')}
                >
                  vs base
                </button>
                <button
                  className={against === 'solc' ? 'active' : ''}
                  onClick={() => setComparison('solc')}
                >
                  vs solc
                </button>
              </div>
            </div>
            {files.map((file) => {
              const count = counts[file.path]
              return (
                <button
                  key={file.path}
                  className={selectedFile?.path === file.path ? 'active' : ''}
                  onClick={() => selectFile(file.path)}
                >
                  <span>{file.path}</span>
                  <small>
                    <i className="removed">−{count?.deletions ?? 0}</i>
                    <i className="added">+{count?.additions ?? 0}</i>
                  </small>
                </button>
              )
            })}
          </aside>
          <div className="file-diff">
            {selectedFile && (
              <>
                <div className="diff-sides">
                  <span>
                    Left: {leftCompiler} · {comparisonCommit.slice(0, 8)}
                  </span>
                  <span>Right: solar · {head.slice(0, 8)}</span>
                </div>
                <Suspense fallback={<p className="empty">Loading renderer…</p>}>
                  <ArtifactDiff
                    before={{
                      commit: comparisonCommit,
                      benchmark: activeBenchmark,
                      compiler: comparisonCompiler,
                    }}
                    after={{ commit: head, benchmark: activeBenchmark, compiler: 'solar' }}
                    path={selectedFile.path}
                    storagePath={selectedFile.storagePath}
                    language={selectedFile.language}
                    theme={theme}
                    creationHexStoragePath={creationHex?.storagePath}
                    runtimeHexStoragePath={runtimeHex?.storagePath}
                  />
                </Suspense>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
