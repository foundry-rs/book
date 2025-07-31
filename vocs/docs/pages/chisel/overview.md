---
description: Chisel is a fast Solidity REPL for interactive prototyping and debugging with verbose feedback and project integration.
---

## Chisel

Chisel is a fast, utilitarian, and verbose Solidity REPL.

The `chisel` binary can be used both within and outside of a Foundry project.
If the binary is executed in a Foundry project root, Chisel will inherit the project's configuration options.

Chisel is part of the Foundry suite and is installed alongside `forge`, `cast`, and `anvil`. If you haven't installed Foundry
yet, see [Foundry installation](/introduction/installation).

### Getting started

To use Chisel, simply type `chisel`.

```sh
chisel
```

From here, start writing Solidity code! Chisel will offer verbose feedback on each input.

Create a variable `a` and query it:

```console
➜ uint256 a = 123;
➜ a
Type: uint256
├ Hex: 0x7b
├ Hex (full word): 0x000000000000000000000000000000000000000000000000000000000000007b
└ Decimal: 123
```

Finally, run `!source` to see `a` was applied:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Vm} from "forge-std/Vm.sol";

contract REPL {
    Vm internal constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));

    /// @notice REPL contract entry point
    function run() public {
        uint256 a = 123;
    }
}
```

To see available commands, type `!help` within the REPL.

<br></br>

:::info
See the [`chisel` Reference](/chisel/reference) for in depth information on Chisel and its capabilities.
:::
