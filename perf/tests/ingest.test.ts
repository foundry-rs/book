import { strToU8, zipSync } from 'fflate'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { extractArchive, ingestRecent, normalizeArchive, selectRuns } from '../src/server/ingest'
import { artifactMetadata, textArtifact, validArtifactPath } from '../src/server/artifacts'

const run = {
  branch: 'main',
  commit: '0123456789abcdef0123456789abcdef01234567',
  pr: null,
  startedAt: '2026-09-03T10:00:00.000Z',
  title: 'Benchmark run',
  workflow: 'Benchmark',
  workflowRunId: 1,
}

afterEach(() => vi.unstubAllGlobals())

describe('GitHub Actions importer', () => {
  it('excludes cooling-down runs before allocating the worker batch', async () => {
    const queries: string[] = []
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input, init) => {
        const url = String(input)
        if (url.startsWith('https://clickhouse.example')) {
          const sql = String(init?.body)
          queries.push(sql)
          return new Response(
            sql.includes('UNION DISTINCT')
              ? [1, 2, 3, 4]
                  .map((workflow_run_id) => JSON.stringify({ workflow_run_id }))
                  .join('\n')
              : '',
          )
        }
        if (url.includes('/actions/workflows/'))
          return Response.json({
            workflow_runs: [1, 2, 3, 4, 5, 6].map((id) => ({
              id,
              conclusion: 'success',
              event: 'push',
              head_branch: 'main',
              head_sha: id.toString(16).padStart(40, '0'),
              created_at: run.startedAt,
            })),
          })
        if (url.includes('/artifacts?')) return Response.json({ artifacts: [] })
        return Response.json([])
      }),
    )
    const result = await ingestRecent({
      CLICKHOUSE_HOST: 'https://clickhouse.example',
      GITHUB_TOKEN: 'test',
    })
    expect(result).toEqual({ scanned: 2, imported: 0, failed: [5, 6] })
    expect(queries.find((sql) => sql.includes('UNION DISTINCT'))).toContain(
      "state = 'retry' AND next_attempt_at > now64(3)",
    )
  })
  it('does not publish an empty or unsupported results document', () => {
    expect(() =>
      normalizeArchive({ artifacts: new Map(), results: '{"results":[]}' }, run),
    ).toThrow('no supported results')
  })
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

  it('discovers arbitrary nested text files and compiler directories', async () => {
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
      'artifacts/factorial/new-compiler/passes/new phase.log': strToU8('new output'),
      'artifacts/factorial/solar/image.bin': new Uint8Array([0, 255, 1]),
      'artifacts/factorial/solar/../escape.txt': strToU8('ignored'),
      'results.json': strToU8(results),
      'baseline/results.json': strToU8('{"results":[]}'),
    })

    const extracted = await extractArchive(new Response(archive))
    const normalized = normalizeArchive(extracted, run)

    expect(extracted.artifacts).toEqual(
      new Map([
        ['artifacts/factorial/solar/mir.mir', 'fn factorial'],
        ['artifacts/factorial/new-compiler/passes/new phase.log', 'new output'],
      ]),
    )
    expect(normalized.artifacts).toMatchObject([
      { bytes: 12, compiler: 'solar', path: 'mir.mir', test_id: 'factorial' },
      {
        compiler: 'new-compiler',
        path: 'passes/new phase.log',
        storage_path: artifactMetadata('passes/new phase.log').storagePath,
        language: 'text',
      },
    ])
    expect(normalized.results).toMatchObject([
      { compiler: 'solar', status: 'ok', total_gas: 42 },
      { compiler: 'solc', status: 'ok', total_gas: 43 },
    ])
  })

  it('selects results and artifacts from the same wrapped directory', async () => {
    const archive = zipSync({
      'report/results.json': strToU8('[]'),
      'report/artifacts/test/solar/nested/a.json': strToU8('{}'),
      'report/baseline/results.json': strToU8('[1]'),
      'report/baseline/artifacts/test/solar/nested/a.json': strToU8('wrong'),
    })
    const extracted = await extractArchive(new Response(archive))
    expect(extracted.results).toBe('[]')
    expect([...extracted.artifacts.values()]).toEqual(['{}'])
  })

  it('rejects ambiguous result roots and unsafe paths', async () => {
    await expect(
      extractArchive(
        new Response(
          zipSync({
            'a/results.json': strToU8('[]'),
            'b/results.json': strToU8('[]'),
          }),
        ),
      ),
    ).rejects.toThrow('ambiguous')
    for (const path of ['../x', '/x', 'a//b', 'a/./b', 'a\\b'])
      expect(validArtifactPath(path)).toBe(false)
    expect(validArtifactPath("passes/phase #2 (α)'s output.log")).toBe(true)
    expect(textArtifact(new Uint8Array([0xff]))).toBeNull()
    expect(artifactMetadata('constructor').language).toBe('text')
    expect(() =>
      normalizeArchive(
        {
          artifacts: new Map(),
          results: JSON.stringify([{ test_id: '..', solar: { status: 'ok' } }]),
        },
        run,
      ),
    ).toThrow('no supported results')
    expect(artifactMetadata('a/file.json').storagePath).not.toBe(
      artifactMetadata('b/file.json').storagePath,
    )
  })

  it('normalizes legacy arrays, nested results, metric aliases and new compiler names', () => {
    for (const document of [
      [{ id: 'test', solar: { compileTime: 1, runtimeGas: 2, status: 'ok' } }],
      {
        results: [
          {
            name: 'test',
            compilers: { experimental: { compile_time_seconds: 1, total_gas: 2, status: 'ok' } },
          },
        ],
      },
    ]) {
      const normalized = normalizeArchive(
        { artifacts: new Map(), results: JSON.stringify(document) },
        run,
      )
      expect(normalized.results[0]).toMatchObject({
        test_id: 'test',
        compile_time_seconds: 1,
        total_gas: 2,
      })
    }
  })

  it('rejects archives without benchmark results', async () => {
    const archive = zipSync({ 'artifacts/factorial/solar/mir.mir': strToU8('fn factorial') })

    await expect(extractArchive(new Response(archive))).rejects.toThrow('no results.json')
    await expect(
      extractArchive(new Response(zipSync({ 'baseline/results.json': strToU8('[]') }))),
    ).rejects.toThrow('no results.json')
  })
})
