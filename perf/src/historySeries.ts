import type { HistorySeries } from './types'

export const historyRanges = ['30d', '90d', '1y', 'all'] as const
export type HistoryRange = (typeof historyRanges)[number]
export const historyPageSize = 1000

export function validHistoryCursor(cursor: string) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3,6})?Z,[0-9a-f]{40}$/.test(cursor))
    return false
  const timestamp = cursor.split(',')[0]
  const time = Date.parse(timestamp)
  return (
    Number.isFinite(time) && new Date(time).toISOString().slice(0, 19) === timestamp.slice(0, 19)
  )
}

export function hasHistoryChanges(values: (number | null)[]) {
  const measurements = values.filter((value) => value !== null)
  return measurements.some((value) => value !== measurements[0])
}

export function historyCutoff(range: HistoryRange, now = Date.now()) {
  const days = { '30d': 30, '90d': 90, '1y': 365, all: 0 }[range]
  return days ? new Date(now - days * 86_400_000).toISOString() : undefined
}

export function mergeHistory(target: HistorySeries, page: HistorySeries) {
  const offset = target.runs.length
  for (const name of Object.keys(target.values)) {
    target.values[name].push(
      ...(Object.hasOwn(page.values, name)
        ? page.values[name]
        : Array<null>(page.runs.length).fill(null)),
    )
  }
  for (const name of Object.keys(page.values)) {
    if (!Object.hasOwn(target.values, name))
      Object.defineProperty(target.values, name, {
        value: [...Array<null>(offset).fill(null), ...page.values[name]],
        enumerable: true,
        writable: true,
        configurable: true,
      })
  }
  target.runs.push(...page.runs)
}

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
