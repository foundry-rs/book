## cast rpc

### NAME

cast-rpc -  Perform a raw JSON-RPC request

### SYNOPSIS

``cast rpc`` [*options*] *METHOD* [*PARAMS...*]

### DESCRIPTION

Perform a simple JSON-RPC POST request for the given method and with the params

### OPTIONS

#### Query Options

`-r` *url*  
`--rpc-url` *url*  
&nbsp;&nbsp;&nbsp;&nbsp;The URL of the provider

`-w`  
`--raw`  
&nbsp;&nbsp;&nbsp;&nbsp;Pass the "params" as is
&nbsp;&nbsp;&nbsp;&nbsp; If --raw is passed the first PARAM will be taken as the value of "params". If no params are given, stdin will be used. For example:
&nbsp;&nbsp;&nbsp;&nbsp; rpc eth_getBlockByNumber '["0x123", false]' --raw
&nbsp;&nbsp;&nbsp;&nbsp;   => {"method": "eth_getBlockByNumber", "params": ["0x123", false] ... }

### EXAMPLES

1. Get latest `eth_getBlockByNumber` on localhost:

    ```sh
    cast rpc eth_getBlockByNumber "latest" "false"
    ```

2. Get `eth_getTransactionByHash` on localhost:

    ```sh
    cast rpc eth_getTransactionByHash 0x2642e960d3150244e298d52b5b0f024782253e6d0b2c9a01dd4858f7b4665a3f
    ```
    
3. Get latest `eth_getBlockByNumber` on etherum mainnet:

   ```sh
   cast rpc --rpc-url https://mainnet.infura.io/v3/ eth_getBlockByNumber "latest" "false"
   ```
