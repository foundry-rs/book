### EVM Options
`-f, --fork-url <URL>`  
&nbsp;&nbsp;&nbsp;&nbsp; Fetch state over a remote endpoint instead of starting from an empty state

`--ffi`  
&nbsp;&nbsp;&nbsp;&nbsp; Enables the FFI cheatcode

`--fork-block-number <BLOCK>`  
&nbsp;&nbsp;&nbsp;&nbsp; Fetch state from a specific block number over a remote endpoint (Must pass --fork-url in the same command-line)

`--initial-balance <BALANCE>`  
&nbsp;&nbsp;&nbsp;&nbsp; The initial balance of deployed test contracts

`--no-storage-caching>`  
&nbsp;&nbsp;&nbsp;&nbsp; Explicitly disables the use of RPC caching. All storage slots are read entirely from the endpoint. This flag overrides the project's configuration file (Must pass --fork-url in the same command-line)

`--sender <ADDRESS> `  
&nbsp;&nbsp;&nbsp;&nbsp; The address which will be executing tests

`-v, --verbosity`  
&nbsp;&nbsp;&nbsp;&nbsp; Verbosity of the EVM. Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv)  
 &nbsp;&nbsp;&nbsp;&nbsp; Verbosity levels:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - 2: Print logs for all tests  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - 3: Print execution traces for failing tests  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - 4: Print execution traces for all tests, and setup traces for failing tests  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - 5: Print execution and setup traces for all tests

### Examples
1. Choose the address which will execute the tests
  ```sh
  anvil --sender 0xC8479C45EE87E0B437c09d3b8FE8ED14ccDa825E
  ```
  
2. Change how transactions are sorted in the mempool to FIFO
  ```sh
  anvil --order fifo
  ```
