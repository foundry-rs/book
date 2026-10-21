import { afterEach, expect, it, vi } from 'vite-plus/test'

afterEach(() => vi.unstubAllGlobals())

it('retains formatted contents across viewer visits and formats large files', async () => {
  vi.resetModules()
  const fetch = vi.fn(async () => new Response('{"value":1}'))
  vi.stubGlobal('fetch', fetch)
  const { loadDiffFile } = await import('../src/formattedArtifact')
  const source = {
    commit: 'a'.repeat(40),
    benchmark: 'test',
    compiler: 'solar',
    storagePath: '1.json',
    label: 'Solar',
    contentHash: 'b'.repeat(64),
  }
  const first = await loadDiffFile(source, 'output.json', 'json')
  expect(first?.contents).toBe('{\n  "value": 1\n}\n')
  expect(first?.cacheKey).toBeTruthy()
  expect(await loadDiffFile(source, 'output.json', 'json')).toBe(first)
  expect(fetch).toHaveBeenCalledOnce()
  const value = 'x'.repeat(1024 * 1024)
  fetch.mockImplementation(async () => new Response(`{"value":"${value}"}`))
  const large = await loadDiffFile(
    { ...source, contentHash: 'c'.repeat(64) },
    'output.json',
    'json',
  )
  expect(large?.contents).toBe(`{\n  "value": "${value}"\n}\n`)
  expect(large?.cacheKey).toBeTruthy()
})

it('maps every artifact format to a Highlights lexer', async () => {
  const { artifactLanguage, artifactThemes } = await import('../src/highlight')
  const { getSharedHighlighter } = await import('@pierre/diffs')
  const highlighter = await getSharedHighlighter({
    themes: Object.values(artifactThemes),
    langs: [],
    preferredHighlighter: 'highlights',
  })
  expect(highlighter.name).toBe('highlights')
  expect(artifactLanguage('bytecode.txt', 'text')).toBe('text')
  for (const [path, language, source, keyword] of [
    ['sources/Contract', 'solidity', 'contract C { function f() external {} }', 'function'],
    ['optimized-ir.yul', 'text', 'let value := calldataload(0)', 'let'],
    ['runtime.disasm', 'text', 'PUSH1 0x80 ; bb0', 'PUSH1'],
    ['mir.mir', 'text', '  jumpi v27, bb7, bb8', 'jumpi'],
    ['runtime.evmir', 'text', '  push 0x3fa4f245', 'push'],
    ['unopt.ll', 'text', '  store i64 %0, ptr %gas, align 8 ; >> PUSH1', 'store'],
    ['opt.s', 'text', '  mov rcx, qword ptr [rax + 168]', 'mov'],
  ]) {
    const lang = artifactLanguage(path, language)
    for (const theme of Object.values(artifactThemes)) {
      const { tokens, fg } = highlighter.codeToTokens(source, { lang, theme })
      expect(tokens[0].map((token) => token.content).join('')).toBe(source)
      const color = tokens[0].find((token) => token.content.trim() === keyword)?.color
      expect(color, path).toBeTypeOf('string')
      expect(color?.toLowerCase(), path).not.toBe(fg?.toLowerCase())
    }
  }
})
