import { expect, it } from 'vite-plus/test'
import { publication, publicationBlobs } from '../src/server/publication'

it('publishes deterministic snapshots independent of input order and preserves attempts', () => {
  const run = { commit: 'a'.repeat(40), workflow_run_id: 3, run_attempt: 2 }
  const rows = [
    { test_id: 'b', compiler: 'solar', label: 'solar abc' },
    { test_id: 'a', compiler: 'solc' },
  ]
  const files = [
    {
      test_id: 'b',
      path: 'x',
      compiler: 'solar',
      content: 'x',
      content_sha256: 'hash',
      storage_path: '1.json',
    },
  ]
  const first = publication(run, rows, files)
  expect(publication(run, [...rows].reverse(), files)).toEqual(first)
  expect(first.run_attempt).toBe(2)
  expect(first.benchmark_count).toBe(2)
  expect(publication({ ...run, run_attempt: 3 }, rows, files).revision).not.toBe(first.revision)
  expect(publicationBlobs([...files, ...files])).toHaveLength(1)
})
