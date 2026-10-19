import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import type { SearchMatch } from './diffSearch'

interface Props {
  search: (query: string) => SearchMatch[]
  onMatch: (match: SearchMatch) => void
  /** Sit below the sticky split-diff column labels. */
  belowSides?: boolean
}

// Virtualized rows are absent from the DOM, so Ctrl+F is replaced by a search of the file contents.
export function DiffSearch({ search, onMatch, belowSides }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const matches = useMemo(() => (open ? search(query) : []), [open, query, search])
  const onMatchRef = useRef(onMatch)
  onMatchRef.current = onMatch

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'f') {
        event.preventDefault()
        setOpen(true)
        input.current?.focus()
        input.current?.select()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    setIndex(0)
    if (matches[0]) onMatchRef.current(matches[0])
  }, [matches])
  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  if (!open) return null
  const step = (delta: number) => {
    if (!matches.length) return
    const next = (index + delta + matches.length) % matches.length
    setIndex(next)
    onMatchRef.current(matches[next])
  }
  return (
    <div className={`diff-search-anchor${belowSides ? ' below-sides' : ''}`}>
      <div className="diff-search" role="search">
        <input
          ref={input}
          type="search"
          aria-label="Search this file"
          placeholder="Find in file"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              step(event.shiftKey ? -1 : 1)
            } else if (event.key === 'Escape') {
              setOpen(false)
            }
          }}
        />
        <span className="diff-search-count" role="status">
          {query ? (matches.length ? `${index + 1} / ${matches.length}` : 'No results') : ''}
        </span>
        <button aria-label="Previous match" disabled={!matches.length} onClick={() => step(-1)}>
          <ChevronUp size={16} />
        </button>
        <button aria-label="Next match" disabled={!matches.length} onClick={() => step(1)}>
          <ChevronDown size={16} />
        </button>
        <button aria-label="Close search" onClick={() => setOpen(false)}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
