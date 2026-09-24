import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { personal } from '@/lib/content/personal'
import { siteConfig } from '@/lib/content/site-config'
import App from './App'

// The router's basename (ST-061) is site.config.json.basePath, so the app
// only matches routes under that prefix — mirroring how it's actually
// served on GitHub Pages, not assuming a root deploy.
beforeEach(() => {
  window.history.pushState({}, '', siteConfig.basePath)
})

describe('App', () => {
  it('renders the home page at the root route', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: personal.name, level: 1 })).toBeInTheDocument()
  })

  it('renders header, main, and footer landmarks on every page (ST-040)', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('matches routes nested under the configured basePath (ST-061)', async () => {
    window.history.pushState({}, '', `${siteConfig.basePath}resume`)
    render(<App />)
    // ResumePage is lazy-loaded (ST-077) — its heading only appears once
    // the chunk resolves, so this needs findBy, not getBy.
    expect(await screen.findByRole('heading', { name: personal.name, level: 1 })).toBeInTheDocument()
  })
})
