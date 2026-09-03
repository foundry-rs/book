const benchmarkHarness =
  'https://github.com/walnuthq/solidity-compiler-benchmarks/blob/01209d2b8ac81645b92e3ef801b5bcdfd61bfd69/gas_bench.py'

interface BenchmarkSource {
  label: string
  url: string
}

const sources: Record<string, BenchmarkSource> = {
  factorial: {
    label: 'Benchmark source',
    url: `${benchmarkHarness}#L79-L107`,
  },
  'sum-array': {
    label: 'Benchmark source',
    url: `${benchmarkHarness}#L136-L160`,
  },
  arithmetic: {
    label: 'Benchmark source',
    url: `${benchmarkHarness}#L161-L185`,
  },
  'uniswap-v2-pair': {
    label: 'Uniswap v2-core',
    url: 'https://github.com/Uniswap/v2-core/blob/ee547b17853e71ed4e0101ccfd52e70d5acded58/contracts/UniswapV2Pair.sol',
  },
  'openzeppelin-erc20-mock': {
    label: 'OpenZeppelin Contracts',
    url: 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.6.1/contracts/mocks/token/ERC20Mock.sol',
  },
  'openzeppelin-vesting-wallet': {
    label: 'OpenZeppelin Contracts',
    url: 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.6.1/contracts/finance/VestingWallet.sol',
  },
  'nitro-one-step-proof': {
    label: 'Nitro contracts',
    url: 'https://github.com/OffchainLabs/nitro-contracts/blob/0b8c04e8f5f66fe6678a4f53aa15f23da417260e/src/osp/OneStepProofEntry.sol',
  },
  'aave-l2-encoder': {
    label: 'Benchmark harness',
    url: 'https://github.com/walnuthq/solidity-compiler-benchmarks/blob/01209d2b8ac81645b92e3ef801b5bcdfd61bfd69/fixtures/aave/L2EncoderHarness.sol',
  },
  'lilweb3-ens': {
    label: 'lil-web3',
    url: 'https://github.com/m1guelpf/lil-web3/blob/7346bd28c2586da3b07102d5290175a276949b15/src/LilENS.sol',
  },
  'lilweb3-flashloan': {
    label: 'lil-web3',
    url: 'https://github.com/m1guelpf/lil-web3/blob/7346bd28c2586da3b07102d5290175a276949b15/src/LilFlashloan.sol',
  },
  'lilweb3-fractional': {
    label: 'lil-web3',
    url: 'https://github.com/m1guelpf/lil-web3/blob/7346bd28c2586da3b07102d5290175a276949b15/src/LilFractional.sol',
  },
  'maple-erc20': {
    label: 'Maple ERC20',
    url: 'https://github.com/maple-labs/erc20/blob/baf791a9f894b0b319a2d42d5b9f8d30349ebaad/contracts/ERC20.sol',
  },
  'openzeppelin-governor': {
    label: 'OpenZeppelin Contracts',
    url: 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.6.1/test/governance/Governor.t.sol',
  },
  'solady-signature-checker': {
    label: 'Solady',
    url: 'https://github.com/Vectorized/solady/blob/v0.1.26/test/SignatureCheckerLib.t.sol',
  },
  'solady-lib-string': {
    label: 'Solady',
    url: 'https://github.com/Vectorized/solady/blob/v0.1.26/test/LibString.t.sol',
  },
}

export function benchmarkSource(testId: string, solarCommit: string): BenchmarkSource {
  if (testId === 'counter') {
    return {
      label: 'Benchmark source',
      url: `https://github.com/paradigmxyz/solar/blob/${solarCommit}/testdata/Counter.sol`,
    }
  }

  return (
    sources[testId] ?? {
      label: 'Benchmark definition',
      url: `https://github.com/paradigmxyz/solar/blob/${solarCommit}/benches/runtime/cases.py`,
    }
  )
}
