import { Hono } from 'hono'
import { historyMetrics, historySeries } from '../historySeries'
import { requestTiming } from './timing'
import { responseCache } from '../cache'
import { measurementColumns } from './publication'

import { clickHouseConfig, select, type ClickHouseConfig } from './clickhouse'
import { demoResponse } from './demo'
import { artifactMetadata } from './artifacts'
import { ImportPendingError, RunNotFoundError } from './pending'
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
    `SELECT commit, revision, workflow_run_id,
       formatDateTime(started_at, '%Y-%m-%dT%H:%i:%SZ', 'UTC') AS timestamp,
       branch, pr, title, benchmark_count AS benchmarkCount,
       countIf(branch = 'main') OVER () AS totalMainRuns,
       anyOrNullIf(commit, branch = 'main') OVER (
         ORDER BY started_at DESC, commit DESC ROWS BETWEEN 1 FOLLOWING AND UNBOUNDED FOLLOWING
       ) AS baseCommit
     FROM (SELECT * EXCEPT (measurements, artifacts, source_links) FROM run_snapshots FINAL WHERE source_schema > 0
       ORDER BY workflow_run_id DESC, run_attempt DESC, published_at DESC LIMIT 1 BY commit)
     WHERE source_schema > 0 ORDER BY started_at DESC, commit DESC LIMIT 12`,
  )
  return {
    schemaVersion: 1,
    updatedAt: new Date().toISOString(),
    totalMainRuns: Number(runs[0]?.totalMainRuns ?? 0),
    runs: runs.map((run) => ({
      commit: run.commit,
      timestamp: run.timestamp,
      branch: run.branch,
      pr: run.pr,
      title: run.title,
      benchmarkCount: run.benchmarkCount ?? 0,
      baseCommit: run.baseCommit ?? null,
    })),
  }
}

const revisionPattern = /^[a-f0-9]{64}$/
const snapshotOrder = 'workflow_run_id DESC, run_attempt DESC, published_at DESC'
function snapshotSelection(commits: string[], revisions: Record<string, string> = {}) {
  return commits
    .map(
      (sha) =>
        `(commit = '${sha}'${revisions[sha] ? ` AND revision = '${revisions[sha]}'` : ' AND source_schema > 0'})`,
    )
    .join(' OR ')
}

function manifest(entries: unknown[][]) {
  const tests: Record<
    string,
    Record<
      string,
      ReturnType<typeof artifactMetadata> & {
        path: string
        bytes: number
        compilers: string[]
        contentHashes: Record<string, string>
      }
    >
  > = Object.create(null)
  for (const [test, path, compiler, bytes, hash] of entries) {
    const files = (tests[String(test)] ??= Object.create(null))
    const name = String(path)
    const file = (files[name] ??= {
      ...artifactMetadata(name),
      path: name,
      bytes: 0,
      compilers: [],
      contentHashes: Object.create(null),
    })
    file.bytes = Math.max(file.bytes, Number(bytes) || 0)
    if (!file.compilers.includes(String(compiler))) file.compilers.push(String(compiler))
    file.contentHashes[String(compiler)] = String(hash)
  }
  return Object.fromEntries(
    Object.entries(tests).map(([test, files]) => [
      test,
      Object.values(files).sort((a, b) => a.path.localeCompare(b.path)),
    ]),
  )
}

