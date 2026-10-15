import { createHash } from 'node:crypto'

import { expect, it } from 'vite-plus/test'
import { publication, publicationBlobs } from '../src/server/publication'
import { normalizeResults } from '../src/server/normalizeResults'
import { projects } from '../src/projects'

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

it('stores project metrics without fixed columns and keeps Solar snapshot identities', () => {
  const commit = 'b'.repeat(40)
  const document = {
    commit,
    metrics: { jit_size_bytes: {}, spills: {} },
    results: [
      {
        test_id: 'weth',
        suite: 'jit',
        compilers: {
          evm2: {
            status: 'ok',
            jit_size_bytes: 21851,
            opt_s_lines: 7800,
            compile_time_seconds: 0.21,
            spills: 0,
            frame_bytes: 30,
          },
        },
      },
    ],
  }
  const rows = normalizeResults(document, { workflowRunId: 7, commit }, projects.evm2)
  // Declared metrics (config or document) are kept, including zero; undeclared fields are not.
  // compile_time_seconds keeps its existing snapshot column.
  expect(rows[0].metrics).toEqual({ jit_size_bytes: 21851, opt_s_lines: 7800, spills: 0 })
  expect(rows[0].compile_time_seconds).toBe(0.21)
  const run = { project: 'evm2', commit, workflow_run_id: 7 }
  const snapshot = publication(run, rows, [])
  expect(snapshot.project).toBe('evm2')
  expect(snapshot.metric_values).toEqual({ 'weth/evm2': rows[0].metrics })
  expect(publication({ ...run, project: 'other' }, rows, []).revision).not.toBe(snapshot.revision)

  // Solar rows have no extra metrics, so their revision hash covers the same fields as before.
  const solar = normalizeResults([{ test_id: 'a', solar: { status: 'ok', runtimeGas: 1 } }], {
    workflowRunId: 7,
    commit,
  })
  expect(solar[0].metrics).toEqual({})
  const solarSnapshot = publication({ commit, workflow_run_id: 7 }, solar, [])
  const { revision, source_links: _, project, ...hashed } = solarSnapshot
  expect(project).toBe('solar')
  expect(hashed).not.toHaveProperty('metric_values')
  expect(revision).toBe(createHash('sha256').update(JSON.stringify(hashed)).digest('hex'))
})
