import { createSign } from 'node:crypto'

interface GitHubAppToken {
  expires_at: string
  token: string
}

interface GitHubError {
  message?: string
}

export interface GitHubArtifact {
  archive_download_url: string
  expired: boolean
  id: number
  name: string
  size_in_bytes: number
}

export interface GitHubPullRequest {
  merged_at: string | null
  number: number
  title: string
}

export interface GitHubRun {
  conclusion: string | null
  created_at: string
  display_title: string
  event: string
  head_branch: string | null
  head_sha: string
  id: number
  name: string
}

interface GitHubPage<T> {
  workflow_runs?: T[]
}

export class GitHubRequestError extends Error {
  constructor(
    readonly retryAfter: number | null,
    readonly status: number,
    message: string,
  ) {
    super(message)
  }
}

export interface GitHubConfig {
  appId?: string
  installationId?: string
  privateKey?: string
  repository: string
  token?: string
  workflow: string
}

const api = 'https://api.github.com/'
const tokenLifetime = 9 * 60 * 1000
const retryAttempts = 4

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds))
}

function retryable(error: unknown) {
  return (
    error instanceof TypeError ||
    (error instanceof Error && error.name === 'TimeoutError') ||
    (error instanceof GitHubRequestError &&
      (error.status === 408 || error.status === 429 || error.status >= 500))
  )
}

export async function retryGitHub<T>(
  request: () => Promise<T>,
  sleep: (milliseconds: number) => Promise<void> = wait,
) {
  let error: unknown
  for (let attempt = 0; attempt < retryAttempts; attempt += 1) {
    try {
      return await request()
    } catch (caught) {
      error = caught
      if (!retryable(caught) || attempt + 1 === retryAttempts) throw caught
      const retryAfter = caught instanceof GitHubRequestError ? caught.retryAfter : null
      await sleep(retryAfter ?? Math.min(4_000, 250 * 2 ** attempt))
    }
  }
  throw error
}

export function gitHubConfig(environment: NodeJS.ProcessEnv = process.env): GitHubConfig | null {
  const token = environment.GITHUB_TOKEN
  const appId = environment.GH_APP_ID
  const installationId = environment.GH_APP_INSTALLATION_ID
  const privateKey = environment.GH_APP_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!token && !(appId && installationId && privateKey)) return null

  const repository = environment.GITHUB_REPOSITORY || 'paradigmxyz/solar'
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('Invalid GITHUB_REPOSITORY')

  return {
    appId,
    installationId,
    privateKey,
    repository,
    token,
    workflow: environment.BENCHMARK_WORKFLOW || 'bench.yml',
  }
}

function appJwt(config: GitHubConfig) {
  if (!config.appId || !config.privateKey)
    throw new Error('GitHub App credentials are not configured')

  const issuedAt = Math.floor(Date.now() / 1000) - 30
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
  const claims = Buffer.from(
    JSON.stringify({ exp: issuedAt + 9 * 60, iat: issuedAt, iss: config.appId }),
  ).toString('base64url')
  const input = `${header}.${claims}`
  const signer = createSign('RSA-SHA256')
  signer.update(input)
  signer.end()
  return `${input}.${signer.sign(config.privateKey).toString('base64url')}`
}

export class GitHubClient {
  #installationToken: { expiresAt: number; value: string } | null = null
  #tokenRequest: Promise<string> | null = null

  constructor(readonly config: GitHubConfig) {}

  async #token() {
    if (this.config.token) return this.config.token
    if (this.#installationToken && this.#installationToken.expiresAt > Date.now())
      return this.#installationToken.value
    if (!this.#tokenRequest) {
      this.#tokenRequest = this.#requestToken().finally(() => {
        this.#tokenRequest = null
      })
    }
    return this.#tokenRequest
  }

  async #requestToken() {
    if (!this.config.installationId) throw new Error('GitHub App installation is not configured')

    return retryGitHub(async () => {
      const response = await fetch(
        `${api}app/installations/${this.config.installationId}/access_tokens`,
        {
          method: 'POST',
          headers: {
            accept: 'application/vnd.github+json',
            authorization: `Bearer ${appJwt(this.config)}`,
            'x-github-api-version': '2026-03-10',
          },
        },
      )
      if (!response.ok) throw await githubError(response)

      const token = (await response.json()) as GitHubAppToken
      const expiresAt = Math.min(Date.parse(token.expires_at) - 60_000, Date.now() + tokenLifetime)
      this.#installationToken = { expiresAt, value: token.token }
      return token.token
    })
  }

  async #headers(headers?: HeadersInit) {
    const result = new Headers(headers)
    result.set('accept', 'application/vnd.github+json')
    result.set('authorization', `Bearer ${await this.#token()}`)
    result.set('x-github-api-version', '2026-03-10')
    return result
  }

  async request<T>(path: string, init?: RequestInit): Promise<T> {
    return retryGitHub(async () => {
      const response = await fetch(new URL(path, api), {
        ...init,
        headers: await this.#headers(init?.headers),
        signal: AbortSignal.timeout(15_000),
      })
      if (!response.ok) throw await githubError(response)
      return (await response.json()) as T
    })
  }

  async runs(limit: number) {
    const query = new URLSearchParams({ per_page: String(limit), status: 'completed' })
    const result = await this.request<GitHubPage<GitHubRun>>(
      `repos/${this.config.repository}/actions/workflows/${this.config.workflow}/runs?${query}`,
    )
    return result.workflow_runs || []
  }

  async run(runId: number) {
    return this.request<GitHubRun>(`repos/${this.config.repository}/actions/runs/${runId}`)
  }

  async runForCommit(sha: string) {
    const query = new URLSearchParams({ head_sha: sha, per_page: '100', status: 'completed' })
    const result = await this.request<GitHubPage<GitHubRun>>(
      `repos/${this.config.repository}/actions/workflows/${this.config.workflow}/runs?${query}`,
    )
    return (
      result.workflow_runs?.find((run) => run.head_sha === sha && run.conclusion === 'success') ||
      null
    )
  }

  async artifact(runId: number) {
    const query = new URLSearchParams({ name: 'codegen-runtime-results', per_page: '100' })
    const result = await this.request<{ artifacts: GitHubArtifact[] }>(
      `repos/${this.config.repository}/actions/runs/${runId}/artifacts?${query}`,
    )
    return result.artifacts.find((artifact) => !artifact.expired) || null
  }

  async pullRequest(sha: string) {
    const pulls = await this.request<GitHubPullRequest[]>(
      `repos/${this.config.repository}/commits/${sha}/pulls`,
    )
    return pulls.find((pull) => pull.merged_at) || pulls[0] || null
  }

  async download(url: string) {
    return retryGitHub(async () => {
      const response = await fetch(url, {
        headers: await this.#headers(),
        redirect: 'follow',
        signal: AbortSignal.timeout(60_000),
      })
      if (!response.ok) throw await githubError(response)
      return response
    })
  }
}

async function githubError(response: Response) {
  const body = (await response.json().catch(() => ({}))) as GitHubError
  const retryAfter = Number(response.headers.get('retry-after'))
  return new GitHubRequestError(
    Number.isFinite(retryAfter) ? Math.min(retryAfter * 1_000, 10_000) : null,
    response.status,
    `GitHub request failed (${response.status}): ${body.message || 'Unknown error'}`,
  )
}
