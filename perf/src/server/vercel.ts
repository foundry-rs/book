import { Readable } from 'node:stream'

import app from './api'

function requestUrl(request: import('node:http').IncomingMessage) {
  const url = new URL(request.url || '/', `https://${request.headers.host || 'localhost'}`)
  // The Build Output route forwards every /api/* request to one function. Preserve
  // the original API path in a query parameter for the Node launcher adapter.
  const path = url.searchParams.get('__perf_path')
  if (path) {
    url.pathname = `/api/${path}`
    url.searchParams.delete('__perf_path')
  }
  return url
}

export default async function handler(
  request: import('node:http').IncomingMessage,
  response: import('node:http').ServerResponse,
) {
  const method = request.method || 'GET'
  const body =
    method === 'GET' || method === 'HEAD'
      ? undefined
      : (Readable.toWeb(request) as unknown as BodyInit)
  const init: RequestInit & { duplex?: 'half' } = {
    body,
    // Required by Node when passing a ReadableStream request body.
    duplex: body ? 'half' : undefined,
    headers: request.headers as HeadersInit,
    method,
  }
  const webRequest = new Request(requestUrl(request), init)
  const webResponse = await app.fetch(webRequest)
  response.statusCode = webResponse.status
  webResponse.headers.forEach((value, key) => response.setHeader(key, value))
  if (!webResponse.body) return response.end()
  Readable.fromWeb(webResponse.body as never).pipe(response)
}
