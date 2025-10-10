---
description: Learn how to use forge-std's `Config` contract to orchestrate complex multi-chain deployment scripts with TOML configuration files.
---

## Orchestrating Scripts with Config

The forge-std `Config` contract provides a powerful way to manage complex deployment scripts, especially for multi-chain environments. By centralizing configuration in TOML files, you can create maintainable, reusable scripts that adapt to different networks and deployment scenarios.

## Why Use Config for Scripts?

Traditional scripting approaches often involve:
- Hardcoding addresses and parameters
- Dealing with ffi cheatcodes to interact with helper files
- Manually tracking deployment addresses and writting back to the helper files
- Complex environment variable management

All these practices make deploying scripts error-prone unless developers are experienced and meticulous. The `Config` contract solves these issues by providing:
- Centralized configuration in human-readable TOML files
- Automatic environment variable resolution
- Type-safe access to configuration values
- Bidirectional updates (read and write)
- Built-in multi-chain support

## Setting Up Your Configuration

### 1. Create a Configuration File

Create a `deployments.toml` file in your project root:

```toml
# deployments.toml
#
# IMPORTANT: Chain keys must be either:
# - Numeric chain ID (e.g., [1], [11155111], [998])
# - Valid Alloy chain alias (e.g., [mainnet], [sepolia], [optimism])
#
# See https://github.com/alloy-rs/chains for valid aliases. For new/custom chains, use numeric IDs or consider opening a PR.

[mainnet]
endpoint_url = "${MAINNET_RPC_URL}"

[mainnet.address]
# Dependencies
weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
multisig = "${MAINNET_MULTISIG}"

[mainnet.uint]
min_liquidity = 1000000  # $1M minimum
fee_percentage = 300     # 3%

[mainnet.bool]
is_testnet = false
use_timelock = true

[sepolia]
endpoint_url = "${SEPOLIA_RPC_URL}"

[sepolia.address]
weth = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"
usdc = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"
multisig = "${SEPOLIA_MULTISIG}"

[sepolia.uint]
min_liquidity = 1000    # $1k for testing
fee_percentage = 300

[sepolia.bool]
is_testnet = true
use_timelock = false
```

### 2. Create Your Deployment Script

```solidity
// script/Deploy.s.sol
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Config} from "forge-std/Config.sol";
import {console} from "forge-std/console.sol";

// Import your contracts
import {TokenFactory} from "../src/TokenFactory.sol";
import {LiquidityPool} from "../src/LiquidityPool.sol";
import {Governance} from "../src/Governance.sol";

contract DeployScript is Script, Config {
    // Deployment artifacts
    TokenFactory public factory;
    LiquidityPool public pool;
    Governance public governance;

    function run() public {
        // Load config and enable write-back for storing deployment addresses
        _loadConfig("./deployments.toml", true);

        // Get the chain we're deploying to
        uint256 chainId = block.chainid;
        console.log("Deploying to chain:", chainId);

        // Load configuration values
        address weth = config.get("weth").toAddress();
        address usdc = config.get("usdc").toAddress();
        address multisig = config.get("multisig").toAddress();
        uint256 minLiquidity = config.get("min_liquidity").toUint256();
        uint256 feePercentage = config.get("fee_percentage").toUint256();
        bool useTimelock = config.get("use_timelock").toBool();

        // Start broadcasting transactions
        vm.startBroadcast();

        // Deploy contracts
        factory = new TokenFactory(multisig);
        console.log("TokenFactory deployed at:", address(factory));

        pool = new LiquidityPool(
            weth,
            usdc,
            minLiquidity,
            feePercentage
        );
        console.log("LiquidityPool deployed at:", address(pool));

        if (useTimelock) {
            governance = new Governance(multisig, 2 days);
            console.log("Governance deployed with timelock at:", address(governance));
        } else {
            governance = new Governance(multisig, 0);
            console.log("Governance deployed without timelock at:", address(governance));
        }

        // Configure contracts
        factory.setLiquidityPool(address(pool));
        pool.setFactory(address(factory));
        pool.setGovernance(address(governance));

        vm.stopBroadcast();

        // Save deployment addresses back to config
        config.set("token_factory", address(factory));
        config.set("liquidity_pool", address(pool));
        config.set("governance", address(governance));
        config.set("deployed_at", block.timestamp);
        config.set("deployer", msg.sender);

        console.log("\nDeployment complete! Addresses saved to deployments.toml");
    }
}
```

