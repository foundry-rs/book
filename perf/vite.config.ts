import { defineConfig, lazyPlugins } from 'vite-plus'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import api from './src/server/api'
import { demoResponse } from './src/server/demo'

function localApi(): Plugin {
  return {
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (!request.url?.startsWith('/api/')) return next()
        void (async () => {
          const headers = new Headers()
          for (const [name, value] of Object.entries(request.headers)) {
            if (value) headers.set(name, Array.isArray(value) ? value.join(', ') : value)
          }
          const localRequest = new Request(`http://127.0.0.1${request.url}`, {
            headers,
            method: request.method || 'GET',
          })
          const result =
            (process.env.PERF_DEMO_DATA === '1' &&
              demoResponse(new URL(localRequest.url).pathname)) ||
            (await api.fetch(localRequest))
          response.statusCode = result.status
          for (const [name, value] of result.headers) response.setHeader(name, value)
          if (!result.body) return response.end()
          for await (const chunk of result.body) {
            if (response.write(chunk)) continue
            await new Promise<void>((resolve, reject) => {
              response.once('drain', resolve)
              response.once('error', reject)
            })
          }
          response.end()
        })().catch((error) => next(error))
      })
    },
    name: 'local-api',
  }
}

export default defineConfig({
  base: '/perf/',
  plugins: lazyPlugins(() => [localApi(), react(), tailwindcss()]),
  build: {
    outDir: process.env.PERF_OUT_DIR,
    target: 'es2022',
  },
  fmt: {
    ignorePatterns: ['dist/**'],
    semi: false,
    singleQuote: true,
  },
  lint: {
    ignorePatterns: ['dist'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})
