import { CodeView, WorkerPoolContextProvider } from '@pierre/diffs/react'
import type { FileContents, FileDiffMetadata } from '@pierre/diffs'
import { computeDiff } from './computeDiff'
import HighlightWorker from '@pierre/diffs/worker/worker.js?worker'
import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import {
  loadFormattedArtifact,
  maxInteractiveArtifact,
  type ArtifactSource,
} from './formattedArtifact'
import { artifactLanguage } from './highlight'
import type { Theme } from './types'

interface Props {
  before: ArtifactSource
  after: ArtifactSource
  path: string
  language: string
  theme: Theme
  style: 'split' | 'unified'
  onStyleChange: (style: 'split' | 'unified') => void
}

const poolOptions = {
  poolSize: 1,
  workerFactory: () => new HighlightWorker(),
}

export default function ArtifactDiff(props: Props) {
  return (
    <WorkerPoolContextProvider poolOptions={poolOptions} highlighterOptions={{}}>
      <ArtifactDiffContents {...props} />
    </WorkerPoolContextProvider>
  )
}

function ArtifactDiffContents({
  before,
  after,
  path,
  language,
  theme,
  style,
  onStyleChange,
}: Props) {
  const [contents, setContents] = useState<[string | null, string | null] | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    let cancelled = false
    setContents(null)
    setError('')
    Promise.all([
      loadFormattedArtifact(before, path, language),
      loadFormattedArtifact(after, path, language),
    ])
      .then(([beforeContents, afterContents]) => {
        if (!cancelled) setContents([beforeContents, afterContents])
      })
      .catch((value: Error) => {
        if (!cancelled) setError(value.message)
      })
    return () => {
      cancelled = true
    }
  }, [
    after.benchmark,
    after.commit,
    after.compiler,
    before.benchmark,
    before.commit,
    before.compiler,
    language,
    path,
    before.storagePath,
    after.storagePath,
    before.contentHash,
    after.contentHash,
  ])
  if (error) return <p className="error">Could not load artifact: {error}</p>
  if (!contents) return <p className="empty">Loading diff…</p>
  if (contents.some((value) => value !== null && value.length > maxInteractiveArtifact))
    return (
      <section className="large-artifact">
        <p className="artifact-notice" role="status">
          This file is too large for an interactive diff. Download the full contents below; the
          preview is limited to 20,000 characters.
        </p>
        {contents.map(
          (value, index) =>
            value !== null && (
              <LargeArtifact
                key={index}
                contents={value}
                label={(index === 0 ? before : after).label}
                path={path}
              />
            ),
        )}
      </section>
    )
  const lang = artifactLanguage(path, language)
  const oldFile = contents[0] === null ? null : { name: path, contents: contents[0], lang }
  const newFile = contents[1] === null ? null : { name: path, contents: contents[1], lang }
  if (oldFile === null && newFile === null) {
    return <p className="empty">This artifact was not published by either side.</p>
  }
  if (!oldFile || !newFile || oldFile.contents === newFile.contents) {
    return (
      <>
        <p className="artifact-notice" role="status">
          <Info size={16} aria-hidden="true" />
          {!oldFile
            ? `Published only by ${after.label}.`
            : !newFile
              ? `Published only by ${before.label}.`
              : 'Contents are identical.'}
        </p>
        <CodeView
          className="solar-diff"
          style={{ height: '75vh' }}
          items={[{ id: path, type: 'file', file: oldFile ?? newFile! }]}
          options={{ overflow: 'scroll', themeType: theme }}
        />
      </>
    )
  }
  return (
    <ComputedDiff
      before={oldFile}
      after={newFile}
      beforeLabel={before.label}
      afterLabel={after.label}
      theme={theme}
      style={style}
      onStyleChange={onStyleChange}
    />
  )
}

function ComputedDiff({
  before,
  after,
  beforeLabel,
  afterLabel,
  theme,
  style,
  onStyleChange,
}: {
  before: FileContents
  after: FileContents
  beforeLabel: string
  afterLabel: string
  theme: Theme
  style: Props['style']
  onStyleChange: Props['onStyleChange']
}) {
  const [diff, setDiff] = useState<FileDiffMetadata | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    let controller: AbortController | undefined
    setDiff(null)
    setError('')
    let settled = false
    const computeWhenVisible = () => {
      if (settled) return
      controller?.abort()
      if (document.hidden) return
      controller = new AbortController()
      const { signal } = controller
      computeDiff(before, after, signal).then(
        (value) => {
          if (!signal.aborted) {
            settled = true
            setDiff(value)
          }
        },
        (error: Error) => {
          if (!signal.aborted) {
            settled = true
            setError(error.message)
          }
        },
      )
    }
    document.addEventListener('visibilitychange', computeWhenVisible)
    computeWhenVisible()
    return () => {
      controller?.abort()
      document.removeEventListener('visibilitychange', computeWhenVisible)
    }
    // File values, not object identity: presentation changes reuse the computed diff.
  }, [before.contents, before.name, before.lang, after.contents, after.name, after.lang])
  if (error)
    return (
      <section className="large-artifact">
        <p className="artifact-notice" role="status">
          {error} Download the full files below; previews are limited to 20,000 characters.
        </p>
        <LargeArtifact contents={before.contents} label={beforeLabel} path={before.name} />
        <LargeArtifact contents={after.contents} label={afterLabel} path={after.name} />
      </section>
    )
  if (!diff)
    return (
      <p className="empty" role="status">
        Computing diff…
      </p>
    )
  return (
    <div className="artifact-diff">
      <div className="diff-tools">
        <button
          className={style === 'split' ? 'active' : ''}
          onClick={() => onStyleChange('split')}
        >
          Split
        </button>
        <button
          className={style === 'unified' ? 'active' : ''}
          onClick={() => onStyleChange('unified')}
        >
          Unified
        </button>
      </div>
      <CodeView
        className="solar-diff"
        style={{ height: '75vh' }}
        items={[{ id: before.name, type: 'diff', fileDiff: diff }]}
        options={{ diffStyle: style, overflow: 'scroll', themeType: theme }}
      />
    </div>
  )
}

function LargeArtifact({
  contents,
  label,
  path,
}: {
  contents: string
  label: string
  path: string
}) {
  const [url, setUrl] = useState<string>()
  useEffect(() => {
    const value = URL.createObjectURL(new Blob([contents], { type: 'text/plain;charset=utf-8' }))
    setUrl(value)
    return () => URL.revokeObjectURL(value)
  }, [contents])
  return (
    <section>
      <h3>{label}</h3>
      {url && (
        <a href={url} download={path.split('/').pop()}>
          Download {path}
        </a>
      )}
      <pre style={{ overflow: 'auto', maxHeight: '50vh' }}>{contents.slice(0, 20_000)}</pre>
    </section>
  )
}
