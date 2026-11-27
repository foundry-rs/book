import { AsyncLocalStorage } from 'node:async_hooks'

const timings = new AsyncLocalStorage<Record<string, number>>()

export async function importStage<T>(name: string, action: () => T | Promise<T>): Promise<T> {
  const started = performance.now()
  try {
    return await action()
  } finally {
    const stages = timings.getStore()
    if (stages) stages[name] = (stages[name] ?? 0) + performance.now() - started
  }
}

export async function timeImport<T>(commit: string, action: () => Promise<T>) {
  const started = performance.now()
  const stages: Record<string, number> = {}
  let outcome = 'complete'
  try {
    return await timings.run(stages, action)
  } catch (error) {
    outcome = error instanceof Error ? error.constructor.name : 'Error'
    throw error
  } finally {
    console.info(
      JSON.stringify({
        event: 'perf_import',
        commit,
        outcome,
        durationMs: Math.round(performance.now() - started),
        stages: Object.fromEntries(
          Object.entries(stages).map(([key, ms]) => [key, Math.round(ms)]),
        ),
      }),
    )
  }
}
