import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

vi.mock('node:crypto', () => ({
  createSign: () => ({
    end() {},
    sign: () => ({ toString: () => 'signature' }),
    update() {},
  }),
}))

import { GitHubClient, GitHubRequestError, retryGitHub } from '../src/server/github'

const originalFetch = globalThis.fetch

function requestUrl(input: RequestInfo | URL) {
  if (typeof input === 'string') return input
  if (input instanceof URL) return input.href
  return input.url
}

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe('GitHub retry policy', () => {
  it('resolves case-sensitive branch/tag refs and open/merged PRs', async () => {
    const client = new GitHubClient({
      repository: 'paradigmxyz/solar',
      workflow: 'bench.yml',
      token: 'test',
    })
    const fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = requestUrl(input)
      if (url.includes('/pulls/'))
        return Response.json({
          merged_at: url.endsWith('/2') ? 'today' : null,
          merge_commit_sha: 'b'.repeat(40),
          head: { sha: 'c'.repeat(40) },
        })
      return Response.json({ sha: 'a'.repeat(40) })
    })
    globalThis.fetch = fetch
    expect(await client.resolveRef('Release/v1')).toBe('a'.repeat(40))
    expect(requestUrl(fetch.mock.calls[0][0])).toContain('/commits/Release%2Fv1')
    expect(await client.resolveRef('#1')).toBe('c'.repeat(40))
    expect(await client.resolveRef('2')).toBe('b'.repeat(40))
  })
  it('retries transient failures with backoff', async () => {
    let attempts = 0
    const delays: number[] = []

    const result = await retryGitHub(
      async () => {
        attempts += 1
        if (attempts < 3) throw new GitHubRequestError(null, 503, 'GitHub is unavailable')
        return 'imported'
      },
      async (milliseconds) => {
        delays.push(milliseconds)
      },
    )

    expect(result).toBe('imported')
    expect(attempts).toBe(3)
    expect(delays).toEqual([250, 500])
  })

  it('does not retry rejected requests', async () => {
    let attempts = 0

    await expect(
      retryGitHub(async () => {
        attempts += 1
        throw new GitHubRequestError(null, 401, 'Bad credentials')
      }),
    ).rejects.toThrow('Bad credentials')

    expect(attempts).toBe(1)
  })

  it('honors GitHub retry-after responses', async () => {
    let attempts = 0
    const delays: number[] = []

    await retryGitHub(
      async () => {
        attempts += 1
        if (attempts === 1) throw new GitHubRequestError(1_500, 429, 'Rate limited')
      },
      async (milliseconds) => {
        delays.push(milliseconds)
      },
    )

    expect(delays).toEqual([1_500])
  })

  it('shares one GitHub App token exchange across concurrent requests', async () => {
    const fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = requestUrl(input)
      if (url.includes('/access_tokens')) {
        return Response.json({
          expires_at: '2026-09-03T12:00:00Z',
          token: 'installation-token',
        })
      }
      return Response.json({ artifacts: [], workflow_runs: [] })
    })
    globalThis.fetch = fetch
    const client = new GitHubClient({
      appId: '1',
      installationId: '2',
      privateKey: 'test key',
      repository: 'paradigmxyz/solar',
      workflow: 'bench.yml',
    })

    await Promise.all([client.runs(1), client.artifact(2)])

    expect(
      fetch.mock.calls.filter(([input]) =>
        requestUrl(input as RequestInfo | URL).includes('/access_tokens'),
      ),
    ).toHaveLength(1)
  })

  it('retries a transient GitHub App token exchange', async () => {
    let tokenAttempts = 0
    const fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = requestUrl(input)
      if (url.includes('/access_tokens')) {
        tokenAttempts += 1
        if (tokenAttempts === 1)
          return Response.json({ message: 'GitHub is unavailable' }, { status: 503 })
        return Response.json({
          expires_at: '2026-09-03T12:00:00Z',
          token: 'installation-token',
        })
      }
      return Response.json({ workflow_runs: [] })
    })
    globalThis.fetch = fetch
    const client = new GitHubClient({
      appId: '1',
      installationId: '2',
      privateKey: 'test key',
      repository: 'paradigmxyz/solar',
      workflow: 'bench.yml',
    })

    await expect(client.runs(1)).resolves.toEqual([])
    expect(tokenAttempts).toBe(2)
  })
})
