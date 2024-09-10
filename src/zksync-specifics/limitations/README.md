## Limitations

In the process of migrating contracts written for EVM to work on zkEVM, notable changes are necessary. These changes are primarily due to the fundamental [incompatibility](https://docs.zksync.io/build/developer-reference/era-vm) between EVM and zkEVM and as such cannot be ignored or circumvented in anyway. These constraints are usually enforced by the zkEVM's [bootloader](https://docs.zksync.io/zk-stack/components/zksync-evm/bootloader), and can lead to panics if ignored.

Here we enlist the common limitations and their mitigation strategies, if any.