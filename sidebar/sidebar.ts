import type { Sidebar } from "./types";
import { forgeCliReference } from "./forge-cli-reference";
import { cmdReference } from "./cmd-reference";
import { anvilCliReference } from "./anvil-cli-reference";
import { chiselCliReference } from "./chisel-cli-reference";
import { castCliReference } from "./cast-cli-reference";
import { forgeStdReference } from "./forge-std-reference";
import { guidesSidebar } from "./guides";

const docs = [
  {
    text: "Introduction",
    items: [
      { text: "Installation", link: "/introduction/installation" },
      { text: "Getting Started", link: "/introduction/getting-started" },
      { text: "Prompting", link: "/introduction/prompting" },
    ],
  },
  {
    text: "Projects",
    items: [
      { text: "Overview", link: "/projects" },
      { text: "Project Layout", link: "/projects/layout" },
      { text: "Dependencies", link: "/projects/dependencies" },
      { text: "Soldeer", link: "/projects/soldeer" },
    ],
  },
  {
    text: "Forge",
    items: [
      { text: "Overview", link: "/forge" },
      { text: "Building", link: "/forge/build" },
      { text: "Testing", link: "/forge/testing" },
      { text: "Scripting", link: "/forge/scripting" },
      { text: "Debugging", link: "/forge/debugging" },
      { text: "Gas Tracking", link: "/forge/gas-tracking" },
      { text: "Formatting", link: "/forge/formatting" },
      {
        text: "Linting",
        link: "/forge/linting",
        collapsed: false,
        items: [
          {
            text: "High severity",
            collapsed: true,
            items: [
              { text: "arbitrary-send-erc20", link: "/forge/linting/arbitrary-send-erc20" },
              { text: "arbitrary-send-erc20-permit", link: "/forge/linting/arbitrary-send-erc20-permit" },
              { text: "arbitrary-send-eth", link: "/forge/linting/arbitrary-send-eth" },
              { text: "controlled-delegatecall", link: "/forge/linting/controlled-delegatecall" },
              { text: "encode-packed-collision", link: "/forge/linting/encode-packed-collision" },
              { text: "enumerable-loop-removal", link: "/forge/linting/enumerable-loop-removal" },
              { text: "erc20-unchecked-transfer", link: "/forge/linting/erc20-unchecked-transfer" },
              { text: "incorrect-exp", link: "/forge/linting/incorrect-exp" },
              { text: "incorrect-shift", link: "/forge/linting/incorrect-shift" },
              { text: "reentrancy-eth", link: "/forge/linting/reentrancy-eth" },
              { text: "rtlo", link: "/forge/linting/rtlo" },
              { text: "unchecked-call", link: "/forge/linting/unchecked-call" },
              { text: "unprotected-initializer", link: "/forge/linting/unprotected-initializer" },
            ],
          },
          {
            text: "Medium severity",
            collapsed: true,
            items: [
              { text: "assert-state-change", link: "/forge/linting/assert-state-change" },
              { text: "boolean-cst", link: "/forge/linting/boolean-cst" },
              { text: "dangerous-unary-operator", link: "/forge/linting/dangerous-unary-operator" },
              { text: "divide-before-multiply", link: "/forge/linting/divide-before-multiply" },
              { text: "incorrect-erc20-interface", link: "/forge/linting/incorrect-erc20-interface" },
              { text: "incorrect-erc721-interface", link: "/forge/linting/incorrect-erc721-interface" },
              { text: "incorrect-strict-equality", link: "/forge/linting/incorrect-strict-equality" },
              { text: "locked-ether", link: "/forge/linting/locked-ether" },
              { text: "low-level-calls", link: "/forge/linting/low-level-calls" },
              { text: "mapping-deletion", link: "/forge/linting/mapping-deletion" },
              { text: "non-reentrant-not-first", link: "/forge/linting/non-reentrant-not-first" },
              { text: "reentrancy-no-eth", link: "/forge/linting/reentrancy-no-eth" },
              { text: "tautological-compare", link: "/forge/linting/tautological-compare" },
              { text: "tx-origin", link: "/forge/linting/tx-origin" },
              { text: "type-based-tautology", link: "/forge/linting/type-based-tautology" },
              { text: "uninitialized-local", link: "/forge/linting/uninitialized-local" },
              { text: "uninitialized-state", link: "/forge/linting/uninitialized-state" },
              { text: "unsafe-oz-erc721-mint", link: "/forge/linting/unsafe-oz-erc721-mint" },
              { text: "unsafe-typecast", link: "/forge/linting/unsafe-typecast" },
              { text: "unused-return", link: "/forge/linting/unused-return" },
              { text: "weak-prng", link: "/forge/linting/weak-prng" },
            ],
          },
          {
            text: "Low severity",
            collapsed: true,
            items: [
              { text: "block-timestamp", link: "/forge/linting/block-timestamp" },
              { text: "calls-loop", link: "/forge/linting/calls-loop" },
              { text: "delegatecall-loop", link: "/forge/linting/delegatecall-loop" },
              { text: "empty-block", link: "/forge/linting/empty-block" },
              { text: "incorrect-modifier", link: "/forge/linting/incorrect-modifier" },
              { text: "missing-events-access-control", link: "/forge/linting/missing-events-access-control" },
              { text: "missing-events-arithmetic", link: "/forge/linting/missing-events-arithmetic" },
              { text: "missing-zero-check", link: "/forge/linting/missing-zero-check" },
              { text: "msg-value-loop", link: "/forge/linting/msg-value-loop" },
              { text: "reentrancy-events", link: "/forge/linting/reentrancy-events" },
              { text: "require-revert-in-loop", link: "/forge/linting/require-revert-in-loop" },
              { text: "return-bomb", link: "/forge/linting/return-bomb" },
              { text: "solmate-safe-transfer-lib", link: "/forge/linting/solmate-safe-transfer-lib" },
            ],
          },
          {
            text: "Informational",
            collapsed: true,
            items: [
              { text: "boolean-equal", link: "/forge/linting/boolean-equal" },
              { text: "event-fields", link: "/forge/linting/event-fields" },
              { text: "function-init-state", link: "/forge/linting/function-init-state" },
              { text: "inline-assembly", link: "/forge/linting/inline-assembly" },
              { text: "interface-file-naming", link: "/forge/linting/interface-file-naming" },
              { text: "interface-naming", link: "/forge/linting/interface-naming" },
              { text: "missing-inheritance", link: "/forge/linting/missing-inheritance" },
              { text: "mixed-case-function", link: "/forge/linting/mixed-case-function" },
              { text: "mixed-case-variable", link: "/forge/linting/mixed-case-variable" },
              { text: "multi-contract-file", link: "/forge/linting/multi-contract-file" },
              { text: "named-struct-fields", link: "/forge/linting/named-struct-fields" },
              { text: "pascal-case-struct", link: "/forge/linting/pascal-case-struct" },
              { text: "pragma-inconsistent", link: "/forge/linting/pragma-inconsistent" },
              { text: "redundant-base-constructor-call", link: "/forge/linting/redundant-base-constructor-call" },
              { text: "screaming-snake-case-const", link: "/forge/linting/screaming-snake-case-const" },
              { text: "screaming-snake-case-immutable", link: "/forge/linting/screaming-snake-case-immutable" },
              { text: "too-many-digits", link: "/forge/linting/too-many-digits" },
              { text: "unaliased-plain-import", link: "/forge/linting/unaliased-plain-import" },
              { text: "unsafe-cheatcode", link: "/forge/linting/unsafe-cheatcode" },
              { text: "unused-error", link: "/forge/linting/unused-error" },
              { text: "unused-import", link: "/forge/linting/unused-import" },
            ],
          },
          {
            text: "Gas optimization",
            collapsed: true,
            items: [
              { text: "asm-keccak256", link: "/forge/linting/asm-keccak256" },
              { text: "cache-array-length", link: "/forge/linting/cache-array-length" },
              { text: "costly-loop", link: "/forge/linting/costly-loop" },
              { text: "could-be-constant", link: "/forge/linting/could-be-constant" },
              { text: "could-be-immutable", link: "/forge/linting/could-be-immutable" },
              { text: "custom-errors", link: "/forge/linting/custom-errors" },
              { text: "external-function", link: "/forge/linting/external-function" },
              { text: "unused-state-variables", link: "/forge/linting/unused-state-variables" },
              { text: "var-read-using-this", link: "/forge/linting/var-read-using-this" },
              { text: "write-after-write", link: "/forge/linting/write-after-write" },
            ],
          },
          {
            text: "Code size",
            collapsed: true,
            items: [
              { text: "unwrapped-modifier-logic", link: "/forge/linting/unwrapped-modifier-logic" },
            ],
          },
        ],
      },
    ],
  },
  {
    text: "Cast",
    items: [
      { text: "Overview", link: "/cast" },
      { text: "Reading Chain Data", link: "/cast/reading-chain-data" },
      { text: "Sending Transactions", link: "/cast/sending-transactions" },
      { text: "Wallet Operations", link: "/cast/wallet-operations" },
      { text: "ABI Encoding", link: "/cast/abi-encoding" },
    ],
  },
  {
    text: "Anvil",
    items: [
      { text: "Overview", link: "/anvil" },
      { text: "Forking", link: "/anvil/forking" },
      { text: "State Management", link: "/anvil/state-management" },
      { text: "Custom Methods", link: "/anvil/custom-methods" },
    ],
  },
  {
    text: "Chisel",
    items: [
      { text: "Overview", link: "/chisel" },
      { text: "Session Management", link: "/chisel/session-management" },
      { text: "Forking", link: "/chisel/forking" },
      { text: "Commands", link: "/chisel/commands" },
    ],
  },
  {
    text: "Help",
    items: [
      { text: "FAQ", link: "/help/faq" },
      { text: "Troubleshooting", link: "/help/troubleshooting" },
    ],
  },
  {
    text: "Configuration",
    items: [
      { text: "Overview", link: "/config" },
      { text: "Profiles", link: "/config/profiles" },
      { text: "Compiler", link: "/config/compiler" },
      { text: "Testing", link: "/config/testing" },
      { text: "MESC", link: "/config/mesc" },
      { text: "CI Integration", link: "/config/ci" },
      { text: "Editor Setup", link: "/config/editors" },
    ],
  },
  {
    text: "Best Practices",
    link: "/best-practices",
  },
];

