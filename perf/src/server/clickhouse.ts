export interface ClickHouseConfig {
  database: string
  host: string
  password: string
  user: string
}

const databaseName = /^[A-Za-z_][A-Za-z0-9_]*$/
const maxInsertBytes = 64 * 1024 * 1024
const timeout = 10_000

export function clickHouseConfig(
  environment: NodeJS.ProcessEnv = process.env,
  role: 'read' | 'write' = 'read',
): ClickHouseConfig | null {
  const prefix = `CLICKHOUSE_${role.toUpperCase()}_`
  const host = environment[`${prefix}HOST`] || environment.CLICKHOUSE_HOST
  if (!host) return null

  const database = environment.CLICKHOUSE_DATABASE || 'solar_perf'
  if (!databaseName.test(database)) throw new Error('Invalid CLICKHOUSE_DATABASE')

  const url = new URL(host.includes('://') ? host : `https://${host}`)
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid CLICKHOUSE_HOST')

  return {
    database,
    host: url.toString(),
    password: environment[`${prefix}PASSWORD`] || environment.CLICKHOUSE_PASSWORD || '',
    user: environment[`${prefix}USER`] || environment.CLICKHOUSE_USER || 'default',
  }
}

function authorization(config: ClickHouseConfig) {
  return `Basic ${Buffer.from(`${config.user}:${config.password}`).toString('base64')}`
}

async function request(config: ClickHouseConfig, query: string, body?: string) {
  const url = new URL(config.host)
  url.searchParams.set('database', config.database)
  if (body !== undefined) url.searchParams.set('query', query)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: authorization(config),
      'content-type': 'text/plain; charset=utf-8',
    },
    body: body ?? query,
    signal: AbortSignal.timeout(timeout),
  })
  if (response.ok) return response

  const detail = (await response.text()).slice(0, 500)
  throw new Error(`ClickHouse request failed (${response.status}): ${detail}`)
}

export async function select(config: ClickHouseConfig, query: string) {
  const response = await request(config, `${query}\nFORMAT JSONEachRow`)
  const body = await response.text()
  return body
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line) as Record<string, unknown>)
}

export async function insert(
  config: ClickHouseConfig,
  table: string,
  rows: Record<string, unknown>[],
) {
  if (!rows.length) return

  const query = `INSERT INTO ${table} FORMAT JSONEachRow`
  let lines: string[] = []
  let bytes = 0
  for (const row of rows) {
    const line = JSON.stringify(row)
    const lineBytes = Buffer.byteLength(line) + 1
    if (lineBytes > maxInsertBytes)
      throw new Error(`ClickHouse row exceeds ${maxInsertBytes / 1024 / 1024} MiB`)
    if (bytes && bytes + lineBytes > maxInsertBytes) {
      await request(config, query, `${lines.join('\n')}\n`)
      lines = []
      bytes = 0
    }
    lines.push(line)
    bytes += lineBytes
  }
  if (lines.length) await request(config, query, `${lines.join('\n')}\n`)
}
