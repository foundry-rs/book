## RPC related cheatcodes

### Signature

```solidity
// Returns the URL for a configured alias
function rpcUrl(string calldata alias) external returns (string memory);
// Returns all configured (alias, URL) pairs
function rpcUrls() external returns(string[2][] memory);
/// Performs an Ethereum JSON-RPC request to the current fork URL.
function rpc(string calldata method, string calldata params) external returns (bytes memory data);
```

### Description

Provides cheatcodes to access all RPC endpoints configured in the `rpc_endpoints` object of the `foxar.toml`, and the ability to make `rpc` calls using the configured fork URL.

### Examples

The following `rpc_endpoints` in `foxar.toml` registers two RPC aliases:

- `optimism` references the URL directly
- `mainnet` references the `RPC_MAINNET` environment value that is expected to contain the actual URL

*Env variables need to be wrapped in `${}`*

```toml
# --snip--
[rpc_endpoints]
optimism = "https://optimism.alchemyapi.io/v2/..."
mainnet = "${RPC_MAINNET}" 
```

```solidity
string memory url = vm.rpcUrl("optimism");
assertEq(url, "https://optimism.alchemyapi.io/v2/...");
```

If a ENV var is missing, `rpcUrl()` will revert:

```solidity
vm.expectRevert("Failed to resolve env var `${RPC_MAINNET}` in `RPC_MAINNET`: environment variable not found");
string memory url = vm.rpcUrl("mainnet");
```

Retrieve all available alias -> URL pairs

```solidity
string[2][] memory allUrls = vm.rpcUrls();
assertEq(allUrls.length, 2);

string[2] memory val = allUrls[0];
assertEq(val[0], "optimism");

string[2] memory env = allUrls[1];
assertEq(env[0], "mainnet");
```

Make an RPC call to `eth_getBalance`

```solidity
// balance at block <https://etherscan.io/block/18332681>
bytes memory result = vm.rpc("eth_getBalance", "[\"0x8D97689C9818892B700e27F316cc3E41e17fBeb9\", \"0x117BC09\"]")
assertEq(hex"10b7c11bcb51e6", result);
```

### SEE ALSO

Spark Config

[Config Reference](../reference/config/testing.md#rpc_endpoints)
