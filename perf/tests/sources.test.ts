import { describe, expect, it } from 'vite-plus/test'

import { benchmarkSource } from '../src/sources'

const commit = '0123456789abcdef0123456789abcdef01234567'

describe('benchmark sources', () => {
  it('links imported micro benchmarks to their pinned source blocks', () => {
    expect(benchmarkSource('factorial', commit).url).toBe(
      'https://github.com/walnuthq/solidity-compiler-benchmarks/blob/01209d2b8ac81645b92e3ef801b5bcdfd61bfd69/gas_bench.py#L79-L107',
    )
  })

  it('links local benchmarks to the compared Solar commit', () => {
    expect(benchmarkSource('counter', commit).url).toBe(
      `https://github.com/paradigmxyz/solar/blob/${commit}/testdata/Counter.sol`,
    )
  })
})
