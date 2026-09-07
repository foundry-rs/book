import type { HistoryRun, RunDocument, RunIndex } from './types'
import { responseCache } from './cache'

const root = '/api/data/'
const cachedIndex = responseCache<RunIndex>(60_000)
const cachedHistory = responseCache<HistoryRun[]>(60_000)
const cachedArtifact = responseCache<string | null>(3_600_000)
const cachedRun = responseCache<RunDocument>(300_000)

export function loadHistory() {
  return cachedHistory('history', () =>
    getJson<{ runs: HistoryRun[] }>('history.json').then((history) => history.runs),
  )
}

async function getJson<T>(path: string, fresh = false): Promise<T> {
  const response = await fetch(`${root}${path}`, fresh ? { cache: 'no-store' } : undefined)
  if (!response.ok) throw new Error(`Could not load benchmark data (${response.status})`)
  return response.json() as Promise<T>
}

export function loadIndex() {
  return cachedIndex('index', () => getJson<RunIndex>('index.json', true))
}

async function resolveCommit(commit: string) {
  if (commit.length === 40) return commit
  const prefix = commit.toLowerCase()
  const matches = (await loadIndex()).runs.filter((run) => run.commit.startsWith(prefix))
  return matches.length === 1 ? matches[0].commit : commit
}

export async function loadRun(commit: string) {
  const resolved = await resolveCommit(commit)
  return cachedRun(resolved, () =>
    getJson<RunDocument>(`runs/${encodeURIComponent(resolved)}/run.json`),
  )
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
  return cachedArtifact(path, () =>
    fetch(`${root}${path}`).then((response) => {
      if (response.status === 404) return null
      if (!response.ok) throw new Error(`Could not load artifact (${response.status})`)
      return response.json() as Promise<string>
    }),
  )
}
