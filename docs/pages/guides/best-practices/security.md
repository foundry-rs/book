---
description: Security best practices for smart contract development including taint analysis and comprehensive testing strategies.
---

## Security Practices

Thanks to [@samsczun](https://twitter.com/samczsun)'s [How Do You Even Write Secure Code Anyways](https://www.youtube.com/watch?v=Wm3t8Fuiy1E) talk for the tips in this section and the following section.

- Don't optimize for coverage, optimize for well thought-out tests.
- Write positive and negative unit tests.
  - Write _positive_ unit tests for things that the code should handle. Validate _all_ state that changes from these tests.
  - Write _negative_ unit tests for things that the code should _not_ handle. It's helpful to follow up (as an adjacent test) with the positive test and make the change that it needs to pass.
  - Each code path should have its own unit test.
- Write integration tests to test entire features.
- Write fork tests to verify the correct behavior with existing deployed contract.

### Taint Analysis

When testing, you should prioritize functions that an attacker can affect, that means functions that accept some kind of user input. These are called _sources_.

Consider that input data as _tainted_ until it has been checked by the code, at which point it's considered _clean_.

A _sink_ is a part of the code where some important operation is happening. For example, in MakerDAO that would be `vat.sol`.

You should _ensure_ that no _tainted_ data ever reaches a _sink_. That means that all data that find themselves in the sink, should, at some point, have been checked by you. So, you need to define what the data _should_ be and then make sure your checks _ensure_ that the data will be how you expect it to be.

Write more secure code and better tests using these as references to learn from:

- [transmissions11/solcurity](https://github.com/transmissions11/solcurity)
- [nascentxyz/simple-security-toolkit](https://github.com/nascentxyz/simple-security-toolkit)
