import { Combobox } from './Combobox'
import { historyRanges, type HistoryRange } from './historySeries'

const options = historyRanges.map((range) => ({
  value: range,
  label: range === 'all' ? 'All' : range,
}))

export function HistoryRangeSelect({
  value,
  onChange,
}: {
  value: HistoryRange
  onChange: (value: HistoryRange) => void
}) {
  return (
    <label>
      History
      <Combobox
        label="History"
        value={value}
        options={options}
        onChange={(range) => onChange(range as HistoryRange)}
      />
    </label>
  )
}
