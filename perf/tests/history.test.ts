import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vite-plus/test'
import { HistoryGraph } from '../src/HistoryGraph'
import type { HistoryRun } from '../src/types'
import { historySeries } from '../src/historySeries'
import { benchmarkMetric } from '../src/benchmarkMetric'

it('aligns sparse histories with a shared run axis and safely handles arbitrary benchmark names', () => {
  expect(
    historySeries([
      { commit: 'new', timestamp: 'new', test_id: 'a', value: 0 },
      { commit: 'new', timestamp: 'new', test_id: '__proto__', value: 1 },
      { commit: 'middle', timestamp: 'middle', test_id: '', value: null },
      { commit: 'old', timestamp: 'old', test_id: 'a', value: 3 },
    ]),
  ).toEqual({
    runs: [
      { commit: 'new', timestamp: 'new' },
      { commit: 'middle', timestamp: 'middle' },
      { commit: 'old', timestamp: 'old' },
    ],
    values: { a: [0, null, 3], ['__proto__']: [1, null, null] },
  })
})

const runs: HistoryRun[] = [3, 2, 1].map((n) => ({
  commit: String(n).repeat(40),
  timestamp: `2026-09-0${n}T00:00:00Z`,
  results: [
    {
      test_id: 'small',
      suite: 'runtime',
      compilers: { solar: { status: n === 2 ? 'error' : 'ok', total_gas: n * 10 } },
    },
    {
      test_id: 'large',
      suite: 'runtime',
      compilers: { solar: { status: 'ok', total_gas: 999999 } },
    },
  ],
}))

function render(history = runs, metric = 'total_gas', unit = 'gas', hideMissingLatest = true) {
  return renderToStaticMarkup(
    createElement(HistoryGraph, {
      runs: historySeries(
        history.flatMap((run) =>
          run.results.length
            ? run.results.map((result) => ({
                commit: run.commit,
                timestamp: run.timestamp,
                test_id: result.test_id,
                value: benchmarkMetric(result, metric),
              }))
            : [{ commit: run.commit, timestamp: run.timestamp, test_id: '', value: null }],
        ),
      ),
      benchmark: 'small',
      metric,
      title: 'Runtime gas',
      unit,
      hideMissingLatest,
    }),
  )
}

it('plots only the selected benchmark and leaves failed samples as gaps', () => {
  const html = render()
  expect(html).toContain('30 gas')
  expect(html).not.toContain('999,999')
  expect(html).not.toContain('20 gas')
  expect(html).toMatch(/class="series" d="M[^"L]+M/)
  expect(html.match(/class="history-point/g)).toHaveLength(2)
})

it('hides a card when the latest sample is missing, even with older measurements', () => {
  const html = render([{ ...runs[0], results: [] }, ...runs.slice(1)])
  expect(html).toBe('')
})

it('hides metrics with no measurements', () => {
  const html = render(runs.map((run) => ({ ...run, results: [] })))
  expect(html).toBe('')
})

it('keeps individual benchmark history when the latest run has no measurement', () => {
  expect(
    render([{ ...runs[0], results: [] }, ...runs.slice(1)], 'total_gas', 'gas', false),
  ).toContain('Waiting for two measurements.')
})

it('keeps a valid zero measurement visible', () => {
  const html = render(
    runs.map((run) => ({
      ...run,
      results: [
        {
          test_id: 'small',
          suite: 'runtime',
          compilers: { solar: { status: 'ok', total_gas: 0 } },
        },
      ],
    })),
  )
  expect(html).toContain('0 gas')
})

it.each([
  ['compile_time_seconds', 'seconds', 0.00342, '3.42 ms'],
  ['peak_rss_bytes', 'memory', 23592960, '22.5 MiB'],
  ['runtime_size', 'bytes', 130, '130 b'],
])('formats %s consistently in the shared graph', (metric, unit, value, expected) => {
  const history = runs.map((run) => ({
    ...run,
    results: [
      {
        test_id: 'small',
        suite: 'runtime',
        compilers: { solar: { status: 'ok', [metric]: value } },
      },
    ],
  }))
  expect(render(history, metric, unit)).toContain(expected)
})
