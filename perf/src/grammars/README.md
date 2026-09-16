# Syntax grammars

These TextMate grammars load through Shiki in the artifact viewer. Solidity is
a local copy of Hardhat’s grammar with the improvements below. Yul follows its
pinned upstream grammar. The adjacent licenses apply.

| Grammar  | Source                                                                                                                                              | Commit                                     |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Solidity | [Hardhat VS Code](https://github.com/NomicFoundation/hardhat-vscode/blob/4488bc6d6b0752dbb34b05318866aae5290637ee/client/syntaxes/solidity.json)    | `4488bc6d6b0752dbb34b05318866aae5290637ee` |
| Yul      | [VS Code Yul Highlight](https://github.com/zzh1996/vscode-yul-highlight/blob/43861784910d81e0c5809b68182e00fe5807e698/syntaxes/yul.tmLanguage.json) | `43861784910d81e0c5809b68182e00fe5807e698` |

The Solidity grammar improves Hardhat's handling of escaped quotes and paired
backslashes, including strings continued across lines. Inheritance arguments use
a recursive expression context so nested calls, literals, comments, and brackets
keep their own scopes instead of becoming base-type names. Function modifier
arguments also recognize literals. These changes live in `solidity.json`;
`highlight.ts` only registers the grammars.

To update, compare the upstream changes against these local improvements, retain
the licenses, format with `vp fmt`, and run the highlighting regressions in
`tests/formattedArtifact.test.ts` and the viewer browser tests.
