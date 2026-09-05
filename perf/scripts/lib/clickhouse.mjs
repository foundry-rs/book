function config() {
  const host = process.env.CLICKHOUSE_HOST
  if (!host) throw new Error('Missing CLICKHOUSE_HOST')
  return {
    url: host.startsWith('http://') || host.startsWith('https://') ? host : `https://${host}`,
    database: database(),
    user: process.env.CLICKHOUSE_WRITE_USER || process.env.CLICKHOUSE_USER || 'default',
    password: process.env.CLICKHOUSE_WRITE_PASSWORD || process.env.CLICKHOUSE_PASSWORD || '',
  }
}

export function database() {
  const name = process.env.CLICKHOUSE_DATABASE || 'solar_perf'
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw new Error('Invalid CLICKHOUSE_DATABASE')
  return name
}

function headers({ user, password }, contentType = 'text/plain; charset=utf-8') {
  return {
    authorization: `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`,
    'content-type': contentType,
  }
}

const maxInsertBytes = 64 * 1024 * 1024

async function request(query, body = query, useDatabase = true) {
  const settings = config()
  const url = new URL(settings.url)
  if (useDatabase) url.searchParams.set('database', settings.database)
  const response = await fetch(url, {
    method: 'POST',
    headers: headers(settings),
    body: body === query ? query : `${query}\n${body}`,
  })
  if (response.ok) return response
  throw new Error(`ClickHouse request failed (${response.status}): ${await response.text()}`)
}

export async function execute(query, useDatabase = true) {
  await request(query, query, useDatabase)
}

export async function insert(table, rows) {
  if (!rows.length) return
  const query = `INSERT INTO ${table} FORMAT JSONEachRow`
  let lines = []
  let bytes = 0
  for (const row of rows) {
    const line = JSON.stringify(row)
    const lineBytes = Buffer.byteLength(line) + 1
    if (lineBytes > maxInsertBytes)
      throw new Error(`Row exceeds ${maxInsertBytes / 1024 / 1024} MiB`)
    if (bytes && bytes + lineBytes > maxInsertBytes) {
      await request(query, `${lines.join('\n')}\n`)
      lines = []
      bytes = 0
    }
    lines.push(line)
    bytes += lineBytes
  }
  if (lines.length) await request(query, `${lines.join('\n')}\n`)
}

export async function select(query) {
  const response = await request(`${query}\nFORMAT JSONEachRow`)
  const body = await response.text()
  return body
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
}
