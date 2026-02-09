import { defineConfig, Feedback, McpSource, Changelog } from "vocs/config";
import { sidebar } from "./sidebar/sidebar";

export const sponsors = {
  collaborators: [
    {
      name: "Paradigm",
      link: "https://paradigm.xyz",
      image:
        "https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/paradigm-light.svg",
    },
    {
      name: "Tempo",
      link: "https://tempo.xyz",
      image:
        "https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/tempo-light.svg",
    },
  ],
};

export default defineConfig({
  codeHighlight: {
    langs: [],
    langAlias: {
      gitignore: "text",
    },
  },
  // light: '#f98a1a', -- darker orange than the one below
  accentColor: "light-dark(#f6b128, #f9c22f)",
  title: "foundry - Ethereum Development Framework",
  rootDir: ".",
  sidebar,
  changelog: Changelog.github({ repo: "foundry-rs/foundry" }),
  feedback: Feedback.slack(),
  mcp: {
    enabled: true,
    sources: [McpSource.github({ repo: "foundry-rs/foundry" })],
  },
  editLink: {
    link: "https://github.com/foundry-rs/book/edit/master/vocs/src/pages/:path",
    text: "Suggest changes on GitHub",
  },
  logoUrl: "/foundry-logo.png",
  iconUrl: "/foundry-logo.png",
  ogImageUrl: "/og-image.png",
  socials: [
    {
      link: "https://github.com/foundry-rs/foundry",
      icon: "github",
    },
    {
      link: "https://t.me/foundry_support",
      icon: "telegram",
    },
  ],
  topNav: [
    {
      link: "/introduction/getting-started",
      text: "Docs",
    },
    {
      link: "/guides",
      text: "Guides",
    },
    {
      text: "Reference",
      items: [
        {
          text: "forge",
          link: "/reference/forge/forge",
        },
        {
          text: "cast",
          link: "/reference/cast/cast",
        },
        {
          text: "anvil",
          link: "/reference/anvil/anvil",
        },
        {
          text: "chisel",
          link: "/reference/chisel/chisel",
        },
        {
          text: "Cheatcodes",
          link: "/reference/cheatcodes/overview",
        },
        {
          text: "Forge Std",
          link: "/reference/forge-std/overview",
        },
      ],
    },
    {
      link: "/benchmarks",
      text: "Benchmarks",
    },
    {
      text: "Changelog",
      link: "/changelog",
    },
  ],
});