## Advanced Patterns

### Multi-Chain Deployments

Deploy the same contracts across multiple chains with chain-specific configurations:

```solidity
contract MultiChainDeployScript is Script, Config {
    struct DeploymentResult {
        address factory;
        address pool;
        address governance;
    }

    mapping(uint256 => DeploymentResult) public deployments;

    function run() public {
        // Load config and create forks for all chains
        _loadConfigAndForks("./deployments.toml", true);

        // Deploy to each configured chain
        for (uint256 i = 0; i < chainIds.length; i++) {
            uint256 chainId = chainIds[i];
            deployToChain(chainId);
        }

        // Verify cross-chain configuration
        verifyCrossChainSetup();
    }

    function deployToChain(uint256 chainId) internal {
        // Switch to the chain's fork
        vm.selectFork(forkOf[chainId]);

        console.log("\n========================================");
        console.log("Deploying to chain:", chainId);
        console.log("========================================");

        // Config automatically uses the current fork's chain ID
        address weth = config.get("weth").toAddress();
        bool isTestnet = config.get("is_testnet").toBool();

        vm.startBroadcast();

        // Deploy with chain-specific configuration
        TokenFactory factory = new TokenFactory(
            config.get("multisig").toAddress()
        );

        LiquidityPool pool = new LiquidityPool(
            weth,
            config.get("usdc").toAddress(),
            config.get("min_liquidity").toUint256(),
            config.get("fee_percentage").toUint256()
        );

        // Different configuration for testnets vs mainnet
        Governance governance;
        if (isTestnet) {
            governance = new Governance(
                config.get("multisig").toAddress(),
                0 // No timelock on testnets
            );
        } else {
            governance = new Governance(
                config.get("multisig").toAddress(),
                2 days // Timelock on mainnet
            );
        }

        vm.stopBroadcast();

        // Store deployment results
        deployments[chainId] = DeploymentResult({
            factory: address(factory),
            pool: address(pool),
            governance: address(governance)
        });

        // Save to config file
        config.set("token_factory", address(factory));
        config.set("liquidity_pool", address(pool));
        config.set("governance", address(governance));
    }

    function verifyCrossChainSetup() internal view {
        console.log("\n========================================");
        console.log("Cross-chain deployment summary:");
        console.log("========================================");

        for (uint256 i = 0; i < chainIds.length; i++) {
            uint256 chainId = chainIds[i];
            DeploymentResult memory result = deployments[chainId];

            console.log("\nChain", chainId);
            console.log("  Factory:", result.factory);
            console.log("  Pool:", result.pool);
            console.log("  Governance:", result.governance);
        }
    }
}
```

### Upgrade Scripts with History Tracking

Track deployment history and manage upgrades:

```solidity
contract UpgradeScript is Script, Config {
    function run() public {
        _loadConfig("./deployments.toml", true);

        // Read current deployment
        address currentImpl = config.get("implementation_v1").toAddress();
        address proxy = config.get("proxy").toAddress();

        console.log("Current implementation:", currentImpl);
        console.log("Proxy address:", proxy);

        vm.startBroadcast();

        // Deploy new implementation
        MyContractV2 newImpl = new MyContractV2();

        // Upgrade proxy
        IProxy(proxy).upgradeTo(address(newImpl));

        vm.stopBroadcast();

        // Archive old implementation and save new one
        config.set("implementation_v1_deprecated", currentImpl);
        config.set("implementation_v2", address(newImpl));
        config.set("upgraded_at", block.timestamp);
        config.set("upgraded_by", msg.sender);

        console.log("Upgrade complete!");
        console.log("New implementation:", address(newImpl));
    }
}
```

