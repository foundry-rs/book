import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { VirtualizedFile } from '@pierre/diffs'
import { useLineSelection } from '../src/lineSelection'

vi.mock('react', () => ({
  useRef: <T>(current: T) => ({ current }),
  useState: <T>(initial: () => T) => [initial(), vi.fn()],
  useEffect: vi.fn(),
}))

let frames: Map<number, FrameRequestCallback>
let nextFrame: number
let scrollTo: ReturnType<typeof vi.fn>

beforeEach(() => {
  frames = new Map()
  nextFrame = 0
  scrollTo = vi.fn()
  vi.stubGlobal('location', { hash: '#R1800-R1802' })
  vi.stubGlobal('window', { scrollY: 0, scrollTo })
  vi.stubGlobal('document', { querySelector: () => null })
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    frames.set(++nextFrame, callback)
    return nextFrame
  })
  vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id))
})

afterEach(() => vi.unstubAllGlobals())

function tick() {
  const pending = [...frames.values()]
  frames.clear()
  for (const callback of pending) callback(0)
}

function viewer() {
  const instance = Object.create(VirtualizedFile.prototype) as VirtualizedFile
  const getLinePosition = vi.fn().mockReturnValue({ top: 35980, height: 20 })
  instance.getLinePosition = getLinePosition
  const node = {
    isConnected: true,
    getBoundingClientRect: vi.fn().mockReturnValue({ top: 100, height: 40000 }),
  }
  const { options } = useLineSelection('runtime.disasm')
  const render = (phase: 'mount' | 'update' | 'unmount') =>
    options.onPostRender(node as unknown as HTMLElement, instance, phase)
  return { node, getLinePosition, render }
}

test('retains a deep link until the renderer supplies a line position', () => {
  const { getLinePosition, render } = viewer()
  getLinePosition.mockReturnValueOnce(undefined)
  render('mount')
  tick()
  tick()
  expect(scrollTo).not.toHaveBeenCalled()
  expect(frames.size).toBe(0)
  render('update')
  tick()
  tick()
  expect(scrollTo).toHaveBeenCalledWith({ top: 36072, behavior: 'instant' })
  render('update')
  tick()
  expect(scrollTo).toHaveBeenCalledTimes(1)
})

test('waits for virtual content height before consuming the scroll request', () => {
  const { node, render } = viewer()
  node.getBoundingClientRect.mockReturnValue({ top: 100, height: 2000 })
  render('mount')
  tick()
  tick()
  expect(scrollTo).not.toHaveBeenCalled()
  node.getBoundingClientRect.mockReturnValue({ top: 100, height: 40000 })
  tick()
  expect(scrollTo).toHaveBeenCalledTimes(1)
})

test('unmount cancels a pending layout retry', () => {
  const { node, render } = viewer()
  node.getBoundingClientRect.mockReturnValue({ top: 100, height: 2000 })
  render('mount')
  tick()
  tick()
  expect(frames.size).toBe(1)
  render('unmount')
  expect(frames.size).toBe(0)
  tick()
  expect(scrollTo).not.toHaveBeenCalled()
})

test('a disconnected frame does not prevent a later mount from scrolling', () => {
  const { node, render } = viewer()
  render('mount')
  node.isConnected = false
  tick()
  node.isConnected = true
  render('mount')
  tick()
  tick()
  expect(scrollTo).toHaveBeenCalledTimes(1)
})
