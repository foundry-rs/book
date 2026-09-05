import { createHash } from 'node:crypto'

import { Unzip, UnzipInflate, UnzipPassThrough } from 'fflate'

import { artifactFiles } from './artifacts'
import { clickHouseConfig, insert, select, type ClickHouseConfig } from './clickhouse'
import { GitHubClient, gitHubConfig, type GitHubRun } from './github'

const maxArtifactBytes = 32 * 1024 * 1024
const maxArchiveBytes = 128 * 1024 * 1024
const maxArtifactRunBytes = 256 * 1024 * 1024
const maxResults = 500
const maxResultsBytes = 32 * 1024 * 1024
const validCommit = /^[0-9a-f]{40}$/
const validIdentifier = /^[\w.-]{1,128}$/
const retryDelay = 60_000
const maxRetryDelay = 6 * 60 * 60 * 1_000

export interface ArtifactArchive {
  artifacts: Map<string, string>
  results: string
}

export interface ImportedRun {
  branch: string | null
  commit: string
  pr: number | null
  startedAt: string
  title: string | null
  workflow: string
  workflowRunId: number
}

interface NormalizedRun {
  artifacts: Record<string, unknown>[]
  results: Record<string, unknown>[]
  run: Record<string, unknown>
}

interface IngestJob {
  attempts: number
  commit: string
  next_attempt_at: number
  state: string
  workflow_run_id: number
}

export class ImportPendingError extends Error {
  constructor(readonly retryAfter: number) {
    super('Benchmark import is waiting to retry')
  }
}

function number(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function text(value: unknown, maximum: number) {
  return typeof value === 'string' && value.length <= maximum ? value : ''
}

function resultId(result: Record<string, unknown>) {
  const value = result.test_id ?? result.id ?? result.name
  return typeof value === 'string' && validIdentifier.test(value) ? value : null
}

function compilerResults(result: Record<string, unknown>) {
  if (result.compilers && typeof result.compilers === 'object' && !Array.isArray(result.compilers))
    return result.compilers as Record<string, unknown>
  return Object.fromEntries(
    ['solar', 'solc'].flatMap((compiler) =>
      result[compiler] ? [[compiler, result[compiler]]] : [],
    ),
  )
}

export function normalizeResults(document: unknown, run: ImportedRun) {
  const results = Array.isArray(document)
    ? document
    : document &&
        typeof document === 'object' &&
        Array.isArray((document as { results?: unknown }).results)
      ? (document as { results: unknown[] }).results
      : null
  if (!results) throw new Error('Benchmark results must be an array')
  if (results.length > maxResults) throw new Error('Benchmark results exceed 500 entries')

  return results.flatMap((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return []
    const result = entry as Record<string, unknown>
    const testId = resultId(result)
    if (!testId) return []

    return Object.entries(compilerResults(result)).flatMap(([compiler, metrics]) => {
      if (!['solar', 'solc'].includes(compiler) || !metrics || typeof metrics !== 'object')
        return []
      const values = metrics as Record<string, unknown>
      return [
        {
          workflow_run_id: run.workflowRunId,
          commit: run.commit,
          test_id: testId,
          description: text(result.description, 4_096),
          suite: text(result.suite, 128) || 'unknown',
          compiler,
          status: text(values.status, 64) || 'unknown',
          compile_time_seconds: number(values.compile_time_seconds ?? values.compileTime),
          bytecode_size: number(values.bytecode_size ?? values.bytecodeSize),
          runtime_size: number(values.runtime_size ?? values.runtimeSize),
          deploy_gas: number(values.deploy_gas ?? values.deployGas),
          total_gas: number(values.total_gas ?? values.runtimeGas),
          peak_rss_bytes: number(values.peak_rss_bytes ?? values.peakMemory),
        },
      ]
    })
  })
}

function archivePath(name: string) {
  if (name === 'results.json' || name.endsWith('/results.json')) return 'results.json'

  const match = /(?:^|\/)artifacts\/([\w.-]+)\/(solar|solc)\/([^/]+)$/.exec(name)
  if (!match || !artifactFiles.has(match[3])) return null
  return `artifacts/${match[1]}/${match[2]}/${match[3]}`
}

function contents(chunks: Uint8Array[]) {
  const length = chunks.reduce((total, chunk) => total + chunk.byteLength, 0)
  const data = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) {
    data.set(chunk, offset)
    offset += chunk.byteLength
  }
  return new TextDecoder('utf-8', { fatal: true }).decode(data)
}

