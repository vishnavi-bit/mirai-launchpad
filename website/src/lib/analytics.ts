import { siteConfig } from '@/lib/content/site-config'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let initialized = false

/**
 * GA4 page-view tracking (ST-101) — loads only when
 * `site.config.json.analytics` is configured, and only tracks page views:
 * `send_page_view: false` on init, with every view (including the first)
 * sent explicitly via `trackPageView` instead, since GA4's own automatic
 * page_view can't see client-side route changes in a single-page app.
 */
export function initAnalytics(): void {
  const analytics = siteConfig.analytics
  if (!analytics || initialized) return
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', analytics.measurementId, { send_page_view: false })
}

export function trackPageView(path: string): void {
  if (!initialized || !window.gtag) return
  window.gtag('event', 'page_view', { page_path: path })
}
