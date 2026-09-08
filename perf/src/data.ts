import type { HistorySeries, RunDocument, RunIndex } from './types'
import { responseCache } from './cache'

const root = '/api/data/'
const cachedIndex = responseCache<RunIndex>(60_000)
const cachedHistory = responseCache<HistorySeries>(60_000)
const cachedArtifact = responseCache<string | null>(3_600_000)
const cachedRun = responseCache<RunDocument>(300_000)
const cachedManifest = responseCache<RunDocument['artifacts']>(300_000)
const cachedViewer = responseCache<[RunDocument, RunDocument]>(300_000)
const runQueue: {
  commit: string
  revision?: string
  resolve: (run: RunDocument) => void
  reject: (error: unknown) => void
}[] = []

// Coalesce the comparison's concurrent cache misses without refetching a cached side.
// Individual cache entries also remain shared with the artifact viewer.
function fetchRun(commit: string, revision?: string): Promise<RunDocument> {
  return new Promise((resolve, reject) => {
    runQueue.push({ commit, revision, resolve, reject })
    if (runQueue.length !== 1) return
    queueMicrotask(() => {
      const pending = runQueue.splice(0)
      for (let i = 0; i < pending.length; i += 2) {
        const batch = pending
          .slice(i, i + 2)
          .sort(
            (a, b) =>
              a.commit.localeCompare(b.commit) ||
              (a.revision ?? '').localeCompare(b.revision ?? ''),
          )
        const commits = batch.map((entry) => entry.commit)
        const revisions = batch.map((entry) => entry.revision ?? '').join(',')
        const request =
          commits.length === 1
            ? getJson<RunDocument>(
                `runs/${commits[0]}/run.json?artifacts=0${batch[0].revision ? `&revision=${batch[0].revision}` : ''}`,
              ).then((run) => [run])
            : getJson<{ runs: RunDocument[] }>(
                `runs.json?${new URLSearchParams({ commits: commits.join(','), ...(batch.some((entry) => entry.revision) ? { revisions } : {}) })}`,
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
  const deadline = Date.now() + 90_000
  for (;;) {
    const response = await fetch(`${root}${path}`, {
      signal: AbortSignal.timeout(Math.max(1, deadline - Date.now())),
    })
    const retry = Number(response.headers.get('retry-after'))
    if (response.status === 503 && retry > 0 && Date.now() + retry * 1000 < deadline) {
      await new Promise((resolve) => setTimeout(resolve, retry * 1000))
      continue
    }
    if (!response.ok) throw new Error(`Could not load benchmark data (${response.status})`)
    return response.json() as Promise<T>
  }
}

export function loadIndex() {
  return cachedIndex('index', () => getJson<RunIndex>('index.json'))
}

export async function resolveCommit(value: string): Promise<string> {
  const ref = value.trim()
  if (!ref) throw new Error('Enter a commit, branch, tag, or PR.')
  if (/^[0-9a-f]{40}$/i.test(ref)) return ref.toLowerCase()
  // Mutable refs are resolved only on submission, never against a stale published index.
  const response = await fetch(`/api/resolve?${new URLSearchParams({ ref })}`, {
    cache: 'no-store',
  })
  if (!response.ok) {
    if (response.status === 422) throw new Error('Ambiguous commit prefix; use a longer SHA.')
    throw new Error(`Could not resolve “${ref}” (${response.status}).`)
  }
  const result = (await response.json()) as { commit: string }
  return result.commit
}

export async function loadRun(commit: string, revision?: string) {
  const resolved = await resolveCommit(commit)
  const run = await cachedRun(`${resolved}:${revision ?? ''}`, () => fetchRun(resolved, revision))
  if (!revision && run.revision) await cachedRun(`${resolved}:${run.revision}`, async () => run)
  return run
}

export async function loadRunWithArtifacts(commit: string): Promise<RunDocument> {
  // Ensure on-demand imports finish before requesting the manifest. Metrics remain shared
  // with the comparison page, which never needs to read artifact_files.
  const run = await loadRun(commit)
  const artifacts = await cachedManifest(`${run.commit}:${run.revision ?? ''}`, () =>
    getJson<RunDocument['artifacts']>(
      `runs/${run.commit}/artifacts.json${run.revision ? `?revision=${run.revision}` : ''}`,
    ),
  )
  return { ...run, artifacts }
}

export async function loadViewerRuns(
  base: string,
  head: string,
  benchmark: string,
  baseRevision?: string,
  headRevision?: string,
) {
  const commits = await Promise.all([resolveCommit(base), resolveCommit(head)])
  const params = new URLSearchParams({ commits: commits.join(','), benchmark })
  if (baseRevision || headRevision)
    params.set('revisions', [baseRevision ?? '', headRevision ?? ''].join(','))
  return cachedViewer(params.toString(), async () => {
    const { runs } = await getJson<{ runs: RunDocument[] }>(`viewer.json?${params}`)
    const before = runs.find((run) => run.commit === commits[0])
    const after = runs.find((run) => run.commit === commits[1])
    if (!before || !after) throw new Error('Run not found in response')
    const value: [RunDocument, RunDocument] = [before, after]
    if (before.revision || after.revision) {
      const pinned = new URLSearchParams(params)
      pinned.set('revisions', [before.revision ?? '', after.revision ?? ''].join(','))
      if (pinned.toString() !== params.toString())
        await cachedViewer(pinned.toString(), async () => value)
    }
    return value
  })
}

export async function loadArtifact(
  commit: string,
  benchmark: string,
  compiler: string,
  storagePath: string,
  contentHash?: string,
): Promise<string | null> {
  const resolved = await resolveCommit(commit)
  const parts = [resolved, benchmark, compiler, ...storagePath.split('/')].map(encodeURIComponent)
  const path = contentHash ? `blobs/${contentHash}.json` : `runs/${parts.join('/')}`
  return cachedArtifact(path, () =>
    fetch(`${root}${path}`).then((response) => {
      if (response.status === 404) return null
      if (!response.ok) throw new Error(`Could not load artifact (${response.status})`)
      return response.json() as Promise<string>
    }),
  )
}
