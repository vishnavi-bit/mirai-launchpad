import { render, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it } from 'vitest'
import { siteConfig } from '@/lib/content/site-config'
import { SEO } from './SEO'

function renderSEO(props: React.ComponentProps<typeof SEO> = {}) {
  return render(
    <HelmetProvider>
      <SEO {...props} />
    </HelmetProvider>,
  )
}

describe('SEO (ST-078)', () => {
  it('defaults title/description/og:image from site.config.json.seo', async () => {
    renderSEO()

    await waitFor(() => expect(document.title).toBe(siteConfig.siteTitle))
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      siteConfig.seo.description,
    )
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toContain(
      siteConfig.seo.ogImage.replace(/^\//, ''),
    )
  })

  it('overrides title/description per page', async () => {
    renderSEO({ title: 'Resume', description: 'A short resume description.' })

    await waitFor(() => expect(document.title).toBe(`Resume — ${siteConfig.siteTitle}`))
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'A short resume description.',
    )
  })

  it('adds a noindex robots tag when requested', async () => {
    renderSEO({ noindex: true })

    await waitFor(() =>
      expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
        'noindex, nofollow',
      ),
    )
  })

  it('omits the robots tag by default', async () => {
    renderSEO()

    await waitFor(() => expect(document.title).toBe(siteConfig.siteTitle))
    expect(document.querySelector('meta[name="robots"]')).toBeNull()
  })
})
