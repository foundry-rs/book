import type { FileContents, FileDiffMetadata } from '@pierre/diffs'
import { responseCache } from './cache'

const completed = responseCache<FileDiffMetadata>(3_600_000, 16 * 1024 * 1024)

// Terminate abandoned/expensive computations instead of blocking navigation.
export function computeDiff(before: FileContents, after: FileContents, signal: AbortSignal) {
  const key =
    before.cacheKey && after.cacheKey
      ? JSON.stringify([before.cacheKey, after.cacheKey])
      : undefined
  const cached = key && completed.peek(key)
  if (!signal.aborted && cached) return cached
  return new Promise<FileDiffMetadata>((resolve, reject) => {
    if (signal.aborted) return reject(new Error('Diff cancelled'))
    const worker = new Worker(new URL('./diff.worker.ts', import.meta.url), { type: 'module' })
    const finish = (error?: Error, diff?: FileDiffMetadata) => {
      clearTimeout(timer)
      signal.removeEventListener('abort', abort)
      worker.terminate()
      if (error) reject(error)
      else {
        // Cache only finished work: a cancelled request must not poison its replacement.
        if (key) void completed(key, async () => diff!)
        resolve(diff!)
      }
    }
    const abort = () => finish(new Error('Diff cancelled'))
    const timer = setTimeout(
      () => finish(new Error('Interactive diff exceeded the time limit.')),
      5000,
    )
    signal.addEventListener('abort', abort, { once: true })
    worker.onmessage = (event: MessageEvent<{ diff?: FileDiffMetadata; error?: string }>) => {
      if (event.data.diff) finish(undefined, event.data.diff)
      else finish(new Error(event.data.error || 'Could not compute an interactive diff.'))
    }
    worker.onerror = () => finish(new Error('Could not start the interactive diff worker.'))
    try {
      worker.postMessage({ before, after })
    } catch {
      finish(new Error('Could not send files to the interactive diff worker.'))
    }
  })
}
