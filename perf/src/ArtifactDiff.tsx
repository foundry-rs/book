import { File, MultiFileDiff } from '@pierre/diffs/react'
import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { formatArtifactContents } from './artifactFormat'
import { loadArtifact } from './data'
import { artifactLanguage } from './highlight'
import type { Theme } from './types'

interface Props {
  before: {
    commit: string
    benchmark: string
    compiler: string
    label: string
    storagePath?: string
  }
  after: {
    commit: string
    benchmark: string
    compiler: string
    label: string
    storagePath?: string
  }
  path: string
  language: string
  theme: Theme
}

export default function ArtifactDiff({ before, after, path, language, theme }: Props) {
  const [contents, setContents] = useState<[string | null, string | null] | null>(null)
  const [error, setError] = useState('')
  const [style, setStyle] = useState<'split' | 'unified'>('split')
  useEffect(() => {
    let cancelled = false
    setContents(null)
    setError('')
    Promise.all([
      before.storagePath
        ? loadArtifact(before.commit, before.benchmark, before.compiler, before.storagePath)
        : null,
      after.storagePath
        ? loadArtifact(after.commit, after.benchmark, after.compiler, after.storagePath)
        : null,
    ])
      .then(([beforeContents, afterContents]) => {
        if (!cancelled)
          setContents([
            formatArtifactContents(beforeContents, path, language),
            formatArtifactContents(afterContents, path, language),
          ])
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
  ])
  if (error) return <p className="error">Could not load artifact: {error}</p>
  if (!contents) return <p className="empty">Loading diff…</p>
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
        <button className={style === 'split' ? 'active' : ''} onClick={() => setStyle('split')}>
          Split
        </button>
        <button className={style === 'unified' ? 'active' : ''} onClick={() => setStyle('unified')}>
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
