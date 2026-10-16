import { DiffSkeleton } from './Skeleton'
import { File, FileDiff, VirtualizerContext, WorkerPoolContextProvider } from '@pierre/diffs/react'
import { Virtualizer } from '@pierre/diffs'
import type { FileContents, FileDiffMetadata } from '@pierre/diffs'
import { artifactThemes } from './highlight'
import { computeDiff } from './computeDiff'
import { useLineSelection } from './lineSelection'
import HighlightWorker from '@pierre/diffs/worker/worker.js?worker'
import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { loadDiffFile, type ArtifactSource } from './formattedArtifact'
import { ImageDiff, ImageView, type ImageMode } from './ImageDiff'
import type { Theme } from './types'

interface Props {
  before: ArtifactSource
  after: ArtifactSource
  path: string
  language: string
  theme: Theme
  style: 'split' | 'unified'
  /** Show images, and Graphviz sources rendered to SVG, instead of diffing their text. */
  rendered: boolean
  imageMode: ImageMode
}

const poolOptions = {
  poolSize: 1,
  workerFactory: () => new HighlightWorker(),
}

export default function ArtifactDiff(props: Props) {
  const [virtualizer] = useState(() => new Virtualizer())
  useEffect(() => {
    virtualizer.setup(document)
    return () => virtualizer.cleanUp()
  }, [virtualizer])
  return (
    <VirtualizerContext.Provider value={virtualizer}>
      <WorkerPoolContextProvider
        poolOptions={poolOptions}
        highlighterOptions={{ theme: artifactThemes }}
      >
        <ArtifactDiffContents
          key={JSON.stringify([props.before, props.after, props.path, props.language])}
          {...props}
        />
      </WorkerPoolContextProvider>
    </VirtualizerContext.Provider>
  )
}

function ArtifactDiffContents({
  before,
  after,
  path,
  language,
  theme,
  style,
  rendered,
  imageMode,
}: Props) {
  const [contents, setContents] = useState<[FileContents | null, FileContents | null] | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    let cancelled = false
    setContents(null)
    setError('')
    Promise.all([loadDiffFile(before, path, language), loadDiffFile(after, path, language)])
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
  if (!contents) return <DiffSkeleton label="Loading diff" />
  const [oldFile, newFile] = contents
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
        {rendered ? (
          <ImageView file={oldFile ?? newFile!} />
        ) : (
          <SelectedFile file={oldFile ?? newFile!} theme={theme} side={newFile ? 'R' : 'L'} />
        )}
      </>
    )
  }
  if (rendered)
    return (
      <ImageDiff
        before={oldFile}
        after={newFile}
        beforeLabel={before.label}
        afterLabel={after.label}
        mode={imageMode}
      />
    )
  return (
    <ComputedDiff
      before={oldFile}
      after={newFile}
      beforeLabel={before.label}
      afterLabel={after.label}
      theme={theme}
      style={style}
    />
  )
}

function SelectedFile({ file, theme, side }: { file: FileContents; theme: Theme; side: string }) {
  const selection = useLineSelection(file.name, undefined, side)
  return (
    <File
      className="solar-diff"
      file={file}
      selectedLines={selection.selectedLines}
      options={{
        ...selection.options,
        overflow: 'scroll',
        themeType: theme,
        theme: artifactThemes,
        disableFileHeader: true,
      }}
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
}: {
  before: FileContents
  after: FileContents
  beforeLabel: string
  afterLabel: string
  theme: Theme
  style: Props['style']
}) {
  const [diff, setDiff] = useState<FileDiffMetadata | null>(null)
  const selection = useLineSelection(after.name, diff ?? undefined)
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    setDiff(null)
    setError('')
    computeDiff(before, after, signal).then(
      (value) => {
        if (!signal.aborted) setDiff(value)
      },
      (error: Error) => {
        if (!signal.aborted) setError(error.message)
      },
    )
    return () => controller.abort()
  }, [before, after])
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
  if (!diff) return <DiffSkeleton label="Computing diff" />
  return (
    <>
      {style === 'split' && (
        <div className="diff-sides">
          <span>{beforeLabel}</span>
          <span>{afterLabel}</span>
        </div>
      )}
      <FileDiff
        className="solar-diff"
        fileDiff={diff}
        selectedLines={selection.selectedLines}
        options={{
          ...selection.options,
          disableFileHeader: true,
          diffStyle: style,
          overflow: 'scroll',
          themeType: theme,
          theme: artifactThemes,
        }}
      />
    </>
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
      <pre style={{ overflowX: 'auto' }}>{contents.slice(0, 20_000)}</pre>
    </section>
  )
}
