import { createHmac, timingSafeEqual } from 'node:crypto'
import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'
import type { GitHubRun } from './github'

export function createWebhook(
  enqueue: (source: GitHubRun) => Promise<(() => Promise<unknown>) | null>,
  waitUntil: (task: Promise<unknown>) => void,
) {
  const app = new Hono()
  app.use('*', bodyLimit({ maxSize: 1024 * 1024 }))
  app.post('/', async (context) => {
    context.header('cache-control', 'no-store')
    const secret = process.env.GH_WEBHOOK_SECRET
    if (!secret) return context.json({ error: 'Webhook is not configured' }, 503)
    const signature = context.req.header('x-hub-signature-256') ?? ''
    const body = await context.req.text()
    const expected = createHmac('sha256', secret).update(body).digest()
    if (
      !/^sha256=[a-f0-9]{64}$/.test(signature) ||
      !timingSafeEqual(expected, Buffer.from(signature.slice(7), 'hex'))
    )
      return context.json({ error: 'Invalid signature' }, 401)
    let payload
    try {
      payload = JSON.parse(body)
    } catch {
      return context.json({ error: 'Invalid JSON' }, 400)
    }
    if (!payload || typeof payload !== 'object')
      return context.json({ error: 'Invalid payload' }, 400)
    if (context.req.header('x-github-event') === 'ping') return context.json({ pong: true })
    const workflow = process.env.BENCHMARK_WORKFLOW || 'bench.yml'
    const run = payload.workflow_run
    if (
      context.req.header('x-github-event') !== 'workflow_run' ||
      payload.action !== 'completed' ||
      payload.repository?.full_name !== (process.env.GITHUB_REPOSITORY || 'paradigmxyz/solar') ||
      (payload.workflow?.path !== `.github/workflows/${workflow}` &&
        String(payload.workflow?.id) !== workflow) ||
      run?.conclusion !== 'success'
    )
      return context.json({ skipped: true })
    if (
      !Number.isSafeInteger(run.id) ||
      run.id <= 0 ||
      !/^[a-f0-9]{40}$/.test(run.head_sha) ||
      !Number.isSafeInteger(run.run_attempt) ||
      run.run_attempt < 1 ||
      !['created_at', 'display_title', 'event', 'name'].every(
        (key) => typeof run[key] === 'string',
      ) ||
      !Number.isFinite(Date.parse(run.created_at)) ||
      !(run.head_branch === null || typeof run.head_branch === 'string')
    )
      return context.json({ error: 'Invalid workflow run' }, 400)
    if (process.env.PERF_DEMO_DATA === '1') return context.json({ skipped: 'demo' })
    const task = await enqueue(run)
    if (task)
      waitUntil(
        task().catch((error: unknown) => {
          console.error('perf_webhook_import_failed', {
            commit: run.head_sha,
            error: error instanceof Error ? error.name : 'unknown',
          })
        }),
      )
    return context.json({ status: task ? 'queued' : 'known', commit: run.head_sha }, 202)
  })
  return app
}
