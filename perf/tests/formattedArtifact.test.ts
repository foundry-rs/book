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

async function highlighter() {
  const { artifactThemes } = await import('../src/highlight')
  const { getSharedHighlighter } = await import('@pierre/diffs')
  const instance = await getSharedHighlighter({
    themes: Object.values(artifactThemes),
    langs: [],
    preferredHighlighter: 'highlights',
  })
  expect(instance.name).toBe('highlights')
  return instance
}

/** Colors of the tokens that cover the first occurrence of `text` in a line. */
function colorsOf(line: { content: string; color?: string }[], text: string) {
  const start = line
    .map((token) => token.content)
    .join('')
    .indexOf(text)
  expect(start, text).toBeGreaterThanOrEqual(0)
  const colors = new Set<string | undefined>()
  let offset = 0
  for (const token of line) {
    const end = offset + token.content.length
    if (end > start && offset < start + text.length) colors.add(token.color?.toLowerCase())
    offset = end
  }
  return [...colors]
}

it('highlights Solidity literals and balanced punctuation without changing source text', async () => {
  const { artifactLanguage, artifactThemes } = await import('../src/highlight')
  const lang = artifactLanguage('sources/Contract', 'solidity')
  const instance = await highlighter()
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
    const { tokens, fg } = instance.codeToTokens(source, { lang, theme })
    expect(tokens.map((line) => line.map((token) => token.content).join('')).join('\n')).toBe(
      source,
    )
    const [string, comment] = instance
      .codeToTokens('"literal"\n// comment', { lang, theme })
      .tokens.map((line) => line[0].color?.toLowerCase())
    for (const [line, literal] of [
      [0, '"./Base.sol"'],
      [1, '"base"'],
      [2, '"ERC20Mock"'],
      [2, "'E20M'"],
      [3, '"allowed"'],
      [4, String.raw`"ends in \\"`],
      [5, String.raw`"escaped \" quote"`],
    ] as const) {
      expect(colorsOf(tokens[line], literal), literal).toEqual([string])
    }
    // Strings and comments must close: later brackets and semicolons keep code colors.
    for (const line of [0, 1, 2, 3, 7, 8, 9]) {
      for (const token of tokens[line].filter((token) => /[()[\]{}]/.test(token.content)))
        expect([string, comment]).not.toContain(token.color?.toLowerCase())
    }
    expect(tokens[4].at(-1)?.color?.toLowerCase()).not.toBe(string)
    expect(tokens[5].at(-1)?.color?.toLowerCase()).not.toBe(string)
    expect(colorsOf(tokens[7], 'g')).not.toEqual([fg?.toLowerCase()])
  }
})

it('highlights Yul builtins, strings and block comments with the Solidity lexer', async () => {
  const { artifactLanguage, artifactThemes } = await import('../src/highlight')
  const lang = artifactLanguage('optimized-ir.yul', 'yul')
  expect(lang).toBe('solidity')
  expect(artifactLanguage('mir.mir', 'text')).toBe('asm')
  expect(artifactLanguage('runtime.evmir', 'text')).toBe('asm')
  const instance = await highlighter()
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
    const { tokens, fg } = instance.codeToTokens(source, { lang, theme })
    expect(tokens.map((line) => line.map((token) => token.content).join('')).join('\n')).toBe(
      source,
    )
    const [string, comment] = instance
      .codeToTokens('"literal"\n// comment', { lang, theme })
      .tokens.map((line) => line[0].color?.toLowerCase())
    // The Solidity lexer leaves Yul's `object`, `code` and `data` unstyled.
    for (const [line, builtin] of [
      [4, 'calldataload'],
      [5, 'mstore'],
      [6, 'return'],
    ] as const) {
      expect(colorsOf(tokens[line], builtin), builtin).not.toEqual([fg?.toLowerCase()])
    }
    expect(colorsOf(tokens[0], '"Contract"')).toEqual([string])
    expect(colorsOf(tokens[8], String.raw`"escaped\"name"`)).toEqual([string])
    expect(colorsOf(tokens[3], 'let hidden := 42')).toEqual([comment])
  }
})

it('keeps expression and comment colors inside Solidity declaration headers', async () => {
  const { artifactThemes } = await import('../src/highlight')
  const lang = 'solidity'
  const instance = await highlighter()
  const source = String.raw`contract C is Base(compute(42, "{;}"), 43 /* "ignored" */) {
    function f() external guard('it\'s') {}
    string constant X = "first\
second";
}`
  for (const theme of Object.values(artifactThemes)) {
    const { tokens, fg } = instance.codeToTokens(source, { lang, theme })
    expect(tokens.map((line) => line.map((token) => token.content).join('')).join('\n')).toBe(
      source,
    )
    const [string, comment, number] = instance
      .codeToTokens('"literal"\n// comment\n42', { lang, theme })
      .tokens.map((line) => line[0].color?.toLowerCase())
    expect(colorsOf(tokens[0], 'compute')).not.toEqual([fg?.toLowerCase()])
    expect(colorsOf(tokens[0], '42')).toEqual([number])
    expect(colorsOf(tokens[0], '43')).toEqual([number])
    expect(colorsOf(tokens[0], '"{;}"')).toEqual([string])
    expect(colorsOf(tokens[0], '/* "ignored" */')).toEqual([comment])
    expect(colorsOf(tokens[1], String.raw`'it\'s'`)).toEqual([string])
    expect(colorsOf(tokens[3], 'second"')).toEqual([string])
  }
})

it('highlights native assembly, EVM code and LLVM IR with the assembly lexer', async () => {
  const { artifactLanguage, artifactThemes } = await import('../src/highlight')
  expect(artifactLanguage('opt.s', 'text')).toBe('asm')
  expect(artifactLanguage('unopt.ll', 'text')).toBe('asm')
  expect(artifactLanguage('bytecode.txt', 'text')).toBe('text')
  const instance = await highlighter()
  // The lexer styles an instruction only where a line starts with it, so LLVM assignments such
  // as `%0 = load ...` keep their opcode unstyled.
  for (const [path, source, keyword] of [
    ['opt.s', '  mov rcx, qword ptr [rax + 168]', 'mov'],
    ['unopt.ll', '  %0 = load i64, ptr %gas, align 8', '8'],
    ['unopt.ll', '  store i64 %0, ptr %gas, align 8', 'store'],
    ['runtime.disasm', 'PUSH1 0x80 ; bb0', 'PUSH1'],
    ['mir.mir', '  jumpi v27, bb7, bb8', 'jumpi'],
    ['runtime.evmir', '  push 0x3fa4f245', 'push'],
  ]) {
    const lang = artifactLanguage(path, 'text')
    for (const theme of Object.values(artifactThemes)) {
      const { tokens, fg } = instance.codeToTokens(source, { lang, theme })
      expect(tokens[0].map((token) => token.content).join('')).toBe(source)
      expect(colorsOf(tokens[0], keyword), path).not.toEqual([fg?.toLowerCase()])
    }
  }
})
