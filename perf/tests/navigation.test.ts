import { afterEach, expect, it, vi } from 'vite-plus/test'
import { comparisonHref, followLink, navigate, replaceUrl } from '../src/navigation'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

it('returns from artifacts to the same comparison, benchmark, and metric', () => {
  expect(
    comparisonHref(
      '?base=a&head=b&benchmark=factorial&metric=total_gas&view=files&file=mir.mir&against=solc&compiler=solar',
    ),
  ).toBe('?base=a&head=b&benchmark=factorial&metric=total_gas')
})

it('notifies URL replacements without triggering page navigation', () => {
  const browser = Object.assign(new EventTarget(), {
    history: { replaceState: vi.fn() },
  })
  vi.stubGlobal('window', browser)
  const replace = vi.fn()
  const navigate = vi.fn()
  browser.addEventListener('routechange', replace)
  browser.addEventListener('popstate', navigate)
  replaceUrl('/perf/solar/?benchmark=factorial')
  expect(browser.history.replaceState).toHaveBeenCalledWith(
    null,
    '',
    '/perf/solar/?benchmark=factorial',
  )
  expect(replace).toHaveBeenCalledOnce()
  expect(navigate).not.toHaveBeenCalled()
})

it('pushes browser history and notifies the app without reloading', () => {
  const browser = Object.assign(new EventTarget(), {
    history: { pushState: vi.fn() },
    scrollTo: vi.fn(),
  })
  vi.stubGlobal('window', browser)
  const update = vi.fn()
  browser.addEventListener('popstate', update)
  navigate('/perf/solar/?base=a&head=b')
  expect(browser.history.pushState).toHaveBeenCalledWith(null, '', '/perf/solar/?base=a&head=b')
  expect(update).toHaveBeenCalledOnce()
})

it('only intercepts ordinary same-app links', () => {
  const browser = Object.assign(new EventTarget(), {
    history: { pushState: vi.fn() },
    scrollTo: vi.fn(),
    location: { origin: 'https://web.test' },
  })
  vi.stubGlobal('window', browser)
  vi.stubEnv('BASE_URL', '/perf/solar/')
  class Link {
    href = 'https://web.test/perf/solar/?base=a&head=b'
    target = ''
    download = false
    closest() {
      return this
    }
    hasAttribute() {
      return this.download
    }
  }
  vi.stubGlobal('Element', Link)
  const link = new Link()
  const preventDefault = vi.fn()
  const event = { target: link, button: 0, preventDefault }
  for (const modification of [
    { ctrlKey: true },
    { metaKey: true },
    { shiftKey: true },
    { altKey: true },
    { button: 1 },
    { defaultPrevented: true },
  ])
    followLink({ ...event, ...modification } as unknown as MouseEvent)
  for (const href of [
    'https://github.com/paradigmxyz/solar',
    'https://web.test/',
    'https://web.test/perf/solar/#benchmarks',
  ]) {
    link.href = href
    followLink(event as unknown as MouseEvent)
  }
  link.href = 'https://web.test/perf/solar/?base=a&head=b'
  link.target = '_blank'
  followLink(event as unknown as MouseEvent)
  link.target = ''
  link.download = true
  followLink(event as unknown as MouseEvent)
  expect(preventDefault).not.toHaveBeenCalled()
  link.download = false
  followLink(event as unknown as MouseEvent)
  expect(preventDefault).toHaveBeenCalledOnce()
  expect(browser.history.pushState).toHaveBeenCalledOnce()
})
