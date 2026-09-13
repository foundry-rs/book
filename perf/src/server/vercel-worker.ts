import { Hono } from 'hono'
import { ingestCommit, ingestRecent } from './ingest'
import { nodeHandler } from './http'
import { ImportPendingError, RunNotFoundError } from './pending'
import { backfillSources } from './backfillSources'
import { clickHouseConfig } from './clickhouse'

const app = new Hono()
app.use('*', async (context, next) => {
  context.header('cache-control', 'no-store')
  if (
    !process.env.CRON_SECRET ||
    context.req.header('authorization') !== `Bearer ${process.env.CRON_SECRET}`
  )
    return context.json({ error: 'Unauthorized' }, 401)
  if (process.env.PERF_DEMO_DATA === '1') return context.json({ skipped: 'demo' })
  await next()
})
app.get('/api/worker/tick', async (context) => context.json(await ingestRecent()))
app.post('/api/worker/backfill-sources', async (context) => {
  const config = clickHouseConfig(process.env, 'write')
  if (!config) throw new Error('ClickHouse write credentials are not configured')
  return context.json(await backfillSources(config))
})
app.post('/api/worker/import', async (context) => {
  const sha = context.req.query('commit') ?? ''
  if (!/^[a-f0-9]{40}$/.test(sha)) return context.json({ error: 'Invalid commit' }, 400)
  return context.json({ imported: await ingestCommit(sha) })
})
app.onError((error, context) => {
  if (error instanceof RunNotFoundError) return context.json({ error: error.message }, 404)
  if (error instanceof ImportPendingError) {
    context.header('retry-after', String(error.retryAfter))
    return context.json({ status: error.state }, 202)
  }
  console.error('perf_worker_failed', error)
  return context.json({ error: 'Import unavailable; retry later' }, 503)
})

export default nodeHandler(app)
