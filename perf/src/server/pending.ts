export class ImportPendingError extends Error {
  constructor(
    readonly retryAfter: number,
    readonly state: 'queued' | 'importing' | 'retry' = 'importing',
    readonly commit?: string,
  ) {
    super(
      state === 'retry'
        ? 'Benchmark import failed; a retry is scheduled'
        : 'Importing benchmark runs…',
    )
  }
}

export class RunNotFoundError extends Error {
  constructor() {
    super('No completed benchmark run is available for this commit')
  }
}
