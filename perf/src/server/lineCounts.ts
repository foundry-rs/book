import { formatArtifactContents } from '../artifactFormat'
import { imageType } from '../imageArtifacts'
import { patiencePatch } from '../patiencePatch'
import type { ArtifactFile, LineCounts } from '../types'

/** One side's artifact; equal keys mean equal contents. */
export interface ArtifactRef {
  path: string
  language: string
  key: string
}

type ChangedArtifact = [path: string, before?: ArtifactRef, after?: ArtifactRef]

/** One compiler's files of a manifest, keyed by `key`. */
export function artifactRefs<File extends ArtifactFile>(
  files: File[],
  compiler: string,
  key: (file: File) => string,
): ArtifactRef[] {
  return files
    .filter((file) => file.compilers.includes(compiler))
    .map((file) => ({ path: file.path, language: file.language, key: key(file) }))
}

/** Text artifacts whose contents differ or that only one side published. */
export function changedArtifacts(before: ArtifactRef[], after: ArtifactRef[]): ChangedArtifact[] {
  const sides = [before, after].map(
    (files) => new Map(files.flatMap((file) => (imageType(file.path) ? [] : [[file.path, file]]))),
  )
  return [...new Set([...sides[0].keys(), ...sides[1].keys()])].flatMap((path) => {
    const [old, current] = sides.map((side) => side.get(path))
    return old?.key === current?.key ? [] : [[path, old, current] as ChangedArtifact]
  })
}

/** Added and removed lines of each changed path, from the diff the viewer renders. */
export function lineCounts(changed: ChangedArtifact[], contents: ReadonlyMap<string, string>) {
  const counts: Record<string, LineCounts> = {}
  for (const [path, ...files] of changed) {
    const [old, current] = files.map((file) =>
      file ? formatArtifactContents(contents.get(file.key) ?? null, path, file.language) : null,
    )
    if (old == null && current == null) continue
    const count = { added: 0, removed: 0 }
    // Skip the `---`, `+++` and `@@` header lines.
    for (const line of patiencePatch(old ?? '', current ?? '')
      .split('\n')
      .slice(3)) {
      if (line[0] === '+') count.added++
      else if (line[0] === '-') count.removed++
    }
    if (count.added || count.removed) counts[path] = count
  }
  return counts
}
