import { createServer } from 'node:http'
import { gzipSync } from 'node:zlib'
import { expect, it } from 'vite-plus/test'
import { insert, select } from '../src/server/clickhouse'
import { requestTiming } from '../src/server/timing'
import { publication } from '../src/server/publication'

it('sends snapshot tuple arrays with the matching ClickHouse input setting', async () => {
  let received: unknown
  const server = createServer(async (request, response) => {
    const url = new URL(request.url!, 'http://localhost')
    if (url.searchParams.get('input_format_json_named_tuples_as_objects') !== '0') {
      response.writeHead(400)
      response.end('Expected named tuple objects')
      return
    }
    let body = ''
    for await (const chunk of request) body += chunk
    received = JSON.parse(body)
    response.end('')
  })
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    if (!address || typeof address === 'string') throw new Error('Missing test server port')
    const snapshot = publication(
      { commit: 'a'.repeat(40), workflow_run_id: 1 },
      [
        {
          test_id: 'counter',
          compiler: 'solx',
          status: 'ok',
          label: 'solx 0.1.8',
          total_gas: 148516,
        },
      ],
      [],
    )
    await insert(
      {
        host: `http://127.0.0.1:${address.port}`,
        database: 'solar_perf',
        user: 'test',
        password: '',
      },
      'run_snapshots',
      [snapshot],
    )
    expect(received).toEqual(snapshot)
    expect(Array.isArray(snapshot.measurements[0])).toBe(true)
  } finally {
    server.closeAllConnections()
    await new Promise<void>((resolve) => server.close(() => resolve()))
  }
})

it('negotiates and decodes compressed ClickHouse responses', async () => {
  const requests: { encoding: string | undefined; compression: string | null }[] = []
  const row = { content: 'benchmark artifact '.repeat(1000) }
  const server = createServer((request, response) => {
    requests.push({
      encoding: request.headers['accept-encoding'],
      compression: new URL(request.url!, 'http://localhost').searchParams.get(
        'enable_http_compression',
      ),
    })
    response.writeHead(200, {
      'content-encoding': 'gzip',
      'x-clickhouse-summary': JSON.stringify({
        elapsed_ns: '2000000',
        read_rows: '4',
        read_bytes: '100',
      }),
    })
    response.end(gzipSync(JSON.stringify(row) + '\n'))
  })
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    if (!address || typeof address === 'string') throw new Error('Missing test server port')
    const timing = { queries: 0, databaseMs: 0, sqlMs: 0, readRows: 0, readBytes: 0 }
    expect(
      await requestTiming.run(timing, () =>
        select(
          {
            host: `http://127.0.0.1:${address.port}`,
            database: 'solar_perf',
            user: 'test',
            password: '',
          },
          'SELECT content FROM artifact_files',
        ),
      ),
    ).toEqual([row])
    expect(timing).toMatchObject({ queries: 1, sqlMs: 2, readRows: 4, readBytes: 100 })
    expect(requests).toEqual([{ encoding: 'gzip', compression: '1' }])
  } finally {
    server.closeAllConnections()
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    )
  }
})
