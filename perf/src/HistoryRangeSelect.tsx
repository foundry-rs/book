import { historyRanges, type HistoryRange } from './historySeries'

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
      <select value={value} onChange={(event) => onChange(event.target.value as HistoryRange)}>
        {historyRanges.map((range) => (
          <option key={range} value={range}>
            {range === 'all' ? 'All' : range}
          </option>
        ))}
      </select>
    </label>
  )
}
