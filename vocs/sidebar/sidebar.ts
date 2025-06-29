import { Sidebar } from "vocs";
import { forgeOverview } from "./forge-overview";
import { cmdReference } from "./cmd-reference";

export const sidebar: Sidebar = [
  {
    text: "Introduction",
    items: [
      { text: "Overview", link: "/introduction/overview" },
      { text: "Installation", link: "/introduction/installation" },
      { text: "Getting Started", link: "/introduction/getting-started" },
      { text: "Prompting", link: "/introduction/prompting" },
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
      {
        text: "Reference",
        collapsed: true,
        link: "/cast/reference/overview",
        items: [
          {
            text: "General Commands",
            collapsed: true,
            link: "/cast/reference/general-commands",
            items: [
              { text: "cast", link: "/cast/reference/overview" },
              { text: "cast help", link: "/cast/reference/cast-help" },
              {
                text: "cast completions",
                link: "/cast/reference/cast-completions",
              },
            ],
          },
          {
            text: "Chain Commands",
            collapsed: true,
            link: "/cast/reference/chain-commands",
            items: [
              { text: "cast chain-id", link: "/cast/reference/cast-chain-id" },
              { text: "cast chain", link: "/cast/reference/cast-chain" },
              { text: "cast client", link: "/cast/reference/cast-client" },
            ],
          },
          {
            text: "Transaction Commands",
            collapsed: true,
            link: "/cast/reference/transaction-commands",
            items: [
              { text: "cast publish", link: "/cast/reference/cast-publish" },
              { text: "cast receipt", link: "/cast/reference/cast-receipt" },
              { text: "cast send", link: "/cast/reference/cast-send" },
              { text: "cast mktx", link: "/cast/reference/cast-mktx" },
              { text: "cast call", link: "/cast/reference/cast-call" },
              { text: "cast rpc", link: "/cast/reference/cast-rpc" },
              { text: "cast tx", link: "/cast/reference/cast-tx" },
              { text: "cast run", link: "/cast/reference/cast-run" },
              { text: "cast estimate", link: "/cast/reference/cast-estimate" },
              {
                text: "cast access-list",
                link: "/cast/reference/cast-access-list",
              },
              { text: "cast logs", link: "/cast/reference/cast-logs" },
            ],
          },
          {
            text: "Block Commands",
            collapsed: true,
            link: "/cast/reference/block-commands",
            items: [
              {
                text: "cast find-block",
                link: "/cast/reference/cast-find-block",
              },
              {
                text: "cast gas-price",
                link: "/cast/reference/cast-gas-price",
              },
              {
                text: "cast block-number",
                link: "/cast/reference/cast-block-number",
              },
              { text: "cast basefee", link: "/cast/reference/cast-basefee" },
              { text: "cast block", link: "/cast/reference/cast-block" },
              { text: "cast age", link: "/cast/reference/cast-age" },
            ],
          },
          {
            text: "Account Commands",
            collapsed: true,
            link: "/cast/reference/account-commands",
            items: [
              { text: "cast balance", link: "/cast/reference/cast-balance" },
              { text: "cast storage", link: "/cast/reference/cast-storage" },
              { text: "cast proof", link: "/cast/reference/cast-proof" },
              { text: "cast nonce", link: "/cast/reference/cast-nonce" },
              { text: "cast code", link: "/cast/reference/cast-code" },
              { text: "cast codesize", link: "/cast/reference/cast-codesize" },
              { text: "cast index", link: "/cast/reference/cast-" },
            ],
          },
          {
            text: "ENS Commands",
            collapsed: true,
            link: "/cast/reference/ens-commands",
            items: [
              {
                text: "cast lookup-address",
                link: "/cast/reference/cast-lookup-address",
              },
              {
                text: "cast resolve-name",
                link: "/cast/reference/cast-resolve-name",
              },
              { text: "cast namehash", link: "/cast/reference/cast-namehash" },
            ],
          },
          {
            text: "Etherscan Commands",
            collapsed: true,
            link: "/cast/reference/etherscan-commands",
            items: [
              {
                text: "cast etherscan-source",
                link: "/cast/reference/cast-etherscan-source",
              },
            ],
          },
          {
            text: "ABI Commands",
            collapsed: true,
            link: "/cast/reference/abi-commands",
            items: [
              {
                text: "cast abi-encode",
                link: "/cast/reference/cast-abi-encode",
              },
              { text: "cast 4byte", link: "/cast/reference/cast-4byte" },
              {
                text: "cast 4byte-calldata",
                link: "/cast/reference/cast-4byte-calldata",
              },
              {
                text: "cast 4byte-event",
                link: "/cast/reference/cast-4byte-event",
              },
              { text: "cast calldata", link: "/cast/reference/cast-calldata" },
              {
                text: "cast decode-abi",
                link: "/cast/reference/cast-decode-abi",
              },
              {
                text: "cast decode-calldata",
                link: "/cast/reference/cast-decode-calldata",
              },
              {
                text: "cast pretty-calldata",
                link: "/cast/reference/cast-pretty-calldata",
              },
              {
                text: "cast selectors",
                link: "/cast/reference/cast-selectors",
              },
              {
                text: "cast upload-signature",
                link: "/cast/reference/cast-upload-signature",
              },
            ],
          },
          {
            text: "Conversion Commands",
            collapsed: true,
            link: "/cast/reference/conversion-commands",
            items: [
              {
                text: "cast format-bytes32-string",
                link: "/cast/reference/cast-format-bytes32-string",
              },
              { text: "cast from-bin", link: "/cast/reference/cast-from-bin" },
              {
                text: "cast from-fixed-point",
                link: "/cast/reference/cast-from-fixed-point",
              },
              { text: "cast from-rlp", link: "/cast/reference/cast-from-rlp" },
              {
                text: "cast from-utf8",
                link: "/cast/reference/cast-from-utf8",
              },
              { text: "cast from-wei", link: "/cast/reference/cast-from-wei" },
              {
                text: "cast parse-bytes32-address",
                link: "/cast/reference/cast-parse-bytes32-address",
              },
              {
                text: "cast parse-bytes32-string",
                link: "/cast/reference/cast-parse-bytes32-string",
              },
              { text: "cast to-ascii", link: "/cast/reference/cast-to-ascii" },
              { text: "cast to-base", link: "/cast/reference/cast-to-base" },
              {
                text: "cast to-bytes32",
                link: "/cast/reference/cast-to-bytes32",
              },
              { text: "cast to-dec", link: "/cast/reference/cast-to-dec" },
              {
                text: "cast to-fixed-point",
                link: "/cast/reference/cast-to-fixed-point",
              },
              { text: "cast to-hex", link: "/cast/reference/cast-to-hex" },
              {
                text: "cast to-hexdata",
                link: "/cast/reference/cast-to-hexdata",
              },
              {
                text: "cast to-int256",
                link: "/cast/reference/cast-to-int256",
              },
              { text: "cast to-rlp", link: "/cast/reference/cast-to-rlp" },
              {
                text: "cast to-uint256",
                link: "/cast/reference/cast-to-uint256",
              },
              { text: "cast to-unit", link: "/cast/reference/cast-to-unit" },
              { text: "cast to-wei", link: "/cast/reference/cast-to-wei" },
              { text: "cast shl", link: "/cast/reference/cast-shl" },
              { text: "cast shr", link: "/cast/reference/cast-shr" },
            ],
          },
          {
            text: "Utility Commands",
            collapsed: true,
            link: "/cast/reference/utility-commands",
            items: [
              {
                text: "cast address-zero",
                link: "/cast/reference/cast-address-zero",
              },
              { text: "cast sig", link: "/cast/reference/cast-sig" },
              {
                text: "cast sig-event",
                link: "/cast/reference/cast-sig-event",
              },
              { text: "cast keccak", link: "/cast/reference/cast-keccak" },
              {
                text: "cast compute-address",
                link: "/cast/reference/cast-compute-address",
              },
              { text: "cast create2", link: "/cast/reference/cast-create2" },
              {
                text: "cast interface",
                link: "/cast/reference/cast-interface",
              },
              { text: "cast index", link: "/cast/reference/cast-index" },
              {
                text: "cast concat-hex",
                link: "/cast/reference/cast-concat-hex",
              },
              { text: "cast max-int", link: "/cast/reference/cast-max-int" },
              { text: "cast min-int", link: "/cast/reference/cast-min-int" },
              { text: "cast max-uint", link: "/cast/reference/cast-max-uint" },
              {
                text: "cast to-check-sum-address",
                link: "/cast/reference/cast-to-check-sum-address",
              },
            ],
          },
          {
            text: "Wallet Commands",
            collapsed: true,
            link: "/cast/reference/wallet-commands",
            items: [
              { text: "cast wallet", link: "/cast/reference/cast-wallet" },
              {
                text: "cast wallet new",
                link: "/cast/reference/cast-wallet-new",
              },
              {
                text: "cast wallet new-mnemonic",
                link: "/cast/reference/cast-wallet-new-mnemonic",
              },
              {
                text: "cast wallet address",
                link: "/cast/reference/cast-wallet-address",
              },
              {
                text: "cast wallet sign",
                link: "/cast/reference/cast-wallet-sign",
              },
              {
                text: "cast wallet vanity",
                link: "/cast/reference/cast-wallet-vanity",
              },
              {
                text: "cast wallet verify",
                link: "/cast/reference/cast-wallet-verify",
              },
              {
                text: "cast wallet import",
                link: "/cast/reference/cast-wallet-import",
              },
              {
                text: "cast wallet list",
                link: "/cast/reference/cast-wallet-list",
              },
              {
                text: "cast wallet sign-auth",
                link: "/cast/reference/cast-wallet-sign-auth",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: "Anvil",
    items: [
      { text: "Overview", link: "/anvil/overview" },
      { text: "Reference", link: "/anvil/reference" },
    ],
  },
  {
    text: "Chisel",
    items: [
      { text: "Overview", link: "/chisel/overview" },
      { text: "Reference", link: "/chisel/reference" },
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
    link: "/reference/cheatcodes/overview",
    items: cmdReference,
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
