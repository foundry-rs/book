import { afterEach, expect, it, vi } from 'vite-plus/test'
import { responseCache } from '../src/cache'

afterEach(() => vi.useRealTimers())

it('deduplicates concurrent and completed reads', async () => {
  const cache = responseCache<string>(1000)
  const load = vi.fn(async () => 'contents')
  await Promise.all([cache('file', load), cache('file', load)])
  await cache('file', load)
  expect(load).toHaveBeenCalledOnce()
})

it('expires successful reads', async () => {
  vi.useFakeTimers()
  const cache = responseCache<string>(1000)
  const load = vi.fn(async () => 'contents')
  await cache('file', load)
  vi.advanceTimersByTime(1001)
  await cache('file', load)
  expect(load).toHaveBeenCalledTimes(2)
})

it('does not retain failures or missing artifacts', async () => {
  const cache = responseCache<string | null>(1000)
  const load = vi
    .fn()
    .mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValueOnce(null)
    .mockResolvedValue('ready')
  await expect(cache('file', load)).rejects.toThrow('offline')
  expect(await cache('file', load)).toBeNull()
  expect(await cache('file', load)).toBe('ready')
  expect(load).toHaveBeenCalledTimes(3)
})

it('evicts the least recently used entry at the byte limit', async () => {
  const cache = responseCache<string>(1000, 4)
  const a = vi.fn(async () => 'a')
  const b = vi.fn(async () => 'b')
  const c = vi.fn(async () => 'c')
  await cache('a', a)
  await cache('b', b)
  await cache('a', a)
  await cache('c', c)
  await cache('a', a)
  await cache('b', b)
  expect(a).toHaveBeenCalledOnce()
  expect(b).toHaveBeenCalledTimes(2)
})

it('does not retain oversized values', async () => {
  const cache = responseCache<string>(1000, 1)
  const load = vi.fn(async () => 'large')
  await cache('file', load)
  await cache('file', load)
  expect(load).toHaveBeenCalledTimes(2)
})

it('peek shares the completion-based expiry and never renews stale snapshots', async () => {
  vi.useFakeTimers()
  try {
    const cache = responseCache<string>(1000)
    let complete!: (value: string) => void
    const request = cache(
      'key',
      () =>
        new Promise<string>((resolve) => {
          complete = resolve
        }),
    )
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(100)
    complete('first')
    await request
    await vi.advanceTimersByTimeAsync(999)
    expect(await cache.peek('key')).toBe('first')
    await vi.advanceTimersByTimeAsync(2)
    expect(cache.peek('key')).toBeUndefined()
    await cache('key', async () => 'second')
    expect(await cache.peek('key')).toBe('second')
  } finally {
    vi.useRealTimers()
  }
})
