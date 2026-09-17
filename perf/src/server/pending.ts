export class ImportPendingError extends Error {
  constructor(
    readonly retryAfter: number,
    readonly state: 'queued' | 'importing' | 'retry' | 'benchmark-running' = 'importing',
    readonly commit?: string,
  ) {
    super(
      state === 'retry'
        ? 'Benchmark import failed; a retry is scheduled'
        : state === 'benchmark-running'
          ? 'Benchmarks still running…'
          : 'Importing benchmark runs…',
    )
  }
}

export class RunNotFoundError extends Error {
  constructor() {
    super('No benchmark workflow is available for this commit')
  }
}
