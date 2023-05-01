## `breakpoint`

### Signature

```solidity
function breakpoint(string) external;
function breakpoint(string, bool) external;
```

### Description

Places a breakpoint to jump to in the debugger view.

Calling `vm.breakpoint('<char>, true)` is equivalent to `vm.breakpoint('<char>)`, but calling `vm.breakpoint('<char, false)` will erase the breakpoint at `'<char`.

If the char is overwritten, only the last one that was visited in the execution steps is considered.

### Examples

```solidity
function testBreakpoint() public {
    vm.breakpoint("a");
}
```

Opening up the debugger in a test environment and pressing `'a` will then place the debugger step at the place where the breakpoint cheatcode was called.

![breakpoint a](../images/breakpoint.png)

### SEE ALSO

[debugger](../forge/debugger.md)
