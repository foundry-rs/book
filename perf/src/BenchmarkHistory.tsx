import { useEffect, useState } from 'react'
import { loadIndex, loadRun } from './data'
import type { BenchmarkResult } from './types'

interface Props {
  benchmark: string
  metric: string
  unit: 'bytes' | 'gas' | 'seconds'
}

function metricValue(result: BenchmarkResult | undefined, metric: string) {
  const value = result?.compilers.solar?.[metric as keyof BenchmarkResult['compilers']['solar']]
  return typeof value === 'number' ? value : null
}

function formatValue(value: number, unit: Props['unit']) {
  if (unit === 'seconds') return `${value.toFixed(2)} s`
  if (unit === 'bytes')
    return value >= 1024 * 1024
      ? `${(value / 1024 / 1024).toFixed(1)} MiB`
      : `${Math.round(value / 1024).toLocaleString()} KiB`
  return Math.round(value).toLocaleString()
}

export function BenchmarkHistory({ benchmark, metric, unit }: Props) {
  const [points, setPoints] = useState<
    { commit: string; timestamp: string; value: number }[] | null
  >(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    loadIndex()
      .then((index) =>
        Promise.all(
          index.runs
            .slice(0, 24)
            .reverse()
            .map((run) => loadRun(run.commit)),
        ),
      )
      .then((runs) => {
        if (!cancelled)
          setPoints(
            runs.flatMap((run) => {
              const value = metricValue(
                run.results.find((result) => result.test_id === benchmark),
                metric,
              )
              return value === null ? [] : [{ commit: run.commit, timestamp: run.timestamp, value }]
            }),
          )
      })
      .catch(() => {
        if (!cancelled) setPoints([])
      })
    return () => {
      cancelled = true
    }
  }, [benchmark, metric])

  if (points === null) return <p className="detail-muted">Loading history…</p>
  if (points.length < 2)
    return <p className="detail-muted">No benchmark history is available yet.</p>
  const values = points.map((point) => point.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min
  const padding = range === 0 ? Math.max(Math.abs(max) * 0.04, 1) : range * 0.1
  const chartMin = min - padding
  const chartMax = max + padding
  const y = (value: number) => 90 - ((value - chartMin) / (chartMax - chartMin)) * 80
  const x = (index: number) => 3 + (index / (points.length - 1)) * 94
  const path = points
    .map((point, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(point.value)}`)
    .join(' ')
  const active = points[hovered ?? points.length - 1]
  return (
    <div className="detail-history">
      <div className="history-value">
        <strong>{formatValue(active.value, unit)}</strong>
        <span>
          {active.commit.slice(0, 8)} · {new Date(active.timestamp).toLocaleDateString()}
        </span>
      </div>
      <div className="history-plot">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label="Benchmark history"
        >
          <path className="grid" d="M0 10H100 M0 50H100 M0 90H100" />
          <path className="series" d={path} />
        </svg>
        {points.map((point, index) => {
          const label = `${formatValue(point.value, unit)} · ${point.commit.slice(0, 8)} · ${new Date(point.timestamp).toLocaleDateString()}`
          return (
            <button
              key={point.commit}
              className={`history-point${index === (hovered ?? points.length - 1) ? ' active-point' : ''}`}
              style={{ left: `${x(index)}%`, top: `${y(point.value)}%` }}
              onPointerEnter={() => setHovered(index)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              aria-label={label}
              title={label}
            />
          )
        })}
      </div>
      <div className="history-range">
        <span>{formatValue(min, unit)}</span>
        <span>{formatValue(max, unit)}</span>
      </div>
    </div>
  )
}
