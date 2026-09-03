import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { build } from 'vite'

const output = resolve(import.meta.dirname, '../../.vercel/output')
const functionDirectory = resolve(output, 'functions/api.func')
const configPath = resolve(output, 'config.json')

await rm(functionDirectory, { force: true, recursive: true })
await mkdir(functionDirectory, { recursive: true })
await build({
  configFile: false,
  publicDir: false,
  ssr: {
    noExternal: true,
  },
  build: {
    emptyOutDir: false,
    minify: false,
    outDir: functionDirectory,
    rollupOptions: {
      input: resolve(import.meta.dirname, '../src/server/vercel.ts'),
      output: {
        codeSplitting: false,
        entryFileNames: 'index.js',
        format: 'cjs',
      },
    },
    ssr: true,
    target: 'node22',
  },
})

await writeFile(
  resolve(functionDirectory, '.vc-config.json'),
  `${JSON.stringify(
    {
      handler: 'index.js',
      launcherType: 'Nodejs',
      maxDuration: 60,
      runtime: 'nodejs22.x',
      shouldAddHelpers: true,
    },
    null,
    2,
  )}\n`,
)
await writeFile(resolve(functionDirectory, 'package.json'), '{"type":"commonjs"}\n')

const config = JSON.parse(await readFile(configPath, 'utf8'))
const apiRoute = {
  dest: '/api?__perf_path=$1',
  src: '^/api(?:/(.*))?$',
}
const routes = (config.routes || []).filter((route) => route.src !== apiRoute.src)
const filesystem = routes.findIndex((route) => route.handle === 'filesystem')
routes.splice(filesystem < 0 ? 0 : filesystem, 0, apiRoute)
config.routes = routes
config.crons = [{ path: '/api/worker/tick', schedule: '*/15 * * * *' }]
await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`)
