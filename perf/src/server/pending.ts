export class ImportPendingError extends Error {
  constructor(readonly retryAfter: number) {
    super('Benchmark import is in progress or waiting to retry')
  }
}

export class RunNotFoundError extends Error {
  constructor() {
    super('No completed benchmark run is available for this commit')
  }
}
