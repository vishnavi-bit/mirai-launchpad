import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/lib/content/site-config'
import { absoluteUrl } from '@/lib/base-path'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  path?: string
  noindex?: boolean
}

/**
 * Per-route title/description/OpenGraph tags (ST-078), defaulting to
 * `site.config.json.seo` and overridable per page (e.g. a blog post's own
 * title/excerpt, a project's own description). `path` sets the canonical/
 * og:url tag — callers pass the route's own path (e.g. `/blog/my-post`),
 * not an absolute URL; `absoluteUrl` resolves it against `__SITE_URL__`.
 */
export function SEO({ title, description, image, path = '/', noindex = false }: SEOProps) {
  const pageTitle = title ? `${title} — ${siteConfig.siteTitle}` : siteConfig.siteTitle
  const desc = description ?? siteConfig.seo.description
  const ogImage = absoluteUrl(image ?? siteConfig.seo.ogImage)
  const url = absoluteUrl(path)

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={desc} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
