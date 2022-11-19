## cast upload-signature

### NAME

cast-upload-signature

### SYNOPSIS

`cast upload-signature` [*signatures...*]

### DESCRIPTION

Upload the given signatures to [https://sig.eth.samczsun.com](https://sig.eth.samczsun.com).

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Upload signatures
    ```sh
    cast upload-signature 'function approve(address,uint256)' \
   'transfer(uint256)' 'event Transfer(uint256,address)'
    ```