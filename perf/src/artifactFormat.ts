function formatJson(contents: string) {
  try {
    return `${JSON.stringify(JSON.parse(contents), null, 2)}\n`
  } catch {
    return contents
  }
}

function formatPushData(data: string, width: number) {
  return (
    '0x' +
    data
      .replace(/^0x/i, '')
      .toLowerCase()
      .padStart(width * 2, '0')
  )
}

function formatOpcodes(contents: string, byteLength?: number) {
  if (contents.trim().includes('\n')) return contents
  const instructions: { offset: number; name: string; data: string | null }[] = []
  const tokens = contents.trim().split(/\s+/)
  let offset = 0
  for (let index = 0; index < tokens.length; index += 1) {
    const name = tokens[index]
    const push = /^PUSH([1-9]|[12][0-9]|3[0-2])$/.exec(name)
    const data = push && tokens[index + 1] ? formatPushData(tokens[++index], Number(push[1])) : null
    instructions.push({ offset, name, data })
    offset += 1 + (push ? Number(push[1]) : 0)
  }
  const visible =
    byteLength === undefined
      ? instructions
      : instructions.filter((instruction) => instruction.offset < byteLength)
  const jumpdests = new Set(
    visible
      .filter((instruction) => instruction.name === 'JUMPDEST')
      .map((instruction) => instruction.offset),
  )
  const targets = new Set<number>()
  for (let index = 1; index < visible.length; index += 1) {
    const instruction = visible[index]
    const previous = visible[index - 1]
    if (
      (instruction.name === 'JUMP' || instruction.name === 'JUMPI') &&
      previous.name.startsWith('PUSH') &&
      previous.data
    ) {
      const target = Number.parseInt(previous.data, 16)
      if (jumpdests.has(target)) targets.add(target)
    }
  }
  const labels = new Map([...targets].sort((a, b) => a - b).map((target, index) => [target, index]))
  return `${visible
    .flatMap((instruction, index) => {
      const lines: string[] = []
      const label = labels.get(instruction.offset)
      if (instruction.name === 'JUMPDEST' && label !== undefined) lines.push(`; bb${label}`)
      let line = instruction.name
      if (instruction.data) line += ` ${instruction.data.toLowerCase()}`
      const next = visible[index + 1]
      if (
        instruction.name.startsWith('PUSH') &&
        next &&
        (next.name === 'JUMP' || next.name === 'JUMPI')
      ) {
        const target = instruction.data ? Number.parseInt(instruction.data, 16) : 0
        line += labels.has(target) ? ` ; bb${labels.get(target)}` : ' ; unknown'
      } else if (
        (instruction.name === 'JUMP' || instruction.name === 'JUMPI') &&
        !visible[index - 1]?.name.startsWith('PUSH')
      ) {
        line += ' ; unknown'
      }
      lines.push(line)
      return lines
    })
    .join('\n')}\n`
}

export function creationCodeByteLength(creation: string | null, runtime: string | null) {
  const full = creation?.trim().replace(/^0x/i, '')
  const child = runtime?.trim().replace(/^0x/i, '')
  if (!full || !child || !full.endsWith(child)) return undefined
  return (full.length - child.length) / 2
}

export function formatArtifactContents(
  contents: string | null,
  path: string,
  language: string,
  byteLength?: number,
) {
  if (contents === null) return null
  if (language === 'json') return formatJson(contents)
  if (path.endsWith('.disasm')) return formatOpcodes(contents, byteLength)
  return contents
}
