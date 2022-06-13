## `startBroadcast`

### Signature

```solidity
function startBroadcast() external;
```

```solidity
function startBroadcast(address who) external;
```

### Description

Using the address that calls the test contract or the address provided
as the sender, have all subsequent calls (at this call depth only) create
transactions that can later be signed and sent onchain.

### Examples

```solidity
contract NoLink is DSTest {
    function t(uint256 a) public returns (uint256) {
        uint256 b = 0;
        for (uint256 i; i < a; i++) {
            b += i;
        }
        emit log_string("here");
        return b;
    }
    function view_me() public pure returns (uint256) {
        return 1337;
    }
}

contract BroadcastTestNoLinking is DSTest {
    function deployMany() public {
        cheats.startBroadcast();

        for(uint i; i< 100; i++) {
            NoLink test9 = new NoLink();
        }

        cheats.stopBroadcast();
    }
}
```