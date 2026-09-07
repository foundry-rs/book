import { useEffect, useState } from 'react'

export function navigate(url: string | URL) {
  window.history.pushState(null, '', url)
  window.dispatchEvent(new Event('popstate'))
  window.scrollTo(0, 0)
}

export function replaceUrl(url: string | URL) {
  window.history.replaceState(null, '', url)
  window.dispatchEvent(new Event('routechange'))
}

export function comparisonHref(search: string) {
  const params = new URLSearchParams(search)
  for (const key of ['view', 'against', 'compiler', 'file']) params.delete(key)
  return `?${params}`
}

export function followLink(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return
  const link = event.target instanceof Element ? event.target.closest('a') : null
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return
  const url = new URL(link.href)
  if (
    url.origin !== window.location.origin ||
    url.pathname !== import.meta.env.BASE_URL ||
    url.hash
  )
    return
  event.preventDefault()
  navigate(url)
}

export function useNavigation() {
  const [route, setRoute] = useState({ search: window.location.search, key: 0 })
  useEffect(() => {
    const update = () =>
      setRoute((previous) => ({ search: window.location.search, key: previous.key + 1 }))
    const replace = () => setRoute((previous) => ({ ...previous, search: window.location.search }))
    window.addEventListener('popstate', update)
    window.addEventListener('routechange', replace)
    document.addEventListener('click', followLink)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('routechange', replace)
      document.removeEventListener('click', followLink)
    }
  }, [])
  return route
}
