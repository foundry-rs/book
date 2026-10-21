export const artifactThemes = { light: 'github-light', dark: 'github-dark' } as const

// Highlights has no lexers for EVM disassembly, Solar MIR, EVM IR or LLVM IR; its assembly lexer
// still marks their instructions, labels, numbers and comments.
const assemblyExtensions = ['.disasm', '.evmir', '.ll', '.mir', '.s']

export function artifactLanguage(path: string, language: string) {
  if (assemblyExtensions.some((extension) => path.endsWith(extension))) return 'asm'
  // Nor for Yul (demo data labels it `yul`); its Solidity lexer covers `assembly` blocks.
  if (path.endsWith('.yul')) return 'solidity'
  return language
}
