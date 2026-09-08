import { parseDiffFromFile, type FileContents } from '@pierre/diffs'

self.onmessage = (event: MessageEvent<{ before: FileContents; after: FileContents }>) => {
  try {
    self.postMessage({ diff: parseDiffFromFile(event.data.before, event.data.after) })
  } catch {
    self.postMessage({ error: 'Could not compute an interactive diff.' })
  }
}
