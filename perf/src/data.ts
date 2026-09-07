import type { HistoryRun, HistorySeries, RunDocument, RunIndex } from './types'
import { responseCache } from './cache'

const root = '/api/data/'
const cachedIndex = responseCache<RunIndex>(60_000)
const cachedHistory = responseCache<HistoryRun[]>(60_000)
const cachedArtifact = responseCache<string | null>(3_600_000)
const cachedRun = responseCache<RunDocument>(300_000)
const cachedManifest = responseCache<RunDocument['artifacts']>(300_000)

export function loadHistory(metric: string, benchmark?: string) {
  const params = new URLSearchParams({ metric })
  if (benchmark !== undefined) params.set('benchmark', benchmark)
  return cachedHistory(params.toString(), () =>
    getJson<HistorySeries>(`history.json?${params}`).then(({ runs, values }) =>
      runs.map((run, index) => ({
        ...run,
        results: Object.entries(values).map(([test_id, points]) => ({
          test_id,
          suite: '',
          compilers: {
            solar: { status: points[index] === null ? 'missing' : 'ok', [metric]: points[index] },
          },
        })),
      })),
    ),
  )
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
  return cachedRun(resolved, () =>
    getJson<RunDocument>(`runs/${encodeURIComponent(resolved)}/run.json?artifacts=0`),
  )
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
