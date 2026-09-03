import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { createApi } from '../src/server/api'
import { clickHouseConfig } from '../src/server/clickhouse'

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
  it('reports when ClickHouse is not configured', async () => {
    const response = await createApi({ clickHouse: null }).request('http://web.test/api/health')

    expect(response.status).toBe(503)
    await expect(response.json()).resolves.toEqual({ source: 'unconfigured' })
  })

  it('reports ClickHouse when configured', async () => {
    const response = await createApi({ clickHouse: config }).request('http://web.test/api/health')

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ source: 'clickhouse' })
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
        `${JSON.stringify(
          query.includes('FROM benchmark_results')
            ? {
                benchmarkCount: 1,
                bytecode_size: 12,
                compile_time: 1.5,
                deploy_gas: 23,
                peak_rss_bytes: 34,
                runtime_size: 45,
                total_gas: 56,
                workflow_run_id: 1,
              }
            : {
                branch: 'main',
                commit: '0123456789abcdef0123456789abcdef01234567',
                pr: null,
                timestamp: '2026-09-03 10:00:00',
                title: 'Benchmark run',
                workflow_run_id: 1,
              },
        )}\n`,
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
          metrics: { runtimeGas: 56, runtimeSize: 45 },
        },
      ],
      schemaVersion: 1,
    })
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(queries[0]).toContain('LIMIT 2_000')
    expect(queries[1]).toContain('WHERE workflow_run_id IN (1)')
  })

  it('imports a missing run before responding to the client', async () => {
    const sha = '0123456789abcdef0123456789abcdef01234567'
    let imported = false
    const importRun = vi.fn(async () => {
      imported = true
    })
    const fetch = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const query = typeof init?.body === 'string' ? init.body : ''
      if (query.includes('FROM runs')) {
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
      if (query.includes('FROM runs')) {
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
      if (query.includes('SELECT workflow_run_id FROM runs')) {
        return new Response(`${JSON.stringify({ workflow_run_id: 1 })}\n`)
      }
      return new Response(`${JSON.stringify({ content: 'fn factorial' })}\n`)
    })

    const response = await createApi({ clickHouse: config }).request(
      `http://web.test/api/data/runs/${sha}/factorial/solar/2.json`,
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toBe('fn factorial')
    expect(queries).toHaveLength(2)
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
})
