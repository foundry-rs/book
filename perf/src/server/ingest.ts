import { createHash } from 'node:crypto'

import { Unzip, UnzipInflate, UnzipPassThrough } from 'fflate'

import {
  artifactMetadata,
  inputSources,
  textArtifact,
  validArtifactPath,
  validIdentifier,
} from './artifacts'
import { clickHouseConfig, insert, select, type ClickHouseConfig } from './clickhouse'
import {
  type GitHubClient,
  sharedGitHubClient,
  gitHubConfig,
  type GitHubRun,
  type GitHubArtifact,
} from './github'
import { normalizeResults } from './normalizeResults'
import { publication, publicationBlobs } from './publication'
import { enrichSources } from './benchmarkSources'
import { ImportPendingError, RunNotFoundError } from './pending'
import { importStage, timeImport } from './importTiming'
import { projects, type Project } from '../projects'
export { ImportPendingError } from './pending'

const maxArtifactBytes = 32 * 1024 * 1024
const maxArchiveBytes = 128 * 1024 * 1024
const maxArtifactRunBytes = 256 * 1024 * 1024
const maxResultsBytes = 32 * 1024 * 1024
const validCommit = /^[0-9a-f]{40}$/
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

// A completed run without the artifact never gains one; do not schedule retries for it.
class MissingArtifactError extends Error {}

function archivePath(name: string) {
  if (!validArtifactPath(name)) return null
  if (name === 'results.json' || name.endsWith('/results.json')) return name
  const match = /(?:^|\/)artifacts\/([\w.-]+)\/([\w.-]+)\/(.+)$/.exec(name)
  if (!match || !validIdentifier.test(match[1]) || !validIdentifier.test(match[2])) return null
  return name
}

function contents(chunks: Uint8Array[], path: string) {
  const length = chunks.reduce((total, chunk) => total + chunk.byteLength, 0)
  const data = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) {
    data.set(chunk, offset)
    offset += chunk.byteLength
  }
  return textArtifact(data, path)
}