async function runsFromClickHouse(
  config: ClickHouseConfig,
  commits: string[],
  includeArtifacts: boolean,
  revisions: Record<string, string> = {},
  benchmark?: string,
): Promise<StoredRun[]> {
  const stored = await select(
    config,
    `SELECT workflow_run_id, revision, commit, branch, pr, title,
       formatDateTime(started_at, '%Y-%m-%dT%H:%i:%SZ', 'UTC') AS timestamp,
       ${benchmark === undefined ? 'measurements, source_links' : "arrayMap(m -> tuple(m.test_id, '', '', m.compiler, m.status, NULL, NULL, NULL, NULL, NULL, NULL, m.label), measurements) AS measurements"}
       ${includeArtifacts ? `, ${benchmark === undefined ? 'artifacts' : 'arrayFilter(f -> f.test_id = {benchmark:String}, artifacts) AS artifacts'}` : ''}
     FROM run_snapshots FINAL WHERE ${snapshotSelection(commits, revisions)}
     ORDER BY ${snapshotOrder} LIMIT 1 BY commit`,
    benchmark === undefined ? undefined : { benchmark },
  )
  return Promise.all(
    stored.map(async (run) => {
      const { measurements, artifacts, source_links, ...runMetadata } = run
      const sources = (source_links ?? {}) as Record<string, [string, string][]>
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
          ...(benchmark === undefined
            ? {
                source_links: (Object.hasOwn(sources, testId) ? sources[testId] : []).map(
                  ([label, url]) => ({ label, url }),
                ),
              }
            : {}),
          compilers: Object.create(null),
        }
        ;(result.compilers as Record<string, unknown>)[String(row.compiler)] = {
          status: row.status,
          label: row.label || undefined,
          ...(benchmark === undefined
            ? {
                compile_time_seconds: row.compile_time_seconds,
                bytecode_size: row.bytecode_size,
                runtime_size: row.runtime_size,
                deploy_gas: row.deploy_gas,
                total_gas: row.total_gas,
                peak_rss_bytes: row.peak_rss_bytes,
              }
            : {}),
        }
        results.set(testId, result)
      }

      return {
        ...runMetadata,
        commit: String(run.commit),
        schemaVersion: 1,
        results: [...results.values()],
        artifacts: includeArtifacts ? manifest(Array.isArray(artifacts) ? artifacts : []) : {},
        workflow_run_id: run.workflow_run_id,
      }
    }),
  )
}

async function artifactsFromClickHouse(config: ClickHouseConfig, sha: string, revision?: string) {
  const artifactRows = await select(
    config,
    `SELECT artifacts FROM run_snapshots FINAL
     WHERE ${snapshotSelection([sha], revision ? { [sha]: revision } : {})}
     ORDER BY ${snapshotOrder} LIMIT 1`,
  )
  if (!artifactRows.length) return null
  return manifest(artifactRows[0].artifacts as unknown[][])
}

