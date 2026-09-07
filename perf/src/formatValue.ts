export function formatValue(value: number, unit: string) {
  if (unit === 'seconds')
    return value < 1 ? `${(value * 1000).toFixed(2)} ms` : `${value.toFixed(2)} s`
  if (unit === 'memory' || unit === 'bytes') {
    const units = ['b', 'KiB', 'MiB', 'GiB', 'TiB']
    const index = Math.min(
      units.length - 1,
      Math.max(0, Math.floor(Math.log2(Math.abs(value)) / 10)),
    )
    return `${(value / 1024 ** index).toLocaleString(undefined, { maximumFractionDigits: index ? 2 : 0 })} ${units[index]}`
  }
  return `${Math.round(value).toLocaleString()} ${unit}`
}
