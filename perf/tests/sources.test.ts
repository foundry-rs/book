import { describe, expect, it } from 'vite-plus/test'
import { benchmarkSources } from '../src/server/legacySources'

it('backfills shared Project/Source catalogs from the producer rollout window', () => {
  const commit = 'a'.repeat(40)
  const sources = benchmarkSources(
    `
    PROJECTS = {"example": Project("example", "example.json.gz", (Source("owner/example", "${commit}"),))}
    TestCase(test_id="new-case", project=PROJECTS["example"], source="src/Example.sol")
  `,
    commit,
  )
  expect(sources['new-case']).toEqual([
    {
      label: 'Input: example.json.gz',
      url: `https://github.com/paradigmxyz/solar/blob/${commit}/testdata/projects/example.json.gz`,
    },
    { label: 'owner/example', url: `https://github.com/owner/example/tree/${commit}` },
  ])
})

describe('benchmark sources', () => {
  const commit = 'a'.repeat(40)
  it('links literal local sources to the selected Solar commit', () => {
    const sources = benchmarkSources(
      `TestCase(test_id="factorial", source_code=source("Factorial.sol")),
      TestCase(test_id="new-test", source_code=(TESTDATA_ROOT / "runtime/New.sol").read_text())`,
      commit,
    )
    expect(sources.factorial[0].url).toBe(
      `https://github.com/paradigmxyz/solar/blob/${commit}/testdata/Factorial.sol`,
    )
    expect(sources['new-test'][0].url).toContain(`/testdata/runtime/New.sol`)
  })
  it('links Lil Web3 input, exact source and pinned Solmate dependencies', () => {
    const links = benchmarkSources(
      `TestCase(test_id="lilweb3-fractional", project_file="lilweb3-runtime.json.gz", source="src/LilFractional.sol")`,
      commit,
    )['lilweb3-fractional']
    expect(links.map((link) => link.url)).toEqual([
      `https://github.com/paradigmxyz/solar/blob/${commit}/testdata/projects/lilweb3-runtime.json.gz`,
      'https://github.com/m1guelpf/lil-web3/blob/7346bd28c2586da3b07102d5290175a276949b15/src/LilFractional.sol',
      'https://github.com/transmissions11/solmate/blob/e802bcf2fb24dda2bf7e513bea86d15c48b57486/src/tokens/ERC20.sol',
      'https://github.com/transmissions11/solmate/blob/e802bcf2fb24dda2bf7e513bea86d15c48b57486/src/tokens/ERC721.sol',
    ])
  })
  it('preserves historical archive locations and OpenZeppelin revisions', () => {
    const links = benchmarkSources(
      `TestCase(test_id="openzeppelin-erc20-mock", project_file="testdata/codegen-runtime/projects/openzeppelin-runtime.json.gz", source="contracts/mocks/token/ERC20Mock.sol")`,
      commit,
    )['openzeppelin-erc20-mock']
    expect(links[0].url).toContain(
      '/testdata/codegen-runtime/projects/openzeppelin-runtime.json.gz',
    )
    expect(links[1].url).toContain(
      '/6308fdc5e8e0d5e8a94dc9d5d4c79f6331334c81/contracts/mocks/token/ERC20Mock.sol',
    )
  })
  it('handles versioned whole-project IDs', () => {
    const links = benchmarkSources(
      `TestCase(test_id="forge-std-1.16.1-project", project_file="forge-std-1.16.1.json.gz", whole_project=True)`,
      commit,
    )['forge-std-1.16.1-project']
    expect(links).toHaveLength(2)
    expect(links[1].url).toBe(
      'https://github.com/foundry-rs/forge-std/tree/620536fa5277db4e3fd46772d5cbc1ea0696fb43',
    )
  })
  it('includes both local wrapper and archive without inventing an upstream wrapper', () => {
    const links = benchmarkSources(
      `TestCase(test_id="solady-encoding", source_code=(TESTDATA_ROOT / "runtime/Encoding.sol").read_text(), project_file="solady-0.1.26.json.gz", source="Encoding.sol")`,
      commit,
    )['solady-encoding']
    expect(links).toHaveLength(3)
    expect(links[0].url).toContain('/testdata/runtime/Encoding.sol')
    expect(links[2].url).toBe(
      'https://github.com/Vectorized/solady/tree/acd959aa4bd04720d640bf4e6a5c71037510cc4b',
    )
  })
  it('does not invent sources for unsupported expressions or traversal paths', () => {
    expect(
      benchmarkSources(
        `TestCase(test_id="unknown", source_code=generate()), TestCase(test_id="invalid", source_code=source("../secret"))`,
        commit,
      ),
    ).toEqual({ unknown: [], invalid: [] })
  })
})
