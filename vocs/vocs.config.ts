import { defineConfig } from 'vocs'
import { sidebar } from './sidebar/sidebar'
export default defineConfig({
  title: 'foundry-zksync - ZKSync Ethereum Development Framework',
  sidebar,
  theme: {
    accentColor: {
      dark: '#f9c22f',
      // light: '#f98a1a', -- darker orange than the one below
      light: '#f6b128',
    },
  },
  editLink: {
    pattern: 'https://github.com/matter-labs/foundry-zksync-book/edit/main/vocs/docs/pages/:path',
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
      link: 'https://github.com/matter-labs/foundry-zksync',
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
      link: '/guides/best-practices/writing-contracts',
      text: 'Guides',
    },
    {
      link: 'https://github.com/matter-labs/foundry-zksync',
      text: 'GitHub',
    },
    {
      text: 'v1.3.0-rc1',
      items: [
        {
          text: 'Release notes',
          link: '/releases',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/matter-labs/foundry-zksync/blob/main/CONTRIBUTING.md',
        }
      ]
    }
  ]
})
