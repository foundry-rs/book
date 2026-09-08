-- Additive, restartable migration. Leave legacy tables available for rollback.
INSERT INTO artifact_blobs (content_sha256, content)
SELECT content_sha256, any(content) FROM artifact_files FINAL
WHERE content_sha256 NOT IN (SELECT content_sha256 FROM artifact_blobs)
GROUP BY content_sha256;

-- Publish only after all referenced bodies have been copied above.
INSERT INTO run_snapshots
  (commit, revision, workflow_run_id, branch, pr, title, started_at,
   source_schema, benchmark_count, measurements, artifacts)
SELECT r.commit, lower(hex(SHA256(concat('legacy:', toString(r.workflow_run_id), ':', toString(r.imported_at))))),
  r.workflow_run_id, r.branch, r.pr, r.title, r.started_at, r.source_schema,
  ifNull(b.benchmark_count, 0), b.measurements, a.artifacts
FROM runs AS r FINAL
LEFT JOIN (
  SELECT workflow_run_id, uniqExact(test_id) AS benchmark_count,
    groupArray(tuple(test_id, description, suite, compiler, status,
      compile_time_seconds, bytecode_size, runtime_size, deploy_gas, total_gas, peak_rss_bytes, label)) AS measurements
  FROM benchmark_results FINAL GROUP BY workflow_run_id
) AS b USING (workflow_run_id)
LEFT JOIN (
  SELECT workflow_run_id, groupArray(tuple(test_id, path, compiler,
    ifNull(bytes, length(content)), toString(content_sha256), toString(storage_path))) AS artifacts
  FROM artifact_files FINAL GROUP BY workflow_run_id
) AS a USING (workflow_run_id)
WHERE r.workflow_run_id NOT IN (SELECT workflow_run_id FROM run_snapshots)
  AND r.workflow_run_id NOT IN (
    SELECT workflow_run_id FROM artifact_files FINAL
    WHERE content_sha256 NOT IN (SELECT content_sha256 FROM artifact_blobs)
  );
