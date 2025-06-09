---
description: Interactive debugger for stepping through smart contract execution with detailed EVM state inspection and navigation controls.
---

## Debugger

Forge ships with an interactive debugger.

The debugger is accessible on [`forge test`](/forge/reference/forge-test), on [`forge script`](/forge/reference/forge-script) and on [`cast run`](/cast/reference/cast-run). You can only select a single function or a single transaction to debug at the time.

Using `forge test` (or `forge script`):

```sh
forge test --debug --match-test "<REGEX>"
```

Where `<REGEX>` is the function signature of the file you want to debug. For example:

```sh
forge test --debug --match-test "test_Increment"
```

If the matching test is a fuzz test, the debugger will open the first failing fuzz scenario, or the last successful one, whichever comes first. For example:

```sh
forge test --debug --match-test "testFuzz_SetNumber"
```

Using `cast run`:

```sh
cast run --debug \
  0xd15e0237413d7b824b784e1bbc3926e52f4726e5e5af30418803b8b327b4f8ca
```

### Debugger layout

![An image of the debugger UI](/debugger.png)

When the debugger is run, you are presented with a terminal divided into four quadrants:

- **Quadrant 1**: The opcodes in the debugging session, with the current opcode highlighted. Additionally, the address of the current account, the program counter and the accumulated gas usage is also displayed
- **Quadrant 2**: The current stack, as well as the size of the stack
- **Quadrant 3**: The source view
- **Quadrant 4**: The current memory of the EVM

As you step through your code, you will notice that the words in the stack and memory sometimes change color.

For the memory:

- **Red words** are about to be written to by the current opcode
- **Green words** were written to by the previous opcode
- **Cyan words** are being read by the current opcode

For the stack, **cyan words** are either being read or popped by the current opcode.

> ⚠️ **Note**
>
> In most test frameworks, the first test assertion to fail is the one reported.
> In foundry, the last test assertion to fail (that comes from DSTest or cheatcodes) is the one to be reported.

### Navigating

### General

- <kbd>q</kbd>: Quit the debugger
- <kbd>h</kbd>: Show help

### Navigating calls

- <kbd>0-9</kbd> + <kbd>k</kbd>: Step a number of times backwards (alternatively scroll up with your mouse)
- <kbd>0-9</kbd> + <kbd>j</kbd>: Step a number of times forwards (alternatively scroll down with your mouse)
- <kbd>g</kbd>: Move to the beginning of the transaction
- <kbd>G</kbd>: Move to the end of the transaction
- <kbd>c</kbd>: Move to the previous call-type instruction (i.e. [`CALL`][op-call], [`STATICCALL`][op-staticcall], [`DELEGATECALL`][op-delegatecall], and [`CALLCODE`][op-callcode]).
- <kbd>C</kbd>: Move to the next call-type instruction
- <kbd>a</kbd>: Move to the previous [`JUMP`][op-jump] or [`JUMPI`][op-jumpi] instruction
- <kbd>s</kbd>: Move to the next [`JUMPDEST`][op-jumpdest] instruction
- <kbd>'</kbd> + <kbd>a-z</kbd>: Move to `<char>` breakpoint set by a [`vm.breakpoint`][cheat-breakpoint] cheatcode

### Navigating memory

- <kbd>Ctrl</kbd> + <kbd>j</kbd>: Scroll the memory view down
- <kbd>Ctrl</kbd> + <kbd>k</kbd>: Scroll the memory view up
- <kbd>m</kbd>: Show memory as UTF8

### Navigating the stack

- <kbd>J</kbd>: Scroll the stack view down
- <kbd>K</kbd>: Scroll the stack view up
- <kbd>t</kbd>: Show labels on the stack to see what items the current op will consume

[op-call]: https://www.evm.codes/#f1
[op-staticcall]: https://www.evm.codes/#fa
[op-delegatecall]: https://www.evm.codes/#f4
[op-callcode]: https://www.evm.codes/#f2
[op-jumpdest]: https://www.evm.codes/#5b
[op-jump]: https://www.evm.codes/#f1
[op-jumpi]: https://www.evm.codes/#57
[cheat-breakpoint]: /reference/cheatcodes/breakpoint
