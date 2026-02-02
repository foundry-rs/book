import { defineConfig, Feedback, McpSource } from 'vocs/config'
import { sidebar } from './sidebar/sidebar'
export default defineConfig({
  title: 'foundry - Ethereum Development Framework',
  rootDir: '.',
  sidebar,
  feedback: Feedback.slack(),
  mcp: {
    enabled: true,
    sources: [
      McpSource.github({ repo: 'foundry-rs/foundry' }),
    ],
  },
  theme: {
    accentColor: {
      dark: '#f9c22f',
      // light: '#f98a1a', -- darker orange than the one below
      light: '#f6b128',
    },
  },
  editLink: {
    pattern: 'https://github.com/foundry-rs/book/edit/master/vocs/docs/pages/:path',
    text: 'Suggest changes on GitHub',
  },
  sponsors: [
    {
      name: 'Collaborator',
      height: 120,
      items: [
        [
          {
            name: 'Paradigm',
            link: 'https://paradigm.xyz',
            image:
              'https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/paradigm-light.svg',
          },
          {
            name: 'Ithaca',
            link: 'https://ithaca.xyz',
            image:
              'https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/ithaca-light.svg',
          },
        ],
      ],
    }
  ],
  logoUrl: '/foundry-logo.png',
  iconUrl: '/foundry-logo.png',
  ogImageUrl: '/og-image.png',
  socials: [
    {
      link: 'https://github.com/foundry-rs/foundry',
      icon: 'github'
    },
    {
      link: 'https://t.me/foundry_support',
      icon: 'telegram',
    }
  ],
  topNav: [
    {
      link: '/introduction/getting-started',
      text: 'Docs',
    },
    {
      text: 'Reference',
      items: [
        {
          text: 'forge',
          link: '/reference/forge/forge',
        },
        {
          text: 'cast',
          link: '/reference/cast/cast',
        },
        {
          text: 'anvil',
          link: '/reference/anvil/anvil',
        },
        {
          text: 'chisel',
          link: '/reference/chisel/chisel',
        },
        {
          text: 'Cheatcodes',
          link: '/reference/cheatcodes/overview',
        },
        {
          text: 'Forge Std',
          link: '/reference/forge-std/overview',
        },
      ]
    },
    {
      link: '/benchmarks',
      text: 'Benchmarks',
    },
    {
      text: 'Releases',
      items: [
        {
          text: 'Release notes',
          link: '/releases',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/foundry-rs/foundry/blob/master/CONTRIBUTING.md',
        }
      ]
    }
  ]
})
