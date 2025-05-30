import { SidebarItem } from "vocs";

export const forgeOverview: SidebarItem[] = [
    {
        text: 'Overview',
        link: '/forge/overview',
    },
    {
        text: 'Tests',
        collapsed: false,
        items: [
            { text: 'Overview', link: '/forge/tests/overview' },
            { text: 'Writing Tests', link: '/forge/tests/writing-tests' },
            { text: 'Cheatcodes', link: '/forge/tests/cheatcodes' },
            { text: 'Forge Standard Library Overview', link: '/forge/tests/forge-std' },
            { text: 'Understanding Traces', link: '/forge/tests/traces' },
            { text: 'Fork Testing', link: '/forge/tests/fork-testing' },
            { text: 'Replaying Failures', link: '/forge/tests/replay-testing' }
        ]
    },
    {
        text: 'Advanced Testing',
        collapsed: false,
        items: [
            { text: 'Overview', link: '/forge/advanced-testing/overview' },
            { text: 'Fuzz Testing', link: '/forge/advanced-testing/fuzz-testing' },
            { text: 'Invariant Testing', link: '/forge/advanced-testing/invariant-testing' },
            { text: 'Differential Testing', link: '/forge/advanced-testing/differential-ffi-testing' }
        ]
    },
    { text: 'Deploying and Verifying', link: '/forge/deploying' },
    {
        text: 'Gas Tracking',
        collapsed: false,
        items: [
            { text: 'Overview', link: '/forge/gas-tracking/overview' },
            { text: 'Gas Reports', link: '/forge/gas-tracking/gas-reports' },
            { text: 'Gas Function Snapshots', link: '/forge/gas-tracking/gas-function-snapshots' },
            { text: 'Gas Section Snapshots', link: '/forge/gas-tracking/gas-section-snapshots' }
        ]
    },
    { text: 'Debugger', link: '/forge/debugger' },
    { text: 'Reference', collapsed: true, items: [
        {
          text: 'General Commands',
          link: '/reference/forge/general-commands',
          items: [
            { text: 'forge', link: '/reference/forge/forge' },
            { text: 'forge help', link: '/reference/forge/forge-help' },
            { text: 'forge completions', link: '/reference/forge/forge-completions' },
          ],
        },
        {
          text: 'Project Commands',
          link: '/reference/forge/project-commands',
          items: [
            { text: 'forge init', link: '/reference/forge/forge-init' },
            { text: 'forge clone', link: '/reference/forge/forge-clone' },
            { text: 'forge install', link: '/reference/forge/forge-install' },
            { text: 'forge update', link: '/reference/forge/forge-update' },
            { text: 'forge remove', link: '/reference/forge/forge-remove' },
            { text: 'forge config', link: '/reference/forge/forge-config' },
            { text: 'forge remappings', link: '/reference/forge/forge-remappings' },
            { text: 'forge tree', link: '/reference/forge/forge-tree' },
            { text: 'forge geiger', link: '/reference/forge/forge-geiger' },
          ],
        },
        {
          text: 'Build Commands',
          link: '/reference/forge/build-commands',
          items: [
            { text: 'forge build', link: '/reference/forge/forge-build' },
            { text: 'forge clean', link: '/reference/forge/forge-clean' },
            { text: 'forge inspect', link: '/reference/forge/forge-inspect' },
          ],
        },
        {
          text: 'Test Commands',
          link: '/reference/forge/test-commands',
          items: [
            { text: 'forge test', link: '/reference/forge/forge-test' },
            { text: 'forge snapshot', link: '/reference/forge/forge-snapshot' },
            { text: 'forge coverage', link: '/reference/forge/forge-coverage' },
          ],
        },
        {
          text: 'Deploy Commands',
          link: '/reference/forge/deploy-commands',
          items: [
            { text: 'forge create', link: '/reference/forge/forge-create' },
            { text: 'forge verify-contract', link: '/reference/forge/forge-verify-contract' },
            { text: 'forge verify-check', link: '/reference/forge/forge-verify-check' },
            { text: 'forge flatten', link: '/reference/forge/forge-flatten' },
          ],
        },
        {
          text: 'Utility Commands',
          link: '/reference/forge/utility-commands',
          items: [
            { text: 'forge bind', link: '/reference/forge/forge-bind' },
            { text: 'forge cache', link: '/reference/forge/forge-cache' },
            { text: 'forge cache clean', link: '/reference/forge/forge-cache-clean' },
            { text: 'forge cache ls', link: '/reference/forge/forge-cache-ls' },
            { text: 'forge script', link: '/reference/forge/forge-script' },
            { text: 'forge upload-selectors', link: '/reference/forge/forge-upload-selectors' },
            { text: 'forge doc', link: '/reference/forge/forge-doc' },
          ],
        },
      ]}
]