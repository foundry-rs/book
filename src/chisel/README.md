## Overview of Chisel

Chisel is an advanced Solidity REPL shipped with Foundry. It can be used to quickly test the behavior of Solidity snippets
on a local or forked network.

Chisel is part of the Foundry suite and is installed alongside `forge`, `cast`, and `anvil`. If you havent installed Foundry
yet, see [Foundry installation](../getting-started/installation.md). 

> Note: If you have an older version of Foundry installed, you'll need to re-install `foundryup` in order for Chisel to be downloaded.

### How to use Chisel

To use Chisel, simply type `chisel`. From there, start writing Solidity code! Chisel will offer verbose feedback on each input.

Chisel can be used both within and outside of a foundry project. If the binary is executed in a Foundry project root, Chisel will
inherit the project's configuration options.

To see available commands, type `!help` within the REPL.

> 📚 **Reference**
>
> See the [`chisel` Reference](../reference/chisel/) for in depth information on Chisel and its capabilities.