export const sidebar: Sidebar = {
  "/benchmarks": [],
  "/": [],
  "/introduction": docs,
  "/projects": docs,
  "/forge": docs,
  "/cast": docs,
  "/anvil": docs,
  "/chisel": docs,
  "/help": docs,
  "/best-practices": docs,
  "/config": docs,
  ...guidesSidebar,
  "/reference/forge": [
    forgeCliReference,
  ],
  "/reference/cast": [
    castCliReference,
  ],
  "/reference/anvil": [
    anvilCliReference,
  ],
  "/reference/chisel": [
    chiselCliReference,
  ],
  "/reference/cheatcodes": [
    {
      text: "Cheatcodes",
      items: cmdReference,
    },
  ],
  "/reference/forge-std": [
    forgeStdReference,
  ],
  "/config/reference": [
    {
      text: "Configuration",
      items: [
        { text: "Overview", link: "/config/reference/overview" },
        { text: "Project", link: "/config/reference/project" },
        { text: "Solidity Compiler", link: "/config/reference/solidity-compiler" },
        { text: "Testing", link: "/config/reference/testing" },
        { text: "In-line Test Config", link: "/config/reference/inline-test-config" },
        { text: "Formatter", link: "/config/reference/formatter" },
        { text: "Linter", link: "/config/reference/linter" },
        { text: "Documentation Generator", link: "/config/reference/doc-generator" },
        { text: "Etherscan", link: "/config/reference/etherscan" },
      ],
    },
  ],
  "/releases": [
    {
      text: "Releases",
      items: [
        { text: "Latest", link: "/releases" },
        { text: "Stable", link: "/releases/stable" },
        { text: "Nightly", link: "/releases/nightly" },
      ],
    },
  ],
};