export async function extractArchive(response: Response): Promise<ArtifactArchive> {
  const declaredLength = Number(response.headers.get('content-length') || 0)
  if (declaredLength > maxArchiveBytes) throw new Error('Artifact archive exceeds 128 MiB')
  if (!response.body) throw new Error('Artifact archive has no body')

  const files = new Map<string, string>()
  let failure: Error | null = null
  let totalBytes = 0
  const unzip = new Unzip((file) => {
    const path = archivePath(file.name)
    if (!path) return
    if (file.originalSize && file.originalSize > maxArtifactBytes) {
      failure = new Error(`${path} exceeds 32 MiB`)
      return
    }

    const chunks: Uint8Array[] = []
    let size = 0
    file.ondata = (error, chunk, final) => {
      if (error) {
        failure = new Error(error.message)
        return
      }
      if (chunk) {
        size += chunk.byteLength
        totalBytes += chunk.byteLength
        if (size > maxArtifactBytes || totalBytes > maxArtifactRunBytes) {
          failure = new Error('Artifact contents exceed the configured size limit')
          file.terminate()
          return
        }
        chunks.push(chunk)
      }
      if (final && !failure) files.set(path, contents(chunks))
    }
    file.start()
  })
  unzip.register(UnzipInflate)
  unzip.register(UnzipPassThrough)

  const reader = response.body.getReader()
  let compressedBytes = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      compressedBytes += value.byteLength
      if (compressedBytes > maxArchiveBytes) throw new Error('Artifact archive exceeds 128 MiB')
      unzip.push(value)
      if (failure) throw failure
    }
    unzip.push(new Uint8Array(), true)
    if (failure) throw failure
  } finally {
    reader.releaseLock()
  }

  const results = files.get('results.json')
  if (!results) throw new Error('Artifact archive has no results.json')
  if (new TextEncoder().encode(results).byteLength > maxResultsBytes)
    throw new Error('Benchmark results exceed 32 MiB')

  files.delete('results.json')
  return { artifacts: files, results }
}

export function normalizeArchive(archive: ArtifactArchive, run: ImportedRun): NormalizedRun {
  const document = JSON.parse(archive.results) as unknown
  const results = normalizeResults(document, run)
  const knownTests = new Set(results.map((result) => String(result.test_id)))
  const artifacts = [...archive.artifacts].flatMap(([key, content]) => {
    const [, testId, compiler, path] = key.split('/')
    const metadata = artifactFiles.get(path)
    if (!metadata || !knownTests.has(testId)) return []
    return [
      {
        workflow_run_id: run.workflowRunId,
        commit: run.commit,
        test_id: testId,
        compiler,
        path,
        storage_path: metadata[2],
        label: metadata[0],
        language: metadata[1],
        bytes: Buffer.byteLength(content),
        content,
        content_sha256: createHash('sha256').update(content).digest('hex'),
      },
    ]
  })

  return {
    artifacts,
    results,
    run: {
      workflow_run_id: run.workflowRunId,
      commit: run.commit,
      branch: run.branch,
      pr: run.pr,
      title: run.title,
      started_at: run.startedAt,
      workflow_name: run.workflow,
      source_schema: 1,
      raw_results: archive.results,
    },
  }
}

function importedRun(run: GitHubRun, pr: number | null, title: string | null): ImportedRun {
  return {
    branch: run.head_branch,
    commit: run.head_sha,
    pr,
    startedAt: run.created_at,
    title,
    workflow: run.name || 'Benchmark',
    workflowRunId: run.id,
  }
}

