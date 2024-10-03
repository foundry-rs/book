# Gas Section Snapshots

Forge can capture gas snapshots over arbitrary sections inside of your test functions. This can be useful to get a granular measurement of how much gas your logic is consuming as both external calls and internal gas usage are measured.

To usage gas snapshots, use the following cheatcodes in your test functions:

{{#include ../cheatcodes/gas-snapshots.md}}