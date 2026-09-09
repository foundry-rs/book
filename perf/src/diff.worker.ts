import { processFile, trimPatchContext, type FileContents } from '@pierre/diffs'
import { patiencePatch } from './patiencePatch'

self.onmessage = (event: MessageEvent<{ before: FileContents; after: FileContents }>) => {
  try {
    const { before, after } = event.data
    const diff = processFile(trimPatchContext(patiencePatch(before.contents, after.contents), 3), {
      oldFile: before,
      newFile: after,
      cacheKey: JSON.stringify([before.cacheKey, after.cacheKey]),
      throwOnError: true,
    })
    if (!diff) throw new Error('Invalid diff')
    diff.name = after.name
    diff.prevName = before.name === after.name ? undefined : before.name
    diff.lang = after.lang
    self.postMessage({ diff })
  } catch {
    self.postMessage({ error: 'Could not compute an interactive diff.' })
  }
}
