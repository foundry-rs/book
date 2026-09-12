import { createHash } from 'node:crypto'
import { lstat, readFile, readdir, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'

import { insert } from './lib/clickhouse.mjs'
import { normalizeResults } from '../src/server/normalizeResults.ts'
import { enrichSources } from '../src/server/benchmarkSources.ts'
import { publication, publicationBlobs } from '../src/server/publication.ts'
import {
  artifactMetadata,
  textArtifact,
  validArtifactPath,
  validIdentifier,
} from '../src/server/artifacts.ts'
const maxResultsBytes = 32 * 1024 * 1024
const maxArtifactBytes = 32 * 1024 * 1024
const maxArtifactRunBytes = 256 * 1024 * 1024

function args() {
  const values = Object.create(null)
  for (let index = 2; index < process.argv.length; index += 2) {
    const option = process.argv[index]
    const value = process.argv[index + 1]
    if (!option?.startsWith('--') || value === undefined)
      throw new Error(`Invalid argument: ${option}`)
    values[option.slice(2)] = value
  }
  for (const name of ['results', 'artifacts', 'commit', 'workflow-run']) {
    if (!values[name]) throw new Error(`Missing --${name}`)
  }
  return values
}

async function normalizeArtifacts(root, run) {
  const entries = []
  let totalBytes = 0
  let fileCount = 0
  async function walk(directory, prefix = '') {
    const paths = []
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (++fileCount > 10_000) throw new Error('Artifact run exceeds 10000 files')
      const path = prefix + entry.name
      if (!validArtifactPath(path)) continue
      if (entry.isSymbolicLink()) throw new Error(`Artifact is a symlink: ${path}`)
      if (entry.isDirectory()) paths.push(...(await walk(join(directory, entry.name), `${path}/`)))
      else if (entry.isFile()) paths.push(path)
    }
    return paths
  }
  for (const testId of new Set(run.results.map((result) => result.test_id))) {
    let compilerDirectories
    try {
      for (const directory of [root, join(root, testId)]) {
        if (!(await lstat(directory)).isDirectory())
          throw new Error(`Artifact is not a directory: ${directory}`)
      }
      compilerDirectories = await readdir(join(root, testId))
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      continue
    }
    for (const compiler of compilerDirectories.filter((name) => validIdentifier.test(name))) {
      let names
      try {
        // Reject symlinked parent directories as well as individual files.
        for (const directory of [root, join(root, testId), join(root, testId, compiler)]) {
          if (!(await lstat(directory)).isDirectory())
            throw new Error(`Artifact is not a directory: ${directory}`)
        }
        names = await walk(join(root, testId, compiler))
      } catch (error) {
        if (error.code !== 'ENOENT') throw error
        continue
      }
      for (const path of names) {
        const metadata = artifactMetadata(path)
        const file = join(root, testId, compiler, path)
        const info = await lstat(file)
        if (!info.isFile())
          throw new Error(`Artifact is not a regular file: ${testId}/${compiler}/${path}`)
        if (info.size > maxArtifactBytes)
          throw new Error(`${testId}/${compiler}/${path} exceeds 32 MiB`)
        totalBytes += info.size
        if (totalBytes > maxArtifactRunBytes) throw new Error('Artifact run exceeds 256 MiB')
        const content = textArtifact(await readFile(file))
        if (content === null) continue
        entries.push({
          workflow_run_id: run.workflow_run_id,
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
        })
      }
    }
  }
  return entries
}

const options = args()
if (!/^[0-9a-f]{40}$/.test(options.commit)) throw new Error('Commit must be a full SHA')
if (!/^\d+$/.test(options['workflow-run'])) throw new Error('Workflow run must be numeric')
const attempt = Number(options['run-attempt'] ?? 1)
if (!Number.isSafeInteger(attempt) || attempt < 1)
  throw new Error('Run attempt must be a positive integer')
if ((await stat(resolve(options.results))).size > maxResultsBytes)
  throw new Error('Results exceed 32 MiB')
const document = JSON.parse(await readFile(resolve(options.results), 'utf8'))
const run = {
  workflow_run_id: Number(options['workflow-run']),
  commit: options.commit,
  branch: options.branch || null,
  pr: options.pr ? Number(options.pr) : null,
  title: options.title || null,
  started_at: options.timestamp || new Date().toISOString(),
  workflow_name: options.workflow || 'Benchmark',
  source_schema: 1,
  raw_results: JSON.stringify(document),
}
const results = normalizeResults(document, {
  workflowRunId: run.workflow_run_id,
  commit: run.commit,
})
const artifacts = await normalizeArtifacts(resolve(options.artifacts), { ...run, results })
await enrichSources(run.commit, results).catch((error) =>
  console.warn('Could not enrich historical benchmark sources', error.message),
)
await insert('artifact_blobs', publicationBlobs(artifacts))
await insert('run_snapshots', [publication({ ...run, run_attempt: attempt }, results, artifacts)])
console.log(`Ingested ${run.commit.slice(0, 8)} from workflow run ${run.workflow_run_id}`)
