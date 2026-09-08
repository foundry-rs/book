import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import { database, execute } from './lib/clickhouse.mjs'

const schema = (
  await Promise.all(
    ['clickhouse.sql', 'snapshots.sql'].map((name) =>
      readFile(fileURLToPath(new URL(`../schema/${name}`, import.meta.url)), 'utf8'),
    ),
  )
).join('\n')
await execute(`CREATE DATABASE IF NOT EXISTS ${database()}`, false)
for (const statement of schema
  .split(';')
  .map((part) => part.trim())
  .filter(Boolean)) {
  await execute(statement)
}
console.log('ClickHouse schema is ready')
