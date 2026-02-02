import { Sidebar } from "vocs";
import { forgeCliReference } from "./forge-cli-reference";
import { cmdReference } from "./cmd-reference";
import { anvilCliReference } from "./anvil-cli-reference";
import { chiselCliReference } from "./chisel-cli-reference";
import { castCliReference } from "./cast-cli-reference";
import { forgeStdReference } from "./forge-std-reference";

const docs = [
  {
    text: "Introduction",
    items: [
      { text: "Installation", link: "/introduction/installation" },
      { text: "Getting Started", link: "/introduction/getting-started" },
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
      { text: "Linting", link: "/forge/linting" },
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
];

export const sidebar: Sidebar = {
  "/introduction": docs,
  "/forge": docs,
  "/cast": docs,
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
  "/reference/ds-test": [
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
