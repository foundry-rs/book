# Gas Section Snapshots

Forge can capture gas snapshots over arbitrary sections inside of your test functions. This can be useful to get a granular measurement of how much gas your logic is consuming as both external calls and internal gas usage are measured.

Use the following [cheatcodes](./forge/cheatcodes.md) in your test functions to capture gas usage:

{{#include ../cheatcodes/gas-snapshots.md}}