async function knownRuns(config: ClickHouseConfig) {
  const rows = await select(
    config,
    'SELECT workflow_run_id FROM runs FINAL ORDER BY imported_at DESC LIMIT 2_000',
  )
  return new Set(rows.map((row) => Number(row.workflow_run_id)))
}

async function hasRun(config: ClickHouseConfig, runId: number) {
  const rows = await select(
    config,
    `SELECT 1 FROM runs FINAL WHERE workflow_run_id = ${runId} LIMIT 1`,
  )
  return rows.length > 0
}

function isCompleteRun(run: GitHubRun) {
  return run.conclusion === 'success' && validCommit.test(run.head_sha)
}

function isMainRun(run: GitHubRun) {
  return isCompleteRun(run) && run.event !== 'pull_request' && run.head_branch === 'main'
}

function retryAt(attempts: number) {
  return new Date(Date.now() + Math.min(maxRetryDelay, retryDelay * 2 ** Math.min(attempts, 16)))
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message.slice(0, 1_024) : 'Unknown import error'
}

async function job(config: ClickHouseConfig, runId: number) {
  const [latest] = await select(
    config,
    `SELECT workflow_run_id, commit, state, attempts, toUnixTimestamp64Milli(next_attempt_at) AS next_attempt_at
     FROM ingestion_jobs FINAL WHERE workflow_run_id = ${runId} LIMIT 1`,
  )
  return latest as unknown as IngestJob | undefined
}

async function jobForCommit(config: ClickHouseConfig, sha: string) {
  const [latest] = await select(
    config,
    `SELECT workflow_run_id, commit, state, attempts, toUnixTimestamp64Milli(next_attempt_at) AS next_attempt_at
     FROM ingestion_jobs FINAL WHERE commit = '${sha}' ORDER BY updated_at DESC LIMIT 1`,
  )
  return latest as unknown as IngestJob | undefined
}

async function dueJobs(config: ClickHouseConfig, limit: number) {
  const rows = await select(
    config,
    `SELECT workflow_run_id, commit, state, attempts, toUnixTimestamp64Milli(next_attempt_at) AS next_attempt_at
     FROM ingestion_jobs FINAL
     WHERE state = 'retry' AND next_attempt_at <= now64(3)
     ORDER BY next_attempt_at ASC LIMIT ${limit}`,
  )
  return rows as unknown as IngestJob[]
}

async function recordJob(
  config: ClickHouseConfig,
  source: GitHubRun,
  state: 'complete' | 'retry',
  attempts: number,
  error: string | null,
) {
  await insert(config, 'ingestion_jobs', [
    {
      attempts,
      commit: source.head_sha,
      last_error: error,
      next_attempt_at:
        state === 'complete' ? new Date(0).toISOString() : retryAt(attempts).toISOString(),
      state,
      workflow_run_id: source.id,
    },
  ])
}

async function ingestRun(config: ClickHouseConfig, github: GitHubClient, source: GitHubRun) {
  const [pull, artifact] = await Promise.all([
    github.pullRequest(source.head_sha).catch(() => null),
    github.artifact(source.id),
  ])
  const run = importedRun(source, pull?.number || null, pull?.title || source.display_title || null)
  if (!artifact) throw new Error('Benchmark artifact is not available yet')
  if (artifact.size_in_bytes > maxArchiveBytes)
    throw new Error('Benchmark artifact exceeds 128 MiB')

  const archive = await extractArchive(await github.download(artifact.archive_download_url))
  const normalized = normalizeArchive(archive, run)
  await insert(config, 'benchmark_results', normalized.results)
  await insert(config, 'artifact_files', normalized.artifacts)
  await insert(config, 'runs', [normalized.run])
  return true
}

