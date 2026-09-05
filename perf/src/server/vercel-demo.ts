import { demoResponse } from './demo'

/**
 * Credential-free Vercel entrypoint. This is emitted as an Edge Build Output
 * function because Vercel can deploy that artifact without a Node function
 * package. When GitHub App and ClickHouse credentials are configured, point
 * the build script back at `vercel.ts` and restore its Node function config.
 */
export default function handler(request: Request) {
  const url = new URL(request.url)
  const path = url.searchParams.get('__perf_path')
  const pathname = path ? `/api/${path}` : url.pathname

  return demoResponse(pathname) ?? Response.json({ error: 'Not found' }, { status: 404 })
}
