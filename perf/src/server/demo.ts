import type { RunDocument, RunIndex, RunSummary } from '../types'

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

const documents = new Map<string, RunDocument>(
  summaries.map((summary) => [
    summary.commit,
    {
      artifacts: {},
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

  return null
}
