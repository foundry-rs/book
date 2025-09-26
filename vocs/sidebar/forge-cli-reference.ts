import { SidebarItem } from "vocs";

export const forgeCliReference: SidebarItem = {
  text: "Reference",
  collapsed: true,
  items: [
    { text: "forge", link: "/forge/reference/forge" },
    {
      text: "Build Commands",
      collapsed: true,
      items: [
        { text: "forge build", link: "/forge/reference/build" },
        { text: "forge cache clean", link: "/forge/reference/cache/clean" },
        { text: "forge clean", link: "/forge/reference/clean" },
        { text: "forge inspect", link: "/forge/reference/inspect" },
      ],
    },
    {
      text: "Deploy Commands",
      collapsed: true,
      items: [
        { text: "forge create", link: "/forge/reference/create" },
        { text: "forge flatten", link: "/forge/reference/flatten" },
        { text: "forge verify-check", link: "/forge/reference/verify-check" },
        {
          text: "forge verify-contract",
          link: "/forge/reference/verify-contract",
        },
      ],
    },
    {
      text: "General Commands",
      collapsed: true,
      items: [
        { text: "forge completions", link: "/forge/reference/completions" },
      ],
    },
    {
      text: "Project Commands",
      collapsed: true,
      items: [
        { text: "forge clone", link: "/forge/reference/clone" },
        { text: "forge config", link: "/forge/reference/config" },
        { text: "forge geiger", link: "/forge/reference/geiger" },
        { text: "forge init", link: "/forge/reference/init" },
        { text: "forge install", link: "/forge/reference/install" },
        { text: "forge remappings", link: "/forge/reference/remappings" },
        { text: "forge remove", link: "/forge/reference/remove" },
        { text: "forge soldeer init", link: "/forge/reference/soldeer/init" },
        {
          text: "forge soldeer install",
          link: "/forge/reference/soldeer/install",
        },
        {
          text: "forge soldeer update",
          link: "/forge/reference/soldeer/update",
        },
        { text: "forge tree", link: "/forge/reference/tree" },
        { text: "forge update", link: "/forge/reference/update" },
      ],
    },
    {
      text: "Test Commands",
      collapsed: true,
      items: [
        { text: "forge coverage", link: "/forge/reference/coverage" },
        { text: "forge generate test", link: "/forge/reference/generate/test" },
        { text: "forge snapshot", link: "/forge/reference/snapshot" },
        { text: "forge test", link: "/forge/reference/test" },
      ],
    },
    {
      text: "Utility Commands",
      collapsed: true,
      items: [
        { text: "forge bind", link: "/forge/reference/bind" },
        { text: "forge bind-json", link: "/forge/reference/bind-json" },
        { text: "forge cache", link: "/forge/reference/cache" },
        { text: "forge cache ls", link: "/forge/reference/cache/ls" },
        { text: "forge compiler", link: "/forge/reference/compiler" },
        {
          text: "forge compiler resolve",
          link: "/forge/reference/compiler/resolve",
        },
        { text: "forge doc", link: "/forge/reference/doc" },
        { text: "forge eip712", link: "/forge/reference/eip712" },
        { text: "forge fmt", link: "/forge/reference/fmt" },
        { text: "forge generate", link: "/forge/reference/generate" },
        { text: "forge lint", link: "/forge/reference/lint" },
        { text: "forge script", link: "/forge/reference/script" },
        { text: "forge selectors", link: "/forge/reference/selectors" },
        {
          text: "forge selectors cache",
          link: "/forge/reference/selectors/cache",
        },
        {
          text: "forge selectors collision",
          link: "/forge/reference/selectors/collision",
        },
        {
          text: "forge selectors find",
          link: "/forge/reference/selectors/find",
        },
        {
          text: "forge selectors list",
          link: "/forge/reference/selectors/list",
        },
        {
          text: "forge selectors upload",
          link: "/forge/reference/selectors/upload",
        },
        { text: "forge soldeer", link: "/forge/reference/soldeer" },
        { text: "forge soldeer login", link: "/forge/reference/soldeer/login" },
        { text: "forge soldeer push", link: "/forge/reference/soldeer/push" },
        {
          text: "forge soldeer uninstall",
          link: "/forge/reference/soldeer/uninstall",
        },
        {
          text: "forge soldeer version",
          link: "/forge/reference/soldeer/version",
        },
        {
          text: "forge verify-bytecode",
          link: "/forge/reference/verify-bytecode",
        },
      ],
    },
  ],
};
