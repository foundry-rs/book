import type { FileContents } from '@pierre/diffs'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { DiffSkeleton } from './Skeleton'
import { formatValue } from './formatValue'
import { imageBlob, imageType } from './imageArtifacts'
import { renderDot } from './renderDot'

export type ImageMode = '2-up' | 'swipe' | 'onion-skin'

interface LoadedImage {
  url: string
  width: number
  height: number
  /** File size; absent for Graphviz sources, whose SVG is rendered here. */
  bytes?: number
}

function useImage(file: FileContents) {
  const [image, setImage] = useState<LoadedImage>()
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    let url: string | undefined
    setImage(undefined)
    setError('')
    const dot = !imageType(file.name) && !file.name.endsWith('.svg')
    const blob = imageType(file.name)
      ? Promise.resolve(imageBlob(file.contents, file.name))
      : (dot ? renderDot(file, signal) : Promise.resolve(file.contents)).then(
          (svg) => new Blob([svg], { type: 'image/svg+xml' }),
        )
    blob
      .then(async (blob) => {
        if (signal.aborted) return
        url = URL.createObjectURL(blob)
        const element = new Image()
        element.src = url
        await element.decode()
        if (signal.aborted) return
        setImage({
          url,
          // SVGs without explicit dimensions have no natural size.
          width: element.naturalWidth || 300,
          height: element.naturalHeight || 150,
          bytes: dot ? undefined : blob.size,
        })
      })
      .catch((error: Error) => {
        if (!signal.aborted) setError(error.message || 'Invalid image')
      })
    return () => {
      controller.abort()
      if (url) URL.revokeObjectURL(url)
    }
  }, [file])
  return { image, error }
}

function ImageStatus({ error }: { error: string }) {
  return error ? (
    <p className="error">Could not display image: {error}</p>
  ) : (
    <DiffSkeleton label="Rendering image" />
  )
}

function dimensions(image: LoadedImage) {
  const size = image.bytes === undefined ? '' : ` · ${formatValue(image.bytes, 'bytes')}`
  return `${image.width} × ${image.height} px${size}`
}

/** One image that fits its pane, with Ctrl+scroll zoom, drag panning and double-click to fit. */
export function ImageView({ file, className = '' }: { file: FileContents; className?: string }) {
  const { image, error } = useImage(file)
  const pane = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
  // React wheel listeners are passive, so zooming needs a native listener to cancel page zoom.
  useEffect(() => {
    const element = pane.current
    const img = element?.querySelector('img')
    if (!element || !img) return
    const zoom = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      // Zoom between fitting the pane and the image's natural size, around the cursor.
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const old = img.clientWidth
      const fit = Math.min(element.clientWidth, img.naturalWidth)
      const width = Math.max(fit, Math.min(img.naturalWidth, old * Math.exp(-event.deltaY / 200)))
      img.style.width = `${width}px`
      img.style.maxWidth = 'none'
      const scale = width / old
      element.scrollTo((element.scrollLeft + x) * scale - x, (element.scrollTop + y) * scale - y)
    }
    element.addEventListener('wheel', zoom, { passive: false })
    return () => element.removeEventListener('wheel', zoom)
  }, [image])
  if (!image) return <ImageStatus error={error} />
  return (
    <figure className={`image-view ${className}`}>
      <div
        ref={pane}
        className="image-pane"
        title="Ctrl+scroll or pinch to zoom, drag to pan, double-click to fit"
        onPointerDown={(event) => {
          if (event.button !== 0) return
          const element = event.currentTarget
          drag.current = {
            x: event.clientX,
            y: event.clientY,
            left: element.scrollLeft,
            top: element.scrollTop,
          }
          element.setPointerCapture(event.pointerId)
          event.preventDefault()
        }}
        onPointerMove={(event) => {
          const start = drag.current
          if (!start) return
          event.currentTarget.scrollTo(
            start.left - (event.clientX - start.x),
            start.top - (event.clientY - start.y),
          )
        }}
        onPointerUp={() => {
          drag.current = null
        }}
        onLostPointerCapture={() => {
          drag.current = null
        }}
        onDoubleClick={(event) => {
          const img = event.currentTarget.querySelector('img')!
          img.style.width = ''
          img.style.maxWidth = ''
        }}
      >
        {/* An image keeps scripts and links in an SVG inert. */}
        <img src={image.url} alt={file.name} draggable={false} />
      </div>
      <figcaption>{dimensions(image)}</figcaption>
    </figure>
  )
}

