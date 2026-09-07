export function formatValue(value: number, unit: string) {
  if (unit === 'seconds')
    return value < 1 ? `${(value * 1000).toFixed(2)} ms` : `${value.toFixed(2)} s`
  if (unit === 'memory')
    return value >= 1024 * 1024
      ? `${(value / 1024 / 1024).toFixed(1)} MiB`
      : `${Math.round(value / 1024).toLocaleString()} KiB`
  return `${Math.round(value).toLocaleString()} ${unit}`
}
