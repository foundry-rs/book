import { backfillSources } from '../src/server/backfillSources.ts'
import { clickHouseConfig } from '../src/server/clickhouse.ts'

const config = clickHouseConfig(process.env, 'write')
if (!config) throw new Error('ClickHouse write credentials are not configured')
let total = 0
while (true) {
  const result = await backfillSources(config, 100)
  total += result.updated
  console.log(JSON.stringify({ ...result, total }))
  // Stop on unresolved metadata rather than repeatedly scanning the same rows.
  if (result.failed.length)
    throw new Error('Some snapshots need source provenance; see failures above')
  if (!result.scanned) break
}
