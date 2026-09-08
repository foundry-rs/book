import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { build } from 'vite'

const output = resolve(import.meta.dirname, '../../.vercel/output')
for (const [name, entry] of [
  ['perf-api', 'vercel.ts'],
  ['perf-worker', 'vercel-worker.ts'],
]) {
  const directory = resolve(output, `functions/${name}.func`)
  await rm(directory, { force: true, recursive: true })
  await mkdir(directory, { recursive: true })
  await build({
    configFile: false,
    publicDir: false,
    ssr: { noExternal: true },
    build: {
      emptyOutDir: false,
      outDir: directory,
      rollupOptions: {
        input: resolve(import.meta.dirname, `../src/server/${entry}`),
        output: { codeSplitting: false, entryFileNames: 'index.cjs', format: 'cjs' },
      },
      ssr: true,
      target: 'es2022',
    },
  })
  await writeFile(
    resolve(directory, '.vc-config.json'),
    `${JSON.stringify({ runtime: 'nodejs24.x', handler: 'index.cjs', launcherType: 'Nodejs', maxDuration: 300, supportsResponseStreaming: true })}\n`,
  )
}
const configPath = resolve(output, 'config.json')
const config = JSON.parse(await readFile(configPath, 'utf8'))
const apiRoute = { src: '^/api(?:/(.*))?$', dest: '/perf-api?__perf_path=$1' }
const workerRoute = { src: '^/api/worker/(.*)$', dest: '/perf-worker?__perf_path=worker/$1' }
const routes = (config.routes || []).filter(
  (route) => route.src !== apiRoute.src && route.src !== workerRoute.src,
)
// Claim API requests before Vocs' Markdown and bot user-agent routes, which
// otherwise send extensionless endpoints (including health) to the docs server.
routes.unshift(workerRoute, apiRoute)
config.routes = routes
config.crons = [{ path: '/api/worker/tick', schedule: '*/15 * * * *' }]
await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`)
