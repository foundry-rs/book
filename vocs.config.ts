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
  description:
    "Documentation for Foundry's Forge, Cast, Anvil, and Chisel Ethereum development tools.",
  baseUrl: "https://www.getfoundry.sh",
  // Keep assets on the current origin so Vercel previews do not load them cross-origin.
  // `baseUrl` still provides the production origin for canonical and Open Graph metadata.
  head: {
    base: false,
  },
  rootDir: ".",
  sidebar,
  changelog: Changelog.github({ repo: "foundry-rs/foundry" }),
  feedback: Feedback.slack(),
  mcp: {
    enabled: true,
    sources: [McpSource.github({ repo: "foundry-rs/foundry" })],
  },
  editLink: {
    link: "https://github.com/foundry-rs/book/edit/master/src/pages/:path",
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
      link: "/guides/tempo",
      match: "/guides/tempo",
      text: "Tempo",
    },
    {
      text: "Reference",
      items: [
        {
          text: "Overview",
          link: "/reference",
        },
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
        {
          text: "Configuration",
          link: "/config/reference/overview",
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
