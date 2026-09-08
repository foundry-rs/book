import { execFile } from 'node:child_process'
import { createServer } from 'node:http'
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { promisify } from 'node:util'
import { describe, expect, it } from 'vite-plus/test'

describe('local importer', () => {
  it('walks arbitrary compiler directories and rejects symlinks', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'perf-ingest-test-'))
    const inserts: string[] = []
    const server = createServer(async (request, response) => {
      let body = ''
      for await (const chunk of request) body += chunk
      if (
        new URL(request.url!, 'http://localhost').searchParams.get(
          'input_format_json_named_tuples_as_objects',
        ) !== '0'
      ) {
        response.writeHead(400)
        response.end('Snapshot tuples require array input mode')
        return
      }
      inserts.push(body)
      response.end('')
    })
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
    try {
      const artifactRoot = join(directory, 'artifacts')
      const nested = join(artifactRoot, 'test', 'experimental', 'passes')
      await mkdir(nested, { recursive: true })
      await writeFile(join(nested, 'phase α.log'), 'new pass output')
      await writeFile(join(nested, 'binary.bin'), new Uint8Array([0, 255]))
      await writeFile(
        join(directory, 'results.json'),
        JSON.stringify({ results: [{ test_id: 'test', compilers: { solar: { status: 'ok' } } }] }),
      )
      const address = server.address()
      if (!address || typeof address === 'string') throw new Error('No server address')
      const args = [
        resolve('scripts/ingest-run.mjs'),
        '--results',
        join(directory, 'results.json'),
        '--artifacts',
        artifactRoot,
        '--commit',
        'a'.repeat(40),
        '--workflow-run',
        '1',
      ]
      const environment = { ...process.env, CLICKHOUSE_HOST: `http://127.0.0.1:${address.port}` }
      await promisify(execFile)(process.execPath, args, { env: environment })
      expect(inserts.join('\n')).toContain('passes/phase α.log')
      expect(inserts.join('\n')).toContain('experimental')
      expect(inserts.join('\n')).not.toContain('binary.bin')
      expect(inserts).toHaveLength(2)
      expect(inserts[0]).toContain('INSERT INTO artifact_blobs')
      expect(inserts[1]).toContain('INSERT INTO run_snapshots')
      expect(await readFile(join(nested, 'phase α.log'), 'utf8')).toBe('new pass output')
      inserts.length = 0
      await symlink(join(directory, 'results.json'), join(nested, 'link.txt'))
      await expect(
        promisify(execFile)(process.execPath, args, { env: environment }),
      ).rejects.toThrow('symlink')
      expect(inserts).toHaveLength(0)
      await writeFile(join(directory, 'results.json'), JSON.stringify({ results: [] }))
      await expect(
        promisify(execFile)(process.execPath, args, { env: environment }),
      ).rejects.toThrow('no supported results')
      expect(inserts).toHaveLength(0)
    } finally {
      server.close()
      await rm(directory, { recursive: true, force: true })
    }
  })
})
