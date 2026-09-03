import { Hono } from 'hono'

import { clickHouseConfig, select, type ClickHouseConfig } from './clickhouse'
import { demoResponse } from './demo'
import { gitHubConfig } from './github'
import { ImportPendingError, ingestCommit, ingestRecent } from './ingest'

interface ApiOptions {
  clickHouse?: ClickHouseConfig | null
  cronSecret?: string | undefined
  demoFallback?: boolean
  ingestRecent?: () => Promise<unknown>
  importRun?: (sha: string) => Promise<unknown>
}

interface StoredRun {
  workflow_run_id: unknown
  [key: string]: unknown
}

function metrics(row: Record<string, unknown>) {
  return {
    compileTime: row.compile_time,
    creationSize: row.bytecode_size,
    runtimeSize: row.runtime_size,
    deployGas: row.deploy_gas,
    runtimeGas: row.total_gas,
    peakMemory: row.peak_rss_bytes,
  }
}

async function indexFromClickHouse(config: ClickHouseConfig) {
  const runs = await select(
    config,
    `SELECT
       r.commit,
       r.workflow_run_id,
       toString(r.started_at) AS timestamp,
       r.branch,
       r.pr,
       r.title
     FROM runs AS r FINAL
     WHERE r.source_schema > 0
     ORDER BY r.started_at DESC
     LIMIT 2_000`,
  )
  const ids = runs.map((run) => Number(run.workflow_run_id))
  const results = ids.length
    ? await select(
        config,
        `SELECT
           workflow_run_id,
           countDistinct(test_id) AS benchmarkCount,
           sumIf(compile_time_seconds, compiler = 'solar' AND status = 'ok') AS compile_time,
           sumIf(bytecode_size, compiler = 'solar' AND status = 'ok') AS bytecode_size,
           sumIf(runtime_size, compiler = 'solar' AND status = 'ok') AS runtime_size,
           sumIf(deploy_gas, compiler = 'solar' AND status = 'ok') AS deploy_gas,
           sumIf(total_gas, compiler = 'solar' AND status = 'ok') AS total_gas,
           maxIf(peak_rss_bytes, compiler = 'solar' AND status = 'ok') AS peak_rss_bytes
         FROM benchmark_results FINAL
         WHERE workflow_run_id IN (${ids.join(',')})
         GROUP BY workflow_run_id`,
      )
    : []
  const resultByRun = new Map(results.map((result) => [Number(result.workflow_run_id), result]))
  return {
    schemaVersion: 1,
    updatedAt: new Date().toISOString(),
    runs: runs.map((run) => {
      const result = resultByRun.get(Number(run.workflow_run_id)) ?? {}
      return {
        commit: run.commit,
        timestamp: run.timestamp,
        branch: run.branch,
        pr: run.pr,
        title: run.title,
        benchmarkCount: result.benchmarkCount ?? 0,
        metrics: metrics(result),
      }
    }),
  }
}

async function runFromClickHouse(config: ClickHouseConfig, sha: string): Promise<StoredRun | null> {
  const [run] = await select(
    config,
    `SELECT workflow_run_id, commit, branch, pr, title, toString(started_at) AS timestamp
     FROM runs FINAL WHERE commit = '${sha}' ORDER BY imported_at DESC LIMIT 1`,
  )
  if (!run) return null

  const runId = Number(run.workflow_run_id)
  const rows = await select(
    config,
    `SELECT test_id, description, suite, compiler, status, compile_time_seconds, bytecode_size,
       runtime_size, deploy_gas, total_gas, peak_rss_bytes
     FROM benchmark_results FINAL WHERE workflow_run_id = ${runId}
     ORDER BY test_id, compiler`,
  )
  const results = new Map<string, Record<string, unknown>>()
  for (const row of rows) {
    const testId = String(row.test_id)
    const result = results.get(testId) ?? {
      test_id: testId,
      description: row.description,
      suite: row.suite,
      compilers: {},
    }
    ;(result.compilers as Record<string, unknown>)[String(row.compiler)] = {
      status: row.status,
      compile_time_seconds: row.compile_time_seconds,
      bytecode_size: row.bytecode_size,
      runtime_size: row.runtime_size,
      deploy_gas: row.deploy_gas,
      total_gas: row.total_gas,
      peak_rss_bytes: row.peak_rss_bytes,
    }
    results.set(testId, result)
  }

  const artifactRows = await select(
    config,
    `SELECT test_id, path, storage_path, label, language, max(ifNull(bytes, length(content))) AS bytes,
       groupArray(compiler) AS compilers
     FROM artifact_files FINAL WHERE workflow_run_id = ${runId}
     GROUP BY test_id, path, storage_path, label, language
     ORDER BY test_id, storage_path`,
  )
  const artifacts: Record<string, unknown[]> = {}
  for (const row of artifactRows) {
    const testId = String(row.test_id)
    ;(artifacts[testId] ??= []).push({
      path: row.path,
      storagePath: row.storage_path,
      label: row.label,
      language: row.language,
      bytes: row.bytes,
      compilers: row.compilers,
    })
  }
  return {
    ...run,
    schemaVersion: 1,
    results: [...results.values()],
    artifacts,
    workflow_run_id: run.workflow_run_id,
  }
}

