import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import { database, execute } from './lib/clickhouse.mjs'

const schema = await readFile(
  fileURLToPath(new URL('../schema/clickhouse.sql', import.meta.url)),
  'utf8',
)
await execute(`CREATE DATABASE IF NOT EXISTS ${database()}`, false)
for (const statement of schema
  .split(';')
  .map((part) => part.trim())
  .filter(Boolean)) {
  await execute(statement)
}
console.log('ClickHouse schema is ready')
