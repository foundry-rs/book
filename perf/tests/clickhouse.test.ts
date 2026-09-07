import { createServer } from 'node:http'
import { gzipSync } from 'node:zlib'
import { expect, it } from 'vite-plus/test'
import { select } from '../src/server/clickhouse'

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
    response.writeHead(200, { 'content-encoding': 'gzip' })
    response.end(gzipSync(JSON.stringify(row) + '\n'))
  })
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    if (!address || typeof address === 'string') throw new Error('Missing test server port')
    expect(
      await select(
        {
          host: `http://127.0.0.1:${address.port}`,
          database: 'solar_perf',
          user: 'test',
          password: '',
        },
        'SELECT content FROM artifact_files',
      ),
    ).toEqual([row])
    expect(requests).toEqual([{ encoding: 'gzip', compression: '1' }])
  } finally {
    server.closeAllConnections()
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    )
  }
})
