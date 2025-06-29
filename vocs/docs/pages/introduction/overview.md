---
description: Foundry is a smart contract development toolchain for building, testing, deploying and interacting with Ethereum applications.
---

## Foundry Overview

![Foundry banner](/og-image.png)

Foundry is a smart contract development toolchain.

Foundry manages your dependencies, compiles your project, runs tests, deploys, and lets you interact with the chain from the command-line and via Solidity scripts.

## Navigating the Documentation

### Getting Started

Get up and running with Foundry by [installing the toolkit](/introduction/installation) and [get started](/introduction/getting-started) with the basics of each tool.

### Guides

Comprehensive tutorials and best practices for building robust smart contracts and development workflows with Foundry.

- **Best Practices**
  - [Writing Contracts](/guides/best-practices/writing-contracts) - Guidelines for clean, secure smart contract development
  - [Writing Tests](/guides/best-practices/writing-tests) - Effective testing strategies and patterns
  - [Writing Scripts](/guides/best-practices/writing-scripts) - Deployment and automation script best practices
  - [Security](/guides/best-practices/security) - Security considerations and vulnerability prevention
  - [Key Management](/guides/best-practices/key-management) - Safe handling of private keys and secrets
  - [Commenting](/guides/best-practices/commenting) - Documentation and code commenting standards
- [Scripting with Solidity](/guides/scripting-with-solidity) - Advanced deployment and automation techniques
- [Deterministic deployments using CREATE2](/guides/deterministic-deployments-using-create2) - Predictable contract addresses
- [Forking Mainnet with Cast and Anvil](/guides/forking-mainnet-with-cast-anvil) - Test against live chain state
- [Running Foundry inside of Docker](/guides/foundry-in-docker) - Containerized development environments
- [Implementing and Testing EIP-712 signatures](/guides/eip712)

### Project Setup

Learn how to organize your projects with the [forge project setup guides](/guides/project-setup/creating-a-new-project) for scaling smart contract codebases.

### Forge

Master the core smart contract development tool with the [Forge overview](/forge/overview), covering building, testing, deploying, and verifying contracts.

### Cast

Learn to interact with blockchain networks from the command line using [Cast](/cast/overview) for contract calls, transactions, and chain data retrieval.

### Anvil

Set up local development networks with [Anvil](/anvil/overview), Foundry's fast Ethereum-compatible node with forking capabilities.

### Chisel

Explore Solidity interactively with [Chisel](/chisel/overview), the integrated REPL for rapid prototyping and debugging.

### Configuration

Customize your Foundry setup and integrate with other tools for an optimized development workflow.

- [Config Overview with `foundry.toml`](/config/overview) - Project configuration and settings
- [Continuous Integration](/config/continuous-integration) - CI/CD pipeline integration
- [Integrating with VSCode](/config/vscode) - Editor setup and extensions
- [Shell Autocompletion](/config/shell-autocompletion) - Command-line productivity enhancements
- [Static Analyzers](/config/static-analyzers) - Code analysis tool integration
- [Integrating with Hardhat](/config/hardhat) - Cross-framework compatibility
- [Vyper support](/config/vyper) - Alternative smart contract language support

### Contributing

Help improve Foundry by contributing - see the [contribution guidelines](https://github.com/foundry-rs/foundry/blob/master/CONTRIBUTING.md) to learn more.

### Reference

Complete command references, configuration options, and API documentation for all Foundry tools.

- [FAQ](/misc/faq) - Frequently asked questions and troubleshooting
- **Command References**
  - [forge Commands](/forge/reference/overview) - Complete forge CLI reference
  - [cast Commands](/cast/reference/overview) - Complete cast CLI reference
  - [anvil Commands](/anvil/reference) - Complete anvil CLI reference
  - [chisel Commands](/chisel/reference) - Complete chisel CLI reference
- **Configuration & APIs**
  - [Config Reference](/config/reference/overview) - All configuration options
  - [Cheatcodes Reference](/reference/cheatcodes/overview) - Testing utilities and helpers
  - [Forge Standard Library Reference](/reference/forge-std/overview) - Standard library documentation
  - [DSTest Reference](/reference/ds-test) - Legacy testing framework reference

:::tip
You can also check out [Awesome Foundry](https://github.com/crisgarner/awesome-foundry), a curated list of awesome Foundry resources, guides, tools, and libraries!
:::
