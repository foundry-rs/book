import { createHash } from 'node:crypto'
import { normalizeSourceLinks } from './benchmarkSources.ts'

export const measurementColumns = [
  'test_id',
  'description',
  'suite',
  'compiler',
  'status',
  'compile_time_seconds',
  'bytecode_size',
  'runtime_size',
  'deploy_gas',
  'total_gas',
  'peak_rss_bytes',
  'label',
]

export function publication(
  run: Record<string, unknown>,
  results: Record<string, unknown>[],
  files: Record<string, unknown>[],
) {
  const measurements = [...results]
    .sort(
      (a, b) =>
        String(a.test_id).localeCompare(String(b.test_id)) ||
        String(a.compiler).localeCompare(String(b.compiler)),
    )
    .map((row) =>
      measurementColumns.map((column) => row[column] ?? (column === 'label' ? '' : null)),
    )
  const artifacts = [...files]
    .sort(
      (a, b) =>
        String(a.test_id).localeCompare(String(b.test_id)) ||
        String(a.path).localeCompare(String(b.path)) ||
        String(a.compiler).localeCompare(String(b.compiler)),
    )
    .map((row) => [
      row.test_id,
      row.path,
      row.compiler,
      row.bytes ?? Buffer.byteLength(String(row.content)),
      row.content_sha256,
      row.storage_path,
    ])
  const snapshot = {
    commit: run.commit,
    workflow_run_id: run.workflow_run_id,
    run_attempt: run.run_attempt ?? 1,
    branch: run.branch,
    pr: run.pr,
    title: run.title,
    started_at: run.started_at,
    source_schema: run.source_schema,
    benchmark_count: new Set(results.map((row) => row.test_id)).size,
    measurements,
    artifacts,
  }
  return {
    ...snapshot,
    revision: createHash('sha256').update(JSON.stringify(snapshot)).digest('hex'),
    // Provenance is additive metadata, not artifact identity. This lets the
    // backfill enrich existing pinned revisions without breaking shared URLs.
    source_links: Object.fromEntries(
      results.map((row) => [
        String(row.test_id),
        normalizeSourceLinks(row.source_links).map((link) => [link.label, link.url]),
      ]),
    ),
  }
}

export function publicationBlobs(files: Record<string, unknown>[]) {
  return [
    ...new Map(
      files.map((file) => [
        String(file.content_sha256),
        {
          content_sha256: file.content_sha256,
          content: file.content,
        },
      ]),
    ).values(),
  ]
}
