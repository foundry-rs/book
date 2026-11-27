import { useId, useMemo, useState } from 'react'
import type { PrRun } from './types'

const short = (commit: string) => commit.slice(0, 8)

// Matches the PR number, title words, or a commit prefix; an empty query lists every PR.
export function filterPrs(prs: PrRun[], query: string) {
  const terms = query.toLowerCase().replace(/^#/, '').split(/\s+/).filter(Boolean)
  return prs.filter((run) => {
    const text = `${run.pr} ${run.title ?? ''}`.toLowerCase()
    return terms.every((term) => text.includes(term) || run.commit.startsWith(term))
  })
}

export function CommitInput({
  label,
  value,
  onChange,
  prs,
  onPick,
  onFocus,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  prs: PrRun[] | null
  onPick: (run: PrRun) => void
  onFocus?: () => void
}) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  // A picked PR fills the field with its label; list everything again until the user edits it.
  const [query, setQuery] = useState('')
  const matches = useMemo(() => (prs ? filterPrs(prs, query).slice(0, 50) : []), [prs, query])
  const shown = open && matches.length > 0
  const pick = (run: PrRun) => {
    setOpen(false)
    setQuery('')
    onPick(run)
  }

  return (
    <div className="commit-input">
      <label>
        {label}
        <input
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
            setQuery(event.target.value)
            setActive(0)
            setOpen(true)
          }}
          onFocus={() => {
            onFocus?.()
            setOpen(true)
          }}
          onBlur={() => setOpen(false)}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && shown) {
              event.preventDefault()
              setOpen(false)
            } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault()
              if (!open) return setOpen(true)
              const step = event.key === 'ArrowDown' ? 1 : -1
              setActive(Math.max(0, Math.min(matches.length - 1, active + step)))
            } else if (event.key === 'Enter' && shown && matches[active]) {
              event.preventDefault()
              pick(matches[active])
            }
          }}
          placeholder="Commit, branch, tag, or PR"
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-label={`${label} commit`}
          aria-expanded={shown}
          aria-controls={`${id}-prs`}
          aria-autocomplete="list"
          aria-activedescendant={shown ? `${id}-${active}` : undefined}
        />
      </label>
      {shown && (
        <ul
          className="commit-suggestions"
          id={`${id}-prs`}
          role="listbox"
          aria-label="Pull requests"
        >
          {matches.map((run, index) => (
            <li
              key={run.pr}
              id={`${id}-${index}`}
              role="option"
              aria-selected={index === active}
              data-active={index === active ? '' : undefined}
              onPointerMove={() => index !== active && setActive(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => pick(run)}
            >
              <strong>#{run.pr}</strong>
              <span title={run.title ?? undefined}>{run.title ?? 'Untitled pull request'}</span>
              <code>{short(run.commit)}</code>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
