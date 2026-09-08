import { useEffect, useState } from 'react'
import { loadHistory } from './data'
import { HistoryGraph } from './HistoryGraph'
import type { HistorySeries } from './types'

interface Props {
  benchmark: string
  metric: string
  title: string
  unit: string
}

export function BenchmarkHistory(props: Props) {
  const [runs, setRuns] = useState<HistorySeries | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setRuns(null)
    setError(false)
    loadHistory(props.metric, props.benchmark).then(
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
  }, [props.benchmark, props.metric])

  if (error) return <p className="detail-muted">Could not load benchmark history.</p>
  if (runs === null) return <p className="detail-muted">Loading history…</p>
  return <HistoryGraph key={`${props.benchmark}:${props.metric}`} runs={runs} {...props} />
}
