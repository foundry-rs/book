import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, expect, it, vi } from 'vite-plus/test'
import { CommitInput } from '../src/App'
import type { RunSummary } from '../src/types'

const run: RunSummary = {
  commit: 'abcdef0123456789abcdef0123456789abcdef01',
  timestamp: '2026-09-07T00:00:00Z',
  branch: 'main',
  pr: 1400,
  title: null,
  benchmarkCount: 1,
}

it.each(['base', 'head'])('renders an empty %s input without suggestions', (label) => {
  const html = renderToStaticMarkup(
    createElement(CommitInput, { label, value: '', onChange: () => {} }),
  )
  expect(html).toContain('value=""')
  expect(html).toContain('autoComplete="off"')
  expect(html).not.toMatch(/datalist|list=|disabled/)
})

afterEach(() => vi.unstubAllGlobals())

it('accepts unpublished full SHAs without any lookup', async () => {
  const fetch = vi.fn()
  vi.stubGlobal('fetch', fetch)
  const { resolveCommit } = await import('../src/data')
  await expect(resolveCommit('B'.repeat(40))).resolves.toBe('b'.repeat(40))
  expect(fetch).not.toHaveBeenCalled()
})

it.each(['main', 'Release/v0.1.0', '#1400', '1400'])(
  'resolves %s on the backend at submission time',
  async (ref) => {
    const fetch = vi.fn(async () => Response.json({ commit: run.commit }))
    vi.stubGlobal('fetch', fetch)
    const { resolveCommit } = await import('../src/data')
    await expect(resolveCommit(ref)).resolves.toBe(run.commit)
    expect(fetch).toHaveBeenCalledWith(`/api/resolve?${new URLSearchParams({ ref })}`, {
      cache: 'no-store',
    })
  },
)

it('resolves a unique published prefix and rejects ambiguity', async () => {
  vi.resetModules()
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) =>
      url.includes('abcdef012')
        ? Response.json({ commit: run.commit })
        : Response.json({ error: 'Ambiguous commit prefix' }, { status: 422 }),
    ),
  )
  const { resolveCommit } = await import('../src/data')
  await expect(resolveCommit('abcdef012')).resolves.toBe(run.commit)
  await expect(resolveCommit('abcdef0')).rejects.toThrow('Ambiguous')
  await expect(resolveCommit('')).rejects.toThrow('Enter a commit')
})
