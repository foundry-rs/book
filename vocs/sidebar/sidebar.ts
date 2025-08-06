import { Sidebar } from "vocs";
import { zksyncSpecifics } from "./zksync-specifics";

export const sidebar: Sidebar = [
  {
    text: "Introduction",
    items: [
      { text: "Installation", link: "/introduction/installation" },
      { text: "Getting Started", link: "/zksync-specifics/overview" },
    ],
  },
  {
    text: "Guides",
    items: [
      {
        text: "Project Setup",
        collapsed: true,
        items: [
          { text: "Creating a New Project", link: "/guides/project-setup/creating-a-new-project" },
          { text: "Working on an Existing Project", link: "/guides/project-setup/working-on-an-existing-project" },
          { text: "Dependencies", link: "/guides/project-setup/dependencies" },
          { text: "Project Layout", link: "/guides/project-setup/project-layout" },
          { text: "Soldeer", link: "/guides/project-setup/soldeer" },
        ],
      },
      { text: "Scripting with Solidity", link: "/guides/scripting-with-solidity" },
      { text: "Implementing and Testing EIP-712 signatures", link: "/guides/eip712" },
      { text: "Deterministic deployments using CREATE2", link: "/guides/deterministic-deployments-using-create2" },
      { text: "Creating an NFT with Solmate", link: "/guides/creating-an-nft-with-solmate" },
      {
        text: "Best Practices",
        collapsed: true,
        items: [
          { text: "Writing Tests", link: "/guides/best-practices/writing-tests" },
          { text: "Writing Scripts", link: "/guides/best-practices/writing-scripts" },
          { text: "Writing Contracts", link: "/guides/best-practices/writing-contracts" },
          { text: "Security", link: "/guides/best-practices/security" },
          { text: "Key Management", link: "/guides/best-practices/key-management" },
          { text: "Commenting", link: "/guides/best-practices/commenting" },
        ],
      },
    ],
  },
  {
    text: "ZKSync Specifics",
    items: zksyncSpecifics,
  },
  {
    text: "Anvil ZKsync",
    collapsed: true,
    items: [
      { text: "Overview", link: "/anvil-zksync/anvil-zksync" },
    ],
  },
  {
    text: "Reference",
    collapsed: true,
    items: [
      { text: "Anvil ZKsync", link: "/reference/anvil-zksync/README" },
    ],
  },
];
