function roundedChange(value: number) {
  return Math.round(value * 100) / 100
}

export function changeClass(value: number | null, higherIsBetter = true) {
  if (value === null) return 'neutral'
  const rounded = roundedChange(value)
  if (rounded === 0) return 'neutral'
  return rounded > 0 === higherIsBetter ? 'good' : 'bad'
}

export function formatChange(value: number | null, fallback = '') {
  if (value === null) return fallback
  const rounded = roundedChange(value)
  return `${rounded > 0 ? '+' : ''}${rounded.toFixed(2)}%`
}
