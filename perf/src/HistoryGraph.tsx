import { useId, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { changeClass, formatChange } from './change'
import { percentChange } from './comparison'
import { formatValue } from './formatValue'
import type { HistorySeries } from './types'
import { navigate } from './navigation'
import { historyPath, nearestPoint, timePositions, unchangedRunCounts } from './historyPlot'

const short = (commit: string) => commit.slice(0, 8)

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
    const stepped = metric !== 'compile_time_seconds' && metric !== 'peak_rss_bytes'
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
                  ? `${new Date(active.timestamp).toLocaleString()} · ${short(active.commit)} · ${active.value === null ? 'No measurement' : formatValue(active.value, unit)}`
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
              onClick={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect()
                compare(
                  nearestPoint(positions, ((event.clientX - bounds.left) / bounds.width) * 100),
                )
              }}
              onPointerMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect()
                const x = (event.clientX - bounds.left) / bounds.width
                setHovered(nearestPoint(positions, x * 100))
                setTooltip({ x: event.clientX, y: event.clientY })
              }}
              onPointerLeave={() => {
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
                  className="chart-tooltip chart-tooltip-floating"
                  style={{ left: tooltip.x, top: tooltip.y }}
                >
                  {new Date(active.timestamp).toLocaleString()} · {short(active.commit)} ·{' '}
                  {active.value === null ? 'No measurement' : formatValue(active.value, unit)}
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
