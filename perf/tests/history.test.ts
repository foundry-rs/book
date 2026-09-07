import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vite-plus/test'
import { HistoryGraph } from '../src/App'
import type { HistoryRun } from '../src/types'

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

function render(history = runs) {
  return renderToStaticMarkup(
    createElement(HistoryGraph, {
      runs: history,
      benchmark: 'small',
      metric: 'total_gas',
      title: 'Runtime gas',
      unit: 'gas',
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

it('does not label an older value as the latest when the latest sample is missing', () => {
  const html = render([{ ...runs[0], results: [] }, ...runs.slice(1)])
  expect(html).toContain('<strong>n/a</strong>')
  expect(html).toContain('Waiting for two measurements.')
})

it('handles metrics with no measurements without invalid SVG coordinates', () => {
  const html = render(runs.map((run) => ({ ...run, results: [] })))
  expect(html).toContain('No measurements for this metric.')
  expect(html).not.toMatch(/NaN|Infinity/)
})
