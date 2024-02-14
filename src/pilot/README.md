## Overview of Pilot

Pilot is an advanced Solidity REPL shipped with Foxar. It can be used to quickly test the behavior of Solidity snippets
on a local or forked network.

Pilot is part of the Foxar suite and is installed alongside `spark`, `probe`, and `shuttle`. If you haven't installed Foxar
yet, see [Foxar installation](../getting-started/installation.md). 

> Note: If you have an older version of Foxar installed, you'll need to re-install `foxarup` in order for Pilot to be downloaded.

### How to use Pilot

To use Pilot, simply type `pilot`. From there, start writing Solidity code! Pilot will offer verbose feedback on each input.

Pilot can be used both within and outside of a foxar project. If the binary is executed in a Foxar project root, Pilot will
inherit the project's configuration options.

To see available commands, type `!help` within the REPL.

> 📚 **Reference**
>
> See the [`pilot` Reference](../reference/pilot/) for in depth information on Pilot and its capabilities.

