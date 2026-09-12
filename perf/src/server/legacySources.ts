import type { SourceLink } from '../types.ts'

// Solar benches/runtime/README.md provenance and named release refs resolved to
// immutable commits. Catalog paths are read from the selected run, not main.
const upstream: Record<string, [string, string]> = {
  'uniswap-v2-pair': ['Uniswap/v2-core', 'ee547b17853e71ed4e0101ccfd52e70d5acded58'],
  'openzeppelin-runtime': [
    'OpenZeppelin/openzeppelin-contracts',
    '6308fdc5e8e0d5e8a94dc9d5d4c79f6331334c81',
  ],
  'openzeppelin-5.6.1': [
    'OpenZeppelin/openzeppelin-contracts',
    '5fd1781b1454fd1ef8e722282f86f9293cacf256',
  ],
  'nitro-one-step-proof': [
    'OffchainLabs/nitro-contracts',
    '0b8c04e8f5f66fe6678a4f53aa15f23da417260e',
  ],
  'aave-l2-encoder': ['aave/aave-v3-core', '782f51917056a53a2c228701058a6c3fb233684a'],
  'lilweb3-ens': ['m1guelpf/lil-web3', '7346bd28c2586da3b07102d5290175a276949b15'],
  'lilweb3-runtime': ['m1guelpf/lil-web3', '7346bd28c2586da3b07102d5290175a276949b15'],
  'maple-erc20': ['maple-labs/erc20', 'baf791a9f894b0b319a2d42d5b9f8d30349ebaad'],
  'solady-0.1.26': ['Vectorized/solady', 'acd959aa4bd04720d640bf4e6a5c71037510cc4b'],
  'seaport-1.6': ['ProjectOpenSea/seaport', '22ea29df3c241ebc17c95268164dde47e1186287'],
  'v4-core-4.0.0': ['Uniswap/v4-core', 'e50237c43811bd9b526eff40f26772152a42daba'],
  'morpho-blue-1.0.0': ['morpho-org/morpho-blue', '55d2d99304fb3fb930c688462ae2ccabb1d533ad'],
  'forge-std-1.16.1': ['foundry-rs/forge-std', '620536fa5277db4e3fd46772d5cbc1ea0696fb43'],
  'prb-math-4.1.1': ['PaulRBerg/prb-math', 'b51e8631ed28d3cc917c491dd47cd6c3ff652edc'],
  'solmate-6': ['transmissions11/solmate', 'a9e3ea26a2dc73bfa87f0cb189687d029028e0c5'],
  'solarray-a547630': ['evmcheb/solarray', 'a547630f9bf7837af9e6919d217672afe7abf7f1'],
}

function sourceLink(repository: string, commit: string, path: string, label: string): SourceLink {
  return {
    label,
    url: `https://github.com/${repository}/${path ? 'blob' : 'tree'}/${commit}${path ? `/${path.split('/').map(encodeURIComponent).join('/')}` : ''}`,
  }
}

// Read supported literal fields; never execute a fetched Python catalog.
export function benchmarkSources(catalog: string, commit: string) {
  const sources: Record<string, SourceLink[]> = Object.create(null)
  // Also cover the rollout window: old importers discarded PR #1449 metadata
  // even though its catalogs already use shared Project/Source literals.
  const projects = new Map<string, { file: string; origins: [string, string][] }>()
  const definitions = [
    ...catalog.matchAll(
      /["']([\w.-]+)["']:\s*Project\(\s*["'][\w.-]+["'],\s*["']([\w.-]+\.json\.gz)["']/g,
    ),
  ]
  for (let i = 0; i < definitions.length; i++) {
    const definition = catalog.slice(
      definitions[i].index,
      definitions[i + 1]?.index ?? catalog.length,
    )
    projects.set(definitions[i][1], {
      file: definitions[i][2],
      origins: [
        ...definition.matchAll(/Source\(\s*["']([\w.-]+\/[\w.-]+)["'],\s*["']([a-f0-9]{40})["']/g),
      ].map((match) => [match[1], match[2]]),
    })
  }
  const cases = [...catalog.matchAll(/\btest_id\s*=\s*["']([\w.-]+)["']/g)]
  for (let i = 0; i < cases.length; i++) {
    const entry = catalog.slice(cases[i].index, cases[i + 1]?.index ?? catalog.length)
    const literal = (key: string) =>
      entry.match(new RegExp(`\\b${key}\\s*=\\s*["']([\\w./-]+)["']`))?.[1]
    const local =
      entry.match(/source_code\s*=\s*source\(["']([\w./-]+)["']\)/)?.[1] ??
      entry.match(/source_code\s*=\s*\(TESTDATA_ROOT\s*\/\s*["']([\w./-]+)["']\)/)?.[1]
    const links: SourceLink[] = []
    if (local && !local.split('/').includes('..'))
      links.push(sourceLink('paradigmxyz/solar', commit, `testdata/${local}`, local))
    const project = projects.get(
      entry.match(/\bproject\s*=\s*PROJECTS\[["']([\w.-]+)["']\]/)?.[1] ?? '',
    )
    const archive =
      literal('project_file') ??
      project?.file ??
      (literal('project')?.endsWith('.json.gz') ? literal('project') : undefined)
    if (archive && !archive.split('/').includes('..')) {
      const path = archive.includes('/') ? archive : `testdata/projects/${archive}`
      const name = archive.split('/').pop()!
      links.push(sourceLink('paradigmxyz/solar', commit, path, `Input: ${name}`))
      if (project) {
        for (const [repository, revision] of project.origins)
          links.push(sourceLink(repository, revision, '', repository))
        sources[cases[i][1]] = links
        continue
      }
      const origin = upstream[name.replace(/\.json\.gz$/, '')]
      if (origin) {
        // Aave's harness and Solar's wrappers aren't upstream files.
        const entrypoint =
          name === 'aave-l2-encoder.json.gz'
            ? 'contracts/misc/L2Encoder.sol'
            : local
              ? ''
              : (literal('source') ?? '')
        if (!entrypoint.split('/').includes('..'))
          links.push(
            sourceLink(
              ...origin,
              entrypoint,
              `${origin[0]} · ${entrypoint || name.replace(/\.json\.gz$/, '')} @ ${origin[1].slice(0, 8)}`,
            ),
          )
      }
      if (name === 'lilweb3-runtime.json.gz') {
        for (const file of [
          'ERC20.sol',
          ...(cases[i][1] === 'lilweb3-fractional' ? ['ERC721.sol'] : []),
        ])
          links.push(
            sourceLink(
              'transmissions11/solmate',
              'e802bcf2fb24dda2bf7e513bea86d15c48b57486',
              `src/tokens/${file}`,
              `solmate · ${file} @ e802bcf2`,
            ),
          )
      }
    }
    sources[cases[i][1]] = links
  }
  return sources
}
