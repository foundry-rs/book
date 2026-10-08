import { describe, expect, it } from 'vite-plus/test'
import { filterOptions } from '../src/Combobox'

describe('combobox search', () => {
  it('matches every term against labels and values in any order', () => {
    const options = [
      { value: 'solady-encoding', label: 'solady-encoding' },
      { value: 'solady-lib-string', label: 'solady-lib-string' },
      { value: 'head:solc', label: 'solc 0.8.30', group: 'Head' },
    ]
    expect(filterOptions(options, '').map((option) => option.value)).toEqual(
      options.map((option) => option.value),
    )
    expect(filterOptions(options, 'STRING solady').map((option) => option.value)).toEqual([
      'solady-lib-string',
    ])
    expect(filterOptions(options, 'head 0.8').map((option) => option.value)).toEqual(['head:solc'])
    expect(filterOptions(options, 'missing')).toEqual([])
  })
})
