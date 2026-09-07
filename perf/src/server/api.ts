import { Hono } from 'hono'
import { compilerLabels } from '../compilerMetadata'
import { historyMetrics, historySeries } from '../historySeries'
import { requestTiming } from './timing'

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
  commit: string
  workflow_run_id: unknown
  [key: string]: unknown
}

async function indexFromClickHouse(config: ClickHouseConfig) {
  const runs = await select(
    config,
    `WITH recent AS (
       SELECT commit, workflow_run_id, started_at, branch, pr, title FROM (
         SELECT commit, workflow_run_id, started_at, branch, pr, title, source_schema
         FROM runs FINAL ORDER BY imported_at DESC, workflow_run_id DESC LIMIT 1 BY commit
       ) WHERE source_schema > 0 ORDER BY started_at DESC LIMIT 2_000
     ) SELECT
       r.commit,
       r.workflow_run_id,
       formatDateTime(r.started_at, '%Y-%m-%dT%H:%i:%SZ', 'UTC') AS timestamp,
       r.branch,
       r.pr,
       r.title,
       ifNull(b.benchmarkCount, 0) AS benchmarkCount
     FROM recent AS r LEFT JOIN (
       SELECT workflow_run_id, countDistinct(test_id) AS benchmarkCount
       FROM benchmark_results FINAL
       WHERE workflow_run_id IN (SELECT workflow_run_id FROM recent)
       GROUP BY workflow_run_id
     ) AS b ON r.workflow_run_id = b.workflow_run_id
     ORDER BY r.started_at DESC`,
  )
  return {
    schemaVersion: 1,
    updatedAt: new Date().toISOString(),
    runs: runs.map((run) => ({
      commit: run.commit,
      timestamp: run.timestamp,
      branch: run.branch,
      pr: run.pr,
      title: run.title,
      benchmarkCount: run.benchmarkCount ?? 0,
    })),
  }
}

const measurementColumns = [
  'test_id',
  'description',
  'suite',
  'compiler',
  'status',
  'compile_time_seconds',
  'bytecode_size',
  'runtime_size',
  'deploy_gas',
  'total_gas',
  'peak_rss_bytes',
]

async function runsFromClickHouse(
  config: ClickHouseConfig,
  commits: string[],
  includeArtifacts: boolean,
): Promise<StoredRun[]> {
  const stored = await select(
    config,
    `WITH selected AS (
       SELECT workflow_run_id, commit, branch, pr, title, raw_results, started_at
       FROM runs FINAL WHERE commit IN (${commits.map((sha) => `'${sha}'`).join(',')})
       ORDER BY imported_at DESC, workflow_run_id DESC LIMIT 1 BY commit
     ) SELECT r.workflow_run_id, r.commit, r.branch, r.pr, r.title, r.raw_results,
       formatDateTime(r.started_at, '%Y-%m-%dT%H:%i:%SZ', 'UTC') AS timestamp,
       b.measurements
     FROM selected AS r LEFT JOIN (
       SELECT workflow_run_id, groupArray(tuple(${measurementColumns.join(',')})) AS measurements
       FROM benchmark_results FINAL
       WHERE workflow_run_id IN (SELECT workflow_run_id FROM selected)
       GROUP BY workflow_run_id
     ) AS b ON r.workflow_run_id = b.workflow_run_id`,
  )
  return Promise.all(
    stored.map(async (run) => {
      const { raw_results, measurements, ...runMetadata } = run
      const labels = compilerLabels(raw_results)
      const rows = (Array.isArray(measurements) ? (measurements as unknown[][]) : [])
        .sort(
          (a, b) =>
            String(a[0]).localeCompare(String(b[0])) || String(a[3]).localeCompare(String(b[3])),
        )
        .map((values) =>
          Object.fromEntries(measurementColumns.map((name, index) => [name, values[index]])),
        )

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
        commit: String(run.commit),
        schemaVersion: 1,
        results: [...results.values()],
        artifacts: includeArtifacts
          ? await artifactsFromClickHouse(config, String(run.commit))
          : {},
        workflow_run_id: run.workflow_run_id,
      }
    }),
  )
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

