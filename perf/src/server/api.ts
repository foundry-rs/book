import { Hono } from 'hono'
import { compilerLabels } from '../compilerMetadata'

import { clickHouseConfig, select, type ClickHouseConfig } from './clickhouse'
import { demoResponse } from './demo'
import { artifactMetadata } from './artifacts'
import { ImportPendingError, ingestCommit, ingestRecent } from './ingest'
import { GitHubClient, GitHubRequestError, gitHubConfig } from './github'

interface ApiOptions {
  clickHouse?: ClickHouseConfig | null
  cronSecret?: string | undefined
  demoFallback?: boolean
  ingestRecent?: () => Promise<unknown>
  importRun?: (sha: string) => Promise<unknown>
  resolveRef?: (ref: string) => Promise<string>
}

interface StoredRun {
  workflow_run_id: unknown
  [key: string]: unknown
}

async function indexFromClickHouse(config: ClickHouseConfig) {
  const runs = await select(
    config,
    `SELECT
       r.commit,
       r.workflow_run_id,
       formatDateTime(r.started_at, '%Y-%m-%dT%H:%i:%SZ', 'UTC') AS timestamp,
       r.branch,
       r.pr,
       r.title
     FROM (
       SELECT * FROM runs FINAL ORDER BY imported_at DESC, workflow_run_id DESC LIMIT 1 BY commit
     ) AS r
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
           countDistinct(test_id) AS benchmarkCount
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
      }
    }),
  }
}

async function runFromClickHouse(
  config: ClickHouseConfig,
  sha: string,
  includeArtifacts: boolean,
): Promise<StoredRun | null> {
  const [run] = await select(
    config,
    `SELECT workflow_run_id, commit, branch, pr, title, raw_results,
       formatDateTime(started_at, '%Y-%m-%dT%H:%i:%SZ', 'UTC') AS timestamp
     FROM runs FINAL WHERE commit = '${sha}' ORDER BY imported_at DESC LIMIT 1`,
  )
  if (!run) return null
  const { raw_results, ...runMetadata } = run
  const labels = compilerLabels(raw_results)

  const runId = Number(run.workflow_run_id)
  const [rows, artifacts] = await Promise.all([
    select(
      config,
      `SELECT test_id, description, suite, compiler, status, compile_time_seconds, bytecode_size,
       runtime_size, deploy_gas, total_gas, peak_rss_bytes
     FROM benchmark_results FINAL WHERE workflow_run_id = ${runId}
     ORDER BY test_id, compiler`,
    ),
    includeArtifacts ? artifactsFromClickHouse(config, sha) : Promise.resolve({}),
  ])
  const results = new Map<string, Record<string, unknown>>()
  for (const row of rows) {
    const testId = String(row.test_id)
    const result = results.get(testId) ?? {
      test_id: testId,
      description: row.description,
      suite: row.suite,
      compilers: Object.create(null),
    }
    ;(result.compilers as Record<string, unknown>)[String(row.compiler)] = {
      status: row.status,
      label: labels.get(testId)?.[String(row.compiler)],
      compile_time_seconds: row.compile_time_seconds,
      bytecode_size: row.bytecode_size,
      runtime_size: row.runtime_size,
      deploy_gas: row.deploy_gas,
      total_gas: row.total_gas,
      peak_rss_bytes: row.peak_rss_bytes,
    }
    results.set(testId, result)
  }

  return {
    ...runMetadata,
    schemaVersion: 1,
    results: [...results.values()],
    artifacts,
    workflow_run_id: run.workflow_run_id,
  }
}

async function artifactsFromClickHouse(config: ClickHouseConfig, sha: string) {
  const artifactRows = await select(
    config,
    `SELECT test_id, path, max(ifNull(bytes, length(content))) AS bytes,
       groupUniqArray(compiler) AS compilers
     FROM artifact_files FINAL WHERE workflow_run_id IN (
       SELECT workflow_run_id FROM runs FINAL WHERE commit = '${sha}' ORDER BY imported_at DESC LIMIT 1
     )
     GROUP BY test_id, path
     ORDER BY test_id, path`,
  )
  const artifacts: Record<string, unknown[]> = Object.create(null)
  for (const row of artifactRows) {
    const testId = String(row.test_id)
    const metadata = artifactMetadata(String(row.path))
    ;(artifacts[testId] ??= []).push({
      path: row.path,
      ...metadata,
      bytes: row.bytes,
      compilers: row.compilers,
    })
  }
  return artifacts
}

async function historyFromClickHouse(config: ClickHouseConfig) {
  // Read metrics only, in two bounded queries; never download artifact manifests for charts.
  const runs = await select(
    config,
    `SELECT commit, workflow_run_id,
    formatDateTime(started_at, '%Y-%m-%dT%H:%i:%SZ', 'UTC') AS timestamp
    FROM (SELECT * FROM runs FINAL ORDER BY imported_at DESC, workflow_run_id DESC LIMIT 1 BY commit)
    WHERE source_schema > 0 AND branch = 'main'
    ORDER BY started_at DESC, commit DESC LIMIT 60`,
  )
  const ids = runs.map((run) => Number(run.workflow_run_id))
  const rows = ids.length
    ? await select(
        config,
        `SELECT workflow_run_id, test_id, suite,
    status, compile_time_seconds, bytecode_size, runtime_size, deploy_gas, total_gas, peak_rss_bytes
    FROM benchmark_results FINAL
    WHERE workflow_run_id IN (${ids.join(',')}) AND compiler = 'solar'
    ORDER BY test_id`,
      )
    : []
  return {
    runs: runs.map((run) => ({
      commit: run.commit,
      timestamp: run.timestamp,
      results: rows
        .filter((row) => Number(row.workflow_run_id) === Number(run.workflow_run_id))
        .map((row) => ({
          test_id: row.test_id,
          suite: row.suite,
          compilers: {
            solar: {
              status: row.status,
              compile_time_seconds: row.compile_time_seconds,
              bytecode_size: row.bytecode_size,
              runtime_size: row.runtime_size,
              deploy_gas: row.deploy_gas,
              total_gas: row.total_gas,
              peak_rss_bytes: row.peak_rss_bytes,
            },
          },
        })),
    })),
  }
}

async function loadRun(
  config: ClickHouseConfig,
  sha: string,
  importRun: (sha: string) => Promise<unknown>,
  includeArtifacts: boolean,
) {
  const current = await runFromClickHouse(config, sha, includeArtifacts)
  if (current) return current
  await importRun(sha)
  return runFromClickHouse(config, sha, includeArtifacts)
}

async function runIdFromClickHouse(config: ClickHouseConfig, sha: string) {
  const [run] = await select(
    config,
    `SELECT workflow_run_id FROM runs FINAL
     WHERE commit = '${sha}' ORDER BY imported_at DESC LIMIT 1`,
  )
  return run ? Number(run.workflow_run_id) : null
}

export function createApi(options: ApiOptions = {}) {
  const useDemoFallback = options.demoFallback ?? process.env.PERF_DEMO_DATA === '1'
  const config = useDemoFallback
    ? null
    : options.clickHouse === undefined
      ? clickHouseConfig()
      : options.clickHouse
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
  let github: GitHubClient | undefined

  app.get('/api/resolve', async (context) => {
    context.header('cache-control', 'no-store')
    const ref = context.req.query('ref')?.trim() || ''
    if (
      !ref ||
      ref.length > 256 ||
      Array.from(ref).some((char) => char.charCodeAt(0) <= 32 || char.charCodeAt(0) === 127)
    )
      return context.json({ error: 'Invalid ref' }, 400)
    if (/^[0-9a-f]{40}$/i.test(ref)) return context.json({ commit: ref.toLowerCase() })
    try {
      if (useDemoFallback) {
        const response = demoResponse('/api/data/index.json')!
        const { runs } = await response.json()
        const run = runs.find(
          (run: { branch: string; pr: number; commit: string }) =>
            run.branch === ref ||
            String(run.pr) === ref.replace(/^#/, '') ||
            run.commit.startsWith(ref),
        )
        return run
          ? context.json({ commit: run.commit })
          : context.json({ error: 'Unknown demo ref' }, 404)
      }
      if (!options.resolveRef && !github) {
        const config = gitHubConfig()
        if (!config) return context.json({ error: 'GitHub is not configured' }, 503)
        github = new GitHubClient(config)
      }
      const commit = await (options.resolveRef ? options.resolveRef(ref) : github!.resolveRef(ref))
      if (!/^[0-9a-f]{40}$/.test(commit)) throw new Error('Invalid resolved commit')
      return context.json({ commit })
    } catch (error) {
      if (error instanceof GitHubRequestError && error.status === 404)
        return context.json({ error: 'Ref not found' }, 404)
      console.error('Failed to resolve benchmark ref', error)
      return context.json({ error: 'Could not resolve ref' }, 503)
    }
  })

  app.get('/api/health', async (context) => {
    context.header('cache-control', 'no-store')
    if (!config)
      return context.json(
        { source: useDemoFallback ? 'demo' : 'unconfigured' },
        useDemoFallback ? 200 : 503,
      )
    try {
      // Verify the public schema and read access, not just environment presence.
      for (const table of ['runs', 'benchmark_results', 'artifact_files']) {
        await select(config, `SELECT 1 FROM ${table} LIMIT 0`)
      }
      return context.json({ source: 'clickhouse' })
    } catch {
      return context.json({ source: 'clickhouse', error: 'Database unavailable' }, 503)
    }
  })

  app.get('/api/worker/tick', async (context) => {
    if (!cronSecret || context.req.header('authorization') !== `Bearer ${cronSecret}`)
      return context.json({ error: 'Unauthorized' }, 401)
    context.header('cache-control', 'no-store')
    if (useDemoFallback) return context.json({ skipped: 'demo' })

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
      if (path === 'history.json') {
        context.header('cache-control', 'public, max-age=60, stale-while-revalidate=120')
        return context.json(await historyFromClickHouse(config))
      }
      if (path === 'index.json') {
        context.header('cache-control', 'public, max-age=60, stale-while-revalidate=120')
        const index = await indexFromClickHouse(config)
        return context.json(index)
      }

      const runMatch = /^runs\/([0-9a-f]{40})\/run\.json$/.exec(path)
      if (runMatch) {
        const run = await loadRun(
          config,
          runMatch[1],
          loadImport,
          context.req.query('artifacts') !== '0',
        )
        if (!run) return context.json({ error: 'Run not found' }, 404)
        context.header('cache-control', 'public, max-age=300, stale-while-revalidate=3600')
        return context.json(run)
      }

      const manifestMatch = /^runs\/([0-9a-f]{40})\/artifacts\.json$/.exec(path)
      if (manifestMatch) {
        const artifacts = await artifactsFromClickHouse(config, manifestMatch[1])
        context.header('cache-control', 'public, max-age=300, stale-while-revalidate=3600')
        return context.json(artifacts)
      }

      const artifactMatch =
        /^runs\/([0-9a-f]{40})\/([\w.-]{1,128})\/([\w.-]{1,128})\/((?:\d+|[a-f0-9]{64})\.json)$/.exec(
          path,
        )
      if (!artifactMatch) return context.json({ error: 'Unknown data file' }, 404)

      const [, sha, benchmark, compiler, storagePath] = artifactMatch
      // Path hashes also resolve legacy rows without rewriting their numeric IDs.
      const fileCondition = /^[a-f0-9]{64}\.json$/.test(storagePath)
        ? `lower(hex(SHA256(path))) = '${storagePath.slice(0, -5)}'`
        : `storage_path = '${storagePath}'`
      const readArtifact = () =>
        select(
          config,
          `SELECT content FROM artifact_files FINAL
         WHERE workflow_run_id IN (
           SELECT workflow_run_id FROM runs FINAL
           WHERE commit = '${sha}' ORDER BY imported_at DESC LIMIT 1
         )
           AND test_id = '${benchmark}' AND compiler = '${compiler}' AND ${fileCondition}
         ORDER BY imported_at DESC LIMIT 1`,
        )
      let [artifact] = await readArtifact()
      if (!artifact) {
        // Only take the import/retry path when the run itself is not published yet.
        const runId = await runIdFromClickHouse(config, sha)
        if (runId === null) {
          await loadImport(sha)
          ;[artifact] = await readArtifact()
        }
      }
      if (!artifact) return context.json({ error: 'Artifact not found' }, 404)
      context.header('cache-control', 'public, max-age=3600, stale-while-revalidate=86400')
      return context.json(artifact.content)
    } catch (error) {
      context.header('cache-control', 'no-store')
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
