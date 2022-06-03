## Mining Modes
Mining modes refer to how frequent blocks are mined using Anvil. By default, it automatically generates a new block as soon as a transaction is submitted.

You can change this setting to interval mining if you will, which means that a new block will be generated in a given period of time selected by the user. If you want to go for this type of mining, you can do it by adding the `--block-time <block-time-in-seconds>` flag, like in the following example.
```
// Produces a new block every 10 seconds
anvil --block-time 10
```

There's also a third mining mode called never. In this case, it disables auto and interval mining, and mine on demand instead. You can do this by typing:
```
// Enables never mining mode
anvil --no-mining
```