interface DiffProps {
  before: FileContents
  after: FileContents
  beforeLabel: string
  afterLabel: string
  mode: ImageMode
}

/** GitHub-style image comparison: side by side, swipe, or onion skin. */
export function ImageDiff(props: DiffProps) {
  if (props.mode === '2-up')
    return (
      <div className="image-diff two-up">
        {(
          [
            [props.beforeLabel, props.before, 'deleted'],
            [props.afterLabel, props.after, 'added'],
          ] as const
        ).map(([label, file, side]) => (
          <section key={side}>
            <h3>{label}</h3>
            <ImageView file={file} className={side} />
          </section>
        ))}
      </div>
    )
  return <ImageOverlay {...props} />
}

function ImageOverlay({ before, after, beforeLabel, afterLabel, mode }: DiffProps) {
  const old = useImage(before)
  const current = useImage(after)
  const [swipe, setSwipe] = useState(50)
  const [opacity, setOpacity] = useState(50)
  const frame = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  if (!old.image || !current.image) return <ImageStatus error={old.error || current.error} />
  // Both images share one frame sized to the larger of each dimension, top-centered like GitHub.
  const width = Math.max(old.image.width, current.image.width)
  const height = Math.max(old.image.height, current.image.height)
  const place = (image: LoadedImage, side: string, style = {}): ReactNode => (
    <img
      className={side}
      src={image.url}
      alt=""
      draggable={false}
      style={{
        left: `${((width - image.width) / 2 / width) * 100}%`,
        width: `${(image.width / width) * 100}%`,
        ...style,
      }}
    />
  )
  const swipeTo = (clientX: number) => {
    const rect = frame.current!.getBoundingClientRect()
    setSwipe(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)))
  }
  const value = mode === 'swipe' ? swipe : opacity
  return (
    <div className={`image-diff overlay ${mode}`}>
      <div
        ref={frame}
        className="image-frame"
        style={{ aspectRatio: `${width} / ${height}`, maxWidth: width }}
        onPointerDown={(event) => {
          if (mode !== 'swipe' || event.button !== 0) return
          dragging.current = true
          event.currentTarget.setPointerCapture(event.pointerId)
          swipeTo(event.clientX)
        }}
        onPointerMove={(event) => {
          if (dragging.current) swipeTo(event.clientX)
        }}
        onPointerUp={() => {
          dragging.current = false
        }}
        onLostPointerCapture={() => {
          dragging.current = false
        }}
      >
        {place(old.image, 'deleted')}
        {mode === 'swipe' ? (
          <>
            <div className="swipe-layer" style={{ clipPath: `inset(0 ${100 - swipe}% 0 0)` }}>
              {place(current.image, 'added')}
            </div>
            <div className="swipe-handle" style={{ left: `${swipe}%` }} />
          </>
        ) : (
          place(current.image, 'added', { opacity: opacity / 100 })
        )}
      </div>
      <label className="image-slider">
        <span>{beforeLabel}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          aria-label={mode === 'swipe' ? 'Swipe position' : 'Head opacity'}
          onChange={(event) =>
            (mode === 'swipe' ? setSwipe : setOpacity)(Number(event.target.value))
          }
        />
        <span>{afterLabel}</span>
      </label>
      <p className="image-dimensions">
        <span>{dimensions(old.image)}</span>
        <span>{dimensions(current.image)}</span>
      </p>
    </div>
  )
}
