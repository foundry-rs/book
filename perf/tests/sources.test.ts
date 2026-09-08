import { describe, expect, it } from 'vite-plus/test'
import { benchmarkSource } from '../src/sources'

describe('benchmark sources', () => {
  it('does not assume a benchmark script or file location', () => {
    const commit = 'a'.repeat(40)
    for (const name of ['factorial', 'new-test']) {
      expect(benchmarkSource(name, commit).url).toBe(
        `https://github.com/paradigmxyz/solar/tree/${commit}`,
      )
    }
  })
})
