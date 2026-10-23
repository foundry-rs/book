import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { changeClass, formatChange } from './change'
import { percentChange } from './comparison'
import { formatValue } from './formatValue'
import type { HistorySeries } from './types'
import { navigate } from './navigation'
import { project } from './project'
import { historyPath, selectPoint, timePositions, unchangedRunCounts } from './historyPlot'

const short = (commit: string) => commit.slice(0, 8)
// Pixels around the pointer searched for the run that changed the measurement.
const pointerReach = 6

export function HistoryGraph({
  runs,
  metric,
  title,
  unit,
  benchmark,
  id,
  hideMissingLatest = false,
}: {
  runs: HistorySeries
  metric: string
  title: string
  unit: string
  benchmark: string
  id?: string
  hideMissingLatest?: boolean
}) {
  const clipId = useId()
  const [hovered, setHovered] = useState<number | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null)
  // Touch has no hover: the first tap inspects a run and a second tap on it compares.
  const tap = useRef<{ touch: boolean; selected: number | null }>({ touch: false, selected: null })
  const tooltipRef = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    // Keep the floating tooltip inside the viewport, which matters on phones.
    const element = tooltipRef.current
    if (!element) return
    element.style.translate = ''
    const { left, right } = element.getBoundingClientRect()
    const shift = Math.min(0, window.innerWidth - 8 - right) || Math.max(0, 8 - left)
    element.style.translate = `${shift}px`
  })
  useEffect(() => {
    // The floating tooltip is fixed to the viewport, so a scrolled-away tap closes it.
    if (!tooltip || !tap.current.touch) return
    const close = () => {
      setHovered(null)
      setTooltip(null)
    }
    window.addEventListener('scroll', close, { once: true, passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [tooltip])
  const { points, values, min, max, position, positions, path, unchangedCounts } = useMemo(() => {
    const series = runs.values[benchmark] ?? []
    const points = runs.runs
      .map((run, index) => ({ ...run, value: series[index] ?? null }))
      .reverse()
    const values = points.flatMap((run) => (run.value === null ? [] : [run.value]))
    const min = values.reduce((min, value) => Math.min(min, value), values[0] ?? 0)
    const max = values.reduce((max, value) => Math.max(max, value), values[0] ?? 0)
    const range = max - min
    const padding = range === 0 ? Math.max(Math.abs(max) * 0.04, 1) : range * 0.1
    const chartMin = min - padding
    const chartMax = max + padding
    const position = (value: number) =>
      Math.max(10, Math.min(90, 90 - ((value - chartMin) / (chartMax - chartMin)) * 80))
    const positions = timePositions(points)
    const stepped = !project.metrics.find((definition) => definition.key === metric)?.noisy
    const path = historyPath(points, positions, position, stepped)
    const unchangedCounts = unchangedRunCounts(points)
    return { points, values, min, max, position, positions, path, unchangedCounts }
  }, [runs, benchmark, metric])
  // Hide cards without a current measurement, while retaining gaps in visible histories.
  if (!values.length || (hideMissingLatest && points.at(-1)?.value == null)) return null
  const active = points[hovered ?? points.length - 1]
  const activeIndex = hovered ?? points.length - 1
  const activeX = positions[activeIndex]
  const activeY = active?.value != null ? position(active.value) : 0
  const change = percentChange(values[0], active?.value ?? null)

  const unchanged = unchangedCounts[activeIndex]
  // The change a click opens: this run against the run before it.
  const previous = points[activeIndex - 1]?.value ?? null
  const delta = previous !== null && active?.value != null ? active.value - previous : 0
  const deltaChange = percentChange(previous, active?.value ?? null)
  const pointedRun = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    return selectPoint(
      points,
      positions,
      position,
      {
        x: ((event.clientX - bounds.left) / bounds.width) * 100,
        y: ((event.clientY - bounds.top) / bounds.height) * 100,
      },
      { x: (pointerReach / bounds.width) * 100, y: (pointerReach / bounds.height) * 100 },
    )
  }
  const compare = (index: number) => {
    const base = points[index - 1]
    const head = points[index]
    if (!base || head.value === null) return
    const url = new URL(window.location.href)
    url.search = new URLSearchParams({
      base: base.commit,
      head: head.commit,
      benchmark,
      metric,
    }).toString()
    navigate(url)
  }

  return (
    <section className="graph-card" id={id}>
      <div className="graph-heading">
        <h2 title={benchmark}>{benchmark}</h2>
        {active && (
          <div>
            <strong>{active.value === null ? 'n/a' : formatValue(active.value, unit)}</strong>
            <span className={changeClass(change, false)}>{formatChange(change)}</span>
          </div>
        )}
      </div>
      {values.length < 2 ? (
        <div className="empty-graph">
          {values.length ? 'Waiting for two measurements.' : 'No measurements for this metric.'}
        </div>
      ) : (
        <>
          <div className="chart-body">
            <div className="chart-scale">
              <span>{formatValue(max, unit)}</span>
              <span>{formatValue(min, unit)}</span>
            </div>
            <div
              className="history-plot"
              role="slider"
              tabIndex={0}
              aria-label={`${benchmark}: ${title} history. Arrow keys select a run; Enter compares commits.`}
              aria-valuemin={0}
              aria-valuemax={points.length - 1}
              aria-valuenow={activeIndex}
              aria-valuetext={
                active
                  ? `${active.title ? `${active.title} · ` : ''}${new Date(active.timestamp).toLocaleString()} · ${short(active.commit)} · ${active.value === null ? 'No measurement' : formatValue(active.value, unit)}`
                  : undefined
              }
              onFocus={() => setHovered(points.length - 1)}
              onBlur={() => {
                setHovered(null)
                setTooltip(null)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  compare(activeIndex)
                  return
                }
                const index =
                  event.key === 'ArrowLeft'
                    ? activeIndex - 1
                    : event.key === 'ArrowRight'
                      ? activeIndex + 1
                      : event.key === 'Home'
                        ? 0
                        : event.key === 'End'
                          ? points.length - 1
                          : null
                if (index === null) return
                event.preventDefault()
                setHovered(Math.max(0, Math.min(points.length - 1, index)))
              }}
              onPointerDown={(event) => {
                tap.current = { touch: event.pointerType !== 'mouse', selected: hovered }
              }}
              onClick={(event) => {
                const index = pointedRun(event)
                if (tap.current.touch && tap.current.selected !== index) {
                  setHovered(index)
                  setTooltip({ x: event.clientX, y: event.clientY })
                  return
                }
                compare(index)
              }}
              onPointerMove={(event) => {
                setHovered(pointedRun(event))
                setTooltip({ x: event.clientX, y: event.clientY })
              }}
              onPointerLeave={(event) => {
                // Touch pointers leave after every tap; keep the inspected run until blur.
                if (event.pointerType !== 'mouse') return
                setHovered(null)
                setTooltip(null)
              }}
            >
              <svg
                className="history"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                role="img"
                aria-label={`${benchmark}: ${title} over time`}
              >
                <defs>
                  <clipPath id={clipId}>
                    <rect width="100" height="100" />
                  </clipPath>
                </defs>
                <g clipPath={`url(#${clipId})`}>
                  <path className="grid" d="M0 12H100 M0 50H100 M0 88H100" />
                  <path className="series" d={path} />
                </g>
              </svg>
              {hovered !== null && active?.value != null && (
                <>
                  <span
                    className="chart-crosshair chart-crosshair-x"
                    style={{ left: `${activeX}%` }}
                  />
                  <span
                    className="chart-crosshair chart-crosshair-y"
                    style={{ top: `${activeY}%` }}
                  />
                </>
              )}
              {hovered !== null && active?.value != null && (
                <span
                  className="history-point"
                  style={{ left: `${activeX}%`, top: `${activeY}%` }}
                />
              )}
            </div>
            {hovered !== null &&
              active &&
              tooltip &&
              createPortal(
                <span
                  ref={tooltipRef}
                  className="chart-tooltip chart-tooltip-floating"
                  style={{ left: tooltip.x, top: tooltip.y }}
                >
                  {active.title && <strong className="chart-tooltip-title">{active.title}</strong>}
                  {new Date(active.timestamp).toLocaleString()} · {short(active.commit)} ·{' '}
                  {active.value === null ? 'No measurement' : formatValue(active.value, unit)}
                  {delta !== 0 && (
                    <>
                      {' · '}
                      <span className={changeClass(deltaChange, false)}>
                        {delta > 0 && '+'}
                        {formatValue(delta, unit)}
                        {deltaChange !== null && ` (${formatChange(deltaChange)})`}
                      </span>
                    </>
                  )}
                  {unchanged > 1 && ` · Unchanged across ${unchanged} runs`}
                </span>,
                document.body,
              )}
          </div>
          <div className="chart-dates">
            <span>{new Date(points[0].timestamp).toLocaleDateString()}</span>
            <span>{new Date(points.at(-1)!.timestamp).toLocaleDateString()}</span>
          </div>
        </>
      )}
    </section>
  )
}
