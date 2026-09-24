import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Isolated in its own file: mocking site-config here would otherwise affect
// every other test in App.test.tsx that relies on the real config.
vi.mock('@/lib/content/site-config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/content/site-config')>()
  return { ...actual, siteConfig: { ...actual.siteConfig, showCustomizeGuide: false } }
})

const { siteConfig } = await import('@/lib/content/site-config')
const { default: App } = await import('./App')

beforeEach(() => {
  window.history.pushState({}, '', siteConfig.basePath)
})

describe('showCustomizeGuide: false (ST-096)', () => {
  it('hides the Customize nav link but leaves the route reachable directly', async () => {
    render(<App />)
    expect(screen.queryByRole('link', { name: 'Customize' })).not.toBeInTheDocument()

    window.history.pushState({}, '', `${siteConfig.basePath}customize`)
    render(<App />)
    // CustomizePage is lazy-loaded (ST-077) — findBy waits for the chunk.
    expect(
      await screen.findByRole('heading', { name: 'Developer Tools', level: 1 }),
    ).toBeInTheDocument()
  })
})
