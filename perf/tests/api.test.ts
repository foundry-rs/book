import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { createApi } from '../src/server/api'
import { clickHouseConfig } from '../src/server/clickhouse'
import vercelDemo from '../src/server/vercel-demo'
import { artifactMetadata } from '../src/server/artifacts'

const config = {
  database: 'solar_perf',
  host: 'https://clickhouse.example',
  password: '',
  user: 'solar_web',
}

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe('website API', () => {
  it('returns source links with the existing run query, without GitHub calls', async () => {
    const commit = 'd'.repeat(40)
    const url = `https://github.com/paradigmxyz/solar/blob/${commit}/testdata/Counter.sol`
    globalThis.fetch = vi.fn(async () =>
      Response.json({
        commit,
        measurements: [['counter', '', 'micro', 'solar', 'ok']],
        source_links: { counter: [['Counter.sol', url]] },
      }),
    )
    const response = await createApi({ clickHouse: config }).request(
      `/api/data/runs/${commit}/run.json?artifacts=0`,
    )
    expect(response.status).toBe(200)
    expect((await response.json()).results[0].source_links).toEqual([{ label: 'Counter.sol', url }])
    expect(globalThis.fetch).toHaveBeenCalledOnce()
  })

  it('resolves published prefixes with one bounded query without GitHub', async () => {
    const commit = 'a'.repeat(40)
    globalThis.fetch = vi.fn(async () => Response.json({ commit }))
    const resolveRef = vi.fn(async () => commit)
    const app = createApi({ clickHouse: config, resolveRef })
    expect(await (await app.request('/api/resolve?ref=aaaaaaa')).json()).toEqual({ commit })
    expect(resolveRef).not.toHaveBeenCalled()
    expect(globalThis.fetch).toHaveBeenCalledOnce()
    expect(vi.mocked(globalThis.fetch).mock.calls[0][1]?.body).toContain('LIMIT 2')
  })

  it('coalesces origin blob reads and retains empty contents without caching missing blobs', async () => {
    globalThis.fetch = vi.fn(async () => Response.json({ content: '' }))
    const app = createApi({ clickHouse: config })
    const path = `/api/data/blobs/${'a'.repeat(64)}.json`
    const responses = await Promise.all([app.request(path), app.request(path)])
    expect(await responses[0].json()).toBe('')
    expect(await responses[1].json()).toBe('')
    expect(globalThis.fetch).toHaveBeenCalledOnce()
    await app.request(path)
    expect(globalThis.fetch).toHaveBeenCalledOnce()
    globalThis.fetch = vi.fn(async () => new Response(''))
    const absent = `/api/data/blobs/${'b'.repeat(64)}.json`
    expect((await app.request(absent)).status).toBe(404)
    expect((await app.request(absent)).status).toBe(404)
    expect(globalThis.fetch).toHaveBeenCalledTimes(2)
  })

  it('serves scoped viewer descriptors with compiler content hashes in one query', async () => {
    const commits = ['a'.repeat(40), 'b'.repeat(40)]
    const revision = 'c'.repeat(64)
    const hash = 'd'.repeat(64)
    globalThis.fetch = vi.fn(async (_input, init) => {
      const sql = init?.body
      expect(sql).toContain('arrayFilter(f -> f.test_id = {benchmark:String}, artifacts)')
      expect(sql).toContain(`revision = '${revision}'`)
      return new Response(
        commits
          .map((commit) =>
            JSON.stringify({
              commit,
              revision,
              measurements: [['counter', '', '', 'solar', 'ok']],
              artifacts: [['counter', 'output.json', 'solar', 10, hash, '1.json']],
            }),
          )
          .join('\n'),
      )
    })
    const app = createApi({ clickHouse: config })
    const response = await app.request(
      `/api/data/viewer.json?commits=${commits.join(',')}&revisions=${revision},${revision}&benchmark=counter`,
    )
    expect(response.status).toBe(200)
    const { runs } = await response.json()
    expect(runs).toHaveLength(2)
    expect(runs[0].artifacts.counter[0].contentHashes.solar).toBe(hash)
    expect(globalThis.fetch).toHaveBeenCalledOnce()
    expect((await app.request(`/api/data/viewer.json?commits=${commits.join(',')}`)).status).toBe(
      400,
    )
    expect(
      (
        await app.request(
          `/api/data/runs.json?commits=${commits[0]},${commits[0]}&revisions=${revision},${hash}`,
        )
      ).status,
    ).toBe(400)
  })

  it('does not import or fall back when a pinned revision is missing', async () => {
    globalThis.fetch = vi.fn(async () => new Response(''))
    const importRun = vi.fn(async () => undefined)
    const app = createApi({ clickHouse: config, importRun })
    const response = await app.request(
      `/api/data/runs/${'a'.repeat(40)}/run.json?revision=${'b'.repeat(64)}`,
    )
    expect(response.status).toBe(404)
    expect(importRun).not.toHaveBeenCalled()
    expect(globalThis.fetch).toHaveBeenCalledOnce()
  })

  it('serves immutable blob contents without querying manifests', async () => {
    globalThis.fetch = vi.fn(async () => Response.json({ content: 'body' }))
    const response = await createApi({ clickHouse: config }).request(
      `/api/data/blobs/${'a'.repeat(64)}.json`,
    )
    expect(await response.json()).toBe('body')
    expect(response.headers.get('cache-control')).toContain('immutable')
    expect(globalThis.fetch).toHaveBeenCalledOnce()
    expect(vi.mocked(globalThis.fetch).mock.calls[0][1]?.body).not.toContain('run_snapshots')
  })

  it('loads both comparison runs and nullable measurements in one query', async () => {
    const commits = ['a'.repeat(40), 'b'.repeat(40)]
    globalThis.fetch = vi.fn(
      async () =>
        new Response(
          commits
            .map((commit) =>
              JSON.stringify({
                commit,
                workflow_run_id: 1,
                measurements: [
                  [
                    'test',
                    'Description',
                    'micro',
                    'future',
                    'ok',
                    0,
                    null,
                    12,
                    null,
                    0,
                    100,
                    'future 1.0',
                  ],
                ],
              }),
            )
            .join('\n'),
        ),
    )
    const app = createApi({ clickHouse: config })
    const response = await app.request(`/api/data/runs.json?commits=${commits.join(',')}`)
    expect(response.status).toBe(200)
    const { runs } = await response.json()
    expect(runs.map((run: { commit: string }) => run.commit)).toEqual(commits)
    expect(runs[0].results[0].compilers.future).toMatchObject({
      compile_time_seconds: 0,
      bytecode_size: null,
      runtime_size: 12,
      total_gas: 0,
      label: 'future 1.0',
    })
    expect(runs[0].artifacts).toEqual({})
    expect(globalThis.fetch).toHaveBeenCalledOnce()
    expect(vi.mocked(globalThis.fetch).mock.calls[0][1]?.body).not.toContain('raw_results')
    expect(response.headers.get('server-timing')).toContain('1 queries')
    expect(response.headers.get('server-timing')).not.toContain('sql;')
    for (const query of ['', 'oops', `${commits.join(',')},${commits[0]}`]) {
      expect((await app.request(`/api/data/runs.json?commits=${query}`)).status).toBe(400)
    }
    expect(globalThis.fetch).toHaveBeenCalledOnce()
  })

  it('imports only the missing batch side and rereads only that side', async () => {
    const commits = ['a'.repeat(40), 'b'.repeat(40)]
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce(Response.json({ commit: commits[0], workflow_run_id: 1 }))
      .mockResolvedValueOnce(Response.json({ commit: commits[1], workflow_run_id: 2 }))
    const importRun = vi.fn(async () => undefined)
    const response = await createApi({ clickHouse: config, importRun }).request(
      `/api/data/runs.json?commits=${commits.join(',')}`,
    )
    expect(response.status).toBe(200)
    expect(importRun).toHaveBeenCalledExactlyOnceWith(commits[1])
    const sql = vi.mocked(globalThis.fetch).mock.calls[1][1]?.body
    expect(sql).toContain(commits[1])
    expect(sql).not.toContain(commits[0])
  })

  it('does not CDN-cache failed reads and binds benchmark names rather than interpolating SQL', async () => {
    const benchmark = "a' OR 1=1 --"
    globalThis.fetch = vi.fn(async (input, init) => {
      expect(String(init?.body)).not.toContain(benchmark)
      expect((input as URL).searchParams.get('param_benchmark')).toBe(benchmark)
      return new Response('unavailable', { status: 503 })
    })
    const response = await createApi({ clickHouse: config }).request(
      `/api/data/history.json?metric=total_gas&benchmark=${encodeURIComponent(benchmark)}`,
    )
    expect(response.status).toBe(503)
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(response.headers.get('vercel-cdn-cache-control')).toBeNull()
  })
  it('resolves refs without database queries and validates its boundary', async () => {
    globalThis.fetch = vi.fn()
    const resolveRef = vi.fn(async () => 'a'.repeat(40))
    const app = createApi({ clickHouse: config, resolveRef })
    const response = await app.request('/api/resolve?ref=Release%2Fv1')
    expect(await response.json()).toEqual({ commit: 'a'.repeat(40) })
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(resolveRef).toHaveBeenCalledWith('Release/v1')
    expect((await app.request('/api/resolve?ref=')).status).toBe(400)
    expect((await app.request(`/api/resolve?ref=${'b'.repeat(40)}`)).status).toBe(200)
    expect(resolveRef).toHaveBeenCalledOnce()
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })
  it('deduplicates and briefly caches mutable ref resolution without caching failures', async () => {
    const resolveRef = vi.fn(async () => 'a'.repeat(40))
    const app = createApi({ clickHouse: config, resolveRef })
    await Promise.all([app.request('/api/resolve?ref=main'), app.request('/api/resolve?ref=main')])
    await app.request('/api/resolve?ref=main')
    expect(resolveRef).toHaveBeenCalledOnce()
    resolveRef.mockRejectedValueOnce(new Error('temporary'))
    expect((await app.request('/api/resolve?ref=other')).status).toBe(503)
    expect((await app.request('/api/resolve?ref=other')).status).toBe(200)
    expect(resolveRef).toHaveBeenCalledTimes(3)
  })
  it('skips manifests for comparisons and loads them independently in one query', async () => {
    const sha = 'a'.repeat(40)
    const queries: string[] = []
    globalThis.fetch = vi.fn(async (_input, init) => {
      const sql = String(init?.body)
      queries.push(sql)
      return new Response(
        sql.includes('FROM run_snapshots')
          ? JSON.stringify({ workflow_run_id: 1, commit: sha, artifacts: [] })
          : '',
      )
    })
    const app = createApi({ clickHouse: config })
    const run = await app.request(`/api/data/runs/${sha}/run.json?artifacts=0`)
    expect(run.status).toBe(200)
    expect(queries).toHaveLength(1)
    expect(queries.join('\n')).not.toContain('artifact_files')
    const manifest = await app.request(`/api/data/runs/${sha}/artifacts.json`)
    expect(manifest.status).toBe(200)
    expect(queries).toHaveLength(2)
    expect(queries[1]).toContain('FROM run_snapshots FINAL')
    expect(queries[1]).not.toContain('content')
  })
  it('loads bounded per-benchmark history without summing or reading artifacts', async () => {
    const queries: string[] = []
    globalThis.fetch = vi.fn(async (_url, options) => {
      const sql = String(options?.body)
      queries.push(sql)
      const rows = [
        { commit: 'a'.repeat(40), timestamp: '2026-09-07T00:00:00Z', test_id: 'small', value: 12 },
        { commit: 'b'.repeat(40), timestamp: '2026-09-06T00:00:00Z', test_id: '', value: null },
      ]
      return new Response(rows.map((row) => JSON.stringify(row)).join('\n'))
    })
    const app = createApi({ clickHouse: config })
    const response = await app.request('/api/data/history.json?benchmark=small&metric=total_gas')
    expect(response.status).toBe(200)
    const { runs, values } = await response.json()
    expect(runs).toHaveLength(2)
    expect(values).toEqual({ small: [12, null] })
    expect(queries).toHaveLength(1)
    expect(queries[0]).toContain("branch = 'main'")
    expect(queries[0]).toContain('LIMIT 60')
    expect(queries[0]).toContain("compiler = 'solar'")
    expect(queries[0]).toContain('test_id = {benchmark:String}')
    expect(queries[0]).not.toMatch(/compile_time_seconds|peak_rss_bytes/)
    expect(
      (vi.mocked(globalThis.fetch).mock.calls[0][0] as URL).searchParams.get('param_benchmark'),
    ).toBe('small')
    expect(queries.join(' ')).not.toMatch(/sumIf|artifact_files/)
    expect(response.headers.get('server-timing')).toContain('1 queries')
    expect(response.headers.get('vercel-cdn-cache-control')).toContain('s-maxage=60')
    expect((await app.request('/api/data/history.json?metric=oops')).status).toBe(400)
    expect(queries).toHaveLength(1)
  })

  it('serves per-benchmark demo history', async () => {
    const response = await createApi({ demoFallback: true }).request(
      '/api/data/history.json?benchmark=demo%3A%3Afactorial&metric=runtime_size',
    )
    const { runs, values } = await response.json()
    expect(runs).toHaveLength(3)
    expect(values).toEqual({ 'demo::factorial': [96, 94, 92] })
    expect(runs[0].results).toBeUndefined()
    expect(runs[0].artifacts).toBeUndefined()
  })
  it('serves distinct demo artifacts for commit and compiler comparisons', async () => {
    const commits = [
      '9d8c7b6a5e4f32100123456789abcdef01234567',
      '8c7b6a5e4f32100123456789abcdef0123456789',
    ]
    const contents = await Promise.all(
      [
        [commits[0], 'solar'],
        [commits[1], 'solar'],
        [commits[0], 'solc'],
      ].map(async ([commit, compiler]) => {
        const response = vercelDemo(
          new Request(
            `https://web.test/api/data/runs/${commit}/demo%3A%3Afactorial/${compiler}/0.json`,
          ),
        )
        expect(response.status).toBe(200)
        return response.json()
      }),
    )
    expect(new Set(contents).size).toBe(3)
    expect(contents.every((content) => content.includes('Synthetic demo::factorial'))).toBe(true)
  })

  it("serves demo data through Vercel's rewritten API route", async () => {
    const response = vercelDemo(new Request('https://web.test/api?__perf_path=data/index.json'))

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      runs: expect.arrayContaining([expect.objectContaining({ title: 'Dummy benchmark run 3' })]),
    })
  })

  it('reports when ClickHouse is not configured', async () => {
    const response = await createApi({ clickHouse: null }).request('http://web.test/api/health')

    expect(response.status).toBe(503)
    await expect(response.json()).resolves.toEqual({ source: 'unconfigured' })
  })

  it('reports ClickHouse when configured', async () => {
    globalThis.fetch = vi.fn(async () => new Response(''))
    const response = await createApi({ clickHouse: config }).request('http://web.test/api/health')

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ source: 'clickhouse' })
    expect(globalThis.fetch).toHaveBeenCalledTimes(2)
  })

  it('reports unhealthy when database credentials or schema fail', async () => {
    globalThis.fetch = vi.fn(async () => new Response('denied', { status: 403 }))
    const response = await createApi({ clickHouse: config }).request('http://web.test/api/health')
    expect(response.status).toBe(503)
    expect(response.headers.get('cache-control')).toBe('no-store')
    await expect(response.json()).resolves.toEqual({
      source: 'clickhouse',
      error: 'Database unavailable',
    })
  })

  it('makes demo rollback independent of configured database credentials', async () => {
    globalThis.fetch = vi.fn()
    const ingestRecent = vi.fn()
    const app = createApi({
      clickHouse: config,
      demoFallback: true,
      cronSecret: 'secret',
      ingestRecent,
    })
    const index = await app.request('http://web.test/api/data/index.json')
    expect((await index.json()).runs[0].title).toBe('Dummy benchmark run 3')
    const tick = await app.request('http://web.test/api/worker/tick', {
      headers: { authorization: 'Bearer secret' },
    })
    await expect(tick.json()).resolves.toEqual({ skipped: 'demo' })
    expect(ingestRecent).not.toHaveBeenCalled()
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('serves deterministic demo data when the temporary fallback is enabled', async () => {
    const app = createApi({ clickHouse: null, demoFallback: true })

    const health = await app.request('http://web.test/api/health')
    const index = await app.request('http://web.test/api/data/index.json')

    expect(health.status).toBe(200)
    await expect(health.json()).resolves.toEqual({ source: 'demo' })
    const data = await index.json()
    expect(data).toMatchObject({ schemaVersion: 1 })
    expect(data.runs[0]).toMatchObject({
      commit: '9d8c7b6a5e4f32100123456789abcdef01234567',
      title: 'Dummy benchmark run 3',
    })
  })

  it('protects and runs the import worker through Hono', async () => {
    const ingestRecent = vi.fn(async () => ({ imported: 1 }))
    const app = createApi({ cronSecret: 'secret', ingestRecent })

    const unauthorized = await app.request('http://web.test/api/worker/tick')
    const authorized = await app.request('http://web.test/api/worker/tick', {
      headers: { authorization: 'Bearer secret' },
    })

    expect(unauthorized.status).toBe(401)
    expect(authorized.status).toBe(200)
    await expect(authorized.json()).resolves.toEqual({ imported: 1 })
    expect(ingestRecent).toHaveBeenCalledOnce()
  })

  it('does not expose data without ClickHouse', async () => {
    const response = await createApi({ clickHouse: null }).request(
      'http://web.test/api/data/runs/0123456789abcdef0123456789abcdef01234567/run.json',
    )

    expect(response.status).toBe(503)
  })

  it('uses read credentials for public requests', () => {
    expect(
      clickHouseConfig({
        CLICKHOUSE_HOST: 'clickhouse.example',
        CLICKHOUSE_WRITE_USER: 'writer',
        CLICKHOUSE_READ_PASSWORD: 'read-password',
        CLICKHOUSE_READ_USER: 'reader',
      }),
    ).toMatchObject({ password: 'read-password', user: 'reader' })
  })

  it('serves a bounded index from ClickHouse', async () => {
    const queries: string[] = []
    const fetch = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const query = typeof init?.body === 'string' ? init.body : ''
      queries.push(query)
      return new Response(
        `${JSON.stringify({
          benchmarkCount: 1,
          branch: 'main',
          commit: '0123456789abcdef0123456789abcdef01234567',
          pr: null,
          timestamp: '2026-09-03 10:00:00',
          title: 'Benchmark run',
          workflow_run_id: 1,
        })}\n`,
      )
    })
    globalThis.fetch = fetch

    const response = await createApi({ clickHouse: config }).request(
      'http://web.test/api/data/index.json',
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toContain('max-age=60')
    await expect(response.json()).resolves.toMatchObject({
      runs: [
        {
          commit: '0123456789abcdef0123456789abcdef01234567',
          benchmarkCount: 1,
        },
      ],
      schemaVersion: 1,
    })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(queries[0]).toContain('LIMIT 12')
    expect(queries[0]).toContain('AS baseCommit')
    expect(queries[0]).toContain('AS totalMainRuns')
    expect(queries[0]).toContain('LIMIT 1 BY commit')
    expect(queries[0]).toContain("'%Y-%m-%dT%H:%i:%SZ', 'UTC'")
    expect(queries[0]).toContain('benchmark_count AS benchmarkCount')
    expect(queries[0]).not.toMatch(/sumIf|maxIf|compile_time_seconds|peak_rss_bytes/)
  })

  it('imports a missing run before responding to the client', async () => {
    const sha = '0123456789abcdef0123456789abcdef01234567'
    let imported = false
    const importRun = vi.fn(async () => {
      imported = true
    })
    const fetch = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const query = typeof init?.body === 'string' ? init.body : ''
      if (query.includes('FROM run_snapshots')) {
        return new Response(
          imported
            ? `${JSON.stringify({
                branch: 'feature',
                commit: sha,
                pr: 123,
                timestamp: '2026-09-03 10:00:00',
                title: 'Benchmark run',
                workflow_run_id: 1,
              })}\n`
            : '',
        )
      }
      return new Response('')
    })
    globalThis.fetch = fetch

    const response = await createApi({ clickHouse: config, importRun }).request(
      `http://web.test/api/data/runs/${sha}/run.json`,
    )

    expect(response.status).toBe(200)
    expect(importRun).toHaveBeenCalledWith(sha)
    await expect(response.json()).resolves.toMatchObject({ commit: sha, schemaVersion: 1 })
  })

  it('shares one import between concurrent requests for a missing run', async () => {
    const sha = '0123456789abcdef0123456789abcdef01234567'
    let imported = false
    let finishImport: (() => void) | undefined
    const importRun = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishImport = () => {
            imported = true
            resolve()
          }
        }),
    )
    globalThis.fetch = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const query = typeof init?.body === 'string' ? init.body : ''
      if (query.includes('FROM run_snapshots')) {
        return new Response(
          imported
            ? `${JSON.stringify({
                branch: 'feature',
                commit: sha,
                pr: 123,
                timestamp: '2026-09-03 10:00:00',
                title: 'Benchmark run',
                workflow_run_id: 1,
              })}\n`
            : '',
        )
      }
      return new Response('')
    })
    const app = createApi({ clickHouse: config, importRun })

    const first = app.request(`http://web.test/api/data/runs/${sha}/run.json`)
    const second = app.request(`http://web.test/api/data/runs/${sha}/run.json`)
    await vi.waitFor(() => expect(importRun).toHaveBeenCalledOnce())
    finishImport?.()

    const responses = await Promise.all([first, second])
    expect(responses.map((response) => response.status)).toEqual([200, 200])
  })

  it('loads an artifact without rebuilding its run document', async () => {
    const sha = '0123456789abcdef0123456789abcdef01234567'
    const queries: string[] = []
    globalThis.fetch = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const query = typeof init?.body === 'string' ? init.body : ''
      queries.push(query)
      if (
        !query.includes('FROM artifact_files') &&
        query.includes('SELECT workflow_run_id FROM runs')
      ) {
        return new Response(`${JSON.stringify({ workflow_run_id: 1 })}\n`)
      }
      return new Response(`${JSON.stringify({ content: 'fn factorial' })}\n`)
    })

    const response = await createApi({ clickHouse: config }).request(
      `http://web.test/api/data/runs/${sha}/factorial/solar/2.json`,
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toBe('fn factorial')
    expect(queries).toHaveLength(1)
    expect(response.headers.get('cache-control')).toBe(
      'public, max-age=3600, stale-while-revalidate=86400',
    )
    expect(queries.join('\n')).not.toContain('FROM benchmark_results')
    expect(queries.join('\n')).not.toContain('GROUP BY test_id')
  })

  it('rejects paths outside the public data layout', async () => {
    const fetch = vi.fn()
    globalThis.fetch = fetch

    const response = await createApi({ clickHouse: config }).request(
      'http://web.test/api/data/not-a-run.json',
    )

    expect(response.status).toBe(404)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('resolves path hashes for new compiler names and legacy stored files', async () => {
    const storagePath = artifactMetadata('nested/new output.log').storagePath
    const queries: string[] = []
    globalThis.fetch = vi.fn(async (_input, init) => {
      const query = String(init?.body)
      queries.push(query)
      return new Response(
        JSON.stringify(
          query.includes('FROM artifact_blobs')
            ? { content: 'new output' }
            : { workflow_run_id: 1 },
        ),
      )
    })
    const response = await createApi({ clickHouse: config }).request(
      `http://web.test/api/data/runs/${'a'.repeat(40)}/test/experimental/${storagePath}`,
    )
    expect(response.status).toBe(200)
    expect(await response.json()).toBe('new output')
    expect(queries).toHaveLength(1)
    expect(queries[0]).toContain('lower(hex(SHA256(f.path)))')
    expect(queries[0]).toContain("f.compiler = 'experimental'")
  })
})
