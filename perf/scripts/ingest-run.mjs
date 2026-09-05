import { createHash } from 'node:crypto'
import { lstat, readFile, readdir, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'

import { insert } from './lib/clickhouse.mjs'

const artifactFiles = new Map([
  ['input.json', ['Compiler input', 'json', '0.json']],
  ['output.json', ['Compiler output', 'json', '1.json']],
  ['mir.mir', ['MIR', 'text', '2.json']],
  ['creation.evmir', ['Creation EVM IR', 'text', '3.json']],
  ['runtime.evmir', ['Runtime EVM IR', 'text', '4.json']],
  ['optimized-ir.yul', ['Optimized Yul IR', 'solidity', '5.json']],
  ['creation.disasm', ['Creation disassembly', 'asm', '6.json']],
  ['runtime.disasm', ['Runtime disassembly', 'asm', '7.json']],
  ['creation.hex', ['Creation bytecode', 'text', '8.json']],
  ['runtime.hex', ['Runtime bytecode', 'text', '9.json']],
])
const maxResultsBytes = 32 * 1024 * 1024
const maxResults = 500
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

function number(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function resultId(result) {
  const value = result.test_id ?? result.id ?? result.name
  return typeof value === 'string' && /^[\w.-]+$/.test(value) ? value : null
}

function compilerResults(result) {
  if (result.compilers && typeof result.compilers === 'object') return result.compilers
  return Object.fromEntries(
    ['solar', 'solc'].flatMap((name) => (result[name] ? [[name, result[name]]] : [])),
  )
}

function normalizeResults(document, run) {
  const results = Array.isArray(document) ? document : document.results
  if (!Array.isArray(results)) throw new Error('Benchmark results must be an array')
  if (results.length > maxResults) throw new Error('Benchmark results exceed 500 entries')
  return results.flatMap((result) => {
    const testId = resultId(result)
    if (!testId) return []
    return Object.entries(compilerResults(result)).flatMap(([compiler, metrics]) => {
      if (!metrics || typeof metrics !== 'object') return []
      return [
        {
          workflow_run_id: run.workflow_run_id,
          commit: run.commit,
          test_id: testId,
          description: typeof result.description === 'string' ? result.description : '',
          suite: typeof result.suite === 'string' ? result.suite : 'unknown',
          compiler,
          status: typeof metrics.status === 'string' ? metrics.status : 'unknown',
          compile_time_seconds: number(metrics.compile_time_seconds ?? metrics.compileTime),
          bytecode_size: number(metrics.bytecode_size ?? metrics.bytecodeSize),
          runtime_size: number(metrics.runtime_size ?? metrics.runtimeSize),
          deploy_gas: number(metrics.deploy_gas ?? metrics.deployGas),
          total_gas: number(metrics.total_gas ?? metrics.runtimeGas),
          peak_rss_bytes: number(metrics.peak_rss_bytes ?? metrics.peakMemory),
        },
      ]
    })
  })
}

async function normalizeArtifacts(root, run) {
  const entries = []
  let totalBytes = 0
  for (const testId of new Set(run.results.map((result) => result.test_id))) {
    for (const compiler of ['solar', 'solc']) {
      let names
      try {
        names = await readdir(join(root, testId, compiler))
      } catch {
        continue
      }
      for (const path of names) {
        const metadata = artifactFiles.get(path)
        if (!metadata) continue
        const file = join(root, testId, compiler, path)
        const info = await lstat(file)
        if (!info.isFile())
          throw new Error(`Artifact is not a regular file: ${testId}/${compiler}/${path}`)
        if (info.size > maxArtifactBytes)
          throw new Error(`${testId}/${compiler}/${path} exceeds 32 MiB`)
        totalBytes += info.size
        if (totalBytes > maxArtifactRunBytes) throw new Error('Artifact run exceeds 256 MiB')
        const content = await readFile(file, 'utf8')
        entries.push({
          workflow_run_id: run.workflow_run_id,
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
        })
      }
    }
  }
  return entries
}

const options = args()
if (!/^[0-9a-f]{40}$/.test(options.commit)) throw new Error('Commit must be a full SHA')
if (!/^\d+$/.test(options['workflow-run'])) throw new Error('Workflow run must be numeric')
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
const results = normalizeResults(document, run)
const artifacts = await normalizeArtifacts(resolve(options.artifacts), { ...run, results })
await insert('benchmark_results', results)
await insert('artifact_files', artifacts)
await insert('runs', [run])
console.log(`Ingested ${run.commit.slice(0, 8)} from workflow run ${run.workflow_run_id}`)
