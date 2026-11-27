// Patience diff, adapted from Jonathan Trent's public-domain implementation:
// https://github.com/jonTrent/PatienceDiff/tree/5dc0301539ae07760eab6258b150f56b76373796
// Keep unique-line anchors; use an iterative work list and binary-search LIS.
function uniqueLines(lines: string[], start: number, end: number) {
  const indices = new Map<string, number>()
  for (let i = start; i < end; i++) indices.set(lines[i], indices.has(lines[i]) ? -1 : i)
  return indices
}

function anchors(a: string[], fromA: number, toA: number, b: string[], fromB: number, toB: number) {
  const uniqueA = uniqueLines(a, fromA, toA)
  const uniqueB = uniqueLines(b, fromB, toB)
  const pairs: [number, number][] = []
  const previous: number[] = []
  const tails: number[] = []
  for (const [line, i] of uniqueA) {
    const j = uniqueB.get(line)
    if (i < 0 || j === undefined || j < 0) continue
    let lo = 0
    let hi = tails.length
    while (lo < hi) {
      const mid = (lo + hi) >>> 1
      if (pairs[tails[mid]][1] < j) lo = mid + 1
      else hi = mid
    }
    previous.push(lo ? tails[lo - 1] : -1)
    tails[lo] = pairs.length
    pairs.push([i, j])
  }
  const result: [number, number][] = []
  for (let i = tails.at(-1) ?? -1; i >= 0; i = previous[i]) result.push(pairs[i])
  return result.reverse()
}

export function patiencePatch(before: string, after: string) {
  // Include line endings in comparisons: a missing final newline is a real change.
  const a = before.match(/[^\n]*\n|[^\n]+$/g) ?? []
  const b = after.match(/[^\n]*\n|[^\n]+$/g) ?? []
  const patch = [
    `--- before\n+++ after\n@@ -${a.length ? 1 : 0},${a.length} +${b.length ? 1 : 0},${b.length} @@\n`,
  ]
  const emit = (prefix: string, line: string) => {
    patch.push(prefix + line)
    if (!line.endsWith('\n')) patch.push('\n\\ No newline at end of file\n')
  }
  const work: [number, number, number, number][] = [[0, a.length, 0, b.length]]
  while (work.length) {
    let [fromA, toA, fromB, toB] = work.pop()!
    while (fromA < toA && fromB < toB && a[fromA] === b[fromB]) {
      emit(' ', a[fromA++])
      fromB++
    }
    const endA = toA
    const endB = toB
    while (fromA < toA && fromB < toB && a[toA - 1] === b[toB - 1]) {
      toA--
      toB--
    }
    if (toA < endA) work.push([toA, endA, toB, endB])
    const matches = fromA < toA && fromB < toB ? anchors(a, fromA, toA, b, fromB, toB) : []
    if (!matches.length) {
      for (let i = fromA; i < toA; i++) emit('-', a[i])
      for (let i = fromB; i < toB; i++) emit('+', b[i])
    } else {
      for (let i = matches.length - 1; i >= 0; i--) {
        const [nextA, nextB] = matches[i]
        work.push([nextA, toA, nextB, toB])
        toA = nextA
        toB = nextB
      }
      work.push([fromA, toA, fromB, toB])
    }
  }
  return patch.join('')
}
