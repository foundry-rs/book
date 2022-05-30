## `indexOOBError`

### Signature

```solidity
stdError.indexOOBError
```

### Description

The internal Solidity error when trying to access an element of an array that is out of bounds.

Will not work for empty arrays in external contracts. For those, use `expectRevert` without any arguments.