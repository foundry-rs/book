import { describe, expect, it } from 'vite-plus/test'
import { changeClass } from '../src/change'

describe('benchmark change colors', () => {
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
