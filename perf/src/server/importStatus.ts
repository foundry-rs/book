import { select, type ClickHouseConfig } from './clickhouse'
import { ImportPendingError } from './pending'

// Only consulted after a snapshot miss. Do not expose internal last_error text.
export async function pendingImport(config: ClickHouseConfig, commit: string) {
  const [job] = await select(
    config,
    `SELECT state,
    greatest(0, dateDiff('second', now64(3), next_attempt_at)) AS retry_after
    FROM ingestion_jobs FINAL WHERE commit = {commit:String}
    ORDER BY updated_at DESC LIMIT 1`,
    { commit },
  )
  if (!job || Number(job.retry_after) <= 0) return null
  if (job.state === 'retry') return new ImportPendingError(Number(job.retry_after), 'retry', commit)
  if (job.state === 'importing' || job.state === 'queued')
    return new ImportPendingError(1, job.state, commit)
  return null
}
