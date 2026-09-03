import { strToU8, zipSync } from 'fflate'
import { describe, expect, it } from 'vite-plus/test'

import { extractArchive, normalizeArchive, selectRuns } from '../src/server/ingest'

const run = {
  branch: 'main',
  commit: '0123456789abcdef0123456789abcdef01234567',
  pr: null,
  startedAt: '2026-09-03T10:00:00.000Z',
  title: 'Benchmark run',
  workflow: 'Benchmark',
  workflowRunId: 1,
}

describe('GitHub Actions importer', () => {
  it('reserves each worker tick for fresh main runs', () => {
    const makeRun = (id: number) => ({
      conclusion: 'success',
      created_at: '2026-09-03T10:00:00.000Z',
      display_title: 'Benchmark run',
      event: 'push',
      head_branch: 'main',
      head_sha: id.toString(16).padStart(40, '0'),
      id,
      name: 'Benchmark',
    })

    expect(
      selectRuns([1, 2, 3, 4].map(makeRun), [5, 6].map(makeRun), 4).map((run) => run.id),
    ).toEqual([5, 6, 1, 2])
  })

  it('keeps only supported artifact files from an archive', async () => {
    const results = JSON.stringify({
      results: [
        {
          compilers: {
            solar: { runtimeGas: 42, status: 'ok' },
            solc: { runtimeGas: 43, status: 'ok' },
          },
          description: 'Factorial',
          suite: 'micro',
          test_id: 'factorial',
        },
      ],
    })
    const archive = zipSync({
      'artifacts/factorial/solar/mir.mir': strToU8('fn factorial'),
      'artifacts/factorial/solar/not-allowed.txt': strToU8('ignored'),
      'other/results.json': strToU8(results),
    })

    const extracted = await extractArchive(new Response(archive))
    const normalized = normalizeArchive(extracted, run)

    expect(extracted.artifacts).toEqual(
      new Map([['artifacts/factorial/solar/mir.mir', 'fn factorial']]),
    )
    expect(normalized.artifacts).toMatchObject([
      { bytes: 12, compiler: 'solar', path: 'mir.mir', test_id: 'factorial' },
    ])
    expect(normalized.results).toMatchObject([
      { compiler: 'solar', status: 'ok', total_gas: 42 },
      { compiler: 'solc', status: 'ok', total_gas: 43 },
    ])
  })

  it('rejects archives without benchmark results', async () => {
    const archive = zipSync({ 'artifacts/factorial/solar/mir.mir': strToU8('fn factorial') })

    await expect(extractArchive(new Response(archive))).rejects.toThrow('no results.json')
  })
})