async function loadRun(
  config: ClickHouseConfig,
  sha: string,
  importRun: (sha: string) => Promise<unknown>,
) {
  const current = await runFromClickHouse(config, sha)
  if (current) return current
  await importRun(sha)
  return runFromClickHouse(config, sha)
}

async function runIdFromClickHouse(config: ClickHouseConfig, sha: string) {
  const [run] = await select(
    config,
    `SELECT workflow_run_id FROM runs FINAL
     WHERE commit = '${sha}' ORDER BY imported_at DESC LIMIT 1`,
  )
  return run ? Number(run.workflow_run_id) : null
}

async function loadRunId(
  config: ClickHouseConfig,
  sha: string,
  importRun: (sha: string) => Promise<unknown>,
) {
  const current = await runIdFromClickHouse(config, sha)
  if (current !== null) return current
  await importRun(sha)
  return runIdFromClickHouse(config, sha)
}

export function createApi(options: ApiOptions = {}) {
  const config = options.clickHouse === undefined ? clickHouseConfig() : options.clickHouse
  // Until the GitHub App is configured, let an empty deployment remain usable with
  // deterministic sample data. A configured App automatically restores on-demand
  // imports and live data without a code change.
  const useDemoFallback =
    options.demoFallback === undefined
      ? process.env.VERCEL === '1' && !gitHubConfig()
      : options.demoFallback
  const cronSecret = options.cronSecret === undefined ? process.env.CRON_SECRET : options.cronSecret
  const scheduledImport = options.ingestRecent || (() => ingestRecent())
  const importRun = options.importRun || ((sha: string) => ingestCommit(sha))
  const imports = new Map<string, Promise<unknown>>()
  const loadImport = (sha: string) => {
    const existing = imports.get(sha)
    if (existing) return existing
    const pending = importRun(sha).finally(() => imports.delete(sha))
    imports.set(sha, pending)
    return pending
  }
  const app = new Hono()

  app.get('/api/health', (context) =>
    context.json(
      { source: config ? 'clickhouse' : useDemoFallback ? 'demo' : 'unconfigured' },
      config || useDemoFallback ? 200 : 503,
    ),
  )

  app.get('/api/worker/tick', async (context) => {
    if (!cronSecret || context.req.header('authorization') !== `Bearer ${cronSecret}`)
      return context.json({ error: 'Unauthorized' }, 401)

    try {
      return context.json(await scheduledImport())
    } catch (error) {
      console.error('Failed to import benchmark runs', error)
      return context.json({ error: 'Benchmark import failed' }, 503)
    }
  })

  app.get('/api/data/*', async (context) => {
    const path = context.req.path.slice('/api/data/'.length)
    const demo = useDemoFallback ? demoResponse(context.req.path) : null
    if (!config) {
      if (demo) return demo
      return context.json({ error: 'Benchmark data is not configured' }, 503)
    }

    try {
      if (path === 'index.json') {
        context.header('cache-control', 'public, max-age=60, stale-while-revalidate=120')
        const index = await indexFromClickHouse(config)
        if (!index.runs.length && demo) return demo
        return context.json(index)
      }

      const runMatch = /^runs\/([0-9a-f]{40})\/run\.json$/.exec(path)
      if (runMatch) {
        if (demo) {
          const current = await runFromClickHouse(config, runMatch[1])
          if (!current) return demo
          context.header('cache-control', 'public, max-age=300, stale-while-revalidate=3_600')
          return context.json(current)
        }
        const run = await loadRun(config, runMatch[1], loadImport)
        if (!run) return context.json({ error: 'Run not found' }, 404)
        context.header('cache-control', 'public, max-age=300, stale-while-revalidate=3_600')
        return context.json(run)
      }

      const artifactMatch = /^runs\/([0-9a-f]{40})\/([\w.-]+)\/(solar|solc)\/(\d+\.json)$/.exec(
        path,
      )
      if (!artifactMatch) return context.json({ error: 'Unknown data file' }, 404)

      const [, sha, benchmark, compiler, storagePath] = artifactMatch
      const runId = useDemoFallback
        ? await runIdFromClickHouse(config, sha)
        : await loadRunId(config, sha, loadImport)
      if (runId === null) return context.json({ error: 'Run not found' }, 404)
      const [artifact] = await select(
        config,
        `SELECT content FROM artifact_files FINAL
         WHERE workflow_run_id = ${runId}
           AND test_id = '${benchmark}' AND compiler = '${compiler}' AND storage_path = '${storagePath}'
         ORDER BY imported_at DESC LIMIT 1`,
      )
      if (!artifact) return context.json({ error: 'Artifact not found' }, 404)
      context.header('cache-control', 'public, max-age=3_600, stale-while-revalidate=86_400')
      return context.json(artifact.content)
    } catch (error) {
      if (error instanceof ImportPendingError) {
        context.header('retry-after', String(error.retryAfter))
        return context.json({ error: error.message }, 503)
      }
      console.error('Failed to read benchmark data', error)
      return context.json({ error: 'Benchmark data is unavailable' }, 503)
    }
  })

  app.notFound((context) => context.json({ error: 'Not found' }, 404))
  return app
}

export default createApi()
