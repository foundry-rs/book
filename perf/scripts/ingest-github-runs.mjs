import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdtemp, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { promisify } from 'node:util'

import { insert, select } from './lib/clickhouse.mjs'
import { projects } from '../src/projects.ts'

const exec = promisify(execFile)
const maxBuffer = 16 * 1024 * 1024

function args() {
  const values = Object.create(null)
  const start = process.argv[2] === '--' ? 3 : 2
  for (let index = start; index < process.argv.length; index += 2) {
    const option = process.argv[index]
    const value = process.argv[index + 1]
    if (!option?.startsWith('--') || value === undefined)
      throw new Error(`Invalid argument: ${option}`)
    values[option.slice(2)] = value
  }
  return values
}

async function runs(repository, runId, limit) {
  if (runId) {
    const { stdout } = await exec('gh', [
      'run',
      'view',
      runId,
      '--repo',
      repository,
      '--json',
      'attempt,databaseId,event,headSha,headBranch,createdAt,conclusion,name,displayTitle',
    ])
    return [JSON.parse(stdout)]
  }
  const { stdout } = await exec(
    'gh',
    [
      'run',
      'list',
      '--repo',
      repository,
      '--workflow',
      project.workflow,
      '--limit',
      limit,
      '--json',
      'attempt,databaseId,event,headSha,headBranch,createdAt,conclusion,name,displayTitle',
    ],
    { maxBuffer },
  )
  return JSON.parse(stdout)
}

// Manual dispatches on main named `Benchmark backfill <sha>` benchmark that older main commit.
function backfillCommit(run) {
  return run.event === 'workflow_dispatch' && run.headBranch === 'main'
    ? /^Benchmark backfill ([0-9a-f]{40})$/.exec(run.displayTitle ?? '')?.[1]
    : undefined
}

function benchmarkedCommit(run) {
  return backfillCommit(run) ?? run.headSha
}

function trustedRun(run) {
  return (
    run.conclusion === 'success' &&
    (run.event === 'push' || backfillCommit(run) !== undefined) &&
    run.headBranch === 'main' &&
    /^[0-9a-f]{40}$/.test(run.headSha)
  )
}

async function commitDate(repository, sha) {
  const { stdout } = await exec('gh', [
    'api',
    `repos/${repository}/commits/${sha}`,
    '--jq',
    '.commit.committer.date',
  ])
  return stdout.trim()
}

async function importedRuns() {
  return new Map(
    (
      await select(
        'SELECT workflow_run_id, max(run_attempt) AS attempt FROM run_snapshots FINAL GROUP BY workflow_run_id',
      )
    ).map((run) => [Number(run.workflow_run_id), Number(run.attempt)]),
  )
}

async function refreshMetadata(run) {
  if (!trustedRun(run)) return false
  const pull = await pullRequest(repository, benchmarkedCommit(run))
  const [snapshot] = await select(
    `SELECT * EXCEPT (published_at) FROM run_snapshots FINAL WHERE workflow_run_id = ${run.databaseId} ORDER BY run_attempt DESC, published_at DESC LIMIT 1`,
  )
  if (snapshot) {
    const next = {
      ...snapshot,
      pr: pull?.number || null,
      title: pull?.title || run.displayTitle || null,
    }
    if (next.pr === snapshot.pr && next.title === snapshot.title) return true
    delete next.revision
    next.revision = createHash('sha256').update(JSON.stringify(next)).digest('hex')
    await insert('run_snapshots', [next])
  }
  return true
}

async function pullRequest(repository, sha) {
  try {
    const { stdout } = await exec('gh', [
      'api',
      '-H',
      'Accept: application/vnd.github+json',
      `repos/${repository}/commits/${sha}/pulls`,
    ])
    const pulls = JSON.parse(stdout)
    return pulls.find((pull) => pull.merged_at) || pulls[0] || null
  } catch (error) {
    console.warn(
      `Could not find a pull request for ${sha.slice(0, 8)}: ${error.message.split('\n', 1)[0]}`,
    )
    return null
  }
}

async function artifactPaths(directory) {
  const directories = [directory]
  while (directories.length) {
    const path = directories.pop()
    for (const entry of await readdir(path, { withFileTypes: true })) {
      const file = join(path, entry.name)
      if (entry.isFile() && entry.name === 'results.json')
        return { artifacts: join(dirname(file), 'artifacts'), results: file }
      if (entry.isDirectory()) directories.push(file)
    }
  }
  throw new Error('Downloaded artifact has no results.json')
}

async function ingest(repository, run, refresh, knownRuns) {
  if (!trustedRun(run)) return false
  if (!refresh && (knownRuns.get(run.databaseId) ?? 0) >= (run.attempt ?? 1)) return false
  const commit = benchmarkedCommit(run)
  const backfill = commit !== run.headSha
  const pull = await pullRequest(repository, commit)
  // History is ordered by time; a backfill belongs at its commit's time, not the dispatch's.
  const timestamp = backfill ? await commitDate(repository, commit) : run.createdAt
  const directory = await mkdtemp(join(tmpdir(), 'solar-web-'))
  try {
    await exec('gh', [
      'run',
      'download',
      String(run.databaseId),
      '--repo',
      repository,
      '--name',
      project.artifact,
      '--dir',
      directory,
    ])
    const paths = await artifactPaths(directory)
    await exec('node', [
      resolve('scripts/ingest-run.mjs'),
      '--project',
      project.id,
      '--results',
      paths.results,
      '--artifacts',
      paths.artifacts,
      '--commit',
      commit,
      '--workflow-run',
      String(run.databaseId),
      '--run-attempt',
      String(run.attempt ?? 1),
      '--workflow',
      run.name || 'Benchmark',
      '--branch',
      run.headBranch || '',
      '--pr',
      String(pull?.number || ''),
      '--title',
      pull?.title || (backfill ? '' : run.displayTitle) || '',
      '--timestamp',
      timestamp,
    ])
    knownRuns.set(run.databaseId, run.attempt ?? 1)
    return true
  } catch (error) {
    if (
      error.stderr?.includes('no valid artifacts found to download') ||
      error.message.includes('Downloaded artifact has no results.json')
    ) {
      console.warn(`Skipped workflow run ${run.databaseId}: no benchmark results available`)
      return false
    }
    console.warn(`Skipped workflow run ${run.databaseId}: ${error.message.split('\n', 1)[0]}`)
    return false
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
}

const options = args()
if (!Object.hasOwn(projects, options.project ?? 'solar'))
  throw new Error(`Unknown project: ${options.project}`)
const project = projects[options.project ?? 'solar']
const repository = options.repo || project.repository
const limit = options.limit || '10000'
const available = await runs(repository, options['workflow-run'], limit)
const concurrency = Number(options.concurrency || '2')
if (!Number.isSafeInteger(concurrency) || concurrency < 1 || concurrency > 4)
  throw new Error('Concurrency must be an integer from 1 to 4')
const knownRuns = await importedRuns()
console.log(`Scanning ${available.length} GitHub Actions runs with ${concurrency} workers`)
let count = 0
let next = 0
async function worker() {
  while (next < available.length) {
    const run = available[next++]
    count += Number(
      options['metadata-only'] === 'true'
        ? await refreshMetadata(run)
        : await ingest(repository, run, options.refresh === 'true', knownRuns),
    )
  }
}
await Promise.all(Array.from({ length: Math.min(concurrency, available.length) }, worker))
console.log(
  `${options['metadata-only'] === 'true' ? 'Updated' : 'Ingested'} ${count} GitHub Actions run${count === 1 ? '' : 's'}`,
)
