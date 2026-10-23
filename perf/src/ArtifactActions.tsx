import { useEffect, useMemo, useState } from 'react'
import { Copy, ExternalLink } from 'lucide-react'
import { artifactUrl, loadArtifact } from './data'
import type { ArtifactSource } from './formattedArtifact'
import { imageBlob, imageType } from './imageArtifacts'

export function loadRawArtifact(source: ArtifactSource) {
  if (!source.storagePath) return Promise.resolve(null)
  return loadArtifact(
    source.commit,
    source.benchmark,
    source.compiler,
    source.storagePath,
    source.contentHash,
  )
}

export function ArtifactActions({ source, path }: { source: ArtifactSource; path: string }) {
  const { commit, benchmark, compiler, storagePath, contentHash, label } = source
  const [artifact, setArtifact] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  // Images are stored base64-encoded; copy and open the decoded image instead.
  const image = useMemo(
    () => (artifact !== null && imageType(path) ? imageBlob(artifact, path) : null),
    [artifact, path],
  )
  const [imageUrl, setImageUrl] = useState<string>()
  useEffect(() => {
    if (!image) return setImageUrl(undefined)
    const value = URL.createObjectURL(image)
    setImageUrl(value)
    return () => URL.revokeObjectURL(value)
  }, [image])
  const url =
    imageUrl ??
    (storagePath ? artifactUrl(commit, benchmark, compiler, storagePath, contentHash) : undefined)

  useEffect(() => {
    let active = true
    setArtifact(null)
    setStatus('')
    void loadRawArtifact({ commit, benchmark, compiler, storagePath, contentHash, label })
      .then((contents) => {
        if (active) setArtifact(contents)
      })
      .catch(() => {
        if (active) setStatus('Could not load raw file')
      })
    return () => {
      active = false
    }
  }, [commit, benchmark, compiler, storagePath, contentHash, label])

  return (
    <div className="artifact-actions" role="group" aria-label={`${label} file actions`}>
      <span className="artifact-actions-label" title={label}>
        {label}
      </span>
      <button
        disabled={artifact === null}
        aria-label={`Copy ${label} raw file`}
        onClick={async () => {
          if (artifact === null) return
          setStatus('')
          try {
            if (image) await navigator.clipboard.write([new ClipboardItem({ [image.type]: image })])
            else await navigator.clipboard.writeText(artifact)
            setStatus('Copied')
          } catch {
            setStatus('Copy failed; open raw to copy manually')
          }
        }}
      >
        <Copy size={14} /> <span>Copy</span>
      </button>
      {artifact !== null && url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${label} raw file`}
        >
          <ExternalLink size={14} /> <span>Open raw</span>
        </a>
      ) : (
        <button disabled aria-label={`Open ${label} raw file`}>
          <ExternalLink size={14} /> <span>Open raw</span>
        </button>
      )}
      <span className="artifact-actions-status" role="status">
        {status}
      </span>
    </div>
  )
}
