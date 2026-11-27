-- Run once after applying clickhouse.sql. Preserve every measurement and only
-- append replacement rows whose normalized label is missing.
INSERT INTO benchmark_results
  (workflow_run_id, commit, test_id, description, suite, compiler, status, label,
   compile_time_seconds, bytecode_size, runtime_size, deploy_gas, total_gas, peak_rss_bytes)
WITH labels AS (
  SELECT workflow_run_id,
    coalesce(nullIf(JSONExtractString(entry, 'test_id'), ''),
      nullIf(JSONExtractString(entry, 'id'), ''), JSONExtractString(entry, 'name')) AS test_id,
    tupleElement(pair, 1) AS compiler,
    JSONExtractString(tupleElement(pair, 2), 'label') AS label
  FROM runs FINAL
  ARRAY JOIN JSONExtractArrayRaw(if(JSONType(raw_results) = 'Array', raw_results,
    JSONExtractRaw(raw_results, 'results'))) AS entry
  ARRAY JOIN if(JSONHas(entry, 'compilers'), JSONExtractKeysAndValuesRaw(entry, 'compilers'),
    [tuple('solar', JSONExtractRaw(entry, 'solar')), tuple('solc', JSONExtractRaw(entry, 'solc'))]) AS pair
)
SELECT b.workflow_run_id, b.commit, b.test_id, b.description, b.suite, b.compiler, b.status,
  l.label, b.compile_time_seconds, b.bytecode_size, b.runtime_size,
  b.deploy_gas, b.total_gas, b.peak_rss_bytes
FROM benchmark_results AS b FINAL
INNER JOIN labels AS l USING (workflow_run_id, test_id, compiler)
WHERE b.label = '' AND l.label != '';
