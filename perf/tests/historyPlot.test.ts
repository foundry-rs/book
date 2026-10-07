import { expect, it } from 'vite-plus/test'
import {
  historyPath,
  nearestPoint,
  plotIndices,
  timePositions,
  unchangedRunCounts,
} from '../src/historyPlot'
import { hasHistoryChanges, historyCutoff, mergeHistory } from '../src/historySeries'
import type { HistorySeries } from '../src/types'

const points = [10, 10, 20, null, 50, 50].map((value, index) => ({
  value,
  commit: String(index),
  timestamp: new Date(Date.UTC(2026, 0, index === 5 ? 11 : index + 1)).toISOString(),
}))

it('spaces irregular runs by elapsed time and selects the nearest raw measurement', () => {
  const positions = timePositions(points)
  expect(positions).toEqual([3, 12.4, 21.8, 31.2, 40.6, 97])
  expect(nearestPoint(positions, 0)).toBe(0)
  expect(nearestPoint(positions, 39)).toBe(4)
  expect(nearestPoint(positions, 100)).toBe(5)
  expect(timePositions([points[0], points[0]])).toEqual([50, 50])
})

it('draws steps without bridging gaps or erasing value changes', () => {
  expect(historyPath(points, [0, 1, 2, 3, 4, 5], (value) => value, true)).toBe(
    'M 0 10 H 1 V 10 H 2 V 20  M 4 50 H 5 V 50',
  )
  expect(unchangedRunCounts(points)).toEqual([2, 2, 1, 0, 2, 2])
})

it('retains spikes, troughs, endpoints and gaps when reducing a long noisy series', () => {
  const noisy = Array.from({ length: 1000 }, (_, index) => ({
    ...points[0],
    value: index === 350 ? 999 : index === 450 ? -10 : index === 550 ? null : 10,
  }))
  const positions = noisy.map((_, index) => index / 10)
  const kept = plotIndices(noisy, positions, false, 1)
  expect(kept).toEqual([0, 350, 450, 549, 550, 551, 999])
  const path = historyPath(noisy, positions, (value) => value, false)
  expect(path.match(/M /g)).toHaveLength(2)
  expect(path).toContain('999')
  expect(path).toContain('-10')
})

it('filters real changes while ignoring missing-only transitions and preserving zeros', () => {
  expect(hasHistoryChanges([null, 0, null, 0])).toBe(false)
  expect(hasHistoryChanges([null, null])).toBe(false)
  expect(hasHistoryChanges([0, null, 1])).toBe(true)
  expect(historyCutoff('30d', Date.UTC(2026, 1, 1))).toBe('2026-01-02T00:00:00.000Z')
  expect(historyCutoff('all')).toBeUndefined()
})

it('merges pages with new and missing benchmarks without losing alignment', () => {
  const target: HistorySeries = { runs: [points[5]], values: { a: [0] } }
  mergeHistory(target, { runs: [points[4], points[3]], values: { ['__proto__']: [1, 2] } })
  expect(target.runs).toEqual([points[5], points[4], points[3]])
  expect(target.values.a).toEqual([0, null, null])
  expect(Object.hasOwn(target.values, '__proto__')).toBe(true)
  expect(target.values.__proto__).toEqual([null, 1, 2])
  mergeHistory(target, { runs: [points[2]], values: {} })
  expect(target.values.__proto__).toEqual([null, 1, 2, null])
  expect(target.values.a).toEqual([0, null, null, null])
})
