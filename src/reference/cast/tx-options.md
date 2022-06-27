#### Transaction Options

`--gas` *gas*  
&nbsp;&nbsp;&nbsp;&nbsp;Gas limit for the transaction.

`--gas-price` *price*  
&nbsp;&nbsp;&nbsp;&nbsp;Gas price for the transaction, or max fee per gas for EIP1559 transactions.

`--priority-gas-price` *price*  
&nbsp;&nbsp;&nbsp;&nbsp;Max priority fee per gas for EIP1559 transactions.

{{#include ../common/tx-value-option.md}}

`--nonce` *nonce*  
&nbsp;&nbsp;&nbsp;&nbsp;Nonce for the transaction.

`--resend`  
&nbsp;&nbsp;&nbsp;&nbsp;Reuse the latest nonce of the sending account.

`--legacy`  
&nbsp;&nbsp;&nbsp;&nbsp;Send a legacy transaction instead of an [EIP1559][eip1559] transaction.

&nbsp;&nbsp;&nbsp;&nbsp;This is automatically enabled for common networks without EIP1559.

[eip1559]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md
