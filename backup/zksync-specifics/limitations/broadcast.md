---
description: Broadcasting and transaction limitations in ZKsync network.
---

# Broadcast Limitations

Broadcasting transactions to ZKsync network has specific limitations and considerations.

## Transaction Format

- ZKsync uses different transaction format from Ethereum
- Additional fields for zkEVM-specific data
- Factory dependencies must be included

## Gas Estimation

- Gas estimation works differently in ZKsync
- zkEVM gas costs don't directly map to EVM costs
- May require manual gas limit adjustments

## Nonce Management

- ZKsync uses separate transaction and deployment nonces
- Nonce handling differs from standard Ethereum
- Requires careful nonce management in scripts

## Paymaster Integration

- Broadcasting with paymasters requires special handling
- Paymaster transactions have different format
- Must ensure paymaster has sufficient funds

## Factory Dependencies

- All factory dependencies must be known at broadcast time
- Large factory dependencies may require transaction splitting
- Dependencies must be properly encoded

## Network Considerations

- Different RPC endpoints for different ZKsync networks
- Network compatibility checks
- Confirmation times may vary