import { useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { changeClass, formatChange } from './change'
import { benchmarkMetric } from './benchmarkMetric'
import { formatValue } from './formatValue'
import type { HistoryRun } from './types'
import { navigate } from './navigation'

const short = (commit: string) => commit.slice(0, 8)

export function HistoryGraph({
  runs,
  metric,
  title,
  unit,
  benchmark,
  hideMissingLatest = false,
}: {
  runs: HistoryRun[]
  metric: string
  title: string
  unit: string
  benchmark: string
  hideMissingLatest?: boolean
}) {
  const clipId = useId()
  const [hovered, setHovered] = useState<number | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null)
  const points = [...runs].reverse().map((run) => ({
    ...run,
    value: benchmarkMetric(
      run.results.find((result) => result.test_id === benchmark),
      metric,
    ),
  }))
  const values = points.flatMap((run) => (run.value === null ? [] : [run.value]))
  // Hide cards without a current measurement, while retaining gaps in visible histories.
  if (!values.length || (hideMissingLatest && points.at(-1)?.value == null)) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min
  const padding = range === 0 ? Math.max(Math.abs(max) * 0.04, 1) : range * 0.1
  const chartMin = min - padding
  const chartMax = max + padding
  const position = (value: number) =>
    Math.max(10, Math.min(90, 90 - ((value - chartMin) / (chartMax - chartMin)) * 80))
  const path = points
    .map((run, index) => {
      if (run.value === null) return ''
      const x = 3 + (index / Math.max(points.length - 1, 1)) * 94
      return `${index && points[index - 1].value !== null ? 'L' : 'M'} ${x} ${position(run.value)}`
    })
    .join(' ')
  const first = values[0]
  const latest = points.at(-1)?.value
  const active = points[hovered ?? points.length - 1]
  const activeIndex = hovered ?? points.length - 1
  const activeX = 3 + (activeIndex / Math.max(points.length - 1, 1)) * 94
  const activeY = active?.value != null ? position(active.value) : 0
  const change = first && latest != null ? ((latest - first) / first) * 100 : null

  return (
    <section className="graph-card">
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
              onPointerMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect()
                const x = (event.clientX - bounds.left) / bounds.width
                setHovered(
                  Math.max(
                    0,
                    Math.min(
                      points.length - 1,
                      Math.round(((x - 0.03) / 0.94) * (points.length - 1)),
                    ),
                  ),
                )
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
              {points.map((run, index) => {
                if (run.value === null) return null
                const x = 3 + (index / Math.max(points.length - 1, 1)) * 94
                const y = position(run.value)
                const label = `${benchmark}: ${formatValue(run.value, unit)} · ${short(run.commit)} · ${new Date(run.timestamp).toLocaleDateString()}`
                return (
                  <button
                    key={run.commit}
                    className={`history-point${index === (hovered ?? points.length - 1) ? ' active-point' : ''}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onPointerEnter={() => setHovered(index)}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setHovered(index)}
                    onBlur={() => setHovered(null)}
                    onClick={() => {
                      const base = points[index - 1]
                      if (!base) return
                      const url = new URL(window.location.href)
                      url.search = new URLSearchParams({
                        base: base.commit,
                        head: run.commit,
                        benchmark,
                        metric,
                      }).toString()
                      navigate(url)
                    }}
                    disabled={index === 0}
                    aria-label={label}
                    title={label}
                  />
                )
              })}
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
