import { createHash } from 'node:crypto'

export const validIdentifier = /^(?!\.{1,2}$)[\w.-]{1,128}$/

export function validArtifactPath(path: string) {
  return (
    path.length <= 1024 &&
    path
      .split('/')
      .every(
        (part) =>
          part !== '.' &&
          part !== '..' &&
          part.length > 0 &&
          part.length <= 255 &&
          !part.includes('\\') &&
          !Array.from(part).some((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127),
      )
  )
}

export function artifactMetadata(path: string) {
  const extension = path.split('.').at(-1)?.toLowerCase()
  const languages: Record<string, string> = {
    json: 'json',
    sol: 'solidity',
    yul: 'solidity',
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    rs: 'rust',
    md: 'markdown',
    yaml: 'yaml',
    yml: 'yaml',
    toml: 'toml',
    html: 'html',
    css: 'css',
  }
  return {
    label: path,
    language: Object.hasOwn(languages, extension || '') ? languages[extension!] : 'text',
    storagePath: `${createHash('sha256').update(path).digest('hex')}.json`,
  }
}

export function textArtifact(bytes: Uint8Array): string | null {
  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    return bytes.some((byte) => byte < 9 || (byte > 13 && byte < 32)) ? null : text
  } catch {
    return null
  }
}
