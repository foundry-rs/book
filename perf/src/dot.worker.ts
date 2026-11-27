import { instance } from '@viz-js/viz'

const viz = instance()

self.onmessage = async (event: MessageEvent<string>) => {
  try {
    const result = (await viz).render(event.data, { format: 'svg' })
    self.postMessage(
      result.status === 'success'
        ? { svg: result.output }
        : { error: result.errors.map((error) => error.message).join(' ') },
    )
  } catch {
    self.postMessage({ error: 'Could not render the graph.' })
  }
}
