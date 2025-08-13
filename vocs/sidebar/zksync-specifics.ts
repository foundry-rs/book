import { SidebarItem } from "vocs";

export const zksyncSpecifics: SidebarItem[] = [
  {
    text: 'Overview',
    link: '/zksync-specifics/overview',
  },
  {
    text: 'Foundry-ZKSync Supported Commands',
    link: '/misc/README',
  },
  {
    text: 'Compilation Overview',
    link: '/zksync-specifics/compilation-overview',
  },
  {
    text: 'Execution Overview',
    link: '/zksync-specifics/execution-overview',
  },
  {
    text: 'Configuration Overview',
    link: '/zksync-specifics/configuration-overview',
  },
  {
    text: 'Gas',
    link: '/zksync-specifics/gas',
  },
  {
    text: 'Paymaster Overview',
    link: '/zksync-specifics/paymaster-overview',
  },
  {
    text: 'Forge-ZKsync Standard Library',
    link: '/zksync-specifics/forge-zksync-std',
  },
  {
    text: 'Developer Guide',
    collapsed: true,
    items: [
      { text: 'Linking', link: '/zksync-specifics/developer-guide/linking' },
      { text: 'Nonces', link: '/zksync-specifics/developer-guide/nonces' },
    ],
  },
  {
    text: 'Examples',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/zksync-specifics/examples/overview' },
      { text: 'General Paymaster', link: '/zksync-specifics/examples/general-paymaster' },
      { text: 'Approval-based Paymaster', link: '/zksync-specifics/examples/paymaster-approval-based' },
      { text: 'Smart Account', link: '/zksync-specifics/examples/smart-account' },
      { text: 'Ledger', link: '/zksync-specifics/examples/ledger' },
    ],
  },
  {
    text: 'Cheatcodes',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/zksync-specifics/cheatcodes/overview' },
      { text: 'zkVm', link: '/zksync-specifics/cheatcodes/zk-vm' },
      { text: 'zkVmSkip', link: '/zksync-specifics/cheatcodes/zk-vm-skip' },
      { text: 'zkUsePaymaster', link: '/zksync-specifics/cheatcodes/zk-use-paymaster' },
      { text: 'zkRegisterContract', link: '/zksync-specifics/cheatcodes/zk-register-contract' },
      { text: 'zkUseFactoryDep', link: '/zksync-specifics/cheatcodes/zk-use-factory-dep' },
    ],
  },
  {
    text: 'Limitations',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/zksync-specifics/limitations/overview' },
      { text: 'General', link: '/zksync-specifics/limitations/general' },
      { text: 'Compilation', link: '/zksync-specifics/limitations/compilation' },
      { text: 'Cheatcodes', link: '/zksync-specifics/limitations/cheatcodes' },
      { text: 'Traces', link: '/zksync-specifics/limitations/traces' },
      { text: 'Events', link: '/zksync-specifics/limitations/events' },
      { text: 'Broadcast', link: '/zksync-specifics/limitations/broadcast' },
    ],
  },
];