import { useSyncExternalStore } from 'react'

const pending = new Map<string, string>()
const listeners = new Set<() => void>()

export function reportImport(commit: string, message: string | null) {
  if (message === null) pending.delete(commit)
  else pending.set(commit, message)
  for (const listener of listeners) listener()
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useImportProgress(base: string, head: string) {
  return useSyncExternalStore(
    subscribe,
    () =>
      [base, head]
        .map((commit) => pending.get(commit))
        .filter(Boolean)
        .join(' '),
    () => '',
  )
}
