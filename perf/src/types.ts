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
  commit: string
  timestamp: string
  branch: string | null
  pr: number | null
  title: string | null
  benchmarkCount: number
  metrics: MetricSummary
}

export interface RunIndex {
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
  compilers: Record<string, CompilerResult>
}

export interface ArtifactFile {
  path: string
  storagePath: string
  label: string
  language: string
  bytes: number
  compilers: string[]
}

export interface RunDocument {
  schemaVersion: number
  commit: string
  branch: string | null
  pr: number | null
  title: string | null
  timestamp: string
  results: BenchmarkResult[]
  artifacts: Record<string, ArtifactFile[]>
}
