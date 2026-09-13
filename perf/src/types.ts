export type Theme = 'light' | 'dark'

export interface MetricSummary {
  compileTime: number | null
  creationSize: number | null
  runtimeSize: number | null
  deployGas: number | null
  runtimeGas: number | null
  peakMemory: number | null
}

export interface RunSummary {
  baseCommit?: string | null
  commit: string
  timestamp: string
  branch: string | null
  pr: number | null
  title: string | null
  benchmarkCount: number
}

export interface RunIndex {
  totalMainRuns?: number
  schemaVersion: number
  updatedAt: string | null
  runs: RunSummary[]
}

export interface CompilerResult extends Partial<MetricSummary> {
  status: string
  label?: string
  compile_time_seconds?: number
  bytecode_size?: number
  runtime_size?: number
  deploy_gas?: number
  total_gas?: number
  peak_rss_bytes?: number
  error?: string
}

export interface BenchmarkResult {
  test_id: string
  description?: string
  suite: string
  source_links?: SourceLink[]
  compilers: Record<string, CompilerResult>
}

export interface SourceLink {
  label: string
  url: string
}

export interface ArtifactFile {
  path: string
  storagePath: string
  label: string
  language: string
  bytes: number
  compilers: string[]
  contentHashes?: Record<string, string>
}

export interface RunDocument {
  revision?: string
  workflow_run_id?: number
  schemaVersion: number
  commit: string
  branch: string | null
  pr: number | null
  title: string | null
  timestamp: string
  results: BenchmarkResult[]
  artifacts: Record<string, ArtifactFile[]>
}

export type HistoryRun = Pick<RunDocument, 'commit' | 'timestamp' | 'results'>

export interface HistorySeries {
  runs: Pick<RunDocument, 'commit' | 'timestamp'>[]
  values: Record<string, (number | null)[]>
}
