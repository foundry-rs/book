## Testing EIP-712 Signatures

This is a guide to creating, signing, and verifying EIP-712 signatures using Foundry [cheatcodes](https://book.getfoundry.sh/cheatcodes/) `addr` and `sign`.

### EIP-712 Refresher 

- A standard allowing complex data to be signed off-chain and verified on-chain
- Improves upon [EIP-191](https://eips.ethereum.org/EIPS/eip-191), the legacy signed data standard, which only allowed for signing bytestrings
- Full spec can be read [here](https://eips.ethereum.org/EIPS/eip-712)


### Diving Into An Example

Say we have a simple contract that allows sellers to transfer tickets to buyers. 

Traditionally, this interaction would include two transactions:
- Seller tells contract they want to list a ticket they own for sale
    - *contract reflects the listing in updated state*
- Buyer tells contract they want to purchase a listed ticket
    - *contract processes the transfer and reflects the sale in updated state*

While this represents decentralization in its purest form, EIP-712 eliminates the need for a seller transaction (and associated gas cost) to list, yet still allowing the purchase and ticket transfer.

Here's an example:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

/// @title Ticket Transfer
/// @author kulkarohan
/// @notice A (useless) contract for testing EIP-712 signatures using Foundry
contract TicketTransfer {
    ///                                                          ///
    ///                       DOMAIN SEPARATOR                   ///
    ///                                                          ///

    /// @notice The EIP-712 domain separator
    bytes32 public immutable EIP_712_DOMAIN_SEPARATOR =
        keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256(bytes("TicketTransfer")),
                keccak256(bytes("1")),
                _chainId(),
                address(this)
            )
        );

    /// @notice The EIP-155 chain id
    function _chainId() private view returns (uint256 id) {
        assembly {
            id := chainid()
        }
    }

    ///                                                          ///
    ///                         TICKET DATA                      ///
    ///                                                          ///

    /// @notice The EIP-712 typehash for a signed ticket
    /// @dev keccak256("SignedTicket(uint256 id,uint256 expiry)");
    bytes32 public constant SIGNED_TICKET_TYPEHASH = 0x787f061deb861898126b36ccffa91598e7cdfe9951957c10f40a593d381075ce;

    /// @notice The metadata of a ticket
    /// @param seller The seller address
    /// @param id The ticket id
    /// @param expiry The ticket expiration
    struct Ticket {
        address seller;
        uint256 id;
        uint256 expiry;
    }

    /// @notice If a given ticket has been transferred
    /// @dev Ticket id => Transferred
    mapping(uint256 => bool) public isTransferred;

    ///                                                          ///
    ///                       SIGNER RECOVERY                    ///
    ///                                                          ///

    /// @notice Recovers the signer of a given ticket
    /// @param _ticket The signed ticket
    /// @param _v The 129th byte and chain id of the signature
    /// @param _r The first 64 bytes of the signature
    /// @param _s Bytes 64-128 of the signature
    function _recoverSigner(
        Ticket calldata _ticket,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) private view returns (address) {
        bytes32 digest = keccak256(
            abi.encodePacked("\x19\x01", EIP_712_DOMAIN_SEPARATOR, keccak256(abi.encode(SIGNED_TICKET_TYPEHASH, _ticket.id, _ticket.expiry)))
        );

        return ecrecover(digest, _v, _r, _s);
    }

    ///                                                          ///
    ///                        TICKET TRANSFER                   ///
    ///                                                          ///

    /// @notice Emitted upon a successful transfer
    /// @param id The ticket id
    /// @param seller The seller address
    /// @param buyer The buyer address
    event Transfer(uint256 id, address seller, address buyer);

    /// @notice Transfers a given signed ticket
    /// @param _ticket The signed ticket to transfer
    /// @param _v The 129th byte and chain id of the signature
    /// @param _r The first 64 bytes of the signature
    /// @param _s Bytes 64-128 of the signature
    function transfer(
        Ticket calldata _ticket,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) external {
        // Ensure the ticket has not expired
        require(_ticket.expiry == 0 || _ticket.expiry >= block.timestamp, "EXPIRED_TICKET");

        // Ensure the ticket has not been previously transferred
        require(!isTransferred[_ticket.id], "INVALID_TRANSFER");

        // Recover the ticket signer
        address recoveredSigner = _recoverSigner(_ticket, _v, _r, _s);

        // Ensure the recovered signer matches the ticket seller
        require(recoveredSigner == _ticket.seller, "INVALID_SIG");

        // Mark the ticket as transferred
        isTransferred[_ticket.id] = true;

        emit Transfer(_ticket.id, _ticket.seller, msg.sender);
    }
}
```

With EIP-712, the interaction can instead be:
- Seller fills and signs a `Ticket` *off-chain* to list
- Buyer calls `transfer()` *on-chain* with the `Ticket` to purchase and seller's signature

Keeping this implementation minimal outside of core EIP-712 logic -- tickets are free (other than buyer gas) and `transfer()` just stores the ticket id as `true` in `isTransferred`.

### Testing With Foundry

**Part 1: Setup**

- Set a private key for a mock seller who will sign the `Ticket` off-chain
- Get the seller address from the private key using the `addr` [cheatcode](https://book.getfoundry.sh/cheatcodes/addr.html)

```solidity
contract TicketTransferTest is DSTest {
    // Used to access the `addr` and `sign` cheatcodes
    VM internal vm;

    // Used to store a `TicketTransfer` instance
    TicketTransfer internal ticketTransfer;

    // Store the private key for a mock seller
    uint256 internal sellerPrivateKey = 0xB0B;

    // Used to store the mock seller address
    address internal seller;

    function setUp() public {
        // Access cheatcodes
        vm = VM(HEVM_ADDRESS);

        // Derive the seller address using the `addr` cheatcode
        seller = vm.addr(sellerPrivateKey);

        // Deploy `TicketTransfer`
        ticketTransfer = new TicketTransfer();
    }
```

**Part 2: Utils**

- Copy the `SIGNED_TICKET_TYPEHASH` and `EIP_712_DOMAIN_SEPARATOR` from the `TicketTransfer` contract; but update the domain separator's chain id and verifying contract
- Fill and sign a `Ticket` using the `sign` [cheatcode](https://book.getfoundry.sh/cheatcodes/sign.html)
- Return the `Ticket` and signature to a test function

```solidity
    /// @notice Utility function to sign a ticket
    /// @param _privateKey The private key of the signer
    /// @param _ticketId The ticket id to sign
    /// @param _ticketExpiry The ticket expiration to sign
    /// @return ticket The signed ticket object
    /// @return v r s The generated signature
    function signTicket(
        uint256 _privateKey,
        uint256 _ticketId,
        uint256 _ticketExpiry
    )
        public
        returns (
            TicketTransfer.Ticket memory ticket,
            uint8 v,
            bytes32 r,
            bytes32 s
        )
    {
        // The domain separator from the `TicketTransfer` contract
        // Note: update the chain id and verifying contract accordingly
        bytes32 EIP_712_DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256(bytes("TicketTransfer")),
                keccak256(bytes("1")),
                99, // Forge chain id
                address(ticketTransfer) // Change from `address(this)`
            )
        );

        // The signed ticket typehash from the `TicketTransfer` contract
        // keccak256("SignedTicket(uint256 id,uint256 expiry)");
        bytes32 SIGNED_TICKET_TYPEHASH = 0x787f061deb861898126b36ccffa91598e7cdfe9951957c10f40a593d381075ce;

        // Create a ticket with the mock seller and given arguments
        ticket = TicketTransfer.Ticket({seller: seller, id: _ticketId, expiry: _ticketExpiry});

        // Use the `sign` cheatcode to sign the ticket with the given private key
        (v, r, s) = vm.sign(
            _privateKey,
            keccak256(abi.encodePacked("\x19\x01", EIP_712_DOMAIN_SEPARATOR, keccak256(abi.encode(SIGNED_TICKET_TYPEHASH, _ticketId, _ticketExpiry))))
        );
    }
