import type { RunSummary } from './types'

// The index is newest first. Compare against the preceding published main run.
export function comparisonBase(runs: RunSummary[], run: RunSummary) {
  const index = runs.indexOf(run)
  if (index < 0) return undefined
  return runs
    .slice(index + 1)
    .find((candidate) => candidate.branch === 'main' && candidate.commit !== run.commit)?.commit
}
