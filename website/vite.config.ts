/// <reference types="vitest/config" />
import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { faviconFromConfig } from './vite-plugin-favicon.ts'
import { blogPosts } from './vite-plugin-blog-posts.ts'
import { spaFallback404 } from './vite-plugin-spa-fallback.ts'
import { contentEditor } from './vite-plugin-content-editor.ts'
import { blogEditor } from './vite-plugin-blog-editor.ts'
import { devRoutes } from './vite-plugin-dev-routes.ts'
import { seoFiles } from './vite-plugin-seo-files.ts'

/**
 * Computes the deployed base path from GitHub Actions' automatic
 * `GITHUB_REPOSITORY` env var ("owner/repo") when present — this is what
 * lets a fork deploy correctly with zero config changes, even after being
 * renamed. Falls back to `site.config.json.basePath` for local dev and any
 * build that isn't running in GitHub Actions (e.g. testing a production
 * build locally, or deploying elsewhere).
 */
function resolveBasePath(): string {
  const repository = process.env.GITHUB_REPOSITORY
  if (repository) {
    const [owner, repo] = repository.split('/')
    const isUserOrOrgPage = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`
    return isUserOrOrgPage ? '/' : `/${repo}/`
  }

  const { basePath } = JSON.parse(
    fs.readFileSync(path.resolve(import.meta.dirname, 'src/data/site.config.json'), 'utf-8'),
  ) as { basePath: string }
  return basePath
}

/**
 * Computes the canonical absolute site URL (for og:image, sitemap.xml,
 * robots.txt) the same way `resolveBasePath` computes the path: derived
 * from `GITHUB_REPOSITORY` when present (the actual deployed
 * `<owner>.github.io[/repo/]` URL), falling back to a `localhost` URL under
 * the same base path otherwise so local preview builds still get valid,
 * self-consistent absolute URLs.
 */
function resolveSiteUrl(basePath: string): string {
  const repository = process.env.GITHUB_REPOSITORY
  if (repository) {
    const [owner] = repository.split('/')
    return `https://${owner.toLowerCase()}.github.io${basePath}`
  }
  return `http://localhost:5173${basePath}`
}

// Single source of truth for the deployed base path (ST-061, ST-062): the
// router's `basename`, Vite's `base`, and index.html's favicon href all
// derive from this one value.
const basePath = resolveBasePath()
const siteUrl = resolveSiteUrl(basePath)

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  define: {
    __BASE_PATH__: JSON.stringify(basePath),
    __SITE_URL__: JSON.stringify(siteUrl),
  },
  plugins: [
    react(),
    tailwindcss(),
    faviconFromConfig(),
    blogPosts(),
    spaFallback404(),
    contentEditor(),
    blogEditor(),
    devRoutes(),
    seoFiles(siteUrl),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
