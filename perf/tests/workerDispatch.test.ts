import { afterEach, expect, it, vi } from 'vite-plus/test'

const lifecycle = vi.hoisted(() => ({ waitUntil: vi.fn() }))
vi.mock('@vercel/functions', () => lifecycle)
afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.clearAllMocks()
})

it('dispatches to the trusted deployment and responds pending without waiting for import', async () => {
  vi.resetModules()
  vi.stubEnv('VERCEL_URL', 'perf-test.vercel.app')
  vi.stubEnv('CRON_SECRET', 'test-secret')
  let finish!: (response: Response) => void
  const fetch = vi.fn(
    () =>
      new Promise<Response>((resolve) => {
        finish = resolve
      }),
  )
  vi.stubGlobal('fetch', fetch)
  const { dispatchImport } = await import('../src/server/workerDispatch')
  const sha = 'a'.repeat(40)
  await expect(dispatchImport(sha)).rejects.toMatchObject({ retryAfter: 3 })
  const now = vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 31_000)
  await expect(dispatchImport(sha)).rejects.toMatchObject({ retryAfter: 3 })
  now.mockRestore()
  expect(fetch).toHaveBeenCalledExactlyOnceWith(
    `https://perf-test.vercel.app/api/worker/import?commit=${sha}`,
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({ authorization: 'Bearer test-secret' }),
    }),
  )
  expect(lifecycle.waitUntil).toHaveBeenCalledOnce()
  finish(Response.json({ imported: true }))
  await lifecycle.waitUntil.mock.calls[0][0]
})

it('rejects invalid dispatch configuration without leaking credentials', async () => {
  vi.resetModules()
  vi.stubEnv('VERCEL_URL', 'attacker.example/path')
  vi.stubEnv('CRON_SECRET', 'test-secret')
  const fetch = vi.fn()
  vi.stubGlobal('fetch', fetch)
  const { dispatchImport } = await import('../src/server/workerDispatch')
  await expect(dispatchImport('a'.repeat(40))).rejects.toThrow('not configured')
  expect(fetch).not.toHaveBeenCalled()
})
