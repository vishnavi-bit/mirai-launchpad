import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

interface NavItem {
  id: string
  enabled: boolean
}

interface SiteConfig {
  navigation: NavItem[]
}

interface ProjectEntry {
  id: string
}

// Static route per enabled nav id (ST-037's ids) — 'home' is the root path.
const STATIC_ROUTES: Record<string, string> = {
  home: '/',
  resume: '/resume',
  projects: '/projects',
  others: '/others',
  blog: '/blog',
}

function isEnabled(navigation: NavItem[], id: string): boolean {
  return navigation.some((item) => item.id === id && item.enabled)
}

function collectRoutes(root: string): string[] {
  const config = JSON.parse(
    fs.readFileSync(path.resolve(root, 'src/data/site.config.json'), 'utf-8'),
  ) as SiteConfig

  const routes: string[] = []
  for (const [id, route] of Object.entries(STATIC_ROUTES)) {
    if (isEnabled(config.navigation, id)) routes.push(route)
  }

  if (isEnabled(config.navigation, 'projects')) {
    const projects = JSON.parse(
      fs.readFileSync(path.resolve(root, 'src/data/projects.json'), 'utf-8'),
    ) as ProjectEntry[]
    for (const project of projects) routes.push(`/projects/${project.id}`)
  }

  if (isEnabled(config.navigation, 'blog')) {
    const blogDir = path.resolve(root, 'content/blog')
    if (fs.existsSync(blogDir)) {
      for (const file of fs.readdirSync(blogDir)) {
        if (file.endsWith('.md')) routes.push(`/blog/${file.replace(/\.md$/, '')}`)
      }
    }
  }

  return routes
}

function toSitemapXml(siteUrl: string, routes: string[]): string {
  const base = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl
  const urls = routes.map((route) => `  <url><loc>${base}${route}</loc></url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function toRobotsTxt(siteUrl: string): string {
  const base = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`
}

/**
 * Generates sitemap.xml (ST-079) and robots.txt (ST-080) at build time only
 * — both need the real deployed `siteUrl` (computed in vite.config.ts the
 * same way as `basePath`, ST-118), which isn't meaningful during `vite dev`.
 * Routes are derived from the same `site.config.json.navigation` enabled
 * flags the nav itself uses (`src/lib/navigation.ts`'s `NAV_ROUTES`), so a
 * disabled section is left out of both files just like it's left out of nav.
 */
export function seoFiles(siteUrl: string): Plugin {
  let root = process.cwd()

  return {
    name: 'seo-files',
    apply: 'build',
    configResolved(config) {
      root = config.root
    },
    generateBundle() {
      const routes = collectRoutes(root)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: toSitemapXml(siteUrl, routes),
      })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: toRobotsTxt(siteUrl) })
    },
  }
}
