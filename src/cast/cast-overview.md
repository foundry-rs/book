## Overview of `cast`

`cast` is Foundry's command-line tool for performing Ethereum RPC calls. You can make smart contract calls, send transactions, or retrieve any type of chain data - all from your command-line!

### How to use `cast`

To use `cast`, use the `cast` keyword followed by a subcommand:
```bash
$ cast <subcommand>
```

#### Example
Let's use `cast` to retrieve the total supply of the DAI token:
```bash
$ cast call 0x6b175474e89094c44da98b954eedeac495271d0f "totalSupply()(uint256)" --rpc-url <your_rpc_url>
9086622410684231497979028744
```
<br>

> 📚 See the [`cast` Reference](../reference/cast.md) for a complete overview of all the available subcommands.