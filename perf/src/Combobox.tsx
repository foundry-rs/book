import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { Fragment, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface ComboboxOption {
  value: string
  label?: string
  group?: string
}

export function filterOptions(options: ComboboxOption[], query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  return options.filter((option) => {
    const text = `${option.label ?? ''} ${option.value}`.toLowerCase()
    return terms.every((term) => text.includes(term))
  })
}

export function Combobox({
  value,
  options,
  onChange,
  label,
  disabled,
  className,
}: {
  value: string
  options: ComboboxOption[]
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
  className?: string
}) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [position, setPosition] = useState<{
    left: number
    width: number
    top?: number
    bottom?: number
    maxHeight: number
  }>()
  const trigger = useRef<HTMLButtonElement>(null)
  const popover = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const matches = useMemo(() => filterOptions(options, query), [options, query])
  const current = options.find((option) => option.value === value)
  const text = current?.label ?? value
  const classes = className ? ` ${className}` : ''

  // Placing before the first render lets the search field take focus immediately.
  const place = () => {
    const rect = trigger.current!.getBoundingClientRect()
    const below = window.innerHeight - rect.bottom - 8
    const above = rect.top - 8
    const width = Math.min(Math.max(rect.width, 320), window.innerWidth - 16)
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))
    const up = below < 240 && below < above
    setPosition({
      left,
      width,
      maxHeight: Math.min(up ? above : below, 360),
      ...(up ? { bottom: window.innerHeight - rect.top + 4 } : { top: rect.bottom + 4 }),
    })
  }
  const show = (initialQuery = '') => {
    if (disabled) return
    place()
    setQuery(initialQuery)
    setActive(
      initialQuery
        ? 0
        : Math.max(
            0,
            options.findIndex((option) => option.value === value),
          ),
    )
    setOpen(true)
  }
  const close = (focusTrigger = true) => {
    setOpen(false)
    if (focusTrigger) trigger.current?.focus()
  }
  const choose = (option: ComboboxOption | undefined) => {
    if (!option) return
    close()
    if (option.value !== value) onChange(option.value)
  }

  useEffect(() => {
    if (!open) return
    const reposition = (event: Event) => {
      if (!popover.current?.contains(event.target as Node)) place()
    }
    window.addEventListener('resize', reposition)
    window.addEventListener('scroll', reposition, true)
    return () => {
      window.removeEventListener('resize', reposition)
      window.removeEventListener('scroll', reposition, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const dismiss = (event: PointerEvent) => {
      const target = event.target as Node
      if (!popover.current?.contains(target) && !trigger.current?.contains(target)) close(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open])

  useEffect(() => {
    if (open) list.current?.querySelector('[data-active]')?.scrollIntoView({ block: 'nearest' })
  }, [open, active, matches])

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`combobox-trigger${classes}`}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-list` : undefined}
        disabled={disabled}
        title={text}
        onClick={() => (open ? close() : show())}
        onKeyDown={(event) => {
          if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
            event.preventDefault()
            show()
          } else if (
            event.key.length === 1 &&
            event.key !== ' ' &&
            !event.metaKey &&
            !event.ctrlKey &&
            !event.altKey
          ) {
            event.preventDefault()
            show(event.key)
          }
        }}
      >
        <span>{text}</span>
        <ChevronsUpDown size={14} aria-hidden="true" />
      </button>
      {open &&
        createPortal(
          <div ref={popover} className={`combobox-popover${classes}`} style={position}>
            <div className="combobox-search">
              <Search size={14} aria-hidden="true" />
              <input
                autoFocus
                role="combobox"
                aria-label={label ? `Search ${label.toLowerCase()}` : 'Search options'}
                aria-expanded="true"
                aria-controls={`${id}-list`}
                aria-autocomplete="list"
                aria-activedescendant={matches[active] ? `${id}-${active}` : undefined}
                placeholder="Search…"
                autoComplete="off"
                spellCheck={false}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActive(0)
                }}
                onKeyDown={(event) => {
                  const last = matches.length - 1
                  const next = {
                    ArrowDown: Math.min(active + 1, last),
                    ArrowUp: Math.max(active - 1, 0),
                    PageDown: Math.min(active + 10, last),
                    PageUp: Math.max(active - 10, 0),
                  }[event.key]
                  if (next !== undefined) {
                    event.preventDefault()
                    setActive(next)
                  } else if (event.key === 'Enter') {
                    event.preventDefault()
                    choose(matches[active])
                  } else if (event.key === 'Escape') {
                    event.preventDefault()
                    event.stopPropagation()
                    close()
                  } else if (event.key === 'Tab') close(false)
                }}
              />
            </div>
            <ul ref={list} id={`${id}-list`} role="listbox" aria-label={label}>
              {matches.map((option, index) => (
                <Fragment key={option.value}>
                  {option.group && option.group !== matches[index - 1]?.group && (
                    <li className="combobox-group" role="presentation">
                      {option.group}
                    </li>
                  )}
                  <li
                    id={`${id}-${index}`}
                    role="option"
                    aria-selected={option.value === value}
                    data-active={index === active ? '' : undefined}
                    onPointerMove={() => index !== active && setActive(index)}
                    onPointerDown={(event) => event.preventDefault()}
                    onClick={() => choose(option)}
                  >
                    <span>{option.label ?? option.value}</span>
                    {option.value === value && <Check size={14} aria-hidden="true" />}
                  </li>
                </Fragment>
              ))}
            </ul>
            {!matches.length && <p className="combobox-empty">No matches</p>}
          </div>,
          document.body,
        )}
    </>
  )
}
