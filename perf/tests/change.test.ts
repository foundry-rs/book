import { describe, expect, it } from 'vite-plus/test'
import { changeClass } from '../src/change'
import { benchmarkMetric } from '../src/benchmarkMetric'

describe('benchmark change colors', () => {
  it('does not treat failed or missing compiler results as improvements', () => {
    const result = {
      test_id: 'test',
      suite: 'test',
      compilers: { solar: { status: 'failed', compile_time_seconds: 0.01 } },
    }
    expect(benchmarkMetric(result, 'compile_time_seconds')).toBeNull()
    expect(benchmarkMetric(undefined, 'compile_time_seconds')).toBeNull()
    expect(benchmarkMetric({ ...result, compilers: {} }, 'compile_time_seconds')).toBeNull()
    result.compilers.solar.status = 'ok'
    expect(benchmarkMetric(result, 'compile_time_seconds')).toBe(0.01)
  })
  it('treats increases in benchmark costs as regressions by default', () => {
    expect(changeClass(1.71)).toBe('bad')
    expect(changeClass(-1.71)).toBe('good')
  })

  it('keeps missing and rounded-zero changes neutral', () => {
    expect(changeClass(null)).toBe('neutral')
    expect(changeClass(0.001)).toBe('neutral')
  })

  it('supports metrics where higher is better explicitly', () => {
    expect(changeClass(1.71, true)).toBe('good')
    expect(changeClass(-1.71, true)).toBe('bad')
  })
})
