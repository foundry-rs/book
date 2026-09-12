-- Immutable artifact publications: all measurements and manifest entries become
-- visible together. No import-time partitions or cross-table latest-row joins.
-- source_links is additive provenance and may be backfilled on existing revisions.
CREATE TABLE IF NOT EXISTS run_snapshots (
  commit FixedString(40),
  revision FixedString(64),
  workflow_run_id UInt64,
  run_attempt UInt32 DEFAULT 1,
  branch Nullable(String),
  pr Nullable(UInt32),
  title Nullable(String),
  started_at DateTime64(3, 'UTC'),
  source_schema UInt16,
  benchmark_count UInt32,
  measurements Array(Tuple(
    test_id String, description String, suite String, compiler String, status String,
    compile_time_seconds Nullable(Float64), bytecode_size Nullable(UInt64),
    runtime_size Nullable(UInt64), deploy_gas Nullable(UInt64), total_gas Nullable(UInt64),
    peak_rss_bytes Nullable(UInt64), label String)),
  artifacts Array(Tuple(
    test_id String, path String, compiler String, bytes UInt64,
    content_sha256 String, legacy_storage_path String)),
  source_links Map(String, Array(Tuple(label String, url String))) DEFAULT map(),
  published_at DateTime64(3, 'UTC') DEFAULT now64(3)
) ENGINE = ReplacingMergeTree
ORDER BY (commit, revision)
SETTINGS index_granularity = 1, index_granularity_bytes = 1048576;

ALTER TABLE run_snapshots ADD COLUMN IF NOT EXISTS
  source_links Map(String, Array(Tuple(label String, url String))) DEFAULT map();

CREATE TABLE IF NOT EXISTS artifact_blobs (
  content_sha256 FixedString(64),
  content String CODEC(ZSTD(9))
) ENGINE = ReplacingMergeTree
ORDER BY content_sha256
SETTINGS index_granularity = 1, index_granularity_bytes = 1048576;
