const imageTypes: Record<string, string> = {
  avif: 'image/avif',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

/** MIME type of a raster image artifact. Importers store these base64-encoded. */
export function imageType(path: string) {
  const extension = path.split('.').at(-1)?.toLowerCase()
  return extension && Object.hasOwn(imageTypes, extension) ? imageTypes[extension] : undefined
}

export function imageBlob(contents: string, path: string) {
  return new Blob([Uint8Array.from(atob(contents), (char) => char.charCodeAt(0))], {
    type: imageType(path),
  })
}
