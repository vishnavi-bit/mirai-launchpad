/**
 * Prefixes an absolute-looking asset path (as stored in content JSON, e.g.
 * `/images/avatar.svg`) with the deployed base path (ST-064) — needed
 * because Vite's `base` config only rewrites paths it can see statically
 * (imports, index.html); a path read at runtime from JSON is just a string
 * and won't be rewritten on its own. External URLs pass through unchanged.
 */
export function withBase(assetPath: string): string {
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(assetPath)) {
    return assetPath
  }

  const base = import.meta.env.BASE_URL
  const relativePath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
  return `${base}${relativePath}`
}

/**
 * react-router's `basename` expects no trailing slash (except the literal
 * root). `site.config.json.basePath` follows Vite's `base` convention
 * instead, which requires one — this normalizes between the two (ST-061).
 */
export function getRouterBasename(basePath: string): string | undefined {
  if (basePath === '/' || basePath === '') return undefined
  return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
}

/**
 * Resolves a base-relative path (already run through `withBase`, or a raw
 * route path) to a full absolute URL under `__SITE_URL__` (ST-078) — needed
 * for og:image and canonical tags, which crawlers won't resolve relative to
 * the page the way a browser does. External URLs pass through unchanged.
 */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(pathOrUrl)) {
    return pathOrUrl
  }

  const base = __SITE_URL__.endsWith('/') ? __SITE_URL__.slice(0, -1) : __SITE_URL__
  const relativePath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${base}${relativePath}`
}
