import type { RunDocument, RunIndex } from './types'

const root = '/api/data/'
let indexPromise: Promise<RunIndex> | null = null
const artifactPromises = new Map<string, Promise<string | null>>()
const runPromises = new Map<string, Promise<RunDocument>>()

async function getJson<T>(path: string, fresh = false): Promise<T> {
  const response = await fetch(`${root}${path}`, fresh ? { cache: 'no-store' } : undefined)
  if (!response.ok) throw new Error(`Could not load benchmark data (${response.status})`)
  return response.json() as Promise<T>
}

export function loadIndex() {
  if (!indexPromise) {
    indexPromise = getJson<RunIndex>('index.json', true).catch((error) => {
      indexPromise = null
      throw error
    })
  }
  return indexPromise
}

async function resolveCommit(commit: string) {
  if (commit.length === 40) return commit
  const prefix = commit.toLowerCase()
  const matches = (await loadIndex()).runs.filter((run) => run.commit.startsWith(prefix))
  return matches.length === 1 ? matches[0].commit : commit
}

export async function loadRun(commit: string) {
  const resolved = await resolveCommit(commit)
  const existing = runPromises.get(resolved)
  if (existing) return existing
  const inFlight = getJson<RunDocument>(`runs/${encodeURIComponent(resolved)}/run.json`).finally(
    () => runPromises.delete(resolved),
  )
  runPromises.set(resolved, inFlight)
  return inFlight
}

export async function loadArtifact(
  commit: string,
  benchmark: string,
  compiler: string,
  storagePath: string,
): Promise<string | null> {
  const resolved = await resolveCommit(commit)
  const parts = [resolved, benchmark, compiler, ...storagePath.split('/')].map(encodeURIComponent)
  const path = `runs/${parts.join('/')}`
  const existing = artifactPromises.get(path)
  if (existing) return existing
  const inFlight = fetch(`${root}${path}`)
    .then((response) => {
      if (response.status === 404) return null
      if (!response.ok) throw new Error(`Could not load artifact (${response.status})`)
      return response.json() as Promise<string>
    })
    .finally(() => artifactPromises.delete(path))
  artifactPromises.set(path, inFlight)
  return inFlight
}
