// Keep successful reads across view changes without retaining unbounded artifact text.
export function responseCache<T>(ttl: number, maxBytes = 32 * 1024 * 1024) {
  const values = new Map<string, { value: T; expires: number; bytes: number }>()
  const pending = new Map<string, Promise<T>>()
  let bytes = 0
  const remove = (key: string) => {
    bytes -= values.get(key)?.bytes ?? 0
    values.delete(key)
  }
  return (key: string, load: () => Promise<T>): Promise<T> => {
    const cached = values.get(key)
    if (cached && cached.expires > Date.now()) {
      values.delete(key)
      values.set(key, cached)
      return Promise.resolve(cached.value)
    }
    remove(key)
    const existing = pending.get(key)
    if (existing) return existing
    const request = Promise.resolve()
      .then(load)
      .then((value) => {
        if (value != null) {
          const size = JSON.stringify(value).length * 2
          if (size <= maxBytes) {
            for (const [oldKey, entry] of values) {
              if (entry.expires <= Date.now()) remove(oldKey)
            }
            while (values.size && (bytes + size > maxBytes || values.size >= 128)) {
              remove(values.keys().next().value!)
            }
            values.set(key, { value, expires: Date.now() + ttl, bytes: size })
            bytes += size
          }
        }
        return value
      })
      .finally(() => pending.delete(key))
    pending.set(key, request)
    return request
  }
}
