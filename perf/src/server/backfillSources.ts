import { enrichSources, normalizeSourceLinks } from './benchmarkSources.ts'
import { insert, select, type ClickHouseConfig } from './clickhouse.ts'

// Reinsert the same revision with additive provenance only. No artifact reads,
// deletions, metric changes, or changes to the selected workflow/attempt.
export async function backfillSources(config: ClickHouseConfig, limit = 10) {
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100)
    throw new Error('Source backfill limit must be between 1 and 100')
  const snapshots = await select(
    config,
    `
    SELECT * FROM run_snapshots FINAL
    WHERE source_schema > 0 AND arrayExists(m -> empty(source_links[m.test_id]), measurements)
    ORDER BY workflow_run_id DESC, revision LIMIT ${limit}`,
  )
  const failed: string[] = []
  let updated = 0
  for (const snapshot of snapshots) {
    try {
      const sources = (snapshot.source_links ?? {}) as Record<string, [string, string][]>
      const rows = [
        ...new Set((snapshot.measurements as unknown[][]).map((row) => String(row[0]))),
      ].map((test_id) => ({
        test_id,
        source_links: (Object.hasOwn(sources, test_id) ? sources[test_id] : []).map(
          ([label, url]) => ({ label, url }),
        ),
      }))
      await enrichSources(String(snapshot.commit), rows)
      const missing = rows.filter((row) => !row.source_links.length)
      if (missing.length)
        throw new Error(`No source metadata for ${missing.map((row) => row.test_id).join(', ')}`)
      await insert(config, 'run_snapshots', [
        {
          ...snapshot,
          source_links: Object.fromEntries(
            rows.map((row) => [
              row.test_id,
              normalizeSourceLinks(row.source_links).map((link) => [link.label, link.url]),
            ]),
          ),
        },
      ])
      updated++
    } catch (error) {
      console.warn(`Could not backfill sources for ${String(snapshot.commit)}`, error)
      failed.push(String(snapshot.commit))
    }
  }
  return { updated, failed, scanned: snapshots.length }
}
