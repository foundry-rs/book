#### Transaction Options

`--gas` *gas*  
&nbsp;&nbsp;&nbsp;&nbsp;Gas limit for the transaction.

`--gas-price` *price*  
&nbsp;&nbsp;&nbsp;&nbsp;Gas price for the transaction.

`--value` *value*  
&nbsp;&nbsp;&nbsp;&nbsp;Ether to send in the transaction.

&nbsp;&nbsp;&nbsp;&nbsp;Either specified as an integer (wei), or as a string with a unit, for example:
&nbsp;&nbsp;&nbsp;&nbsp;- `1ether`
&nbsp;&nbsp;&nbsp;&nbsp;- `10gwei`
&nbsp;&nbsp;&nbsp;&nbsp;- `0.01ether`

`--nonce` *nonce*  
&nbsp;&nbsp;&nbsp;&nbsp;Nonce for the transaction.

`--resend`  
&nbsp;&nbsp;&nbsp;&nbsp;Reuse the latest nonce of the sending account.

`--legacy`  
&nbsp;&nbsp;&nbsp;&nbsp;Send a legacy transaction instead of an [EIP1559][eip1559] transaction.

&nbsp;&nbsp;&nbsp;&nbsp;This is automatically enabled for common networks without EIP1559.

[eip1559]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md
