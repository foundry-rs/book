import type { ArtifactFile } from './types'

export interface ArtifactNode {
  name: string
  path: string
  file?: ArtifactFile
  children: ArtifactNode[]
}

export function mergeArtifactFiles(before: ArtifactFile[], after: ArtifactFile[]) {
  const files = new Map(before.map((file) => [file.path, file]))
  for (const file of after) {
    const previous = files.get(file.path)
    files.set(file.path, {
      ...file,
      compilers: [...new Set([...(previous?.compilers || []), ...file.compilers])],
    })
  }
  return [...files.values()].sort((a, b) => a.path.localeCompare(b.path))
}

export function artifactTree(files: ArtifactFile[]): ArtifactNode[] {
  const root: ArtifactNode[] = []
  for (const file of files) {
    let children = root
    let path = ''
    const parts = file.path.split('/')
    for (const [index, name] of parts.entries()) {
      path += (path ? '/' : '') + name
      let node = children.find((item) => item.path === path)
      if (!node) {
        node = { name, path, children: [] }
        children.push(node)
      }
      if (index === parts.length - 1) node.file = file
      children = node.children
    }
  }
  return root
}
