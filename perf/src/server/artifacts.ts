export const artifactFiles = new Map<string, readonly [string, string, string]>([
  ['input.json', ['Compiler input', 'json', '0.json']],
  ['output.json', ['Compiler output', 'json', '1.json']],
  ['mir.mir', ['MIR', 'text', '2.json']],
  ['creation.evmir', ['Creation EVM IR', 'text', '3.json']],
  ['runtime.evmir', ['Runtime EVM IR', 'text', '4.json']],
  ['optimized-ir.yul', ['Optimized Yul IR', 'solidity', '5.json']],
  ['creation.disasm', ['Creation disassembly', 'asm', '6.json']],
  ['runtime.disasm', ['Runtime disassembly', 'asm', '7.json']],
  ['creation.hex', ['Creation bytecode', 'text', '8.json']],
  ['runtime.hex', ['Runtime bytecode', 'text', '9.json']],
] as const)
