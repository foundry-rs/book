import { Sidebar } from "vocs";
import { forgeOverview } from "./forge-overview";
import { cmdReference } from "./cmd-reference";
import { anvilCliReference } from "./anvil-cli-reference";
import { chiselCliReference } from "./chisel-cli-reference";
import { castCliReference } from "./cast-cli-reference";

export const sidebar: Sidebar = [
  {
    text: "Introduction",
    items: [
      { text: "Overview", link: "/introduction/overview" },
      { text: "Installation", link: "/introduction/installation" },
      { text: "Getting Started", link: "/introduction/getting-started" },
      { text: "Prompting", link: "/introduction/prompting" },
      { text: "Benchmarks", link: "/introduction/benchmarks" },
    ],
  },
  {
    text: "Guides",
    items: [
      {
        text: "Project Setup",
        collapsed: true,
        items: [
          {
            text: "Creating a New Project",
            link: "/guides/project-setup/creating-a-new-project",
          },
          {
            text: "Clone a Verified Contract",
            link: "/guides/project-setup/clone-a-verified-contract",
          },
          { text: "Dependencies", link: "/guides/project-setup/dependencies" },
          { text: "Soldeer", link: "/guides/project-setup/soldeer" },
          {
            text: "Project Layout",
            link: "/guides/project-setup/project-layout",
          },
        ],
      },
      {
        text: "Scripting with Solidity",
        link: "/guides/scripting-with-solidity",
      },
      {
        text: "Implementing and Testing EIP-712 signatures",
        link: "/guides/eip712",
      },
      {
        text: "Deterministic deployments using CREATE2",
        link: "/guides/deterministic-deployments-using-create2",
      },
      {
        text: "Forking Mainnet with Cast and Anvil",
        link: "/guides/forking-mainnet-with-cast-anvil",
      },
      {
        text: "Running Foundry inside of Docker",
        link: "/guides/foundry-in-docker",
      },
      { text: "Video tutorials", link: "/guides/video-tutorials" },
      {
        text: "Best Practices",
        collapsed: true,
        items: [
          {
            text: "Writing Contracts",
            link: "/guides/best-practices/writing-contracts",
          },
          {
            text: "Writing Tests",
            link: "/guides/best-practices/writing-tests",
          },
          {
            text: "Writing Scripts",
            link: "/guides/best-practices/writing-scripts",
          },
          { text: "Security", link: "/guides/best-practices/security" },
          {
            text: "Key Management",
            link: "/guides/best-practices/key-management",
          },
          { text: "Commenting", link: "/guides/best-practices/commenting" },
        ],
      },
    ],
  },
  {
    text: "Forge",
    items: forgeOverview,
  },
  {
    text: "Cast",
    items: [
      { text: "Overview", link: "/cast/overview" },
      castCliReference,
    ],
  },
  {
    text: "Anvil",
    items: [
      { text: "Overview", link: "/anvil/overview" },
      anvilCliReference,
    ],
  },
  {
    text: "Chisel",
    items: [
      { text: "Overview", link: "/chisel/overview" },
      chiselCliReference,
    ],
  },
  {
    text: "Configuration",
    collapsed: false,
    items: [
      { text: "Overview", link: "/config/overview" },
      { text: "Dynamic Test Linking", link: "/config/dynamic-test-linking" },
      {
        text: "Continuous Integration",
        link: "/config/continuous-integration",
      },
      { text: "Integrating with VSCode", link: "/config/vscode" },
      { text: "Shell Autocompletion", link: "/config/shell-autocompletion" },
      { text: "Static Analyzers", link: "/config/static-analyzers" },
      { text: "Integrating with Hardhat", link: "/config/hardhat" },
      { text: "Vyper support", link: "/config/vyper" },
      {
        text: "Reference",
        collapsed: true,
        link: "/config/reference/overview",
        items: [
          { text: "Project", link: "/config/reference/project" },
          {
            text: "Solidity Compiler",
            link: "/config/reference/solidity-compiler",
          },
          { text: "Testing", link: "/config/reference/testing" },
          {
            text: "In-line Configuration Testing",
            link: "/config/reference/inline-test-config",
          },
          { text: "Formatter", link: "/config/reference/formatter" },
          { text: "Linter", link: "/config/reference/linter" },
          {
            text: "Documentation Generator",
            link: "/config/reference/doc-generator",
          },
          { text: "Etherscan", link: "/config/reference/etherscan" },
        ],
      },
    ],
  },
  {
    text: "Cheatcode Reference",
    collapsed: false,
    items: cmdReference,
  },
  {
    text: "Releases",
    link: "/releases",
    items: [
      { text: "Latest", link: "/releases" },
      { text: "Stable", link: "/releases/stable" },
      { text: "Nightly", link: "/releases/nightly" },
    ],
  },
  {
    text: "Miscellaneous",
    items: [
      { text: "v1.0 migration guide", link: "/misc/v1.0-migration" },
      {
        text: "Struct Encoding",
        link: "/misc/struct-encoding",
      },
      {
        text: "FAQ",
        link: "/misc/faq",
      },
    ],
  },
];
