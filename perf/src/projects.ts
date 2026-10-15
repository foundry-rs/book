export interface MetricDefinition {
  key: string
  title: string
  unit: string
  /** Comparison-table label when it differs from the graph title. */
  label?: string
  /** Legacy `metric=` URL value. */
  alias?: string
  /** Measurements vary between identical runs, so graphs use lines instead of steps. */
  noisy?: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  repository: string
  workflow: string
  artifact: string
  /** Same-run artifact with the PR base's results, used when the base has no run of its own. */
  baselineArtifact?: string
  compiler: string
  metrics: MetricDefinition[]
}

export const projects: Record<string, Project> = {
  solar: {
    id: 'solar',
    name: 'Solar',
    description: 'Solar compiler benchmark history and artifact diffs',
    repository: 'paradigmxyz/solar',
    workflow: 'bench.yml',
    artifact: 'codegen-runtime-results',
    compiler: 'solar',
    metrics: [
      { key: 'total_gas', title: 'Runtime gas', unit: 'gas', alias: 'runtimeGas' },
      { key: 'deploy_gas', title: 'Deploy gas', unit: 'gas', alias: 'deployGas' },
      {
        key: 'runtime_size',
        title: 'Runtime bytecode',
        label: 'Runtime bytes',
        unit: 'bytes',
        alias: 'runtimeSize',
      },
      {
        key: 'bytecode_size',
        title: 'Creation bytecode',
        label: 'Creation bytes',
        unit: 'bytes',
        alias: 'creationSize',
      },
      {
        key: 'compile_time_seconds',
        title: 'Compile time',
        unit: 'seconds',
        alias: 'compileTime',
        noisy: true,
      },
      {
        key: 'peak_rss_bytes',
        title: 'Peak memory (RSS)',
        unit: 'memory',
        alias: 'peakMemory',
        noisy: true,
      },
    ],
  },
  evm2: {
    id: 'evm2',
    name: 'evm2 JIT',
    description: 'evm2 JIT compiler benchmark history and artifact diffs',
    repository: 'alloy-rs/evm2',
    workflow: 'bench.yml',
    artifact: 'jit-bench-results',
    baselineArtifact: 'jit-bench-baseline',
    compiler: 'evm2',
    metrics: [
      { key: 'jit_size_bytes', title: 'JIT size', unit: 'bytes' },
      { key: 'opt_s_lines', title: 'Assembly lines', unit: 'lines' },
      { key: 'opt_ll_lines', title: 'Optimized IR lines', unit: 'lines' },
      { key: 'unopt_ll_lines', title: 'Unoptimized IR lines', unit: 'lines' },
      {
        key: 'compile_instructions',
        title: 'Compile instructions',
        unit: 'instructions',
        noisy: true,
      },
      { key: 'compile_time_seconds', title: 'Compile time', unit: 'seconds', noisy: true },
      {
        key: 'runtime_instructions',
        title: 'Runtime instructions',
        unit: 'instructions',
        noisy: true,
      },
      { key: 'runtime_cycles', title: 'Runtime cycles', unit: 'cycles', noisy: true },
    ],
  },
}

/** Solar keeps its original unprefixed API paths. */
export function apiBase(project: Project) {
  return project.id === 'solar' ? '/api' : `/api/${project.id}`
}

/** The app is built once per project; its base path (`/perf/<id>/`) selects the project. */
export function projectFromBase(base: string) {
  const id = base.split('/')[2] ?? ''
  return Object.hasOwn(projects, id) ? projects[id] : projects.solar
}