async function historyFromClickHouse(config: ClickHouseConfig, metric: string, benchmark?: string) {
  const rows = await select(
    config,
    `WITH recent AS (
    SELECT commit, workflow_run_id, started_at
    FROM (SELECT commit, workflow_run_id, started_at, branch, source_schema
      FROM runs FINAL ORDER BY imported_at DESC, workflow_run_id DESC LIMIT 1 BY commit)
    WHERE source_schema > 0 AND branch = 'main'
    ORDER BY started_at DESC, commit DESC LIMIT 60
  )
  SELECT r.commit, formatDateTime(r.started_at, '%Y-%m-%dT%H:%i:%SZ', 'UTC') AS timestamp,
    b.test_id, if(b.status = 'ok', b.${metric}, NULL) AS value
  FROM recent AS r LEFT JOIN (
    SELECT workflow_run_id, test_id, status, ${metric}
    FROM benchmark_results FINAL
    WHERE workflow_run_id IN (SELECT workflow_run_id FROM recent) AND compiler = 'solar'
      ${benchmark === undefined ? '' : 'AND test_id = {benchmark:String}'}
  ) AS b ON r.workflow_run_id = b.workflow_run_id
  ORDER BY r.started_at DESC, r.commit DESC, b.test_id`,
    benchmark === undefined ? undefined : { benchmark },
  )
  return historySeries(
    rows.map((row) => ({
      commit: String(row.commit),
      timestamp: String(row.timestamp),
      test_id: typeof row.test_id === 'string' ? row.test_id : '',
      value: typeof row.value === 'number' && Number.isFinite(row.value) ? row.value : null,
    })),
  )
}

async function loadRuns(
  config: ClickHouseConfig,
  commits: string[],
  importRun: (sha: string) => Promise<unknown>,
  includeArtifacts: boolean,
) {
  const current = await runsFromClickHouse(config, commits, includeArtifacts)
  const missing = commits.filter((sha) => !current.some((run) => run.commit === sha))
  if (!missing.length) return current
  await Promise.all(missing.map(importRun))
  return [...current, ...(await runsFromClickHouse(config, missing, includeArtifacts))]
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

  app.use('/api/*', async (context, next) => {
    const started = performance.now()
    const timing = { queries: 0, databaseMs: 0 }
    await requestTiming.run(timing, next)
    context.header(
      'server-timing',
      `api;dur=${(performance.now() - started).toFixed(1)}, db;dur=${timing.databaseMs.toFixed(1)};desc="${timing.queries} queries"`,
    )
    // Browser max-age alone does not opt functions into Vercel's shared CDN cache.
    const cacheControl = context.res.headers.get('cache-control')
    if (
      context.res.ok &&
      context.req.path.startsWith('/api/data/') &&
      cacheControl?.startsWith('public,')
    )
      context.header('vercel-cdn-cache-control', cacheControl.replace('max-age=', 's-maxage='))
  })

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
      await Promise.all(
        ['runs', 'benchmark_results', 'artifact_files'].map((table) =>
          select(config, `SELECT 1 FROM ${table} LIMIT 0`),
        ),
      )
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
    const demo = useDemoFallback ? demoResponse(context.req.url) : null
    if (!config) {
      if (demo) return demo
      return context.json({ error: 'Benchmark data is not configured' }, 503)
    }

    try {
      if (path === 'runs.json') {
        const commits = context.req.query('commits')?.split(',') ?? []
        if (
          !commits.length ||
          commits.length > 2 ||
          commits.some((sha) => !/^[0-9a-f]{40}$/.test(sha))
        )
          return context.json({ error: 'Expected one or two full commit SHAs' }, 400)
        const unique = [...new Set(commits)]
        const runs = await loadRuns(config, unique, loadImport, false)
        if (runs.length !== unique.length) return context.json({ error: 'Run not found' }, 404)
        context.header('cache-control', 'public, max-age=300, stale-while-revalidate=3600')
        return context.json({ runs })
      }
      if (path === 'history.json') {
        const metric = context.req.query('metric') ?? 'total_gas'
        const benchmark = context.req.query('benchmark')
        if (
          !historyMetrics.includes(metric) ||
          (benchmark !== undefined && (!benchmark || benchmark.length > 256))
        )
          return context.json({ error: 'Invalid history selection' }, 400)
        context.header('cache-control', 'public, max-age=60, stale-while-revalidate=120')
        return context.json(await historyFromClickHouse(config, metric, benchmark))
      }
      if (path === 'index.json') {
        context.header('cache-control', 'public, max-age=60, stale-while-revalidate=120')
        const index = await indexFromClickHouse(config)
        return context.json(index)
      }

      const runMatch = /^runs\/([0-9a-f]{40})\/run\.json$/.exec(path)
      if (runMatch) {
        const [run] = await loadRuns(
          config,
          [runMatch[1]],
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
