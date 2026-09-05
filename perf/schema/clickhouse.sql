CREATE TABLE IF NOT EXISTS runs (
  workflow_run_id UInt64,
  commit FixedString(40),
  branch Nullable(String),
  pr Nullable(UInt32),
  title Nullable(String),
  started_at DateTime64(3, 'UTC'),
  workflow_name LowCardinality(String),
  source_schema UInt16,
  raw_results String CODEC(ZSTD(6)),
  imported_at DateTime64(3, 'UTC') DEFAULT now64(3)
) ENGINE = ReplacingMergeTree(imported_at)
ORDER BY workflow_run_id;

ALTER TABLE runs ADD COLUMN IF NOT EXISTS title Nullable(String) AFTER pr;

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

CREATE TABLE IF NOT EXISTS benchmark_results (
  workflow_run_id UInt64,
  commit FixedString(40),
  test_id LowCardinality(String),
  description String,
  suite LowCardinality(String),
  compiler LowCardinality(String),
  status LowCardinality(String),
  compile_time_seconds Nullable(Float64),
  bytecode_size Nullable(UInt64),
  runtime_size Nullable(UInt64),
  deploy_gas Nullable(UInt64),
  total_gas Nullable(UInt64),
  peak_rss_bytes Nullable(UInt64),
  imported_at DateTime64(3, 'UTC') DEFAULT now64(3)
) ENGINE = ReplacingMergeTree(imported_at)
PARTITION BY toYYYYMM(imported_at)
ORDER BY (workflow_run_id, test_id, compiler);

CREATE TABLE IF NOT EXISTS artifact_files (
  workflow_run_id UInt64,
  commit FixedString(40),
  test_id LowCardinality(String),
  compiler LowCardinality(String),
  path LowCardinality(String),
  storage_path LowCardinality(String),
  label String,
  language LowCardinality(String),
  bytes Nullable(UInt64),
  content String CODEC(ZSTD(9)),
  content_sha256 FixedString(64),
  imported_at DateTime64(3, 'UTC') DEFAULT now64(3)
) ENGINE = ReplacingMergeTree(imported_at)
PARTITION BY toYYYYMM(imported_at)
ORDER BY (workflow_run_id, test_id, compiler, storage_path);

ALTER TABLE artifact_files ADD COLUMN IF NOT EXISTS bytes Nullable(UInt64) AFTER language;
