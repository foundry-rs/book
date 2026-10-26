export interface HistoryPoint {
  commit: string
  timestamp: string
  value: number | null
}

export interface TimeWindow {
  from: number
  to: number
}

// A zoom window maps its own span onto the plot; runs outside it fall outside 0–100.
export function timePositions(points: HistoryPoint[], window?: TimeWindow) {
  const times = points.map((point) => Date.parse(point.timestamp))
  const first = window?.from ?? times[0]
  const span = (window?.to ?? times.at(-1) ?? first) - first
  return times.map((time) => (span > 0 ? 3 + ((time - first) / span) * 94 : 50))
}

// The time under a plot position, inverting `timePositions` for the same window.
export function positionTime(points: HistoryPoint[], x: number, window?: TimeWindow) {
  const first = window?.from ?? Date.parse(points[0].timestamp)
  const last = window?.to ?? Date.parse(points.at(-1)!.timestamp)
  return first + ((x - 3) / 94) * (last - first)
}

// Indices of the runs inside the plot, plus one neighbour on each side so lines enter
// and leave the edges. `first` and `last` bound the runs that can be selected.
export function visibleRange(positions: number[]) {
  let first = positions.findIndex((x) => x >= 0)
  if (first < 0) first = positions.length
  let last = positions.length - 1
  while (last >= 0 && positions[last] > 100) last--
  return {
    first,
    last,
    start: Math.max(0, first - 1),
    end: Math.min(positions.length - 1, last + 1),
  }
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

// Runs minutes apart share a pixel, so a vertical step may join several runs. Prefer runs
// whose step passes near the pointer, then the largest change, then the nearest run.
export function selectPoint(
  points: HistoryPoint[],
  positions: number[],
  y: (value: number) => number,
  pointer: { x: number; y: number },
  reach: { x: number; y: number },
) {
  const score = (index: number) => {
    const value = points[index].value
    if (value === null) return [0, 0]
    const previous = points[index - 1]?.value ?? value
    const top = Math.min(y(previous), y(value)) - reach.y
    const bottom = Math.max(y(previous), y(value)) + reach.y
    return [pointer.y >= top && pointer.y <= bottom ? 1 : 0, Math.abs(value - previous)]
  }
  let selected = nearestPoint(positions, pointer.x)
  let best = score(selected)
  let start = selected
  while (start > 0 && positions[start - 1] >= pointer.x - reach.x) start--
  for (
    let index = start;
    index < points.length && positions[index] <= pointer.x + reach.x;
    index++
  ) {
    const candidate = score(index)
    if (candidate[0] > best[0] || (candidate[0] === best[0] && candidate[1] > best[1])) {
      selected = index
      best = candidate
    }
  }
  return selected
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

// Noisy metrics plot the median of nearby runs, so one slow run does not draw a spike.
// The window stays inside one measured segment and never bridges missing measurements.
export function rollingMedian<T extends HistoryPoint>(points: T[], radius = 2): T[] {
  const smoothed = points.map((point) => ({ ...point }))
  for (let start = 0; start < points.length;) {
    if (points[start].value === null) {
      start++
      continue
    }
    let end = start + 1
    while (end < points.length && points[end].value !== null) end++
    for (let index = start; index < end; index++) {
      const window = points
        .slice(Math.max(start, index - radius), Math.min(end, index + radius + 1))
        .map((point) => point.value!)
        .sort((a, b) => a - b)
      const middle = window.length >> 1
      smoothed[index].value =
        window.length % 2 ? window[middle] : (window[middle - 1] + window[middle]) / 2
    }
    start = end
  }
  return smoothed
}
