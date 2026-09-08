import type { HistorySeries } from './types'

export const historyMetrics = [
  'total_gas',
  'deploy_gas',
  'runtime_size',
  'bytecode_size',
  'compile_time_seconds',
  'peak_rss_bytes',
]

// A shared run axis avoids repeating commit hashes and timestamps for every benchmark.
export function historySeries(
  rows: { commit: string; timestamp: string; test_id: string; value: number | null }[],
): HistorySeries {
  const runs = [
    ...new Map(rows.map(({ commit, timestamp }) => [commit, { commit, timestamp }])).values(),
  ]
  const indices = new Map(runs.map((run, index) => [run.commit, index]))
  const values: HistorySeries['values'] = Object.create(null)
  for (const row of rows) {
    if (!row.test_id) continue
    const points = (values[row.test_id] ??= Array<number | null>(runs.length).fill(null))
    points[indices.get(row.commit)!] = row.value
  }
  return { runs, values }
}
