import { AsyncLocalStorage } from 'node:async_hooks'

export const requestTiming = new AsyncLocalStorage<{ queries: number; databaseMs: number }>()
