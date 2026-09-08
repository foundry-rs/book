CREATE TABLE IF NOT EXISTS ingestion_jobs (
  workflow_run_id UInt64,
  commit FixedString(40),
  state LowCardinality(String),
  attempts UInt16,
  next_attempt_at DateTime64(3, 'UTC'),
  last_error Nullable(String),
  updated_at DateTime64(3, 'UTC') DEFAULT now64(3)
) ENGINE = ReplacingMergeTree(updated_at)
ORDER BY workflow_run_id;
