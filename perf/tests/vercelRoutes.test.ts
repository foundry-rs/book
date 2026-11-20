import { describe, expect, test } from 'vitest'

import { apiRoute, workerRoute } from '../scripts/vercel-routes.mjs'

function perfPath(pathname: string) {
  for (const route of [workerRoute, apiRoute]) {
    const match = new RegExp(route.src).exec(pathname)
    if (match) return route.dest.replace('$1', match[1] ?? '')
  }
  return undefined
}

describe('Vercel API routes', () => {
  test('send perf API requests to the perf functions', () => {
    expect(perfPath('/api/health')).toBe('/perf-api?__perf_path=health')
    expect(perfPath('/api/resolve')).toBe('/perf-api?__perf_path=resolve')
    expect(perfPath('/api/data/index.json')).toBe('/perf-api?__perf_path=data/index.json')
    expect(perfPath('/api/evm2/data/index.json')).toBe('/perf-api?__perf_path=evm2/data/index.json')
    expect(perfPath('/api/searches')).toBe('/perf-api?__perf_path=searches')
    expect(perfPath('/api/worker/tick')).toBe('/perf-worker?__perf_path=worker/tick')
  })

  test('leave Vocs API routes to the docs server', () => {
    for (const pathname of [
      '/api/mcp',
      '/api/mcp/messages',
      '/api/feedback',
      '/api/search',
      '/api/og',
    ]) {
      expect(perfPath(pathname)).toBeUndefined()
    }
  })
})
