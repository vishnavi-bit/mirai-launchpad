import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.resetModules()
  vi.unstubAllGlobals()
  document.head.innerHTML = ''
  delete window.gtag
  delete window.dataLayer
})

describe('initAnalytics (ST-101)', () => {
  it('does nothing when analytics is not configured', async () => {
    vi.doMock('@/lib/content/site-config', () => ({ siteConfig: { analytics: undefined } }))
    const { initAnalytics } = await import('./analytics')

    initAnalytics()

    expect(document.head.querySelector('script[src*="googletagmanager"]')).toBeNull()
    expect(window.gtag).toBeUndefined()
  })

  it('injects the gtag script and configures page-view-only tracking when configured', async () => {
    vi.doMock('@/lib/content/site-config', () => ({
      siteConfig: { analytics: { provider: 'ga4', measurementId: 'G-TEST123' } },
    }))
    const { initAnalytics, trackPageView } = await import('./analytics')

    initAnalytics()

    const script = document.head.querySelector('script[src*="googletagmanager"]')
    expect(script).not.toBeNull()
    expect(script?.getAttribute('src')).toContain('G-TEST123')
    expect(window.gtag).toBeTypeOf('function')

    const gtagSpy = vi.fn()
    window.gtag = gtagSpy
    trackPageView('/blog/my-post')
    expect(gtagSpy).toHaveBeenCalledWith('event', 'page_view', { page_path: '/blog/my-post' })
  })
})
