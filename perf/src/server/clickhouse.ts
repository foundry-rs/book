import { requestTiming } from './timing.ts'
import { randomUUID } from 'node:crypto'

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

async function request(
  config: ClickHouseConfig,
  query: string,
  body?: string,
  params: Record<string, string> = {},
) {
  const url = new URL(config.host)
  url.searchParams.set('database', config.database)
  // ClickHouse requires an explicit opt-in in addition to Accept-Encoding.
  url.searchParams.set('enable_http_compression', '1')
  url.searchParams.set('output_format_json_named_tuples_as_objects', '0')
  // Snapshot tuples use positional arrays on both sides of the HTTP boundary.
  url.searchParams.set('input_format_json_named_tuples_as_objects', '0')
  // Reads are fully buffered by select(); ask for a complete execution summary.
  if (body === undefined) {
    url.searchParams.set('wait_end_of_query', '1')
    url.searchParams.set('max_execution_time', '5')
    const queryId = randomUUID()
    url.searchParams.set('query_id', queryId)
    requestTiming.getStore()?.queryIds?.push(queryId)
  }
  for (const [key, value] of Object.entries(params)) url.searchParams.set(`param_${key}`, value)
  if (body !== undefined) url.searchParams.set('query', query)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: authorization(config),
      'accept-encoding': 'gzip',
      'content-type': 'text/plain; charset=utf-8',
    },
    body: body ?? query,
    signal: AbortSignal.timeout(timeout),
  })
  if (response.ok) return response

  const detail = (await response.text()).slice(0, 500)
  throw new Error(`ClickHouse request failed (${response.status}): ${detail}`)
}

export async function select(
  config: ClickHouseConfig,
  query: string,
  params?: Record<string, string>,
) {
  const started = performance.now()
  const timing = requestTiming.getStore()
  if (timing) timing.queries++
  try {
    const response = await request(config, `${query}\nFORMAT JSONEachRow`, undefined, params)
    const body = await response.text()
    const summary = response.headers.get('x-clickhouse-summary')
    if (timing && summary) {
      try {
        const stats = JSON.parse(summary)
        if (
          !['elapsed_ns', 'read_rows', 'read_bytes'].every(
            (key) =>
              stats[key] != null && Number.isFinite(Number(stats[key])) && Number(stats[key]) >= 0,
          )
        )
          throw new Error('Incomplete summary')
        timing.summaries = (timing.summaries ?? 0) + 1
        const add = (key: 'sqlMs' | 'readRows' | 'readBytes', value: unknown, divisor = 1) => {
          const number = Number(value)
          if (Number.isFinite(number) && number >= 0)
            timing[key] = (timing[key] ?? 0) + number / divisor
        }
        add('sqlMs', stats.elapsed_ns, 1e6)
        add('readRows', stats.read_rows)
        add('readBytes', stats.read_bytes)
      } catch {
        /* Optional diagnostics must not fail a successful query. */
      }
    }
    return body
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Record<string, unknown>)
  } finally {
    if (timing) timing.databaseMs += performance.now() - started
  }
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
