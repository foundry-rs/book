import type { HistorySeries, RunDocument, RunIndex } from './types'
import { responseCache } from './cache'

const root = '/api/data/'
const cachedIndex = responseCache<RunIndex>(60_000)
const cachedHistory = responseCache<HistorySeries>(60_000)
const cachedArtifact = responseCache<string | null>(3_600_000)
const cachedRun = responseCache<RunDocument>(300_000)
const cachedManifest = responseCache<RunDocument['artifacts']>(300_000)
const runQueue: {
  commit: string
  resolve: (run: RunDocument) => void
  reject: (error: unknown) => void
}[] = []

// Coalesce the comparison's concurrent cache misses without refetching a cached side.
// Individual cache entries also remain shared with the artifact viewer.
function fetchRun(commit: string): Promise<RunDocument> {
  return new Promise((resolve, reject) => {
    runQueue.push({ commit, resolve, reject })
    if (runQueue.length !== 1) return
    queueMicrotask(() => {
      const pending = runQueue.splice(0)
      for (let i = 0; i < pending.length; i += 2) {
        const batch = pending.slice(i, i + 2)
        const commits = batch.map((entry) => entry.commit).sort()
        const request =
          commits.length === 1
            ? getJson<RunDocument>(`runs/${commits[0]}/run.json?artifacts=0`).then((run) => [run])
            : getJson<{ runs: RunDocument[] }>(
                `runs.json?${new URLSearchParams({ commits: commits.join(',') })}`,
              ).then(({ runs }) => runs)
        void request
          .then((runs) => {
            for (const entry of batch) {
              const run = runs.find((run) => run.commit === entry.commit)
              if (run) entry.resolve(run)
              else entry.reject(new Error('Run not found in response'))
            }
          })
          .catch((error: unknown) => batch.forEach((entry) => entry.reject(error)))
      }
    })
  })
}

export function loadHistory(metric: string, benchmark?: string) {
  const dashboard = cachedHistory.peek(new URLSearchParams({ metric }).toString())
  if (benchmark !== undefined && dashboard) {
    return dashboard.then(({ runs, values }) => ({
      runs,
      values: Object.hasOwn(values, benchmark) ? { [benchmark]: values[benchmark] } : {},
    }))
  }
  const params = new URLSearchParams({ metric })
  if (benchmark !== undefined) params.set('benchmark', benchmark)
  return cachedHistory(params.toString(), () => getJson<HistorySeries>(`history.json?${params}`))
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${root}${path}`)
  if (!response.ok) throw new Error(`Could not load benchmark data (${response.status})`)
  return response.json() as Promise<T>
}

export function loadIndex() {
  return cachedIndex('index', () => getJson<RunIndex>('index.json'))
}

export async function resolveCommit(value: string): Promise<string> {
  const ref = value.trim()
  if (!ref) throw new Error('Enter a commit, branch, tag, or PR.')
  if (/^[0-9a-f]{40}$/i.test(ref)) return ref.toLowerCase()
  if (/^[0-9a-f]{7,39}$/i.test(ref)) {
    const matches = (await loadIndex()).runs.filter((run) =>
      run.commit.startsWith(ref.toLowerCase()),
    )
    if (matches.length > 1) throw new Error('Ambiguous commit prefix; use a longer SHA.')
    if (matches.length === 1) return matches[0].commit
  }
  // Mutable refs are resolved only on submission, never against a stale published index.
  const response = await fetch(`/api/resolve?${new URLSearchParams({ ref })}`, {
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`Could not resolve “${ref}” (${response.status}).`)
  const result = (await response.json()) as { commit: string }
  return result.commit
}

export async function loadRun(commit: string) {
  const resolved = await resolveCommit(commit)
  return cachedRun(resolved, () => fetchRun(resolved))
}

export async function loadRunWithArtifacts(commit: string): Promise<RunDocument> {
  // Ensure on-demand imports finish before requesting the manifest. Metrics remain shared
  // with the comparison page, which never needs to read artifact_files.
  const run = await loadRun(commit)
  const artifacts = await cachedManifest(run.commit, () =>
    getJson<RunDocument['artifacts']>(`runs/${run.commit}/artifacts.json`),
  )
  return { ...run, artifacts }
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
