import { select } from './lib/clickhouse.mjs'

const [result] = await select(`
  SELECT count() AS tables
  FROM system.tables
  WHERE database = '${process.env.CLICKHOUSE_DATABASE || 'solar_perf'}'
    AND name IN ('run_snapshots', 'artifact_blobs', 'ingestion_jobs')
`)
if (Number(result.tables) !== 3) throw new Error('ClickHouse schema is incomplete')
console.log('ClickHouse schema is ready for local ingestion')