export async function extractArchive(response: Response): Promise<ArtifactArchive> {
  const declaredLength = Number(response.headers.get('content-length') || 0)
  if (declaredLength > maxArchiveBytes) throw new Error('Artifact archive exceeds 128 MiB')
  if (!response.body) throw new Error('Artifact archive has no body')

  const files = new Map<string, string>()
  let failure: Error | null = null
  let totalBytes = 0
  let fileCount = 0
  const unzip = new Unzip((file) => {
    if (++fileCount > 10_000) {
      failure = new Error('Artifact archive exceeds 10000 files')
      return
    }
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
      if (final && !failure) {
        const content = contents(chunks, path)
        if (content !== null) {
          if (files.has(path)) failure = new Error('Artifact archive contains duplicate paths')
          else files.set(path, content)
        }
      }
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

  // A baseline/results.json is a different run, not a replacement for the root.
  const candidates = [...files.keys()]
    .filter((path) => path === 'results.json' || path.endsWith('/results.json'))
    .filter(
      (path) =>
        !path
          .split('/')
          .slice(0, -1)
          .some((part) => part === 'baseline' || part === 'artifacts'),
    )
    .sort((a, b) => a.split('/').length - b.split('/').length)
  const resultPath = candidates[0]
  if (!resultPath) throw new Error('Artifact archive has no results.json')
  if (candidates[1] && candidates[1].split('/').length === resultPath.split('/').length)
    throw new Error('Artifact archive contains ambiguous results documents')
  const results = files.get(resultPath)
  if (!results) throw new Error('Artifact archive has no results.json')
  if (new TextEncoder().encode(results).byteLength > maxResultsBytes)
    throw new Error('Benchmark results exceed 32 MiB')

  const prefix = resultPath.slice(0, -'results.json'.length) + 'artifacts/'
  const artifacts = new Map(
    [...files].flatMap(([path, content]) =>
      path.startsWith(prefix) ? [[`artifacts/${path.slice(prefix.length)}`, content] as const] : [],
    ),
  )
  return { artifacts, results }
}

export function normalizeArchive(
  archive: ArtifactArchive,
  run: ImportedRun,
  project: Project = projects.solar,
): NormalizedRun {
  const document = JSON.parse(archive.results) as unknown
  const results = normalizeResults(document, run, project)
  const knownTests = new Set(results.map((result) => String(result.test_id)))
  const files = new Map(archive.artifacts)
  let totalBytes = [...files.values()].reduce(
    (total, content) => total + Buffer.byteLength(content),
    0,
  )
  for (const [key, content] of archive.artifacts) {
    if (!/^artifacts\/[^/]+\/[^/]+\/input\.json$/.test(key)) continue
    const prefix = key.slice(0, -'input.json'.length)
    for (const [path, source] of inputSources(content)) {
      if (files.has(prefix + path)) continue
      totalBytes += Buffer.byteLength(source)
      if (files.size >= 10_000 || totalBytes > maxArtifactRunBytes)
        throw new Error('Source artifacts exceed the configured size limit')
      files.set(prefix + path, source)
    }
  }
  const artifacts = [...files].flatMap(([key, content]) => {
    const [, testId, compiler, ...parts] = key.split('/')
    const path = parts.join('/')
    if (!knownTests.has(testId) || !validIdentifier.test(compiler) || !validArtifactPath(path))
      return []
    const metadata = artifactMetadata(path)
    return [
      {
        workflow_run_id: run.workflowRunId,
        commit: run.commit,
        test_id: testId,
        compiler,
        path,
        storage_path: metadata.storagePath,
        label: metadata.label,
        language: metadata.language,
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
      project: project.id,
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

// A manual `workflow_dispatch` on main can benchmark an older main commit's code; the producer
// names such runs `Benchmark backfill <sha>`. Every other run benchmarks its own head.
const backfillTitle = /^Benchmark backfill ([0-9a-f]{40})$/

export function benchmarkedCommit(run: GitHubRun) {
  const backfill =
    run.event === 'workflow_dispatch' && run.head_branch === 'main'
      ? backfillTitle.exec(run.display_title)
      : null
  return backfill ? backfill[1] : run.head_sha
}

function importedRun(run: GitHubRun, pr: number | null, title: string | null): ImportedRun {
  return {
    branch: run.head_branch,
    commit: benchmarkedCommit(run),
    pr,
    startedAt: run.created_at,
    title,
    workflow: run.name || 'Benchmark',
    workflowRunId: run.id,
  }
}

async function knownRuns(config: ClickHouseConfig, project: Project) {
  const rows = await select(
    config,
    `SELECT workflow_run_id, run_attempt FROM (
       SELECT workflow_run_id, max(run_attempt) AS run_attempt FROM run_snapshots FINAL WHERE project = '${project.id}' GROUP BY workflow_run_id ORDER BY workflow_run_id DESC LIMIT 2_000
     )
     UNION DISTINCT
     SELECT workflow_run_id, 0 AS run_attempt FROM ingestion_jobs FINAL
     WHERE project = '${project.id}'
       AND (state = 'missing' OR state IN ('retry', 'importing') AND next_attempt_at > now64(3))`,
  )
  return new Map(rows.map((row) => [Number(row.workflow_run_id), Number(row.run_attempt)]))
}

async function hasRun(config: ClickHouseConfig, source: GitHubRun) {
  const rows = await select(
    config,
    `SELECT 1 FROM run_snapshots FINAL WHERE workflow_run_id = ${source.id} AND commit = '${benchmarkedCommit(source)}' AND run_attempt >= ${source.run_attempt ?? 1} LIMIT 1`,
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

async function jobForCommit(config: ClickHouseConfig, sha: string, project: Project) {
  const [latest] = await select(
    config,
    `SELECT workflow_run_id, commit, state, attempts, toUnixTimestamp64Milli(next_attempt_at) AS next_attempt_at
     FROM ingestion_jobs FINAL WHERE project = '${project.id}' AND commit = '${sha}' ORDER BY updated_at DESC LIMIT 1`,
  )
  return latest as unknown as IngestJob | undefined
}

async function dueJobs(config: ClickHouseConfig, limit: number, project: Project) {
  const rows = await select(
    config,
    `SELECT workflow_run_id, commit, state, attempts, toUnixTimestamp64Milli(next_attempt_at) AS next_attempt_at
     FROM ingestion_jobs FINAL
     WHERE project = '${project.id}' AND state IN ('retry', 'importing') AND next_attempt_at <= now64(3)
     ORDER BY next_attempt_at ASC LIMIT ${limit}`,
  )
  return rows as unknown as IngestJob[]
}

async function recordJob(
  config: ClickHouseConfig,
  project: Project,
  source: GitHubRun,
  state: 'complete' | 'missing' | 'retry' | 'importing',
  attempts: number,
  error: string | null,
) {
  await insert(config, 'ingestion_jobs', [
    {
      attempts,
      commit: benchmarkedCommit(source),
      last_error: error,
      next_attempt_at: (state === 'complete' || state === 'missing'
        ? new Date(0)
        : state === 'retry'
          ? retryAt(attempts)
          : new Date(Date.now() + 300_000)
      ).toISOString(),
      project: project.id,
      state,
      workflow_run_id: source.id,
    },
  ])
}

async function download(github: GitHubClient, artifact: GitHubArtifact) {
  if (artifact.size_in_bytes > maxArchiveBytes)
    throw new Error('Benchmark artifact exceeds 128 MiB')
  const response = await importStage('downloadHeadersMs', () =>
    github.download(artifact.archive_download_url),
  )
  // Extraction is streamed while downloading; report the combined stage honestly.
  return importStage('downloadExtractMs', () => extractArchive(response))
}

async function publish(
  config: ClickHouseConfig,
  project: Project,
  archive: ArtifactArchive,
  run: ImportedRun,
  attempt: number,
) {
  const normalized = await importStage('normalizeMs', () => normalizeArchive(archive, run, project))
  // Missing historical provenance must not prevent publication of measurements.
  // The backend backfill retries it independently of artifact import.
  if (project.id === 'solar')
    await enrichSources(run.commit, normalized.results).catch((error) =>
      console.warn('Could not enrich historical benchmark sources', error),
    )
  const blobs = await importStage('prepareBlobsMs', () => publicationBlobs(normalized.artifacts))
  await importStage('writeBlobsMs', () => insert(config, 'artifact_blobs', blobs))
  await importStage('publishSnapshotMs', () =>
    insert(config, 'run_snapshots', [
      publication(
        { ...normalized.run, run_attempt: attempt },
        normalized.results,
        normalized.artifacts,
      ),
    ]),
  )
}

async function ingestRun(
  config: ClickHouseConfig,
  github: GitHubClient,
  project: Project,
  source: GitHubRun,
  availableArtifact?: GitHubArtifact,
) {
  const commit = benchmarkedCommit(source)
  const backfill = commit !== source.head_sha
  const [pull, artifact, committed] = await Promise.all([
    importStage('githubMetadataMs', () => github.pullRequest(commit).catch(() => null)),
    importStage('githubArtifactMs', () => availableArtifact ?? github.artifact(source.id)),
    // History is ordered by time; a backfill belongs at its commit's time, not the dispatch's.
    backfill
      ? importStage('githubMetadataMs', () =>
          github.request<{ commit: { committer: { date: string } } }>(
            `repos/${github.config.repository}/commits/${commit}`,
          ),
        )
      : null,
  ])
  const run = importedRun(
    source,
    pull?.number || null,
    pull?.title || (backfill ? null : source.display_title) || null,
  )
  if (committed) run.startedAt = committed.commit.committer.date
  if (!artifact)
    throw new (source.conclusion === null ? Error : MissingArtifactError)(
      'Benchmark artifact is not available yet',
    )
  await publish(config, project, await download(github, artifact), run, source.run_attempt ?? 1)
  return true
}

// A PR job whose base has no usable run of its own benchmarks the base too and uploads it
// beside its own results. Publish it under workflow run 0 so any real run of the base
// commit takes precedence, and keep it out of main-branch history (no branch).
async function ingestBaseline(
  config: ClickHouseConfig,
  github: GitHubClient,
  project: Project,
  sha: string,
  partner: string,
) {
  const sources = await importStage('githubRunLookupMs', () => github.runsForCommit(partner))
  for (const source of sources) {
    const artifact = await importStage('githubArtifactMs', () =>
      github.artifact(source.id, project.baselineArtifact),
    )
    if (!artifact) continue
    const archive = await download(github, artifact)
    const document = JSON.parse(archive.results) as { commit?: unknown } | null
    if (document?.commit !== sha) continue
    const run: ImportedRun = {
      branch: null,
      commit: sha,
      pr: null,
      startedAt: source.created_at,
      title: `Baseline benchmarked by ${partner.slice(0, 8)}`,
      workflow: source.name || 'Benchmark',
      workflowRunId: 0,
    }
    await publish(config, project, archive, run, 1)
    return true
  }
  if (sources.some((source) => source.conclusion === null))
    throw new ImportPendingError(5, 'benchmark-running', sha)
  return false
}

async function ingestTracked(
  config: ClickHouseConfig,
  github: GitHubClient,
  project: Project,
  source: GitHubRun,
  artifact?: GitHubArtifact,
) {
  const previous = await importStage('jobLookupMs', () => job(config, source.id))
  throwIfPending(previous)
  if (await importStage('snapshotLookupMs', () => hasRun(config, source))) {
    await recordJob(config, project, source, 'complete', Number(previous?.attempts ?? 0), null)
    return false
  }

  try {
    await importStage('markImportingMs', () =>
      recordJob(config, project, source, 'importing', Number(previous?.attempts || 0), null),
    )
    const imported = await ingestRun(config, github, project, source, artifact)
    await importStage('markCompleteMs', () =>
      recordJob(config, project, source, 'complete', Number(previous?.attempts || 0), null),
    )
    return imported
  } catch (error) {
    if (error instanceof ImportPendingError) throw error
    const attempts = Number(previous?.attempts || 0) + 1
    const state = error instanceof MissingArtifactError ? 'missing' : 'retry'
    await recordJob(config, project, source, state, attempts, errorMessage(error)).catch(
      (recordError) => console.error('Could not record benchmark import failure', recordError),
    )
    throw error
  }
}

function throwIfPending(job: IngestJob | undefined) {
  if (
    !job ||
    !['retry', 'importing'].includes(job.state) ||
    Number(job.next_attempt_at) <= Date.now()
  )
    return
  throw new ImportPendingError(
    job.state === 'retry'
      ? Math.max(1, Math.ceil((Number(job.next_attempt_at) - Date.now()) / 1_000))
      : 1,
    job.state === 'retry' ? 'retry' : 'importing',
    job.commit,
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

export async function ingestRecent(
  environment: NodeJS.ProcessEnv = process.env,
  selected: Project[] = Object.values(projects),
) {
  const config = clickHouseConfig(environment, 'write')
  if (!config) throw new Error('ClickHouse ingestion credentials are not configured')
  const limit = ingestLimit(environment)

  const result = { failed: [] as number[], imported: 0, scanned: 0 }
  const unavailable: string[] = []
  let failure: unknown
  // One project's GitHub or import failure must not stop the others.
  for (const project of selected) {
    try {
      const imported = await ingestProject(config, environment, project, limit)
      result.failed.push(...imported.failed)
      result.imported += imported.imported
      result.scanned += imported.scanned
    } catch (error) {
      console.warn(`Could not import ${project.id} benchmark runs`, error)
      unavailable.push(project.id)
      failure = error
    }
  }
  if (selected.length && unavailable.length === selected.length) throw failure
  return unavailable.length ? { ...result, unavailable } : result
}

async function ingestProject(
  config: ClickHouseConfig,
  environment: NodeJS.ProcessEnv,
  project: Project,
  limit: number,
) {
  const githubConfig = gitHubConfig(environment, project)
  if (!githubConfig) throw new Error('GitHub App credentials are not configured')

  const github = sharedGitHubClient(githubConfig)
  const [known, jobs, listedRuns] = await Promise.all([
    knownRuns(config, project),
    dueJobs(config, limit, project),
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
  const recent = listedRuns.filter(
    (run) =>
      isMainRun(run) &&
      (!known.has(run.id) ||
        (known.get(run.id)! > 0 && known.get(run.id)! < (run.run_attempt ?? 1))),
  )
  const runs = selectRuns(
    retried.flatMap((run) => (run && isCompleteRun(run) ? [run] : [])),
    recent,
    limit,
  )

  const failed: number[] = []
  let imported = 0
  for (const run of runs) {
    try {
      imported += Number(
        await timeImport(benchmarkedCommit(run), () => ingestTracked(config, github, project, run)),
      )
    } catch (error) {
      console.warn(`Could not import benchmark run ${run.id}`, error)
      failed.push(run.id)
    }
  }
  return { failed, imported, scanned: runs.length }
}

/** `partner` is the other commit of a comparison, whose run may carry this commit's baseline. */
export async function ingestCommit(
  sha: string,
  environment: NodeJS.ProcessEnv = process.env,
  project: Project = projects.solar,
  partner?: string,
) {
  if (!validCommit.test(sha) || (partner !== undefined && !validCommit.test(partner)))
    throw new Error('Invalid commit')

  const config = clickHouseConfig(environment, 'write')
  const githubConfig = gitHubConfig(environment, project)
  if (!config) throw new Error('ClickHouse ingestion credentials are not configured')
  if (!githubConfig) throw new Error('GitHub App credentials are not configured')

  return timeImport(sha, async () => {
    const github = sharedGitHubClient(githubConfig)
    const [previous, sources] = await Promise.all([
      importStage('commitJobLookupMs', () => jobForCommit(config, sha, project)),
      // A backfill dispatch shares main's head SHA but benchmarks an older commit.
      importStage('githubRunLookupMs', () =>
        github
          .runsForCommit(sha)
          .then((runs) => runs.filter((run) => benchmarkedCommit(run) === sha)),
      ),
    ])
    throwIfPending(previous)
    for (const source of sources) {
      const artifact = await importStage('githubArtifactMs', () => github.artifact(source.id))
      if (artifact) return ingestTracked(config, github, project, source, artifact)
    }
    if (sources.some((source) => source.conclusion === null))
      throw new ImportPendingError(5, 'benchmark-running', sha)
    if (
      partner &&
      partner !== sha &&
      project.baselineArtifact &&
      (await ingestBaseline(config, github, project, sha, partner))
    )
      return true
    if (!sources.length) throw new RunNotFoundError()
    throw new Error('Benchmark workflows did not publish an available codegen artifact')
  })
}
