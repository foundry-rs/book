## Cheatcodes Reference

Cheatcodes give you powerful assertions, the ability to alter the state of the EVM, mock data, and more.

To enable a cheatcode you call designated functions on the cheatcode address: `0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`.

You can access cheatcodes easily via `vm` available in Forge Standard Library's [`Test`](../reference/forge-std/#forge-stds-test) contract.

Below are some subsections for the different Forge cheatcodes.

- [Environment](./environment.md): Cheatcodes that alter the state of the EVM.
- [Assertions](./assertions.md): Cheatcodes that are powerful assertions
- [Fuzzer](./fuzzer.md): Cheatcodes that configure the fuzzer
- [External](./external.md): Cheatcodes that interact with external state (files, commands, ...)
- [Utilities](./utilities.md): Smaller utility cheatcodes

### Cheatcodes Interface

This is a Solidity interface for all of the cheatcodes present in Forge.

```solidity
interface CheatCodes {
    // Set block.timestamp
    function warp(uint256) external;

    // Set block.number
    function roll(uint256) external;

    // Set block.basefee
    function fee(uint256) external;

    // Set block.chainid
    function chainId(uint256) external;

    // Loads a storage slot from an address
    function load(address account, bytes32 slot) external returns (bytes32);

    // Stores a value to an address' storage slot
    function store(address account, bytes32 slot, bytes32 value) external;

    // Signs data
    function sign(uint256 privateKey, bytes32 digest) external returns (uint8 v, bytes32 r, bytes32 s);

    // Computes address for a given private key
    function addr(uint256 privateKey) external returns (address);

    // Gets the nonce of an account
    function getNonce(address account) external returns (uint64);

    // Sets the nonce of an account
    // The new nonce must be higher than the current nonce of the account
    function setNonce(address account, uint64 nonce) external;

    // Performs a foreign function call via terminal
    function ffi(string[] calldata) external returns (bytes memory);

    // Set environment variables, (name, value)
    function setEnv(string calldata, string calldata) external;

    // Read environment variables, (name) => (value)
    function envBool(string calldata) external returns (bool);
    function envUint(string calldata) external returns (uint256);
    function envInt(string calldata) external returns (int256);
    function envAddress(string calldata) external returns (address);
    function envBytes32(string calldata) external returns (bytes32);
    function envString(string calldata) external returns (string memory);
    function envBytes(string calldata) external returns (bytes memory);

    // Read environment variables as arrays, (name, delim) => (value[])
    function envBool(string calldata, string calldata) external returns (bool[] memory);
    function envUint(string calldata, string calldata) external returns (uint256[] memory);
    function envInt(string calldata, string calldata) external returns (int256[] memory);
    function envAddress(string calldata, string calldata) external returns (address[] memory);
    function envBytes32(string calldata, string calldata) external returns (bytes32[] memory);
    function envString(string calldata, string calldata) external returns (string[] memory);
    function envBytes(string calldata, string calldata) external returns (bytes[] memory);

    // Sets the *next* call's msg.sender to be the input address
    function prank(address) external;

    // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called
    function startPrank(address) external;

    // Sets the *next* call's msg.sender to be the input address, and the tx.origin to be the second input
    function prank(address, address) external;

    // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called, and the tx.origin to be the second input
    function startPrank(address, address) external;

    // Resets subsequent calls' msg.sender to be `address(this)`
    function stopPrank() external;

    // Sets an address' balance
    function deal(address who, uint256 newBalance) external;

    // Sets an address' code
    function etch(address who, bytes calldata code) external;

    // Expects an error on next call
    function expectRevert() external;
    function expectRevert(bytes calldata) external;
    function expectRevert(bytes4) external;

    // Record all storage reads and writes
    function record() external;

    // Gets all accessed reads and write slot from a recording session, for a given address
    function accesses(address) external returns (bytes32[] memory reads, bytes32[] memory writes);

    // Prepare an expected log with (bool checkTopic1, bool checkTopic2, bool checkTopic3, bool checkData).
    // Call this function, then emit an event, then call a function. Internally after the call, we check if
    // logs were emitted in the expected order with the expected topics and data (as specified by the booleans)
    // Second form also checks supplied address against emitting contract.
    function expectEmit(bool, bool, bool, bool) external;
    function expectEmit(bool, bool, bool, bool, address) external;

    // Mocks a call to an address, returning specified data.
    // Calldata can either be strict or a partial match, e.g. if you only
    // pass a Solidity selector to the expected calldata, then the entire Solidity
    // function will be mocked.
    function mockCall(address, bytes calldata, bytes calldata) external;

    // Clears all mocked calls
    function clearMockedCalls() external;

    // Expect a call to an address with the specified calldata.
    // Calldata can either be strict or a partial match
    function expectCall(address, bytes calldata) external;

    // Gets the bytecode for a contract in the project given the path to the contract.
    function getCode(string calldata) external returns (bytes memory);

    // Label an address in test traces
    function label(address addr, string calldata label) external;

    // When fuzzing, generate new inputs if conditional not met
    function assume(bool) external;
    
    // Set block.coinbase (who)
    function coinbase(address) external;

    // Using the address that calls the test contract or the address provided 
    // as the sender, has the next call (at this call depth only) create a 
    // transaction that can later be signed and sent onchain
    function broadcast() external;
    function broadcast(address) external;
    
    // Using the address that calls the test contract or the address provided
    // as the sender, has all subsequent calls (at this call depth only) create
    // transactions that can later be signed and sent onchain
    function startBroadcast() external;
    function startBroadcast(address) external;
    
    // Stops collecting onchain transactions
    function stopBroadcast() external;
}
```
