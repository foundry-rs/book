---
description: Understanding the limitations and constraints when working with ZKsync in Foundry-ZKsync due to zkEVM differences.
---

# Limitations

Adapting existing EVM contracts to work within a zkEVM environment requires significant modifications to their underlying code. These changes are primarily due to the fundamental [incompatibility](https://docs.zksync.io/zksync-protocol/era-vm/differences/evm-instructions) between EVM and zkEVM and, as such, cannot be ignored or circumvented in any way. These constraints are usually enforced by the zkEVM's [bootloader](https://docs.zksync.io/zksync-protocol/era-vm/contracts/bootloader), and can lead to panics if ignored.

Here, we enlist the more common limitations and their mitigation strategies, if any.