async function historyFromClickHouse(config: ClickHouseConfig, metric: string, benchmark?: string) {
  const rows = await select(
    config,
    `WITH recent AS (
    SELECT commit, started_at, measurements
    FROM (SELECT commit, started_at, branch, source_schema, measurements
      FROM run_snapshots FINAL WHERE source_schema > 0 ORDER BY ${snapshotOrder} LIMIT 1 BY commit)
    WHERE source_schema > 0 AND branch = 'main'
    ORDER BY started_at DESC, commit DESC LIMIT 60
  )
  SELECT commit, formatDateTime(started_at, '%Y-%m-%dT%H:%i:%SZ', 'UTC') AS timestamp,
    b.test_id AS test_id, if(b.status = 'ok', b.${metric}, NULL) AS value
  FROM recent LEFT ARRAY JOIN arrayFilter(m -> m.compiler = 'solar'
    ${benchmark === undefined ? '' : 'AND m.test_id = {benchmark:String}'}, measurements) AS b
  ORDER BY started_at DESC, commit DESC, test_id`,
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
  revisions: Record<string, string> = {},
  benchmark?: string,
) {
  const current = await runsFromClickHouse(config, commits, includeArtifacts, revisions, benchmark)
  const missing = commits.filter((sha) => !current.some((run) => run.commit === sha))
  if (!missing.length) return current
  const importable = missing.filter((sha) => !revisions[sha])
  if (!importable.length) return current
  await Promise.all(importable.map(importRun))
  return [
    ...current,
    ...(await runsFromClickHouse(config, importable, includeArtifacts, revisions, benchmark)),
  ]
}

async function runIdFromClickHouse(config: ClickHouseConfig, sha: string) {
  const [run] = await select(
    config,
    `SELECT workflow_run_id FROM run_snapshots FINAL
     WHERE commit = '${sha}' AND source_schema > 0 ORDER BY ${snapshotOrder} LIMIT 1`,
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
  const scheduledImport =
    options.ingestRecent || (() => Promise.reject(new Error('Worker is not configured')))
  const importRun =
    options.importRun || (() => Promise.reject(new Error('Worker is not configured')))
  const imports = new Map<string, Promise<unknown>>()
  const loadImport = (sha: string) => {
    const existing = imports.get(sha)
    if (existing) return existing
    const pending = importRun(sha).finally(() => imports.delete(sha))
    imports.set(sha, pending)
    return pending
  }
  const app = new Hono()
  const resolvedRefs = responseCache<string>(10_000, 64 * 1024)
  const missingRefs = responseCache<boolean>(15_000, 64 * 1024)
  // Coalesce concurrent origin misses; the CDN remains the cross-instance cache.
  const indexReads = responseCache<Awaited<ReturnType<typeof indexFromClickHouse>>>(1_000)
  const historyReads = responseCache<Awaited<ReturnType<typeof historyFromClickHouse>>>(1_000)
  const blobReads = responseCache<string | null>(300_000, 8 * 1024 * 1024)
  let github: GitHubClient | undefined

  app.use('/api/*', async (context, next) => {
    const started = performance.now()
    const timing = {
      queries: 0,
      databaseMs: 0,
      sqlMs: 0,
      readRows: 0,
      readBytes: 0,
      summaries: 0,
      queryIds: [] as string[],
    }
    await requestTiming.run(timing, next)
    if (process.env.VERCEL)
      console.info(
        JSON.stringify({
          event: 'perf_api',
          route: context.req.path.replace(/[a-f0-9]{40,64}/g, ':id'),
          status: context.res.status,
          durationMs: Math.round(performance.now() - started),
          ...timing,
        }),
      )
    context.header(
      'server-timing',
      `api;dur=${(performance.now() - started).toFixed(1)}, db;dur=${timing.databaseMs.toFixed(1)};desc="${timing.queries} queries (roundtrip sum)"` +
        (timing.queries > 0 && timing.summaries === timing.queries
          ? `, sql;dur=${timing.sqlMs.toFixed(1)};desc="${timing.readRows} rows / ${timing.readBytes} bytes"`
          : ''),
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
    if (await missingRefs.peek(ref)) return context.json({ error: 'Ref not found' }, 404)
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
      const commit = await resolvedRefs(ref, async () => {
        if (config && /^[0-9a-f]{7,39}$/i.test(ref)) {
          const matches = await select(
            config,
            `SELECT DISTINCT commit FROM run_snapshots WHERE startsWith(commit, {prefix:String}) AND source_schema > 0 LIMIT 2`,
            { prefix: ref.toLowerCase() },
          )
          if (matches.length > 1) throw new GitHubRequestError(null, 422, 'Ambiguous commit prefix')
          if (matches.length === 1) return String(matches[0].commit)
        }
        if (!options.resolveRef && !github) {
          const settings = gitHubConfig()
          if (!settings) throw new Error('GitHub is not configured')
          github = new GitHubClient(settings)
        }
        const resolved = await (options.resolveRef
          ? options.resolveRef(ref)
          : github!.resolveRef(ref))
        if (!/^[0-9a-f]{40}$/.test(resolved)) throw new Error('Invalid resolved commit')
        return resolved
      })
      if (!/^[0-9a-f]{40}$/.test(commit)) throw new Error('Invalid resolved commit')
      return context.json({ commit })
    } catch (error) {
      if (error instanceof GitHubRequestError && error.status === 422)
        return context.json({ error: 'Ambiguous commit prefix; use a longer SHA.' }, 422)
      if (error instanceof GitHubRequestError && error.status === 404) {
        await missingRefs(ref, async () => true)
        return context.json({ error: 'Ref not found' }, 404)
      }
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
        ['run_snapshots', 'artifact_blobs'].map((table) =>
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
      if (path === 'runs.json' || path === 'viewer.json') {
        const commits = context.req.query('commits')?.split(',') ?? []
        const pins = context.req.query('revisions')?.split(',')
        const benchmark = path === 'viewer.json' ? context.req.query('benchmark') : undefined
        if (
          !commits.length ||
          commits.length > 2 ||
          (commits[0] === commits[1] && pins?.[0] !== pins?.[1]) ||
          commits.some((sha) => !/^[0-9a-f]{40}$/.test(sha)) ||
          (pins &&
            (pins.length !== commits.length ||
              pins.some((pin) => pin && !revisionPattern.test(pin)))) ||
          (path === 'viewer.json' && (!benchmark || benchmark.length > 256))
        )
          return context.json({ error: 'Expected one or two full commit SHAs' }, 400)
        const unique = [...new Set(commits)]
        const revisions = Object.fromEntries(
          commits.flatMap((sha, i) => (pins?.[i] ? [[sha, pins[i]]] : [])),
        )
        const runs = await loadRuns(
          config,
          unique,
          loadImport,
          path === 'viewer.json',
          revisions,
          benchmark,
        )
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
        return context.json(
          await historyReads(JSON.stringify([metric, benchmark]), () =>
            historyFromClickHouse(config, metric, benchmark),
          ),
        )
      }
      if (path === 'index.json') {
        context.header('cache-control', 'public, max-age=60, stale-while-revalidate=120')
        const index = await indexReads('index', () => indexFromClickHouse(config))
        return context.json(index)
      }

      const runMatch = /^runs\/([0-9a-f]{40})\/run\.json$/.exec(path)
      if (runMatch) {
        const revision = context.req.query('revision')
        if (revision && !revisionPattern.test(revision))
          return context.json({ error: 'Invalid revision' }, 400)
        const [run] = await loadRuns(
          config,
          [runMatch[1]],
          loadImport,
          context.req.query('artifacts') !== '0',
          revision ? { [runMatch[1]]: revision } : {},
        )
        if (!run) return context.json({ error: 'Run not found' }, 404)
        context.header('cache-control', 'public, max-age=300, stale-while-revalidate=3600')
        return context.json(run)
      }

      const manifestMatch = /^runs\/([0-9a-f]{40})\/artifacts\.json$/.exec(path)
      if (manifestMatch) {
        const revision = context.req.query('revision')
        if (revision && !revisionPattern.test(revision))
          return context.json({ error: 'Invalid revision' }, 400)
        const artifacts = await artifactsFromClickHouse(config, manifestMatch[1], revision)
        if (artifacts === null) return context.json({ error: 'Run not found' }, 404)
        context.header('cache-control', 'public, max-age=300, stale-while-revalidate=3600')
        return context.json(artifacts)
      }

      const blobMatch = /^blobs\/([a-f0-9]{64})\.json$/.exec(path)
      if (blobMatch) {
        const blob = await blobReads(blobMatch[1], async () => {
          const [row] = await select(
            config,
            `SELECT content FROM artifact_blobs FINAL WHERE content_sha256 = '${blobMatch[1]}' LIMIT 1`,
          )
          return row ? String(row.content) : null
        })
        if (blob === null) return context.json({ error: 'Artifact not found' }, 404)
        context.header('cache-control', 'public, max-age=31536000, immutable')
        return context.json(blob)
      }

      const artifactMatch =
        /^runs\/([0-9a-f]{40})\/([\w.-]{1,128})\/([\w.-]{1,128})\/((?:\d+|[a-f0-9]{64})\.json)$/.exec(
          path,
        )
      if (!artifactMatch) return context.json({ error: 'Unknown data file' }, 404)

      const [, sha, benchmark, compiler, storagePath] = artifactMatch
      // Path hashes also resolve legacy rows without rewriting their numeric IDs.
      const fileCondition = /^[a-f0-9]{64}\.json$/.test(storagePath)
        ? `lower(hex(SHA256(f.path))) = '${storagePath.slice(0, -5)}'`
        : `f.legacy_storage_path = '${storagePath}'`
      const readArtifact = () =>
        select(
          config,
          `SELECT content FROM artifact_blobs FINAL
         WHERE content_sha256 IN (
           SELECT f.content_sha256 FROM (
             SELECT artifacts FROM run_snapshots FINAL
             WHERE commit = '${sha}' AND source_schema > 0 ORDER BY ${snapshotOrder} LIMIT 1
           ) ARRAY JOIN artifacts AS f
           WHERE f.test_id = '${benchmark}' AND f.compiler = '${compiler}' AND ${fileCondition}
         )
         LIMIT 1`,
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
      if (error instanceof RunNotFoundError) return context.json({ error: error.message }, 404)
      if (error instanceof ImportPendingError) {
        context.header('retry-after', String(error.retryAfter))
        return context.json(
          { status: error.state, message: error.message, commit: error.commit },
          202,
        )
      }
      console.error('Failed to read benchmark data', error)
      return context.json({ error: 'Benchmark data is unavailable' }, 503)
    }
  })

  app.notFound((context) => context.json({ error: 'Not found' }, 404))
  return app
}

export default createApi()
