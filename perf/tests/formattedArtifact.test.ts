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

it('highlights Solidity literals and balanced punctuation without changing source text', async () => {
  const { artifactLanguage, artifactThemes } = await import('../src/highlight')
  const { getSharedHighlighter } = await import('@pierre/diffs')
  const lang = artifactLanguage('sources/Contract', 'solidity')
  const highlighter = await getSharedHighlighter({
    themes: Object.values(artifactThemes),
    langs: [lang],
  })
  const source = String.raw`import {Base} from "./Base.sol";
contract C is Base("base") {
    constructor() Base("ERC20Mock", 'E20M') {}
    function f(uint256[] memory a) external guard("allowed") {
        string memory path = "ends in \\";
        string memory quote = "escaped \" quote";
        // Brackets and quotes inside a comment: ([{ " '
        a[0] = g((1));
    }
}`
  for (const theme of Object.values(artifactThemes)) {
    const { tokens, fg } = highlighter.codeToTokens(source, { lang, theme })
    expect(tokens.map((line) => line.map((token) => token.content).join('')).join('\n')).toBe(
      source,
    )
    const stringColor = highlighter.codeToTokens('"literal"', { lang, theme }).tokens[0][0].color
    for (const literal of [
      '"./Base.sol"',
      '"base"',
      '"ERC20Mock"',
      "'E20M'",
      '"allowed"',
      String.raw`"ends in \\"`,
      String.raw`"escaped \" quote"`,
    ]) {
      expect(tokens.flat().find((token) => token.content === literal)?.color).toBe(stringColor)
    }
    // Exclude strings and comments whose brackets must retain their own scopes.
    for (const line of [
      tokens[0],
      tokens[1],
      tokens[2],
      tokens[3],
      tokens[7],
      tokens[8],
      tokens[9],
    ]) {
      for (const token of line.filter((token) => /[()[\]{}]/.test(token.content)))
        expect(token.color?.toLowerCase()).toBe(fg?.toLowerCase())
    }
    expect(tokens[4].at(-1)?.color?.toLowerCase()).toBe(fg?.toLowerCase())
    expect(tokens[5].at(-1)?.color?.toLowerCase()).toBe(fg?.toLowerCase())
    expect(tokens[7].find((token) => token.content === 'g')?.color?.toLowerCase()).not.toBe(
      fg?.toLowerCase(),
    )
  }
})

it('uses the upstream Yul grammar for objects, builtins, strings and block comments', async () => {
  const { artifactLanguage, artifactThemes } = await import('../src/highlight')
  const { getSharedHighlighter } = await import('@pierre/diffs')
  const lang = artifactLanguage('optimized-ir.yul', 'text')
  expect(lang).toBe('yul')
  expect(artifactLanguage('mir.mir', 'text')).toBe('solar-ir')
  expect(artifactLanguage('runtime.evmir', 'text')).toBe('solar-ir')
  const highlighter = await getSharedHighlighter({
    themes: Object.values(artifactThemes),
    langs: [lang],
  })
  const source = String.raw`object "Contract" {
  code {
    /* mstore(0, "not a string")
       let hidden := 42 */
    let value := calldataload(0)
    mstore(0, value)
    return(0, 32)
  }
  data "escaped\"name" hex"abcd"
}`
  for (const theme of Object.values(artifactThemes)) {
    const { tokens } = highlighter.codeToTokens(source, { lang, theme, includeExplanation: true })
    expect(tokens.map((line) => line.map((token) => token.content).join('')).join('\n')).toBe(
      source,
    )
    const scoped = tokens.flat().flatMap((token) => token.explanation ?? [])
    for (const [content, scope] of [
      ['object', 'keyword'],
      ['calldataload', 'entity.name.type.class'],
      ['mstore', 'entity.name.type.class'],
      ['return', 'entity.name.type.class'],
      ['"Contract"', 'string'],
      [String.raw`"escaped\"name"`, 'string'],
      ['       let hidden := 42 ', 'comment'],
    ]) {
      expect(
        scoped
          .filter((part) => part.content === content)
          .map((part) => part.scopes.at(-1)?.scopeName),
      ).toEqual([scope])
    }
  }
})

it('keeps expression and comment scopes inside Solidity declaration headers', async () => {
  const { artifactThemes } = await import('../src/highlight')
  const { getSharedHighlighter } = await import('@pierre/diffs')
  const lang = 'solar-solidity'
  const highlighter = await getSharedHighlighter({
    themes: Object.values(artifactThemes),
    langs: [lang],
  })
  const source = String.raw`contract C is Base(compute(42, "{;}"), 43 /* "ignored" */) {
    function f() external guard('it\'s') {}
    string constant X = "first\
second";
}`
  for (const theme of Object.values(artifactThemes)) {
    const { tokens } = highlighter.codeToTokens(source, { lang, theme, includeExplanation: true })
    expect(tokens.map((line) => line.map((token) => token.content).join('')).join('\n')).toBe(
      source,
    )
    const scoped = tokens.flat().flatMap((token) => token.explanation ?? [])
    for (const [content, scope] of [
      ['compute', 'entity.name.function'],
      ['42', 'constant.numeric.decimal'],
      ['43', 'constant.numeric.decimal'],
      ['{;}', 'string.quoted.double'],
      [' "ignored" ', 'comment.block'],
      ['second', 'string.quoted.double'],
    ]) {
      expect(
        scoped
          .filter((part) => part.content === content)
          .map((part) => part.scopes.at(-1)?.scopeName),
      ).toEqual([scope])
    }
    const stringColor = highlighter.codeToTokens('"literal"', { lang, theme }).tokens[0][0].color
    expect(tokens[1].find((token) => token.content === String.raw`'it\'s'`)?.color).toBe(
      stringColor,
    )
  }
})

it('highlights native assembly and LLVM IR with bundled grammars', async () => {
  const { artifactLanguage, artifactThemes } = await import('../src/highlight')
  const { getSharedHighlighter } = await import('@pierre/diffs')
  expect(artifactLanguage('opt.s', 'text')).toBe('asm')
  expect(artifactLanguage('unopt.ll', 'text')).toBe('llvm')
  expect(artifactLanguage('bytecode.txt', 'text')).toBe('text')
  const highlighter = await getSharedHighlighter({
    themes: Object.values(artifactThemes),
    langs: ['asm', 'llvm'],
  })
  for (const [lang, source, keyword] of [
    ['asm', '  mov rcx, qword ptr [rax + 168]', 'mov'],
    ['llvm', '  %0 = load i64, ptr %gas, align 8', 'load'],
  ]) {
    const { tokens, fg } = highlighter.codeToTokens(source, { lang, theme: artifactThemes.light })
    expect(tokens[0].map((token) => token.content).join('')).toBe(source)
    expect(
      tokens[0].find((token) => token.content.trim() === keyword)?.color?.toLowerCase(),
    ).not.toBe(fg?.toLowerCase())
  }
})
