// Older imports retain the original results document even when normalized rows omit labels.
export function compilerLabels(raw: unknown): Map<string, Record<string, string>> {
  const labels = new Map<string, Record<string, string>>()
  if (typeof raw !== 'string') return labels
  try {
    const document = JSON.parse(raw)
    const results = Array.isArray(document) ? document : document?.results
    if (!Array.isArray(results)) return labels
    for (const result of results) {
      if (!result || typeof result !== 'object') continue
      const id = result.test_id ?? result.id ?? result.name
      if (typeof id !== 'string') continue
      const compilers = result.compilers ?? { solar: result.solar, solc: result.solc }
      const entries = Object.entries(compilers).flatMap(([name, value]) => {
        const label = (value as { label?: unknown } | null)?.label
        return typeof label === 'string' && label.trim() ? [[name, label]] : []
      })
      labels.set(id, Object.fromEntries(entries))
    }
  } catch {
    // Missing or malformed legacy metadata must not prevent metrics from loading.
  }
  return labels
}
