import { expect, it } from 'vite-plus/test'
import { demoResponse } from '../src/server/demo'
import type { RunDocument } from '../src/types'

it('serves metrics and discovered artifacts for every demo compiler', async () => {
  const commit = '9d8c7b6a5e4f32100123456789abcdef01234567'
  const run: RunDocument = await demoResponse(`/api/data/runs/${commit}/run.json`)!.json()
  expect(Object.keys(run.results[0].compilers)).toEqual(['solar', 'solc', 'solx'])
  for (const [benchmark, files] of Object.entries(run.artifacts)) {
    for (const file of files) {
      for (const compiler of file.compilers) {
        const response = demoResponse(
          `/api/data/runs/${commit}/${encodeURIComponent(benchmark)}/${compiler}/${file.storagePath}`,
        )!
        expect(response.status).toBe(200)
        expect(await response.json()).toBeTypeOf('string')
      }
    }
  }
  expect(demoResponse(`/api/data/runs/${commit}/demo%3A%3Afactorial/solx/0.json`)!.status).toBe(404)
})
