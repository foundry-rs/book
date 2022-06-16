# Std Logs

Std Logs adds additional logging events for forge.

## Events

Std Logs has 4 events to log arrays.

```solidity
event log_array(uint256[] val);
event log_array(int256[] val);
event log_named_array(string key, uint256[] val);
event log_named_array(string key, int256[] val);
```

## Usage

This section provides usage examples.

### log\_array

```solidity
event log_array(<type>[] val);
```

Where `<type>` can be `int256` or `uint256`.

#### Example

```solidity
// Assuming storage
// uint256[] data = [10, 20, 30, 40, 50]; 
emit log_array(data);
```

### log\_named\_array

```solidity
event log_named_array(string key, <type>[] val);
```

Where `<type>` can be `int256` or `uint256`.

#### Example

```solidity
// Assuming storage
// uint256[] data = [10, 20, 30, 40, 50]; 
emit log_named_array("Data", data);
```
