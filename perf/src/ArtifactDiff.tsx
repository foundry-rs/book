import { File, MultiFileDiff } from '@pierre/diffs/react'
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

export default function ArtifactDiff({
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
        <File
          className="solar-diff"
          file={oldFile ?? newFile!}
          options={{ overflow: 'scroll', themeType: theme }}
          disableWorkerPool
        />
      </>
    )
  }
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
      <MultiFileDiff
        className="solar-diff"
        oldFile={oldFile}
        newFile={newFile}
        options={{ diffStyle: style, overflow: 'scroll', themeType: theme }}
        disableWorkerPool
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