async function ingestTracked(config: ClickHouseConfig, github: GitHubClient, source: GitHubRun) {
  const previous = await job(config, source.id)
  throwIfPending(previous)
  if (previous?.state === 'retry' && (await hasRun(config, source.id))) {
    await recordJob(config, source, 'complete', Number(previous.attempts), null)
    return false
  }

  try {
    const imported = await ingestRun(config, github, source)
    await recordJob(config, source, 'complete', Number(previous?.attempts || 0), null)
    return imported
  } catch (error) {
    if (error instanceof ImportPendingError) throw error
    const attempts = Number(previous?.attempts || 0) + 1
    await recordJob(config, source, 'retry', attempts, errorMessage(error)).catch((recordError) =>
      console.error('Could not record benchmark import failure', recordError),
    )
    throw error
  }
}

function throwIfPending(job: IngestJob | undefined) {
  if (job?.state !== 'retry' || Number(job.next_attempt_at) <= Date.now()) return
  throw new ImportPendingError(
    Math.max(1, Math.ceil((Number(job.next_attempt_at) - Date.now()) / 1_000)),
  )
}

function ingestLimit(environment: NodeJS.ProcessEnv) {
  const value = Number(environment.INGEST_MAX_RUNS || 4)
  if (!Number.isSafeInteger(value) || value < 1 || value > 20)
    throw new Error('INGEST_MAX_RUNS must be an integer from 1 to 20')
  return value
}

export function selectRuns(retried: GitHubRun[], recent: GitHubRun[], limit: number) {
  const freshLimit = Math.ceil(limit / 2)
  const selected: GitHubRun[] = []
  const seen = new Set<number>()
  const add = (run: GitHubRun) => {
    if (selected.length >= limit || seen.has(run.id)) return
    seen.add(run.id)
    selected.push(run)
  }

  for (const run of recent) {
    add(run)
    if (selected.length >= freshLimit) break
  }
  for (const run of retried) add(run)
  for (const run of recent) add(run)
  return selected
}

export async function ingestRecent(environment: NodeJS.ProcessEnv = process.env) {
  const config = clickHouseConfig(environment, 'write')
  const githubConfig = gitHubConfig(environment)
  if (!config) throw new Error('ClickHouse ingestion credentials are not configured')
  if (!githubConfig) throw new Error('GitHub App credentials are not configured')

  const limit = ingestLimit(environment)
  const github = new GitHubClient(githubConfig)
  const [known, jobs, listedRuns] = await Promise.all([
    knownRuns(config),
    dueJobs(config, limit),
    github.runs(100),
  ])
  const retried = await Promise.all(
    jobs.map(async (job) => {
      try {
        return await github.run(Number(job.workflow_run_id))
      } catch (error) {
        console.warn(`Could not load benchmark run ${job.workflow_run_id}`, error)
        return null
      }
    }),
  )
  const recent = listedRuns.filter((run) => isMainRun(run) && !known.has(run.id))
  const runs = selectRuns(
    retried.flatMap((run) => (run && isCompleteRun(run) ? [run] : [])),
    recent,
    limit,
  )

  const failed: number[] = []
  let imported = 0
  for (const run of runs) {
    try {
      imported += Number(await ingestTracked(config, github, run))
    } catch (error) {
      console.warn(`Could not import benchmark run ${run.id}`, error)
      failed.push(run.id)
    }
  }
  return { failed, imported, scanned: runs.length }
}

export async function ingestCommit(sha: string, environment: NodeJS.ProcessEnv = process.env) {
  if (!validCommit.test(sha)) throw new Error('Invalid commit')

  const config = clickHouseConfig(environment, 'write')
  const githubConfig = gitHubConfig(environment)
  if (!config) throw new Error('ClickHouse ingestion credentials are not configured')
  if (!githubConfig) throw new Error('GitHub App credentials are not configured')

  throwIfPending(await jobForCommit(config, sha))

  const github = new GitHubClient(githubConfig)
  const source = await github.runForCommit(sha)
  if (!source) throw new Error('No completed benchmark run is available for this commit')
  return ingestTracked(config, github, source)
}
