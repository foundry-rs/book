import { execFile } from 'node:child_process'
import { mkdtemp, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { promisify } from 'node:util'

import { insert, select } from './lib/clickhouse.mjs'

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
      'databaseId,event,headSha,headBranch,createdAt,conclusion,name,displayTitle',
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
      'Benchmark',
      '--limit',
      limit,
      '--json',
      'databaseId,event,headSha,headBranch,createdAt,conclusion,name,displayTitle',
    ],
    { maxBuffer },
  )
  return JSON.parse(stdout)
}

function trustedRun(run) {
  return (
    run.conclusion === 'success' &&
    run.event === 'push' &&
    run.headBranch === 'main' &&
    /^[0-9a-f]{40}$/.test(run.headSha)
  )
}

async function importedRuns() {
  return new Set(
    (await select('SELECT workflow_run_id FROM runs FINAL')).map((run) =>
      Number(run.workflow_run_id),
    ),
  )
}

async function refreshMetadata(run) {
  if (!trustedRun(run)) return false
  const [stored] = await select(
    `SELECT workflow_run_id, commit, branch, pr, started_at, workflow_name, source_schema, raw_results
     FROM runs FINAL WHERE workflow_run_id = ${run.databaseId} LIMIT 1`,
  )
  if (!stored) return false
  const pull = await pullRequest(repository, run.headSha)
  await insert('runs', [
    { ...stored, pr: pull?.number || null, title: pull?.title || run.displayTitle || null },
  ])
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

function runDocument(run, pull, sourceSchema, rawResults) {
  return {
    workflow_run_id: Number(run.databaseId),
    commit: run.headSha,
    branch: run.headBranch || null,
    pr: pull?.number || null,
    title: pull?.title || run.displayTitle || null,
    started_at: run.createdAt,
    workflow_name: run.name || 'Benchmark',
    source_schema: sourceSchema,
    raw_results: rawResults,
  }
}

async function ingest(repository, run, refresh, knownRuns) {
  if (!trustedRun(run)) return false
  if (!refresh && knownRuns.has(run.databaseId)) return false
  const pull = await pullRequest(repository, run.headSha)
  const directory = await mkdtemp(join(tmpdir(), 'solar-web-'))
  try {
    await exec('gh', [
      'run',
      'download',
      String(run.databaseId),
      '--repo',
      repository,
      '--name',
      'codegen-runtime-results',
      '--dir',
      directory,
    ])
    const paths = await artifactPaths(directory)
    await exec('node', [
      resolve('scripts/ingest-run.mjs'),
      '--results',
      paths.results,
      '--artifacts',
      paths.artifacts,
      '--commit',
      run.headSha,
      '--workflow-run',
      String(run.databaseId),
      '--workflow',
      run.name || 'Benchmark',
      '--branch',
      run.headBranch || '',
      '--pr',
      String(pull?.number || ''),
      '--title',
      pull?.title || run.displayTitle || '',
      '--timestamp',
      run.createdAt,
    ])
    knownRuns.add(run.databaseId)
    return true
  } catch (error) {
    if (
      error.stderr?.includes('no valid artifacts found to download') ||
      error.message.includes('Downloaded artifact has no results.json')
    ) {
      await insert('runs', [runDocument(run, pull, 0, '')])
      knownRuns.add(run.databaseId)
      return true
    }
    console.warn(`Skipped workflow run ${run.databaseId}: ${error.message.split('\n', 1)[0]}`)
    return false
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
}

const options = args()
const repository = options.repo || process.env.GITHUB_REPOSITORY || 'paradigmxyz/solar'
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
