import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { changeClass, formatChange } from './change'
import { percentChange } from './comparison'
import { formatValue } from './formatValue'
import type { HistorySeries } from './types'
import { navigate } from './navigation'
import { project } from './project'
import {
  historyPath,
  nearestPoint,
  positionTime,
  rollingMedian,
  selectPoint,
  timePositions,
  unchangedRunCounts,
  visibleRange,
  type TimeWindow,
} from './historyPlot'

const short = (commit: string) => commit.slice(0, 8)
// Pixels around the pointer searched for the run that changed the measurement.
const pointerReach = 6
// Plot percent a mouse must move before a press becomes a zoom selection.
const dragThreshold = 1.5

const plotX = (event: { currentTarget: Element; clientX: number }) => {
  const bounds = event.currentTarget.getBoundingClientRect()
  return Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100))
}

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
  // Click coordinates are rounded to whole pixels, so clicks use the run under pointerup.
  const tap = useRef<{ touch: boolean; selected: number | null; index?: number }>({
    touch: false,
    selected: null,
  })
  const tooltipRef = useRef<HTMLSpanElement>(null)
  // Dragging across the plot zooms into that time span; the scale refits to its runs.
  const [zoom, setZoom] = useState<TimeWindow | null>(null)
  const [selection, setSelection] = useState<{ from: number; to: number } | null>(null)
  const drag = useRef<{ x: number; moved: boolean } | null>(null)
  const dragged = useRef(false)
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
  const {
    points,
    plotted,
    values,
    viewValues,
    first,
    last,
    min,
    max,
    position,
    positions,
    path,
    rawPath,
    unchangedCounts,
  } = useMemo(() => {
    const series = runs.values[benchmark] ?? []
    const points = runs.runs
      .map((run, index) => ({ ...run, value: series[index] ?? null }))
      .reverse()
    const noisy = project.metrics.find((definition) => definition.key === metric)?.noisy
    // The median line sets the scale, so one bad run does not flatten the history.
    const plotted = noisy ? rollingMedian(points) : points
    const values = plotted.flatMap((run) => (run.value === null ? [] : [run.value]))
    const positions = timePositions(points, zoom ?? undefined)
    const { first, last, start, end } = visibleRange(positions)
    const viewValues = plotted
      .slice(first, last + 1)
      .flatMap((run) => (run.value === null ? [] : [run.value]))
    const min = viewValues.reduce((min, value) => Math.min(min, value), viewValues[0] ?? 0)
    const max = viewValues.reduce((max, value) => Math.max(max, value), viewValues[0] ?? 0)
    const range = max - min
    const padding = range === 0 ? Math.max(Math.abs(max) * 0.04, 1) : range * 0.1
    const chartMin = min - padding
    const chartMax = max + padding
    const position = (value: number) =>
      Math.max(10, Math.min(90, 90 - ((value - chartMin) / (chartMax - chartMin)) * 80))
    // Only runs in the window and their edge neighbours are drawn.
    const visible = <T,>(list: T[]) => list.slice(start, end + 1)
    const path = historyPath(visible(plotted), visible(positions), position, !noisy)
    const rawPath = noisy ? historyPath(visible(points), visible(positions), position, false) : null
    const unchangedCounts = unchangedRunCounts(points)
    return {
      points,
      plotted,
      values,
      viewValues,
      first,
      last,
      min,
      max,
      position,
      positions,
      path,
      rawPath,
      unchangedCounts,
    }
  }, [runs, benchmark, metric, zoom])
  const pointedRun = useCallback(
    (event: { currentTarget: Element; clientX: number; clientY: number; shiftKey: boolean }) => {
      const bounds = event.currentTarget.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width) * 100
      // Shift skips change-aware selection for runs that share a pixel.
      const index = event.shiftKey
        ? nearestPoint(positions, x)
        : selectPoint(
            points,
            positions,
            position,
            { x, y: ((event.clientY - bounds.top) / bounds.height) * 100 },
            { x: (pointerReach / bounds.width) * 100, y: (pointerReach / bounds.height) * 100 },
          )
      // Runs just outside a zoom window are never selected.
      return Math.max(first, Math.min(last, index))
    },
    [points, positions, position, first, last],
  )
  // Pressing or releasing Shift reselects the run under a resting mouse.
  const mouse = useRef<{ currentTarget: Element; clientX: number; clientY: number } | null>(null)
  useEffect(() => {
    const update = (event: KeyboardEvent) => {
      if (event.key === 'Shift' && mouse.current)
        setHovered(pointedRun({ ...mouse.current, shiftKey: event.shiftKey }))
    }
    window.addEventListener('keydown', update)
    window.addEventListener('keyup', update)
    return () => {
      window.removeEventListener('keydown', update)
      window.removeEventListener('keyup', update)
    }
  }, [pointedRun])
  // Hide cards without a current measurement, while retaining gaps in visible histories.
  if (!values.length || (hideMissingLatest && points.at(-1)?.value == null)) return null
  const activeIndex = hovered ?? last
  const active = points[activeIndex]
  const activeX = positions[activeIndex]
  const activeY = active?.value != null ? position(active.value) : 0
  const change = percentChange(viewValues[0] ?? null, plotted[activeIndex]?.value ?? null)

  const unchanged = unchangedCounts[activeIndex]
  // The change a click opens: this run against the run before it.
  const previous = points[activeIndex - 1]?.value ?? null
  const delta = previous !== null && active?.value != null ? active.value - previous : 0
  const deltaChange = percentChange(previous, active?.value ?? null)
  const finishZoom = () => {
    if (!selection) return
    // The plot pads its edges; a window never extends past the first or last run.
    const from = Math.max(
      Date.parse(points[0].timestamp),
      positionTime(points, selection.from, zoom ?? undefined),
    )
    const to = Math.min(
      Date.parse(points.at(-1)!.timestamp),
      positionTime(points, selection.to, zoom ?? undefined),
    )
    const inside = points.filter((point) => {
      const time = Date.parse(point.timestamp)
      return time >= from && time <= to && point.value !== null
    })
    // A window needs two measured runs to draw a line.
    if (inside.length < 2) return
    setHovered(null)
    setTooltip(null)
    setZoom({ from, to })
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
              aria-label={`${benchmark}: ${title} history. Arrow keys select a run; Enter compares commits; Escape resets zoom.`}
              aria-valuemin={first}
              aria-valuemax={last}
              aria-valuenow={activeIndex}
              aria-valuetext={
                active
                  ? `${active.title ? `${active.title} · ` : ''}${new Date(active.timestamp).toLocaleString()} · ${short(active.commit)} · ${active.value === null ? 'No measurement' : formatValue(active.value, unit)}`
                  : undefined
              }
              onFocus={() => setHovered(last)}
              onBlur={() => {
                setHovered(null)
                setTooltip(null)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  compare(activeIndex)
                  return
                }
                if (event.key === 'Escape' && zoom) {
                  setZoom(null)
                  return
                }
                const index =
                  event.key === 'ArrowLeft'
                    ? activeIndex - 1
                    : event.key === 'ArrowRight'
                      ? activeIndex + 1
                      : event.key === 'Home'
                        ? first
                        : event.key === 'End'
                          ? last
                          : null
                if (index === null) return
                event.preventDefault()
                setHovered(Math.max(first, Math.min(last, index)))
              }}
              onPointerDown={(event) => {
                tap.current = { touch: event.pointerType !== 'mouse', selected: hovered }
                // Touch drags scroll the page, so only a mouse can select a zoom span.
                if (event.pointerType === 'mouse' && event.button === 0) {
                  drag.current = { x: plotX(event), moved: false }
                  event.currentTarget.setPointerCapture(event.pointerId)
                }
              }}
              onPointerUp={(event) => {
                tap.current.index = pointedRun(event)
                if (drag.current?.moved) {
                  dragged.current = true
                  finishZoom()
                }
                drag.current = null
                setSelection(null)
              }}
              onLostPointerCapture={() => {
                drag.current = null
                setSelection(null)
              }}
              onClick={(event) => {
                // The click that ends a zoom selection does not open a comparison.
                if (dragged.current) {
                  dragged.current = false
                  return
                }
                const index = tap.current.index ?? pointedRun(event)
                if (tap.current.touch && tap.current.selected !== index) {
                  setHovered(index)
                  setTooltip({ x: event.clientX, y: event.clientY })
                  return
                }
                compare(index)
              }}
              onPointerMove={(event) => {
                if (event.pointerType === 'mouse')
                  mouse.current = {
                    currentTarget: event.currentTarget,
                    clientX: event.clientX,
                    clientY: event.clientY,
                  }
                // A drag lasts only while the primary button is held.
                if (drag.current && !(event.buttons & 1)) {
                  drag.current = null
                  setSelection(null)
                }
                const start = drag.current
                if (start && (start.moved || Math.abs(plotX(event) - start.x) > dragThreshold)) {
                  start.moved = true
                  const x = plotX(event)
                  setSelection({ from: Math.min(start.x, x), to: Math.max(start.x, x) })
                  setTooltip(null)
                  return
                }
                setHovered(pointedRun(event))
                setTooltip({ x: event.clientX, y: event.clientY })
              }}
              onPointerLeave={(event) => {
                // Touch pointers leave after every tap; keep the inspected run until blur.
                if (event.pointerType !== 'mouse') return
                mouse.current = null
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
                  {rawPath && <path className="series-raw" d={rawPath} />}
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
              {selection && (
                <span
                  className="chart-selection"
                  style={{ left: `${selection.from}%`, width: `${selection.to - selection.from}%` }}
                />
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
            <span>{new Date(zoom?.from ?? points[0].timestamp).toLocaleDateString()}</span>
            {zoom && (
              <button type="button" className="chart-reset" onClick={() => setZoom(null)}>
                Reset zoom
              </button>
            )}
            <span>{new Date(zoom?.to ?? points.at(-1)!.timestamp).toLocaleDateString()}</span>
          </div>
        </>
      )}
    </section>
  )
}
