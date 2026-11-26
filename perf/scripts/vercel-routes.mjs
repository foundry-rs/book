// API routes that Vocs serves from the docs function: the docs MCP server
// (`/api/mcp`, `/api/mcp/messages`), page feedback, search and OG images.
export const vocsApiRoutes = ['feedback', 'mcp', 'og', 'search']

export const apiRoute = {
  src: `^/api(?!/(?:${vocsApiRoutes.join('|')})(?:/|$))(?:/(.*))?$`,
  dest: '/perf-api?__perf_path=$1',
}
export const workerRoute = {
  src: '^/api/worker/(.*)$',
  dest: '/perf-worker?__perf_path=worker/$1',
}
