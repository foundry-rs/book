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
      input: resolve(import.meta.dirname, '../src/server/vercel-demo.ts'),
      output: {
        codeSplitting: false,
        entryFileNames: 'index.js',
        format: 'es',
      },
    },
    ssr: true,
    target: 'es2022',
  },
})

await writeFile(
  resolve(functionDirectory, '.vc-config.json'),
  `${JSON.stringify(
    {
      entrypoint: 'index.js',
      runtime: 'edge',
    },
    null,
    2,
  )}\n`,
)

const config = JSON.parse(await readFile(configPath, 'utf8'))
const apiRoute = {
  dest: '/api?__perf_path=$1',
  src: '^/api(?:/(.*))?$',
}
const routes = (config.routes || []).filter((route) => route.src !== apiRoute.src)
const filesystem = routes.findIndex((route) => route.handle === 'filesystem')
routes.splice(filesystem < 0 ? 0 : filesystem, 0, apiRoute)
config.routes = routes
delete config.crons
await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`)
