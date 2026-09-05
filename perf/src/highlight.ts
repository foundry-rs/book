import { registerCustomLanguage } from '@pierre/diffs'

const solarIr = {
  name: 'solar-ir',
  scopeName: 'source.solar-ir',
  repository: {},
  patterns: [
    { name: 'comment.line.double-slash.solar', match: '//.*$' },
    { name: 'string.quoted.double.solar', match: '"(?:\\\\.|[^"\\\\])*"' },
    { name: 'constant.numeric.solar', match: '\\b(?:0x[0-9a-fA-F]+|[0-9]+)\\b' },
    { name: 'entity.name.function.solar', match: '@[A-Za-z_][A-Za-z0-9_]*' },
    {
      name: 'variable.annotation.solar',
      match: '![A-Za-z_][A-Za-z0-9_]*(?:\\((?:[^()\\n]|\\([^()\\n]*\\))*\\))?',
    },
    {
      name: 'meta.annotation.solar',
      begin: '\\[',
      end: '\\]',
      patterns: [
        { name: 'constant.numeric.solar', match: '\\b(?:0x[0-9a-fA-F]+|[0-9]+)\\b' },
        { name: 'keyword.operator.solar', match: '=>' },
        { name: 'keyword.control.solar', match: '\\bbb[0-9]*\\b' },
      ],
    },
    {
      name: 'keyword.control.solar',
      match:
        '\\b(?:fn|bb[0-9]+|let|if|else|for|switch|case|default|jump|jumpi|tail_call|return|revert|stop|returndata|phi|object|code|data)\\b',
    },
    {
      name: 'support.function.solar',
      match:
        '\\b(?:add|sub|mul|div|mod|sload|sstore|mload|mstore|calldataload|calldatasize|callvalue|iszero|eq|lt|gt|slt|shr|shl|and|or|not|keccak256|datasize|dataoffset|codecopy)\\b',
    },
  ],
}

const evmDisasm = {
  name: 'evm-disasm',
  scopeName: 'source.evm-disasm',
  repository: {},
  patterns: [
    { name: 'comment.line.semicolon.evm', match: ';.*$' },
    { name: 'constant.numeric.evm', match: '\\b(?:0x[0-9a-fA-F]+|[0-9]+)\\b' },
    {
      name: 'keyword.instruction.evm',
      match:
        '\\b(?:ADD|SUB|MUL|DIV|MOD|SDIV|SMOD|ADDMOD|MULMOD|EXP|SIGNEXTEND|LT|GT|SLT|SGT|EQ|ISZERO|AND|OR|XOR|NOT|BYTE|SHL|SHR|SAR|KECCAK256|ADDRESS|BALANCE|ORIGIN|CALLER|CALLVALUE|CALLDATALOAD|CALLDATASIZE|CALLDATACOPY|CODESIZE|CODECOPY|GASPRICE|EXTCODESIZE|EXTCODECOPY|RETURNDATASIZE|RETURNDATACOPY|BLOCKHASH|COINBASE|TIMESTAMP|NUMBER|PREVRANDAO|GASLIMIT|CHAINID|SELFBALANCE|BASEFEE|POP|MLOAD|MSTORE|MSTORE8|SLOAD|SSTORE|JUMP|JUMPI|PC|MSIZE|GAS|JUMPDEST|TLOAD|TSTORE|MCOPY|PUSH[0-9]*|DUP[0-9]*|SWAP[0-9]*|LOG[0-9]|CREATE|CALL|CALLCODE|RETURN|DELEGATECALL|CREATE2|STATICCALL|REVERT|INVALID|SELFDESTRUCT|STOP)\\b',
    },
  ],
}

const evmBytecode = {
  name: 'evm-bytecode',
  scopeName: 'source.evm-bytecode',
  repository: {},
  patterns: [
    { name: 'constant.numeric.hex.evm', match: '0x[0-9a-fA-F]+' },
    { name: 'constant.numeric.hex.evm', match: '\\b[0-9a-fA-F]{2}\\b' },
  ],
}

registerCustomLanguage('solar-ir', async () => ({ default: [solarIr] }))
registerCustomLanguage('evm-disasm', async () => ({ default: [evmDisasm] }))
registerCustomLanguage('evm-bytecode', async () => ({ default: [evmBytecode] }))

export function artifactLanguage(path: string, language: string) {
  if (path.endsWith('.mir') || path.endsWith('.evmir') || path.endsWith('.yul')) return 'solar-ir'
  if (path.endsWith('.disasm')) return 'evm-disasm'
  if (path.endsWith('.hex')) return 'evm-bytecode'
  return language
}
