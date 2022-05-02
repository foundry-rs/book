## Std Math

Std Math is a library that simplifies the process of some mathematical calculations.

### Functions

Std Math has 3 different functions. Their explanation and examplification of the expected behavior are the following:

`abs`: return the absolute value of your int256
```solidity
// If a = 10, returns 10 | If a = -1001, returns 1001
    function AbsInt(int256 a) public pure returns(uint256) {
        return stdMath.abs(a);
    }
```

`delta`: difference between the first value and second value

```solidity
// If a = 10 and b = 2, returns 8 | If a = 6 and b = 9, returns 3
    function DeltaUint(uint256 a, uint256 b) public pure returns(uint256) {
        return stdMath.delta(a, b);
    }

// If a = 5 and b = -4, returns 9 | If a = -15 and b = -20, returns 5
    function DeltaInt(int256 a, int256 b) public pure returns(uint256) {
        return stdMath.delta(a, b);
    }
```

`percentdelta`: delta in percentage (multiplied by 1e18)

```solidity
// First, it calculates (a - b) / b. To avoid a result with comma, the function multiplies the result by 1e18
// If a = 10 and b = 5, returns 1000000000000000000 (100%) |  If a = 10 and b = 7, returns 428571428571428571 (~42.86%)
    function PercentDeltaUint(uint256 a, uint256 b) public pure returns(uint256) {
        return stdMath.percentDelta(a, b);
    }

// First, it calculates (a - b) / abs(b). To avoid a result with comma, the function multiplies the result by 1e18
// If a = -12 and b = -3, returns 3000000000000000000 (300%) |  If a = 15 and b = -4, returns 4750000000000000000 (475%)
    function PercentDeltaInt(int256 a, int256 b) public pure returns(uint256) {
        return stdMath.percentDelta(a, b);
    }
```
