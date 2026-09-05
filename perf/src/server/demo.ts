import type { ArtifactFile, RunDocument, RunIndex, RunSummary } from '../types'

const commits = [
  '9d8c7b6a5e4f32100123456789abcdef01234567',
  '8c7b6a5e4f32100123456789abcdef0123456789',
  '7b6a5e4f32100123456789abcdef0123456789ab',
]

const metrics = [
  {
    compileTime: 1.18,
    creationSize: 128,
    deployGas: 71_200,
    peakMemory: 5_480_000,
    runtimeGas: 18_430,
    runtimeSize: 96,
  },
  {
    compileTime: 1.11,
    creationSize: 126,
    deployGas: 70_820,
    peakMemory: 5_330_000,
    runtimeGas: 18_120,
    runtimeSize: 94,
  },
  {
    compileTime: 1.07,
    creationSize: 124,
    deployGas: 70_510,
    peakMemory: 5_210_000,
    runtimeGas: 17_960,
    runtimeSize: 92,
  },
]

const summaries: RunSummary[] = commits.map((commit, index) => ({
  benchmarkCount: 2,
  branch: 'main',
  commit,
  metrics: metrics[index],
  pr: null,
  timestamp: `2026-09-0${3 - index}T12:00:00.000Z`,
  title: `Dummy benchmark run ${3 - index}`,
}))

// Small synthetic compiler outputs exercise the viewer without GitHub artifacts.
const artifactContents = new Map<string, string>()
function artifactsFor(commit: string, revision: number) {
  return Object.fromEntries(
    ['demo::factorial', 'demo::fibonacci'].map((benchmark) => {
      const files: ArtifactFile[] = []
      for (const [index, path, language] of [
        [0, 'optimized.yul', 'yul'],
        [1, 'runtime.disasm', 'text'],
        [2, 'abi.json', 'json'],
      ] as const) {
        const storagePath = `${index}.json`
        const outputs = ['solar', 'solc'].map((compiler) => {
          const constant = 40 + revision + (compiler === 'solc' ? 3 : 0)
          const contents =
            path === 'optimized.yul'
              ? `// Synthetic ${benchmark} output\nobject "Demo" {\n  code {\n    let result := add(calldataload(0), ${constant})\n    mstore(0, result)\n    return(0, 32)\n  }\n}\n`
              : path === 'runtime.disasm'
                ? `PUSH1 0x00 CALLDATALOAD PUSH1 0x${constant.toString(16)} ADD PUSH1 0x00 MSTORE PUSH1 0x20 PUSH1 0x00 RETURN`
                : JSON.stringify([
                    {
                      type: 'function',
                      name: benchmark.split('::')[1],
                      inputs: [{ name: 'n', type: 'uint256' }],
                      outputs: [{ name: '', type: 'uint256' }],
                      stateMutability: 'pure',
                    },
                  ])
          artifactContents.set(`${commit}/${benchmark}/${compiler}/${storagePath}`, contents)
          return contents
        })
        files.push({
          path,
          storagePath,
          language,
          label: path,
          bytes: new TextEncoder().encode(outputs[0]).length,
          compilers: ['solar', 'solc'],
        })
      }
      return [benchmark, files]
    }),
  )
}

const documents = new Map<string, RunDocument>(
  summaries.map((summary, revision) => [
    summary.commit,
    {
      artifacts: artifactsFor(summary.commit, revision),
      branch: summary.branch,
      commit: summary.commit,
      pr: summary.pr,
      results: [
        {
          compilers: {
            solar: {
              bytecode_size: summary.metrics.creationSize ?? undefined,
              compile_time_seconds: summary.metrics.compileTime ?? undefined,
              deploy_gas: summary.metrics.deployGas ?? undefined,
              peak_rss_bytes: summary.metrics.peakMemory ?? undefined,
              runtime_size: summary.metrics.runtimeSize ?? undefined,
              status: 'ok',
              total_gas: summary.metrics.runtimeGas ?? undefined,
            },
          },
          description: 'A deterministic local benchmark fixture',
          suite: 'demo',
          test_id: 'demo::factorial',
        },
        {
          compilers: {
            solar: {
              bytecode_size: (summary.metrics.creationSize ?? 0) + 8,
              compile_time_seconds: (summary.metrics.compileTime ?? 0) + 0.12,
              deploy_gas: (summary.metrics.deployGas ?? 0) + 1_240,
              peak_rss_bytes: (summary.metrics.peakMemory ?? 0) + 280_000,
              runtime_size: (summary.metrics.runtimeSize ?? 0) + 6,
              status: 'ok',
              total_gas: (summary.metrics.runtimeGas ?? 0) + 410,
            },
          },
          description: 'A second deterministic local benchmark fixture',
          suite: 'demo',
          test_id: 'demo::fibonacci',
        },
      ],
      schemaVersion: 1,
      timestamp: summary.timestamp,
      title: summary.title,
    },
  ]),
)

const index: RunIndex = {
  runs: summaries,
  schemaVersion: 1,
  updatedAt: '2026-09-03T12:00:00.000Z',
}

export function demoResponse(pathname: string) {
  if (pathname === '/api/health') return Response.json({ source: 'demo' })
  if (pathname === '/api/data/index.json') return Response.json(index)

  const match = /^\/api\/data\/runs\/([0-9a-f]{40})\/run\.json$/.exec(pathname)
  if (match) {
    const run = documents.get(match[1])
    return run ? Response.json(run) : Response.json({ error: 'Run not found' }, { status: 404 })
  }

  const artifact = /^\/api\/data\/runs\/([0-9a-f]{40})\/([^/]+)\/(solar|solc)\/(\d+\.json)$/.exec(
    pathname,
  )
  if (artifact) {
    let benchmark: string
    try {
      benchmark = decodeURIComponent(artifact[2])
    } catch {
      return Response.json({ error: 'Invalid benchmark' }, { status: 400 })
    }
    const contents = artifactContents.get(
      `${artifact[1]}/${benchmark}/${artifact[3]}/${artifact[4]}`,
    )
    return contents === undefined
      ? Response.json({ error: 'Artifact not found' }, { status: 404 })
      : Response.json(contents)
  }

  return null
}
