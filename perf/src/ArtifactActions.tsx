import { useEffect, useState } from 'react'
import { Copy, ExternalLink } from 'lucide-react'
import { artifactUrl, loadArtifact } from './data'
import type { ArtifactSource } from './formattedArtifact'

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

export function ArtifactActions({ source }: { source: ArtifactSource }) {
  const { commit, benchmark, compiler, storagePath, contentHash, label } = source
  const [artifact, setArtifact] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const url = storagePath
    ? artifactUrl(commit, benchmark, compiler, storagePath, contentHash)
    : undefined

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
            await navigator.clipboard.writeText(artifact)
            setStatus('Copied')
          } catch {
            setStatus('Copy failed; open raw to copy manually')
          }
        }}
      >
        <Copy size={14} /> Copy
      </button>
      {artifact !== null && url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${label} raw file`}
        >
          <ExternalLink size={14} /> Open raw
        </a>
      ) : (
        <button disabled aria-label={`Open ${label} raw file`}>
          <ExternalLink size={14} /> Open raw
        </button>
      )}
      <span className="artifact-actions-status" role="status">
        {status}
      </span>
    </div>
  )
}
