import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { build } from 'vite'

const output = resolve(import.meta.dirname, '../../.vercel/output')
const directory = resolve(output, 'functions/perf-api.func')
await rm(directory, { force: true, recursive: true })
await mkdir(directory, { recursive: true })
await build({
  configFile: false,
  publicDir: false,
  ssr: { noExternal: true },
  build: {
    emptyOutDir: false,
    outDir: directory,
    rollupOptions: { input: resolve(import.meta.dirname, '../src/server/vercel-demo.ts'), output: { codeSplitting: false, entryFileNames: 'index.js', format: 'es' } },
    ssr: true,
    target: 'es2022',
  },
})
await writeFile(resolve(directory, '.vc-config.json'), '{"runtime":"edge","entrypoint":"index.js"}\n')
const configPath = resolve(output, 'config.json')
const config = JSON.parse(await readFile(configPath, 'utf8'))
const apiRoute = { src: '^/api(?:/(.*))?$', dest: '/perf-api?__perf_path=$1' }
const routes = (config.routes || []).filter((route) => route.src !== apiRoute.src)
const filesystem = routes.findIndex((route) => route.handle === 'filesystem')
routes.splice(filesystem < 0 ? 0 : filesystem, 0, apiRoute)
config.routes = routes
delete config.crons
await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`)