## Best Practices

### 1. Chain Configuration

When configuring chains in your TOML files:

**Use numeric chain IDs for maximum compatibility:**
```toml
[1]
endpoint_url = "${MAINNET_RPC}"

[998]
endpoint_url = "${CUSTOM_CHAIN_RPC}"
```

**Use Alloy aliases only for battle-tested chains:**
```toml
[mainnet]
[optimism]
[arbitrum_sepolia]
[base_sepolia]
```

**Check Alloy chains before using aliases:**
- Visit [Alloy chains repository](https://github.com/alloy-rs/chains/blob/main/src/named.rs)
- Search for your chain's alias. If not found, use the numeric chain ID or consider opening a PR.

### 2. Environment Variables

Store sensitive data in environment variables:

```bash
# .env
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
MAINNET_MULTISIG=0x742d35Cc6634C0532925a3b844Bc9e7595f0fA9b
SEPOLIA_MULTISIG=0x1234567890123456789012345678901234567890
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 3. Configuration Validation

Validate configuration before deployment:

```solidity
function validateConfig() internal view {
    // Ensure critical addresses are set
    require(
        config.get("multisig").toAddress() != address(0),
        "Multisig not configured"
    );

    // Validate parameters are within expected ranges
    uint256 fee = config.get("fee_percentage").toUint256();
    require(fee <= 1000, "Fee too high"); // Max 10%

    // Check chain-specific requirements
    if (!config.get("is_testnet").toBool()) {
        require(config.get("use_timelock").toBool(), "Timelock required for mainnet");
    }
}
```

### 4. Separate Config Files

Use different config files for different purposes:

```solidity
// Development deployments
_loadConfig("./config/dev.toml", true);

// Production deployments
_loadConfig("./config/prod.toml", true);

// Testing configuration
_loadConfig("./config/test.toml", false);

## Running Your Scripts

Execute your configuration-driven scripts:

```bash
# Dry run (simulation)
forge script script/Deploy.s.sol:DeployScript \
    --rpc-url $SEPOLIA_RPC_URL

# Deploy to testnet
forge script script/Deploy.s.sol:DeployScript \
    --rpc-url $SEPOLIA_RPC_URL \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --verify

# Deploy to multiple chains
forge script script/MultiChainDeploy.s.sol:MultiChainDeployScript \
    --broadcast \
    --verify
```

## Troubleshooting

### Common Issues

1. **Environment variables not resolved**: Ensure variables are exported in your shell or defined in `.env`

2. **File permissions**: Grant file system access in `foundry.toml`:
   ```toml
   fs_permissions = [{ access = "read-write", path = "./" }]
   ```

3. **`InvalidChainKey` error**: This occurs when using a custom chain name that doesn't match an Alloy chain alias.

   **Problem:**
   ```toml
   [my_custom_chain]  # This will fail!
   endpoint_url = "..."
   ```

   **Solutions:**
   - Use the numeric chain ID:
     ```toml
     [1234]  # Works for any chain
     endpoint_url = "..."
     ```
   - Or use an exact Alloy chain alias (see [supported chains](https://github.com/alloy-rs/chains/blob/main/src/named.rs)):
     ```toml
     [arbitrum_sepolia]  # Works for supported chains
     endpoint_url = "..."
     ```

4. **Type mismatch errors**: Verify that values in TOML match their declared types (e.g., addresses must be valid hex strings)

## See Also

- [Config Reference](/reference/forge-std/config.mdx)
- [StdConfig Reference](/reference/forge-std/std-config.mdx)
- [Scripting with Solidity](/guides/scripting-with-solidity)
- [Best Practices for Writing Scripts](/guides/best-practices/writing-scripts)
