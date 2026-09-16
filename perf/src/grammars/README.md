# Upstream syntax grammars

These TextMate grammars load through Shiki in the artifact viewer. Keep their
rules in sync with the pinned upstream files; the adjacent licenses apply.

| Grammar  | Source                                                                                                                                              | Commit                                     |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Solidity | [Hardhat VS Code](https://github.com/NomicFoundation/hardhat-vscode/blob/4488bc6d6b0752dbb34b05318866aae5290637ee/client/syntaxes/solidity.json)    | `4488bc6d6b0752dbb34b05318866aae5290637ee` |
| Yul      | [VS Code Yul Highlight](https://github.com/zzh1996/vscode-yul-highlight/blob/43861784910d81e0c5809b68182e00fe5807e698/syntaxes/yul.tmLanguage.json) | `43861784910d81e0c5809b68182e00fe5807e698` |

`highlight.ts` assigns loader names and injects the Yul grammar's escape-aware
string rules into Solidity outside comments and strings. Hardhat's string rules
stop at escaped quotes, and some declaration contexts omit literals. This
adapter uses the upstream rules without rewriting the Solidity repository.

To update, fetch the files and licenses at a specific upstream commit, format
with `vp fmt`, and run the highlighting regressions in
`tests/formattedArtifact.test.ts` and the viewer browser tests.
