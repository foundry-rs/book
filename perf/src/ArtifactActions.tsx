import { useEffect, useState } from 'react'
import { Copy, ExternalLink } from 'lucide-react'
import { loadArtifact } from './data'
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
  const [artifact, setArtifact] = useState<{ contents: string; url: string } | null>(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    let active = true
    let url: string | undefined
    setArtifact(null)
    setStatus('')
    void loadRawArtifact({ commit, benchmark, compiler, storagePath, contentHash, label })
      .then((contents) => {
        if (!active || contents === null) return
        url = URL.createObjectURL(new Blob([contents], { type: 'text/plain;charset=utf-8' }))
        setArtifact({ contents, url })
      })
      .catch(() => {
        if (active) setStatus('Could not load raw file')
      })
    return () => {
      active = false
      if (url) URL.revokeObjectURL(url)
    }
  }, [commit, benchmark, compiler, storagePath, contentHash, label])

  return (
    <div className="artifact-actions" role="group" aria-label={`${label} file actions`}>
      <span className="artifact-actions-label" title={label}>
        {label}
      </span>
      <button
        disabled={!artifact}
        aria-label={`Copy ${label} raw file`}
        onClick={async () => {
          if (!artifact) return
          setStatus('')
          try {
            await navigator.clipboard.writeText(artifact.contents)
            setStatus('Copied')
          } catch {
            setStatus('Copy failed; open raw to copy manually')
          }
        }}
      >
        <Copy size={14} /> Copy
      </button>
      {artifact ? (
        <a
          href={artifact.url}
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
