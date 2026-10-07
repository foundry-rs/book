import { LoadingText } from './LoadingText'
import { useEffect, useState } from 'react'
import { loadHistory } from './data'
import { HistoryGraph } from './HistoryGraph'
import type { HistorySeries } from './types'
import type { HistoryRange } from './historySeries'
import { HistoryRangeSelect } from './HistoryRangeSelect'

interface Props {
  benchmark: string
  metric: string
  title: string
  unit: string
}

export function BenchmarkHistory(props: Props) {
  const [runs, setRuns] = useState<HistorySeries | null>(null)
  const [error, setError] = useState(false)
  const [range, setRange] = useState<HistoryRange>('90d')

  useEffect(() => {
    let cancelled = false
    setRuns(null)
    setError(false)
    loadHistory(props.metric, props.benchmark, range).then(
      (history) => {
        if (!cancelled) setRuns(history)
      },
      () => {
        if (!cancelled) setError(true)
      },
    )
    return () => {
      cancelled = true
    }
  }, [props.benchmark, props.metric, range])

  return (
    <>
      <div className="history-controls">
        <HistoryRangeSelect value={range} onChange={setRange} />
      </div>
      {error ? (
        <p className="detail-muted">Could not load benchmark history.</p>
      ) : runs === null ? (
        <p className="detail-muted">
          <LoadingText>Loading history…</LoadingText>
        </p>
      ) : !runs.runs.length ? (
        <p className="detail-muted">No measurements in this range.</p>
      ) : (
        <HistoryGraph key={`${props.benchmark}:${props.metric}:${range}`} runs={runs} {...props} />
      )}
    </>
  )
}
