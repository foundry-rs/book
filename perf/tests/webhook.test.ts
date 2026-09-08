import { createHmac } from 'node:crypto'
import { afterEach, expect, it, vi } from 'vite-plus/test'
import { createWebhook } from '../src/server/webhook'

const source = {
  id: 123,
  run_attempt: 1,
  conclusion: 'success',
  head_sha: 'a'.repeat(40),
  created_at: '2026-09-08T00:00:00Z',
  display_title: 'Test run',
  event: 'pull_request',
  head_branch: 'test',
  name: 'Benchmark',
}
const payload = {
  action: 'completed',
  repository: { full_name: 'paradigmxyz/solar' },
  workflow: { path: '.github/workflows/bench.yml' },
  workflow_run: source,
}
const request = (value: unknown, signature?: string) => {
  const body = JSON.stringify(value)
  return new Request('https://test/', {
    method: 'POST',
    body,
    headers: {
      'x-github-event': 'workflow_run',
      'x-hub-signature-256':
        signature ?? `sha256=${createHmac('sha256', 'test-secret').update(body).digest('hex')}`,
    },
  })
}
afterEach(() => vi.unstubAllEnvs())

it('persists a signed completed workflow before acknowledging and retains background work', async () => {
  vi.stubEnv('GH_WEBHOOK_SECRET', 'test-secret')
  const task = vi.fn(async () => true)
  const enqueue = vi.fn(async () => task)
  const waitUntil = vi.fn()
  const response = await createWebhook(enqueue, waitUntil).fetch(request(payload))
  expect(response.status).toBe(202)
  expect(enqueue).toHaveBeenCalledExactlyOnceWith(source)
  expect(task).toHaveBeenCalledOnce()
  expect(waitUntil).toHaveBeenCalledOnce()
  await waitUntil.mock.calls[0][0]
})

it('rejects bad signatures before doing any import work', async () => {
  vi.stubEnv('GH_WEBHOOK_SECRET', 'test-secret')
  const enqueue = vi.fn()
  const app = createWebhook(enqueue, vi.fn())
  for (const signature of ['', 'sha256=bad', `sha256=${'0'.repeat(64)}`])
    expect((await app.fetch(request(payload, signature))).status).toBe(401)
  expect(enqueue).not.toHaveBeenCalled()
})

it('ignores unrelated repositories, workflows and unsuccessful runs', async () => {
  vi.stubEnv('GH_WEBHOOK_SECRET', 'test-secret')
  const enqueue = vi.fn()
  const app = createWebhook(enqueue, vi.fn())
  for (const patch of [
    { repository: { full_name: 'other/repo' } },
    { workflow: { path: '.github/workflows/test.yml' } },
    { action: 'requested' },
    { workflow_run: { ...source, conclusion: 'failure' } },
  ]) {
    expect((await app.fetch(request({ ...payload, ...patch }))).status).toBe(200)
  }
  expect(enqueue).not.toHaveBeenCalled()
})

it('does not start another background task for an already-known run', async () => {
  vi.stubEnv('GH_WEBHOOK_SECRET', 'test-secret')
  const waitUntil = vi.fn()
  const response = await createWebhook(async () => null, waitUntil).fetch(request(payload))
  expect(await response.json()).toMatchObject({ status: 'known' })
  expect(waitUntil).not.toHaveBeenCalled()
})
