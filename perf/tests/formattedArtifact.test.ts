import { afterEach, expect, it, vi } from 'vite-plus/test'

afterEach(() => vi.unstubAllGlobals())

it('retains formatted contents across viewer visits and keeps large files unparsed', async () => {
  vi.resetModules()
  const fetch = vi.fn(async () => Response.json('{"value":1}'))
  vi.stubGlobal('fetch', fetch)
  const { loadDiffFile, maxInteractiveArtifact } = await import('../src/formattedArtifact')
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
  const large = `{"value":"${'x'.repeat(maxInteractiveArtifact)}"}`
  fetch.mockImplementation(async () => Response.json(large))
  expect(
    await loadDiffFile({ ...source, contentHash: 'c'.repeat(64) }, 'output.json', 'json'),
  ).toEqual({ name: 'output.json', lang: 'json', contents: large })
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
    for (const literal of ['"./Base.sol"', '"base"', '"ERC20Mock"', "'E20M'", '"allowed"']) {
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
