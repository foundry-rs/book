import type { FileContents } from '@pierre/diffs'
import { responseCache } from './cache'

const completed = responseCache<string>(3_600_000, 32 * 1024 * 1024)

// Graphviz layout runs in a worker per file, terminated when the view moves on.
export function renderDot(file: FileContents, signal: AbortSignal) {
  const key = file.cacheKey
  const cached = key && completed.peek(key)
  if (!signal.aborted && cached) return cached
  return new Promise<string>((resolve, reject) => {
    if (signal.aborted) return reject(new Error('Render cancelled'))
    const worker = new Worker(new URL('./dot.worker.ts', import.meta.url), { type: 'module' })
    const finish = (error?: Error, svg?: string) => {
      clearTimeout(timer)
      signal.removeEventListener('abort', abort)
      worker.terminate()
      if (error) reject(error)
      else {
        // Cache only finished work: a cancelled request must not poison its replacement.
        if (key) void completed(key, async () => svg!)
        resolve(svg!)
      }
    }
    const abort = () => finish(new Error('Render cancelled'))
    const timer = setTimeout(
      () => finish(new Error('Graph layout exceeded the time limit.')),
      30_000,
    )
    signal.addEventListener('abort', abort, { once: true })
    worker.onmessage = (event: MessageEvent<{ svg?: string; error?: string }>) => {
      if (event.data.svg) finish(undefined, event.data.svg)
      else finish(new Error(event.data.error || 'Could not render the graph.'))
    }
    worker.onerror = () => finish(new Error('Could not start the graph renderer.'))
    worker.postMessage(file.contents)
  })
}
