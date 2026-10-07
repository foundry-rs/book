export interface HistoryPoint {
  commit: string
  timestamp: string
  value: number | null
}

export function timePositions(points: HistoryPoint[]) {
  const times = points.map((point) => Date.parse(point.timestamp))
  const first = times[0]
  const span = (times.at(-1) ?? first) - first
  return times.map((time) => (span > 0 ? 3 + ((time - first) / span) * 94 : 50))
}

export function nearestPoint(positions: number[], x: number) {
  let low = 0
  let high = positions.length - 1
  while (low < high) {
    const middle = (low + high) >>> 1
    if (positions[middle] < x) low = middle + 1
    else high = middle
  }
  return low > 0 && x - positions[low - 1] < positions[low] - x ? low - 1 : low
}

// Keep each time bucket's endpoints and extrema; never bridge missing measurements.
export function plotIndices(
  points: HistoryPoint[],
  positions: number[],
  stepped: boolean,
  buckets = 256,
) {
  const kept = new Set<number>()
  let start = 0
  while (start < points.length) {
    if (points[start].value === null) {
      kept.add(start++)
      continue
    }
    let end = start + 1
    if (stepped) {
      while (end < points.length && points[end].value === points[start].value) end++
      kept.add(start)
      kept.add(end - 1)
    } else {
      const bucket = Math.floor((positions[start] / 100) * buckets)
      let min = start
      let max = start
      while (
        end < points.length &&
        points[end].value !== null &&
        Math.floor((positions[end] / 100) * buckets) === bucket
      ) {
        if (points[end].value! < points[min].value!) min = end
        if (points[end].value! > points[max].value!) max = end
        end++
      }
      for (const index of [start, min, max, end - 1]) kept.add(index)
    }
    start = end
  }
  return [...kept].sort((a, b) => a - b)
}

export function historyPath(
  points: HistoryPoint[],
  positions: number[],
  y: (value: number) => number,
  stepped: boolean,
) {
  let connected = false
  return plotIndices(points, positions, stepped)
    .map((index) => {
      const value = points[index].value
      if (value === null) {
        connected = false
        return ''
      }
      const command = connected
        ? stepped
          ? `H ${positions[index]} V`
          : `L ${positions[index]}`
        : `M ${positions[index]}`
      connected = true
      return `${command} ${y(value)}`
    })
    .join(' ')
}

export function unchangedRunCounts(points: HistoryPoint[]) {
  const counts = Array<number>(points.length).fill(0)
  for (let start = 0; start < points.length;) {
    let end = start + 1
    while (end < points.length && points[end].value === points[start].value) end++
    if (points[start].value !== null) counts.fill(end - start, start, end)
    start = end
  }
  return counts
}
