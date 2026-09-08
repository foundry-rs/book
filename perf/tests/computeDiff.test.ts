import { afterEach, beforeEach, expect, it, vi } from 'vite-plus/test'
import { computeDiff } from '../src/computeDiff'

class TestWorker {
  static latest: TestWorker
  onmessage?: (event: { data: unknown }) => void
  onerror?: () => void
  terminate = vi.fn()
  postMessage = vi.fn()
  constructor() {
    TestWorker.latest = this
  }
}
const before = { name: 'test.disasm', contents: 'ADD\n' }
const after = { name: 'test.disasm', contents: 'SUB\n' }
beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('Worker', TestWorker)
})
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

it('returns worker metadata and terminates the worker', async () => {
  const promise = computeDiff(before, after, new AbortController().signal)
  const worker = TestWorker.latest
  expect(worker.postMessage).toHaveBeenCalledWith({ before, after })
  const diff = { name: 'test.disasm', hunks: [] }
  worker.onmessage!({ data: { diff } })
  expect(await promise).toEqual(diff)
  expect(worker.terminate).toHaveBeenCalledOnce()
  expect(vi.getTimerCount()).toBe(0)
})
it('cancels abandoned comparisons', async () => {
  const controller = new AbortController()
  const promise = computeDiff(before, after, controller.signal)
  controller.abort()
  await expect(promise).rejects.toThrow('cancelled')
  expect(TestWorker.latest.terminate).toHaveBeenCalledOnce()
})
it('bounds expensive comparisons', async () => {
  const promise = computeDiff(before, after, new AbortController().signal)
  const rejected = expect(promise).rejects.toThrow('time limit')
  vi.advanceTimersByTime(5000)
  await rejected
  expect(TestWorker.latest.terminate).toHaveBeenCalledOnce()
})
it('reports worker failures without a synchronous fallback', async () => {
  const promise = computeDiff(before, after, new AbortController().signal)
  TestWorker.latest.onerror!()
  await expect(promise).rejects.toThrow('worker')
  expect(TestWorker.latest.terminate).toHaveBeenCalledOnce()
})
