import { select } from './lib/clickhouse.mjs'

const [result] = await select(`
  SELECT count() AS tables
  FROM system.tables
  WHERE database = '${process.env.CLICKHOUSE_DATABASE || 'solar_perf'}'
    AND name IN ('runs', 'benchmark_results', 'artifact_files')
`)
if (Number(result.tables) !== 3) throw new Error('ClickHouse schema is incomplete')
console.log('ClickHouse schema is ready for local ingestion')
