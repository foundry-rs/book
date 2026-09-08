import { waitUntil } from '@vercel/functions'
import { responseCache } from '../cache'
import { ImportPendingError, RunNotFoundError } from './pending'

const dispatched = responseCache<boolean>(30_000, 64 * 1024)
const inFlight = new Set<string>()
const missing = responseCache<boolean>(120_000, 64 * 1024)
let active = 0

export async function dispatchImport(sha: string) {
  if (!/^[a-f0-9]{40}$/.test(sha)) throw new Error('Invalid commit')
  if (await missing.peek(sha)) throw new RunNotFoundError()
  const hostname = process.env.VERCEL_URL
  const secret = process.env.CRON_SECRET
  // Never send credentials to a host supplied by an incoming request.
  if (!hostname || !/^[a-zA-Z0-9.-]+\.vercel\.app$/.test(hostname) || !secret)
    throw new Error('Worker dispatch is not configured')
  if (inFlight.has(sha)) throw new ImportPendingError(3)
  await dispatched(sha, async () => {
    if (active >= 2) throw new ImportPendingError(5)
    active++
    inFlight.add(sha)
    const task = fetch(`https://${hostname}/api/worker/import?commit=${sha}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${secret}`,
        ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET
          ? { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET }
          : {}),
      },
      signal: AbortSignal.timeout(285_000),
    })
      .then(async (response) => {
        await response.arrayBuffer()
        if (response.status === 404) await missing(sha, async () => true)
        if (!response.ok)
          console.warn('perf_import_dispatch_failed', { status: response.status, commit: sha })
      })
      .catch((error: unknown) =>
        console.warn('perf_import_dispatch_failed', {
          commit: sha,
          error: error instanceof Error ? error.name : 'unknown',
        }),
      )
      .finally(() => {
        active--
        inFlight.delete(sha)
      })
    waitUntil(task)
    return true
  })
  throw new ImportPendingError(3)
}