```

**Part 3: Tests**

- Ensure the recovered signer from the given signature matches the `Ticket` seller
- Ensure invalid tickets and mismatching signatures revert accordingly 

```solidity
    function test_TransferTicket() public {
        // Create ticket data
        uint256 ticketId = 1;
        uint256 ticketExpiry = 0;

        // Get a ticket signed by the seller and the associated signature
        (TicketTransfer.Ticket memory ticket, uint8 v, bytes32 r, bytes32 s) = signTicket(sellerPrivateKey, ticketId, ticketExpiry);

        // Call `transfer()` with the ticket and seller signature
        ticketTransfer.transfer(ticket, v, r, s);

        // Ensure the ticket is marked as transferred
        require(ticketTransfer.isTransferred(1));
    }

    function testRevert_ExpiredTicket() public {
        // Create ticket data
        uint256 ticketId = 1;
        uint256 ticketExpiry = 23 hours;

        // Get a ticket signed by the seller and the associated signature
        (TicketTransfer.Ticket memory ticket, uint8 v, bytes32 r, bytes32 s) = signTicket(sellerPrivateKey, ticketId, ticketExpiry);

        // Fast forward the block timestamp one hour past ticket expiration
        vm.warp(1 days);

        // Expect the call to revert, as the ticket has expired
        vm.expectRevert("EXPIRED_TICKET");
        ticketTransfer.transfer(ticket, v, r, s);
    }

    function testRevert_InvalidTransfer() public {
        // Create ticket data
        uint256 ticketId = 1;
        uint256 ticketExpiry = 0;

        // Get a ticket signed by the seller and the associated signature
        (TicketTransfer.Ticket memory ticket, uint8 v, bytes32 r, bytes32 s) = signTicket(sellerPrivateKey, ticketId, ticketExpiry);

        // Call `transfer()` with the ticket and seller signature
        ticketTransfer.transfer(ticket, v, r, s);

        // Expect a subsequent call to revert, as the ticket has already been transferred
        vm.expectRevert("INVALID_TRANSFER");
        ticketTransfer.transfer(ticket, v, r, s);
    }

    function testRevert_InvalidSig() public {
        // Create ticket data
        uint256 ticketId = 1;
        uint256 ticketExpiry = 0;

         // Get a ticket signed by a user other than the mock seller
        (TicketTransfer.Ticket memory ticket, uint8 v, bytes32 r, bytes32 s) = signTicket(0xB0B, ticketId, ticketExpiry);

        // Expect the call to revert, as the given signature is not from the mock seller
        vm.expectRevert("INVALID_SIG");
        ticketTransfer.transfer(ticket, v, r, s);
    }
```

### Summary

Use the `addr` and `sign` cheatcodes to test EIP-712 signatures in Foundry.

The full reference implementation can be found [here](https://github.com/kulkarohan/ticket-transfer).


